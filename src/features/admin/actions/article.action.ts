'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getCurrentAdminSession } from '@/lib/auth/guard';
import { canManageContent, canManageAdminOps } from '@/features/auth/services/rbac.service';
import { articleSchema } from '../schemas/article.schema';
import {
  createAdminArticle,
  updateAdminArticle,
  archiveAdminArticle,
  isSlugTaken,
  getAdminArticleById,
} from '../data/article.queries';
import { ArticleActionResult } from '../types/cms.types';
import { recordAuditLog } from '../services/audit.service';
import { query } from '@/lib/db';

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
 * Revalidates public blog listings, article details, and sitemap
 */
function invalidatePublicBlogCache(slug: string, oldSlug?: string) {
  try {
    revalidatePath('/ar/blog');
    revalidatePath('/en/blog');
    revalidatePath(`/ar/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath(`/ar/blog/${slug}`, 'page');
    revalidatePath(`/en/blog/${slug}`, 'page');
    revalidatePath('/[locale]/blog/[slug]', 'page');
    if (oldSlug && oldSlug !== slug) {
      revalidatePath(`/ar/blog/${oldSlug}`);
      revalidatePath(`/en/blog/${oldSlug}`);
      revalidatePath(`/ar/blog/${oldSlug}`, 'page');
      revalidatePath(`/en/blog/${oldSlug}`, 'page');
    }
    revalidatePath('/sitemap.xml');
  } catch (err) {
    console.error('[CacheInvalidation] Non-fatal revalidation error:', err);
  }
}

/**
 * Server Action: Create a new article
 */
export async function createArticleAction(
  rawData: unknown,
): Promise<ArticleActionResult> {
  try {
    // 1. Auth Guard & RBAC
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!canManageContent(session.user)) {
      return { success: false, error: 'ليس لديك صلاحية إنشاء المقالات' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به (فشل التحقق من المصدر)' };
    }

    // 3. Zod Validation
    const parseResult = articleSchema.safeParse(rawData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      return {
        success: false,
        error: 'يرجى تصحيح الأخطاء في النموذج قبل الحفظ',
        fieldErrors,
      };
    }

    const data = parseResult.data;

    // 4. Publishing Role Enforcement (Explicit Server-Side Rejection for EDITOR)
    if (data.status === 'PUBLISHED' && !canManageAdminOps(session.user)) {
      return {
        success: false,
        error: 'ليس لديك صلاحية نشر المقالات (تتطلب صلاحية مدير عمليات أو مدير عام)',
      };
    }

    // 5. Unique Slug Check
    const slugExists = await isSlugTaken(data.slug);
    if (slugExists) {
      return {
        success: false,
        error: 'هذا الرابط مستخدم بالفعل لمقال آخر، يرجى اختيار رابط فريد',
        fieldErrors: { slug: 'هذا الرابط مستخدم بالفعل' },
      };
    }

    // 6. DB Creation
    const created = await createAdminArticle(data, session.user.id);

    // 7. Record Audit Log
    await recordAuditLog({
      adminUserId: session.user.id,
      action: data.status === 'PUBLISHED' ? 'ARTICLE_PUBLISHED' : 'ARTICLE_CREATED',
      entityType: 'BLOG_POST',
      entityId: created.id.toString(),
      metadata: {
        slug: created.slug,
        titleAr: data.titleAr,
        status: data.status,
      },
    });

    // 8. Targeted Cache Invalidation
    revalidatePath('/admin');
    revalidatePath('/admin/blog');

    if (data.status === 'PUBLISHED') {
      invalidatePublicBlogCache(created.slug);
    }

    return {
      success: true,
      id: created.id,
      slug: created.slug,
    };
  } catch (error) {
    console.error('[ArticleAction] Create error:', error);
    return {
      success: false,
      error: 'حدث خطأ في الخادم أثناء حفظ المقال',
    };
  }
}

/**
 * Server Action: Update an existing article
 */
export async function updateArticleAction(
  id: number,
  rawData: unknown,
): Promise<ArticleActionResult> {
  try {
    // 1. Auth Guard & RBAC
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!canManageContent(session.user)) {
      return { success: false, error: 'ليس لديك صلاحية تعديل المقالات' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به (فشل التحقق من المصدر)' };
    }

    // 3. Check existing article
    const existing = await getAdminArticleById(id);
    if (!existing) {
      return { success: false, error: 'المقال غير موجود أو تم حذفه' };
    }

    // 4. Zod Validation
    const parseResult = articleSchema.safeParse(rawData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      return {
        success: false,
        error: 'يرجى تصحيح الأخطاء في النموذج قبل التحديث',
        fieldErrors,
      };
    }

    const data = parseResult.data;

    // 5. Publishing / Archiving Role Enforcement (Explicit Server-Side Rejection for EDITOR)
    if ((data.status === 'PUBLISHED' || data.status === 'ARCHIVED') && data.status !== existing.status && !canManageAdminOps(session.user)) {
      return {
        success: false,
        error: 'ليس لديك صلاحية تغيير حالة نشر أو أرشفة المقالات (تتطلب صلاحية مدير)',
      };
    }

    // 6. Unique Slug Check
    const slugExists = await isSlugTaken(data.slug, id);
    if (slugExists) {
      return {
        success: false,
        error: 'هذا الرابط مستخدم بالفعل لمقال آخر، يرجى اختيار رابط فريد',
        fieldErrors: { slug: 'هذا الرابط مستخدم بالفعل' },
      };
    }

    // 7. DB Update
    const updated = await updateAdminArticle(id, data);

    // 8. Record Audit Log
    const auditAction =
      data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED'
        ? 'ARTICLE_PUBLISHED'
        : data.status === 'ARCHIVED' && existing.status !== 'ARCHIVED'
        ? 'ARTICLE_ARCHIVED'
        : 'ARTICLE_UPDATED';

    await recordAuditLog({
      adminUserId: session.user.id,
      action: auditAction,
      entityType: 'BLOG_POST',
      entityId: updated.id.toString(),
      metadata: {
        slug: updated.slug,
        titleAr: data.titleAr,
        previousStatus: existing.status,
        newStatus: data.status,
      },
    });

    // 9. Targeted Cache Invalidation
    revalidatePath('/admin');
    revalidatePath('/admin/blog');
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath(`/admin/blog/${id}/preview`);

    if (existing.status === 'PUBLISHED' || data.status === 'PUBLISHED' || data.status === 'ARCHIVED') {
      invalidatePublicBlogCache(updated.slug, existing.slug);
    }

    return {
      success: true,
      id: updated.id,
      slug: updated.slug,
    };
  } catch (error) {
    console.error('[ArticleAction] Update error:', error);
    return {
      success: false,
      error: 'حدث خطأ في الخادم أثناء تحديث المقال',
    };
  }
}

/**
 * Server Action: Explicit Publish / Republish
 */
export async function publishArticleAction(
  id: number,
): Promise<ArticleActionResult> {
  try {
    // 1. Auth Guard & RBAC (ADMIN+ required)
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!canManageAdminOps(session.user)) {
      return { success: false, error: 'نشر المقالات يتطلب صلاحية مدير (ADMIN) أو أعلى' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به' };
    }

    // 3. Fetch existing
    const existing = await getAdminArticleById(id);
    if (!existing) {
      return { success: false, error: 'المقال غير موجود' };
    }

    // 4. Update status to PUBLISHED
    const rows = await query<{ id: number; slug: string }>(
      `
      UPDATE blog_posts
      SET
        status = 'PUBLISHED',
        published_at = COALESCE(published_at, NOW()),
        updated_at = NOW()
      WHERE id = $1
      RETURNING id, slug;
      `,
      [id]
    );

    const post = rows[0];

    // 5. Record Audit Log
    await recordAuditLog({
      adminUserId: session.user.id,
      action: existing.publishedAt ? 'ARTICLE_REPUBLISHED' : 'ARTICLE_PUBLISHED',
      entityType: 'BLOG_POST',
      entityId: post.id.toString(),
      metadata: {
        slug: post.slug,
        titleAr: existing.titleAr,
      },
    });

    // 6. Invalidation
    revalidatePath('/admin');
    revalidatePath('/admin/blog');
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath(`/admin/blog/${id}/preview`);
    invalidatePublicBlogCache(post.slug);

    return { success: true, id: post.id, slug: post.slug };
  } catch (error) {
    console.error('[ArticleAction] Publish error:', error);
    return { success: false, error: 'فشل نشر المقال في الخادم' };
  }
}

/**
 * Server Action: Archive an article
 */
export async function archiveArticleAction(
  id: number,
): Promise<ArticleActionResult> {
  try {
    // 1. Auth Guard & RBAC (ADMIN+ required)
    const session = await getCurrentAdminSession();
    if (!session || !session.user.isActive) {
      return { success: false, error: 'غير مصرح: يرجى تسجيل الدخول مجدداً' };
    }

    if (!canManageAdminOps(session.user)) {
      return { success: false, error: 'أرشفة المقالات تتطلب صلاحية مدير (ADMIN) أو أعلى' };
    }

    // 2. Origin Check
    if (!(await isValidOrigin())) {
      return { success: false, error: 'طلب غير مصرح به' };
    }

    // 3. Fetch existing post slug
    const existing = await getAdminArticleById(id);
    if (!existing) {
      return { success: false, error: 'المقال غير موجود' };
    }

    // 4. DB Archive
    await archiveAdminArticle(id);

    // 5. Record Audit Log
    await recordAuditLog({
      adminUserId: session.user.id,
      action: 'ARTICLE_ARCHIVED',
      entityType: 'BLOG_POST',
      entityId: id.toString(),
      metadata: {
        slug: existing.slug,
        titleAr: existing.titleAr,
      },
    });

    // 6. Targeted Invalidation
    revalidatePath('/admin');
    revalidatePath('/admin/blog');
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath(`/admin/blog/${id}/preview`);
    invalidatePublicBlogCache(existing.slug);

    return { success: true, id };
  } catch (error) {
    console.error('[ArticleAction] Archive error:', error);
    return {
      success: false,
      error: 'فشل أرشفة المقال في الخادم',
    };
  }
}
