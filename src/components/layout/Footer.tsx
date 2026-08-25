import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = 'ar' }: FooterProps) {
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();
  const primaryPhone = siteConfig.contact.phones[0];

  return (
    <footer
      className="relative w-full bg-card border-t border-border/80 text-foreground pt-16 sm:pt-20 pb-12 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label="Site Footer"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-8">
        
        {/* 👑 Large Centered Brand Identity */}
        <Link
          href={`/${locale}`}
          className="flex flex-col items-center gap-3 group select-none"
          aria-label={isAr ? 'جوهرة الدانة' : 'Jawharat Al Danat'}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.webp"
              alt={isAr ? 'شعار جوهرة الدانة' : 'Jawharat Al Danat Emblem'}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
              {isAr ? 'جوهرة الدانة' : 'Jawharat Al Danat'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-primary tracking-wide">
              {isAr ? 'للفخامة والعناية الفائقة' : 'Excellence & Luxury Care'}
            </span>
          </div>
        </Link>

        {/* 📜 Short Verified Positioning Statement */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
          {isAr
            ? 'مؤسسة إماراتية رائدة تأسست في العاصمة أبوظبي عام 2014، تجمع بين الدقة الحرفية المتناهية في حماية وتجهيز السيارات الفارهة، والاحترافية والبروتوكول السيادي في تنظيم المؤتمرات والفعاليات الكبرى.'
            : 'A premier UAE enterprise established in Abu Dhabi in 2014, delivering unparalleled craftsmanship in luxury automotive protection and royal protocol for high-level summits.'}
        </p>

        {/* 📍 Verified Location */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80 font-medium">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span>
            {isAr
              ? siteConfig.contact.locations.abuDhabi.ar
              : siteConfig.contact.locations.abuDhabi.en}
          </span>
        </div>

        {/* 📞 Direct Contact Channels (Balanced & Elegant) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm">
          
          {/* Phone */}
          <a
            href={`tel:${primaryPhone.raw}`}
            className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
            dir="ltr"
          >
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span className="font-semibold">{primaryPhone.display}</span>
          </a>

          <span className="hidden sm:inline text-border">|</span>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
            dir="ltr"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>{siteConfig.contact.email}</span>
          </a>

          <span className="hidden sm:inline text-border">|</span>

          {/* WhatsApp */}
          <a
            href={siteConfig.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{isAr ? 'واتساب الإدارة' : 'WhatsApp'}</span>
          </a>

        </div>

        {/* 📑 Minimal Bottom Copyright */}
        <div className="w-full pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear}{' '}
            <span className="text-foreground font-semibold">
              {isAr ? siteConfig.name.ar : siteConfig.name.en}
            </span>
            . {isAr ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
          </p>

          <p className="text-[11px] text-muted-foreground/80">
            {isAr
              ? 'صُنِعَ بأعلى معايير الحرفية والتميز في دولة الإمارات العربية المتحدة'
              : 'Crafted with premium excellence in the United Arab Emirates'}
          </p>
        </div>

      </div>
    </footer>
  );
}
