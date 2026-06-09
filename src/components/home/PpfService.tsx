// src/components/home/PpfService.tsx
import React from 'react';
import Image from 'next/image';

export default function PpfService({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      titleAr: 'أفلام أمريكية معتمدة',
      titleEn: 'Certified American Films',
      descAr: 'XPEL & 3M — أعلى معايير الجودة العالمية',
      descEn: 'XPEL & 3M — Ultimate Worldwide Standards',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand-turquoise" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.439.743-.439.916 0l5.477 13.904c.15.381-.137.794-.548.794H6.674c-.41 0-.698-.413-.548-.794L11.48 3.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V21m-4.5-2.25H4.5m15 0h-3" />
        </svg>
      ),
      titleAr: 'ضمان شامل وممتد',
      titleEn: 'Comprehensive Warranty',
      descAr: 'ضمان متعدد السنوات على المواد والتركيب',
      descEn: 'Multi-year warranty on premium materials and installation',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      titleAr: 'خبراء ومتخصصون دوليون',
      titleEn: 'International Specialists',
      descAr: 'فريق معتمد بخبرة في أرقى سيارات العالم',
      descEn: 'Certified team experienced with world luxury cars',
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 py-16 lg:py-24 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌌 هالة ضوئية خلفية خفيفة (Ambient Backdrop) متناسقة مع معايير التصميم الفاتح */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        
        {/* 👑 الهيدر العلوي للقسم (العناية بالسيارات والحماية والتغليف) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-brand-deep-teal/10 pb-6 mb-12 gap-4">
          <div className="text-center md:text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-bg tracking-tight">
              {isAr ? 'الحماية والتغليف PPF' : 'PPF Protection & Wrap'}
            </h2>
            <p className="text-xs md:text-sm font-bold text-brand-platinum mt-2 tracking-wide uppercase">
              {isAr ? 'خدمات العناية بالسيارات • Car Care Services' : 'Car Care Services • Paint Protection'}
            </p>
          </div>
          
          {/* خط التزيين الملوكي اللامع المنتهي بنجمة كريستالية */}
          <div className="hidden md:flex items-center gap-3 flex-grow max-w-md mx-8">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-deep-gold to-brand-light-gold flex-grow" />
            <span className="text-brand-deep-gold text-lg">✦</span>
          </div>
        </div>

        {/* 🧱 شبكة الكروت الرئيسية المتجاوبة المتطابقة هندسياً مع كروت قسم About */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* 1. كارد الصورة الهندسية الجانبية (4 أعمدة على الشاشات الكبيرة) */}
          <div className="lg:col-span-4 min-h-[380px] rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(14,67,77,0.05)] border-4 border-white bg-white relative group">
            <Image 
              src="/images/PPF.webp" 
              alt={isAr ? 'تغليف وحماية السيارات الفاخرة' : 'Premium Paint Protection Film Application'} 
              fill
              sizes="(max-w: 1024px) 100vw, 33vw"
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. كارد الوصف والدرجة الفاخرة (4 أعمدة) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)] transition-all duration-300 hover:border-brand-turquoise/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-brand-bg flex items-center gap-2">
                  <span className="text-brand-deep-gold text-base">🛡️</span>
                  {isAr ? 'المعايير' : 'Grade'}
                </h3>
                <span className="px-3 py-1 text-[10px] font-black text-brand-turquoise bg-brand-turquoise/10 rounded-lg">
                  Premium
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-brand-deep-gold mb-3 uppercase tracking-wide">
                Paint Protection
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-brand-deep-teal/80 leading-relaxed mt-2">
              {isAr 
                ? 'أفضل حماية أمريكية معتمدة تحمي طلاء سيارتك من الخدوش، الحصى المتطاير، والعوامل البيئية القاسية لتبقى ببريق الوكالة.' 
                : 'Premium certified American protection—shielding your car paint from scratches, stone chips, and harsh environmental elements to maintain factory shine.'}
            </p>
          </div>

          {/* 3. كارد الميزات والقائمة الطولية (4 أعمدة مع فواصل ميتاليك مبهرة ونجمية) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-brand-bg">{isAr ? 'المميزات' : 'Features'}</h3>
              <span className="px-3 py-1 text-[10px] font-black text-brand-deep-gold bg-brand-deep-gold/10 rounded-lg">
                {isAr ? 'الاحترافية' : 'Elite Grade'}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {features.map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-brand-deep-teal/5 flex items-center justify-center mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-brand-bg">
                        ✦ {isAr ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-[11px] font-medium text-brand-platinum mt-0.5">
                        {isAr ? item.descAr : item.descEn}
                      </p>
                    </div>
                  </div>
                  {index < features.length - 1 && <div className="h-[1px] bg-brand-deep-teal/10 w-full" />}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 📑 المخطط السفلي العريض: كارد الدعوة للحجز ليكون منسجماً مع هيكل كروت الرؤية والرسالة */}
        <div className="w-full rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)] flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-brand-deep-gold/30">
          <div className="text-center sm:text-start">
            <h4 className="text-base sm:text-lg font-black text-brand-bg">
              {isAr ? 'هل أنت جاهز لمنح سيارتك الحماية الفاخرة؟' : 'Ready to give your vehicle the ultimate luxury shield?'}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-brand-platinum mt-1">
              {isAr ? 'احجز موعدك الآن مع فريق الخبراء الدوليين لدينا' : 'Book your appointment now with our international specialist team.'}
            </p>
          </div>
          
          {/* 🎯 زر الحجز الفاخر المطابق للهوية البصرية الهندسية */}
          <button className="relative overflow-hidden inline-flex items-center justify-center px-10 py-3.5 rounded-xl bg-gradient-to-r from-brand-deep-gold to-brand-light-gold text-white font-black text-sm tracking-wider shadow-[0_10px_25px_rgba(197,168,107,0.2)] hover:shadow-[0_15px_35px_rgba(197,168,107,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer shrink-0">
            <span className="relative z-10">{isAr ? 'احجز خدماتك الآن' : 'Book Your Service Now'}</span>
            <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </section>
  );
}