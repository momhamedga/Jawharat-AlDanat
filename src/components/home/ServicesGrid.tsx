// src/components/home/ServicesGrid.tsx
import React from 'react';
import Link from 'next/link';

export default function ServicesGrid({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  const services = [
    {
      // تم ربطه بـ التلميع والسيراميك
      id: 'polishing-ceramic', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.944-8.944m-8.944 3.848l1.509-4.529H4.5m10.5 0l1.51 4.528m-1.51-4.528l-2.25-6.75h-3l-2.25 6.75m10.5 0h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleAr: 'التلميع الاحترافي وطبقات السيراميك',
      titleEn: 'Polishing & Ceramic Coating',
    },
    {
      // متطابق مع مجلد paint-protection-ppf
      id: 'paint-protection-ppf', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z" />
        </svg>
      ),
      titleAr: 'أفلام حماية الطلاء PPF',
      titleEn: 'Paint Protection Film',
    },
    {
      // متطابق مع مجلد events-conferences
      id: 'events-conferences', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
      titleAr: 'إدارة الفعاليات والمؤتمرات',
      titleEn: 'Events & Conferences',
    },
    {
      // متطابق مع مجلد vip-event-management
      id: 'vip-event-management', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.435.744-.435.916 0l2.131 5.377 5.816.417c.473.034.662.612.31.916l-4.433 3.863 1.354 5.672c.11.463-.39.825-.797.562l-4.91-3.176-4.911 3.176c-.407.263-.907-.099-.797-.562l1.354-5.672-4.433-3.863c-.352-.304-.162-.882.31-.916l5.816-.417 2.13-5.377z" />
        </svg>
      ),
      titleAr: 'تنظيم مناسبات كبار الشخصيات VIP',
      titleEn: 'VIP Event Management',
    },
    {
      // متطابق مع مجلد deep-cleaning-detailing
      id: 'deep-cleaning-detailing', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 18.75V21m-6.75-4.25l1.06-1.06m11.38 0l1.06 1.06m-11.38-11.38l1.06 1.06m11.38 0l1.06-1.06M21 12h-1.5M5.25 12H3m14.25 4.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      ),
      titleAr: 'التنظيف العميق بالبخار والـ Detailing',
      titleEn: 'Deep Cleaning & Detailing',
    },
    {
      // متطابق مع مجلد heat-insulation-film
      id: 'heat-insulation-film', 
      icon: (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m14.25 4.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      ),
      titleAr: 'أفلام العزل الحراري والتظليل النانو',
      titleEn: 'Heat Insulation Film',
    }
  ];

  return (
    <section className="relative w-full bg-slate-50 py-16 lg:py-24 overflow-hidden font-['Cairo'] select-none">
      
      {/* هالة نيون خلفية لدعم الألوان وتجسيد العمق البصري الفخم */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-turquoise/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-light-gold/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        
        {/* 👑 هيدر القسم */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-brand-deep-teal/10 pb-6 mb-12 gap-4">
          <div className="text-center md:text-start w-full md:w-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-bg tracking-tight">
              {isAr ? 'شبكة الخدمات الحصرية' : 'Services Grid'}
            </h2>
            <p className="text-xs md:text-sm font-bold text-brand-turquoise mt-2 tracking-wide uppercase">
              {isAr ? 'خدماتنا الأساسية — مصممة لتجربة مستخدم استثنائية' : 'Services Grid — Main Page'}
            </p>
          </div>
          
          {/* خط التزيين الملوكي المنتهي بنجمة كريستالية ذهبية */}
          <div className="hidden md:flex items-center gap-3 flex-grow max-w-xs mx-8">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-deep-gold to-brand-light-gold flex-grow" />
            <span className="text-brand-deep-gold text-lg">✦</span>
          </div>
        </div>

        {/* 🧱 شبكة الكروت الهندسية المضيئة والمحاذية تماماً (Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.id}`}
              className="relative flex flex-col items-center justify-center rounded-[2rem] border border-brand-deep-teal/10 bg-white/75 backdrop-blur-md p-6 md:p-10 text-center shadow-[0_10px_35px_rgba(14,67,77,0.02)] transition-all duration-500 active:scale-[0.98] lg:hover:scale-[1.03] lg:hover:bg-white lg:hover:border-brand-deep-gold lg:hover:shadow-[0_20px_50px_rgba(197,168,107,0.15)] group"
            >
              {/* تأثير خط نيون خفي يضيء فقط على الـ Desktop عند الـ Hover */}
              <div className="absolute inset-0 rounded-[2rem] border border-transparent lg:group-hover:border-brand-light-gold/40 transition-all duration-500 pointer-events-none" />

              {/* الأيقونة الملوكية مع خلفية خفيفة ناعمة مستقرة على الموبايل وتتفاعل على الديسكتوب */}
              <div className="mb-4 md:mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 lg:group-hover:bg-brand-deep-gold/5 lg:group-hover:border-brand-deep-gold/20 transition-all duration-500 transform lg:group-hover:scale-110">
                {service.icon}
              </div>

              {/* العنوان العربي الفخم بخط كابرو ووزن عريض جداً */}
              <h3 className="text-base sm:text-lg md:text-xl font-black text-brand-bg transition-colors duration-300 lg:group-hover:text-brand-deep-teal">
                {isAr ? service.titleAr : service.titleEn}
              </h3>

              {/* العنوان الإنجليزي الفرعي المتناسق */}
              <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-bold text-brand-turquoise tracking-wide">
                {isAr ? service.titleEn : service.titleAr}
              </p>

              {/* ✨ المعين الزخرفي ظاهر دائمًا على الجوال بحجم ناعم، ويتحرك بمرونة رشيقة على الشاشات الكبيرة */}
              <div className="mt-5 flex items-center justify-center gap-1 transition-all duration-500 transform lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 bg-brand-deep-gold" />
                <span className="w-6 md:w-8 h-[1px] bg-brand-deep-gold/40" />
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 bg-brand-deep-gold" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}