import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface EnterpriseEngagementProps {
  locale: string;
}

export default function EnterpriseEngagement({ locale }: EnterpriseEngagementProps) {
  const isAr = locale === 'ar';
  const primaryPhone = siteConfig.contact.phones[0];

  return (
    <section
      className="py-20 lg:py-28"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'قنوات التواصل المؤسسي' : 'Enterprise Engagement & Advisory'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-border/90 bg-card shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{isAr ? 'التعاون المؤسسي وبناء الشراكات' : 'Corporate Partnerships & Inquiries'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                {isAr
                  ? 'لبحث فرص التعاون أو طلب عروض الخدمات المؤسسية'
                  : 'Explore Strategic Collaborations & Request Institutional Proposals'}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isAr
                  ? 'يسر فريق العلاقات المؤسسية والاتصال في جوهرة الدانة استقبال استفساراتكم ومناقشة تفاصيل الفعاليات أو عقود إدارة وحماية الأساطيل.'
                  : 'Our corporate partnerships team is ready to discuss event management mandates, sovereign summits, or institutional fleet protection programs.'}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <Link
                href={`/${locale}/contact`}
                className="group p-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-between"
              >
                <div className="flex flex-col text-start">
                  <span>{isAr ? 'تقديم طلب تعاون أو استشارة' : 'Submit Partnership Inquiry'}</span>
                  <span className="text-[10px] opacity-80 font-normal">
                    {isAr ? 'استجابة سريعة من مسؤولي العلاقات' : 'Direct liaison with our corporate team'}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </Link>

              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground font-semibold text-xs transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{isAr ? 'واتساب العلاقات المؤسسية' : 'Corporate WhatsApp Channel'}</span>
                </div>
                <span className="text-primary font-bold text-[11px]">{isAr ? 'تواصل' : 'Connect'}</span>
              </a>

              <a
                href={`tel:${primaryPhone.raw}`}
                className="p-3.5 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground font-semibold text-xs transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs" dir="ltr">{primaryPhone.display}</span>
                </div>
                <span className="text-primary font-bold text-[11px]">{isAr ? 'اتصال' : 'Call'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
