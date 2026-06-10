// src/components/clients/ClientsSection.tsx
import React from 'react';
import { 
  Building2, 
  PlaneTakeoff, 
  Droplets, 
  HeartHandshake, 
  ShoppingBag, 
  Quote, 
  Star,
  MapPin
} from 'lucide-react';

interface ClientsSectionProps {
  locale: string;
}

export default function ClientsSection({ locale }: ClientsSectionProps) {
  const isAr = locale === 'ar';

  // 1. بيانات الشركاء الاستراتيجيين مستوحاة بدقة من الصورة الأولى مع أيقونات معبرة
  const strategicPartners = [
    {
      id: 'fab',
      titleAr: 'بنك أبوظبي الأول',
      titleEn: 'First Abu Dhabi Bank',
      tagAr: 'مالي',
      tagEn: 'Financial',
      descAr: 'مؤتمرات وملتقيات رفيعة المستوى',
      descEn: 'High-Level Conferences & Forums',
      icon: <Building2 className="w-6 h-6 md:w-7 h-7 text-brand-deep-gold" strokeWidth={1.2} />
    },
    {
      id: 'etihad',
      titleAr: 'الاتحاد للطيران',
      titleEn: 'Etihad Airways',
      tagAr: 'شركات كبرى',
      tagEn: 'Corporate',
      descAr: 'خدمات سيارات وبروتوكولات فاخرة',
      descEn: 'Luxury Car & Protocol Services',
      icon: <PlaneTakeoff className="w-6 h-6 md:w-7 h-7 text-brand-deep-gold" strokeWidth={1.2} />
    },
    {
      id: 'adnoc',
      titleAr: 'أدنوك',
      titleEn: 'ADNOC',
      tagAr: 'حكومي',
      tagEn: 'Government',
      descAr: 'تنظيم الفعاليات الرسمية السنوية',
      descEn: 'Annual Official Events Management',
      icon: <Droplets className="w-6 h-6 md:w-7 h-7 text-brand-deep-gold" strokeWidth={1.2} />
    },
    {
      id: 'emirates-foundation',
      titleAr: 'مؤسسة الإمارات',
      titleEn: 'Emirates Foundation',
      tagAr: 'حكومي',
      tagEn: 'Government',
      descAr: 'خدمات الضيافة الدبلوماسية والبروتوكول',
      descEn: 'Diplomatic Hospitality & Protocol',
      icon: <HeartHandshake className="w-6 h-6 md:w-7 h-7 text-brand-deep-gold" strokeWidth={1.2} />
    },
    {
      id: 'majid-al-futtaim',
      titleAr: 'ماجد الفطيم',
      titleEn: 'Majid Al Futtaim',
      tagAr: 'تجاري',
      tagEn: 'Retail',
      descAr: 'إدارة وتنسيق الفعاليات الجماهيرية',
      descEn: 'Mass Event Management & Coordination',
      icon: <ShoppingBag className="w-6 h-6 md:w-7 h-7 text-brand-deep-gold" strokeWidth={1.2} />
    }
  ];

  // 2. بيانات آراء العملاء مستوحاة بدقة من الصورة الثانية مع تفاصيل هندسية صافية
  const testimonials = [
    {
      id: 'saeed',
      nameAr: 'سعيد المنصوري',
      nameEn: 'Saeed Al Mansoori',
      roleAr: 'مدير تنفيذي',
      roleEn: 'Executive Director',
      commentAr: 'الاحترافية والدقة في التفاصيل لا مثيل لها، جودة دائمة نلمسها في كل مناسباتنا الرسمية.',
      commentEn: 'Unmatched professionalism and attention to detail. Consistent quality felt in all our official events.',
      avatarInitials: 'SM',
      avatarBg: 'bg-slate-100 border-slate-200 text-slate-700'
    },
    {
      id: 'noura',
      nameAr: 'نورة الكتيبي',
      nameEn: 'Noura Al Kutbi',
      roleAr: 'مالكة سيارات فاخرة',
      roleEn: 'Luxury Car Owner',
      commentAr: 'سيارتي في أيدٍ أمينة دائماً؛ الخدمة احترافية فائقة وسرعة التلبية تفوق كل التوقعات.',
      commentEn: 'My car is always in safe hands; super professional service and responsiveness beyond expectations.',
      avatarInitials: 'NK',
      avatarBg: 'bg-brand-light-gold/15 border-brand-light-gold/30 text-brand-deep-gold'
    },
    {
      id: 'khaled',
      nameAr: 'خالد الشامسي',
      nameEn: 'Khaled Al Shamsi',
      roleAr: 'ممثل مؤسسة حكومية',
      roleEn: 'Government Entity Rep',
      commentAr: 'يلتزمون دائماً بأعلى المعايير العالمية؛ شريك استراتيجي موثوق نعتمد عليه في أدق معاملاتنا.',
      commentEn: 'Always committing to the highest global standards; a trusted strategic partner for our critical operations.',
      avatarInitials: 'KS',
      avatarBg: 'bg-brand-turquoise/10 border-brand-turquoise/20 text-brand-turquoise'
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-slate-50 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🔮 هالات إضاءة ديناميكية فاتحة وخلفية منقطة تعطي طابعاً حياً وعميقاً */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-light-gold/15 to-transparent rounded-full blur-[130px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-turquoise/5 rounded-full blur-[140px]" />
        {/* شبكة هندسية منقطة فائقة النقاء لجمالية الواجهة الفاتحة */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">
        
        {/* 🏛️ الجزء الأول: شبكة الشركاء الاستراتيجيين */}
        <div>
          <div className="text-center space-y-4 mb-16 md:mb-24 flex flex-col items-center">
            <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-brand-deep-gold bg-brand-light-gold/15 px-4 py-1.5 rounded-full uppercase">
              {isAr ? 'حضور فعال في أرجاء الإمارات' : 'Active Presence Across the UAE'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {isAr ? 'شركاؤنا الاستراتيجيون' : 'Strategic Partners & Trusted Clients'}
            </h2>
            <div className="relative w-44 h-[1px] bg-gradient-to-r from-transparent via-brand-deep-gold/50 to-transparent my-1 flex items-center justify-center">
              <div className="w-2 h-2 rotate-45 bg-brand-deep-gold border border-brand-light-gold/40 shadow-sm" />
            </div>
          </div>

          {/* شبكة توزيع الكروت: متجاوبة تماماً (كارت واحد في الموبايل، 2 في التابلت، 3 في الشاشات الكبيرة) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {strategicPartners.map((partner) => (
              <div
                key={partner.id}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col items-center justify-between min-h-[250px] text-center overflow-hidden
                           md:hover:scale-[1.03] md:hover:border-brand-light-gold/50 md:hover:shadow-[0_30px_70px_rgba(197,168,107,0.08)]"
              >
                {/* نمط ديكوري داخلي في زوايا الكرت يعطي تفاصيل إضافية مريحة للعين */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full z-0 pointer-events-none" />
                
                <div className="space-y-5 w-full relative z-10 flex flex-col items-center">
                  {/* الدائرة الحاضنة للأيقونة: ملوّنة وثابتة للموبايل، وتتفاعل وتكبر عند الـ hover على الكمبيوتر فقط */}
                  <div className="w-14 h-14 rounded-xl bg-brand-light-gold/10 border border-brand-light-gold/20 flex items-center justify-center shadow-inner transition-all duration-500
                                  md:group-hover:bg-brand-light-gold/20 md:group-hover:border-brand-light-gold/40 md:group-hover:scale-105">
                    {partner.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight transition-colors duration-300 md:group-hover:text-brand-deep-gold">
                      {isAr ? partner.titleAr : partner.titleEn}
                    </h3>
                    
                    {/* شارة التصنيف الفريدة: تظهر واضحة ومقروءة وثابتة على الموبايل */}
                    <span className="inline-block px-3.5 py-1 text-[11px] font-black rounded-md bg-slate-100 text-slate-500 border border-slate-200/60 tracking-wider transition-all duration-300
                                     md:group-hover:bg-brand-light-gold/15 md:group-hover:text-brand-deep-gold md:group-hover:border-brand-light-gold/20">
                      {isAr ? partner.tagAr : partner.tagEn}
                    </span>
                  </div>
                </div>

                {/* الوصف السفلي */}
                <p className="text-xs sm:text-sm font-bold text-slate-400 mt-6 pt-4 border-t border-slate-100 w-full relative z-10 transition-colors duration-300 md:group-hover:text-brand-turquoise">
                  {isAr ? partner.descAr : partner.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ⭐️ الجزء الثاني: آراء وتقييمات العملاء */}
        <div>
          <div className="text-center space-y-4 mb-16 md:mb-24 flex flex-col items-center">
            <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-brand-turquoise bg-brand-turquoise/10 px-4 py-1.5 rounded-full uppercase">
              {isAr ? 'ثقة تتوارثها الأجيال' : 'A Legacy Of Absolute Trust'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isAr ? 'آراء عملائنا هي أعظم جائزة نحملها' : 'Client Testimonials & Reviews'}
            </h2>
            <div className="relative w-44 h-[1px] bg-gradient-to-r from-transparent via-brand-turquoise/40 to-transparent my-1 flex items-center justify-center">
              <div className="w-2 h-2 rotate-45 bg-brand-turquoise border border-brand-turquoise/30 shadow-sm" />
            </div>
          </div>

          {/* شبكة عرض كروت التقييمات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 md:p-8 bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-500 flex flex-col items-center justify-between min-h-[320px] text-center overflow-hidden
                           md:hover:scale-[1.03] md:hover:border-brand-light-gold/50 md:hover:shadow-[0_25px_60px_rgba(0,0,0,0.04)]"
              >
                {/* علامة الاقتباس الفاخرة المدمجة بشكل ناعم وواضح في المظهر الفاتح */}
                <div className="text-brand-light-gold/40 transition-transform duration-500 md:group-hover:scale-110">
                  <Quote className="w-8 h-8 fill-current" strokeWidth={1} />
                </div>

                {/* نص الرأي المصاغ بدقة واحترافية متناهية */}
                <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed my-6 flex-grow flex items-center justify-center relative z-10">
                  {isAr ? item.commentAr : item.commentEn}
                </p>

                {/* الحاوية السفلية لبيانات العميل الحقيقي */}
                <div className="space-y-4 w-full pt-6 border-t border-slate-100 relative z-10">
                  
                  {/* النجوم الذهبية اللامعة لتقييم الـ 5 نجوم (ثابتة وجذابة على الموبايل والكمبيوتر) */}
                  <div className="flex items-center justify-center gap-0.5 text-brand-deep-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    {/* الصورة الرمزية الهندسية النظيفة بألوانها الصافية، تعطي تفاصيل غنية بدون ثقل في التصفح */}
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-black tracking-wider shadow-sm ${item.avatarBg}`}>
                      {item.avatarInitials}
                    </div>
                    
                    <div>
                      <h4 className="text-base font-black text-slate-800 transition-colors duration-300 md:group-hover:text-brand-deep-gold">
                        {isAr ? item.nameAr : item.nameEn}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400">
                        {isAr ? item.roleAr : item.roleEn}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🗺️ شريط توثيق الحضور الجغرافي الفاخر أسفل الصفحة لربط التصاميم معاً */}
        <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.005)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-turquoise/10 flex items-center justify-center text-brand-turquoise">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-slate-700">
              {isAr ? 'نطاق التغطية الشاملة:' : 'Comprehensive Coverage Area:'} 
              <span className="text-slate-400 font-bold mr-1">{isAr ? 'أبوظبي • دبي • الشارقة • العين' : 'Abu Dhabi • Dubai • Sharjah • Al Ain'}</span>
            </p>
          </div>
          <span className="text-[9px] font-black text-brand-deep-gold bg-brand-light-gold/15 px-3 py-1 rounded-md tracking-wider">
            {isAr ? 'امتياز ملكي معتمد' : 'Certified Royal Excellence'}
          </span>
        </div>

      </div>
    </section>
  );
}