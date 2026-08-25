import Link from 'next/link';
import { Phone, MessageCircle, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface HomeCTAProps {
  locale: string;
}

export default function EventsConferences({ locale }: HomeCTAProps) {
  const isAr = locale === 'ar';
  const primaryPhone = siteConfig.contact.phones[0];

  return (
    <section
      className="relative w-full bg-card/60 border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'تواصل معنا وحجز موعد' : 'Contact & Booking'}
    >
      {/* 🔮 Ambient Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute bottom-0 start-1/4 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-border/90 bg-card shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* 💬 Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{isAr ? 'الاستشارات والحجوزات الرسمية' : 'Consultations & Bookings'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {isAr ? 'جاهزون لتقديم تجربة استثنائية ترتقي لتطلعاتكم' : 'Ready to Deliver an Exceptional Standard Across the UAE'}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {isAr
                  ? 'سواء كنت ترغب بحماية سيارتك بأحدث تقنيات النانو سيراميك أو التخطيط لقمة أو مؤتمر رسمي بمعايير سيادية، فريقنا المتخصص في خدمتكم.'
                  : 'Whether safeguarding your vehicle with cutting-edge optical PPF or orchestrating an official summit with sovereign protocol, our specialists are ready.'}
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>{isAr ? 'ضمان رسمي معتمد' : 'Certified Warranty'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>{isAr ? 'استشارات فنية وتنظيمية' : 'Technical & Event Advisory'}</span>
                </div>
              </div>

            </div>

            {/* 🎯 Right Actions & Booking Rails (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Primary Contact CTA */}
              <Link
                href={`/${locale}/contact`}
                className="group p-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-between"
              >
                <div className="flex flex-col text-start">
                  <span>{isAr ? 'طلب استشارة أو عرض سعر' : 'Request Advisory & Quote'}</span>
                  <span className="text-[11px] opacity-80 font-normal">
                    {isAr ? 'استجابة سريعة من مستشارينا' : 'Prompt response from our specialists'}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </Link>

              {/* WhatsApp Direct */}
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-border/90 bg-card hover:bg-secondary/40 text-foreground font-semibold text-xs transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-start">
                    <span>{isAr ? 'المحادثة الفورية عبر واتساب' : 'Instant WhatsApp Assistance'}</span>
                    <span className="text-[11px] text-muted-foreground font-normal">{primaryPhone.display}</span>
                  </div>
                </div>
                <span className="text-primary font-bold">
                  {isAr ? 'تواصل الآن' : 'Connect'}
                </span>
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${primaryPhone.raw}`}
                className="p-4 rounded-2xl border border-border/90 bg-card hover:bg-secondary/40 text-foreground font-semibold text-xs transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-start">
                    <span>{isAr ? 'الاتصال المباشر بالفرع الرئيسي' : 'Direct HQ Telephone Call'}</span>
                    <span className="text-[11px] text-muted-foreground font-normal" dir="ltr">{primaryPhone.display}</span>
                  </div>
                </div>
                <span className="text-primary font-bold">
                  {isAr ? 'اتصال' : 'Call'}
                </span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}