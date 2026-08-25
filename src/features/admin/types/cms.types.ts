export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface AdminArticleListItem {
  id: number;
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  status: PostStatus;
  authorName?: string | null;
  likes: number;
  views: number;
  commentCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminArticleDetail extends AdminArticleListItem {
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  readTimeAr: string;
  readTimeEn: string;
  image: string;
  seoTitleAr?: string | null;
  seoTitleEn?: string | null;
  seoDescriptionAr?: string | null;
  seoDescriptionEn?: string | null;
  ogImage?: string | null;
  authorId?: string | null;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  archivedArticles: number;
  totalComments: number;
  approvedComments: number;
  pendingComments: number;
  hiddenComments: number;
  spamComments: number;
  totalViews: number;
  totalLikes: number;
}

export interface ArticleFilterParams {
  search?: string;
  status?: PostStatus | 'ALL';
  page?: number;
  limit?: number;
}

export interface ArticleActionResult {
  success: boolean;
  error?: string;
  slug?: string;
  id?: number;
  fieldErrors?: Record<string, string>;
}
