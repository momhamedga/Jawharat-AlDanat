import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InstitutionalFactsheetProps {
  locale: string;
}

export default function InstitutionalFactsheet({ locale }: InstitutionalFactsheetProps) {
  const isAr = locale === 'ar';

  const facts = [
    {
      label: { ar: 'سنة التأسيس', en: 'Founded' },
      val: { ar: '2014 م', en: '2014' },
      detail: { ar: 'انطلاقة وطنية رائدة من أبوظبي', en: 'National launch in Abu Dhabi' },
    },
    {
      label: { ar: 'المقر الرئيسي', en: 'Headquarters' },
      val: { ar: 'أبوظبي • دبي', en: 'Abu Dhabi • Dubai' },
      detail: { ar: 'تغطية شاملة لكافة إمارات الدولة', en: 'Full UAE-wide coverage' },
    },
    {
      label: { ar: 'القطاعات التشغيلية', en: 'Core Divisions' },
      val: { ar: 'قطاعان متكاملان', en: '2 Specialized Sectors' },
      detail: { ar: 'العناية بالسيارات الفارهة والفعاليات الكبرى', en: 'Luxury Automotive & VIP Summits' },
    },
    {
      label: { ar: 'معايير الجودة والضمان', en: 'Quality & Assurance' },
      val: { ar: 'ضمان معتمد', en: 'Certified Standards' },
      detail: { ar: 'خامات عالمية وإشراف فني متخصص', en: 'Certified materials & specialist oversight' },
    },
  ];

  return (
    <section
      className="py-20 lg:py-28"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'بيانات المؤسسة والاتصال' : 'Institutional Factsheet & Contact'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Factsheet Grid */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'حقائق وبيانات المؤسسة' : 'Institutional Facts & Metrics'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {isAr ? 'مؤسسة إماراتية بهيكل تشغيلي متين' : 'A UAE Enterprise with Robust Operational Governance'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((fact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-border/80 bg-card space-y-3 shadow-xs hover:border-primary/40 transition-colors"
              >
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {isAr ? fact.label.ar : fact.label.en}
                </span>

                <p className="text-2xl font-black text-foreground">
                  {isAr ? fact.val.ar : fact.val.en}
                </p>

                <div className="pt-2 border-t border-border/50 flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{isAr ? fact.detail.ar : fact.detail.en}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Hub */}
        <div className="p-8 sm:p-12 rounded-3xl border border-border/90 bg-card shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-start max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'جاهزون لخدمتكم' : 'Ready to Serve You'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {isAr
                ? 'تفضل بزيارة مرافقنا أو طلب استشارة متخصصة'
                : 'Visit Our Facilities or Request a Specialized Advisory Session'}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isAr
                ? 'فريقنا الاستشاري متواجد في أبوظبي ودبي لتقديم كافة الحلول والتفاصيل الفنية.'
                : 'Our advisory specialists in Abu Dhabi and Dubai are available to address your specific requirements.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href={`/${locale}/services`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-secondary/60 hover:bg-secondary text-foreground text-xs font-bold transition-colors text-center"
            >
              {isAr ? 'استعراض الخدمات' : 'Explore Services'}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'طلب استشارة رسمية' : 'Request Official Advisory'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
