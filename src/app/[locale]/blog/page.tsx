
import BlogClient from '@/components/blog/BlogClient';
import { query } from '@/lib/db';

// 1. تعريف الهيكل (Interface) للبيانات لضمان الـ Type Safety
interface Comment {
  id: number;
  userName: string;
  text: string;
  createdAt: string;
}

interface BlogPost {
  id: number;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  categoryAr: string;
  categoryEn: string;
  readTimeAr: string;
  readTimeEn: string;
  image: string;
  likes: number;
  views: number;
  comments: Comment[];
}

export const dynamic = 'force-dynamic';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // 2. تحديد النوع للمصفوفة بدلاً من any
  let posts: BlogPost[] = [];

  try {
    const rawPosts = await query('SELECT * FROM blog_posts ORDER BY created_at DESC') || [];

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
          comments: comments as Comment[]
        };
      })
    );
  } catch (error) {
    console.error("NeonDB Fetch Error:", error);
    posts = []; 
  }

  return <BlogClient locale={locale} initialPosts={posts} />;
}