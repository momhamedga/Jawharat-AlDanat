// src/app/[locale]/_components/AboutSection.tsx
import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  locale?: string;
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const isAr = locale === 'ar';

  const features = [
    {
      title: isAr ? 'تنظيم ملكي' : 'Royal Organization',
      desc: isAr 
        ? 'إدارة متكاملة للفعاليات والمؤتمرات الرسمية بأعلى معايير الدقة والرفاهية.' 
        : 'Integrated management of official events with the highest standards of precision.'
    },
    {
      title: isAr ? 'اهتمام بالتفاصيل' : 'Attention to Details',
      desc: isAr 
        ? 'خدمات احترافية فائقة الجودة تضمن خروج مناسبتك بصورة إمبراطورية مشرفة.' 
        : 'Ultra-high quality professional services ensuring an honorable imperial outcome.'
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-slate-50 overflow-hidden select-none">
      
      {/* 🌌 تأثير الإضاءة المحيطية مع المصفوفة المنقطة (Dot Grid Matrix) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-light-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-turquoise/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* 🖼️ الكتلة البصرية */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 rounded-3xl p-3 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-700 hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-brand-deep-teal/5 to-brand-light-gold/10 flex items-center justify-center p-6">
                <Image
                  src="/images/logo.webp"
                  alt="جوهرة الدانة"
                  width={220}
                  height={220}
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.03)]"
                  priority
                />
              </div>
            </div>
            
            <div className="absolute -bottom-4 right-4 sm:right-12 bg-white border border-slate-200/60 px-5 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-turquoise animate-pulse" />
              <p className="text-xs font-bold text-slate-800 tracking-wide">
                {isAr ? 'تأسست لتبهر عالمك' : 'Founded to Inspire'}
              </p>
            </div>
          </div>

          {/* 📝 الكتلة النصية */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start flex flex-col items-center lg:items-start">
            <div className="space-y-3 flex flex-col items-center lg:items-start">
              <div className="flex items-center justify-center bg-brand-light-gold/15 text-brand-deep-gold px-5 py-1.5 rounded-full">
                <span className="text-[10px] md:text-xs font-bold tracking-wide uppercase">
                  {isAr ? 'حكاية الأصالة والتميز' : 'The Story of Authenticity & Excellence'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight pt-1">
                {isAr ? (
                  <>مؤسسة <span className="text-brand-deep-gold">جوهرة الدانة</span> لإدارة الفعاليات</>
                ) : (
                  <>Jawharat AlDanat <span className="text-brand-deep-gold">Event Management</span></>
                )}
              </h2>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-500 leading-relaxed max-w-2xl">
              {isAr 
                ? 'نحن في جوهرة الدانة لا ننظم مجرد فعاليات، بل نصنع تجارب استثنائية محفورة في الذاكرة. ننطلق من قلب أبوظبي برؤية ملكية وفلسفة معاصرة تدمج فخامة التنظيم بأحدث الحلول التقنية والهندسية لإدارة المؤتمرات والمنشآت والمناسبات الكبرى بكفاءة مطلقة تليق بامتياز عملائنا.'
                : 'At Jawharat AlDanat, we do not just organize events; we craft exceptional, lingering experiences. Based in Abu Dhabi, we combine luxurious execution with cutting-edge technical solutions.'}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 w-full max-w-xs mt-2">
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-brand-deep-gold/40 lg:hidden" />
              <div className="w-2.5 h-2.5 bg-brand-deep-gold rotate-45 transform flex-shrink-0 rounded-[1px]" />
              <div className="h-[1px] w-full bg-gradient-to-r from-brand-deep-gold/40 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 text-right" dir={isAr ? 'rtl' : 'ltr'}>
              {features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-brand-light-gold/40 hover:shadow-[0_20px_45px_rgba(197,160,89,0.04)] flex flex-col items-start"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-deep-gold mb-3" />
                  <h4 className="text-sm font-black text-slate-900 mb-1">{feat.title}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}