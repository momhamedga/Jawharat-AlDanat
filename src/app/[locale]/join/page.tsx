// src/app/[locale]/join/page.tsx
import React from 'react';
import JoinSection from '@/components/join/JoinSection';

interface JoinPageProps {
  params: Promise<{ locale: string }>;
}

export default async function JoinPage({ params }: JoinPageProps) {
  // جلب الـ locale بشكل غير متزامن متوافق تماماً مع Next.js 15/16 ومعايير الـ Ultra-Modern
  const { locale } = await params;

  return <JoinSection locale={locale} />;
}