'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminArticleListItem, PostStatus } from '../types/cms.types';
import { AdminUser } from '@/features/auth/types/auth.types';
import { canManageAdminOps } from '@/features/auth/services/rbac.service';
import { archiveArticleAction } from '../actions/article.action';
import {
  Search,
  Plus,
  Edit,
  Eye,
  Archive,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Calendar,
  User,
} from 'lucide-react';

interface ArticleTableProps {
  articles: AdminArticleListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  currentSearch?: string;
  currentStatus?: string;
  user: AdminUser;
}

export function ArticleTable({
  articles,
  totalCount,
  totalPages,
  currentPage,
  currentSearch = '',
  currentStatus = 'ALL',
  user,
}: ArticleTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(currentSearch);
  const [archivingId, setArchivingId] = useState<number | null>(null);

  const canArchive = canManageAdminOps(user);

  const updateFilters = (newStatus?: string, newSearch?: string, newPage = 1) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus !== undefined) {
      if (newStatus === 'ALL') params.delete('status');
      else params.set('status', newStatus);
    }

    if (newSearch !== undefined) {
      if (!newSearch.trim()) params.delete('search');
      else params.set('search', newSearch.trim());
    }

    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }

    router.push(`/admin/blog?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(undefined, search, 1);
  };

  const handleArchive = async (id: number, title: string) => {
    const confirm = window.confirm(`هل أنت متأكد من أرشفة المقال: "${title}"؟ لن يظهر المقال في الموقع العام بعد الأرشفة.`);
    if (!confirm) return;

    setArchivingId(id);
    try {
      const res = await archiveArticleAction(id);
      if (!res.success) {
        alert(res.error || 'فشلت أرشفة المقال');
      } else {
        router.refresh();
      }
    } finally {
      setArchivingId(null);
    }
  };

  const statusColors: Record<PostStatus, string> = {
    PUBLISHED: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    DRAFT: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    ARCHIVED: 'bg-muted text-muted-foreground border-border/80',
  };

  const statusLabels: Record<PostStatus, string> = {
    PUBLISHED: 'منشور',
    DRAFT: 'مسودة',
    ARCHIVED: 'مؤرشف',
  };

  return (
    <div className="space-y-4" dir="rtl">
      
      {/* 🔍 Top Bar: Search, Status Filters & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border/60 overflow-x-auto">
          {[
            { key: 'ALL', label: 'الكل' },
            { key: 'PUBLISHED', label: 'المنشورة' },
            { key: 'DRAFT', label: 'المسودات' },
            { key: 'ARCHIVED', label: 'المؤرشفة' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => updateFilters(tab.key, undefined, 1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                currentStatus === tab.key
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Create Actions */}
        <div className="flex items-center gap-2.5">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث بالعنوان أو الرابط..."
              className="w-full py-2 px-3 ps-8 rounded-xl border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            <Search className="w-3.5 h-3.5 absolute top-3 start-2.5 text-muted-foreground pointer-events-none" />
          </form>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:bg-primary/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>مقال جديد</span>
          </Link>
        </div>

      </div>

      {/* 📋 Articles Table / Cards */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
        
        {articles.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-bold text-muted-foreground">
              لا توجد مقالات مطابقة للمحددات الحالية
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إنشاء مقال جديد الآن</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-secondary/30 border-b border-border/60 text-muted-foreground font-bold">
                  <tr>
                    <th className="py-3.5 px-4 text-start">عنوان المقال</th>
                    <th className="py-3.5 px-4 text-start">الرابط الدائم (Slug)</th>
                    <th className="py-3.5 px-4 text-center">الحالة</th>
                    <th className="py-3.5 px-4 text-start">الكاتب</th>
                    <th className="py-3.5 px-4 text-start">آخر تحديث</th>
                    <th className="py-3.5 px-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-foreground line-clamp-1">
                          {article.titleAr}
                        </div>
                        <div className="text-[10px] text-muted-foreground line-clamp-1 font-sans">
                          {article.titleEn}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                        /{article.slug}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            statusColors[article.status]
                          }`}
                        >
                          {statusLabels[article.status]}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {article.authorName || '—'}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                        {new Date(article.updatedAt).toLocaleDateString('ar-AE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            href={`/admin/blog/${article.id}/edit`}
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-secondary/50 text-foreground transition-colors"
                            title="تعديل المقال"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/blog/${article.id}/preview`}
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-secondary/50 text-foreground transition-colors"
                            title="معاينة المقال"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          {canArchive && article.status !== 'ARCHIVED' && (
                            <button
                              type="button"
                              onClick={() => handleArchive(article.id, article.titleAr)}
                              disabled={archivingId === article.id}
                              className="p-1.5 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                              title="أرشفة المقال"
                            >
                              {archivingId === article.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Archive className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View (< md) */}
            <div className="md:hidden divide-y divide-border/60">
              {articles.map((article) => (
                <div key={article.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-xs font-bold text-foreground line-clamp-2">
                        {article.titleAr}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-sans line-clamp-1">
                        {article.titleEn}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border shrink-0 ${
                        statusColors[article.status]
                      }`}
                    >
                      {statusLabels[article.status]}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.updatedAt).toLocaleDateString('ar-AE')}</span>
                    </div>
                    {article.authorName && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.authorName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                    <Link
                      href={`/admin/blog/${article.id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/80 text-xs font-bold hover:bg-secondary/50"
                    >
                      <Edit className="w-3 h-3" />
                      <span>تعديل</span>
                    </Link>
                    <Link
                      href={`/admin/blog/${article.id}/preview`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/80 text-xs font-bold hover:bg-secondary/50"
                    >
                      <Eye className="w-3 h-3" />
                      <span>معاينة</span>
                    </Link>
                    {canArchive && article.status !== 'ARCHIVED' && (
                      <button
                        type="button"
                        onClick={() => handleArchive(article.id, article.titleAr)}
                        disabled={archivingId === article.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 text-xs font-bold"
                      >
                        <Archive className="w-3 h-3" />
                        <span>أرشفة</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* 📄 Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-2 text-xs text-muted-foreground">
          <span>
            إجمالي النتائج: <strong>{totalCount}</strong> مقال (الصفحة {currentPage} من {totalPages})
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => updateFilters(undefined, undefined, currentPage - 1)}
              className="p-2 rounded-xl border border-border/80 hover:bg-secondary/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => updateFilters(undefined, undefined, currentPage + 1)}
              className="p-2 rounded-xl border border-border/80 hover:bg-secondary/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

