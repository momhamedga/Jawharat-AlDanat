import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'jd_admin_session';
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 Hours
export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 43,200 Seconds

/**
 * Generates a cryptographically secure 256-bit random session token (64 hex chars).
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hashes a raw session token using SHA-256 (64 hex chars) for safe database storage.
 */
export function hashSessionToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

/**
 * Sets the admin session HTTP-only cookie with strict security flags.
 */
export async function setAdminSessionCookie(rawToken: string, expiresAt: Date): Promise<void> {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
    maxAge: SESSION_TTL_SECONDS,
  });
}

/**
 * Clears the admin session cookie immediately upon logout or invalidation.
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  });
}

/**
 * Retrieves the raw session token from incoming request cookies.
 */
export async function getAdminSessionTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  return cookie?.value || null;
}

