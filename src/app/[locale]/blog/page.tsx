import type { Metadata } from 'next';
import { getBlogPosts } from '@/features/blog/data/blog.queries';
import { BlogHeader } from '@/features/blog/components/BlogHeader';
import { BlogCategoryFilter } from '@/features/blog/components/BlogCategoryFilter';
import { BlogFeaturedCard } from '@/features/blog/components/BlogFeaturedCard';
import { BlogGridCard } from '@/features/blog/components/BlogGridCard';
import { BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? 'مدونة جوهرة الدانة | رؤى العناية بالسيارات والفعاليات الملكية'
    : 'Journal | Jawharat Al Danat Luxury Insights';

  const description = isAr
    ? 'مقالات حصرية ودراسات متخصصة في حماية طلاء السيارات الفاخرة، والبروتوكول الملكي، وإدارة الفعاليات السيادية في دولة الإمارات.'
    : 'Exclusive editorial insights on bespoke automotive care, nano PPF coating, and sovereign event management in the UAE.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ar: '/ar/blog',
        en: '/en/blog',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteConfig.url}/${locale}/blog`,
      images: [
        {
          url: '/images/blog-1.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/blog-1.webp'],
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams]);
  const isAr = locale === 'ar';

  const posts = await getBlogPosts({ category });

  const hasPosts = posts.length > 0;
  const featuredPost = hasPosts ? posts[0] : null;
  const gridPosts = hasPosts ? posts.slice(1) : [];

  return (
    <div className="relative w-full py-12 sm:py-16 md:py-20 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌟 Background Luxury Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🏛️ Editorial Header */}
        <BlogHeader locale={locale} />

        {/* 🏷️ Category Filter Navigation */}
        <BlogCategoryFilter locale={locale} activeCategory={category} />

        {/* 📚 Articles Content */}
        {!hasPosts ? (
          /* Branded Empty State */
          <div className="bg-card/40 border border-border/80 rounded-2xl sm:rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto border border-primary/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {isAr ? 'لا توجد مقالات متوفرة في هذا التصنيف' : 'No articles found in this category'}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isAr
                ? 'يرجى اختيار تصنيف آخر أو مراجعة المدونة لاحقاً للاطلاع على أحدث التحليلات.'
                : 'Please select a different category or return later for our newest publications.'}
            </p>
          </div>
        ) : (
          <div>
            {/* 👑 Featured Story (Top of Page) */}
            {featuredPost && (
              <BlogFeaturedCard post={featuredPost} locale={locale} />
            )}

            {/* 📰 Editorial Grid of Remaining Posts */}
            {gridPosts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg sm:text-xl font-black text-foreground">
                    {isAr ? 'أحدث المقالات والتحليلات' : 'Recent Insights & Articles'}
                  </h2>
                  <div className="h-px flex-1 bg-border/60" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {gridPosts.map((post) => (
                    <BlogGridCard key={post.id} post={post} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}