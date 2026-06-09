// src/components/home/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const [activeTab, setActiveTab] = useState(0);

  const showcaseData = [
    {
      id: '01',
      tag: isAr ? '✦ قمم ومؤتمرات دولية' : '✦ International Summits',
      titleAr: <>تنظيم <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black drop-shadow-[0_2px_10px_rgba(197,168,107,0.2)]">المؤتمرات والفعاليات</span> الرسمية</>,
      titleEn: <>Organizing Official <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black">Conferences & Events</span></>,
      descAr: 'تخطيط وإدارة كاملة للمعارض والقمم الحكومية والخاصة رفيعة المستوى في أبوظبي ودبي بأحدث التقنيات العالمية.',
      descEn: 'Complete planning and management of high-level government and private summits in Abu Dhabi & Dubai.',
      image: '/images/hero-events.avif'
    },
    {
      id: '02',
      tag: isAr ? '✦ بروتوكول كبار الشخصيات' : '✦ VIP Hospitality Protocol',
      titleAr: <>إدارة <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black">الضيافة والاستقبال</span> الملوكي</>,
      titleEn: <>Premium <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black">Hospitality & Royal</span> Reception</>,
      descAr: 'فرق تنظيمية خبيرة ومدربة على أعلى بروتوكولات القصور والوفود الدبلوماسية لضمان تنظيم استثنائي يليق بضيوفكم.',
      descEn: 'Expert teams trained in royal and diplomatic protocols to guarantee an exceptional organization for your guests.',
      image: '/images/hero-hospitality.avif'
    },
    {
      id: '03',
      tag: isAr ? '✦ العناية بالسيارات الفاخرة' : '✦ Luxury Car Care & Detailing',
      titleAr: <>خدمات VIP متكاملة لـ <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black">أفخم السيارات والأسطول</span></>,
      titleEn: <>Integrated VIP Services for <span className="bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-black">Luxury Fleets & Supercars</span></>,
      descAr: 'إدارة احترافية شاملة للعناية بالسيارات الفارهة المصاحبة للمؤتمرات، وتقديم أعلى معايير الحماية والجهوزية اللوجستية الراقية.',
      descEn: 'Comprehensive professional management for luxury vehicle detailing and premium logistical support during major events.',
      image: '/images/hero-cars.avif'
    }
  ];

  const stats = [
    { number: '+500', label: isAr ? 'عميل راضٍ' : 'Satisfied Clients' },
    { number: '+100', label: isAr ? 'فعالية ناجحة' : 'Successful Events' },
    { number: '+1000', label: isAr ? 'سيارة فاخرة' : 'Luxury Cars Served' },
    { number: '+02', label: isAr ? 'سنوات ذهبية' : 'Golden Years' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % showcaseData.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [showcaseData.length]);

  return (
    <section className="relative min-h-screen mt-16 sm:mt-20 lg:mt-0 bg-slate-50 flex flex-col justify-between pt-12 pb-8 lg:pt-28 lg:pb-8 overflow-hidden select-none font-['Cairo']">
      
      {/* 🌌 الإبداع: مسرح الـ Ambient الممتد الفاتح والمشع بالخلفية النشطة كاملة */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-35 mix-blend-multiply transition-all duration-1000">
        {showcaseData.map((slide, idx) => (
          <div
            key={`ambient-${slide.id}`}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out blur-[120px] transform scale-110 ${
              idx === activeTab ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 🕸️ شبكة جرافيكس خفيفة ناعمة من لون التيال العميق للبراند */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-brand-deep-teal)_0.02_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-deep-teal)_0.02_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.15] pointer-events-none" />
      
      {/* هالات ضوئية إضافية داعمة بستايل نيون ناعم متناسق مع Tailwind v4 */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-turquoise/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-brand-light-gold/10 rounded-full blur-[100px] pointer-events-none" />

      {/* الـ Container الرئيسي المتجاوب */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 flex-grow flex items-center relative z-10 w-full mt-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full py-4">
          
          {/* 🏛️ العمود الأول: النصوص والأزرار التفاعلية */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-center lg:text-start order-2 lg:order-1">
            
            {/* التاج المضيء المستند على بوردر ذهبي وخلفية زجاجية بيضاء نقية */}
            <div className="mx-auto lg:mx-0 inline-flex items-center gap-2 rounded-xl border border-brand-deep-gold/30 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] md:text-xs font-black text-brand-deep-teal mb-6 tracking-widest uppercase shadow-[0_4px_20px_rgba(14,67,77,0.05)]">
              <span className="w-2 h-2 rounded-full bg-brand-turquoise animate-pulse" />
              {showcaseData[activeTab].tag}
            </div>

            {/* العنوان الرئيسي المبني على لون الـ bg الداكن ليكون التباين فائق الفخامة والوضوح */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black text-brand-bg tracking-tight leading-[1.3] md:leading-[1.25] transition-all duration-500">
              {isAr ? showcaseData[activeTab].titleAr : showcaseData[activeTab].titleEn}
            </h1>

            {/* الوصف المعتمد على عائلة التيال العميق بنسبة مريحة جداً للقراءة وفوق الـ Ambient الملون */}
            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-brand-deep-teal/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-500">
              {isAr ? showcaseData[activeTab].descAr : showcaseData[activeTab].descEn}
            </p>

            {/* أزرار الدعوة إلى الإجراء (CTA Buttons) المتجاوبة بدون تداخل */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
              <Link 
                href={`/${locale}/contact`}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-deep-gold to-brand-light-gold text-brand-bg font-black text-xs md:text-sm rounded-xl shadow-[0_4px_20px_rgba(197,168,107,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                {isAr ? 'ابدأ تنظيم فعاليتك الآن' : 'Start Your Event Now'}
              </Link>
              
              <Link 
                href={`/${locale}/#services`}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-brand-bg border border-slate-200 hover:border-brand-turquoise/40 font-black text-xs md:text-sm rounded-xl transition-all duration-300 shadow-sm text-center"
              >
                {isAr ? 'اكتشف خدماتنا' : 'Explore Services'}
              </Link>
            </div>

            {/* 🎛️ التبديل الرقمي الفاخر بلمسات الذهب البلاتيني والتيال */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-center lg:justify-start gap-4 md:gap-6">
              {showcaseData.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 pb-2 transition-all duration-500 border-b-2 text-start group ${
                    idx === activeTab 
                      ? 'border-brand-deep-gold text-brand-deep-gold scale-105 font-black' 
                      : 'border-transparent text-brand-platinum/70 hover:text-brand-deep-teal font-bold'
                  }`}
                >
                  <span className={`font-sans text-xs md:text-sm ${idx === activeTab ? 'text-brand-deep-gold' : 'text-brand-platinum'}`}>
                    {item.id}
                  </span>
                  <span className="text-xs md:text-sm tracking-wide font-bold">
                    {isAr ? (idx === 0 ? 'فعاليات' : idx === 1 ? 'ضيافة' : 'العناية') : (idx === 0 ? 'Events' : idx === 1 ? 'VIP' : 'Care')}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* 🖼️ العمود الثاني: مسرح الصور المفتوح عالي الدقة والمحاذاة */}
          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 w-full px-2 sm:px-0">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/11] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(14,67,77,0.1)] border-4 border-white bg-white group">
              {showcaseData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                    index === activeTab ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-103 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt="Jawharat Al Danat Showcase"
                    className="w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/10 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}

              {/* خط الوقت المضيء الممتد بتنام البراند الملون أسفل الكارد */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-100">
                <div className="h-full bg-gradient-to-r from-brand-deep-gold via-brand-light-gold to-brand-turquoise animate-[imageProgress_7s_linear_infinite] w-full origin-left" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 📊 شريط الإحصائيات الفخم في الأسفل بالتباعد والحماية الكاملة من التداخل الزجاجي الفاتح */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10 mt-8 lg:mt-auto pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border border-white bg-white/75 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_12px_40px_rgba(14,67,77,0.06)]">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2 relative">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-b from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent font-sans tracking-tight drop-shadow-sm">
                {stat.number}
              </span>
              <span className="mt-1 text-[11px] sm:text-xs md:text-sm text-brand-platinum font-black text-center">
                {stat.label}
              </span>
              {idx < 3 && (
                <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-brand-turquoise/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes imageProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}