'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminCommentListItem, CommentCounts, CommentStatus } from '../types/comment.types';
import { AdminUser } from '@/features/auth/types/auth.types';
import { isSuperAdmin, canManageAdminOps } from '@/features/auth/services/rbac.service';
import {
  approveCommentAction,
  hideCommentAction,
  spamCommentAction,
  deleteCommentAction,
} from '../actions/comment.action';
import {
  CheckCircle,
  EyeOff,
  AlertOctagon,
  Trash2,
  Loader2,
  Search,
  MessageSquare,
  Clock,
  User,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface CommentModerationTableProps {
  comments: AdminCommentListItem[];
  counts: CommentCounts;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  user: AdminUser;
}

export function CommentModerationTable({
  comments,
  counts,
  total,
  page,
  totalPages,
  user,
}: CommentModerationTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = (searchParams.get('status') || 'ALL') as CommentStatus | 'ALL';
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isPending, setIsPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const canModerate = canManageAdminOps(user);
  const canDelete = isSuperAdmin(user);

  const statusColors: Record<CommentStatus, string> = {
    PENDING: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    APPROVED: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    HIDDEN: 'bg-muted text-muted-foreground border-border/80',
    SPAM: 'bg-destructive/15 text-destructive border-destructive/30',
  };

  const statusLabels: Record<CommentStatus, string> = {
    PENDING: 'بانتظار المراجعة (PENDING)',
    APPROVED: 'معتمد ومنشور (APPROVED)',
    HIDDEN: 'مخفي (HIDDEN)',
    SPAM: 'بريد عشوائي (SPAM)',
  };

  const handleStatusFilter = (status: CommentStatus | 'ALL') => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === 'ALL') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    params.set('page', '1');
    router.push(`/admin/comments?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/admin/comments?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/admin/comments?${params.toString()}`);
  };

  const executeAction = async (
    commentId: number,
    actionFn: (id: number) => Promise<{ success: boolean; error?: string }>,
    successMsg: string
  ) => {
    setIsPending(true);
    setProcessingId(commentId);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const res = await actionFn(commentId);
      if (!res.success) {
        setActionError(res.error || 'فشلت العملية');
      } else {
        setSuccessMessage(successMsg);
        router.refresh();
      }
    } catch {
      setActionError('حدث خطأ غير متوقع في الخادم');
    } finally {
      setIsPending(false);
      setProcessingId(null);
    }
  };

  const handleApprove = (id: number) => {
    executeAction(id, approveCommentAction, 'تم اعتماد ونشر التعليق بنجاح');
  };

  const handleHide = (id: number) => {
    executeAction(id, hideCommentAction, 'تم إخفاء التعليق بنجاح');
  };

  const handleSpam = (id: number) => {
    executeAction(id, spamCommentAction, 'تم تصنيف التعليق كبريد عشوائي (SPAM)');
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('هل أنت متأكد من حذف هذا التعليق نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.');
    if (!confirm) return;
    executeAction(id, deleteCommentAction, 'تم حذف التعليق نهائياً');
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* ⚠️ Feedback Banners */}
      {actionError && (
        <div className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive text-xs font-bold">
          {actionError}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 📑 Status Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border/60 overflow-x-auto">
          <button
            type="button"
            onClick={() => handleStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentStatus === 'ALL'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            الكل ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              currentStatus === 'PENDING'
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>بانتظار المراجعة ({counts.pending})</span>
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter('APPROVED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentStatus === 'APPROVED'
                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            المعتمدة ({counts.approved})
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter('HIDDEN')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentStatus === 'HIDDEN'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            المخفية ({counts.hidden})
          </button>
          <button
            type="button"
            onClick={() => handleStatusFilter('SPAM')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentStatus === 'SPAM'
                ? 'bg-destructive/20 text-destructive border border-destructive/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            عشوائي ({counts.spam})
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[240px]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="بحث في التعليقات أو المقالات..."
            className="w-full py-2 ps-9 pe-3 rounded-xl border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
          <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </form>
      </div>

      {/* 💬 Comments Moderation Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-secondary/30 border-b border-border/60 text-muted-foreground font-bold">
              <tr>
                <th className="py-3 px-4 text-start">الكاتب والتعليق</th>
                <th className="py-3 px-4 text-start">المقال المرتبط</th>
                <th className="py-3 px-4 text-center">الحالة</th>
                <th className="py-3 px-4 text-start">تاريخ الإرسال</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {comments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <MessageSquare className="w-8 h-8 opacity-40 text-muted-foreground" />
                      <p className="font-bold">لا توجد تعليقات مطابقة للمعايير المحددة</p>
                    </div>
                  </td>
                </tr>
              ) : (
                comments.map((comment) => {
                  const isOperating = isPending && processingId === comment.id;

                  return (
                    <tr key={comment.id} className="hover:bg-secondary/20 transition-colors">
                      
                      {/* Author & Comment Body */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-secondary text-primary font-bold flex items-center justify-center text-xs shrink-0 select-none border border-border/60 mt-0.5">
                            {comment.userName.charAt(0).toUpperCase() || <User className="w-3.5 h-3.5" />}
                          </div>
                          <div className="space-y-1 min-w-0">
                            <span className="font-bold text-foreground block truncate">
                              {comment.userName}
                            </span>
                            <p className="text-muted-foreground/90 leading-relaxed whitespace-pre-line text-[11px] line-clamp-3">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Post Association */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        {comment.postSlug ? (
                          <div className="space-y-0.5">
                            <Link
                              href={`/ar/blog/${comment.postSlug}`}
                              target="_blank"
                              className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 flex items-center gap-1"
                            >
                              <span>{comment.postTitleAr || comment.postSlug}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                            </Link>
                            <span className="text-[10px] text-muted-foreground font-sans block truncate">
                              /{comment.postSlug}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            statusColors[comment.status]
                          }`}
                        >
                          {statusLabels[comment.status]}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                        <div>
                          {new Date(comment.createdAt).toLocaleDateString('ar-AE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        {comment.moderatedAt && (
                          <div className="text-[10px] text-muted-foreground/70 mt-0.5">
                            تمت المراجعة: {new Date(comment.moderatedAt).toLocaleDateString('ar-AE')}
                          </div>
                        )}
                      </td>

                      {/* Moderation Controls */}
                      <td className="py-3.5 px-4 text-center">
                        {isOperating ? (
                          <div className="flex justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            
                            {/* Approve Button */}
                            {canModerate && comment.status !== 'APPROVED' && (
                              <button
                                type="button"
                                onClick={() => handleApprove(comment.id)}
                                className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer transition-colors"
                                title="قبول ونشر التعليق"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Hide Button */}
                            {canModerate && comment.status !== 'HIDDEN' && (
                              <button
                                type="button"
                                onClick={() => handleHide(comment.id)}
                                className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
                                title="إخفاء التعليق"
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Spam Button */}
                            {canModerate && comment.status !== 'SPAM' && (
                              <button
                                type="button"
                                onClick={() => handleSpam(comment.id)}
                                className="p-1.5 rounded-lg border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors"
                                title="تصنيف كبريد عشوائي"
                              >
                                <AlertOctagon className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Delete Button (SUPER_ADMIN only) */}
                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => handleDelete(comment.id)}
                                className="p-1.5 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 cursor-pointer transition-colors"
                                title="حذف نهائي"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 🧭 Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <div>
              عرض صفحة <span className="font-bold text-foreground">{page}</span> من{' '}
              <span className="font-bold text-foreground">{totalPages}</span> (إجمالي {total} تعليق)
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1.5 rounded-xl border border-border/80 bg-background text-foreground font-bold hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                السابق
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1.5 rounded-xl border border-border/80 bg-background text-foreground font-bold hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                التالي
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

