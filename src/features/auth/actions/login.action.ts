'use server';

import { headers } from 'next/headers';
import { loginSchema } from '../schemas/login.schema';
import { findAdminUserByEmail, createAdminSession } from '../data/auth.queries';
import { verifyPassword, verifyDummyPassword } from '../services/password.service';
import {
  generateSessionToken,
  hashSessionToken,
  setAdminSessionCookie,
  SESSION_TTL_MS,
} from '../services/session.service';
import { checkRateLimit, hashIdentifierHmac } from '@/lib/rate-limiter';
import { AuthActionResult } from '../types/auth.types';
import { recordAuditLog } from '@/features/admin/services/audit.service';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

async function isValidOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const host = headersList.get('host');

  if (!origin) return true;
  if (process.env.NODE_ENV === 'development') return true;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins: string[] = [];

  if (siteUrl) allowedOrigins.push(siteUrl.replace(/\/$/, ''));
  if (host) allowedOrigins.push(`https://${host}`, `http://${host}`);
  if (host && origin === `https://${host}`) return true;

  return allowedOrigins.includes(origin);
}

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    const clientIp = forwarded.split(',')[0]?.trim();
    if (clientIp) return clientIp;
  }
  return headersList.get('x-real-ip') || '127.0.0.1';
}

export async function loginAction(
  _prevState: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  try {
    // 1. Origin / Host verification
    const validOrigin = await isValidOrigin();
    if (!validOrigin) {
      return {
        success: false,
        error: 'طلب غير مصرح به (فشل التحقق من المصدر)',
        errorCode: 'INVALID_INPUT',
      };
    }

    // 2. Distributed Rate Limiting
    const clientIp = await getClientIp();
    const rateLimitKey = hashIdentifierHmac(clientIp, 'admin-login');
    const rateLimit = await checkRateLimit(rateLimitKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

    if (!rateLimit.allowed) {
      await recordAuditLog({
        action: 'LOGIN_FAILURE',
        entityType: 'AUTH',
        metadata: { reason: 'RATE_LIMITED' },
      });

      return {
        success: false,
        error: 'تم تجاوز الحد المسموح من محاولات الدخول. يرجى المحاولة بعد 15 دقيقة.',
        errorCode: 'RATE_LIMITED',
      };
    }

    // 3. Schema validation
    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const parseResult = loginSchema.safeParse(rawData);
    if (!parseResult.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      parseResult.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (path === 'email') fieldErrors.email = issue.message;
        if (path === 'password') fieldErrors.password = issue.message;
      });

      return {
        success: false,
        error: 'بيانات الدخول غير مكتملة أو غير صالحة',
        errorCode: 'INVALID_INPUT',
        fieldErrors,
      };
    }

    const { email, password } = parseResult.data;

    // 4. Look up user
    const user = await findAdminUserByEmail(email);

    // Timing attack mitigation: run dummy verify if user not found
    if (!user) {
      await verifyDummyPassword(password);
      await recordAuditLog({
        action: 'LOGIN_FAILURE',
        entityType: 'AUTH',
        metadata: { reason: 'USER_NOT_FOUND', attemptedEmail: email.toLowerCase() },
      });

      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        errorCode: 'INVALID_CREDENTIALS',
      };
    }

    // Account status check (generic error to prevent enumeration)
    if (!user.isActive) {
      await verifyDummyPassword(password);
      await recordAuditLog({
        adminUserId: user.id,
        action: 'LOGIN_FAILURE',
        entityType: 'AUTH',
        entityId: user.id,
        metadata: { reason: 'ACCOUNT_INACTIVE' },
      });

      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        errorCode: 'INVALID_CREDENTIALS',
      };
    }

    // 5. Verify Argon2id password hash
    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      await recordAuditLog({
        adminUserId: user.id,
        action: 'LOGIN_FAILURE',
        entityType: 'AUTH',
        entityId: user.id,
        metadata: { reason: 'INVALID_PASSWORD' },
      });

      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        errorCode: 'INVALID_CREDENTIALS',
      };
    }

    // 6. Generate 256-bit cryptographically secure session
    const rawToken = generateSessionToken();
    const tokenHash = hashSessionToken(rawToken);
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    // 7. Store SHA-256 hash in database
    await createAdminSession(user.id, tokenHash, expiresAt);

    // 8. Set HTTP-Only Cookie with raw token
    await setAdminSessionCookie(rawToken, expiresAt);

    // 9. Record Audit Log for successful login
    await recordAuditLog({
      adminUserId: user.id,
      action: 'LOGIN_SUCCESS',
      entityType: 'ADMIN_USER',
      entityId: user.id,
      metadata: {
        email: user.email,
        role: user.role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('[LoginAction] Internal error:', error);
    return {
      success: false,
      error: 'حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقاً.',
      errorCode: 'INTERNAL_ERROR',
    };
  }
}
