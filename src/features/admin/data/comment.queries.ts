import 'server-only';
import { query } from '@/lib/db';
import {
  AdminCommentListItem,
  CommentFilterParams,
  CommentCounts,
} from '../types/comment.types';

interface RawDbCommentItem {
  id: number;
  post_id: number | null;
  post_slug: string | null;
  post_title_ar: string | null;
  post_title_en: string | null;
  user_name: string;
  text: string;
  status: 'PENDING' | 'APPROVED' | 'HIDDEN' | 'SPAM';
  created_at: Date | string | null;
  updated_at: Date | string | null;
  moderated_at: Date | string | null;
  moderator_name: string | null;
}

interface RawDbCommentCounts {
  all_count: string | number;
  pending_count: string | number;
  approved_count: string | number;
  hidden_count: string | number;
  spam_count: string | number;
}

/**
 * Fetches comment counts by status in a single aggregated query.
 */
export async function getCommentCounts(): Promise<CommentCounts> {
  const rows = await query<RawDbCommentCounts>(`
    SELECT
      COUNT(id)::int AS all_count,
      COUNT(id) FILTER (WHERE status = 'PENDING')::int AS pending_count,
      COUNT(id) FILTER (WHERE status = 'APPROVED')::int AS approved_count,
      COUNT(id) FILTER (WHERE status = 'HIDDEN')::int AS hidden_count,
      COUNT(id) FILTER (WHERE status = 'SPAM')::int AS spam_count
    FROM comments;
  `);

  const c = rows[0];
  return {
    all: Number(c?.all_count) || 0,
    pending: Number(c?.pending_count) || 0,
    approved: Number(c?.approved_count) || 0,
    hidden: Number(c?.hidden_count) || 0,
    spam: Number(c?.spam_count) || 0,
  };
}

/**
 * Fetches filtered, paginated comments for the admin moderation panel.
 */
export async function getAdminComments(params: CommentFilterParams = {}): Promise<{
  comments: AdminCommentListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { status = 'ALL', search, page = 1, limit = 20 } = params;
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const queryParams: unknown[] = [];
  let paramIndex = 1;

  if (status && status !== 'ALL') {
    conditions.push(`c.status = $${paramIndex++}`);
    queryParams.push(status);
  }

  if (search && search.trim().length > 0) {
    conditions.push(
      `(c.user_name ILIKE $${paramIndex} OR c.text ILIKE $${paramIndex} OR p.title_ar ILIKE $${paramIndex} OR p.title_en ILIKE $${paramIndex})`
    );
    queryParams.push(`%${search.trim()}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countRes = await query<{ total: string | number }>(
    `
    SELECT COUNT(c.id)::int AS total
    FROM comments c
    LEFT JOIN blog_posts p ON p.id = c.post_id
    ${whereClause};
    `,
    queryParams
  );
  const total = Number(countRes[0]?.total) || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  // Fetch paginated rows
  const listParams = [...queryParams, limit, offset];
  const rows = await query<RawDbCommentItem>(
    `
    SELECT
      c.id,
      c.post_id,
      p.slug AS post_slug,
      p.title_ar AS post_title_ar,
      p.title_en AS post_title_en,
      c.user_name,
      c.text,
      c.status,
      c.created_at,
      c.updated_at,
      c.moderated_at,
      u.full_name AS moderator_name
    FROM comments c
    LEFT JOIN blog_posts p ON p.id = c.post_id
    LEFT JOIN admin_users u ON u.id = c.moderated_by
    ${whereClause}
    ORDER BY c.created_at DESC, c.id DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++};
    `,
    listParams
  );

  const comments = rows.map((r) => ({
    id: r.id,
    postId: r.post_id,
    postSlug: r.post_slug,
    postTitleAr: r.post_title_ar,
    postTitleEn: r.post_title_en,
    userName: r.user_name,
    text: r.text,
    status: r.status,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString(),
    moderatedAt: r.moderated_at ? new Date(r.moderated_at).toISOString() : null,
    moderatorName: r.moderator_name,
  }));

  return {
    comments,
    total,
    page,
    limit,
    totalPages,
  };
}

