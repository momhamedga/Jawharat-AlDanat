// src/components/home/EliteEvents.tsx
import React from 'react';
import Image from 'next/image';

export default function EliteEvents({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  const services = [
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      titleAr: 'تصميم المكان',
      titleEn: 'Venue Design',
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      titleAr: 'إدارة الضيافة',
      titleEn: 'Hospitality Management',
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      ),
      titleAr: 'الإضاءة والصوت',
      titleEn: 'Lighting & Audio',
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5c-.75 0-1.43.383-1.83 1.034l-.846 1.141z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
      titleAr: 'التصوير والتوثيق',
      titleEn: 'Photography & Documentation',
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      titleAr: 'قوائم الضيوف',
      titleEn: 'Guest Management',
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-brand-light-gold mx-auto transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleAr: 'ما بعد الفعالية',
      titleEn: 'Post-Event Services',
    }
  ];

  return (
    <section className="relative w-full bg-[#030F1E] py-20 lg:py-28 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌌 دمج سينمائي نيون فخم مأخوذ بالكامل من الـ Timeline */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#0E434D]/30 via-transparent to-[#030F1E] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3A9FA3]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#0E434D]/40 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 📐 شبكة الخلفية الهندسية الخفيفة الموضحة في الصورة Screenshot 2026-06-10 000048_2.png */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 📝 الجانب النصي */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-start relative">
            
            {/* الشعار العلوي المتواجد في زاوية التصميم */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="relative w-20 h-20 opacity-90">
                <Image 
                  src="/images/logo.png" 
                  alt="Jawharat AlDanat Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>

            {/* العناوين الرئيسية */}
            <span className="text-xs font-bold text-brand-light-gold tracking-widest uppercase block mb-2">
              SERVICES — EVENTS & CONFERENCES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
              {isAr ? 'الفعاليات والمؤتمرات' : 'Events & Conferences'}
            </h2>
            <h3 className="text-xl sm:text-2xl font-black text-[#3A9FA3] tracking-wide mb-4">
              {isAr ? 'Events & Conferences Management' : 'Management & Execution'}
            </h3>
            
            <p className="text-sm sm:text-base font-medium text-white/70 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {isAr 
                ? 'نقدم حلاً متكاملاً لتنظيم الفعاليات الراقية والمؤتمرات الدولية من تصميم المكان إلى إدارة كل تفصيل بدقة واحترافية.' 
                : 'Providing integrated premium hosting management for international conferences, corporate venues, and absolute high-tier event workflows.'}
            </p>

            {/* 🧱 شبكة الأيقونات المفتوحة الفاخرة */}
            <div className="grid grid-cols-3 gap-y-10 gap-x-4 border-t border-white/10 pt-10 relative">
              {services.map((ser, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="mb-3 transform transition-all duration-300 lg:group-hover:scale-110 lg:group-hover:drop-shadow-[0_0_8px_rgba(197,168,107,0.5)]">
                    {ser.icon}
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white group-hover:text-brand-light-gold transition-colors duration-300">
                    {isAr ? ser.titleAr : ser.titleEn}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-white/40 font-mono mt-0.5 block opacity-80 group-hover:text-[#3A9FA3] transition-colors">
                    {isAr ? ser.titleEn : ser.titleAr}
                  </span>
                </div>
              ))}

              <div className="absolute bottom-[-20px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-light-gold/30 to-transparent hidden sm:block" />
              <div className="absolute bottom-[-23px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 border border-brand-light-gold/40 hidden sm:block" />
            </div>

          </div>

          {/* 🖼️ الجانب البصري */}
          <div className="lg:col-span-6 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] group">
            
            <Image
              src="/images/Events-Conferences-Services.webp"
              alt={isAr ? 'قاعة مؤتمرات فاخرة وتنظيم فعاليات' : 'Luxury Events and Conferences Venue'}
              fill
              sizes="(max-w-1024px) 100vw, 50vw"
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out lg:group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#030F1E]/40 via-transparent to-transparent pointer-events-none" />

            {/* 🏷️ كارت الـ Badge العائم */}
            <div className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} bg-[#030F1E]/80 backdrop-blur-md border border-white/10 rounded-2xl py-4 px-6 flex flex-col items-center justify-center text-center shadow-2xl min-w-[130px] transition-transform duration-500 lg:group-hover:scale-105`}>
              <span className="text-2xl sm:text-3xl font-black text-brand-light-gold tracking-widest">+100</span>
              <span className="text-[10px] font-bold text-white/90 mt-1 whitespace-nowrap">
                {isAr ? 'فعالية منظمة بنجاح' : 'Successful Events'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}