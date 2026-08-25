import { ShieldCheck, Target, Compass } from 'lucide-react';

interface OperatingPhilosophyProps {
  locale: string;
}

export default function OperatingPhilosophy({ locale }: OperatingPhilosophyProps) {
  const isAr = locale === 'ar';

  const pillars = [
    {
      icon: ShieldCheck,
      number: '01',
      title: {
        ar: 'الهندسة الدقيقة والمواد المعتمدة',
        en: 'Precision Engineering & Certified Materials',
      },
      desc: {
        ar: 'لا مساومة على جودة الخامات المستخدمة. نعتمد حصرياً أفلام بولي يوريثان حراري متطورة ومركبات نانو سيراميك معتمدة مختبرياً لضمان حماية أسطح السيارات ضد العوامل المناخية القاسية.',
        en: 'Uncompromising material standards. We utilize certified thermoplastic polyurethane (TPU) films and laboratory-tested nano ceramics engineered for harsh regional climates.',
      },
    },
    {
      icon: Target,
      number: '02',
      title: {
        ar: 'البروتوكول السيادي والسرية المطلقة',
        en: 'Sovereign Protocol & Absolute Discretion',
      },
      desc: {
        ar: 'في قطاع المؤتمرات وفعاليات كبار الشخصيات، نلتزم بأعلى معايير الانضباط البروتوكولي، والسرية التامة، والتنظيم الزمني الصارم لضمان تمثيل مشرف ومثالي للجهات والمؤسسات.',
        en: 'In high-level summits and VIP gatherings, our operations adhere strictly to diplomatic protocol standards, non-disclosure agreements, and flawless timing.',
      },
    },
    {
      icon: Compass,
      number: '03',
      title: {
        ar: 'الاستدامة والتطوير الوطني المستمر',
        en: 'Continuous Innovation & National Alignment',
      },
      desc: {
        ar: 'نواكب مستهدفات الرؤى التنموية الوطنية لدولة الإمارات، مع التركيز على استقطاب وتأهيل الكفاءات الوطنية المتخصصة وتطوير تقنيات تنفيذ صديقة للبيئة.',
        en: 'Aligned with UAE national development goals, we prioritize nurturing national talent and integrating eco-conscious operational technologies.',
      },
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 bg-card/20 border-b border-border/60"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'فلسفة العمل والقيم الجوهرية' : 'Operating Philosophy & Core Values'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'الثوابت والقيم المؤسسية' : 'Institutional Foundations & Core Values'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'الركائز التي تحكم كل تفصيلة في عملياتنا اليومية'
              : 'The Core Principles Governing Every Detail of Our Daily Operations'}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'نؤمن في جوهرة الدانة بأن الفخامة الحقيقية ليست مجرد مظهر، بل هي نتيجة مباشرة للانضباط والنزاهة المهنية والالتزام غير المشروط بأرقى المواصفات.'
              : 'At Jawharat Al Danat, authentic luxury is not merely an aesthetic—it is the direct outcome of disciplined execution, professional integrity, and rigorous standards.'}
          </p>
        </div>

        {/* 3 Balanced Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-border/80 bg-card space-y-5 shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-primary/40 font-sans">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {isAr ? pillar.title.ar : pillar.title.en}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAr ? pillar.desc.ar : pillar.desc.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 text-xs font-semibold text-primary">
                  {isAr ? `المعيار 0${idx + 1}` : `Standard 0${idx + 1}`}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
