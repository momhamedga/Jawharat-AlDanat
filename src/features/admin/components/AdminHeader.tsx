'use client';

import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { logoutAction } from '@/features/auth/actions/logout.action';
import { AdminSidebar } from './AdminSidebar';
import { AdminUser } from '@/features/auth/types/auth.types';
import { Menu, X, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  user: AdminUser;
  title?: string;
}

export function AdminHeader({ user, title }: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Accessible Escape key and body scroll lock
  useEffect(() => {
    if (!mobileOpen) return;

    const triggerEl = triggerRef.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerEl?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 w-full h-16 sm:h-20 bg-background/95 backdrop-blur-md border-b border-border/80 px-4 sm:px-8 flex items-center justify-between gap-4" dir="rtl">
        
        {/* Mobile Trigger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl border border-border/80 bg-secondary/40 text-foreground hover:bg-secondary/70 transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus:outline-none cursor-pointer"
            aria-label="فتح القائمة الإدارية"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-base sm:text-lg font-black text-foreground">
            {title || 'لوحة الإدارة'}
          </h1>
        </div>

        {/* Utilities: Theme Toggle & Logout */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle locale="ar" className="w-9 h-9 rounded-xl" />

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs font-bold hover:bg-destructive/20 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-destructive/40 focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </form>
        </div>

      </header>

      {/* 📱 Mobile Drawer with Accessible Dialog semantics */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true" aria-label="القائمة الجانبية الإدارية">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex flex-col w-[85%] max-w-xs bg-card border-s border-border/80 h-full shadow-2xl z-50 ms-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-end p-4 border-b border-border/60">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus:outline-none cursor-pointer"
                aria-label="إغلاق القائمة الإدارية"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminSidebar user={user} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
