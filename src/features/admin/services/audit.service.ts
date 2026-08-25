import 'server-only';
import { query } from '@/lib/db';
import { headers } from 'next/headers';
import { hashIdentifierHmac } from '@/lib/rate-limiter';

export type AuditAction =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'ARTICLE_CREATED'
  | 'ARTICLE_UPDATED'
  | 'ARTICLE_PUBLISHED'
  | 'ARTICLE_ARCHIVED'
  | 'ARTICLE_REPUBLISHED'
  | 'COMMENT_APPROVED'
  | 'COMMENT_HIDDEN'
  | 'COMMENT_MARKED_SPAM'
  | 'COMMENT_DELETED'
  | 'SESSION_REVOKED';

export interface RecordAuditParams {
  adminUserId?: string | null;
  action: AuditAction;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Extracts a privacy-preserving hashed IP and user agent summary.
 */
async function getClientContext(): Promise<{ ipHash: string; userAgent: string }> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'direct';
    const clientIp = forwarded.split(',')[0].trim();
    const ipHash = hashIdentifierHmac(clientIp, 'audit-ip');
    const rawUserAgent = headersList.get('user-agent') || 'unknown';
    const userAgent = rawUserAgent.substring(0, 250);
    return { ipHash, userAgent };
  } catch {
    return { ipHash: 'system', userAgent: 'internal' };
  }
}

/**
 * Sanitizes metadata to guarantee no secrets/tokens/hashes are ever stored in audit logs.
 */
function sanitizeMetadata(meta?: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!meta) return null;

  const forbiddenKeys = [
    'password',
    'password_hash',
    'passwordHash',
    'token',
    'sessionToken',
    'token_hash',
    'tokenHash',
    'secret',
    'apiKey',
    'cookie',
    'authorization',
  ];

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (forbiddenKeys.some((fk) => key.toLowerCase().includes(fk.toLowerCase()))) {
      continue; // Drop forbidden key
    }
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeMetadata(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Production-grade Audit Logger.
 * Records operational and security events to Neon PostgreSQL.
 */
export async function recordAuditLog(params: RecordAuditParams): Promise<void> {
  try {
    const { ipHash, userAgent } = await getClientContext();
    const safeMeta = sanitizeMetadata(params.metadata);

    await query(
      `
      INSERT INTO audit_logs (
        admin_user_id,
        action,
        entity_type,
        entity_id,
        metadata,
        ip_hash,
        user_agent_summary,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());
      `,
      [
        params.adminUserId || null,
        params.action,
        params.entityType || null,
        params.entityId || null,
        safeMeta ? JSON.stringify(safeMeta) : null,
        ipHash,
        userAgent,
      ]
    );
  } catch (error) {
    // Non-fatal telemetry: Log error to stderr without crashing the main application flow
    console.error('[AuditService] Failed to record audit log:', error);
  }
}

