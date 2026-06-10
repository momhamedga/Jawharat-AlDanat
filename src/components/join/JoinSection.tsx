// src/components/join/JoinSection.tsx
'use client';

import Image from 'next/image';
import { Briefcase, Sparkles, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { jobRoles, features } from './joinData';

interface JoinSectionProps {
  locale: string;
}

export default function JoinSection({ locale }: JoinSectionProps) {
  const isAr = locale === 'ar';

  return (
    <section className="relative w-full py-40 md:py-52 bg-slate-50 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🔮 الخلفية الهندسية المنقطة مع هالات الإضاءة الفاتحة */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-light-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-turquoise/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 🖼️ القسم الأيسر: عرض الصورة التفاعلية الحية */}
          <div className="col-span-1 lg:col-span-6 order-2 lg:order-1 relative w-full flex justify-center">
            <div className="relative w-full max-w-xl aspect-[14/12] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/80 p-2 bg-white/40 backdrop-blur-sm">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/join.webp"
                  alt="Jawharat AlDanat Team"
                  fill
                  sizes="(max-w-7xl) 100vw"
                  className="object-cover object-center transition-transform duration-700 md:hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent mix-blend-multiply" />
              </div>

              {/* شارة التميز الجغرافي المستقرة للموبايل */}
              <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-100 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-light-gold/15 flex items-center justify-center text-brand-deep-gold shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">
                    {isAr ? 'انضم لروّاد التميز' : 'Join the Pioneers of Excellence'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400">
                    {isAr ? 'أبوظبي • الإمارات العربية المتحدة' : 'Abu Dhabi • United Arab Emirates'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 🏛️ القسم الأيمن: تفاصيل النصوص وشبكة الوظائف والمزايا */}
          <div className="col-span-1 lg:col-span-6 order-1 lg:order-2 space-y-10 flex flex-col justify-center">
            
      <div className="space-y-4 text-center lg:text-start flex flex-col items-center lg:items-start relative z-10">
  
  {/* 🏷️ الـ Badge الكريمي الموحد بدون أيقونات لتطابق الهوية البصرية */}
  <div className="flex items-center justify-center bg-brand-light-gold/15 text-brand-deep-gold px-5 py-1.5 rounded-full">
    <span className="text-[10px] md:text-xs font-bold tracking-wide">
      {isAr ? 'بيئة العمل والفرص الوظيفية' : 'Work Environment & Careers'}
    </span>
  </div>
  
  {/* 🏛️ العنوان الموحد بالوزن العريض الصارم واللون الداكن */}
  <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight pt-1">
    {isAr ? 'انضم لفريقنا' : 'Join Our Team'}
  </h1>
  
  {/* 🔶 الفاصل الهندسي الفاخر (Diamond Divider) المتجاوب مع الاتجاهات (lg:justify-start) */}
  <div className="flex items-center justify-center lg:justify-start gap-4 w-full max-w-xs mt-4">
    {/* خط التلاشي الأيسر - يختفي في الشاشات الكبيرة لو الإتجاه إنجليزي أو يتعدل تلقائياً */}
    <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-brand-deep-gold/40 lg:hidden" />
    
    {/* الماسة الذهبية الموحدة */}
    <div className="w-2.5 h-2.5 bg-brand-deep-gold rotate-45 transform flex-shrink-0 rounded-[1px]" />
    
    {/* خط الامتداد الأيمن للعنوان الجانبي */}
    <div className="h-[1px] w-full bg-gradient-to-r from-brand-deep-gold/40 to-transparent" />
  </div>

</div>

            {/* شبكة كروت الوظائف الثنائية المتجاورة لملائمة شاشات اللمس والموبايل بكفاءة */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 w-full">
              {jobRoles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <div
                    key={role.id}
                    className="group relative rounded-2xl p-5 md:p-6 bg-white border border-slate-200/70 shadow-[0_4px_15px_rgba(0,0,0,0.01)] transition-all duration-500 flex flex-col items-center justify-center min-h-[140px] text-center overflow-hidden
                               md:hover:scale-[1.03] md:hover:border-brand-light-gold/50 md:hover:shadow-[0_20px_40px_rgba(197,168,107,0.06)]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-light-gold/10 border border-brand-light-gold/20 flex items-center justify-center shadow-inner mb-3 transition-all duration-500
                                    md:group-hover:bg-brand-light-gold/20 md:group-hover:scale-105">
                      <IconComponent className="w-6 h-6 text-brand-deep-gold" strokeWidth={1.2} />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base font-black text-slate-800 transition-colors duration-300 md:group-hover:text-brand-deep-gold">
                        {isAr ? role.titleAr : role.titleEn}
                      </h3>
                      <p className="text-[10px] md:text-xs font-bold text-slate-400">
                        {isAr ? 'دوام كامل' : 'Full-Time'}
                      </p>
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-slate-50 to-transparent rounded-tl-full pointer-events-none" />
                  </div>
                );
              })}
            </div>

            {/* قائمة عرض المزايا الحقيقية من الصورة الفاتحة */}
            <ul className="space-y-3.5 max-w-md mx-auto lg:mx-0 w-full">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.005)]">
                  <div className="w-5 h-5 rounded-md bg-brand-turquoise/10 flex items-center justify-center text-brand-turquoise mt-0.5 shrink-0 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
                    {isAr ? feat.ar : feat.en}
                  </p>
                </li>
              ))}
            </ul>

            {/* زر الأكشن الإمبراطوري المتجاوب اللامع */}
            <div className="w-full max-w-md mx-auto lg:mx-0 pt-2">
              <button className="group relative w-full h-14 rounded-xl overflow-hidden bg-gradient-to-r from-brand-deep-gold via-brand-light-gold to-brand-deep-gold p-[1px] shadow-[0_10px_30px_rgba(197,168,107,0.2)] transition-transform duration-300 active:scale-98">
                <div className="w-full h-full bg-white/90 backdrop-blur-md rounded-[11px] flex items-center justify-center gap-3 transition-colors duration-500 md:group-hover:bg-transparent">
                  <span className="text-sm md:text-base font-black text-brand-deep-gold tracking-wide transition-colors duration-500 md:group-hover:text-white">
                    {isAr ? 'قدم طلبك الآن — ابدأ رحلتك' : 'Apply Now — Start Your Journey'}
                  </span>
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4 text-brand-deep-gold transition-transform duration-300 md:group-hover:-translate-x-1 md:group-hover:text-white" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-brand-deep-gold transition-transform duration-300 md:group-hover:translate-x-1 md:group-hover:text-white" />
                  )}
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}