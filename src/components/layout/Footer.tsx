// src/components/layout/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();

const socialLinks = [
    {
      name: isAr ? 'إنستغرام' : 'Instagram',
      url: '#',
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      )
    },
    {
      name: isAr ? 'لينكد إن' : 'LinkedIn',
      url: '#',
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: isAr ? 'فيسبوك' : 'Facebook',
      url: '#',
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      name: isAr ? 'واتساب' : 'WhatsApp',
      url: 'https://wa.me/971544118809',
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.664-1.173A9.956 9.956 0 0 0 12 22z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="relative w-full bg-brand-bg border-t border-brand-deep-teal/20 py-16 md:py-24 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🔮 تأثير الإضاءة السينمائية الفاخرة (Ambient Glow) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-light-gold/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-10 -right-20 w-[400px] h-[400px] bg-brand-deep-teal/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 -left-20 w-[400px] h-[400px] bg-brand-turquoise/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10 flex flex-col items-center text-center">
        
        {/* 🖼️ الشعار المركزي */}
        <div className="relative w-44 h-44 mb-4 transition-all duration-700 md:hover:scale-103 md:hover:drop-shadow-[0_0_35px_rgba(238,220,165,0.12)]">
          <Image
            src="/images/logo.webp"
            alt={isAr ? "جوهرة الدانة - Jawharat AlDanat" : "Jawharat AlDanat Logo"}
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* 🏷️ شريط الأقسام */}
       {isAr ? (
  <p className="text-[11px] md:text-sm font-black tracking-[0.2em] text-brand-platinum uppercase mb-8 opacity-90 font-['Cairo']">
    المرافق <span className="text-brand-deep-gold/40 mx-2">/</span> الفعاليات <span className="text-brand-deep-gold/40 mx-2">/</span> المؤتمرات <span className="text-brand-deep-gold/40 mx-2">/</span> الإدارة
  </p>
) : (
  <p className="text-[10px] md:text-xs font-black tracking-[0.35em] text-brand-platinum uppercase mb-8 opacity-90 font-sans">
    FACILITIES <span className="text-brand-deep-gold/40 mx-1">/</span> EVENTS <span className="text-brand-deep-gold/40 mx-1">/</span> CONFERENCES <span className="text-brand-deep-gold/40 mx-1">/</span> MANAGEMENT
  </p>
)}

        {/* ⚜️ خط الفاصل المنتهي بمعينات مذهبة */}
        <div className="relative w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-deep-gold/40 to-transparent my-4 flex items-center justify-between px-2">
          <div className="w-1.5 h-1.5 rotate-45 bg-brand-deep-gold border border-brand-light-gold/40 shadow-[0_0_10px_rgba(197,168,107,0.6)]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-brand-deep-gold border border-brand-light-gold/40 shadow-[0_0_10px_rgba(197,168,107,0.6)]" />
        </div>

        {/* 📝 العناوين الفاخرة الصافية لغوياً */}
        <div className="space-y-3 my-6 max-w-2xl">
          {isAr ? (
            <h3 className="text-2xl sm:text-3xl font-black text-brand-light-gold tracking-tight leading-relaxed drop-shadow-sm">
              نحن نصنع التميز لأنك تستحق الأفضل
            </h3>
          ) : (
            <h3 className="text-xl sm:text-2xl font-black text-brand-light-gold tracking-tight leading-relaxed drop-shadow-sm font-sans uppercase">
              We craft excellence — because you deserve the best
            </h3>
          )}
        </div>

        {/* 📍 كتلة بيانات الاتصال */}
        <div className="flex flex-col items-center gap-3 text-sm font-bold text-white/90 my-6">
          <div className="text-brand-light-gold/90 tracking-wide text-xs sm:text-sm font-semibold">
            {isAr ? 'أبوظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
          </div>
          
          <Link 
            href="tel:+971544118809" 
            className="font-sans text-lg text-white/80 transition-all duration-300 md:hover:text-brand-turquoise tracking-wide md:hover:translate-y-[-1px]"
            dir="ltr"
          >
            +971 54 411 8809
          </Link>
          
          <Link 
            href="mailto:info@jawaharat-aldana.com" 
            className="font-sans text-xs sm:text-sm text-brand-turquoise/90 border-b border-brand-turquoise/10 pb-0.5 transition-all duration-300 md:hover:text-brand-light-gold md:hover:border-brand-light-gold/40 tracking-wide"
            dir="ltr"
          >
            info@jawaharat-aldana.com
          </Link>
        </div>

        {/* 🌐 أزرار السوشيال ميديا */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 my-8">
          {socialLinks.map((social, idx) => (
            <Link 
              key={idx} 
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-brand-turquoise/20 flex items-center justify-center text-brand-turquoise bg-white/[0.01] backdrop-blur-sm transition-all duration-500 ease-out md:group-hover:border-brand-light-gold md:group-hover:text-brand-light-gold md:group-hover:bg-brand-light-gold/[0.04] md:group-hover:scale-105 md:group-hover:shadow-[0_0_25px_rgba(238,220,165,0.1)]">
                {social.svg}
              </div>
              <span className="text-[10px] font-bold text-brand-platinum font-sans tracking-widest uppercase transition-colors duration-300 md:group-hover:text-white/90">
                {social.name}
              </span>
            </Link>
          ))}
        </div>
{/* 📑 شريط الحقوق والأصالة النهائي النظيف لغوياً وهندسياً */}
<div className="w-full mt-10 pt-8 border-t border-brand-deep-teal/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-brand-platinum/40">
  
  {/* شارة بلد الصنع الفخمة */}
  <span className="px-4 py-1.5 text-[10px] font-black text-brand-deep-gold bg-brand-deep-gold/[0.02] border border-brand-deep-gold/10 rounded-full tracking-wide">
    {isAr ? 'صُنِعَ بشغف في دولة الإمارات العربية المتحدة' : 'Crafted with passion in the United Arab Emirates'}
  </span>
  
  {/* سطر الحقوق الموزون تماماً حسب لغة الواجهة */}
  <p className={isAr ? "font-['Cairo'] tracking-wide text-center sm:text-left" : "font-sans tracking-wide text-center sm:text-right"} dir={isAr ? "rtl" : "ltr"}>
    {isAr ? (
      <>
        &copy; {currentYear} <span className="text-brand-light-gold/60">جوهرة الدانة</span>. جميع الحقوق محفوظة.
      </>
    ) : (
      <>
        &copy; {currentYear} <span className="text-brand-light-gold/60">Jawharat AlDanat</span>. All Rights Reserved.
      </>
    )}
  </p>
</div>

      </div>
    </footer>
  );
}