import Image from 'next/image';
import { Car, Sparkles, Award } from 'lucide-react';

interface OperatingModelProps {
  locale: string;
}

export default function OperatingModel({ locale }: OperatingModelProps) {
  const isAr = locale === 'ar';

  return (
    <section
      className="py-20 lg:py-28 border-b border-border/60"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'نموذج العمل والانتشار' : 'Operating Model & Footprint'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-lg">
              <Image
                src="/images/about.webp"
                alt={isAr ? 'مقر ومرافق جوهرة الدانة' : 'Jawharat Al Danat Facilities'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 start-6 bg-card/95 backdrop-blur-md border border-border/80 px-5 py-3 rounded-2xl shadow-md flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <p className="text-xs font-bold text-foreground">
                {isAr ? 'أبوظبي • دبي • حضور على امتداد الدولة' : 'Abu Dhabi • Dubai • UAE Wide Presence'}
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{isAr ? 'النموذج التشغيلي المزدوج' : 'Dual-Sector Operating Model'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {isAr
                  ? 'تكامل فريد يخدم نخبة العملاء والمؤسسات في قطاعين حيويين'
                  : 'An Integrated Architecture Serving Elite Clients Across Two Vital Sectors'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAr
                ? 'تتميز جوهرة الدانة بنموذج تشغيلي رصين صُمم خصيصاً لتلبية متطلبات الجودة الفائقة. يرتكز نموذجنا على جناحين متكاملين: جناح العناية المتقدمة بالسيارات الفارهة عبر مواد معتمدة وتقنيات خالية من العيوب، وجناح إدارة الفعاليات والمؤتمرات الكبرى القائم على الانضباط البروتوكولي وإدارة المشهد العام بأعلى درجات الفخامة.'
                : 'Jawharat Al Danat operates on a resilient dual-pillar framework engineered to meet stringent luxury standards. One pillar focuses on certified automotive material science and precision application; the other orchestrates sovereign conferences, diplomatic delegation protocols, and high-level events.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Car className="w-4 h-4" />
                  <span>{isAr ? 'قطاع العناية بالمركبات' : 'Automotive Division'}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'أفلام حماية TPU، نانو سيراميك معتمد، تلميع تصحيحي، وتظليل حراري فائق.'
                    : 'Certified TPU PPF, 9H+ nano ceramic coatings, micro-correction, and ceramic tinting.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-border/80 bg-card/60 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'قطاع الفعاليات والقمم' : 'Summits & VIP Division'}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'إدارة المنصات، استقبال الوفود الرسمية، والتنظيم الشامل للمؤتمرات السيادية.'
                    : 'Architectural staging, diplomatic delegation hosting, and sovereign summit operations.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-muted-foreground">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>
                {isAr
                  ? 'كافة الأعمال تخضع لإشراف هندسي وتنفيذي مباشر وفق معايير الجودة المعتمدة.'
                  : 'All operations undergo direct executive oversight and rigorous quality audits.'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
