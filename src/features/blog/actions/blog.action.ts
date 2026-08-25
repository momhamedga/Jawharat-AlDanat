'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { hashIdentifierHmac, checkRateLimit } from '@/lib/rate-limiter';
import { addCommentSchema, likePostSchema, recordViewSchema } from '../schemas/blog.schema';

export interface CommentActionResult {
  success: boolean;
  code?: 'SUCCESS' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'BOT_DETECTED' | 'SERVER_ERROR';
  message?: string;
  comment?: {
    id: number;
    userName: string;
    text: string;
    createdAt: string;
  };
  errors?: Record<string, string>;
}

export interface LikeActionResult {
  success: boolean;
  code?: 'SUCCESS' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'SERVER_ERROR';
  likes?: number;
}

/**
 * Helper to safely extract client IP for privacy-preserving HMAC rate limiting.
 */
async function getClientIdentifier(): Promise<string> {
  try {
    const headerList = await headers();
    const forwarded = headerList.get('x-forwarded-for') || headerList.get('x-real-ip');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    return 'direct-connection';
  } catch {
    return 'unknown-client';
  }
}

/**
 * Server Action: Submit a verified, rate-limited public comment (Defaults to PENDING status).
 */
export async function addCommentAction(
  _prevState: CommentActionResult | null,
  formData: FormData,
): Promise<CommentActionResult> {
  try {
    const rawData = {
      postId: formData.get('postId'),
      userName: formData.get('userName'),
      text: formData.get('text'),
      honeypot: formData.get('honeypot'),
    };

    const parseResult = addCommentSchema.safeParse(rawData);

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((err) => {
        const path = err.path.join('.');
        fieldErrors[path] = err.message;
      });
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        errors: fieldErrors,
      };
    }

    const { postId, userName, text, honeypot } = parseResult.data;

    // Honeypot anti-spam trap check
    if (honeypot && honeypot.length > 0) {
      return { success: false, code: 'BOT_DETECTED' };
    }

    // Distributed Rate Limiting (Namespace: blog-comment)
    const clientIp = await getClientIdentifier();
    const hashedKey = hashIdentifierHmac(clientIp, 'blog-comment');
    const rateLimit = await checkRateLimit(hashedKey, 5, 15 * 60 * 1000); // 5 comments per 15 min

    if (!rateLimit.allowed) {
      return { success: false, code: 'RATE_LIMITED' };
    }

    // Insert comment with explicit PENDING status for moderation
    const rows = await query<{
      id: number;
      user_name: string;
      text: string;
      created_at: string | Date;
    }>(
      `
      INSERT INTO comments (post_id, user_name, text, status)
      VALUES ($1, $2, $3, 'PENDING')
      RETURNING id, user_name, text, created_at;
      `,
      [postId, userName, text],
    );

    if (!rows || rows.length === 0) {
      return { success: false, code: 'SERVER_ERROR' };
    }

    const newComment = rows[0];

    // Revalidate admin comments page for immediate moderation review
    revalidatePath('/admin/comments');
    revalidatePath('/admin');

    return {
      success: true,
      code: 'SUCCESS',
      message: 'PENDING_REVIEW',
      comment: {
        id: newComment.id,
        userName: newComment.user_name,
        text: newComment.text,
        createdAt: new Date(newComment.created_at).toISOString(),
      },
    };
  } catch (error) {
    console.error('[BlogAction] Comment submission failed:', error);
    return { success: false, code: 'SERVER_ERROR' };
  }
}

/**
 * Server Action: Concurrency-safe atomic like increment with distributed rate limiting.
 */
export async function likePostAction(postIdInput: number): Promise<LikeActionResult> {
  try {
    const parseResult = likePostSchema.safeParse({ postId: postIdInput });
    if (!parseResult.success) {
      return { success: false, code: 'VALIDATION_ERROR' };
    }

    const { postId } = parseResult.data;

    // Distributed Rate Limiting (Namespace: blog-like)
    const clientIp = await getClientIdentifier();
    const hashedKey = hashIdentifierHmac(`${clientIp}:${postId}`, 'blog-like');
    const rateLimit = await checkRateLimit(hashedKey, 20, 10 * 60 * 1000); // 20 likes per 10 min

    if (!rateLimit.allowed) {
      return { success: false, code: 'RATE_LIMITED' };
    }

    // Atomic SQL UPSERT / Increment to prevent concurrency race conditions
    const rows = await query<{ likes: number }>(
      `
      UPDATE blog_posts 
      SET likes = COALESCE(likes, 0) + 1 
      WHERE id = $1 
      RETURNING likes;
      `,
      [postId],
    );

    if (!rows || rows.length === 0) {
      return { success: false, code: 'SERVER_ERROR' };
    }

    revalidatePath('/[locale]/blog', 'page');

    return {
      success: true,
      code: 'SUCCESS',
      likes: Number(rows[0].likes) || 0,
    };
  } catch (error) {
    console.error('[BlogAction] Like increment failed:', error);
    return { success: false, code: 'SERVER_ERROR' };
  }
}

/**
 * Server Action: Non-blocking view increment without excessive page cache churn.
 */
export async function recordViewAction(postIdInput: number): Promise<{ success: boolean }> {
  try {
    const parseResult = recordViewSchema.safeParse({ postId: postIdInput });
    if (!parseResult.success) {
      return { success: false };
    }

    const { postId } = parseResult.data;

    await query(
      `UPDATE blog_posts SET views = COALESCE(views, 0) + 1 WHERE id = $1;`,
      [postId],
    );

    return { success: true };
  } catch (error) {
    console.error('[BlogAction] View recording failed:', error);
    return { success: false };
  }
}
