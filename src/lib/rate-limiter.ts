import { createHmac } from 'crypto';
import { query } from '@/lib/db';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

let tableInitialized = false;

async function ensureRateLimitTable(): Promise<void> {
  if (tableInitialized) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS rate_limit_entries (
        key VARCHAR(64) PRIMARY KEY,
        count INT NOT NULL DEFAULT 1,
        reset_at BIGINT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_rate_limit_reset ON rate_limit_entries(reset_at);
    `);
    tableInitialized = true;
  } catch (error) {
    console.error('[RateLimiter] Table init warning:', error);
  }
}

/**
 * Generates an HMAC-SHA256 keyed hash of the client identifier with a namespace.
 * Prevents rainbow table / IP enumeration attacks and isolates rate limit quotas across actions.
 */
export function hashIdentifierHmac(identifier: string, namespace = 'contact-inquiry'): string {
  const secret =
    process.env.RATE_LIMIT_SECRET ||
    process.env.RESEND_API_KEY ||
    'jawharat-aldanat-secure-production-salt';

  return createHmac('sha256', secret)
    .update(`${namespace}:${identifier}`)
    .digest('hex');
}

/**
 * Distributed, concurrency-safe rate limiter backed by Neon PostgreSQL.
 * Uses atomic SQL UPSERT to prevent race conditions across serverless instances.
 * 
 * Fail-Open Policy: If the database is temporarily unreachable, requests are allowed
 * so that legitimate customer inquiries are not blocked, relying on Honeypot & Zod validation.
 */
export async function checkRateLimit(
  hashedKey: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000,
): Promise<RateLimitResult> {
  const now = Date.now();
  const nextResetAt = now + windowMs;

  try {
    await ensureRateLimitTable();

    // Atomic Upsert: insert new entry or increment count within current window
    const rows = await query<{ count: number; reset_at: string }>(
      `
      INSERT INTO rate_limit_entries (key, count, reset_at)
      VALUES ($1, 1, $2)
      ON CONFLICT (key) DO UPDATE
      SET count = CASE
            WHEN rate_limit_entries.reset_at < $3 THEN 1
            ELSE rate_limit_entries.count + 1
          END,
          reset_at = CASE
            WHEN rate_limit_entries.reset_at < $3 THEN $2
            ELSE rate_limit_entries.reset_at
          END
      RETURNING count, reset_at;
      `,
      [hashedKey, nextResetAt, now],
    );

    // Opportunistic cleanup of expired keys (1 in 10 chance or on execution)
    if (Math.random() < 0.1) {
      query('DELETE FROM rate_limit_entries WHERE reset_at < $1', [now]).catch(() => {});
    }

    if (rows && rows.length > 0) {
      const currentCount = rows[0].count;
      const entryResetAt = Number(rows[0].reset_at);
      const allowed = currentCount <= maxRequests;
      const remaining = Math.max(0, maxRequests - currentCount);

      return {
        allowed,
        remaining,
        resetAt: entryResetAt,
      };
    }

    // Fallback if no row returned
    return { allowed: true, remaining: maxRequests - 1, resetAt: nextResetAt };
  } catch (error) {
    console.error('[RateLimiter] Database check failed, failing open for availability:', error);
    // Fail-open: allow request to proceed if rate limit store is down
    return {
      allowed: true,
      remaining: 1,
      resetAt: nextResetAt,
    };
  }
}
