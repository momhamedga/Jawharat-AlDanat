import { siteConfig } from '@/config/site';

interface ContactHeaderProps {
  locale: string;
}

export default function ContactHeader({ locale }: ContactHeaderProps) {
  const isAr = locale === 'ar';

  return (
    <header className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
      {/* 🏷️ Subtle Kicker / Category Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/80 border border-border/80 text-xs font-semibold text-primary tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>{isAr ? 'مكتب الاستشارات والخدمات الخاصة' : 'Private Consultation Desk'}</span>
      </div>

      {/* 🏛️ Editorial Heading */}
      <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.2]">
        {isAr ? `تواصل مع ${siteConfig.name.ar}` : `Connect with ${siteConfig.name.en}`}
      </h1>

      {/* 📜 Refined Narrative Description */}
      <p className="text-sm sm:text-base text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
        {isAr
          ? 'نضع خبرتنا المؤسسية في خدمتكم لتقديم استشارات مخصصة في العناية بالسيارات الفارهة وإدارة الفعاليات والمؤتمرات الكبرى بأعلى معايير الدقة والسرية.'
          : 'Our enterprise team is at your service for bespoke consultations in luxury automotive preservation and premier event management in Abu Dhabi and Dubai.'}
      </p>

      {/* 🔶 Restrained Brand Signature Divider */}
      <div className="flex items-center justify-center gap-3 w-full max-w-[200px] mx-auto pt-2" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-l from-transparent to-primary/30" />
        <div className="w-2 h-2 bg-primary/70 rotate-45 transform flex-shrink-0" />
        <div className="h-px w-full bg-gradient-to-r from-transparent to-primary/30" />
      </div>
    </header>
  );
}