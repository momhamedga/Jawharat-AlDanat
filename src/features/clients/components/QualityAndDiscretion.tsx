import { Lock, FileCheck, Award, Clock } from 'lucide-react';

interface QualityAndDiscretionProps {
  locale: string;
}

export default function QualityAndDiscretion({ locale }: QualityAndDiscretionProps) {
  const isAr = locale === 'ar';

  const commitments = [
    {
      icon: Lock,
      title: {
        ar: 'اتفاقيات السرية التامة (NDA)',
        en: 'Strict Non-Disclosure Governance',
      },
      desc: {
        ar: 'نلتزم باتفاقيات عدم إفشاء المعلومات وحماية خصوصية بيانات الفعاليات الرسمية، وأساطيل كبار الشخصيات، وسجلات العملاء.',
        en: 'Rigorous confidentiality protocols protecting delegation data, official agendas, and private vehicle fleet records.',
      },
    },
    {
      icon: FileCheck,
      title: {
        ar: 'اتفاقيات مستوى الخدمة (SLA)',
        en: 'Guaranteed Service Level Agreements',
      },
      desc: {
        ar: 'جداول تسليم دقيقة، معايير فنية محددة لكل مرحلة تشغيلية، وتوثيق تقني شامل لضمان إنجاز الأعمال في المواعيد المقررة.',
        en: 'Precision delivery schedules, explicit technical standards, and end-to-end documentation across every deliverable.',
      },
    },
    {
      icon: Award,
      title: {
        ar: 'الفحص والتدقيق الفني المزدوج',
        en: 'Dual-Phase Quality Inspection',
      },
      desc: {
        ar: 'تخضع كافة أعمال الحماية والفعاليات لتدقيق هندسي وإشرافي ثنائي قبل التسليم النهائي للتأكد من خلوها من أي ملاحظات.',
        en: 'Every installation and staging operation undergoes mandatory dual-phase engineering inspection before final handover.',
      },
    },
    {
      icon: Clock,
      title: {
        ar: 'استجابة سريعة ودعم تشغيلي',
        en: 'Rapid Response & On-Site Support',
      },
      desc: {
        ar: 'فرق عمل متأهبة في أبوظبي ودبي للتعامل الفوري مع أي متطلبات طارئة خلال المؤتمرات أو عمليات التجهيز للسيارات.',
        en: 'Standby operational response teams in Abu Dhabi and Dubai for immediate on-site event and fleet coordination.',
      },
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 bg-card/20 border-b border-border/60"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مبادئ السرية وضمان الجودة' : 'Confidentiality & Quality Guarantees'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'ميثاق الثقة والأمان' : 'Governance & Assurance Charter'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'معايير السرية والضمان التي تحكم تعاملاتنا مع الشركاء'
              : 'Institutional Standards Governing Discretion, Timelines & Quality'}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'نضع حماية مصالح شركائنا وخصوصيتهم في مقدمة أولوياتنا، ونضمن توفير بيئة عمل آمنة وموثوقة لكافة المشاريع.'
              : 'Protecting our partners’ confidentiality and interests is fundamental to every contract, event, and installation we execute.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-border/80 bg-card space-y-4 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {isAr ? item.title.ar : item.title.en}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isAr ? item.desc.ar : item.desc.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 text-[11px] font-semibold text-primary">
                  {isAr ? 'التزام معتمد' : 'Certified Commitment'}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
