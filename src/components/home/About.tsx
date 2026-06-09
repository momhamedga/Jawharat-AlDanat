import Image from "next/image";

export default function About({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  return (
    <section className="relative w-full bg-slate-50 py-16 lg:py-24 overflow-hidden font-['Cairo'] select-none">
      
      {/* هالة ضوئية خلفية خفيفة (Ambient Backdrop) متناسقة مع معايير التصميم الفاتح */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        
        {/* 👑 الهيدر العلوي للقسم (عن الشركة والرؤية والقيم) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-brand-deep-teal/10 pb-6 mb-12 gap-4">
          <div className="text-center md:text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-bg tracking-tight">
              {isAr ? 'عن الشركة والرؤية والقيم' : 'About Us, Vision & Values'}
            </h2>
            <p className="text-xs md:text-sm font-bold text-brand-platinum mt-2 tracking-wide uppercase">
              {isAr ? 'جوهرة الدانة • رؤية صلبة وقيم راسخة' : 'About Us • Vision • Values'}
            </p>
          </div>
          
          {/* خط التزيين الملوكي اللامع المنتهي بنجمة كريستالية */}
          <div className="hidden md:flex items-center gap-3 flex-grow max-w-md mx-8">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-deep-gold to-brand-light-gold flex-grow" />
            <span className="text-brand-deep-gold text-lg">✦</span>
          </div>
        </div>

        {/* 🧱 شبكة الكروت الرئيسية (المخطط العلوي المكون من 4 أعمدة متجاوبة) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* 1. كارد الصورة الهندسية الجانبية (4 أعمدة على الشاشات الكبيرة) */}
<div className="lg:col-span-3 min-h-[320px] rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(14,67,77,0.05)] border-4 border-white bg-white relative group">
  <Image 
    src="/images/about.webp" // تم تعديل المسار هنا ليتطابق مع ملفك الفعلي
    alt="Jawharat Al Danat Team" 
    fill
    sizes="(max-width: 1024px) 100vw, 25vw"
    priority
    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/15 via-transparent to-transparent pointer-events-none" />
</div>

          {/* 2. كارد القصة والتأسيس (3 أعمدة) */}
          <div className="lg:col-span-3 flex flex-col justify-between rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)] transition-all duration-300 hover:border-brand-turquoise/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-brand-bg flex items-center gap-2">
                  <span className="text-brand-deep-gold text-base">✒️</span>
                  {isAr ? 'القصة' : 'The Story'}
                </h3>
                <span className="px-3 py-1 text-[10px] font-black text-brand-turquoise bg-brand-turquoise/10 rounded-lg">
                  {isAr ? 'التأسيس' : 'Founded'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-deep-gold mb-3 font-sans">
                {isAr ? 'أبوظبي • 2025' : 'Abu Dhabi • 2025'}
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-brand-deep-teal/80 leading-relaxed mt-2">
              {isAr 
                ? 'انطلقت جوهرة الدانة برؤية واضحة لتقديم خدمات الفخامة والتميز في قطاعي الفعاليات والسيارات بمعايير عالمية.' 
                : 'Jawharat Al Danat was launched with a clear vision to deliver premium luxury services in both official events and elite automotive sectors with world-class standards.'}
            </p>
          </div>

          {/* 3. كارد الأرقام والإنجازات (3 أعمدة مع خطوط تقسيم ميتاليك) */}
          <div className="lg:col-span-3 rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-brand-bg">{isAr ? 'الأرقام' : 'Stats'}</h3>
              <span className="px-3 py-1 text-[10px] font-black text-brand-deep-gold bg-brand-deep-gold/10 rounded-lg">
                {isAr ? 'الإنجازات' : 'Achievements'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative h-[calc(100%-3rem)]">
              {/* خطوط التقسيم المتقاطعة النظيفة المأخوذة من المخطط الهيكلي */}
              <div className="absolute left-1/2 top-0 bottom-4 w-[1px] bg-brand-deep-teal/10 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-deep-teal/10 -translate-y-1/2" />

              <div className="flex flex-col items-center justify-center text-center pb-2">
                <span className="text-xl font-black font-sans text-brand-bg">+500</span>
                <span className="text-[11px] font-bold text-brand-platinum mt-0.5">{isAr ? 'عميل راضٍ' : 'Satisfied Clients'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pb-2">
                <span className="text-xl font-black font-sans text-brand-bg">+100</span>
                <span className="text-[11px] font-bold text-brand-platinum mt-0.5">{isAr ? 'فعالية ناجحة' : 'Successful Events'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pt-2">
                <span className="text-xl font-black font-sans text-brand-bg">+1000</span>
                <span className="text-[11px] font-bold text-brand-platinum mt-0.5">{isAr ? 'سيارة فاخرة' : 'Luxury Cars'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center pt-2">
                <span className="text-xl font-black font-sans text-brand-bg">+02</span>
                <span className="text-[11px] font-bold text-brand-platinum mt-0.5">{isAr ? 'سنوات ذهبية' : 'Golden Years'}</span>
              </div>
            </div>
          </div>

          {/* 4. كارد القيم الراسخة (3 أعمدة مع فواصل ميتاليك مبهرة ونجمية) */}
          <div className="lg:col-span-3 flex flex-col justify-between rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-brand-bg">{isAr ? 'القيم' : 'Values'}</h3>
              <span className="px-3 py-1 text-[10px] font-black text-brand-turquoise bg-brand-turquoise/10 rounded-lg">
                {isAr ? 'قيمتنا' : 'Our Essence'}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* القيمة الأولى */}
              <div className="flex items-start gap-2.5">
                <span className="text-brand-deep-gold text-xs mt-1">✦</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-brand-bg">{isAr ? 'الجودة أولاً' : 'Quality First'}</h4>
                  <p className="text-[11px] font-medium text-brand-platinum mt-0.5">{isAr ? 'نلتزم بأعلى المعايير في كل تفصيل' : 'We commit to the highest touch in every detail.'}</p>
                </div>
              </div>
              <div className="h-[1px] bg-brand-deep-teal/10 w-full" />
              
              {/* القيمة الثانية */}
              <div className="flex items-start gap-2.5">
                <span className="text-brand-turquoise text-xs mt-1">✦</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-brand-bg">{isAr ? 'العميل في القلب' : 'Client Centric'}</h4>
                  <p className="text-[11px] font-medium text-brand-platinum mt-0.5">{isAr ? 'رضاكم هو مقياس نجاحنا الحقيقي' : 'Your absolute satisfaction measures our success.'}</p>
                </div>
              </div>
              <div className="h-[1px] bg-brand-deep-teal/10 w-full" />

              {/* القيمة الثالث */}
              <div className="flex items-start gap-2.5">
                <span className="text-brand-deep-gold text-xs mt-1">✦</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-brand-bg">{isAr ? 'الالتزام والدقة' : 'Precision & Punctuality'}</h4>
                  <p className="text-[11px] font-medium text-brand-platinum mt-0.5">{isAr ? 'نُنجز ما يُعد به في الوقت المحدد' : 'Delivering exactly what is promised, right on time.'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 📑 المخطط السفلي العريض: كارد الرؤية والرسالة المتساويين هيدروليكياً */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* كارد الرسالة الفخمة */}
          <div className="rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)] flex flex-col justify-between transition-all duration-300 hover:border-brand-deep-gold/30">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-[10px] font-black text-brand-turquoise bg-brand-turquoise/10 rounded-lg">
                {isAr ? 'رسالتنا' : 'Our Mission'}
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-black text-brand-bg leading-relaxed">
              {isAr 
                ? 'صنع تجارب استثنائية تجمع بين الفخامة والاحترافية، لنكون الخيار الأول لكل من يبحث عن التميز في الإمارات.' 
                : 'Crafting exceptional experiences that blend absolute luxury with master professionalism, to remain the premier choice for elite excellence within the UAE.'}
            </p>
          </div>

          {/* كارد الرؤية المستقبلية */}
          <div className="rounded-3xl border border-brand-deep-teal/10 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(14,67,77,0.02)] flex flex-col justify-between transition-all duration-300 hover:border-brand-turquoise/30">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-[10px] font-black text-brand-deep-gold bg-brand-deep-gold/10 rounded-lg">
                {isAr ? 'رؤيتنا' : 'Our Vision'}
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-black text-brand-bg leading-relaxed">
              {isAr 
                ? 'أن نكون العلامة الأبرز في إدارة الفعاليات والعناية بالسيارات على مستوى دولة الإمارات العربية المتحدة بحلول 2031.' 
                : 'To become the most prominent trademark in high-end event management and bespoke automotive care across the United Arab Emirates by 2031.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}