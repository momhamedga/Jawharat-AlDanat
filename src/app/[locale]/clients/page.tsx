import { Metadata } from 'next';
import ClientsHero from '@/features/clients/components/ClientsHero';
import SectorsServed from '@/features/clients/components/SectorsServed';
import QualityAndDiscretion from '@/features/clients/components/QualityAndDiscretion';
import EnterpriseEngagement from '@/features/clients/components/EnterpriseEngagement';
import { siteConfig } from '@/config/site';

interface ClientsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ClientsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `الشركاء والعملاء | ${siteConfig.name.ar}`
    : `Clients & Partners | ${siteConfig.name.en}`;

  const description = isAr
    ? 'تعرف على شراكات جوهرة الدانة المؤسسية، القطاعات المستفيدة، ومعايير السرية وضمان الجودة في العناية بالمركبات والفعاليات الكبرى.'
    : 'Discover Jawharat Al Danat strategic partnerships, sectors served, and confidentiality commitments in automotive care and sovereign summits.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/clients`,
      languages: {
        ar: '/ar/clients',
        en: '/en/clients',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/clients`,
      images: [
        {
          url: '/images/clients-hero.webp',
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
      images: ['/images/clients-hero.webp'],
    },
  };
}

export default async function ClientsPage({ params }: ClientsPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <ClientsHero locale={locale} />
      <SectorsServed locale={locale} />
      <QualityAndDiscretion locale={locale} />
      <EnterpriseEngagement locale={locale} />
    </div>
  );
}