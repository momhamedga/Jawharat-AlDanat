import Image from 'next/image';
import { Crown, Briefcase, Award, Sparkles } from 'lucide-react';

interface OwnerSectionProps {
  locale: string;
}

export default function OwnerSection({ locale }: OwnerSectionProps) {
  const isAr = locale === 'ar';

  const pillars = [
    {
      titleAr: 'رائدة أعمال إماراتية',
      titleEn: 'Emirati Entrepreneur',
      descAr: 'تحويل الأفكار الابتكارية لمشاريع ناجحة ومستدامة تنموياً.',
      descEn: 'Transforming innovative concepts into high-impact businesses.',
      icon: <Crown className="w-4 h-4 text-primary" />,
    },
    {
      titleAr: 'مستشارة استراتيجية',
      titleEn: 'Strategic Consultant',
      descAr: 'تقديم حلول استشارية متكاملة لتطوير الأداء المؤسسي.',
      descEn: 'Providing integrated advisory to elevate corporate performance.',
      icon: <Briefcase className="w-4 h-4 text-primary" />,
    },
    {
      titleAr: 'مدربة وممكّنة كفاءات',
      titleEn: 'Executive Trainer',
      descAr: 'صقل مهارات الجيل القادم ونقل المعارف والخبرات العميقة.',
      descEn: 'Empowering future leaders with profound sustainable knowledge.',
      icon: <Award className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <section
      className="relative w-full bg-background border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'القيادة والرؤية' : 'Leadership'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 📸 Owner Portrait (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl group">
              <Image
                src="/images/owner.webp"
                alt={isAr ? 'الدكتورة حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Role Badge */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-bold text-foreground">
                    {isAr ? 'د. حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-primary">
                  {isAr ? 'رئيس مجلس الإدارة' : 'Chairperson'}
                </span>
              </div>
            </div>
          </div>

          {/* 📝 Narrative & Executive Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'القيادة والرؤية الملهمة' : 'Leadership & Vision'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {isAr ? 'الدكتورة حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
            </h2>

            <p className="text-sm font-semibold text-primary">
              {isAr
                ? 'رائدة أعمال إماراتية • مستشارة استراتيجية • مدربة معتمدة'
                : 'Emirati Entrepreneur • Strategic Consultant • Executive Trainer'}
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
              {isAr
                ? 'تجسد نموذجاً رائداً للمرأة الإماراتية الملهمة في قطاع المال والأعمال، وصوتاً مؤثراً في بناء المشاريع المستدامة. تميزت مسيرتها المهنية بالقدرة على تحويل الرؤى الطموحة إلى مشاريع ناجحة، ودعم التوجهات التنموية لدولة الإمارات من خلال نقل الخبرات العميقة وتمكين الكفاءات الوطنية.'
                : 'Embodying an inspiring model for Emirati women in business, Dr. Hamama holds a forward-looking vision for transformative enterprise, empowering national talent and fostering sustainable growth across the UAE.'}
            </p>

            {/* 3 Executive Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-start">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border/70 bg-card/50 space-y-1.5 shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 w-fit">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xs font-bold text-foreground">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}