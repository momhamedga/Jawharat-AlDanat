// src/app/[locale]/services/events-conferences/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function EventsConferencesPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // الـ 6 ركائز الأساسية المأخوذة بدقة من الأيقونات المعروضة في الشاشة المرجعية Screenshot 2026-06-10 000048.png
  const pillars = [
    {
      titleAr: 'تصميم المكان',
      titleEn: 'Venue Design',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M12 3v3M3 21h18M12 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      )
    },
    {
      titleAr: 'إدارة الضيافة',
      titleEn: 'Hospitality Management',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.5 1.5 0 11-1.318 2.535M12 21V12m0 0H7.5M12 12h4.5M12 12A3.75 3.75 0 1012 4.5a3.75 3.75 0 000 7.5zm7.5-6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm16.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      )
    },
    {
      titleAr: 'الإضاءة والصوت',
      titleEn: 'Lighting & Audio',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      titleAr: 'التصوير والتوثيق',
      titleEn: 'Photography & Documentation',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5.004c-.53 0-1.024.26-1.32.7l-.822 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      titleAr: 'قوائم الضيوف',
      titleEn: 'Guest Management',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3c.38 0 .758.004 1.134.012M9 4.5H6.5A2.25 2.25 0 004.25 6.75v11.25A2.25 2.25 0 006.5 20.25H9m3-15.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      )
    },
    {
      titleAr: 'ما بعد الفعالية',
      titleEn: 'Post-Event Services',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] font-['Cairo'] select-none text-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 👑 هيدر ممتد وواسع مخصص لتفادي تداخل العناصر (py-32 إلى py-44) */}
      <section className="relative w-full py-24 md:py-40 bg-brand-bg text-white overflow-hidden border-b border-brand-deep-gold/20 text-center flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-brand-deep-gold)_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10 space-y-4 max-w-4xl">
          <Link 
            href={`/${locale}/services`} 
            className="inline-flex items-center gap-2 text-xs font-black text-brand-light-gold bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 mb-2 active:scale-95"
          >
            {isAr ? '← العودة لجميع الخدمات الحصرية' : '← Back to All Services'}
          </Link>
          
          <span className="block text-[11px] font-black tracking-[0.25em] text-brand-deep-gold uppercase">
            SERVICES — EVENTS & CONFERENCES
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? 'إدارة وتنظيم الفعاليات والمؤتمرات' : 'Events & Conferences Management'}
          </h1>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-deep-gold" />
            <span className="text-brand-deep-gold text-xs">◆</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-deep-gold" />
          </div>
        </div>
      </section>

      {/* 📊 القسم الثنائي المتجاوب المبني بالكامل على فلسفة Screenshot 2026-06-10 000048.png */}
      <section className="w-full py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(3,15,30,0.02)] overflow-hidden items-center p-6 sm:p-10 lg:p-12">
          
          {/* الجانب الأيمن (نصوص الخدمة والـ 6 ركائز الأساسية الموزعة بالتساوي) */}
          <div className="col-span-1 lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="space-y-3 text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-bg tracking-tight">
                {isAr ? 'الفعاليات والمؤتمرات الحصرية' : 'Events & Conferences Management'}
              </h2>
              <p className="text-sm md:text-base font-bold text-slate-600 leading-relaxed max-w-2xl">
                {isAr 
                  ? 'نقدم حلاً متكاملاً لتنظيم الفعاليات الراقية والمؤتمرات الدولية، من تصميم المكان إلى إدارة كل تفصيل بدقة واحترافية عالية تليق بنجاحكم.' 
                  : 'We offer a comprehensive solution for managing luxury events and international conferences, from initial venue styling to executing every detail with ultimate precision.'
                }
              </p>
              <div className="w-20 h-[3px] bg-brand-deep-gold rounded-full pt-0.5" />
            </div>

            {/* 🎴 شبكة الأركان الستة المتجاوبة بنسبة 100% لتجنب أي تداخل نصوص */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100/70 flex flex-col items-center text-center justify-center space-y-3 transition-all duration-300 hover:bg-white hover:border-brand-deep-gold/40 hover:shadow-sm group"
                >
                  {/* حاوية الأيقونة التفاعلية المحاكية للتصميم */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-deep-gold/30">
                    {pillar.icon}
                  </div>
                  
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-black text-brand-bg tracking-tight">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h4>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
                      {isAr ? pillar.titleEn : pillar.titleAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الجانب الأيسر (صورة الكونسيرت أو القاعة الملكية الفخمة + الكارت الإحصائي العائم المحاكي تماماً للصورة) */}
          <div className="col-span-1 lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:h-[550px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm order-1 lg:order-2 group">
            <Image
              src="/images/Events-Conferences-Services.webp" // استبدلها بصورة الفعاليات الفخمة المتناسقة مع الستيدج
              alt="Luxury Event and Conference Setup"
              fill
              sizes="(max-w-md) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

            {/* 🎯 الكارت الإحصائي الفاخر المعلق أعلى اليمين (طبق الأصل من الشاشة المرجعية بنسخته المضيئة) */}
            <div className="absolute top-4 right-4 bg-brand-bg border-2 border-brand-deep-gold text-white rounded-xl py-3 px-5 text-center shadow-md z-20 transition-all duration-300 hover:scale-105">
              <span className="block text-2xl md:text-3xl font-black text-brand-light-gold tracking-tighter">
                +100
              </span>
              <span className="block text-[10px] font-black text-white/90 tracking-wide mt-0.5">
                {isAr ? 'فعالية منظمة بنجاح' : 'Successful Events'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 🎯 زر الإجراء السريع وحجز المواعيد أسفل الكتل مباشرة */}
      <section className="w-full max-w-4xl mx-auto px-4 pb-16 text-center">
        <Link
          href={`/${locale}#contact`}
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4.5 bg-brand-bg hover:bg-brand-deep-gold text-white font-black text-sm rounded-2xl transition-all duration-300 shadow-md active:scale-95"
        >
          <span>{isAr ? 'ابدأ بتخطيط فعاليتك القادمة معنا' : 'Start Planning Your Next Event'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 🔗 توجيه ذكي للعودة لخدمة التنظيف الفاخرة لتكملة باقة الـ VIP */}
      <section className="w-full py-8 md:py-12 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href={`/${locale}/services/deep-cleaning-detailing`}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-brand-bg text-brand-bg hover:text-white rounded-2xl font-black text-xs md:text-sm border border-slate-200 transition-all duration-300 group shadow-sm active:scale-95"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                <span>الانتقال لخدمات التنظيف العميق بالبخار</span>
              </>
            ) : (
              <>
                <span>Go to Deep Steam Cleaning Suite</span>
                <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </Link>
        </div>
      </section>

    </main>
  );
}