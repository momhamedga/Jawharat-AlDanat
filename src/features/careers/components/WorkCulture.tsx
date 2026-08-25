import Image from 'next/image';
import { workPrinciples } from '../data/careers.data';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface WorkCultureProps {
  locale: string;
}

export default function WorkCulture({ locale }: WorkCultureProps) {
  const isAr = locale === 'ar';

  return (
    <section
      className="py-20 lg:py-28"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'بيئة العمل والنزاهة المؤسسية' : 'Workplace Culture & Integrity'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-lg">
              <Image
                src="/images/join.webp"
                alt={isAr ? 'فريق عمل جوهرة الدانة' : 'Jawharat Al Danat Team'}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 start-6 bg-card/95 backdrop-blur-md border border-border/80 px-5 py-3 rounded-2xl shadow-md flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <p className="text-xs font-bold text-foreground">
                {isAr ? 'كوادر وطنية وكفاءات عالمية متخصصة' : 'National Talents & Specialized Global Craftsmen'}
              </p>
            </div>
          </div>

          {/* Principles Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{isAr ? 'بيئة العمل وثقافة الإنجاز' : 'Work Culture & Standards'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {isAr
                  ? 'ثقافة مؤسسية تقدر المهارة وتوفر بيئة مستقرة للإبداع'
                  : 'An Institutional Culture Valuing Craftsmanship & Professional Stability'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAr
                ? 'نؤمن بأن نجاح جوهرة الدانة ينبع من مهارة وشغف فريق عملنا. لذلك نحرص على توفير بيئة تشغيلية متطورة، مجهزة بأحدث الأدوات والتقنيات، مع الالتزام بأرقى معايير السلامة المهنية والتقدير المتبادل.'
                : 'At Jawharat Al Danat, our distinction is driven by the mastery and dedication of our people. We maintain cutting-edge workshop facilities, modern administrative infrastructure, and rigorous safety standards.'}
            </p>

            <div className="space-y-3 pt-2">
              {workPrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-1"
                >
                  <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{isAr ? item.title.ar : item.title.en}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed ps-6">
                    {isAr ? item.desc.ar : item.desc.en}
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
