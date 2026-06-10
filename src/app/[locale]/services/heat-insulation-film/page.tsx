// src/app/[locale]/services/heat-insulation-film/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HeatInsulationFilmPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // الـ 4 Grid Cards المستوحاة من سكرين شوت 212433 والمخصصة للعزل الحراري بدقة
  const isolationStats = [
    {
      titleAr: 'تقليل الحرارة بنسبة 70%',
      titleEn: '70% Heat Reduction',
      descAr: 'تخفيض هائل لدرجات الحرارة داخل المقصورة',
      descEn: 'Massive reduction of ambient cabin temperatures',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5m0 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM9.75 15h4.5M9.75 12h4.5M9.75 9h4.5M9.75 6h4.5" />
        </svg>
      )
    },
    {
      titleAr: 'حجب 99% من أشعة UV',
      titleEn: '99% UV Ray Block',
      descAr: 'حماية كاملة من الأشعة الفوق بنفسجية الضارة',
      descEn: 'Full shield against damaging ultraviolet radiation',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    },
    {
      titleAr: 'حماية الجلد والمقصورة',
      titleEn: 'Interior & Leather Protection',
      descAr: 'يمنع تشقق الطبلون وتغير ألوان الفرش الداخلي',
      descEn: 'Prevents dashboard cracking and interior upholstery fading',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      titleAr: 'توفير استهلاك الوقود',
      titleEn: 'Fuel Consumption Savings',
      descAr: 'يقلل من جهد التكييف وبالتالي يقلل استهلاك البنزين',
      descEn: 'Eases AC workload to noticeably optimize fuel efficiency',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.375 3.75c0 .414-.336.75-.75.75h-.008a.75.75 0 01-.75-.75V3c0-.414.336-.75.75-.75h.008c.414 0 .75.336.75.75v.75zm1.902 2.348a.75.75 0 001.06 0l.006-.006a.75.75 0 10-1.06-1.06l-.006.006a.75.75 0 000 1.06zm-11.234 0a.75.75 0 000-1.06l-.006-.006a.75.75 0 10-1.06 1.06l.006.006a.75.75 0 001.06 0zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 11.25a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" />
        </svg>
      )
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] font-['Cairo'] select-none text-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 👑 هيدر واسع وممتد لمنع تداخل العناصر وإبراز هوية البراند */}
      <section className="relative w-full py-24 md:py-36 bg-brand-bg text-white overflow-hidden border-b border-brand-deep-gold/20 text-center flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-brand-deep-gold)_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10 space-y-4 max-w-4xl">
          <Link 
            href={`/${locale}/services`} 
            className="inline-flex items-center gap-2 text-xs font-black text-brand-light-gold bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 mb-2 active:scale-95"
          >
            {isAr ? '← العودة لكافة الخدمات' : '← Back to Services'}
          </Link>
          
          <span className="block text-[11px] font-black tracking-[0.2em] text-brand-deep-gold uppercase">
            PREMIUM WINDOW TINTING & INSULATION
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? 'خدمة أفلام العزل الحراري النانو سيراميك' : 'Nano Ceramic Heat Insulation Film'}
          </h1>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-deep-gold" />
            <span className="text-brand-deep-gold text-xs">◆</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-deep-gold" />
          </div>
        </div>
      </section>

      {/* 📊 الجزء الرئيسي ثنائي الأبعاد المتجاوب والمستوحى تماماً من لقطة الشاشة 212433 */}
      <section className="w-full py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(3,15,30,0.02)] overflow-hidden items-center">
          
          {/* الجانب الأيسر: الصورة الممتدة الفاخرة لتركيب التظليل والعزل */}
          <div className="col-span-1 lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[620px] bg-slate-100 overflow-hidden lg:border-l lg:border-slate-100">
            <Image
              src="/images/Ceramic-2.webp" 
              alt="Premium Thermal Insulation Film Application"
              fill
              sizes="(max-w-lg) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-103"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/10 via-transparent to-transparent" />
          </div>

          {/* الجانب الأيمن: تفاصيل العزل والـ 60% دائرة الإحصائيات مع الـ 4 Grid Cards الصغيرين */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-10 flex flex-col justify-center">
            
            {/* قسم العنوان والـ Badge الدائري الإحصائي المأخوذ من التصميم */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2 text-center md:text-right">
              <div className="space-y-2 flex-grow">
                <span className="text-[11px] font-black text-brand-deep-gold bg-brand-deep-gold/10 px-3 py-1 rounded-md uppercase tracking-wider">
                  {isAr ? 'THERMAL FILM | العزل الحراري' : 'THERMAL FILM | HEAT SHIELD'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-bg tracking-tight">
                  {isAr ? 'أفلام العزل الحراري المتطورة' : 'Advanced Thermal Control Shield'}
                </h2>
                <p className="text-xs font-bold text-slate-400">
                  {isAr ? 'مثالي لمناخ الإمارات الحار – أفلام متعددة التدرجات: شفاف إلى داكن' : 'Perfect for extreme weather – Multi-shaded tints: clear to dark'}
                </p>
              </div>

              {/* 🎯 الدائرة الذهبية الكبيرة للإحصائيات المحاكية تماماً للتصميم الأصلي بالنسخة اللايت */}
              <div className="flex-shrink-0 w-32 h-32 rounded-full border-2 border-brand-deep-gold/60 bg-slate-50 flex flex-col items-center justify-center p-2 shadow-sm transition-transform duration-300 hover:scale-105">
                <span className="text-3xl font-black text-brand-bg tracking-tighter">60%</span>
                <span className="text-[10px] font-black text-slate-500 mt-0.5 text-center px-1">
                  {isAr ? 'تقليل في درجة الحرارة' : 'Overall Temperature Drop'}
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 🎴 جريد الكروت الأربعة الصغيرين بنظام التجاوب الكامل لمنع تداخل النصوص */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isolationStats.map((card, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-start gap-4 transition-all duration-300 hover:bg-white hover:border-brand-deep-gold/40 hover:shadow-sm"
                >
                  {/* حاوية الأيقونة الصغير الفخمة */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                    {card.icon}
                  </div>
                  
                  <div className="space-y-1 text-right flex-grow">
                    <h4 className="text-xs sm:text-sm font-black text-brand-bg">
                      {isAr ? card.titleAr : card.titleEn}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      {isAr ? card.descAr : card.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار الحجز والتوجيه الكبيرة أسفل الجانب */}
            <div className="w-full pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-white bg-brand-bg hover:bg-brand-deep-gold px-6 py-4 rounded-2xl transition-all duration-300 shadow-sm active:scale-95"
              >
                <span>{isAr ? 'احجز موعد تركيب العزل الحراري الآن' : 'Book Insulation Service Now'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 🔗 توجيه تبادلي سفلي سلس للعودة لحماية الطلاء والـ PPF */}
      <section className="w-full py-8 md:py-12 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href={`/${locale}/services/paint-protection-ppf`}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-brand-bg text-brand-bg hover:text-white rounded-2xl font-black text-xs md:text-sm border border-slate-200 transition-all duration-300 group shadow-sm active:scale-95"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                <span>الذهاب لخدمات حماية الطلاء (PPF)</span>
              </>
            ) : (
              <>
                <span>Go to Paint Protection Film (PPF)</span>
                <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </Link>
        </div>
      </section>

    </main>
  );
}