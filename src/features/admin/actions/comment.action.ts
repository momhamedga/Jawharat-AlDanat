'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getCurrentAdminSession } from '@/lib/auth/guard';
import { canManageAdminOps, isSuperAdmin } from '@/features/auth/services/rbac.service';
import { query } from '@/lib/db';
import { recordAuditLog } from '../services/audit.service';
import { CommentActionResult, CommentStatus } from '../types/comment.types';

async function isValidOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const host = headersList.get('host');

  if (!origin) return true;
  if (process.env.NODE_ENV === 'development') return true;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins: string[] = [];

  if (siteUrl) allowedOrigins.push(siteUrl.replace(/\/$/, ''));
  if (host) allowedOrigins.push(`https://${host}`, `http://${host}`);
  if (host && origin === `https://${host}`) return true;

  return allowedOrigins.includes(origin);
}

/**
 * Revalidates public blog article pages when comment moderation status changes.
 */
function invalidateCommentCache(postSlug?: string | null) {
  try {
    revalidatePath('/admin/comments');
    revalidatePath('/admin');
    if (postSlug) {
      revalidatePath(`/ar/blog/${postSlug}`, 'page');
      revalidatePath(`/en/blog/${postSlug}`, 'page');
      revalidatePath('/[locale]/blog/[slug]', 'page');
    }
  } catch (err) {
    console.error('[CommentAction] Cache revalidation error:', err);
  }
}

/**
 * Updates comment status to APPROVED, HIDDEN, or SPAM.
 */
async function updateCommentStatus(
  commentId: number,
  targetStatus: CommentStatus,
  actionType: 'COMMENT_APPROVED' | 'COMMENT_HIDDEN' | 'COMMENT_MARKED_SPAM'
): Promise<CommentActionResult> {
  try {
    // 1. Auth Guard & RBAC (ADMIN / SUPER_ADMIN required; EDITOR rejected)
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!canManageAdminOps(session.user)) {
      return { success: false, error: 'ليس لديك صلاحية مراجعة التعليقات (تتطلب صلاحية مدير)' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به (فشل التحقق من المصدر)' };
    }

    // 3. Fetch comment & post slug
    const existing = await query<{ id: number; post_id: number; post_slug: string | null; current_status: string }>(
      `
      SELECT c.id, c.post_id, c.status AS current_status, p.slug AS post_slug
      FROM comments c
      LEFT JOIN blog_posts p ON p.id = c.post_id
      WHERE c.id = $1;
      `,
      [commentId]
    );

    if (!existing || existing.length === 0) {
      return { success: false, error: 'التعليق غير موجود' };
    }

    const comment = existing[0];

    // 4. Update status in database
    await query(
      `
      UPDATE comments
      SET
        status = $1,
        moderated_at = NOW(),
        moderated_by = $2,
        updated_at = NOW()
      WHERE id = $3;
      `,
      [targetStatus, session.user.id, commentId]
    );

    // 5. Record Audit Log
    await recordAuditLog({
      adminUserId: session.user.id,
      action: actionType,
      entityType: 'COMMENT',
      entityId: commentId.toString(),
      metadata: {
        postId: comment.post_id,
        postSlug: comment.post_slug,
        fromStatus: comment.current_status,
        toStatus: targetStatus,
      },
    });

    // 6. Targeted Cache Invalidation
    invalidateCommentCache(comment.post_slug);

    return { success: true, id: commentId };
  } catch (error) {
    console.error(`[CommentAction] ${actionType} error:`, error);
    return { success: false, error: 'حدث خطأ في الخادم أثناء تحديث حالة التعليق' };
  }
}

/**
 * Server Action: Approve a comment
 */
export async function approveCommentAction(id: number): Promise<CommentActionResult> {
  return updateCommentStatus(id, 'APPROVED', 'COMMENT_APPROVED');
}

/**
 * Server Action: Hide a comment
 */
export async function hideCommentAction(id: number): Promise<CommentActionResult> {
  return updateCommentStatus(id, 'HIDDEN', 'COMMENT_HIDDEN');
}

/**
 * Server Action: Mark a comment as SPAM
 */
export async function spamCommentAction(id: number): Promise<CommentActionResult> {
  return updateCommentStatus(id, 'SPAM', 'COMMENT_MARKED_SPAM');
}

/**
 * Server Action: Permanently delete a comment (SUPER_ADMIN only)
 */
export async function deleteCommentAction(id: number): Promise<CommentActionResult> {
  try {
    // 1. Auth Guard & RBAC (SUPER_ADMIN required)
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!isSuperAdmin(session.user)) {
      return { success: false, error: 'حذف التعليقات نهائياً يتطلب صلاحية مدير عام (SUPER_ADMIN)' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به' };
    }

    // 3. Fetch comment & post slug before deletion
    const existing = await query<{ id: number; post_id: number; post_slug: string | null; status: string }>(
      `
      SELECT c.id, c.post_id, c.status, p.slug AS post_slug
      FROM comments c
      LEFT JOIN blog_posts p ON p.id = c.post_id
      WHERE c.id = $1;
      `,
      [id]
    );

    if (!existing || existing.length === 0) {
      return { success: false, error: 'التعليق غير موجود' };
    }

    const comment = existing[0];

    // 4. Delete from database
    await query('DELETE FROM comments WHERE id = $1;', [id]);

    // 5. Record Audit Log
    await recordAuditLog({
      adminUserId: session.user.id,
      action: 'COMMENT_DELETED',
      entityType: 'COMMENT',
      entityId: id.toString(),
      metadata: {
        postId: comment.post_id,
        postSlug: comment.post_slug,
        status: comment.status,
      },
    });

    // 6. Targeted Cache Invalidation
    invalidateCommentCache(comment.post_slug);

    return { success: true, id };
  } catch (error) {
    console.error('[CommentAction] Delete error:', error);
    return { success: false, error: 'حدث خطأ في الخادم أثناء حذف التعليق' };
  }
}

