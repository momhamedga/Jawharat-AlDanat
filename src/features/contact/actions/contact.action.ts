'use server';

import { headers } from 'next/headers';
import { contactInquirySchema } from '@/features/contact/schemas/contact.schema';
import type { ContactFormState } from '@/features/contact/schemas/contact.schema';
import { resend, emailConfig } from '@/lib/email/resend';
import { ContactInquiryEmail } from '@/lib/email/templates/contact-inquiry-email';
import { checkRateLimit, hashIdentifierHmac } from '@/lib/rate-limiter';

// ---------------------------------------------------------------------------
// Production Rate Limiting Policy:
// 5 inquiries per 15-minute window per HMAC-hashed client IP.
// Accommodates shared office networks & NAT without opening abuse doors.
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// ---------------------------------------------------------------------------
// Strict Origin Validation
// ---------------------------------------------------------------------------
async function isValidOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const host = headersList.get('host');

  // Same-origin server action invocations without explicit origin header
  if (!origin) return true;

  // Development localhost allowance
  if (process.env.NODE_ENV === 'development') return true;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins: string[] = [];

  if (siteUrl) {
    allowedOrigins.push(siteUrl.replace(/\/$/, ''));
  }
  if (host) {
    allowedOrigins.push(`https://${host}`, `http://${host}`);
  }

  // Exact deployment host matching for Vercel preview
  if (host && origin === `https://${host}`) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

// ---------------------------------------------------------------------------
// Extract Trusted Client IP (First IP in Proxy Chain)
// ---------------------------------------------------------------------------
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    const clientIp = forwarded.split(',')[0]?.trim();
    if (clientIp) return clientIp;
  }
  return headersList.get('x-real-ip') || '127.0.0.1';
}

// ---------------------------------------------------------------------------
// Submit Contact Inquiry — Server Action
// ---------------------------------------------------------------------------
export async function submitContactInquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Origin validation
  if (!(await isValidOrigin())) {
    return { success: false, message: 'origin_invalid' };
  }

  // 2. Parse form data
  const rawData = {
    name: formData.get('name') as string | null,
    phone: formData.get('phone') as string | null,
    email: formData.get('email') as string | null,
    serviceType: (formData.get('serviceType') as string | null) || undefined,
    message: formData.get('message') as string | null,
    honeypot: (formData.get('honeypot') as string | null) || undefined,
  };

  // 3. Honeypot check (Executed BEFORE rate-limit to avoid bot pollution of legitimate quotas)
  // Silent reject: returns apparent success without sending email or hitting DB
  if (rawData.honeypot && rawData.honeypot.length > 0) {
    return { success: true, message: 'success' };
  }

  // 4. Server-side Zod validation with strict allowlist
  const result = contactInquirySchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    return { success: false, message: 'validation_failed', errors: fieldErrors };
  }

  // 5. Distributed Concurrency-Safe Rate Limiting (Neon-backed HMAC)
  const rawIp = await getClientIp();
  const hashedIp = hashIdentifierHmac(rawIp);
  const rateLimitStatus = await checkRateLimit(hashedIp, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

  if (!rateLimitStatus.allowed) {
    return { success: false, message: 'rate_limited' };
  }

  // 6. Send email via Resend (EMAIL_ONLY architecture — 0 DB rows written for inquiries)
  const { name, phone, email, serviceType, message } = result.data;

  if (!resend) {
    console.error('[Contact] RESEND_API_KEY not configured');
    return { success: false, message: 'server_error' };
  }

  // Sanitize subject line to prevent header injection
  const sanitizedSubjectName = name.replace(/[\r\n]+/g, ' ').trim();

  try {
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.contactTo,
      replyTo: email,
      subject: `طلب تواصل جديد من: ${sanitizedSubjectName}`,
      react: ContactInquiryEmail({
        name,
        phone,
        email,
        serviceType,
        message,
      }),
    });

    if (error) {
      console.error('[Contact] Resend delivery error:', error.message);
      return { success: false, message: 'email_failed' };
    }

    // Log only non-PII HMAC prefix
    console.log(`[Contact] Inquiry dispatched successfully [id_hmac: ${hashedIp.slice(0, 8)}]`);

    return { success: true, message: 'success' };
  } catch {
    console.error('[Contact] Unexpected error during inquiry dispatch');
    return { success: false, message: 'server_error' };
  }
}
