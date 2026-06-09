// src/app/[locale]/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg pt-24 font-['Cairo'] text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-black text-brand-light-gold mb-4">من نحن — جوهرة الدانة</h1>
        <p className="text-brand-platinum/80">نحن نصنع التميز لأنك تستحق الأفضل</p>
      </div>
    </main>
  );
}