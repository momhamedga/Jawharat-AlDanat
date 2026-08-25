import Image from 'next/image';
import { Quote, Sparkles } from 'lucide-react';

interface LeadershipNarrativeProps {
  locale: string;
}

export default function LeadershipNarrative({ locale }: LeadershipNarrativeProps) {
  const isAr = locale === 'ar';

  return (
    <section
      className="py-20 lg:py-28 border-b border-border/60 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'القيادة والرؤية الاستراتيجية' : 'Leadership & Strategic Vision'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text & Strategic Context */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{isAr ? 'القيادة المؤسسية والتوجيه الاستراتيجي' : 'Executive Leadership & Strategic Direction'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {isAr
                  ? 'رؤية قيادية وطنية ترتكز على التميز والريادة التنافسية'
                  : 'A National Leadership Vision Anchored in Excellence & Competitive Distinction'}
              </h2>
            </div>

            <div className="p-6 rounded-3xl border border-border/80 bg-card/50 space-y-3 relative">
              <Quote className="w-8 h-8 text-primary/30 shrink-0" />
              <p className="text-sm sm:text-base text-foreground font-medium italic leading-relaxed">
                {isAr
                  ? '«إن التميز في خدمة الوطن والعملاء لا يتحقق بالصدفة، بل هو ثمرة التزام يومي بأدق التفاصيل، والاستثمار المستمر في أحدث التقنيات والمعايير العالمية التي تعكس المكانة المرموقة لدولة الإمارات.»'
                  : '"Excellence in serving our nation and clientele is never coincidental; it is the direct outcome of daily devotion to precision, continuous investment in advanced standards, and honoring the esteemed stature of the United Arab Emirates."'}
              </p>
              <div className="pt-2 text-xs font-bold text-primary">
                {isAr ? 'د. حمامه القبيسي — رئيس مجلس الإدارة والمؤسس' : 'Dr. Hamama Al Qubaisi — Founder & Chairperson'}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {isAr
                ? 'تقود د. حمامه القبيسي مسيرة تطوير جوهرة الدانة برؤية وطنية طموحة تحرص على تطبيق أفضل الممارسات الإدارية والفنية، وتعزيز الشراكات النوعية، وتمكين الكفاءات للارتقاء بقطاعي العناية بالمركبات والفعاليات الكبرى.'
                : 'Dr. Hamama Al Qubaisi steers the strategic trajectory of Jawharat Al Danat, emphasizing institutional governance, specialized technical capabilities, and sovereign alignment across both divisions.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span>
                {isAr
                  ? 'التزام راسخ بالمعايير المؤسسية والشفافية في كافة مراحل التشغيل.'
                  : 'Steadfast commitment to institutional integrity across all operational phases.'}
              </span>
            </div>
          </div>

          {/* Official Portrait */}
          <div className="lg:col-span-5 relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl">
              <Image
                src="/images/owner.webp"
                alt={isAr ? 'د. حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 start-6 end-6 text-center lg:text-start space-y-1">
                <p className="text-base font-extrabold text-foreground">
                  {isAr ? 'د. حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
                </p>
                <p className="text-xs text-primary font-semibold">
                  {isAr ? 'رئيس مجلس الإدارة والمؤسس' : 'Founder & Chairperson'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
