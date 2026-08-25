import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { DashboardMetrics } from '@/features/admin/components/DashboardMetrics';
import { getDashboardStats, getRecentArticles, getTopArticles } from '@/features/admin/data/dashboard.queries';
import Link from 'next/link';
import { Plus, ArrowLeft, Edit, Eye, Clock, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const [stats, recentArticles, topArticles] = await Promise.all([
    getDashboardStats(),
    getRecentArticles(5),
    getTopArticles(5),
  ]);

  const statusColors: Record<string, string> = {
    PUBLISHED: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    DRAFT: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    ARCHIVED: 'bg-muted text-muted-foreground border-border/80',
  };

  const statusLabels: Record<string, string> = {
    PUBLISHED: 'منشور',
    DRAFT: 'مسودة',
    ARCHIVED: 'مؤرشف',
  };

  return (
    <AdminShell user={session.user} title="لوحة الإدارة المركزية">
      
      {/* ⚠️ Pending Comments Alert Banner */}
      {stats.pendingComments > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl border border-amber-500/40 bg-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs" dir="rtl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-foreground">
                يوجد {stats.pendingComments} تعليق بانتظار المراجعة والاعتماد
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                يرجى مراجعة مشاركات القراء وتحديد المناسب للنشر على الموقع العام.
              </p>
            </div>
          </div>

          <Link
            href="/admin/comments?status=PENDING"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs hover:bg-amber-400 transition-all shrink-0 cursor-pointer"
          >
            <span>مراجعة التعليقات المعلقة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 📊 Live Operational Metrics Grid */}
      <div className="space-y-3" dir="rtl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-foreground">
            المؤشرات والإحصاءات التشغيلية الحية
          </h2>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:bg-primary/90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إنشاء مقال جديد</span>
          </Link>
        </div>

        <DashboardMetrics stats={stats} />
      </div>

      {/* 📈 Content Tables Grid: Top Articles + Recent Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" dir="rtl">
        
        {/* 🏆 Top Articles by Views */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-black text-foreground">
                المقالات الأكثر قراءة وتفاعلاً
              </h2>
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold">
              ترتيب حقيقي حسب المشاهدات
            </span>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-secondary/30 border-b border-border/60 text-muted-foreground font-bold">
                  <tr>
                    <th className="py-3 px-4 text-start">المقال</th>
                    <th className="py-3 px-4 text-center">المشاهدات</th>
                    <th className="py-3 px-4 text-center">الإعجابات</th>
                    <th className="py-3 px-4 text-center">التعليقات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {topArticles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground">
                        لا توجد مقالات منشورة بعد
                      </td>
                    </tr>
                  ) : (
                    topArticles.map((article, idx) => (
                      <tr key={article.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-secondary/80 text-foreground font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <Link
                                href={`/admin/blog/${article.id}/edit`}
                                className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1 block"
                              >
                                {article.titleAr}
                              </Link>
                              <span className="text-[10px] text-muted-foreground font-sans line-clamp-1">
                                /{article.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-sky-500">
                          {article.views.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-rose-500">
                          {article.likes.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-primary">
                          {article.commentCount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 📄 Recent Articles Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-foreground">
              أحدث المقالات المحدثة
            </h2>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>عرض كافة المقالات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-secondary/30 border-b border-border/60 text-muted-foreground font-bold">
                  <tr>
                    <th className="py-3 px-4 text-start">عنوان المقال</th>
                    <th className="py-3 px-4 text-center">الحالة</th>
                    <th className="py-3 px-4 text-start">آخر تحديث</th>
                    <th className="py-3 px-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {recentArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-foreground line-clamp-1">
                          {article.titleAr}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-sans line-clamp-1">
                          /{article.slug}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            statusColors[article.status]
                          }`}
                        >
                          {statusLabels[article.status]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-[11px]">
                        {new Date(article.updatedAt).toLocaleDateString('ar-AE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            href={`/admin/blog/${article.id}/edit`}
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-secondary/50 text-foreground"
                            title="تعديل"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/blog/${article.id}/preview`}
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-secondary/50 text-foreground"
                            title="معاينة"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </AdminShell>
  );
}
