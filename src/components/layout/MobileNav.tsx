'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/config/navigation';
import { X, Menu } from 'lucide-react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface MobileNavProps {
  locale: string;
  items: NavItem[];
}

export function MobileNav({ locale, items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Keyboard accessibility & Body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  return (
    <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
      
      {/* 🌓 Theme Toggle on Mobile Header */}
      <ThemeToggle locale={locale} className="w-9 h-9 rounded-xl shrink-0" />

      {/* 🌐 Compact Text-Only Language Switch on Mobile Header */}
      <LanguageSwitcher
        locale={locale}
        variant="mobile-badge"
        className="flex items-center justify-center min-w-[36px] h-9 px-2.5 rounded-xl border border-border/80 bg-secondary/40 text-xs font-bold text-foreground/90 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring shrink-0"
      />

      {/* 🔘 Accessible Hamburger Trigger (>= 44x44px target) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border/80 bg-secondary/40 text-foreground hover:bg-secondary/70 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus:outline-none cursor-pointer shrink-0"
        aria-label={isOpen ? (isAr ? 'إغلاق القائمة' : 'Close navigation menu') : (isAr ? 'فتح القائمة' : 'Open navigation menu')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 📱 Solid Isolated Mobile Drawer & Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          
          {/* Opaque Dim Backdrop */}
          <div
            className="fixed inset-0 bg-background/85 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Opaque Solid Drawer Panel */}
          <div
            className={`relative flex flex-col justify-between w-[85%] max-w-xs sm:max-w-sm bg-background border-border/80 p-6 shadow-2xl z-50 h-[100dvh] overflow-y-auto overscroll-contain transition-transform duration-300 ease-out ${
              isAr
                ? 'ms-auto border-s animate-in slide-in-from-right duration-300'
                : 'me-auto border-e animate-in slide-in-from-left duration-300'
            }`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            
            {/* Drawer Header: Brand Lockup, Compact Language Switcher & Close Button */}
            <div className="flex items-center justify-between gap-2.5 pb-5 border-b border-border/60">
              <Link
                href={`/${locale}`}
                onClick={closeMenu}
                className="flex items-center gap-2.5 select-none min-w-0 flex-1"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                  <Image
                    src="/images/logo.webp"
                    alt={isAr ? 'شعار جوهرة الدانة' : 'Jawharat Al Danat Logo'}
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-black text-foreground truncate">
                    {isAr ? 'جوهرة الدانة' : 'Jawharat Al Danat'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-primary truncate">
                    {isAr ? 'للفخامة والعناية الفائقة' : 'Excellence & Luxury Care'}
                  </span>
                </div>
              </Link>

              {/* Drawer Top Utility Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <LanguageSwitcher
                  locale={locale}
                  variant="drawer-header"
                  onNavigate={closeMenu}
                  className="flex items-center justify-center min-w-[34px] h-8 sm:h-9 px-2 rounded-xl border border-border/80 bg-secondary/40 text-xs font-bold text-foreground/90 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                />

                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground border border-border/60 hover:bg-secondary/60 transition-colors cursor-pointer"
                  aria-label={isAr ? 'إغلاق القائمة' : 'Close menu'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Clean Typographic Navigation Links */}
            <nav className="flex flex-col space-y-1 py-6 flex-1" aria-label="Mobile Navigation">
              {items.map((item) => {
                const href = `/${locale}${item.path}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    onClick={closeMenu}
                    className={`px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary border-s-2 border-primary ps-3'
                        : 'text-foreground/80 hover:bg-secondary/50 hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                );
              })}
            </nav>

            {/* Restrained Bottom Utilities: Pure CTA + Origin Stamp */}
            <div className="pt-5 border-t border-border/60 space-y-3">
              
              {/* Primary Contact Action */}
              <Link
                href={`/${locale}/contact`}
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:bg-primary/90 transition-all text-center"
              >
                <span>{isAr ? 'طلب استشارة / تواصل معنا' : 'Request Consultation'}</span>
              </Link>

              {/* Verified Origin Stamp */}
              <p className="text-[10px] text-muted-foreground/70 text-center pt-1 font-medium">
                {isAr ? 'أبوظبي • دبي — الإمارات العربية المتحدة' : 'Abu Dhabi • Dubai — UAE'}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
