import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllServices, getServiceBySlug } from '@/features/services/data/services';
import ServiceDetailView from '@/features/services/components/ServiceDetailView';
import { siteConfig } from '@/config/site';

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['ar', 'en'];
  const services = getAllServices();

  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    for (const service of services) {
      params.push({
        locale,
        slug: service.slug,
      });
    }
  }

  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const title = isAr
    ? `${service.title.ar} | ${siteConfig.name.ar}`
    : `${service.title.en} | ${siteConfig.name.en}`;

  const description = isAr ? service.summary.ar : service.summary.en;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        ar: `/ar/services/${slug}`,
        en: `/en/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/services/${slug}`,
      images: [
        {
          url: service.heroImage,
          alt: isAr ? service.title.ar : service.title.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isAr = locale === 'ar';
  const title = isAr ? service.title.ar : service.title.en;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteConfig.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'الخدمات' : 'Services',
        item: `${siteConfig.url}/${locale}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteConfig.url}/${locale}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ServiceDetailView service={service} locale={locale} />
    </>
  );
}
