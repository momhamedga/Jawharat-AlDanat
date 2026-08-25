'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AuditLogListItem } from '../data/audit.queries';
import { Shield, Terminal, FileText, MessageSquare } from 'lucide-react';

interface AuditLogTableProps {
  logs: AuditLogListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function AuditLogTable({
  logs,
  total,
  page,
  totalPages,
}: AuditLogTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentAction = searchParams.get('action') || 'ALL';

  const actionLabels: Record<string, { label: string; color: string; icon: typeof Shield }> = {
    LOGIN_SUCCESS: { label: 'تسجيل دخول ناجح', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: Shield },
    LOGIN_FAILURE: { label: 'فشل تسجيل الدخول', color: 'bg-destructive/15 text-destructive border-destructive/30', icon: Shield },
    LOGOUT: { label: 'تسجيل خروج', color: 'bg-secondary text-muted-foreground border-border/80', icon: Shield },
    PASSWORD_CHANGED: { label: 'تغيير كلمة المرور', color: 'bg-primary/15 text-primary border-primary/30', icon: Shield },
    ARTICLE_CREATED: { label: 'إنشاء مقال', color: 'bg-sky-500/15 text-sky-500 border-sky-500/30', icon: FileText },
    ARTICLE_UPDATED: { label: 'تحديث مقال', color: 'bg-sky-500/15 text-sky-500 border-sky-500/30', icon: FileText },
    ARTICLE_PUBLISHED: { label: 'نشر مقال', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: FileText },
    ARTICLE_ARCHIVED: { label: 'أرشفة مقال', color: 'bg-amber-500/15 text-amber-500 border-amber-500/30', icon: FileText },
    ARTICLE_REPUBLISHED: { label: 'إعادة نشر مقال', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: FileText },
    COMMENT_APPROVED: { label: 'اعتماد تعليق', color: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: MessageSquare },
    COMMENT_HIDDEN: { label: 'إخفاء تعليق', color: 'bg-secondary text-muted-foreground border-border/80', icon: MessageSquare },
    COMMENT_MARKED_SPAM: { label: 'تصنيف كبريد عشوائي', color: 'bg-destructive/15 text-destructive border-destructive/30', icon: MessageSquare },
    COMMENT_DELETED: { label: 'حذف تعليق نهائياً', color: 'bg-destructive/20 text-destructive border-destructive/40', icon: MessageSquare },
    SESSION_REVOKED: { label: 'إلغاء جلسة', color: 'bg-amber-500/15 text-amber-500 border-amber-500/30', icon: Shield },
  };

  const handleActionFilter = (action: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (action === 'ALL') {
      params.delete('action');
    } else {
      params.set('action', action);
    }
    params.set('page', '1');
    router.push(`/admin/audit?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/admin/audit?${params.toString()}`);
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* 🏷️ Action Filter Select */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="action-filter" className="text-xs font-bold text-muted-foreground">
            تصفية العمليات:
          </label>
          <select
            id="action-filter"
            value={currentAction}
            onChange={(e) => handleActionFilter(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
          >
            <option value="ALL">كافة العمليات والأحداث</option>
            <option value="LOGIN_SUCCESS">تسجيل دخول ناجح</option>
            <option value="LOGIN_FAILURE">فشل تسجيل الدخول</option>
            <option value="ARTICLE_PUBLISHED">نشر مقال</option>
            <option value="ARTICLE_ARCHIVED">أرشفة مقال</option>
            <option value="COMMENT_APPROVED">اعتماد تعليق</option>
            <option value="COMMENT_HIDDEN">إخفاء تعليق</option>
            <option value="COMMENT_DELETED">حذف تعليق</option>
          </select>
        </div>

        <div className="text-xs text-muted-foreground font-semibold">
          إجمالي السجلات: <span className="font-bold text-foreground font-mono">{total}</span>
        </div>
      </div>

      {/* 📜 Audit Log Read-Only Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-secondary/30 border-b border-border/60 text-muted-foreground font-bold">
              <tr>
                <th className="py-3 px-4 text-start">العملية والحدث</th>
                <th className="py-3 px-4 text-start">المستخدم / الفاعل</th>
                <th className="py-3 px-4 text-start">الكيان المرتبط</th>
                <th className="py-3 px-4 text-start">تفاصيل العملية (Metadata)</th>
                <th className="py-3 px-4 text-start">التاريخ والوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Terminal className="w-8 h-8 opacity-40 text-muted-foreground" />
                      <p className="font-bold">لا توجد سجلات رقابية مطابقة للمعايير</p>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const actionMeta = actionLabels[log.action] || {
                    label: log.action,
                    color: 'bg-secondary text-foreground border-border/80',
                    icon: Shield,
                  };
                  const Icon = actionMeta.icon;

                  return (
                    <tr key={log.id} className="hover:bg-secondary/20 transition-colors">
                      
                      {/* Action Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${actionMeta.color}`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{actionMeta.label}</span>
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="py-3.5 px-4">
                        {log.actorName ? (
                          <div className="space-y-0.5">
                            <span className="font-bold text-foreground block">
                              {log.actorName}
                            </span>
                            <span className="text-[10px] text-muted-foreground block truncate">
                              {log.actorEmail}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-[11px]">
                            {log.adminUserId ? 'مستخدم غير معروف' : 'النظام (System)'}
                          </span>
                        )}
                      </td>

                      {/* Entity */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {log.entityType ? (
                          <div className="space-y-0.5">
                            <span className="font-bold text-foreground text-[11px]">
                              {log.entityType}
                            </span>
                            {log.entityId && (
                              <span className="text-[10px] text-muted-foreground font-mono block">
                                #{log.entityId}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Safe Metadata Preview */}
                      <td className="py-3.5 px-4 max-w-xs">
                        {log.metadata ? (
                          <pre className="text-[10px] font-mono bg-secondary/50 p-2 rounded-xl border border-border/60 text-foreground overflow-x-auto max-h-20">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        ) : (
                          <span className="text-muted-foreground text-[10px]">—</span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-4 text-muted-foreground text-[11px] whitespace-nowrap">
                        <div>
                          {new Date(log.createdAt).toLocaleDateString('ar-AE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-[10px] text-muted-foreground/70 font-mono mt-0.5">
                          {new Date(log.createdAt).toLocaleTimeString('ar-AE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
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
              <span className="font-bold text-foreground">{totalPages}</span> (إجمالي {total} سجل)
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
