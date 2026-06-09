// src/app/[locale]/layout.tsx
import React from 'react';
import '@/app/globals.css'; 
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Cairo } from 'next/font/google';

// 🌐 جلب خط Cairo بأداء عالٍ ودعم الأوزان المطلوبة بالكامل للفخامة والعناوين
const cairoFont = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'جوهرة الدانة | فعاليات وإدارة احترافية' : 'Jawharat AlDanat | Professional Events & Car Care',
    description: 'نصنع تجارب استثنائية تجمع بين الفخامة والاحترافية في قطاعي الفعاليات والسيارات في دولة الإمارات',
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body 
        className={`${cairoFont.className} bg-[#050B14] text-slate-100 antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black min-h-screen flex flex-col justify-between`}
      >
        <Navbar locale={locale} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}