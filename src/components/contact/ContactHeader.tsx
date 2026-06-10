// src/app/[locale]/contact/_components/ContactHeader.tsx
import React from 'react';

export default function ContactHeader({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
      
      {/* 🏷️ الـ Badge الكريمي الملكي الموحد باستخدام الـ Tokens الخاصة بك */}
      <span className="inline-flex items-center justify-center bg-brand-light-gold/15 px-5 py-1.5 rounded-full text-brand-deep-gold text-xs font-bold tracking-wide">
        {isAr ? 'بروتوكول تواصل فوري' : 'Instant Protocol Contact'}
      </span>
      
      {/* 🏛️ العنوان الموحد بالوزن العريض الصارم والألوان المتناسقة */}
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight pt-1">
        {isAr ? 'تواصل مع جوهرة الدانة' : 'Connect with Jawharat AlDanat'}
      </h1>
      
      {/* 📜 الوصف الفرعي الأصلي ممتد بنعومة */}
      <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
        {isAr 
          ? 'نحن هنا لتلبية تطلعاتك وتقديم خدماتنا الملكية على مدار الساعة' 
          : 'We are here to fulfill your aspirations with 24/7 royal services'}
      </p>
      
      {/* 🔶 الفاصل الهندسي الفاخر (Diamond Divider) المعتمد في الصورة باستخدام الـ brand-deep-gold */}
      <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto mt-6">
        <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-brand-deep-gold/40" />
        <div className="w-2.5 h-2.5 bg-brand-deep-gold rotate-45 transform flex-shrink-0 rounded-[1px]" />
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-brand-deep-gold/40" />
      </div>

    </div>
  );
}