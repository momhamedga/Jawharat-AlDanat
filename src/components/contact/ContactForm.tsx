// src/app/[locale]/contact/_components/ContactForm.tsx
'use strict';
'use client';

import React, { useState, useTransition } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    startTransition(async () => {
      // محاكاة إرسال ومعالجة البيانات قبل ربط الـ Action بـ NeonDB الأسبوع القادم
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-brand-light-gold/40 shadow-[0_15px_40px_rgba(197,160,89,0.05)] text-center space-y-4 py-16 animate-fade-in">
        <div className="w-16 h-16 bg-brand-light-gold/10 text-brand-deep-gold rounded-full flex items-center justify-center mx-auto border border-brand-light-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">
          {isAr ? 'تم استلام رسالتكم بنجاح' : 'Message Received Successfully'}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto font-medium leading-relaxed">
          {isAr 
            ? 'شكراً لتواصلكم معنا. سيتصل بك مسؤول بروتوكول العلاقات العامة لدينا في غضون 15 دقيقة.' 
            : 'Thank you. Our VIP relations coordinator will contact you within 15 minutes.'}
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6 hover:border-brand-light-gold/30 hover:shadow-[0_20px_45px_rgba(197,160,89,0.04)] transition-all duration-300"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* الاسم */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-wide">
            {isAr ? 'الاسم الكريم' : 'Full Name'}
          </label>
          <input 
            type="text" 
            name="name" 
            required 
            placeholder={isAr ? 'محمد الجابري' : 'e.g., John Doe'}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-deep-gold focus:bg-white focus:ring-4 focus:ring-brand-deep-gold/5 transition-all"
          />
        </div>

        {/* الهاتف */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-wide">
            {isAr ? 'رقم الهاتف (واتساب)' : 'Phone Number'}
          </label>
          <input 
            type="tel" 
            name="phone" 
            required 
            placeholder="+971 50 000 0000"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-deep-gold focus:bg-white focus:ring-4 focus:ring-brand-deep-gold/5 transition-all direction-ltr text-left"
          />
        </div>
      </div>

      {/* البريد */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wide">
          {isAr ? 'البريد الإلكتروني' : 'Email Address'}
        </label>
        <input 
          type="email" 
          name="email" 
          required 
          placeholder="name@domain.com"
          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-deep-gold focus:bg-white focus:ring-4 focus:ring-brand-deep-gold/5 transition-all"
        />
      </div>

      {/* الرسالة */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wide">
          {isAr ? 'تفاصيل تطلعاتك أو طلبك' : 'Your Requirements'}
        </label>
        <textarea 
          name="message" 
          rows={4} 
          required 
          placeholder={isAr ? 'كيف يمكن لجوهرة الدانة خدمتك اليوم؟' : 'How can AlDanat assist your elite requirements?'}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-deep-gold focus:bg-white focus:ring-4 focus:ring-brand-deep-gold/5 transition-all resize-none"
        />
      </div>

      {/* زر الإرسال المتدرج بالهوية الموحدة */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-brand-deep-gold to-brand-light-gold text-white text-sm font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,160,89,0.15)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>{isAr ? 'إرسال الطلب الملكي الفوري' : 'Submit Royal Request'}</span>
            <Send className={`w-4 h-4 ${isAr ? 'transform rotate-180' : ''}`} />
          </>
        )}
      </button>

    </form>
  );
}