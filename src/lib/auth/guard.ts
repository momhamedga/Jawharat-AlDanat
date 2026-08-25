import 'server-only';
import { redirect } from 'next/navigation';
import {
  getAdminSessionTokenFromCookies,
  hashSessionToken,
  clearAdminSessionCookie,
} from '@/features/auth/services/session.service';
import {
  findAdminSessionByTokenHash,
  deleteAdminSessionByTokenHash,
} from '@/features/auth/data/auth.queries';
import { hasRole } from '@/features/auth/services/rbac.service';
import { AdminSession, AdminRole } from '@/features/auth/types/auth.types';

/**
 * Validates the current incoming request session against the database.
 * Returns null if unauthenticated, expired, or user is disabled.
 */
export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  try {
    const rawToken = await getAdminSessionTokenFromCookies();
    if (!rawToken) return null;

    const tokenHash = hashSessionToken(rawToken);
    const session = await findAdminSessionByTokenHash(tokenHash);

    if (!session) {
      // Stale or invalid cookie
      await clearAdminSessionCookie();
      return null;
    }

    // Check expiration
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      await deleteAdminSessionByTokenHash(tokenHash);
      await clearAdminSessionCookie();
      return null;
    }

    // Check if user is active
    if (!session.user.isActive) {
      await deleteAdminSessionByTokenHash(tokenHash);
      await clearAdminSessionCookie();
      return null;
    }

    return session;
  } catch (error) {
    console.error('[AuthGuard] Error validating session:', error);
    return null;
  }
}

/**
 * Server guard: requires an authenticated active admin.
 * Redirects unauthenticated requests to /admin/login.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

/**
 * Server guard: requires an authenticated admin with a specific minimum role.
 * Redirects if unauthorized or unauthenticated.
 */
export async function requireRole(requiredRole: AdminRole): Promise<AdminSession> {
  const session = await requireAdmin();
  if (!hasRole(session.user.role, requiredRole)) {
    redirect('/admin?error=unauthorized');
  }
  return session;
}

