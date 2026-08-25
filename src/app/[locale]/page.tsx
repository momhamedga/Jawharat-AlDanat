import type { Metadata } from 'next';
import Hero from '@/features/home/components/Hero';
import CompanyPositioning from '@/features/home/components/About';
import OwnerLeadership from '@/features/home/components/OwnerSection';
import AutomotiveShowcase from '@/features/home/components/ServicesGrid';
import EventsSummitShowcase from '@/features/home/components/EventShowcase';
import BrandStory from '@/features/home/components/StoryTimeline';
import HomeCTA from '@/features/home/components/EventsConferences';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `${siteConfig.name.ar} | حلول العناية المتقدمة بالسيارات وإدارة الفعاليات`
    : `${siteConfig.name.en} | Luxury Automotive Care & Premier Events`;

  const description = isAr
    ? 'مؤسسة إماراتية رائدة تجمع بين الحرفية في حماية وتجهيز السيارات الفارهة، والاحترافية السيادية في تنظيم المؤتمرات والفعاليات الكبرى بأبوظبي ودبي.'
    : 'Premier Emirati enterprise delivering bespoke luxury automotive preservation and sovereign event management in Abu Dhabi & Dubai.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}`,
      images: [
        {
          url: '/images/og-image.webp',
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
      images: ['/images/og-image.webp'],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  
  return (
    <div className="flex flex-col w-full">
      <Hero locale={locale} />
      <CompanyPositioning locale={locale} />
      <OwnerLeadership locale={locale} />
      <AutomotiveShowcase locale={locale} />
      <EventsSummitShowcase locale={locale} />
      <BrandStory locale={locale} />
      <HomeCTA locale={locale} />
    </div>
  );
}