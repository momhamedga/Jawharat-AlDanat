import 'server-only';
import { query } from '@/lib/db';
import {
  AdminArticleListItem,
  AdminArticleDetail,
  ArticleFilterParams,
  PostStatus,
} from '../types/cms.types';
import { ArticleInput } from '../schemas/article.schema';

interface RawDbArticleListItem {
  id: number;
  slug: string;
  title_ar: string;
  title_en: string;
  category_ar: string;
  category_en: string;
  status: PostStatus;
  author_name: string | null;
  likes: number | null;
  views: number | null;
  comment_count: string | number;
  published_at: Date | string | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
}

interface RawDbArticleDetail extends RawDbArticleListItem {
  excerpt_ar: string;
  excerpt_en: string;
  content_ar: string;
  content_en: string;
  read_time_ar: string;
  read_time_en: string;
  image: string;
  seo_title_ar: string | null;
  seo_title_en: string | null;
  seo_description_ar: string | null;
  seo_description_en: string | null;
  og_image: string | null;
  author_id: string | null;
}

/**
 * Checks if a slug is already in use by another article.
 */
export async function isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
  let sql = 'SELECT id FROM blog_posts WHERE slug = $1';
  const params: unknown[] = [slug];

  if (excludeId) {
    sql += ' AND id != $2';
    params.push(excludeId);
  }

  const rows = await query<{ id: number }>(sql, params);
  return rows.length > 0;
}

/**
 * Fetches filtered and paginated articles for admin table.
 */
export async function getAdminArticles(params: ArticleFilterParams): Promise<{
  articles: AdminArticleListItem[];
  totalCount: number;
  totalPages: number;
}> {
  const { search, status, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const whereClauses: string[] = [];
  const queryParams: unknown[] = [];

  if (status && status !== 'ALL') {
    queryParams.push(status);
    whereClauses.push(`p.status = $${queryParams.length}`);
  }

  if (search && search.trim()) {
    queryParams.push(`%${search.trim()}%`);
    const idx = queryParams.length;
    whereClauses.push(`(p.title_ar ILIKE $${idx} OR p.title_en ILIKE $${idx} OR p.slug ILIKE $${idx})`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // 1. Get total count
  const countSql = `SELECT COUNT(p.id)::int AS total FROM blog_posts p ${whereSql};`;
  const countRows = await query<{ total: number }>(countSql, queryParams);
  const totalCount = Number(countRows[0]?.total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // 2. Get paginated articles
  const listParams = [...queryParams, limit, offset];
  const listSql = `
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
      COUNT(c.id)::int AS comment_count,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM blog_posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    LEFT JOIN comments c ON c.post_id = p.id
    ${whereSql}
    GROUP BY p.id, u.full_name
    ORDER BY p.updated_at DESC, p.id DESC
    LIMIT $${listParams.length - 1} OFFSET $${listParams.length};
  `;

  const rows = await query<RawDbArticleListItem>(listSql, listParams);

  const articles = rows.map((r) => ({
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

  return { articles, totalCount, totalPages };
}

/**
 * Fetches full article detail by ID for editing or previewing.
 */
export async function getAdminArticleById(id: number): Promise<AdminArticleDetail | null> {
  const rows = await query<RawDbArticleDetail>(
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
      p.status,
      p.seo_title_ar,
      p.seo_title_en,
      p.seo_description_ar,
      p.seo_description_en,
      p.og_image,
      p.author_id,
      u.full_name AS author_name,
      COALESCE(p.likes, 0) AS likes,
      COALESCE(p.views, 0) AS views,
      COUNT(c.id)::int AS comment_count,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM blog_posts p
    LEFT JOIN admin_users u ON u.id = p.author_id
    LEFT JOIN comments c ON c.post_id = p.id
    WHERE p.id = $1
    GROUP BY p.id, u.full_name
    LIMIT 1;
    `,
    [id],
  );

  if (!rows || rows.length === 0) return null;

  const r = rows[0];
  return {
    id: r.id,
    slug: r.slug,
    titleAr: r.title_ar,
    titleEn: r.title_en,
    excerptAr: r.excerpt_ar,
    excerptEn: r.excerpt_en,
    contentAr: r.content_ar,
    contentEn: r.content_en,
    categoryAr: r.category_ar,
    categoryEn: r.category_en,
    readTimeAr: r.read_time_ar,
    readTimeEn: r.read_time_en,
    image: r.image,
    status: r.status,
    seoTitleAr: r.seo_title_ar,
    seoTitleEn: r.seo_title_en,
    seoDescriptionAr: r.seo_description_ar,
    seoDescriptionEn: r.seo_description_en,
    ogImage: r.og_image,
    authorId: r.author_id,
    authorName: r.author_name,
    likes: Number(r.likes) || 0,
    views: Number(r.views) || 0,
    commentCount: Number(r.comment_count) || 0,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString(),
  };
}

/**
 * Creates a new article in the database.
 */
export async function createAdminArticle(
  data: ArticleInput,
  authorId: string,
): Promise<{ id: number; slug: string }> {
  const isPublished = data.status === 'PUBLISHED';
  const publishedAt = isPublished ? new Date() : null;

  const rows = await query<{ id: number; slug: string }>(
    `
    INSERT INTO blog_posts (
      slug,
      title_ar,
      title_en,
      excerpt_ar,
      excerpt_en,
      content_ar,
      content_en,
      category_ar,
      category_en,
      read_time_ar,
      read_time_en,
      image,
      status,
      seo_title_ar,
      seo_title_en,
      seo_description_ar,
      seo_description_en,
      og_image,
      author_id,
      published_at,
      created_at,
      updated_at
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      NOW(), NOW()
    )
    RETURNING id, slug;
    `,
    [
      data.slug,
      data.titleAr,
      data.titleEn,
      data.excerptAr,
      data.excerptEn,
      data.contentAr,
      data.contentEn,
      data.categoryAr,
      data.categoryEn,
      data.readTimeAr,
      data.readTimeEn,
      data.image,
      data.status,
      data.seoTitleAr || null,
      data.seoTitleEn || null,
      data.seoDescriptionAr || null,
      data.seoDescriptionEn || null,
      data.ogImage || null,
      authorId,
      publishedAt ? publishedAt.toISOString() : null,
    ],
  );

  return rows[0];
}

/**
 * Updates an existing article safely.
 */
export async function updateAdminArticle(
  id: number,
  data: ArticleInput,
): Promise<{ id: number; slug: string }> {
  const current = await getAdminArticleById(id);
  if (!current) throw new Error('Article not found');

  const willPublish = data.status === 'PUBLISHED' && current.status !== 'PUBLISHED';
  const publishedAt = willPublish ? new Date() : current.publishedAt ? new Date(current.publishedAt) : null;

  const rows = await query<{ id: number; slug: string }>(
    `
    UPDATE blog_posts
    SET
      slug = $1,
      title_ar = $2,
      title_en = $3,
      excerpt_ar = $4,
      excerpt_en = $5,
      content_ar = $6,
      content_en = $7,
      category_ar = $8,
      category_en = $9,
      read_time_ar = $10,
      read_time_en = $11,
      image = $12,
      status = $13,
      seo_title_ar = $14,
      seo_title_en = $15,
      seo_description_ar = $16,
      seo_description_en = $17,
      og_image = $18,
      published_at = $19,
      updated_at = NOW()
    WHERE id = $20
    RETURNING id, slug;
    `,
    [
      data.slug,
      data.titleAr,
      data.titleEn,
      data.excerptAr,
      data.excerptEn,
      data.contentAr,
      data.contentEn,
      data.categoryAr,
      data.categoryEn,
      data.readTimeAr,
      data.readTimeEn,
      data.image,
      data.status,
      data.seoTitleAr || null,
      data.seoTitleEn || null,
      data.seoDescriptionAr || null,
      data.seoDescriptionEn || null,
      data.ogImage || null,
      publishedAt ? publishedAt.toISOString() : null,
      id,
    ],
  );

  return rows[0];
}

/**
 * Archives an article (status = 'ARCHIVED').
 */
export async function archiveAdminArticle(id: number): Promise<void> {
  await query(
    `
    UPDATE blog_posts
    SET status = 'ARCHIVED', updated_at = NOW()
    WHERE id = $1;
    `,
    [id],
  );
}
