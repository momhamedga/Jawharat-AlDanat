// src/app/[locale]/clients/page.tsx
import React from 'react';
import ClientsSection from '@/components/clients/ClientsSection';

export const dynamic = 'force-dynamic';

interface ClientsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ClientsPage({ params }: ClientsPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      {/* تمرير اللغة لضمان التحول بين العربي والإنجليزي مستقبلاً بدون أي مشاكل */}
      <ClientsSection locale={locale} />
    </main>
  );
}