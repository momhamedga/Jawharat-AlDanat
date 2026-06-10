// src/components/home/OwnerSection.tsx
import React from 'react';
import Image from 'next/image';
import { Crown, Award, Target, Briefcase } from 'lucide-react';

export default function OwnerSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  // كروت الركائز الثلاثة المأخوذة من الكلمات الافتتاحية الحماسية
  const pillars = [
    {
      titleAr: 'رائدة أعمال إماراتية',
      titleEn: 'Emirati Entrepreneur',
      descAr: 'تحويل الأفكار الابتكارية لمشاريع ناجحة ومستدامة تنموياً.',
      descEn: 'Transforming innovative concepts into high-impact businesses.',
      icon: <Crown className="w-5 h-5 text-brand-deep-gold" />
    },
    {
      titleAr: 'مستشا استراتيجية',
      titleEn: 'Strategic Consultant',
      descAr: 'تقديم حلول استشارية متكاملة لتطوير الأداء المؤسسي.',
      descEn: 'Providing integrated advisory to elevate corporate performance.',
      icon: <Briefcase className="w-5 h-5 text-brand-deep-teal" />
    },
    {
      titleAr: 'مدربة وممكّنة كفاءات',
      titleEn: 'Certified Executive Trainer',
      descAr: 'صقل مهارات الجيل القادم ونقل المعارف والخبرات العميقة.',
      descEn: 'Empowering future leaders with profound sustainable knowledge.',
      icon: <Award className="w-5 h-5 text-brand-turquoise" />
    }
  ];

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌌 خلفيات وهالات مضيئة ناعمة تبرز فخامة القسم بدون إزعاج بصري */}
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-brand-light-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-deep-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 📸 الجانب الأول: عرض الصورة الاحترافي المبهر (صورة الدكتورة) */}
          <div className="col-span-1 lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-[2.5rem] p-3 bg-gradient-to-br from-brand-light-gold/30 via-slate-100 to-brand-deep-teal/10 border border-slate-200/60 shadow-[0_30px_70px_rgba(3,15,30,0.05)] group">
              
              {/* حاوية الصورة الداخلية الملتفة */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-50 border border-white">
                <Image
                  src="/images/owner.webp"
                  alt="الدكتورة حمامه القبيسي"
                  fill
                  sizes="(max-w-md) 100vw, 35vw"
                  className="object-cover object-center transition-transform duration-700 lg:group-hover:scale-103"
                  priority
                />
                {/* طبقة حماية لونية شفافة وسفلية */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 via-transparent to-transparent" />
              </div>

              {/* 🎯 البطاقة العائمة الذكية (Glassmorphic Badge) - تمنح عمقاً إبداعياً رائعاً */}
              <div className="absolute bottom-8 -right-4 sm:-right-6 bg-white/90 backdrop-blur-md border border-brand-light-gold rounded-2xl py-3 px-5 shadow-[0_15px_35px_rgba(197,168,107,0.2)] flex items-center gap-3 transition-transform duration-500 lg:group-hover:translate-x-1">
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-light-gold shadow-sm">
                  <Target className="w-5 h-5 animate-pulse" />
                </div>
             <div className={isAr ? 'text-right' : 'text-left'}>
  {isAr ? (
    <>
      <span className="block text-[10px] font-black text-brand-turquoise uppercase tracking-wider font-['Cairo']">قائدة ملهمة</span>
      <span className="block text-xs font-black text-brand-bg mt-0.5 font-['Cairo']">رؤية مستقبلية طموحة</span>
    </>
  ) : (
    <>
      <span className="block text-[10px] font-black text-brand-turquoise uppercase tracking-wider font-sans">Visionary Leader</span>
      <span className="block text-xs font-black text-brand-bg mt-0.5 font-sans">Ambitious Future Vision</span>
    </>
  )}
</div>
              </div>

              {/* إطار هندسي زخرفي خلف الكارت لإعطاء طابع ملوكي */}
              <div className="absolute -inset-1 border border-brand-deep-gold/20 rounded-[2.6rem] -z-10 pointer-events-none transition-transform duration-500 lg:group-hover:scale-[1.015]" />
            </div>
          </div>

          {/* 📝 الجانب الثاني: المحتوى النصي الفخم والركائز الإستراتيجية */}
          <div className="col-span-1 lg:col-span-7 space-y-8 text-center lg:text-right order-1 lg:order-2">
            
    {/* 👑 هيدر قسم التعريف الفاخر - موحد هندسياً وبصرياً مع هوية البراند الكريستالية */}
<div className="text-center space-y-3 mb-12 md:mb-20 flex flex-col items-center">
  
  {/* شارة النموذج الملهم بالخلفية الزجاجية */}
  <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-brand-deep-gold bg-brand-light-gold/15 px-4 py-1.5 rounded-full uppercase">
    {isAr ? 'نموذج إماراتي ملهم' : 'Inspirational Emirati Model'}
  </span>
  
  {/* اسم الدكتورة باللون البلاتيني الناصع المتناقض مع الخلفية الداكنة */}
  <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black text-brand-bg tracking-tight leading-tight ${!isAr && 'font-sans'}`}>
    {isAr ? 'الدكتورة حمامه القبيسي' : 'Dr. Hamama Al Qubaisi'}
  </h2>
  
  {/* 💎 الفاصل الملوكي الموحد (المعين الفاخر والخط المتدرج المذهب) */}
  <div className="relative w-40 md:w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-deep-gold/40 to-transparent my-2 flex items-center justify-center">
    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-brand-deep-gold border border-brand-light-gold/40 shadow-sm animate-pulse" />
  </div>
  
  {/* الألقاب الاستراتيجية مصممة بلغة الـ Premium Corporate Design */}
  <p className={`text-xs sm:text-sm font-semibold text-slate-400 max-w-xl leading-relaxed flex items-center justify-center gap-2 flex-wrap ${!isAr && 'font-sans'}`}>
    {isAr ? (
      <>
        <span>مدربة معتمدة</span>
        <span className="text-brand-bg font-light">/</span>
        <span>مستشارة استراتيجية</span>
        <span className="text-brand-bg font-light">/</span>
        <span>رائدة أعمال إماراتية</span>
      </>
    ) : (
      <>
        <span>Executive Trainer</span>
        <span className="text-brand-bg font-light">/</span>
        <span>Strategic Consultant</span>
        <span className="text-brand-bg font-light">/</span>
        <span>Emirati Entrepreneur</span>
      </>
    )}
  </p>
</div>

            {/* النص السردي المكتوب بصياغة بليغة ومريحة جداً في القراءة */}
            <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {isAr 
                ? 'تجسد نموذجاً رائداً للمرأة الإماراتية الملهمة في قطاع المال والأعمال، وصوتاً مؤثراً كـ سيدة أعمال ومستشارة ومدربة استراتيجية تمتلك رؤية مستقبلية طموحة. تميزت مسيرتها المهنية بالقدرة على تحويل الأفكار الابتكارية إلى مشاريع ناجحة، إلى جانب تقديم حلول استشارية متكاملة وبرامج تدريبية متطورة تهدف إلى تمكين الكفاءات وتطوير الأداء المؤسسي. تلتزم الدكتورة حمامه بدعم التوجهات التنموية لدولة الإمارات من خلال نقل معارفها وخبراتها العميقة لصقل مهارات الجيل القادم من رواد الأعمال وتوجيههم نحو بناء مشاريع مستدامة وقادرة على المنافسة.'
                : 'Embodying a pioneering model for inspiring Emirati women in finance and business. As an influential businesswoman, consultant, and strategic trainer, she holds an ambitious future vision, transforming innovative ideas into successful enterprises while committing to the UAE development paths.'
              }
            </p>

            {/* 🎴 كروت الركائز الهندسية الثلاثة المتجاوبة بالكامل لكسر جمود النصوص */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-right">
              {pillars.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100/70 shadow-sm flex flex-col items-center sm:items-start text-center sm:text-right space-y-3 transition-all duration-300 hover:bg-white hover:border-brand-deep-gold/40 hover:shadow-md group"
                >
                  {/* حاوية الأيقونة التفاعلية الناعمة */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-brand-bg group-hover:text-brand-deep-teal transition-colors duration-300">
                      {isAr ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400 leading-tight">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}