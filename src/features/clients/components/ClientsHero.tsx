import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface ClientsHeroProps {
  locale: string;
}

export default function ClientsHero({ locale }: ClientsHeroProps) {
  const isAr = locale === 'ar';

  const breadcrumbs = [
    {
      label: isAr ? 'الشركاء والعملاء' : 'Clients & Partners',
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مقدمة العملاء والشركاء' : 'Clients & Partners Introduction'}
    >
      {/* 🔮 Ambient Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 end-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'علاقات مؤسسية وثقة متبادلة' : 'Institutional Relationships & Enduring Trust'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'شراكات استراتيجية تخدم كبرى المؤسسات ونخبة ملاك المركبات'
              : 'Strategic Alliances Serving Premier Institutions & Discerning Vehicle Owners'}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isAr
              ? 'نبني في جوهرة الدانة علاقات طويلة الأمد تقوم على الانضباط والسرية التامة، ونفخر بتقديم خدماتنا للقطاعات المصرفية، وشركات الطيران، والجهات المنظمة للمؤتمرات الكبرى، إلى جانب نخبة من ملاك السيارات الفارهة في دولة الإمارات.'
              : 'At Jawharat Al Danat, we foster long-standing institutional partnerships grounded in absolute discretion and operational rigor. We proudly serve financial entities, aviation networks, summit organizers, and elite private vehicle collectors across the UAE.'}
          </p>
        </div>
      </div>
    </section>
  );
}
