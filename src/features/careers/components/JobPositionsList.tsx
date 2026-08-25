import { MapPin, Briefcase, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { jobRolesData } from '../data/careers.data';
import { siteConfig } from '@/config/site';

interface JobPositionsListProps {
  locale: string;
}

export default function JobPositionsList({ locale }: JobPositionsListProps) {
  const isAr = locale === 'ar';
  const primaryEmail = siteConfig.contact.email;

  return (
    <section
      id="available-positions"
      className="py-20 lg:py-28 border-b border-border/60"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'الوظائف المتاحة' : 'Available Positions'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'الشواغر المتاحة حالياً' : 'Current Openings'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr
              ? 'اختر المسار المهني المناسب لخبراتك وقدم طلبك مباشرة'
              : 'Select the Role Matching Your Expertise & Apply Directly'}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'نستعرض هنا الأدوار الوظيفية المستمرة في ورش عملنا ومكاتبنا الإدارية. يمكنك التقديم الفوري بإرسال سيرتك الذاتية ومحفظة أعمالك.'
              : 'Explore our core operational roles in Abu Dhabi and Dubai. Submit your credentials directly via email or our talent liaison channel.'}
          </p>
        </div>

        {/* 4 Detailed Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobRolesData.map((job) => {
            const Icon = job.icon;
            const emailSubject = encodeURIComponent(
              isAr
                ? `طلب انضمام لوظيفة: ${job.title.ar}`
                : `Job Application: ${job.title.en}`
            );
            const whatsappText = encodeURIComponent(
              isAr
                ? `مرحباً، أود التقديم على وظيفة (${job.title.ar}) في جوهرة الدانة.`
                : `Hello, I would like to apply for the position (${job.title.en}) at Jawharat Al Danat.`
            );

            return (
              <article
                key={job.id}
                className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card flex flex-col justify-between space-y-6 shadow-xs hover:border-primary/40 transition-colors"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/60 text-foreground text-[11px] font-semibold">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span>{isAr ? job.location.ar : job.location.en}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                        <Briefcase className="w-3 h-3" />
                        <span>{isAr ? job.type.ar : job.type.en}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Department */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary">
                      {isAr ? job.department.ar : job.department.en}
                    </span>
                    <h3 className="text-xl font-extrabold text-foreground">
                      {isAr ? job.title.ar : job.title.en}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAr ? job.summary.ar : job.summary.en}
                  </p>

                  {/* Requirements List */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <span className="text-xs font-bold text-foreground">
                      {isAr ? 'المتطلبات الأساسية:' : 'Key Requirements:'}
                    </span>
                    {job.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{isAr ? req.ar : req.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Actions */}
                <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`mailto:${primaryEmail}?subject=${emailSubject}`}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isAr ? 'التقديم عبر البريد الإلكتروني' : 'Apply via Email'}</span>
                  </a>

                  <a
                    href={`${siteConfig.socials.whatsapp}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground text-xs font-semibold transition-colors flex items-center justify-center gap-2 text-center"
                    aria-label={isAr ? 'استفسار عبر واتساب' : 'Inquire on WhatsApp'}
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="sm:hidden">{isAr ? 'واتساب التوظيف' : 'WhatsApp'}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
