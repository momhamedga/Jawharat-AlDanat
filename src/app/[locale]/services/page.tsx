
import ServicesSection from '@/components/services/ServicesSection';

export const dynamic = 'force-dynamic';

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      {/* استدعاء المكون المفصول للحفاظ على السرعة الطيارة بنسبة 100% */}
      <ServicesSection locale={locale} />
    </main>
  );
}