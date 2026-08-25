import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, Heart, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import type { BlogPostSummary } from '../data/blog.queries';

interface BlogGridCardProps {
  post: BlogPostSummary;
  locale: string;
}

export function BlogGridCard({ post, locale }: BlogGridCardProps) {
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
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isAr ? 'نُشر حديثاً' : 'Recently published';
    }
  })();

  return (
    <article className="h-full">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="group flex flex-col h-full bg-card/40 border border-border/80 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
      >
        {/* 🖼️ Card Media */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={post.image || '/images/blog-1.webp'}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <span className="absolute top-3.5 start-3.5 bg-background/80 backdrop-blur-md text-primary text-[11px] font-bold px-3 py-1 rounded-lg border border-border/70 shadow-xs">
            {category}
          </span>
        </div>

        {/* 📝 Card Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
          <div className="space-y-3">
            
            {/* Metadata Line */}
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-muted-foreground">
              <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded text-foreground/80">
                <Clock className="w-3 h-3 text-primary" />
                <span>{readTime}</span>
              </span>
              <span>•</span>
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          </div>

          {/* 📊 Bottom Bar */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
            
            {/* Counters */}
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-destructive/70" />
                <span className="font-mono">{post.likes}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-primary/70" />
                <span className="font-mono">{post.views}</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 opacity-70" />
                <span className="font-mono">{post.commentCount}</span>
              </span>
            </div>

            {/* Read Arrow */}
            <span className="inline-flex items-center gap-1 font-bold text-primary text-xs group-hover:underline">
              <span>{isAr ? 'اقرأ' : 'Read'}</span>
              {isAr ? (
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              )}
            </span>

          </div>

        </div>
      </Link>
    </article>
  );
}

