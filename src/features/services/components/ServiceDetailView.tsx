import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ServiceItem } from '../types/service';
import { getRelatedServices } from '../data/services';
import { siteConfig } from '@/config/site';
import {
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
  locale: string;
}

export default function ServiceDetailView({ service, locale }: ServiceDetailViewProps) {
  const isAr = locale === 'ar';
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const primaryPhone = siteConfig.contact.phones[0];

  const breadcrumbs = [
    {
      label: isAr ? 'الخدمات' : 'Services',
      href: `/${locale}/services`,
    },
    {
      label: isAr ? service.shortTitle.ar : service.shortTitle.en,
    },
  ];

  return (
    <article className="w-full bg-background text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🏛️ Header & Breadcrumbs Section */}
      <header className="relative w-full bg-card/40 border-b border-border/60 pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-1/4 start-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Breadcrumbs items={breadcrumbs} locale={locale} />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>
                {service.category === 'automotive'
                  ? isAr
                    ? 'قطاع العناية بالسيارات الفارهة'
                    : 'Automotive Craftsmanship Sector'
                  : isAr
                    ? 'قطاع المؤتمرات وفعاليات كبار الشخصيات'
                    : 'VIP Summits & Protocol Sector'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {isAr ? service.title.ar : service.title.en}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-primary/90 leading-relaxed">
              {isAr ? service.tagline.ar : service.tagline.en}
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isAr ? service.summary.ar : service.summary.en}
            </p>
          </div>
        </div>
      </header>

      {/* 🧱 Visual Asset & Highlights Hero Panel */}
      <section className="py-12 lg:py-16 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Primary Visual */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-border/80 bg-card shadow-lg">
                <Image
                  src={service.heroImage}
                  alt={isAr ? service.title.ar : service.title.en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Overview & Core Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-extrabold text-foreground">
                  {isAr ? 'نظرة عامة على الخدمة' : 'Service Overview'}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr ? service.overview.ar : service.overview.en}
                </p>
              </div>

              {/* 3 Technical / Operational Highlights */}
              <div className="space-y-3 pt-2">
                {service.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-border/80 bg-card/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="font-bold text-foreground">
                        {isAr ? item.label.ar : item.label.en}
                      </span>
                    </div>
                    <span className="font-semibold text-primary">
                      {isAr ? item.value.ar : item.value.en}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="w-full sm:flex-1 p-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>{isAr ? 'طلب استشارة وعرض سعر' : 'Request Advisory & Quote'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto p-4 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  aria-label={isAr ? 'محادثة واتساب' : 'WhatsApp'}
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="sm:hidden">{isAr ? 'محادثة فورية' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ⚜️ Capabilities & Key Advantages */}
      <section className="py-20 lg:py-28 bg-card/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'المزايا والقدرات التشغيلية' : 'Capabilities & Core Advantages'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {isAr ? 'ما الذي نضمنه لعملائنا في هذه الخدمة؟' : 'What We Guarantee For Our Discerning Clients'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card space-y-3 shadow-xs hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {isAr ? cap.title.ar : cap.title.en}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed ps-12">
                  {isAr ? cap.desc.ar : cap.desc.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ 4-Step Technical Methodology */}
      <section className="py-20 lg:py-28 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isAr ? 'منهجية العمل والتنفيذ' : 'Execution Methodology'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {isAr ? 'مراحل التنفيذ والانضباط المهني' : 'Step-by-Step Execution Lifecycle'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodology.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-border/80 bg-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-primary font-sans">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-xl bg-secondary/60">
                      <Layers className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {isAr ? step.title.ar : step.title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAr ? step.desc.ar : step.desc.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 text-[11px] font-semibold text-primary/80">
                  {isAr ? `المرحلة ${step.step}` : `Phase ${step.step}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔗 Related Curated Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 lg:py-24 bg-card/20 border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{isAr ? 'خدمات مكملة' : 'Complementary Services'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {isAr ? 'خدمات قد تهمك في نفس القطاع' : 'Related Specialized Solutions'}
                </h2>
              </div>

              <Link
                href={`/${locale}/services`}
                className="text-xs font-bold text-primary hover:underline underline-offset-4 self-start sm:self-auto"
              >
                {isAr ? 'عرض كافة الخدمات ←' : 'View All Services →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/services/${rel.slug}`}
                  className="p-6 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center group"
                >
                  <div className="relative w-full sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden bg-muted shrink-0">
                    <Image
                      src={rel.heroImage}
                      alt={isAr ? rel.title.ar : rel.title.en}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 flex-grow">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{isAr ? rel.title.ar : rel.title.en}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {isAr ? rel.summary.ar : rel.summary.en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🎯 Direct Action Hub & Inquiry CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-border/90 bg-card shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-4 text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{isAr ? 'حجز الموعد والاستشارات المباشرة' : 'Direct Booking & Consultations'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {isAr
                    ? `جاهزون لتقديم خدمة ${service.shortTitle.ar} بأعلى معايير الدقة`
                    : `Ready to Deliver ${service.shortTitle.en} With Sovereign Precision`}
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'فريقنا المتخصص في أبوظبي ودبي مستعد لتقديم الاستشارة الفنية وتنفيذ طلبكم وفق أرقى المعايير.'
                    : 'Our certified specialists in Abu Dhabi & Dubai are ready to assist with technical advisory and prompt execution.'}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>{isAr ? 'ضمان رسمي معتمد' : 'Certified Service'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{isAr ? 'معايير جودة سيادية' : 'Sovereign Quality'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3.5">
                <Link
                  href={`/${locale}/contact`}
                  className="group p-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-between"
                >
                  <div className="flex flex-col text-start">
                    <span>{isAr ? 'طلب استشارة أو عرض سعر' : 'Request Advisory & Quote'}</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      {isAr ? 'استجابة سريعة من المتخصصين' : 'Prompt response from our specialists'}
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
                    <span className="text-xs">{isAr ? 'محادثة فورية عبر واتساب' : 'Instant WhatsApp Help'}</span>
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

    </article>
  );
}
