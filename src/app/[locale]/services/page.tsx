
import type { Metadata } from 'next';
import ServicesIndexHero from '@/features/services/components/ServicesIndexHero';
import AutomotiveGrid from '@/features/services/components/AutomotiveGrid';
import EventsGrid from '@/features/services/components/EventsGrid';
import { siteConfig } from '@/config/site';

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `منظومة الخدمات والحلول المتكاملة | ${siteConfig.name.ar}`
    : `Comprehensive Services & Solutions | ${siteConfig.name.en}`;

  const description = isAr
    ? 'استكشف خدمات جوهرة الدانة المتكاملة في حماية وتجهيز السيارات الفارهة، البروتوكول الملكي، وإدارة الفعاليات والمؤتمرات السيادية.'
    : 'Explore Jawharat Al Danat integrated solutions in bespoke luxury automotive care, royal protocol, and sovereign summit management.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        ar: '/ar/services',
        en: '/en/services',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/services`,
      images: [
        {
          url: '/images/services-hero.webp',
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
      images: ['/images/services-hero.webp'],
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <ServicesIndexHero locale={locale} />
      <AutomotiveGrid locale={locale} />
      <EventsGrid locale={locale} />
    </div>
  );
}