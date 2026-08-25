import { requireAdmin } from '@/lib/auth/guard';
import { isSuperAdmin } from '@/features/auth/services/rbac.service';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { AuditLogTable } from '@/features/admin/components/AuditLogTable';
import { getAuditLogs } from '@/features/admin/data/audit.queries';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface AdminAuditPageProps {
  searchParams: Promise<{
    action?: string;
    page?: string;
  }>;
}

export default async function AdminAuditPage({ searchParams }: AdminAuditPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;

  // RBAC Enforcement: Only SUPER_ADMIN can access audit logs
  if (!isSuperAdmin(session.user)) {
    return (
      <AdminShell user={session.user} title="سجل العمليات والرقابة">
        <div className="p-8 rounded-3xl border border-destructive/30 bg-destructive/10 text-center space-y-4 max-w-md mx-auto my-12" dir="rtl">
          <div className="w-12 h-12 rounded-2xl bg-destructive/20 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-base font-black text-foreground">
            صلاحية غير كافية
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            الاطلاع على سجل العمليات والرقابة الأمنية مقتصر فقط على حسابات المدير العام (SUPER_ADMIN).
          </p>
          <div className="pt-2">
            <Link
              href="/admin"
              className="inline-block py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              العودة للوحة التحكم
            </Link>
          </div>
        </div>
      </AdminShell>
    );
  }

  const action = params.action || 'ALL';
  const page = parseInt(params.page || '1', 10) || 1;
  const limit = 25;

  const auditData = await getAuditLogs({ action, page, limit });

  return (
    <AdminShell user={session.user} title="سجل العمليات والرقابة الأمنية">
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-black text-foreground">
            سجل العمليات والأحداث الأمنية (Audit Trail)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            سجل رقابي غير قابل للتعديل يوثق كافة العمليات الإدارية، تسجيل الدخول، وحركات نشر وتعديل المحتوى والتعليقات.
          </p>
        </div>

        <AuditLogTable
          logs={auditData.logs}
          total={auditData.total}
          page={auditData.page}
          limit={auditData.limit}
          totalPages={auditData.totalPages}
        />
      </div>
    </AdminShell>
  );
}

