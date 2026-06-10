// src/components/layout/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: isAr ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { label: isAr ? 'عن الشركة' : 'About', href: `/${locale}/about` },
    { label: isAr ? 'الخدمات' : 'Services', href: `/${locale}/services` },
    { label: isAr ? 'عملاؤنا' : 'Clients', href: `/${locale}/clients` },
    { label: isAr ? 'مدونة' : 'Blog', href: `/${locale}/blog` },
    { label: isAr ? 'انضم لفريقنا' : 'Join Us', href: `/${locale}/join` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 🌟 هيدر زجاجي فاخر بلون البراند الداكن مدمج بنسبة شفافية كريستالية وبدون أي لون أبيض صريح */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-brand-bg/85 backdrop-blur-xl border-brand-turquoise/20 shadow-[0_4px_30px_rgba(3,15,30,0.4)] h-16' 
            : 'bg-brand-bg/99 backdrop-blur-md border-brand-deep-teal/20 h-20'
        }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-16">
<Link href={`/${locale}`} className="flex items-center gap-3 select-none group">
  <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(197,168,107,0.2)]">
    <Image
      src="/images/logo.webp"
      alt="Jawharat AlDanat Logo"
      fill
      priority
      className="object-contain"
    />
  </div>

  {/* النصوص المرافقة للشعار */}
  <div className="flex flex-col items-start">
    <span className="text-lg md:text-xl font-black tracking-tight bg-gradient-to-r from-brand-deep-gold to-brand-light-gold bg-clip-text text-transparent drop-shadow-sm">
      JD
    </span>
    <span className="text-[10px] md:text-xs text-brand-light-gold font-bold tracking-wide transition-colors group-hover:text-brand-turquoise">
      {isAr ? 'جوهرة الدانة' : 'Jawharat Al Danat'}
    </span>
  </div>
</Link>

          {/* 💻 روابط الديسك توب بتباين مدروس؛ تيركواز ناعم للحالة العادية وذهبي مشع للنشط */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  className={`text-xs md:text-sm font-black tracking-wide transition-all duration-300 relative py-1 group ${
                    isActive ? 'text-brand-deep-gold' : 'text-brand-turquoise/80 hover:text-brand-light-gold'
                  }`}
                >
                  {item.label}
                  {/* خط تفاعلي سفلي يندمج بانسيابية بين درجات ثيمك الفاخر */}
                  <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-deep-gold via-brand-light-gold to-brand-turquoise transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* 🔘 الأزرار والتحكم المتجاوب */}
          <div className="flex items-center gap-4">
            
            {/* زر الحجز بالتدرج الذهبي المتناسق بالكامل مع لون الخلفية الأساسي الداكن */}
            <Link 
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-brand-deep-gold to-brand-light-gold text-brand-bg font-black text-xs md:text-sm rounded-xl shadow-[0_4px_20px_rgba(197,168,107,0.25)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Link>

            {/* زر Hamburger ذكي بلون معزز من درجات البراند بدون خلفيات بيضاء نهائياً */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex lg:hidden flex-col items-center justify-center w-10 h-10 rounded-xl bg-brand-deep-teal/30 border border-brand-turquoise/20 shadow-sm focus:outline-none z-50 relative"
              aria-label="Toggle Menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-[2px] w-full bg-brand-light-gold rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`h-[2px] w-full bg-brand-light-gold rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-[2px] w-full bg-brand-light-gold rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 translate-y-[-6px]' : ''}`} />
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* 📱 قائمة الموبايل المنزلقة بوضوحها الفاخر والممتد مع إلغاء الخلفيات البيضاء */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* تعتيم زجاجي ناعم للغاية مستوحى من لون الـ brand-bg الخارجي */}
        <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        {/* جسم القائمة المنزلقة مبني بالكامل على لون الـ brand-bg الداكن الفخم مع ضبط البوردر المتجاوب بشكل صحيح */}
        <div className={`fixed top-0 bottom-0 w-[280px] sm:w-[320px] bg-brand-bg/95 backdrop-blur-2xl shadow-[-5px_0_40px_rgba(3,15,30,0.6)] border-brand-deep-teal/30 p-6 pt-28 flex flex-col justify-between transition-transform duration-500 ease-out z-50 ${
          isAr 
            ? (isOpen ? 'right-0' : '-right-full') 
            : (isOpen ? 'left-0' : '-left-full')
        } ${isAr ? 'border-l' : 'border-r'}`}>
          
          <div className="flex flex-col gap-4">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`text-sm sm:text-base font-black p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-deep-gold/15 to-brand-light-gold/5 text-brand-deep-gold border-s-2 border-brand-deep-gold' 
                      : 'text-brand-turquoise hover:bg-brand-deep-teal/20 hover:text-brand-light-gold'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-brand-deep-teal/20 sm:hidden">
            <Link
              href={`/${locale}/contact`}
              className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-brand-deep-gold to-brand-light-gold text-brand-bg font-black text-sm rounded-xl shadow-[0_4px_15px_rgba(197,168,107,0.3)]"
            >
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}