// src/components/home/EventsConferences.tsx
import React from 'react';
import Image from 'next/image';

export default function EventsConferences({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold transition-colors duration-300 group-hover:text-brand-turquoise" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      titleAr: 'تصميم المكان',
      titleEn: 'Venue Design',
      descAr: 'تهيئة الفضاء وتصميم الديكور المكي المخصص',
      descEn: 'Bespoke space optimization and tailored luxury decor.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold transition-colors duration-300 group-hover:text-brand-turquoise" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      titleAr: 'إدارة الضيافة',
      titleEn: 'Hospitality Management',
      descAr: 'خدمة ضيوف احترافية تعكس معايير الفخامة الإماراتية',
      descEn: 'Elite guest hosting reflecting premium Emirati hospitality.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold transition-colors duration-300 group-hover:text-brand-turquoise" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
      titleAr: 'الإضاءة والصوت',
      titleEn: 'Sound & Lighting',
      descAr: 'أحدث تقنيات الصوت والإضاءة لتجربة حسية متكاملة',
      descEn: 'State-of-the-art audiovisual solutions for immersive events.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold transition-colors duration-300 group-hover:text-brand-turquoise" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5c-.75 0-1.43.383-1.83 1.034l-.846 1.141z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
      titleAr: 'التصوير الاحترافي',
      titleEn: 'Professional Photography',
      descAr: 'توثيق بصري راقٍ يخلد أجمل لحظات فعالياتك',
      descEn: 'High-end visual production preserving your key moments.',
    }
  ];

  return (
    <div className="w-full relative z-10 select-none py-16 md:py-24 bg-white font-['Cairo']" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* 📝 الجانب النصي الهيكلي */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-start order-2 lg:order-1">
          
          {/* العناوين والخطوط الفاصلة */}
          <div className="relative mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-bg tracking-tight leading-tight">
              {isAr ? 'خدمات الفعاليات والمؤتمرات' : 'Events & Conferences Services'}
            </h2>
            
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-3 w-full">
              
              <div className="h-[1.5px] bg-gradient-to-r from-slate-200 via-slate-100 to-transparent flex-grow hidden sm:block" />
              <span className="text-brand-deep-gold text-sm hidden sm:inline">✦</span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-medium text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {isAr ? 'نُحول كل مناسبة إلى تجربة لا تُنسى — من الفكرة إلى التنفيذ وبأعلى معايير الجودة.' : 'Transforming every occasion into an unforgettable experience — from concept to execution.'}
          </p>

          {/* 🧱 شبكة الكروت الهندسية المتجاوبة تماماً */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {features.map((feat, index) => (
              <div
                key={index}
                className="relative rounded-[1.75rem] border border-slate-100 bg-white p-5 md:p-6 text-start flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.012)] transition-all duration-500 will-change-transform active:scale-[0.99] lg:hover:-translate-y-1.5 lg:hover:shadow-[0_20px_40px_rgba(197,168,107,0.08)] lg:hover:border-brand-deep-gold/40 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 lg:group-hover:bg-brand-deep-gold/5 lg:group-hover:border-brand-deep-gold/20">
                    {feat.icon}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-deep-gold/40 transition-transform duration-500 lg:group-hover:scale-125" />
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-black text-brand-bg tracking-wide transition-colors duration-300 lg:group-hover:text-brand-deep-gold">
                    {isAr ? feat.titleAr : feat.titleEn}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">
                    {isAr ? feat.descAr : feat.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🎯 زر الـ CTA الأنيق والمتناسق */}
          <button className="mt-8 w-full py-4 px-8 rounded-xl bg-brand-bg text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-brand-bg/10 transition-all duration-300 active:scale-[0.98] lg:hover:bg-brand-turquoise lg:hover:shadow-brand-turquoise/20 text-center">
            {isAr ? 'احجز استشاراتك المجانية اليوم' : 'Book Your Free Consultation Today'}
          </button>

        </div>

        {/* 🖼️ الجانب البصري الفاخر (الصورة الكريستالية بأبعاد أكبر متناسقة مع التكبير) */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] group">
          
          <Image
            src="/images/Events-Conferences-Services.webp"
            alt={isAr ? 'خدمات الفعاليات والمؤتمرات الفاخرة' : 'Luxury Events and Conferences Services'}
            fill
            sizes="(max-w-1024px) 100vw, 45vw"
            priority
            className="object-cover object-center transition-transform duration-1000 ease-out lg:group-hover:scale-105"
          />

          {/* تأثير حماية بصري وتدرج خفيف */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none transition-opacity duration-500 lg:group-hover:opacity-80" />

        </div>

      </div>
    </div>
  );
}