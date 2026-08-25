import 'server-only';
import { query } from '@/lib/db';
import { AdminUser, AdminSession, AdminRole } from '../types/auth.types';

interface RawDbAdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

interface RawDbAdminSession {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date | string;
  created_at: Date | string;
  user_email: string;
  user_full_name: string;
  user_role: AdminRole;
  user_is_active: boolean;
  user_created_at: Date | string;
  user_updated_at: Date | string;
}

/**
 * Finds an admin user by normalized lowercase email.
 */
export async function findAdminUserByEmail(
  email: string,
): Promise<(AdminUser & { passwordHash: string }) | null> {
  const rows = await query<RawDbAdminUser>(
    `
    SELECT id, email, password_hash, full_name, role, is_active, created_at, updated_at
    FROM admin_users
    WHERE email = $1
    LIMIT 1;
    `,
    [email.toLowerCase().trim()],
  );

  if (!rows || rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    fullName: row.full_name,
    role: row.role,
    isActive: row.is_active,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

/**
 * Finds an active admin session and associated user by SHA-256 token hash.
 */
export async function findAdminSessionByTokenHash(
  tokenHash: string,
): Promise<AdminSession | null> {
  const rows = await query<RawDbAdminSession>(
    `
    SELECT 
      s.id,
      s.user_id,
      s.token_hash,
      s.expires_at,
      s.created_at,
      u.email AS user_email,
      u.full_name AS user_full_name,
      u.role AS user_role,
      u.is_active AS user_is_active,
      u.created_at AS user_created_at,
      u.updated_at AS user_updated_at
    FROM admin_sessions s
    INNER JOIN admin_users u ON u.id = s.user_id
    WHERE s.token_hash = $1
    LIMIT 1;
    `,
    [tokenHash],
  );

  if (!rows || rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    userId: row.user_id,
    tokenHash: row.token_hash,
    expiresAt: new Date(row.expires_at).toISOString(),
    createdAt: new Date(row.created_at).toISOString(),
    user: {
      id: row.user_id,
      email: row.user_email,
      fullName: row.user_full_name,
      role: row.user_role,
      isActive: row.user_is_active,
      createdAt: new Date(row.user_created_at).toISOString(),
      updatedAt: new Date(row.user_updated_at).toISOString(),
    },
  };
}

/**
 * Creates a new DB-backed session record.
 */
export async function createAdminSession(
  userId: string,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await query(
    `
    INSERT INTO admin_sessions (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3);
    `,
    [userId, tokenHash, expiresAt.toISOString()],
  );
}

/**
 * Deletes a session by its token hash (instant revocation on logout).
 */
export async function deleteAdminSessionByTokenHash(tokenHash: string): Promise<void> {
  await query(
    `
    DELETE FROM admin_sessions
    WHERE token_hash = $1;
    `,
    [tokenHash],
  );
}

/**
 * Deletes all sessions for a specific user (useful upon password change or ban).
 */
export async function deleteAdminSessionsByUserId(userId: string): Promise<void> {
  await query(
    `
    DELETE FROM admin_sessions
    WHERE user_id = $1;
    `,
    [userId],
  );
}

/**
 * Cleanup expired sessions.
 */
export async function deleteExpiredAdminSessions(): Promise<number> {
  const res = await query<{ count: string }>(
    `
    WITH deleted AS (
      DELETE FROM admin_sessions
      WHERE expires_at <= NOW()
      RETURNING id
    )
    SELECT COUNT(*)::text as count FROM deleted;
    `,
  );
  return parseInt(res[0]?.count || '0', 10);
}

/**
 * Creates a new admin user (used for initial bootstrap and user provisioning).
 */
export async function createAdminUser(data: {
  email: string;
  passwordHash: string;
  fullName: string;
  role?: AdminRole;
}): Promise<AdminUser> {
  const rows = await query<RawDbAdminUser>(
    `
    INSERT INTO admin_users (email, password_hash, full_name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, password_hash, full_name, role, is_active, created_at, updated_at;
    `,
    [data.email.toLowerCase().trim(), data.passwordHash, data.fullName, data.role || 'ADMIN'],
  );

  const row = rows[0];
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    isActive: row.is_active,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

/**
 * Counts total admin users in database.
 */
export async function countAdminUsers(): Promise<number> {
  const rows = await query<{ count: string }>('SELECT COUNT(*)::text as count FROM admin_users;');
  return parseInt(rows[0]?.count || '0', 10);
}

