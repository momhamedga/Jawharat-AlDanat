import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface ServicesIndexHeroProps {
  locale: string;
}

export default function ServicesIndexHero({ locale }: ServicesIndexHeroProps) {
  const isAr = locale === 'ar';

  const breadcrumbs = [
    {
      label: isAr ? 'الخدمات' : 'Services',
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مقدمة الخدمات' : 'Services Introduction'}
    >
      {/* 🔮 Subtle Ambient Light */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 start-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'محفظة الخدمات المتخصصة • أبوظبي ودبي' : 'Specialized Services Portfolio • Abu Dhabi & Dubai'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'حلول سيادية تجمع بين دقة العناية بالسيارات واحترافية المؤتمرات'
              : 'Sovereign Solutions Uniting Precision Automotive Care & VIP Summits'}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? 'نقدم في جوهرة الدانة منظومة متكاملة من الخدمات الفاخرة المعتمدة، مبنية على خبرة وطنية ومعايير دقيقة تلبي تطلعات الأفراد والمؤسسات في دولة الإمارات العربية المتحدة.'
              : 'Jawharat Al Danat delivers a cohesive portfolio of premium certified solutions, combining national expertise with rigorous standards for discerning individuals and sovereign entities across the UAE.'}
          </p>
        </div>

        {/* 🧭 Sector Anchor Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#automotive-services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors text-xs font-semibold text-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary/80" />
            <span>{isAr ? 'قطاع العناية بالسيارات (4 خدمات)' : 'Automotive Care Sector (4 Services)'}</span>
          </a>

          <a
            href="#events-services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors text-xs font-semibold text-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary/80" />
            <span>{isAr ? 'قطاع الفعاليات والقمم (خدمتان)' : 'Events & Summits Sector (2 Services)'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
