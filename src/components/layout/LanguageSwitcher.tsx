'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { switchLocalePath } from '@/lib/locale-path';

interface LanguageSwitcherProps {
  locale: string;
  className?: string;
  variant?: 'desktop' | 'mobile-badge' | 'drawer-header' | 'mobile-row';
  onNavigate?: () => void;
}

const SCROLL_STORAGE_KEY = 'jd_locale_scroll_restoration';

export function LanguageSwitcher({
  locale,
  className,
  variant = 'desktop',
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const isAr = locale === 'ar';
  const targetLocale = isAr ? 'en' : 'ar';

  // Restore scroll position after a locale switch
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
      if (!stored) return;
      sessionStorage.removeItem(SCROLL_STORAGE_KEY);
      const data = JSON.parse(stored);
      if (
        data &&
        typeof data.y === 'number' &&
        Date.now() - data.timestamp < 5000 &&
        data.targetPath === window.location.pathname
      ) {
        if (!window.location.hash) {
          window.scrollTo({ top: data.y, behavior: 'instant' });
        }
      }
    } catch {
      // Ignore storage errors safely
    }
  }, []);

  const targetHref = switchLocalePath(pathname, targetLocale);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const scrollY = window.scrollY;
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const fullTarget = switchLocalePath((pathname || `/${locale}`) + search, targetLocale) + hash;

      sessionStorage.setItem(
        SCROLL_STORAGE_KEY,
        JSON.stringify({
          y: scrollY,
          targetPath: targetHref.split(/[?#]/)[0],
          timestamp: Date.now(),
        }),
      );

      if (onNavigate) {
        onNavigate();
      }

      window.location.assign(fullTarget);
    } catch {
      window.location.assign(targetHref);
    }
  };

  const ariaLabel = isAr ? 'Switch to English' : 'التبديل إلى العربية';

  // Mobile Top Navbar & Drawer Header: Clean, text-only compact badge (EN / ع)
  if (variant === 'mobile-badge' || variant === 'drawer-header' || variant === 'mobile-row') {
    return (
      <a
        href={targetHref}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className="font-bold text-xs">{isAr ? 'EN' : 'ع'}</span>
      </a>
    );
  }

  // Desktop Default Button: Globe + Label
  return (
    <a
      href={targetHref}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
      <span>{isAr ? 'English' : 'العربية'}</span>
    </a>
  );
}
