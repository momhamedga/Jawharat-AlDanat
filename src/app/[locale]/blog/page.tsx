// src/app/[locale]/blog/page.tsx
import React from 'react';
import BlogClient from '@/components/blog/BlogClient';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  let posts = [];

  try {
    // جلب المقالات بـ SQL نقي
    const rawPosts = await query('SELECT * FROM blog_posts ORDER BY created_at DESC') || [];

    // جلب وتنسيق البيانات مع تعليقاتها
    posts = await Promise.all(
      rawPosts.map(async (post: any) => {
        const comments = await query(
          'SELECT id, user_name AS "userName", text, created_at AS "createdAt" FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
          [post.id]
        ) || [];
        
        return {
          id: post.id,
          slug: post.slug,
          titleAr: post.title_ar,
          titleEn: post.title_en,
          excerptAr: post.excerpt_ar,
          excerptEn: post.excerpt_en,
          contentAr: post.content_ar,
          contentEn: post.content_en,
          categoryAr: post.category_ar,
          categoryEn: post.category_en,
          readTimeAr: post.read_time_ar,
          readTimeEn: post.read_time_en,
          image: post.image,
          likes: post.likes || 0,
          views: post.views || 0,
          comments: comments
        };
      })
    );
  } catch (error) {
    console.error("NeonDB Fetch Error:", error);
    // في حال فشل الاتصال، لا يتوقف الموقع بل يعرض مصفوفة فارغة
    posts = []; 
  }

  const categories = isAr 
    ? ['الكل', 'بروتوكول الفعاليات', 'العناية بالسيارات', 'أخبار الدانة']
    : ['All', 'Events Protocol', 'Car Care', 'AlDanat News'];

  // ⚠️ التأكيد هنا: تأكد أن الاسم initialPosts تماماً وليس posts فقط
  return <BlogClient locale={locale} initialPosts={posts} />;
}