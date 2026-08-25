import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, Heart, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import type { BlogPostSummary } from '../data/blog.queries';

interface BlogFeaturedCardProps {
  post: BlogPostSummary;
  locale: string;
}

export function BlogFeaturedCard({ post, locale }: BlogFeaturedCardProps) {
  const isAr = locale === 'ar';
  const title = isAr ? post.titleAr : post.titleEn;
  const excerpt = isAr ? post.excerptAr : post.excerptEn;
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

  return (
    <article className="mb-12 sm:mb-16">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="group block bg-card/50 border border-border/80 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* 🖼️ Hero Image Container */}
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[340px] overflow-hidden bg-muted">
            <Image
              src={post.image || '/images/blog-1.webp'}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:hidden" />
            
            {/* Category Tag Overlay */}
            <span className="absolute top-4 start-4 bg-background/80 backdrop-blur-md text-primary text-xs font-bold px-3.5 py-1.5 rounded-xl border border-border/80 shadow-xs">
              {category}
            </span>
          </div>

          {/* 📝 Editorial Content */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Metadata Kicker */}
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-foreground/80">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{readTime}</span>
                </span>
                <span>•</span>
                <time dateTime={post.createdAt} className="text-muted-foreground">
                  {formattedDate}
                </time>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                {title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            </div>

            {/* Bottom Bar: Stats & Read CTA */}
            <div className="pt-5 border-t border-border/60 flex items-center justify-between gap-4">
              
              {/* Stats */}
              <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-destructive/80" />
                  <span className="font-mono font-bold">{post.likes}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-primary/80" />
                  <span className="font-mono font-bold">{post.views}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-mono font-bold">{post.commentCount}</span>
                </span>
              </div>

              {/* Read Action Button */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline">
                <span>{isAr ? 'قراءة التحليل كاملاً' : 'Read Full Article'}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                )}
              </span>

            </div>

          </div>

        </div>
      </Link>
    </article>
  );
}

