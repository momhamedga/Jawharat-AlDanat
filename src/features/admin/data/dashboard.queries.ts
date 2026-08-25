import 'server-only';
import { query } from '@/lib/db';
import { DashboardStats, AdminArticleListItem } from '../types/cms.types';

interface RawDbDashboardStats {
  total_articles: string | number;
  published_articles: string | number;
  draft_articles: string | number;
  archived_articles: string | number;
  total_comments: string | number;
  approved_comments: string | number;
  pending_comments: string | number;
  hidden_comments: string | number;
  spam_comments: string | number;
  total_views: string | number;
  total_likes: string | number;
}

interface RawDbArticleItem {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  category_ar: string;
  category_en: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author_name: string | null;
  likes: number | null;
  views: number | null;
  comment_count: string | number;
  published_at: Date | string | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
}

/**
 * Fetches real aggregated dashboard statistics in a single performant SQL query.
 * 0 mock values, 0 fabricated trend percentages.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const rows = await query<RawDbDashboardStats>(`
    SELECT
      COUNT(p.id)::int AS total_articles,
      COUNT(p.id) FILTER (WHERE p.status = 'PUBLISHED')::int AS published_articles,
      COUNT(p.id) FILTER (WHERE p.status = 'DRAFT')::int AS draft_articles,
      COUNT(p.id) FILTER (WHERE p.status = 'ARCHIVED')::int AS archived_articles,
      (SELECT COUNT(*)::int FROM comments) AS total_comments,
      (SELECT COUNT(*)::int FROM comments WHERE status = 'APPROVED') AS approved_comments,
      (SELECT COUNT(*)::int FROM comments WHERE status = 'PENDING') AS pending_comments,
      (SELECT COUNT(*)::int FROM comments WHERE status = 'HIDDEN') AS hidden_comments,
      (SELECT COUNT(*)::int FROM comments WHERE status = 'SPAM') AS spam_comments,
      COALESCE(SUM(p.views), 0)::int AS total_views,
      COALESCE(SUM(p.likes), 0)::int AS total_likes
    FROM blog_posts p;
  `);

  const stat = rows[0];
  return {
    totalArticles: Number(stat?.total_articles) || 0,
    publishedArticles: Number(stat?.published_articles) || 0,
    draftArticles: Number(stat?.draft_articles) || 0,
    archivedArticles: Number(stat?.archived_articles) || 0,
    totalComments: Number(stat?.total_comments) || 0,
    approvedComments: Number(stat?.approved_comments) || 0,
    pendingComments: Number(stat?.pending_comments) || 0,
    hiddenComments: Number(stat?.hidden_comments) || 0,
    spamComments: Number(stat?.spam_comments) || 0,
    totalViews: Number(stat?.total_views) || 0,
    totalLikes: Number(stat?.total_likes) || 0,
  };
}

/**
 * Fetches top articles ranked by views.
 */
export async function getTopArticles(limit = 5): Promise<AdminArticleListItem[]> {
  const rows = await query<RawDbArticleItem>(
    `
    SELECT
      p.id,
      p.slug,
      p.title_ar,
      p.title_en,
      p.category_ar,
      p.category_en,
      p.status,
      u.full_name AS author_name,
      COALESCE(p.likes, 0) AS likes,
      COALESCE(p.views, 0) AS views,
      COUNT(c.id) FILTER (WHERE c.status = 'APPROVED')::int AS comment_count,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM blog_posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    LEFT JOIN comments c ON c.post_id = p.id
    WHERE p.status = 'PUBLISHED'
    GROUP BY p.id, u.full_name
    ORDER BY p.views DESC, p.likes DESC, p.id DESC
    LIMIT $1;
    `,
    [limit],
  );

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    titleAr: r.title_ar,
    titleEn: r.title_en,
    categoryAr: r.category_ar,
    categoryEn: r.category_en,
    status: r.status,
    authorName: r.author_name,
    likes: Number(r.likes) || 0,
    views: Number(r.views) || 0,
    commentCount: Number(r.comment_count) || 0,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString(),
  }));
}

/**
 * Fetches recent articles for dashboard overview.
 */
export async function getRecentArticles(limit = 5): Promise<AdminArticleListItem[]> {
  const rows = await query<RawDbArticleItem>(
    `
    SELECT
      p.id,
      p.slug,
      p.title_ar,
      p.title_en,
      p.category_ar,
      p.category_en,
      p.status,
      u.full_name AS author_name,
      COALESCE(p.likes, 0) AS likes,
      COALESCE(p.views, 0) AS views,
      COUNT(c.id) FILTER (WHERE c.status = 'APPROVED')::int AS comment_count,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM blog_posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    LEFT JOIN comments c ON c.post_id = p.id
    GROUP BY p.id, u.full_name
    ORDER BY p.updated_at DESC, p.id DESC
    LIMIT $1;
    `,
    [limit],
  );

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    titleAr: r.title_ar,
    titleEn: r.title_en,
    categoryAr: r.category_ar,
    categoryEn: r.category_en,
    status: r.status,
    authorName: r.author_name,
    likes: Number(r.likes) || 0,
    views: Number(r.views) || 0,
    commentCount: Number(r.comment_count) || 0,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString(),
  }));
}
