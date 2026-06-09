// src/components/home/EventShowcase.tsx
import React from 'react';
import Image from 'next/image';

export default function EventShowcase({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  return (
    <section className="relative w-full bg-[#030F1E] py-20 lg:py-28 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌌 دمج الألوان النيون والسينمائية الموحدة الفخمة في الخلفية */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-transparent via-[#0E434D]/20 to-[#030F1E] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#3A9FA3]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#0E434D]/30 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 📐 شبكة الخطوط الهندسية الـ Abstract الخفيفة جداً من لقطة الشاشة */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        
        {/* 📑 الهيدر العلوي للقسم */}
        <div className="w-full flex flex-col items-center lg:items-start mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-16 h-16 opacity-80">
              <Image src="/images/logo.webp" alt="Logo" fill className="object-contain" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#C5A86B] tracking-wide mb-1">
            {isAr ? 'الفعاليات :المشاريع والمنتديات' : 'Events: Projects & Speakers'}
          </h2>
          <span className="text-sm font-bold text-[#3A9FA3] tracking-widest uppercase block">
            {isAr ? 'Events: Projects & Speakers' : 'Jawharat AlDanat Elite Projects'}
          </span>
        </div>

        {/* 🧱 جافا سكريبت جGrid التوزيع الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 📸 الجانب الأيسر: ثلاثي الصور الاحترافي المتطابق بالملي مع Screenshot 2026-06-10 000627.png */}
          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            
            {/* 1. الصورة الرئيسية الكبيرة (العلويّة) */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#C5A86B]/30 shadow-2xl group">
              <Image
                src="/images/Speakers-1.webp"
                alt="Main Event Stage"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out lg:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030F1E]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 2. الصورتين الصغيرتين المتجاورتين (السفليّتين) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#C5A86B]/30 shadow-xl group">
                <Image
                  src="/images/Speakers-2.webp"
                  alt="Event Interior Organization"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out lg:group-hover:scale-105"
                />
              </div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#C5A86B]/30 shadow-xl group">
                <Image
                  src="/images/Speakers-3.webp"
                  alt="Outdoor Luxury Venue"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out lg:group-hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* 💬 الجانب الأيمن: المحتوى النصي، الاقتباس الفاخر، وشريط الإحصائيات السفلي */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-start relative">
            
            {/* علامة الاقتباس الفاخرة المطلقة من التصميم */}
            <div className="text-5xl sm:text-7xl font-serif text-[#C5A86B]/30 leading-none h-6 select-none flex justify-center lg:justify-start mb-4">
              “
            </div>

            {/* نص الاقتباس الحقيقي */}
            <blockquote className="text-lg sm:text-2xl font-bold text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
              {isAr 
                ? 'نثق بجهودنا الدائمة في كل فعالياتنا الرسمية احترافية لا تُضاهى وتفاصيل تُحكمها الفخامة — الحقيقية'
                : 'Unmatched professionalism and meticulous execution where every detail is governed by pure, authentic luxury across all our official events.'}
            </blockquote>

            {/* اسم صاحب الاقتباس ومنصبه */}
            <div className="flex flex-col mb-4">
              <span className="text-lg sm:text-xl font-black text-[#C5A86B]">
                {isAr ? 'د. حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#3A9FA3] mt-1">
                {isAr ? 'رئيس مجلس الإدارة' : 'Chairperson of the Board'}
              </span>
            </div>

            {/* تقييم النجوم الذهبي الخمسة */}
            <div className="flex justify-center lg:justify-start gap-1 text-[#C5A86B] mb-10">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* الخط الفاصل الديكوري الهندسي المميز بمنتصفه المعين من لقطة الشاشة */}
            <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A86B]/30 to-transparent mb-8 hidden lg:block" />

            {/* 📊 شريط الإحصائيات الأفقي النظيف والسريع المتواجد بأسفل السكشن */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 border-t border-white/5 pt-6 lg:border-t-0 lg:pt-0">
              
              {/* التقييم */}
              <div className="flex items-center gap-2 group">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-[#C5A86B] transition-colors">
                  {isAr ? 'تقييم 5 نجوم' : '5-Star Rated'}
                </span>
                <span className="text-base">⭐</span>
              </div>

              {/* الشركاء */}
              <div className="flex items-center gap-2 group">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-[#C5A86B] transition-colors">
                  {isAr ? 'شركاء حكوميون' : 'Government Partners'}
                </span>
                <span className="text-base">🤝</span>
              </div>

              {/* الفعاليات */}
              <div className="flex items-center gap-2 group">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-[#C5A86B] transition-colors">
                  {isAr ? '+10 فعالية منظمة' : '+10 Organized Events'}
                </span>
                <span className="text-base">🏅</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}