// src/app/[locale]/services/polishing-ceramic/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PolishingCeramicPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // 📊 فصل وهيكلة البيانات بالكامل بنقاء لغوي مطلق لمنع أي تداخل
  const servicesCards = [
    {
      id: 'deep-cleaning-detailing',
      title: isAr ? 'التنظيف العميق بالبخار' : 'Deep Steam Interior Cleaning',
      subTitle: isAr ?  'التنظيف العميق بالبخار':'Deep Steam Interior Cleaning' ,
      img: '/images/Ceramic-1.webp',
      features: isAr 
        ? ['تنظيف داخلي شامل بالبخار', 'إزالة البكتيريا والروائح تماماً', 'مناسب للجلود والقماش الفاخر']
        : ['Comprehensive interior steam cleaning', 'Complete bacteria & odor removal', 'Perfect for premium leather & fabrics'],
      icon: (
        <svg className="w-5 h-5 text-brand-deep-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      id: 'window-tinting-thermal',
      title: isAr ? 'العزل الحراري للنوافذ' : 'Window Tinting & Heat Insulation',
      subTitle: isAr ?  'العزل الحراري للنوافذ': 'Window Tinting & Heat Insulation' ,
      img: '/images/Ceramic-2.webp',
      features: isAr 
        ? ['أفلام عازلة معتمدة دولياً', 'حماية قصوى من الأشعة فوق البنفسجية', 'خصوصية تامة وراحة حرارية داخل المقصورة']
        : ['Internationally certified insulating films', 'Full UV radiation protection', 'Total privacy & thermal comfort'],
      icon: (
        <svg className="w-5 h-5 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      )
    },
    {
      id: 'polishing-ceramic',
      title: isAr ? 'التلميع وتصحيح الطلاء السيراميكي' : 'Ceramic Coating & Paint Correction',
      subTitle: isAr ?   'التلميع وتصحيح الطلاء السيراميكي' : 'Ceramic Coating & Paint Correction',
      img: '/images/Ceramic-3.webp',
      features: isAr 
        ? ['تصحيح ومعالجة العيوب السطحية والخدوش', 'تطبيق طبقة نانو سيراميك أصلية لحماية فائقة', 'لمعان كريستالي ممتد يقاوم العوامل الجوية']
        : ['Professional exterior paint defect correction', 'Premium nano ceramic protective coating', 'Long-lasting crystal showroom gloss'],
      icon: (
        <svg className="w-5 h-5 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] select-none text-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 👑 هيدر فخم ممتد متناسق مع العمق البصري للبراند */}
      <section className="relative w-full py-32 md:py-48 bg-brand-bg text-white overflow-hidden border-b border-brand-deep-gold/20 text-center flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-brand-deep-gold)_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10 space-y-4 max-w-4xl">
          <Link 
            href={`/${locale}/services`} 
            className="inline-flex items-center gap-2 text-xs font-black text-brand-light-gold bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 mb-2 active:scale-95"
          >
            <span>{isAr ? '← كافة الخدمات الحصرية' : '← All Premium Services'}</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight px-2">
            {isAr ? 'خدمات العناية المتقدمة والتلميع السيراميكي' : 'Premium Detailing & Protection Suite'}
          </h1>
          
          <p className="text-[10px] sm:text-xs md:text-sm font-bold text-brand-light-gold/80 tracking-widest uppercase block pt-1">
            Ceramic Polish • Thermal Insulation • Deep Steam Clean
          </p>
          
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-deep-gold" />
            <span className="text-brand-deep-gold text-xs">◆</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-deep-gold" />
          </div>
        </div>
      </section>

      {/* 📊 حاوية الكروت المتجاوبة بالكامل */}
      <section className="w-full py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center">
          
          {servicesCards.map((card) => (
            <div 
              key={card.id}
              className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_40px_rgba(3,15,30,0.02)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(197,168,107,0.08)] hover:-translate-y-1 group relative"
            >
              
              {/* قسم الصورة المستقرة */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11] overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  priority
                  sizes="(max-w-7xl) 33vw, (max-w-md) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                
                {/* الأيقونة العائمة بمنتصف الصورة تماماً */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-brand-bg border-2 border-brand-deep-gold flex items-center justify-center shadow-md z-20 transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>
              </div>

              {/* تفاصيل الكارت والمميزات الذكية */}
              <div className="p-5 sm:p-6 md:p-8 pt-10 flex-grow flex flex-col items-center justify-between space-y-6">
                
                <div className="text-center space-y-1.5 w-full">
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-brand-bg tracking-tight group-hover:text-brand-deep-gold transition-colors duration-300 min-h-[28px] flex items-center justify-center">
                    {card.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wide uppercase truncate">
                    {card.subTitle}
                  </p>
                  <div className="w-16 h-[2px] bg-brand-deep-gold/30 mx-auto mt-3 rounded-full" />
                </div>

                {/* قائمة المميزات المدعومة بخواص الاتجاهات المنطقية الـ Ultra-Modern */}
                <ul className="w-full space-y-2.5 sm:space-y-3">
                  {card.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100/70 text-xs md:text-sm font-bold text-slate-700 transition-colors duration-300 hover:bg-slate-100/80"
                    >
                      {/* النص يملأ المساحة بمرونة تامة */}
                      <span className="leading-relaxed flex-grow text-start px-1">{feature}</span>
                      
                      {/* المربع التحديدي الفاخر بحسابات اتجاه ذكية (ms-2 me-1 للـ Multi-language) */}
                      <span className="flex-shrink-0 w-4 h-4 rounded border-2 border-brand-deep-gold/50 flex items-center justify-center text-brand-deep-gold bg-white ms-2 me-1">
                        <svg className="w-2.5 h-2.5 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* زر الحجز الممتد أسفل الكارت */}
                <div className="w-full pt-1">
                  <Link
                    href={`/${locale}/contact`}
                    className="w-full flex items-center justify-center gap-2 text-xs md:text-sm font-black text-white bg-brand-bg hover:bg-brand-deep-gold px-4 py-3.5 rounded-xl transition-all duration-300 shadow-sm active:scale-95"
                  >
                    <span>{isAr ? 'طلب الخدمة الآن' : 'Request Service'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* 🔗 الفوتر التوجيهي السفلي مع الحفاظ على اتجاه الأيقونات */}
      <section className="w-full py-8 md:py-12 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href={`/${locale}/services/paint-protection-ppf`}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-4 bg-slate-50 hover:bg-brand-bg text-brand-bg hover:text-white rounded-2xl font-black text-xs md:text-sm border border-slate-200 transition-all duration-300 group shadow-sm active:scale-95"
          >
            <span>{isAr ? 'الانتقال لخدمات حماية الطلاء (PPF)' : 'Go to Paint Protection (PPF)'}</span>
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