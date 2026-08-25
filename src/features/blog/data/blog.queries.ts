import 'server-only';
import { query } from '@/lib/db';

export interface BlogPostSummary {
  id: number;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  categoryAr: string;
  categoryEn: string;
  readTimeAr: string;
  readTimeEn: string;
  image: string;
  likes: number;
  views: number;
  createdAt: string;
  commentCount: number;
}

export interface BlogComment {
  id: number;
  userName: string;
  text: string;
  createdAt: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  contentAr: string;
  contentEn: string;
  comments: BlogComment[];
  seoTitleAr?: string | null;
  seoTitleEn?: string | null;
  seoDescriptionAr?: string | null;
  seoDescriptionEn?: string | null;
  ogImage?: string | null;
}

interface RawDbPostSummary {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  category_ar: string;
  category_en: string;
  read_time_ar: string;
  read_time_en: string;
  image: string;
  likes: number | null;
  views: number | null;
  created_at: string | Date | null;
  comment_count: string | number;
}

interface RawDbPostDetail extends RawDbPostSummary {
  content_ar: string;
  content_en: string;
  seo_title_ar?: string | null;
  seo_title_en?: string | null;
  seo_description_ar?: string | null;
  seo_description_en?: string | null;
  og_image?: string | null;
}

interface RawDbComment {
  id: number;
  user_name: string;
  text: string;
  created_at: string | Date | null;
}

export const BLOG_CATEGORIES = {
  ar: ['الكل', 'بروتوكول الفعاليات', 'العناية بالسيارات', 'أخبار الدانة'],
  en: ['All', 'Events Protocol', 'Car Care', 'AlDanat News'],
} as const;

/**
 * Fetch list of published blog posts with aggregated APPROVED comment counts.
 * Uses a single optimized SQL query to completely eliminate N+1 query overhead.
 * Strictly filters for status = 'PUBLISHED' for public pages.
 */
export async function getBlogPosts(options?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<BlogPostSummary[]> {
  try {
    const { category, limit = 20, offset = 0 } = options || {};

    let sql = `
      SELECT 
        p.id,
        p.slug,
        p.title_ar,
        p.title_en,
        p.excerpt_ar,
        p.excerpt_en,
        p.category_ar,
        p.category_en,
        p.read_time_ar,
        p.read_time_en,
        p.image,
        COALESCE(p.likes, 0) AS likes,
        COALESCE(p.views, 0) AS views,
        p.created_at,
        COUNT(c.id)::int AS comment_count
      FROM blog_posts p
      LEFT JOIN comments c ON c.post_id = p.id AND c.status = 'APPROVED'
      WHERE p.status = 'PUBLISHED'
    `;

    const params: unknown[] = [];

    if (category && category !== 'الكل' && category !== 'All') {
      params.push(category);
      sql += ` AND (p.category_ar = $${params.length} OR p.category_en = $${params.length})`;
    }

    sql += ` GROUP BY p.id ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC NULLS LAST, p.id DESC`;

    params.push(limit);
    sql += ` LIMIT $${params.length}`;

    params.push(offset);
    sql += ` OFFSET $${params.length}`;

    const rows = await query<RawDbPostSummary>(sql, params);

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      excerptAr: row.excerpt_ar,
      excerptEn: row.excerpt_en,
      categoryAr: row.category_ar,
      categoryEn: row.category_en,
      readTimeAr: row.read_time_ar,
      readTimeEn: row.read_time_en,
      image: row.image,
      likes: Number(row.likes) || 0,
      views: Number(row.views) || 0,
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      commentCount: Number(row.comment_count) || 0,
    }));
  } catch (error) {
    console.error('[BlogQueries] Failed to fetch blog posts:', error);
    return [];
  }
}

/**
 * Fetch full blog post details and associated APPROVED comments by unique slug.
 * Strictly requires status = 'PUBLISHED' to prevent public draft leakage.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const postRows = await query<RawDbPostDetail>(
      `
      SELECT 
        p.id,
        p.slug,
        p.title_ar,
        p.title_en,
        p.excerpt_ar,
        p.excerpt_en,
        p.content_ar,
        p.content_en,
        p.category_ar,
        p.category_en,
        p.read_time_ar,
        p.read_time_en,
        p.image,
        p.seo_title_ar,
        p.seo_title_en,
        p.seo_description_ar,
        p.seo_description_en,
        p.og_image,
        COALESCE(p.likes, 0) AS likes,
        COALESCE(p.views, 0) AS views,
        p.created_at,
        COUNT(c.id)::int AS comment_count
      FROM blog_posts p
      LEFT JOIN comments c ON c.post_id = p.id AND c.status = 'APPROVED'
      WHERE p.slug = $1 AND p.status = 'PUBLISHED'
      GROUP BY p.id
      LIMIT 1;
      `,
      [slug],
    );

    if (!postRows || postRows.length === 0) {
      return null;
    }

    const post = postRows[0];

    const commentRows = await query<RawDbComment>(
      `
      SELECT 
        id,
        user_name,
        text,
        created_at
      FROM comments
      WHERE post_id = $1 AND status = 'APPROVED'
      ORDER BY created_at DESC, id DESC;
      `,
      [post.id],
    );

    const comments: BlogComment[] = commentRows.map((c) => ({
      id: c.id,
      userName: c.user_name,
      text: c.text,
      createdAt: c.created_at ? new Date(c.created_at).toISOString() : new Date().toISOString(),
    }));

    return {
      id: post.id,
      slug: post.slug,
      titleAr: post.title_ar,
      titleEn: post.title_en,
      excerptAr: post.excerpt_ar,
      excerptEn: post.excerpt_en,
      contentAr: post.content_ar,
      contentEn: post.content_en,
      categoryAr: post.category_ar,
      categoryEn: post.category_en,
      readTimeAr: post.read_time_ar,
      readTimeEn: post.read_time_en,
      image: post.image,
      likes: Number(post.likes) || 0,
      views: Number(post.views) || 0,
      createdAt: post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString(),
      commentCount: Number(post.comment_count) || 0,
      comments,
      seoTitleAr: post.seo_title_ar,
      seoTitleEn: post.seo_title_en,
      seoDescriptionAr: post.seo_description_ar,
      seoDescriptionEn: post.seo_description_en,
      ogImage: post.og_image,
    };
  } catch (error) {
    console.error('[BlogQueries] Failed to fetch blog post by slug:', error);
    return null;
  }
}

/**
 * Fetch all published post slugs for SSG pre-rendering.
 * Strictly requires status = 'PUBLISHED'.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const rows = await query<{ slug: string }>(
      `SELECT slug FROM blog_posts WHERE status = 'PUBLISHED' ORDER BY published_at DESC NULLS LAST, id DESC;`
    );
    return rows.map((r) => r.slug);
  } catch (error) {
    console.error('[BlogQueries] Failed to fetch post slugs:', error);
    return [];
  }
}

/**
 * Fetch related articles by category (excluding current post).
 */
export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPostSummary[]> {
  try {
    const currentPost = await query<{ id: number; category_ar: string }>(
      `SELECT id, category_ar FROM blog_posts WHERE slug = $1 AND status = 'PUBLISHED' LIMIT 1;`,
      [currentSlug]
    );

    if (!currentPost || currentPost.length === 0) {
      return [];
    }

    const { id, category_ar } = currentPost[0];

    const rows = await query<RawDbPostSummary>(
      `
      SELECT 
        p.id,
        p.slug,
        p.title_ar,
        p.title_en,
        p.excerpt_ar,
        p.excerpt_en,
        p.category_ar,
        p.category_en,
        p.read_time_ar,
        p.read_time_en,
        p.image,
        COALESCE(p.likes, 0) AS likes,
        COALESCE(p.views, 0) AS views,
        p.created_at,
        COUNT(c.id)::int AS comment_count
      FROM blog_posts p
      LEFT JOIN comments c ON c.post_id = p.id AND c.status = 'APPROVED'
      WHERE p.id != $1 AND p.status = 'PUBLISHED' AND p.category_ar = $2
      GROUP BY p.id
      ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC NULLS LAST, p.id DESC
      LIMIT $3;
      `,
      [id, category_ar, limit]
    );

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      excerptAr: row.excerpt_ar,
      excerptEn: row.excerpt_en,
      categoryAr: row.category_ar,
      categoryEn: row.category_en,
      readTimeAr: row.read_time_ar,
      readTimeEn: row.read_time_en,
      image: row.image,
      likes: Number(row.likes) || 0,
      views: Number(row.views) || 0,
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      commentCount: Number(row.comment_count) || 0,
    }));
  } catch (error) {
    console.error('[BlogQueries] Failed to fetch related posts:', error);
    return [];
  }
}
