import Image from 'next/image';
import Link from 'next/link';
import { Building2, Users, Volume2, Camera, ArrowUpRight } from 'lucide-react';

interface EventShowcaseProps {
  locale: string;
}

export default function EventShowcase({ locale }: EventShowcaseProps) {
  const isAr = locale === 'ar';

  const eventPillars = [
    {
      titleAr: 'تهيئة وتصميم الفضاء',
      titleEn: 'Venue Architecture & Design',
      descAr: 'تصميم ديكور مخصص وتجهيز هندسي متكامل للمنصات وقاعات كبار الشخصيات.',
      descEn: 'Bespoke stage architecture, spatial decor, and dedicated VIP suites.',
      icon: <Building2 className="w-5 h-5 text-primary" />,
    },
    {
      titleAr: 'بروتوكول الضيافة والاستقبال',
      titleEn: 'VIP Hospitality & Protocol',
      descAr: 'إدارة ضيوف احترافية وفرق مدربة على أعلى بروتوكولات القصور والوفود الدبلوماسية.',
      descEn: 'Elite diplomatic protocol and royal hosting for dignitaries and official delegates.',
      icon: <Users className="w-5 h-5 text-primary" />,
    },
    {
      titleAr: 'التقنيات الصوتية والمرئية',
      titleEn: 'Audiovisual Production',
      descAr: 'أحدث منظومات الإضاءة والشاشات التفاعلية والصوت لتجربة حسية متكاملة.',
      descEn: 'State-of-the-art acoustic engineering, lighting, and immersive stage displays.',
      icon: <Volume2 className="w-5 h-5 text-primary" />,
    },
    {
      titleAr: 'التوثيق والإنتاج الإعلامي',
      titleEn: 'Media Documentation',
      descAr: 'توثيق بصري وسينمائي رفيع المستوى يخلد فعاليتكم بأعلى معايير الإخراج.',
      descEn: 'High-end visual production, live broadcast direction, and archival documentation.',
      icon: <Camera className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <section
      className="relative w-full bg-background border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'قطاع الفعاليات والمؤتمرات' : 'Events & Conferences Sector'}
    >
      {/* 🔮 Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="absolute top-1/3 end-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🏛️ Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'قطاع الفعاليات والمؤتمرات الكبرى' : 'Summits & Conferences Sector'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {isAr ? 'بروتوكول سيادي وإدارة شاملة للمؤتمرات والقمم الرسمية' : 'Sovereign Protocol & End-to-End Summit Management'}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {isAr
                ? 'تخطيط وتنفيذ متكامل للفعاليات والمؤتمرات الحكومية والخاصة في أبوظبي ودبي بأعلى درجات الانضباط والاحترافية.'
                : 'Flawless strategic planning and execution for major corporate gatherings and diplomatic summits across the UAE.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              href={`/${locale}/services/events-conferences`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-secondary/40 text-foreground text-xs font-semibold hover:bg-secondary hover:text-primary transition-colors"
            >
              <span>{isAr ? 'المعارض والمؤتمرات' : 'Conferences'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/${locale}/services/vip-event-management`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-secondary/40 text-foreground text-xs font-semibold hover:bg-secondary hover:text-primary transition-colors"
            >
              <span>{isAr ? 'فعاليات كبار الشخصيات' : 'VIP Protocol'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 🧱 12-Column Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-lg group">
              <Image
                src="/images/Speakers-1.webp"
                alt={isAr ? 'منصة الفعاليات والمؤتمرات' : 'Main Summit Stage'}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 start-4 text-xs font-bold text-foreground">
                {isAr ? 'إدارة المنصات والجلسات الرسمية' : 'Official Stage & Summit Sessions'}
              </div>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-md group">
              <Image
                src="/images/Events-Conferences-Services.webp"
                alt={isAr ? 'تنظيم القاعات والضيافة' : 'Summit Hall & Hospitality'}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 4 Protocol Pillars (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs space-y-3 transition-colors hover:border-primary/40"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}