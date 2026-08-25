import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface AboutHeroProps {
  locale: string;
}

export default function AboutHero({ locale }: AboutHeroProps) {
  const isAr = locale === 'ar';

  const breadcrumbs = [
    {
      label: isAr ? 'عن جوهرة الدانة' : 'About Us',
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مقدمة عن المؤسسة' : 'About Jawharat Al Danat'}
    >
      {/* 🔮 Ambient Light Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/3 start-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'منظومة إماراتية رائدة • تأسست 2014' : 'Pioneering UAE Enterprise • Established 2014'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'مؤسسة وطنية تجمع بين هندسة العناية بالمركبات وفخامة البروتوكول السيادي'
              : 'A National Enterprise Uniting Automotive Engineering & Sovereign Protocol'}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? 'انطلقت جوهرة الدانة من العاصمة أبوظبي كعلامة وطنية رائدة متخصصة في تقديم حلول متكاملة تجمع بين أدق معايير هندسة حماية وتجميل السيارات الفارهة، والاحترافية العالية في إدارة المؤتمرات والفعاليات الكبرى لكبار الشخصيات.'
              : 'Founded in Abu Dhabi, Jawharat Al Danat stands as a distinguished national enterprise delivering integrated solutions—from high-precision luxury automotive preservation to sovereign event management and diplomatic hospitality.'}
          </p>
        </div>
      </div>
    </section>
  );
}
