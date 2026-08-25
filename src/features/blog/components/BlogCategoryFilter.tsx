import Link from 'next/link';
import { BLOG_CATEGORIES } from '../data/blog.queries';

interface BlogCategoryFilterProps {
  locale: string;
  activeCategory?: string;
}

export function BlogCategoryFilter({ locale, activeCategory }: BlogCategoryFilterProps) {
  const isAr = locale === 'ar';
  const categories = BLOG_CATEGORIES[isAr ? 'ar' : 'en'];

  return (
    <nav
      aria-label={isAr ? 'تصنيفات المقالات' : 'Article Categories'}
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto mb-10 sm:mb-14"
    >
      {categories.map((category) => {
        const isAll = category === 'الكل' || category === 'All';
        const isSelected = isAll ? !activeCategory || activeCategory === category : activeCategory === category;
        const href = isAll ? `/${locale}/blog` : `/${locale}/blog?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            aria-current={isSelected ? 'page' : undefined}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus:outline-none ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-[1.02]'
                : 'bg-card/60 text-muted-foreground border border-border/80 hover:text-foreground hover:border-primary/40 hover:bg-card'
            }`}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
