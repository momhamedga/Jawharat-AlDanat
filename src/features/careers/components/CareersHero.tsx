import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface CareersHeroProps {
  locale: string;
}

export default function CareersHero({ locale }: CareersHeroProps) {
  const isAr = locale === 'ar';

  const breadcrumbs = [
    {
      label: isAr ? 'الوظائف والانضمام' : 'Careers & Opportunities',
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مقدمة الوظائف' : 'Careers Introduction'}
    >
      {/* 🔮 Ambient Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/3 start-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'الفرص الوظيفية • أبوظبي ودبي' : 'Career Opportunities • Abu Dhabi & Dubai'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'انضم إلى فريق يجمع بين الشغف الفني والانضباط المهني'
              : 'Join a Team Built on Technical Craftsmanship & Professional Excellence'}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? 'نبحث دائماً عن الكفاءات الطموحة والحرفيين المتمرسين للانضمام إلى منظومة جوهرة الدانة في مجالي العناية بالمركبات وإدارة المؤتمرات والفعاليات الكبرى.'
              : 'Jawharat Al Danat welcomes ambitious professionals and skilled technical specialists to advance our operations across luxury automotive preservation and VIP summit management.'}
          </p>
        </div>
      </div>
    </section>
  );
}
