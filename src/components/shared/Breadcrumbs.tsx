import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const isAr = locale === 'ar';
  const Separator = isAr ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}
      className="flex items-center gap-1.5 text-xs text-muted-foreground py-2 flex-wrap"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-secondary/40"
        aria-label={isAr ? 'الرئيسية' : 'Home'}
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">{isAr ? 'الرئيسية' : 'Home'}</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <Fragment key={idx}>
            <Separator className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-[320px]"
              >
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
