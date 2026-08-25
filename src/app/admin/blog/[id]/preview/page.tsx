import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { getAdminArticleById } from '@/features/admin/data/article.queries';
import { MarkdownRenderer } from '@/features/blog/components/MarkdownRenderer';
import { ArrowRight, Edit, Calendar, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface AdminPreviewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminPreviewArticlePage({ params }: AdminPreviewArticlePageProps) {
  const session = await requireAdmin();
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);

  if (isNaN(id)) notFound();

  const article = await getAdminArticleById(id);
  if (!article) notFound();

  const statusLabels = {
    PUBLISHED: 'منشور (PUBLISHED)',
    DRAFT: 'مسودة داخلية (DRAFT)',
    ARCHIVED: 'مؤرشف (ARCHIVED)',
  };

  const statusColors = {
    PUBLISHED: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    DRAFT: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    ARCHIVED: 'bg-muted text-muted-foreground border-border/80',
  };

  return (
    <AdminShell user={session.user} title={`معاينة المقال: ${article.titleAr}`}>
      
      {/* 🧭 Top Action Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/80" dir="rtl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-xl border border-border/80 hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[article.status]}`}>
            {statusLabels[article.status]}
          </span>
        </div>

        <Link
          href={`/admin/blog/${article.id}/edit`}
          className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>تعديل المقال</span>
        </Link>
      </div>

      {/* 🇦🇪 Arabic Preview */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs" dir="rtl">
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {article.categoryAr} • {article.readTimeAr}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {article.titleAr}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {article.excerptAr}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/40">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.updatedAt).toLocaleDateString('ar-AE')}
            </span>
            {article.authorName && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {article.authorName}
              </span>
            )}
          </div>
        </div>

        {article.image && (
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted border border-border/60">
            <Image
              src={article.image}
              alt={article.titleAr}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 rounded-2xl bg-secondary/20">
          <MarkdownRenderer content={article.contentAr} />
        </div>
      </div>

      {/* 🇬🇧 English Preview */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs text-left" dir="ltr">
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-sans">
            {article.categoryEn} • {article.readTimeEn}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-sans">
            {article.titleEn}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans">
            {article.excerptEn}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/40 font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.updatedAt).toLocaleDateString('en-US')}
            </span>
            {article.authorName && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {article.authorName}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-secondary/20 font-sans">
          <MarkdownRenderer content={article.contentEn} />
        </div>
      </div>

    </AdminShell>
  );
}
