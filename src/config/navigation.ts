// src/config/navigation.ts

export interface NavItem {
  key: string;
  path: string;
  labelAr: string;
  labelEn: string;
}

export const mainNavItems: NavItem[] = [
  { key: 'home', path: '', labelAr: 'الرئيسية', labelEn: 'Home' },
  { key: 'about', path: '/about', labelAr: 'عن الشركة', labelEn: 'About Us' },
  { key: 'services', path: '/services', labelAr: 'خدماتنا', labelEn: 'Services' },
  { key: 'clients', path: '/clients', labelAr: 'عملاؤنا', labelEn: 'Clients' },
  { key: 'blog', path: '/blog', labelAr: 'المدونة', labelEn: 'Blog' },
  { key: 'careers', path: '/join', labelAr: 'انضم إلينا', labelEn: 'Careers' },
];

export interface ServiceNavItem {
  slug: string;
  titleAr: string;
  titleEn: string;
  category: 'automotive' | 'events';
}

export const serviceNavItems: ServiceNavItem[] = [
  { slug: 'paint-protection-ppf', titleAr: 'حماية الطلاء (PPF)', titleEn: 'Paint Protection (PPF)', category: 'automotive' },
  { slug: 'polishing-ceramic', titleAr: 'تلميع ونانو سيراميك', titleEn: 'Polishing & Ceramic', category: 'automotive' },
  { slug: 'deep-cleaning-detailing', titleAr: 'تنظيف عميق وعناية دقيقة', titleEn: 'Deep Cleaning & Detailing', category: 'automotive' },
  { slug: 'heat-insulation-film', titleAr: 'عزل حراري وتظليل', titleEn: 'Heat Insulation Film', category: 'automotive' },
  { slug: 'events-conferences', titleAr: 'تنظيم المعارض والمؤتمرات', titleEn: 'Events & Conferences', category: 'events' },
  { slug: 'vip-event-management', titleAr: 'إدارة فعاليات كبار الشخصيات', titleEn: 'VIP Event Management', category: 'events' },
];
