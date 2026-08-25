import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getServicesByCategory } from '../data/services';

interface EventsGridProps {
  locale: string;
}

export default function EventsGrid({ locale }: EventsGridProps) {
  const isAr = locale === 'ar';
  const eventsServices = getServicesByCategory('events');

  return (
    <section
      id="events-services"
      className="relative w-full bg-card/30 border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'خدمات الفعاليات والقمم' : 'Events & Summits Services'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* 🏛️ Sector Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'القسم الثاني • الفعاليات والمؤتمرات الكبرى' : 'Division 02 • Major Summits & VIP Protocol'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'بروتوكول سيادي وإدارة شاملة للمؤتمرات والقمم الرفيعة'
              : 'Sovereign Protocol & Strategic Summit Operations'}
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'من التصميم المكاني للمنصات وقاعات العرض إلى استقبال الوفود الرسمية وإدارة أساطيل كبار الشخصيات، نقدم تجربة تنظيمية متكاملة تليق بمكانة دولة الإمارات.'
              : 'From architectural stage staging to diplomatic delegation hosting and secure VIP transit, we deliver flawless event experiences reflecting UAE leadership.'}
          </p>
        </div>

        {/* 🧱 2 Editorial Wide Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {eventsServices.map((service, idx) => (
            <div
              key={service.slug}
              className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Visual Panel */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={service.heroImage}
                  alt={isAr ? service.title.ar : service.title.en}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/80 text-[11px] font-bold text-primary">
                  {isAr ? `بروتوكول 0${idx + 1}` : `Protocol 0${idx + 1}`}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {isAr ? service.title.ar : service.title.en}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {isAr ? service.tagline.ar : service.tagline.en}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAr ? service.summary.ar : service.summary.en}
                  </p>

                  {/* 2 Core Capabilities Preview */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    {service.capabilities.slice(0, 2).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{isAr ? cap.title.ar : cap.title.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Rail */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">
                      {isAr ? service.highlights[0].label.ar : service.highlights[0].label.en}:{' '}
                    </span>
                    <span>{isAr ? service.highlights[0].value.ar : service.highlights[0].value.en}</span>
                  </div>

                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold transition-colors"
                  >
                    <span>{isAr ? 'التفاصيل والمواصفات' : 'Full Specifications'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
