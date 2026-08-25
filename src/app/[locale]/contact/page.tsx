import type { Metadata } from 'next';
import ContactForm from '@/features/contact/components/ContactForm';
import ContactHeader from '@/features/contact/components/ContactHeader';
import ContactInfo from '@/features/contact/components/ContactInfo';
import { serviceNavItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? `تواصل معنا | ${siteConfig.name.ar}`
    : `Contact Us | ${siteConfig.name.en}`;

  const description = isAr
    ? 'تواصل مع مؤسسة جوهرة الدانة لخدمات العناية المتقدمة بالسيارات وإدارة الفعاليات والمؤتمرات في أبوظبي ودبي.'
    : 'Connect with Jawharat Al Danat for luxury automotive care solutions and premier event management in Abu Dhabi & Dubai.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ar: '/ar/contact',
        en: '/en/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/contact`,
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* 🌌 Ambient lighting effects matching OKLCH brand palette */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* Header */}
        <ContactHeader locale={locale} />

        {/* Contact Grid: Info (5 cols) + Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <ContactInfo locale={locale} />
          </div>

          <div className="lg:col-span-7">
            <ContactForm locale={locale} serviceItems={serviceNavItems} />
          </div>
        </div>
      </div>
    </div>
  );
}