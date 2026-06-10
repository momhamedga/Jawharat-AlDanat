// src/app/[locale]/contact/_components/ContactInfo.tsx
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactInfo({ locale }: { locale: string }) {
  const isAr = locale === 'ar';

  const dict = {
    hq: isAr ? 'المقر الرئيسي (أبوظبي)' : 'Headquarters (Abu Dhabi)',
    hqAddress: isAr ? 'برج الدانة، قلب منطقة الأعمال، أبوظبي، الإمارات' : 'AlDanat Tower, Business District, Abu Dhabi, UAE',
    dubaiBranch: isAr ? 'فرع دبي' : 'Dubai Branch',
    dubaiAddress: isAr ? 'شارع الشيخ زايد، دبي، الإمارات العربية المتحدة' : 'Sheikh Zayed Road, Dubai, United Arab Emirates',
    phone: isAr ? 'الهاتف الموحد' : 'Unified Phone',
    email: isAr ? 'البريد الإلكتروني' : 'Official Email',
    hours: isAr ? 'ساعات العمل' : 'Operational Hours',
    hoursVal: isAr ? 'على مدار الساعة 24/7' : '24/7 Royal Availability'
  };

  return (
    <div className="space-y-6">
      {/* كارت فرع أبوظبي الملكي */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-brand-light-gold/40 hover:shadow-[0_20px_45px_rgba(197,160,89,0.05)] transition-all duration-300 group">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-light-gold/10 rounded-2xl text-brand-deep-gold group-hover:bg-brand-deep-gold group-hover:text-white transition-colors duration-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">{dict.hq}</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{dict.hqAddress}</p>
          </div>
        </div>
      </div>

      {/* كارت فرع دبي الملكي */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-brand-light-gold/40 hover:shadow-[0_20px_45px_rgba(197,160,89,0.05)] transition-all duration-300 group">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-light-gold/10 rounded-2xl text-brand-deep-gold group-hover:bg-brand-deep-gold group-hover:text-white transition-colors duration-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900">{dict.dubaiBranch}</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{dict.dubaiAddress}</p>
          </div>
        </div>
      </div>

      {/* كارت البيانات الموحد (الهاتف، البريد، ساعات العمل) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
        
       <div className="flex items-center gap-4 group">
  <div className="p-3 bg-slate-50 rounded-xl text-brand-deep-gold border border-slate-100">
    <Phone className="w-4 h-4" />
  </div>
  <div>
    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{dict.phone}</p>
    {/* إضافة direction-ltr و isolate لضمان استقرار الرقم */}
    <Link 
      href="tel:+971544118809" 
      className="text-sm sm:text-base font-black text-slate-800 hover:text-brand-deep-gold transition-colors block text-left"
      style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
    >
      +971 54 411 8809
    </Link>
  </div>
</div>

        {/* البريد الإلكتروني الموحد */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-slate-50 rounded-xl text-brand-deep-gold border border-slate-100">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{dict.email}</p>
            <Link href="mailto:info@mohamedjimmy.com" className="text-sm sm:text-base font-black text-slate-800 hover:text-brand-deep-gold transition-colors block">
                       info@jawaharat-aldana.com

            </Link>
          </div>
        </div>

        {/* ساعات العمل */}
        <div className="flex items-center gap-4 group pt-4 border-t border-slate-100">
          <div className="p-3 bg-brand-light-gold/10 rounded-xl text-brand-deep-gold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{dict.hours}</p>
            <p className="text-sm font-black text-brand-deep-gold">{dict.hoursVal}</p>
          </div>
        </div>

      </div>
    </div>
  );
}