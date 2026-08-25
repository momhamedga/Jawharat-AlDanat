import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { ArticleTable } from '@/features/admin/components/ArticleTable';
import { getAdminArticles } from '@/features/admin/data/article.queries';
import { PostStatus } from '@/features/admin/types/cms.types';

export const dynamic = 'force-dynamic';

interface AdminBlogPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;

  const search = params.search || '';
  const status = (params.status || 'ALL') as PostStatus | 'ALL';
  const page = parseInt(params.page || '1', 10) || 1;

  const { articles, totalCount, totalPages } = await getAdminArticles({
    search,
    status,
    page,
    limit: 10,
  });

  return (
    <AdminShell user={session.user} title="إدارة المقالات والأخبار">
      <ArticleTable
        articles={articles}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={page}
        currentSearch={search}
        currentStatus={status}
        user={session.user}
      />
    </AdminShell>
  );
}

