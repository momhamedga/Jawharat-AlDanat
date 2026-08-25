import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { ArticleEditor } from '@/features/admin/components/ArticleEditor';
import { getAdminArticleById } from '@/features/admin/data/article.queries';

export const dynamic = 'force-dynamic';

interface AdminEditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditArticlePage({ params }: AdminEditArticlePageProps) {
  const session = await requireAdmin();
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);

  if (isNaN(id)) {
    notFound();
  }

  const article = await getAdminArticleById(id);
  if (!article) {
    notFound();
  }

  return (
    <AdminShell user={session.user} title={`تعديل المقال #${article.id}`}>
      <ArticleEditor initialData={article} user={session.user} />
    </AdminShell>
  );
}

