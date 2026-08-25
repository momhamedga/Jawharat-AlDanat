import { z } from 'zod';

export const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, { message: 'الرابط الدائم (Slug) يجب أن يكون 3 أحرف على الأقل' })
    .max(255, { message: 'الرابط الدائم طويل جداً' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'الرابط الدائم يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وفواصل (-) فقط',
    }),
  titleAr: z
    .string()
    .trim()
    .min(3, { message: 'العنوان بالعربية مطلوب (3 أحرف على الأقل)' })
    .max(255, { message: 'العنوان بالعربية يتجاوز 255 حرفاً' }),
  titleEn: z
    .string()
    .trim()
    .min(3, { message: 'العنوان بالإنجليزية مطلوب (3 أحرف على الأقل)' })
    .max(255, { message: 'العنوان بالإنجليزية يتجاوز 255 حرفاً' }),
  excerptAr: z
    .string()
    .trim()
    .min(10, { message: 'المقتطف بالعربية مطلوب (10 أحرف على الأقل)' })
    .max(500, { message: 'المقتطف بالعربية يتجاوز 500 حرف' }),
  excerptEn: z
    .string()
    .trim()
    .min(10, { message: 'المقتطف بالإنجليزية مطلوب (10 أحرف على الأقل)' })
    .max(500, { message: 'المقتطف بالإنجليزية يتجاوز 500 حرف' }),
  contentAr: z
    .string()
    .trim()
    .min(10, { message: 'المحتوى بالعربية مطلوب (10 أحرف على الأقل)' })
    .max(100000, { message: 'محتوى المقال يتجاوز الحد الأقصى المسموح (100,000 حرف)' }),
  contentEn: z
    .string()
    .trim()
    .min(10, { message: 'المحتوى بالإنجليزية مطلوب (10 أحرف على الأقل)' })
    .max(100000, { message: 'محتوى المقال يتجاوز الحد الأقصى المسموح (100,000 حرف)' }),
  categoryAr: z
    .string()
    .trim()
    .min(2, { message: 'التصنيف بالعربية مطلوب' })
    .max(100),
  categoryEn: z
    .string()
    .trim()
    .min(2, { message: 'التصنيف بالإنجليزية مطلوب' })
    .max(100),
  readTimeAr: z
    .string()
    .trim()
    .min(2, { message: 'وقت القراءة بالعربية مطلوب (مثال: 5 دقائق)' })
    .max(50),
  readTimeEn: z
    .string()
    .trim()
    .min(2, { message: 'وقت القراءة بالإنجليزية مطلوب (مثال: 5 min read)' })
    .max(50),
  image: z
    .string()
    .trim()
    .min(1, { message: 'مسار الصورة الرئيسية مطلوب' })
    .max(500)
    .refine(
      (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
      { message: 'مسار الصورة يجب أن يبدأ بـ / أو رابط https:// صالح' },
    ),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  seoTitleAr: z.string().trim().max(255).optional().or(z.literal('')),
  seoTitleEn: z.string().trim().max(255).optional().or(z.literal('')),
  seoDescriptionAr: z.string().trim().max(500).optional().or(z.literal('')),
  seoDescriptionEn: z.string().trim().max(500).optional().or(z.literal('')),
  ogImage: z.string().trim().max(500).optional().or(z.literal('')),
});

export type ArticleInput = z.infer<typeof articleSchema>;

