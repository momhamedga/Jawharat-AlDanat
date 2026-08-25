import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section
      className="relative w-full bg-background border-b border-border/60 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'القسم الرئيسي' : 'Hero Section'}
    >
      {/* 🔮 Subtle Architectural Ambient Backdrops */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute -top-24 start-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 end-10 w-[450px] h-[450px] bg-secondary/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🏛️ 12-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* 📝 Text Content & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* National Origin / Positioning Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>
                {isAr
                  ? 'مؤسسة إماراتية رائدة • أبوظبي ودبي'
                  : 'Premier UAE Enterprise • Abu Dhabi & Dubai'}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-foreground tracking-tight leading-[1.2] lg:leading-[1.15]">
              {isAr ? (
                <>
                  ريادة تجمع بين{' '}
                  <span className="text-primary">العناية الفائقة بالسيارات</span>{' '}
                  والتنظيم السيادي للفعاليات
                </>
              ) : (
                <>
                  Sovereign Precision in{' '}
                  <span className="text-primary">Automotive Care</span> & VIP Summit Protocol
                </>
              )}
            </h1>

            {/* Strategic Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isAr
                ? 'منظومة متكاملة تقدم أحدث تقنيات الحماية النانو والتلميع لأسطول المركبات الفارهة، وتخطيطاً احترافياً للمؤتمرات والقمم الرسمية في دولة الإمارات وفق أعلى البروتوكولات.'
                : 'A dedicated ecosystem delivering cutting-edge nano protection and detailing for luxury fleets, paired with royal protocol and bespoke management for official summits.'}
            </p>

            {/* ⚜️ Dual Sector Articulation Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl mx-auto lg:mx-0 text-start">
              <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {isAr ? 'قطاع العناية بالسيارات' : 'Automotive Care Sector'}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {isAr ? 'حماية PPF، نانو سيراميك، عزل حراري' : 'PPF, Ceramic Coating, Thermal Film'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-border/80 bg-card/60 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {isAr ? 'قطاع الفعاليات والقمم' : 'Events & VIP Summits'}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {isAr ? 'تنظيم المؤتمرات، الضيافة، والبروتوكول' : 'Conferences, Protocol, Hospitality'}
                  </p>
                </div>
              </div>
            </div>

            {/* 🎯 Primary & Secondary CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'طلب استشارة / تواصل معنا' : 'Request Consultation / Contact'}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link
                href={`/${locale}/services`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-border/90 bg-secondary/50 text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
              >
                {isAr ? 'استكشف كافة الخدمات' : 'Explore All Services'}
              </Link>
            </div>

          </div>

          {/* 🖼️ Art-Directed Visual Stage (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-xl group">
              <Image
                src="/images/hero-events.avif"
                alt={isAr ? 'فعاليات وخدمات جوهرة الدانة' : 'Jawharat Al Danat Luxury Events & Automotive Services'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-bold text-foreground">
                    {isAr ? 'جوهرة الدانة • تميز بلا مساومة' : 'Jawharat Al Danat • Uncompromising Quality'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-primary">
                  {isAr ? 'أبوظبي' : 'Abu Dhabi'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}