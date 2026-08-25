import { requireAdmin } from '@/lib/auth/guard';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { ArticleEditor } from '@/features/admin/components/ArticleEditor';

export const dynamic = 'force-dynamic';

export default async function AdminNewArticlePage() {
  const session = await requireAdmin();

  return (
    <AdminShell user={session.user} title="إنشاء مقال جديد">
      <ArticleEditor user={session.user} />
    </AdminShell>
  );
}

