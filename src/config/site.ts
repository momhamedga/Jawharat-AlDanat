// src/config/site.ts
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jawaharat-aldana.com',
  name: {
    ar: 'جوهرة الدانة',
    en: 'Jawharat Al Danat',
  },
  tagline: {
    ar: 'المؤسسة الرائدة في إدارة الفعاليات والمؤتمرات وحلول العناية المتقدمة بالسيارات',
    en: 'Leading Luxury Event Management & Advanced Automotive Care Solutions',
  },
  contact: {
    email: 'info@jawaharat-aldana.com',
    phones: [
      { display: '+971 54 411 8809', raw: '+971544118809' },
      { display: '+971 50 808 6614', raw: '+971508086614' },
    ],
    whatsapp: {
      display: '+971 54 411 8809',
      link: 'https://wa.me/971544118809',
    },
    locations: {
      abuDhabi: {
        ar: 'أبوظبي، الإمارات العربية المتحدة',
        en: 'Abu Dhabi, United Arab Emirates',
      },
      dubai: {
        ar: 'دبي، الإمارات العربية المتحدة',
        en: 'Dubai, United Arab Emirates',
      },
    },
  },
  socials: {
    instagram: '#',
    tiktok: '#',
    linkedin: '#',
    twitter: '#',
    whatsapp: 'https://wa.me/971544118809',
  },
} as const;
