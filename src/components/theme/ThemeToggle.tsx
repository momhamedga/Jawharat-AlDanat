'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  locale?: string;
  className?: string;
}

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ locale = 'ar', className = '' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const isAr = locale === 'ar';
  const label = isAr ? 'تبديل المظهر' : 'Toggle theme';

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={label}
        className={`w-9 h-9 flex items-center justify-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-colors ${className}`}
        disabled
      >
        <span className="w-4 h-4 rounded-full bg-muted/40 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={isDark ? (isAr ? 'تفعيل المظهر الفاتح' : 'Switch to Light theme') : (isAr ? 'تفعيل المظهر الداكن' : 'Switch to Dark theme')}
      className={`relative w-9 h-9 flex items-center justify-center rounded-xl border border-border/80 bg-card/80 hover:bg-secondary/60 text-foreground transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-ring cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-primary transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-primary transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}

