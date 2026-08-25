import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, Heart, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/features/blog/data/blog.queries';
import { LikeButton } from '@/features/blog/components/LikeButton';
import { CommentForm } from '@/features/blog/components/CommentForm';
import { CommentsList } from '@/features/blog/components/CommentsList';
import { BlogGridCard } from '@/features/blog/components/BlogGridCard';
import { ArticleViewTracker } from '@/features/blog/components/ArticleViewTracker';
import { MarkdownRenderer } from '@/features/blog/components/MarkdownRenderer';
import { siteConfig } from '@/config/site';

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// 🚀 On-Demand ISR with targeted revalidatePath invalidation for instant CMS publishing
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  const locales = ['ar', 'en'];

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isAr = locale === 'ar';
  const customTitle = isAr ? (post.seoTitleAr || post.titleAr) : (post.seoTitleEn || post.titleEn);
  const title = isAr ? `${customTitle} | مدونة جوهرة الدانة` : `${customTitle} | Jawharat Al Danat Journal`;
  const description = isAr ? (post.seoDescriptionAr || post.excerptAr) : (post.seoDescriptionEn || post.excerptEn);
  const ogImg = post.ogImage || post.image || '/images/blog-1.webp';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ar: `/ar/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.createdAt,
      images: [
        {
          url: ogImg,
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
      images: [ogImg],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';

  const [post, relatedPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  const title = isAr ? post.titleAr : post.titleEn;
  const excerpt = isAr ? post.excerptAr : post.excerptEn;
  const content = isAr ? post.contentAr : post.contentEn;
  const category = isAr ? post.categoryAr : post.categoryEn;
  const readTime = isAr ? post.readTimeAr : post.readTimeEn;

  const formattedDate = (() => {
    try {
      const d = new Date(post.createdAt);
      if (isNaN(d.getTime())) return isAr ? 'نُشر حديثاً' : 'Recently published';
      return d.toLocaleDateString(isAr ? 'ar-AE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return isAr ? 'نُشر حديثاً' : 'Recently published';
    }
  })();

  const Separator = isAr ? ChevronLeft : ChevronRight;

  // JSON-LD Structured Data for factual SEO (0 fake ratings)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    image: post.ogImage || post.image || `${siteConfig.url}/images/blog-1.webp`,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      '@type': 'Organization',
      name: 'Jawharat Al Danat',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jawharat Al Danat',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${locale}/blog/${slug}`,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteConfig.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'المدونة' : 'Journal',
        item: `${siteConfig.url}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteConfig.url}/${locale}/blog/${slug}`,
      },
    ],
  };

  return (
    <article className="relative w-full py-10 sm:py-16 md:py-20 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🛡️ Inject Safe Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* 📡 Non-blocking background view tracking */}
      <ArticleViewTracker postId={post.id} />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🧭 Editorial Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <Separator className="w-3.5 h-3.5 opacity-60" />
          <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">
            {isAr ? 'المدونة' : 'Journal'}
          </Link>
          <Separator className="w-3.5 h-3.5 opacity-60" />
          <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </nav>

        {/* 👑 Article Masthead */}
        <header className="space-y-5 text-start pb-8 border-b border-border/70">
          
          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary/10 text-primary border border-primary/25 text-xs font-bold px-3 py-1 rounded-xl">
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium bg-secondary/50 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{readTime}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
            {excerpt}
          </p>

          {/* Author Signature & Live Stats */}
          <div className="pt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                JD
              </div>
              <div>
                <p className="font-bold text-foreground">{isAr ? 'هيئة تحرير جوهرة الدانة' : 'Editorial Board'}</p>
                <p className="text-[10px] text-muted-foreground">{isAr ? 'أبوظبي، الإمارات' : 'Abu Dhabi, UAE'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 bg-card/60 border border-border/80 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-primary/80" />
                <span className="font-mono font-bold">{post.views}</span>
              </span>
              <span className="flex items-center gap-1 bg-card/60 border border-border/80 px-2.5 py-1 rounded-lg">
                <Heart className="w-3.5 h-3.5 text-destructive/80" />
                <span className="font-mono font-bold">{post.likes}</span>
              </span>
            </div>
          </div>

        </header>

        {/* 🖼️ Hero Article Media */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] my-8 sm:my-12 rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-xl">
          <Image
            src={post.image || '/images/blog-1.webp'}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center"
          />
        </div>

        {/* 📝 Reading Experience & Safe Markdown Body */}
        <MarkdownRenderer content={content} className="max-w-none text-foreground/90 text-start" />

        {/* 💖 Interactive Actions Bar */}
        <div className="my-12 p-6 rounded-2xl bg-card/40 border border-border/80 flex flex-wrap items-center justify-between gap-4">
          <LikeButton postId={post.id} initialLikes={post.likes} locale={locale} />
          
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة لجميع المقالات' : 'Back to all articles'}</span>
          </Link>
        </div>

        {/* 💬 Reader Feedback: Comment Form & Comments List */}
        <div className="space-y-8 my-16">
          <CommentForm postId={post.id} locale={locale} />
          <CommentsList comments={post.comments} locale={locale} />
        </div>

        {/* 📚 Related Editorial Insights */}
        {relatedPosts.length > 0 && (
          <section className="pt-16 border-t border-border/80 space-y-6" aria-label={isAr ? 'مقالات ذات صلة' : 'Related Articles'}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                {isAr ? 'تحليلات ورؤى إضافية' : 'More Editorial Insights'}
              </h2>
              <Link href={`/${locale}/blog`} className="text-xs font-bold text-primary hover:underline">
                {isAr ? 'عرض الكل' : 'View All'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <BlogGridCard key={rPost.id} post={rPost} locale={locale} />
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
