import 'server-only';
import { query } from '@/lib/db';

export interface AuditLogListItem {
  id: string;
  adminUserId: string | null;
  actorName: string | null;
  actorEmail: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  ipHash: string | null;
  userAgentSummary: string | null;
  createdAt: string;
}

export interface AuditFilterParams {
  action?: string;
  page?: number;
  limit?: number;
}

interface RawDbAuditItem {
  id: string;
  admin_user_id: string | null;
  actor_name: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  ip_hash: string | null;
  user_agent_summary: string | null;
  created_at: Date | string;
}

export async function getAuditLogs(params: AuditFilterParams = {}): Promise<{
  logs: AuditLogListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { action, page = 1, limit = 25 } = params;
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const queryParams: unknown[] = [];
  let paramIndex = 1;

  if (action && action !== 'ALL') {
    conditions.push(`a.action = $${paramIndex++}`);
    queryParams.push(action);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRes = await query<{ total: string | number }>(
    `SELECT COUNT(a.id)::int AS total FROM audit_logs a ${whereClause};`,
    queryParams
  );
  const total = Number(countRes[0]?.total) || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const listParams = [...queryParams, limit, offset];
  const rows = await query<RawDbAuditItem>(
    `
    SELECT
      a.id,
      a.admin_user_id,
      u.full_name AS actor_name,
      u.email AS actor_email,
      a.action,
      a.entity_type,
      a.entity_id,
      a.metadata,
      a.ip_hash,
      a.user_agent_summary,
      a.created_at
    FROM audit_logs a
    LEFT JOIN admin_users u ON u.id = a.admin_user_id
    ${whereClause}
    ORDER BY a.created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++};
    `,
    listParams
  );

  const logs = rows.map((r) => ({
    id: r.id,
    adminUserId: r.admin_user_id,
    actorName: r.actor_name,
    actorEmail: r.actor_email,
    action: r.action,
    entityType: r.entity_type,
    entityId: r.entity_id,
    metadata: r.metadata,
    ipHash: r.ip_hash,
    userAgentSummary: r.user_agent_summary,
    createdAt: new Date(r.created_at).toISOString(),
  }));

  return {
    logs,
    total,
    page,
    limit,
    totalPages,
  };
}

