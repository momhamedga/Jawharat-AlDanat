'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions/login.action';
import { AuthActionResult } from '../types/auth.types';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

const initialState: AuthActionResult = {
  success: false,
};

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.replace('/admin');
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5" noValidate dir="rtl">
      
      {/* ⚠️ General Error Banner */}
      {state.error && !state.success && (
        <div
          className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-2.5 animate-in fade-in"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* 📧 Email Input */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-bold text-foreground/90 select-none"
        >
          البريد الإلكتروني
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isPending}
            placeholder="admin@jawharataldanat.ae"
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
            className={`w-full px-3.5 py-2.5 ps-10 rounded-xl border text-sm bg-background text-foreground transition-all duration-200 focus:outline-none focus-visible:ring-2 ${
              state.fieldErrors?.email
                ? 'border-destructive focus-visible:ring-destructive/40'
                : 'border-border/80 hover:border-border focus-visible:ring-primary/40 focus:border-primary'
            }`}
          />
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Mail className="w-4 h-4" />
          </div>
        </div>
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-[11px] font-medium text-destructive mt-1">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      {/* 🔒 Password Input */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-bold text-foreground/90 select-none"
        >
          كلمة المرور
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isPending}
            placeholder="••••••••••••"
            aria-invalid={!!state.fieldErrors?.password}
            aria-describedby={state.fieldErrors?.password ? 'password-error' : undefined}
            className={`w-full px-3.5 py-2.5 ps-10 rounded-xl border text-sm bg-background text-foreground transition-all duration-200 focus:outline-none focus-visible:ring-2 ${
              state.fieldErrors?.password
                ? 'border-destructive focus-visible:ring-destructive/40'
                : 'border-border/80 hover:border-border focus-visible:ring-primary/40 focus:border-primary'
            }`}
          />
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-[11px] font-medium text-destructive mt-1">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      {/* 🔘 Submit CTA */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-ring focus:outline-none mt-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>جاري التحقق...</span>
          </>
        ) : (
          <span>تسجيل الدخول</span>
        )}
      </button>

    </form>
  );
}

