import { Metadata } from 'next';
import CareersHero from '@/features/careers/components/CareersHero';
import JobPositionsList from '@/features/careers/components/JobPositionsList';
import WorkCulture from '@/features/careers/components/WorkCulture';
import { siteConfig } from '@/config/site';

interface JoinPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: JoinPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `الوظائف والانضمام | ${siteConfig.name.ar}`
    : `Careers & Opportunities | ${siteConfig.name.en}`;

  const description = isAr
    ? 'انضم إلى فريق جوهرة الدانة في أبوظبي ودبي. استعرض الشواغر المتاحة في حماية السيارات الفارهة وإدارة الفعاليات وقدم طلبك مباشرة.'
    : 'Join Jawharat Al Danat in Abu Dhabi and Dubai. Explore open opportunities in luxury automotive care and summit management.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/join`,
      languages: {
        ar: '/ar/join',
        en: '/en/join',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/join`,
      images: [
        {
          url: '/images/join.webp',
          width: 1200,
          height: 630,
          alt: isAr ? siteConfig.name.ar : siteConfig.name.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/join.webp'],
    },
  };
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CareersHero locale={locale} />
      <JobPositionsList locale={locale} />
      <WorkCulture locale={locale} />
    </div>
  );
}