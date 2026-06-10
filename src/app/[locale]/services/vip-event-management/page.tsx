// src/app/[locale]/services/vip-event-management/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Crown } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function VipEventManagementPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // الركائز الستة الفاخرة المخصصة لخدمات إدارة فعاليات كبار الشخصيات VIP
  const vipPillars = [
    {
      titleAr: 'تخطيط المجالس الملكية',
      titleEn: 'Royal Diwan Planning',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.435.744-.435.916 0l2.131 5.377 5.816.417c.473.034.662.612.31.916l-4.433 3.863 1.354 5.672c.11.463-.39.825-.797.562l-4.91-3.176-4.911 3.176c-.407.263-.907-.099-.797-.562l1.354-5.672-4.433-3.863c-.352-.304-.162-.882.31-.916l5.816-.417 2.13-5.377z" />
        </svg>
      )
    },
    {
      titleAr: 'بروتوكول واستقبال الاستضافة',
      titleEn: 'VIP Protocol & Seating',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      titleAr: 'الأنظمة السمعية والبصرية',
      titleEn: 'High-End AV Systems',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      )
    },
    {
      titleAr: 'تغطية وتصوير سينمائي',
      titleEn: 'Cinematic Coverage',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-4.5-3.182v6.363l4.5-3.181z" />
        </svg>
      )
    },
    {
      titleAr: 'إدارة وتنسيق القوائم',
      titleEn: 'Elite Guest Relations',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3c.38 0 .758.004 1.134.012M9 4.5H6.5A2.25 2.25 0 004.25 6.75v11.25A2.25 2.25 0 006.5 20.25H9m3-15.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      )
    },
    {
      titleAr: 'إشراف ما بعد الحفل',
      titleEn: 'Post-Gala Supervision',
      icon: (
        <svg className="w-6 h-6 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] font-['Cairo'] select-none text-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 👑 هيدر ممتد وواسع يبرز هيبة تنظيم مناسبات كبار الشخصيات (py-32 إلى py-44) */}
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
            EXCLUSIVE — VIP EVENT MANAGEMENT
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? 'إدارة وتنظيم فعاليات كبار الشخصيات (VIP)' : 'VIP Event & Gala Management'}
          </h1>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-deep-gold" />
            <span className="text-brand-deep-gold text-xs">◆</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-deep-gold" />
          </div>
        </div>
      </section>

      {/* 📊 القسم الثنائي المتجاوب المستوحى بالكامل من هيكلية سكرين شوت 000048 */}
      <section className="w-full py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(3,15,30,0.02)] overflow-hidden items-center p-6 sm:p-10 lg:p-12">
          
          {/* الجانب الأيمن (نصوص الخدمة والـ 6 ركائز الأساسية) */}
          <div className="col-span-1 lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="space-y-3 text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-bg tracking-tight flex items-center justify-start gap-2">
                <Crown className="w-6 h-6 text-brand-deep-gold flex-shrink-0" />
                <span>{isAr ? 'البروتوكولات والمناسبات الدبلوماسية الملكية' : 'Royal & Diplomatic Gala Suites'}</span>
              </h2>
              <p className="text-sm md:text-base font-bold text-slate-600 leading-relaxed max-w-2xl">
                {isAr 
                  ? 'نهتم بأدق معايير البروتوكول والضيافة والنظم الفنية لتقديم فعاليات ملوكة مخصصة تترك انطباعاً استثنائياً وخالداً لكل الحاضرين من النخبة والرواد.' 
                  : 'We observe the highest criteria of protocol and luxury coordination to execute personalized elite galas that imprint an eternal memory for your high-profile attendees.'
                }
              </p>
              <div className="w-20 h-[3px] bg-brand-deep-gold rounded-full pt-0.5" />
            </div>

            {/* 🎴 شبكة الأركان الستة المتجاوبة 100% لتفادي أي تداخل */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
              {vipPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100/70 flex flex-col items-center text-center justify-center space-y-3 transition-all duration-300 hover:bg-white hover:border-brand-deep-gold/40 hover:shadow-sm group"
                >
                  {/* حاوية الأيقونة */}
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

          {/* الجانب الأيسر (صورة القاعة الفخمة + البطاقة الرقمية العائمة الحصرية) */}
          <div className="col-span-1 lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:h-[550px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm order-1 lg:order-2 group">
            <Image
              src="/images/join.webp" 
              alt="Luxury VIP Hall and Gala Management Setup"
              fill
              sizes="(max-w-md) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

            {/* 🎯 البطاقة العائمة العلوية المحاكية للتصميم الأصلي بدقة متناهية */}
            <div className="absolute top-4 right-4 bg-brand-bg border-2 border-brand-deep-gold text-white rounded-xl py-3 px-5 text-center shadow-md z-20 transition-all duration-300 hover:scale-105">
              <span className="block text-2xl md:text-3xl font-black text-brand-light-gold tracking-tighter">
                VIP
              </span>
              <span className="block text-[10px] font-black text-white/90 tracking-wide mt-0.5">
                {isAr ? 'تنظيم نخبي متكامل' : 'Elite Gala Class'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 🎯 زر التفاعل السريع وطلب الخدمة */}
      <section className="w-full max-w-4xl mx-auto px-4 pb-16 text-center">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4.5 bg-brand-bg hover:bg-brand-deep-gold text-white font-black text-sm rounded-2xl transition-all duration-300 shadow-md active:scale-95"
        >
          <span>{isAr ? 'تواصل معنا لتنظيم حدث كبار الشخصيات' : 'Contact Us For Your Private Elite Event'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 🔗 توجيه سفلي للعودة لخدمة المؤتمرات العامة */}
      <section className="w-full py-8 md:py-12 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Link
            href={`/${locale}/services/events-conferences`}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-brand-bg text-brand-bg hover:text-white rounded-2xl font-black text-xs md:text-sm border border-slate-200 transition-all duration-300 group shadow-sm active:scale-95"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                <span>العودة لخدمات الفعاليات والمؤتمرات</span>
              </>
            ) : (
              <>
                <span>Back to Events & Conferences</span>
                <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </Link>
        </div>
      </section>

    </main>
  );
}