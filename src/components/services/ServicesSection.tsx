
import Link from 'next/link';

interface ServicesSectionProps {
  locale: string;
}

export default function ServicesSection({ locale }: ServicesSectionProps) {
  // البيانات معربة بالكامل وبدون أي كلمة إنجليزية تماشياً مع طلبك
  const services = [
    {
      id: 'polishing-ceramic',
      titleAr: 'تلميع السيارات وبولیشنج السيراميك',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.907 18M19.102 4.898a3 3 0 114.243 4.243l-13.41 13.41a3 3 0 01-1.29.774l-5.49 1.48a.75.75 0 01-.914-.914l1.48-5.49a3 3 0 01.774-1.29L19.103 4.898zM16.5 7.5l3 3" />
        </svg>
      )
    },
    {
      id: 'paint-protection-ppf',
      titleAr: 'حماية الطلاء والأفلام العازلة',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      id: 'events-conferences',
      titleAr: 'تنظيم الفعالیات والمؤتمرات الكبرى',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 100-12 6 6 0 000 12zM12 15a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      )
    },
    {
      id: 'vip-event-management',
      titleAr: 'إدارة وتنسيق فعاليات كبار الشخصيات',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.443.833-.443 1.006 0l2.122 5.432 5.862.395c.484.033.678.631.313.974l-4.473 4.205 1.34 5.73c.11.472-.406.847-.827.592l-5.143-3.167-5.143 3.167c-.421.256-.937-.12-.827-.592l1.34-5.73L2.32 10.3c-.365-.343-.17-.941.313-.974l5.862-.395 2.122-5.432z" />
        </svg>
      )
    },
    {
      id: 'deep-cleaning-detailing',
      titleAr: 'خدمات التنظيف العمیق والعناية الشاملة',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M5.28 5.28l1.06 1.06M17.66 17.66l1.06 1.06M4.5 19.5l15-15" />
        </svg>
      )
    },
    {
      id: 'heat-insulation-film',
      titleAr: 'العزل الحراري المتطور وحماية الزجاج',
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-deep-gold" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v19.5m6.75-16.5H5.25M17.25 12H6.75m9.75 4.5H7.5" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-28 bg-slate-50 overflow-hidden font-['Cairo'] select-none" dir="rtl">
      
      {/* 🌌 تأثير الإضاءة المحيطية مع المصفوفة المنقطة (Dot Grid Matrix) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-light-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-turquoise/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 👑 هيدر القسم - عربي بالكامل مع المعين الفاخر */}
        <div className="text-center space-y-3 mb-12 md:mb-24 flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-brand-deep-gold bg-brand-light-gold/15 px-4 py-1.5 rounded-full uppercase">
            مجموعة الخدمات الرئيسية
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            شبكة الخدمات الاحترافية
          </h2>
          
          <div className="relative w-40 md:w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-deep-gold/40 to-transparent my-2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-brand-deep-gold border border-brand-light-gold/40 shadow-sm" />
          </div>
          
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl leading-relaxed">
            خدماتنا الأساسية مصممة بعناية فائقة لتلبية تطلعاتكم وتقديم تجربة مستخدم استثنائية متكاملة
          </p>
        </div>

        {/* 🎴 شبكة الكروت (تم ضبط الهوفر ليعمل فقط على الشاشات الكبيرة md:hover لمنع مشاكل اللمس) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.id}`}
              className="group relative rounded-2xl p-6 md:p-8 bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-500 flex flex-col items-center text-center justify-between min-h-[220px] md:min-h-[260px] overflow-hidden cursor-pointer
                         md:hover:scale-[1.03] md:hover:border-brand-light-gold/60 md:hover:shadow-[0_25px_60px_rgba(197,168,107,0.08)]"
            >
              {/* تفتيح حواف مخصص للـ Desktop فقط */}
              <div className="hidden md:block absolute -top-12 -left-12 w-24 h-24 bg-brand-light-gold/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
              
              {/* حاوية الأيقونة الفاخرة */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 shadow-inner
                              md:group-hover:bg-brand-light-gold/10 md:group-hover:border-brand-light-gold/30 md:group-hover:scale-105">
                {service.icon}
              </div>

              {/* العنوان بالعربي الفصيح بخط القاهرة الموزون */}
              <div className="space-y-2 w-full flex-grow flex items-center justify-center">
                <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-snug transition-colors duration-300 md:group-hover:text-brand-deep-gold">
                  {service.titleAr}
                </h3>
              </div>

              {/* رابط "اكتشف المزيد" - يظهر فوراً وثابت على الجوال كإشارة توجيهية، ومتحرك على الديسكتوب */}
              <div className="mt-5 flex items-center gap-1.5 text-xs font-black text-brand-deep-gold transition-all duration-500
                              opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                <span>اكتشف تفاصيل الخدمة</span>
                <svg className="w-3.5 h-3.5 transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}