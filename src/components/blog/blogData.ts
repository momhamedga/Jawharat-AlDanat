// src/components/blog/blogData.ts

export interface Comment {
  id: number;          // تم تحويلها إلى number لتطابق SERIAL
  userName: string;
  text: string;
  createdAt: string | Date;
}

export interface BlogPost {
  id: number;          // تم تحويلها إلى number لتطابق SERIAL
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
  likes: number;       // استهلاك حقيقي مباشر
  views: number;       // استهلاك حقيقي مباشر
  comments: Comment[];
}

export const blogCategories = {
  ar: ['الكل', 'بروتوكول الفعاليات', 'العناية بالسيارات', 'أخبار الدانة'],
  en: ['All', 'Events Protocol', 'Car Care', 'AlDanat News']
};