import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllServices } from '@/features/services/data/services';
import { getBlogPosts } from '@/features/blog/data/blog.queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const locales = ['ar', 'en'] as const;

  // 1. Core static pages
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/clients',
    '/join',
    '/contact',
    '/blog',
  ];

  const staticEntries: MetadataRoute.Sitemap = [];
  for (const route of staticRoutes) {
    for (const locale of locales) {
      staticEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date('2026-06-10T00:00:00.000Z'),
        changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services' || route === '/contact' ? 0.9 : 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    }
  }

  // 2. Service detail pages
  const services = getAllServices();
  const serviceEntries: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const locale of locales) {
      serviceEntries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date('2026-06-10T00:00:00.000Z'),
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar/services/${service.slug}`,
            en: `${baseUrl}/en/services/${service.slug}`,
          },
        },
      });
    }
  }

  // 3. Blog article pages (dynamically fetched on demand)
  const blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    for (const post of posts) {
      const postDate = post.createdAt ? new Date(post.createdAt) : new Date('2026-06-10T00:00:00.000Z');
      for (const locale of locales) {
        blogEntries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: isNaN(postDate.getTime()) ? new Date('2026-06-10T00:00:00.000Z') : postDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              ar: `${baseUrl}/ar/blog/${post.slug}`,
              en: `${baseUrl}/en/blog/${post.slug}`,
            },
          },
        });
      }
    }
  } catch (err) {
    console.error('[Sitemap] Failed to fetch blog articles for sitemap:', err);
  }

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
