import { Metadata } from 'next';
import AboutHero from '@/features/about/components/AboutHero';
import OperatingModel from '@/features/about/components/OperatingModel';
import OperatingPhilosophy from '@/features/about/components/OperatingPhilosophy';
import LeadershipNarrative from '@/features/about/components/LeadershipNarrative';
import InstitutionalFactsheet from '@/features/about/components/InstitutionalFactsheet';
import { siteConfig } from '@/config/site';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `عن المؤسسة | ${siteConfig.name.ar}`
    : `About Us | ${siteConfig.name.en}`;

  const description = isAr
    ? 'تعرف على مؤسسة جوهرة الدانة، تاريخنا الوطني، نموذجنا التشغيلي المزدوج في العناية بالسيارات الفارهة وإدارة المؤتمرات وفعاليات كبار الشخصيات.'
    : 'Discover Jawharat Al Danat: our heritage, dual-sector operating model in luxury automotive care and VIP sovereign event management.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        ar: '/ar/about',
        en: '/en/about',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/about`,
      images: [
        {
          url: '/images/about.webp',
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
      images: ['/images/about.webp'],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <AboutHero locale={locale} />
      <OperatingModel locale={locale} />
      <OperatingPhilosophy locale={locale} />
      <LeadershipNarrative locale={locale} />
      <InstitutionalFactsheet locale={locale} />
    </div>
  );
}