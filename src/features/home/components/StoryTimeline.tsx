import { Calendar, Award, TrendingUp, Sparkles } from 'lucide-react';

interface StoryTimelineProps {
  locale: string;
}

export default function StoryTimeline({ locale }: StoryTimelineProps) {
  const isAr = locale === 'ar';

  const milestones = [
    {
      year: '2014',
      titleAr: 'التأسيس والانطلاق',
      titleEn: 'Founding & Launch',
      descAr: 'انطلاقة واثقة من العاصمة أبوظبي لتقديم خدمات استثنائية في العناية الفارهة بالسيارات وتنظيم الفعاليات.',
      descEn: 'Commencing in Abu Dhabi with a pioneering vision for luxury automotive care and bespoke event coordination.',
      icon: <Calendar className="w-4 h-4 text-primary" />,
    },
    {
      year: '2018',
      titleAr: 'التوسع الهندسي والتقني',
      titleEn: 'Technical Scaling',
      descAr: 'تطوير ورش العمل واعتماد أحدث تقنيات النانو سيراميك وأفلام الحماية الذاتية المعالجة.',
      descEn: 'Integrating cutting-edge self-healing PPF technologies and advanced multi-stage ceramic laboratories.',
      icon: <TrendingUp className="w-4 h-4 text-primary" />,
    },
    {
      year: '2020',
      titleAr: 'الشراكات والمؤتمرات الكبرى',
      titleEn: 'Major Summit Protocols',
      descAr: 'إدارة أساطيل وبروتوكولات ضيافة كبرى القمم والفعاليات الرسمية والخاصة في أبوظبي ودبي.',
      descEn: 'Directing VIP fleet logistics and official hospitality protocols for high-level summits across the UAE.',
      icon: <Award className="w-4 h-4 text-primary" />,
    },
    {
      year: '2026',
      titleAr: 'الريادة والنموذج المستدام',
      titleEn: 'Sovereign Benchmark',
      descAr: 'ترسيخ مكانة جوهرة الدانة كعلامة رائدة تجمع بين الحرفية التقنية والبروتوكول السيادي الرفيع.',
      descEn: 'Solidifying our position as the benchmark enterprise uniting master automotive precision and royal protocol.',
      icon: <Sparkles className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'مسيرة جوهرة الدانة' : 'Our Milestones'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🏛️ Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'مسيرة التميز والتطور' : 'Our Growth & Heritage'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr ? 'محطات من الريادة وبناء الثقة في دولة الإمارات' : 'Milestones of Leadership & Enduring Trust'}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'رحلة نمو مستمرة ترتكز على التطور التكنولوجي، الشغف بالحرفية، والالتزام بأعلى معايير الخدمة المؤسسية.'
              : 'A continuous journey grounded in technical precision, authentic passion, and uncompromising institutional excellence.'}
          </p>
        </div>

        {/* ⏳ Chronological Rail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-primary font-sans">
                    {m.year}
                  </span>
                  <div className="p-2 rounded-lg bg-primary/10">
                    {m.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {isAr ? m.titleAr : m.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isAr ? m.descAr : m.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 text-[11px] font-semibold text-primary/80">
                {isAr ? `المحطة 0${idx + 1}` : `Phase 0${idx + 1}`}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}