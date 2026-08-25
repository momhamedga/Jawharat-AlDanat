import { Building2, PlaneTakeoff, ShieldCheck, Car } from 'lucide-react';

interface SectorsServedProps {
  locale: string;
}

export default function SectorsServed({ locale }: SectorsServedProps) {
  const isAr = locale === 'ar';

  const sectors = [
    {
      icon: Building2,
      id: 'financial',
      title: {
        ar: 'القطاع المصرفي والمؤسسات المالية',
        en: 'Banking & Financial Institutions',
      },
      tag: {
        ar: 'مؤتمرات ومنتديات اقتصادية',
        en: 'Economic Summits & Forums',
      },
      scope: {
        ar: 'تنظيم قاعات المؤتمرات والاجتماعات المغلقة، إدارة أنظمة الصوت والمرئيات، وتقديم خدمات الضيافة والاستقبال لكبار المسؤولين والوفود الاقتصادية.',
        en: 'Executive boardroom staging, AV production, and diplomatic hospitality for high-level delegations.',
      },
    },
    {
      icon: PlaneTakeoff,
      id: 'aviation',
      title: {
        ar: 'قطاع الطيران والنقل الفاخر',
        en: 'Aviation & Luxury Fleet Operations',
      },
      tag: {
        ar: 'خدمات الأساطيل والبروتوكول',
        en: 'Fleet Care & Protocol Transit',
      },
      scope: {
        ar: 'تأهيل وتجهيز أساطيل النقل الرسمية، تطبيق أفلام الحماية والعزل الحراري، وضمان الجاهزية التامة للمركبات قبل الفعاليات.',
        en: 'Official transit fleet preparation, thermal film application, and flawless vehicle presentation.',
      },
    },
    {
      icon: ShieldCheck,
      id: 'government',
      title: {
        ar: 'القمم والمؤتمرات الكبرى',
        en: 'Major Summits & Institutional Gatherings',
      },
      tag: {
        ar: 'تنظيم سيادي وإشراف شامل',
        en: 'Sovereign Staging & Coordination',
      },
      scope: {
        ar: 'إدارة متكاملة للأجنحة والمعارض المصاحبة، استقبال الشخصيات الرفيعة وفق قواعد البروتوكول الدبلوماسي، وضبط الجدول الزمني العام بدقة.',
        en: 'Turnkey exhibition pavillion management, diplomatic protocol hosting, and precision schedule governance.',
      },
    },
    {
      icon: Car,
      id: 'private',
      title: {
        ar: 'ملاك السيارات الفارهة والأفراد',
        en: 'Private Luxury Vehicle Collectors',
      },
      tag: {
        ar: 'حماية متقدمة وتلميع فائق',
        en: 'Master Preservation & Detailing',
      },
      scope: {
        ar: 'خدمات مخصصة لحماية الطلاء بأفلام TPU المعالجة ذاتياً، وتطبيقات النانو سيراميك 9H+، وتصحيح الطلاء الدقيق للمجموعات الخاصة.',
        en: 'Bespoke self-healing TPU PPF, certified 9H+ nano ceramic coatings, and concourse-level paint correction.',
      },
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 border-b border-border/60"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'القطاعات المستفيدة' : 'Sectors Served'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'مجالات التعاون والخدمة' : 'Areas of Engagement'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'القطاعات والمجالات التي نغطيها بحلولنا المتخصصة'
              : 'Key Operational Domains Supported by Our Specialized Infrastructure'}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'نصمم كل شراكة وفق احتياجات ومتطلبات القطاع المعني، مع التزام صارم بالمعايير الفنية واتفاقيات السرية.'
              : 'Every client engagement is tailored to sector-specific requirements under rigorous technical SLAs and non-disclosure standards.'}
          </p>
        </div>

        {/* 4 Structural Sector Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="p-8 rounded-3xl border border-border/80 bg-card space-y-5 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-secondary/60 text-foreground text-[11px] font-bold">
                      {isAr ? sec.tag.ar : sec.tag.en}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {isAr ? sec.title.ar : sec.title.en}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAr ? sec.scope.ar : sec.scope.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 text-xs font-semibold text-primary">
                  {isAr ? `القطاع 0${idx + 1}` : `Sector 0${idx + 1}`}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
