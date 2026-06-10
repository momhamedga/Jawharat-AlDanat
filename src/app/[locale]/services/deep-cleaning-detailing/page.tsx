// src/app/[locale]/services/deep-cleaning-detailing/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function DeepCleaningDetailingPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // خطوات العملية الاحترافية الخمسة مأخوذة بدقة من الترتيب الموضح في لقطة الشاشة Screenshot 2026-06-10 212649.png
  const processSteps = [
    {
      step: '1',
      titleAr: 'التنظيف الخارجي الكامل',
      titleEn: 'Full Exterior Detailing',
      descAr: 'غسل عالي الضغط وإزالة الأوساخ العميقة من الهيكل',
      descEn: 'High-pressure wash and removal of deep-seated grime from the chassis',
    },
    {
      step: '2',
      titleAr: 'معالجة العجلات والإطارات',
      titleEn: 'Wheel & Tire Conditioning',
      descAr: 'تنظيف متخصص للجنوط وتلميع الإطارات',
      descEn: 'Specialized rim decontamination and premium tire gloss application',
    },
    {
      step: '3',
      titleAr: 'التنظيف الداخلي بالبخار',
      titleEn: 'Deep Steam Interior Cleaning',
      descAr: 'بخار عالي الحرارة لتعقيم المقصورة بالكامل',
      descEn: 'High-temperature steam extraction for total cabin sanitization',
    },
    {
      step: '4',
      titleAr: 'تنظيف وترطيب الجلد',
      titleEn: 'Leather Cleansing & Hydration',
      descAr: 'معالجة بمواد فاخرة لحون الجلد وإحياء لونه',
      descEn: 'Treated with premium conditioners to nourish leather and restore rich tone',
    },
    {
      step: '5',
      titleAr: 'المعطر والتنقية النهائية',
      titleEn: 'Deodorizing & Final Inspection',
      descAr: 'فحص دقيق وإضافة عطر داخلي فاخر',
      descEn: 'Meticulous quality control audit and signature luxury scenting',
    },
  ];

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] font-['Cairo'] select-none text-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 👑 الهيدر الممتد الفخم لمنع التداخل وإبراز هوية البراند المضيئة */}
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
            VIP LUXURY DETAILING SUITE
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? 'خدمة التنظيف العميق بالبخار' : 'Premium Deep Cleaning Service'}
          </h1>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-deep-gold" />
            <span className="text-brand-deep-gold text-xs">◆</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-deep-gold" />
          </div>
        </div>
      </section>

      {/* 📊 القسم المنقسم الرئيسي المبني بالكامل على معايير اللقطة المرجعية */}
      <section className="w-full py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(3,15,30,0.02)] overflow-hidden p-6 sm:p-10 lg:p-12 items-start">
          
          {/* الجانب الأيسر (أو الأيمن بالـ RTL): كتلة الصورة المستوحاة مع البانر السفلي */}
          <div className="col-span-1 lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
            
            {/* إطار الصورة الفخم المكتوب عليه موديل السيارة كالتصميم تماماً */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <Image
                src="/images/Ceramic-1.webp" 
                alt="Range Rover Vogue Deep Steam Cleaning"
                fill
                sizes="(max-w-xl) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />
              
              {/* التسمية التوضيحية السفلية على الصورة من اللقطة المرجعية */}
              <div className="absolute bottom-4 right-4 left-4 bg-brand-bg/80 backdrop-blur-md border border-brand-deep-gold/30 rounded-xl py-2.5 px-4 text-center">
                <p className="text-xs font-black text-brand-light-gold tracking-wide">
                  {isAr ? 'Range Rover Vogue — تنظيف داخلي بالبخار' : 'Range Rover Vogue — Deep Interior Steam Clean'}
                </p>
              </div>
            </div>

            {/* 🎯 بانر النتيجة النهائي الكبير المضيء المستوحى من الـ Bottom Card في الصورة */}
            <div className="w-full p-5 sm:p-6 rounded-2xl border border-brand-deep-gold/30 bg-gradient-to-br from-slate-50 to-white shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1 text-right">
                <h4 className="text-sm sm:text-base font-black text-brand-bg flex items-center gap-2">
                  <span className="text-brand-deep-gold">{isAr ? 'النتيجة :' : 'The Result :'}</span>
                  <span>{isAr ? 'نظافة تعادل حالة الصنع' : 'Showroom Condition'}</span>
                </h4>
                <p className="text-xs font-bold text-slate-500">
                  {isAr ? 'عناية فائقة تعيد سيارتك تماماً كحالة الوكالة الأولى' : 'Your vehicle fully restored to factory pristine look'}
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-deep-gold shadow-md">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
            </div>

          </div>

          {/* الجانب الأيمن: قائمة الخطوات الخمسة المرقمة عمودياً والمتجاوبة بنسبة 100% */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            
            <div className="space-y-2 text-right">
              <span className="inline-block text-[11px] font-black text-brand-deep-gold bg-brand-deep-gold/10 px-3 py-1 rounded-md uppercase tracking-wider">
                {isAr ? 'العملية الاحترافية المعتمدة' : 'THE PROFESSIONAL PROCESS'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-brand-bg tracking-tight">
                {isAr ? 'خطوات التنظيف الخمسة المتكاملة' : '5-Step Deep Detailing Flow'}
              </h2>
              <div className="w-16 h-[2px] bg-brand-deep-gold rounded-full mt-2" />
            </div>

            {/* حاوية الخط الزمني والخطوات المتتالية */}
            <div className="relative border-r-2 border-slate-100 mr-4 space-y-6 pt-4">
              {processSteps.map((item, idx) => (
                <div 
                  key={idx}
                  className="relative pr-8 flex items-start gap-4 group transition-all duration-300"
                >
                  {/* الدائرة الرقمية العائمة المثبتة على الخط العمودي كالتصميم المرجعي */}
                  <div className="absolute -right-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 group-hover:border-brand-deep-gold group-hover:bg-brand-bg group-hover:text-brand-deep-gold flex items-center justify-center text-xs font-black transition-all duration-300 shadow-sm z-10">
                    {item.step}
                  </div>

                  {/* تفاصيل الخطوة من نصوص وشروحات دقيقة */}
                  <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 sm:p-5 flex-grow text-right space-y-1 transition-all duration-300 hover:bg-white hover:border-brand-deep-gold/30 hover:shadow-[0_10px_30px_rgba(3,15,30,0.01)]">
                    <h3 className="text-xs sm:text-sm font-black text-brand-bg group-hover:text-brand-deep-gold transition-colors duration-300">
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-500 leading-relaxed">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* زر الحجز السريع الممتد أسفل الخطوات */}
            <div className="pt-4 mr-4">
              <Link
                href={`/${locale}#contact`}
                className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-white bg-brand-bg hover:bg-brand-deep-gold px-6 py-4 rounded-2xl transition-all duration-300 shadow-sm active:scale-95"
              >
                <span>{isAr ? 'طلب خدمة التنظيف العميق الآن' : 'Request Deep Clean Now'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 🔗 فوتر توجيهي متبادل ذكي وسلس */}
      <section className="w-full py-8 md:py-12 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href={`/${locale}/services/window-tinting-thermal`}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-brand-bg text-brand-bg hover:text-white rounded-2xl font-black text-xs md:text-sm border border-slate-200 transition-all duration-300 group shadow-sm active:scale-95"
          >
            <span>{isAr ? 'الانتقال لخدمات العزل الحراري' : 'Go to Thermal Window Tinting'}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </section>

    </main>
  );
}