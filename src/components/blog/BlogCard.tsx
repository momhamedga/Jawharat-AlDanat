// src/components/blog/BlogCard.tsx
import React from 'react';
import Image from 'next/image';
import { Clock, Eye, Heart, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPost } from './blogData';

interface BlogCardProps {
  post: BlogPost & {
    // دعم الحقول كما تأتي من NeonDB مباشرة (Snake Case) لمنع أي كراش أو قيم undefined
    title_ar?: string;
    title_en?: string;
    excerpt_ar?: string;
    excerpt_en?: string;
    category_ar?: string;
    category_en?: string;
    read_time_ar?: string;
    read_time_en?: string;
    created_at?: string | Date;
  };
  locale: string;
  likes: number;
  onLike: (e: React.MouseEvent) => void;
  onReadMore: () => void;
}

export default function BlogCard({ post, locale, likes, onReadMore, onLike }: BlogCardProps) {
  const isAr = locale === 'ar';

  // تكتيك الـ Mapping الذكي: استخراج البيانات سواء كانت camelCase أو snake_case
  const title = isAr ? (post.titleAr || post.title_ar) : (post.titleEn || post.title_en);
  const excerpt = isAr ? (post.excerptAr || post.excerpt_ar) : (post.excerptEn || post.excerpt_en);
  const category = isAr ? (post.categoryAr || post.category_ar) : (post.categoryEn || post.category_en);
  const readTime = isAr ? (post.readTimeAr || post.read_time_ar) : (post.readTimeEn || post.read_time_en);
  const rawDate = post.createdAt || post.created_at;

  return (
    <div 
      onClick={onReadMore}
      className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-full cursor-pointer group hover:border-brand-light-gold/40 hover:shadow-[0_20px_45px_rgba(197,160,89,0.06)] transition-all duration-500 ease-out"
    >
      
      {/* 🖼️ قسم الصورة والشارات الثابتة الفاخرة مع تأثيرات الحركة */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={post.image || '/images/blog-1.webp'}
          alt={title || 'Blog Image'}
          fill
          sizes="(max-w-7xl) 100vw"
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
        />
        {/* تدرج ظلي خفيف ثابت لحماية النصوص العلوي والسفلي */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* شارة فئة المقال الفخمة بتصميم Glassmorphism مستقر */}
        <span className="absolute top-4 right-4 left-auto bg-white/80 backdrop-blur-md text-brand-deep-gold text-[10px] md:text-xs font-black px-4 py-1.5 rounded-xl border border-white/60 shadow-sm uppercase tracking-wide transform group-hover:translate-y-[-2px] transition-transform duration-300">
          {category}
        </span>
      </div>

      {/* 📝 محتوى كارت المقال */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
        
        <div className="space-y-3">
          {/* ميتا داتا المقال */}
          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md text-slate-500 group-hover:bg-brand-light-gold/5 transition-colors duration-300">
              <Clock className="w-3.5 h-3.5 text-brand-deep-gold" /> 
              {readTime}
            </span>
            <span className="text-slate-200">•</span>
            
            {/* 🛡️ معالجة التاريخ الذكية للقضاء على الـ Invalid Date نهائياً */}
            <span className="text-slate-400 font-medium">
              {(() => {
                if (!rawDate) return isAr ? 'نُشر حديثاً' : 'Recently';
                
                const dateObj = new Date(rawDate);
                if (isNaN(dateObj.getTime())) return isAr ? 'نُشر حديثاً' : 'Recently';

                return dateObj.toLocaleDateString(isAr ? 'ar-AE' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
              })()}
            </span>
          </div>

          {/* العنوان المستقر مع تأثير ذهبي عند تمرير الماوس على الكارت */}
          <h3 className="text-base md:text-lg font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-brand-deep-gold transition-colors duration-300">
            {title}
          </h3>

          {/* المقتطف النصي النظيف */}
          <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        {/* 📊 شريط التفاعلات السفلي الثابت والأزرار الحية */}
        <div 
          onClick={(e) => e.stopPropagation()} // 🛡️ حماية مطلقة: تمنع فتح المقال بالخطأ عند الضغط على الأزرار التفاعلية
          className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2"
        >
          
          {/* الأزرار التفاعلية الحية */}
          <div className="flex items-center gap-2.5 text-slate-400 text-xs font-bold">
            {/* زر الإعجاب الفوري */}
            <button 
              onClick={onLike} 
              className="flex items-center gap-1.5 text-rose-500 bg-rose-50/70 border border-rose-100 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all active:scale-90"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="font-black text-xs">{likes}</span>
            </button>

            {/* عدد المشاهدات اللحظي القادم من حقل views في NeonDB */}
            <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl text-slate-500">
              <Eye className="w-3.5 h-3.5" /> 
              <span>{post.views || 0}</span>
            </span>

            {/* عدد التعليقات الفعلي */}
            <span className="flex items-center gap-1 bg-brand-turquoise/5 border border-brand-turquoise/10 px-2.5 py-1.5 rounded-xl text-brand-turquoise">
              <MessageSquare className="w-3.5 h-3.5 fill-current opacity-20" /> 
              <span className="font-black">{post.comments?.length || 0}</span>
            </span>
          </div>

          {/* زر فتح المقال التفاعلي - يتحول بالكامل ديناميكياً مع حركة الكارت الإجمالية */}
          <div 
            className="flex items-center gap-1 text-xs font-black text-brand-deep-gold bg-brand-light-gold/10 group-hover:bg-brand-deep-gold group-hover:text-white px-3.5 py-2 rounded-xl border border-brand-light-gold/15 transition-all duration-300"
          >
            <span>{isAr ? 'اقرأ المقال' : 'Read Article'}</span>
            {isAr ? (
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}