

export default function StoryTimeline({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  // كروت القيم السفلية المأخوذة بالكامل من لقطة التصميم
  const values = [
    {
      icon: (
        <svg className="w-10 h-10 text-brand-light-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0M9 10.5a3 3 0 116 0v3.375H9V10.5z" />
        </svg>
      ),
      titleAr: 'الجودة أولاً',
      titleEn: 'Quality First',
      descAr: 'معايير لا نساوم عليها في كل تفصيل',
      descEn: 'Uncompromising standards in every single detail.',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-light-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      titleAr: 'العمل في القلب',
      titleEn: 'Client Centricity',
      descAr: 'رضاك هو مقياس نجاحنا الحقيقي',
      descEn: 'Your absolute satisfaction is our true measure.',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-light-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767a1.123 1.123 0 00-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 00.417 1.03l1.003.767a1.125 1.125 0 01.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456a1.125 1.125 0 00-1.076.124a2.08 2.08 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.646-.87a2.08 2.08 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.767a1.122 1.122 0 00.416-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 00-.416-1.03l-1.004-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.645-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      titleAr: 'الالتزام والدقة',
      titleEn: 'Precision & Punctuality',
      descAr: 'ننجز ما نعد به، في الوقت المحدد دائماً',
      descEn: 'We deliver exactly what is promised, always on time.',
    },
  ];

  return (
    <section className="relative w-full bg-[#030F1E] py-20 lg:py-28 overflow-hidden font-['Cairo'] select-none">
      
      {/* 🌌 دمج سينمائي نيون فخم بين Deep Teal و Turquoise و BG الأسود */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#0E434D]/30 via-transparent to-[#030F1E] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3A9FA3]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#0E434D]/40 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        
        {/* 👑 الهيدر العلوي الأنيق المتطابق مع لقطة الشاشة */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 mb-16 gap-4">
          <div className="text-center md:text-start w-full md:w-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? 'قصتنا وقيمنا' : 'Our Story & Values'}
            </h2>
            <p className="text-xs md:text-sm font-bold text-[#3A9FA3] mt-2 tracking-wide uppercase">
              {isAr ? 'جوهرة الدانة — مسيرة ممتدة من الريادة والتميز' : 'Our Story & Values'}
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-3 flex-grow max-w-xs mx-8">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-deep-gold to-brand-light-gold flex-grow" />
            <span className="text-brand-deep-gold text-lg">✦</span>
          </div>
        </div>

        {/* ⏳ محرك الجدول الزمني المبتكر (Timeline) - متجاوب كلياً */}
        <div className="relative w-full mb-24">
          
          {/* 💻 تصميم الشاشات الكبيرة (أفقي متطابق بالملي مع لقطة الشاشة المرفقة) */}
          <div className="hidden lg:block relative w-full pt-16 pb-20">
            {/* خط المحور الأفقي الذهبي المتوهج */}
            <div className="absolute top-[133px] left-0 right-0 h-[3px] bg-gradient-to-r from-brand-deep-gold/20 via-brand-deep-gold to-brand-light-gold/40 shadow-[0_0_10px_rgba(197,168,107,0.3)]" />

            <div className="grid grid-cols-4 gap-4 relative">
              
              {/* محطة 2014 - التأسيس */}
              <div className="flex flex-col items-center text-center px-4 transform translate-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-[#0E434D]/80 flex items-center justify-center text-white font-sans text-lg font-black mb-12 shadow-lg">
                  ٢٠١٤
                </div>
                <h4 className="text-lg font-black text-brand-light-gold">{isAr ? 'التأسيس' : 'Founding'}</h4>
                <p className="text-xs text-white/70 mt-1">{isAr ? 'أبوظبي — بداية الرحلة' : 'Abu Dhabi — The Journey Begins'}</p>
              </div>

              {/* محطة التوسع */}
              <div className="flex flex-col items-center text-center px-4 transform -translate-y-4 flex-col-reverse justify-end h-[210px]">
                <div className="w-16 h-16 rounded-full border-2 border-brand-deep-gold bg-[#030F1E] flex items-center justify-center text-brand-deep-gold font-sans text-lg font-black mt-12 shadow-[0_0_20px_rgba(197,168,107,0.2)]">
                  ⚙️
                </div>
                <div className="mb-2">
                  <h4 className="text-lg font-black text-brand-light-gold">{isAr ? 'التوسع' : 'Expansion'}</h4>
                  <p className="text-xs text-white/70 mt-1">{isAr ? 'نمو فائق وتوسع الخدمات' : 'Hyper growth & Service Scaling'}</p>
                </div>
              </div>

              {/* محطة 2020 - المشاركات الكبيرة */}
              <div className="flex flex-col items-center text-center px-4 transform translate-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-[#0E434D]/80 flex items-center justify-center text-white font-sans text-lg font-black mb-12 shadow-lg">
                  ٢٠٢٠
                </div>
                <h4 className="text-lg font-black text-brand-light-gold">{isAr ? 'المشاركات الكبيرة' : 'Major Collaborations'}</h4>
                <p className="text-xs text-white/70 mt-1">{isAr ? 'عقود مع كبرى المؤسسات الإماراتية' : 'Contracts with Major UAE Entities'}</p>
              </div>

              {/* محطة 2026 - الريادة المضيئة والعملاقة */}
              <div className="flex flex-col items-center text-center px-4 transform -translate-y-8 flex-col-reverse justify-end h-[240px] relative">
                {/* نقطة توهج كروية نيون خلف السنة الحالية */}
                <div className="absolute top-0 w-24 h-24 bg-brand-light-gold/10 rounded-full blur-xl animate-pulse" />
                <div className="w-20 h-20 rounded-full border-4 border-brand-light-gold bg-[#0E434D] flex items-center justify-center text-brand-light-gold font-sans text-xl font-black mt-12 shadow-[0_0_30px_rgba(197,168,107,0.5)] z-10 relative">
                  ٢٠٢٦
                </div>
                <div className="mb-2 z-10">
                  <h4 className="text-xl font-black text-white flex items-center justify-center gap-1">
                    <span className="text-brand-light-gold text-sm">✦</span>
                    {isAr ? 'الريادة' : 'Leadership'}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-[#3A9FA3] mt-1">{isAr ? 'الاسم الأول في الإمارات العربية المتحدة' : 'The Premier Name across the UAE'}</p>
                </div>
              </div>

            </div>

            {/* نقاط الالتقاء (الخرزات الجيومترية المحاذية للخط تماماً) */}
            <div className="absolute top-[129px] left-0 right-0 grid grid-cols-4 pointer-events-none">
              <div className="mx-auto w-3 h-3 rounded-full bg-white border border-brand-deep-gold shadow" />
              <div className="mx-auto w-3 h-3 rounded-full bg-brand-light-gold shadow-[0_0_8px_#c5a86b]" />
              <div className="mx-auto w-3 h-3 rounded-full bg-white border border-brand-deep-gold shadow" />
              <div className="mx-auto w-5 h-5 -top-1 relative rounded-full bg-brand-light-gold shadow-[0_0_15px_#c5a86b] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#030F1E]" />
              </div>
            </div>
          </div>

          {/* 📱 تصميم الموبايل والتابلت (عمودي ذكي، آمن وانسيابي 100% بدون حركات تاوتش مفاجئة) */}
          <div className="block lg:hidden relative border-r-2 border-brand-deep-gold/30 mr-4 md:mr-8 py-4 flex flex-col gap-12">
            
            {/* محطة 2014 */}
            <div className="relative pr-8 md:pr-12 text-right">
              <div className="absolute -right-[17px] top-0 w-8 h-8 rounded-full bg-[#0E434D] border-2 border-brand-light-gold flex items-center justify-center text-[10px] font-black text-white font-sans">١٤</div>
              <span className="text-xs font-mono font-black text-[#3A9FA3]">2014</span>
              <h4 className="text-base font-black text-brand-light-gold mt-0.5">{isAr ? 'التأسيس' : 'Founding'}</h4>
              <p className="text-xs text-white/70 mt-1">{isAr ? 'أبوظبي — بداية الرحلة' : 'Abu Dhabi — The Journey Begins'}</p>
            </div>

            {/* محطة التوسع */}
            <div className="relative pr-8 md:pr-12 text-right">
              <div className="absolute -right-[17px] top-0 w-8 h-8 rounded-full bg-[#030F1E] border-2 border-brand-deep-gold flex items-center justify-center text-xs">⚙️</div>
              <span className="text-xs font-mono font-black text-brand-deep-gold">{isAr ? 'مرحلة هامة' : 'Milestone'}</span>
              <h4 className="text-base font-black text-brand-light-gold mt-0.5">{isAr ? 'التوسع' : 'Expansion'}</h4>
              <p className="text-xs text-white/70 mt-1">{isAr ? 'نمو فائق وتوسع الخدمات' : 'Hyper growth & Service Scaling'}</p>
            </div>

            {/* محطة 2020 */}
            <div className="relative pr-8 md:pr-12 text-right">
              <div className="absolute -right-[17px] top-0 w-8 h-8 rounded-full bg-[#0E434D] border-2 border-brand-light-gold flex items-center justify-center text-[10px] font-black text-white font-sans">٢٠</div>
              <span className="text-xs font-mono font-black text-[#3A9FA3]">2020</span>
              <h4 className="text-base font-black text-brand-light-gold mt-0.5">{isAr ? 'المشاركات الكبيرة' : 'Major Collaborations'}</h4>
              <p className="text-xs text-white/70 mt-1">{isAr ? 'عقود مع كبرى المؤسسات الإماراتية' : 'Contracts with Major UAE Entities'}</p>
            </div>

            {/* محطة 2026 */}
            <div className="relative pr-8 md:pr-12 text-right bg-gradient-to-l from-[#0E434D]/20 to-transparent p-4 rounded-xl border border-white/5">
              <div className="absolute -right-[21px] top-4 w-10 h-10 rounded-full bg-[#0E434D] border-2 border-brand-light-gold shadow-[0_0_15px_rgba(197,168,107,0.4)] flex items-center justify-center text-xs font-black text-brand-light-gold font-sans">٢٦</div>
              <span className="text-xs font-mono font-black text-brand-light-gold animate-pulse">2026 ★</span>
              <h4 className="text-lg font-black text-white mt-0.5">{isAr ? 'الريادة والتمكين' : 'Leadership'}</h4>
              <p className="text-xs sm:text-sm font-medium text-[#3A9FA3] mt-1">{isAr ? 'الاسم الأول في الإمارات العربية المتحدة' : 'The Premier Name across the UAE'}</p>
            </div>

          </div>

        </div>

        {/* 🧱 شبكة كروت القيم الثلاثية الفاخرة (3 كروت متراصة هيدروليكياً بأسفل التصميم) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {values.map((val, idx) => (
            <div 
              key={idx}
              className="rounded-3xl border border-white/10 bg-[#0E434D]/40 backdrop-blur-md p-8 text-center flex flex-col items-center justify-between shadow-xl transition-all duration-500 active:scale-[0.98] lg:hover:border-brand-deep-gold lg:hover:bg-[#0E434D]/60 lg:hover:-translate-y-2 group"
            >
              <div className="mb-5 p-3.5 rounded-2xl bg-[#030F1E]/60 border border-white/5 lg:group-hover:bg-brand-light-gold/10 transition-colors duration-500">
                {val.icon}
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-black text-brand-light-gold">
                  {isAr ? val.titleAr : val.titleEn}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                  {isAr ? val.descAr : val.descEn}
                </p>
              </div>

              {/* معين صغير في أسفل كل كارد مستقر دائمًا على الجوال */}
              <div className="mt-6 w-2 h-2 rotate-45 bg-[#3A9FA3]/50 lg:group-hover:bg-brand-light-gold lg:group-hover:scale-125 transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}