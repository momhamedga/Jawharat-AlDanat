export type CommentStatus = 'PENDING' | 'APPROVED' | 'HIDDEN' | 'SPAM';

export interface AdminCommentListItem {
  id: number;
  postId: number | null;
  postSlug: string | null;
  postTitleAr: string | null;
  postTitleEn: string | null;
  userName: string;
  text: string;
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
  moderatedAt?: string | null;
  moderatorName?: string | null;
}

export interface CommentFilterParams {
  status?: CommentStatus | 'ALL';
  search?: string;
  page?: number;
  limit?: number;
}

export interface CommentCounts {
  all: number;
  pending: number;
  approved: number;
  hidden: number;
  spam: number;
}

export interface CommentActionResult {
  success: boolean;
  error?: string;
  id?: number;
}

