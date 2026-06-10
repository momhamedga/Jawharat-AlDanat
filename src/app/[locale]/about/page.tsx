import AboutSection from "@/components/about/AboutSection";

// 🌟 السطر السحري لمنع الـ Static Caching وإجبار السيرفر على قراءة الكود الجديد فوراً
export const dynamic = 'force-dynamic';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <AboutSection locale={locale} />
  
    </main>
  );
}