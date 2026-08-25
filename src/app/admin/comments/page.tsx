import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { CommentModerationTable } from '@/features/admin/components/CommentModerationTable';
import { getAdminComments, getCommentCounts } from '@/features/admin/data/comment.queries';
import { CommentStatus } from '@/features/admin/types/comment.types';

export const dynamic = 'force-dynamic';

interface AdminCommentsPageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminCommentsPage({ searchParams }: AdminCommentsPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;

  const status = (params.status || 'ALL') as CommentStatus | 'ALL';
  const search = params.search || '';
  const page = parseInt(params.page || '1', 10) || 1;
  const limit = 20;

  const [counts, commentsData] = await Promise.all([
    getCommentCounts(),
    getAdminComments({ status, search, page, limit }),
  ]);

  return (
    <AdminShell user={session.user} title="مراجعة واعتماد التعليقات">
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-black text-foreground">
            إدارة مشاركات القراء
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            مراجعة التعليقات الواردة على مقالات المدونة واعتمادها للنشر على الموقع العام أو إخفائها.
          </p>
        </div>

        <CommentModerationTable
          comments={commentsData.comments}
          counts={counts}
          total={commentsData.total}
          page={commentsData.page}
          limit={commentsData.limit}
          totalPages={commentsData.totalPages}
          user={session.user}
        />
      </div>
    </AdminShell>
  );
}

