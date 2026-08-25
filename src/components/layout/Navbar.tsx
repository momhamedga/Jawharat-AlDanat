import Link from 'next/link';
import Image from 'next/image';
import { mainNavItems } from '@/config/navigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const isAr = locale === 'ar';

  return (
    <header
      className="sticky top-0 inset-x-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/80 transition-all duration-300"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* 👑 Brand Logo & Typography (Responsive Mobile/Desktop Composition) */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 sm:gap-3.5 group select-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1 min-w-0 flex-1 sm:flex-initial"
          aria-label={isAr ? 'جوهرة الدانة - الصفحة الرئيسية' : 'Jawharat Al Danat - Home'}
        >
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <Image
              src="/images/logo.webp"
              alt={isAr ? 'شعار جوهرة الدانة' : 'Jawharat Al Danat Logo'}
              fill
              priority
              sizes="(max-width: 640px) 32px, 48px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-base md:text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
              {isAr ? 'جوهرة الدانة' : 'Jawharat Al Danat'}
            </span>
            <span className="hidden sm:block text-[11px] font-semibold text-muted-foreground tracking-wide whitespace-nowrap">
              {isAr ? 'للفخامة والعناية الفائقة' : 'Excellence & Luxury Care'}
            </span>
          </div>
        </Link>

        {/* 💻 Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Desktop Navigation">
          {mainNavItems.map((item) => {
            const href = `/${locale}${item.path}`;
            return (
              <Link
                key={item.key}
                href={href}
                className="px-3.5 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-secondary/40 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
              >
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* 🔘 Desktop Actions (Language Switcher + Theme Toggle + Contact CTA) & Mobile Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* 🌐 Desktop Language Switcher Link (Route-Preserving Client Island) */}
          <LanguageSwitcher
            locale={locale}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/30 text-xs font-semibold text-foreground/90 hover:text-primary hover:border-primary/40 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
          />

          {/* 🌓 Theme Toggle (Light / Dark Client Island) */}
          <ThemeToggle locale={locale} className="hidden sm:inline-flex" />

          {/* 🏛️ Primary Desktop Contact CTA */}
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow hover:bg-primary/90 transition-all focus-visible:ring-2 focus-visible:ring-ring focus:outline-none active:scale-[0.98]"
          >
            {isAr ? 'تواصل معنا' : 'Contact Us'}
          </Link>

          {/* 📱 Mobile Navigation Trigger (Isolated Client Island) */}
          <MobileNav locale={locale} items={mainNavItems} />

        </div>

      </div>
    </header>
  );
}
