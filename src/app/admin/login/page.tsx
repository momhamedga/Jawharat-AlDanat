import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCurrentAdminSession } from '@/lib/auth/guard';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'تسجيل دخول الإدارة | جوهرة الدانة',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getCurrentAdminSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-background selection:bg-primary/20">
      
      {/* 🏛️ Admin Authentication Card */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Link href="/ar" className="relative w-12 h-12 transition-transform hover:scale-105">
            <Image
              src="/images/logo.webp"
              alt="شعار جوهرة الدانة"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </Link>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              بوابة الإدارة المركزية
            </h1>
            <p className="text-xs text-muted-foreground font-semibold">
              مؤسسة جوهرة الدانة — نظام إدارة المحتوى والعمليات
            </p>
          </div>
        </div>

        {/* Security Indicator */}
        <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-secondary/40 border border-border/60 text-[11px] font-bold text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>نظام مشفر ومحمي بجلسات Argon2id & SHA-256</span>
        </div>

        {/* Login Form Client Island */}
        <LoginForm />

        {/* Return to Public Site */}
        <div className="pt-2 text-center border-t border-border/60">
          <Link
            href="/ar"
            className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← العودة للموقع العام
          </Link>
        </div>

      </div>

    </main>
  );
}

