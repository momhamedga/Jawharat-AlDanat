import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Cairo, Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';

// 🌐 Supported locales
const VALID_LOCALES = ['ar', 'en'] as const;

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

// 🌐 جلب خط Cairo للغة العربية كخط متغير
const cairoFont = Cairo({
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-cairo',
  preload: true,
});

// 🌐 جلب خط Inter للغة الإنجليزية كخط متغير
const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as 'ar' | 'en')) {
    notFound();
  }
  const isAr = locale === 'ar';
  const siteName = isAr ? siteConfig.name.ar : siteConfig.name.en;
  const defaultTitle = isAr
    ? `${siteConfig.name.ar} | حلول العناية بالسيارات الفاخرة وإدارة الفعاليات`
    : `${siteConfig.name.en} | Luxury Automotive Care & Premier Events`;
  const defaultDescription = isAr
    ? 'مؤسسة إماراتية رائدة تجمع بين الحرفية في حماية وتجهيز السيارات الفارهة، والاحترافية السيادية في تنظيم المؤتمرات والفعاليات الكبرى بأبوظبي ودبي.'
    : 'Premier Emirati enterprise delivering bespoke luxury automotive preservation and sovereign event management in Abu Dhabi & Dubai.';

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteConfig.url }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/images/logo.webp',
    },
    openGraph: {
      siteName,
      locale: isAr ? 'ar_AE' : 'en_US',
      type: 'website',
      url: `${siteConfig.url}/${locale}`,
      images: [
        {
          url: '/images/og-image.webp',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/og-image.webp'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale as 'ar' | 'en')) {
    notFound();
  }
  const isAr = locale === 'ar';
  const direction = isAr ? 'rtl' : 'ltr';
  const fontClass = isAr ? 'font-sans-ar' : 'font-sans-en';

  // 🛡️ Safe Organization & WebSite Structured Data
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jawharat Al Danat',
    alternateName: 'جوهرة الدانة',
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.webp`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971544118809',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['Arabic', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE',
    },
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jawharat Al Danat',
    alternateName: 'جوهرة الدانة',
    url: siteConfig.url,
  };

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairoFont.variable} ${interFont.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
        />
      </head>
      <body
        className={`${fontClass} bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col justify-between overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SkipLink locale={locale} />
          <Navbar locale={locale} />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}