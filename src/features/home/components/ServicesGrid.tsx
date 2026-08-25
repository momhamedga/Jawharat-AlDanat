import Link from 'next/link';
import { ShieldCheck, Sparkles, Droplets, SunMedium, ArrowUpRight } from 'lucide-react';

interface ServicesGridProps {
  locale: string;
}

export default function ServicesGrid({ locale }: ServicesGridProps) {
  const isAr = locale === 'ar';

  const automotiveServices = [
    {
      slug: 'paint-protection-ppf',
      titleAr: 'أفلام حماية الطلاء (PPF)',
      titleEn: 'Paint Protection Film (PPF)',
      descAr: 'درع متطور فائق الشفافية وذاتي المعالجة يحمي طلاء المركبة من الخدوش، الحصى، والعوامل الجوية القاسية.',
      descEn: 'Advanced self-healing optical shield protecting luxury bodywork against stone chips, scratches, and harsh climates.',
      tagAr: 'حماية هيكلية متقدمة',
      tagEn: 'Structural Surface Shield',
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      slug: 'polishing-ceramic',
      titleAr: 'التلميع الاحترافي ونانو سيراميك',
      titleEn: 'Polishing & Nano Ceramic Coating',
      descAr: 'تصحيح دقيق للطلاء مع طبقات سيراميك كارهة للماء والأتربة تمنح المركبة عمقاً لونياً ولمعاناً زجاجياً استثنائياً.',
      descEn: 'Meticulous multi-stage paint correction paired with hydrophobic ceramic armor for enduring crystal clarity.',
      tagAr: 'بريق كريستالي دائم',
      tagEn: 'Hydrophobic Glass Finish',
      icon: <Sparkles className="w-6 h-6 text-primary" />,
    },
    {
      slug: 'deep-cleaning-detailing',
      titleAr: 'التنظيف العميق والعناية الدقيقة',
      titleEn: 'Deep Cleaning & Interior Detailing',
      descAr: 'عناية فائقة وتطهير بالبخار لكافة تفاصيل المقصورة والفرش الجلدي والمكونات الحساسة بأرقى المواد العالمية.',
      descEn: 'Comprehensive steam sanitization and preservation for fine leather, carbon trim, and intricate cabin details.',
      tagAr: 'تطهير وحماية المقصورة',
      tagEn: 'Cabin Restoration',
      icon: <Droplets className="w-6 h-6 text-primary" />,
    },
    {
      slug: 'heat-insulation-film',
      titleAr: 'أفلام العزل الحراري والتظليل',
      titleEn: 'Nano Ceramic Heat Insulation Film',
      descAr: 'تقنية عزل نانو متطورة تحجب حتى 99% من الأشعة فوق البنفسجية وتخفض حرارة المقصورة لأقصى درجات الراحة.',
      descEn: 'Cutting-edge optical thermal rejection blocking 99% of UV rays for optimal climate comfort and privacy.',
      tagAr: 'عزل حراري بنسبة 99%',
      tagEn: '99% UV Solar Rejection',
      icon: <SunMedium className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-card/30 border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'خدمات العناية بالسيارات' : 'Automotive Care Services'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🏛️ Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'قطاع العناية بالسيارات الفارهة' : 'Automotive Craftsmanship Sector'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {isAr ? 'دقة حرفية وتقنيات نانو لحماية الأسطول الفاخر' : 'Master Craftsmanship & Nano Protection for Elite Fleets'}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {isAr
                ? 'حلول هندسية متقدمة في حماية وتلميع وعزل السيارات في أبوظبي ودبي بأعلى المعايير المعتمدة عالمياً.'
                : 'Engineered protective and detailing solutions designed to preserve and elevate luxury vehicles across Abu Dhabi & Dubai.'}
            </p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/90 bg-secondary/40 text-foreground font-semibold text-xs hover:bg-secondary hover:text-primary transition-colors shrink-0 self-start md:self-auto"
          >
            <span>{isAr ? 'عرض جدول الخدمات والمقارنات' : 'View Service Index'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 🧱 4-Item Art-Directed Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {automotiveServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="group p-8 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-primary/10 w-fit group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-bold">
                    {isAr ? service.tagAr : service.tagEn}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{isAr ? service.titleAr : service.titleEn}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                <span>{isAr ? 'تفاصيل الخدمة والمواصفات' : 'Service Specifications'}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {isAr ? '←' : '→'}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}