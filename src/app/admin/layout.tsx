import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Cairo, Inter } from 'next/font/google';

const cairoFont = Cairo({
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-cairo',
  preload: true,
});

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'لوحة الإدارة | جوهرة الدانة',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairoFont.variable} ${interFont.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
