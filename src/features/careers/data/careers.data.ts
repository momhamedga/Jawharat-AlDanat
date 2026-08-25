import { ShieldCheck, Mic, Palette, Users, type LucideIcon } from 'lucide-react';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface JobRoleItem {
  id: string;
  title: LocalizedString;
  department: LocalizedString;
  location: LocalizedString;
  type: LocalizedString;
  summary: LocalizedString;
  requirements: LocalizedString[];
  icon: LucideIcon;
}

export interface WorkPrinciple {
  title: LocalizedString;
  desc: LocalizedString;
}

export const jobRolesData: JobRoleItem[] = [
  {
    id: 'ppf-specialist',
    title: {
      ar: 'متخصص تركيب أفلام الحماية (PPF)',
      en: 'Paint Protection Film (PPF) Specialist',
    },
    department: {
      ar: 'قطاع العناية بالسيارات',
      en: 'Automotive Division',
    },
    location: {
      ar: 'أبوظبي • دبي',
      en: 'Abu Dhabi • Dubai',
    },
    type: {
      ar: 'دوام كامل',
      en: 'Full-Time',
    },
    summary: {
      ar: 'تنفيذ عمليات قص وتثبيت أفلام البولي يوريثان الحراري (TPU) على أسطح وحواف السيارات الفارهة بدقة متناهية وبدون فواصل.',
      en: 'Execute high-precision TPU film installation and edge-wrapping on luxury vehicles with immaculate alignment.',
    },
    requirements: [
      {
        ar: 'خبرة عملية سابقة لا تقل عن سنتين في تركيب أفلام PPF للسيارات الفاخرة.',
        en: 'Minimum 2 years of hands-on experience installing PPF on luxury & exotic vehicles.',
      },
      {
        ar: 'إتقان تقنيات القص الآلي واليدوي الدقيق والالتزام بمعايير السلامة المهنية.',
        en: 'Proficiency with plotter software and manual precision trimming with strict safety standards.',
      },
    ],
    icon: ShieldCheck,
  },
  {
    id: 'events-manager',
    title: {
      ar: 'مدير تنظيم فعاليات ومؤتمرات',
      en: 'Events & Conferences Manager',
    },
    department: {
      ar: 'قطاع الفعاليات والقمم',
      en: 'Summits & VIP Division',
    },
    location: {
      ar: 'أبوظبي',
      en: 'Abu Dhabi',
    },
    type: {
      ar: 'دوام كامل',
      en: 'Full-Time',
    },
    summary: {
      ar: 'تخطيط وإدارة المشهد التشغيلي للمؤتمرات والقمم الكبرى، والتنسيق مع الجهات الشريكة وفرق العمل الميدانية.',
      en: 'Plan and supervise conference operations, liaise with institutional stakeholders, and oversee on-site logistics.',
    },
    requirements: [
      {
        ar: 'خبرة موثقة في إدارة الفعاليات والمؤتمرات الكبرى داخل دولة الإمارات.',
        en: 'Proven track record managing large-scale conferences and corporate events in the UAE.',
      },
      {
        ar: 'إلمام تام بقواعد البروتوكول والضيافة الدبلوماسية وإدارة الجداول الزمنية.',
        en: 'Deep familiarity with VIP protocol, diplomatic hospitality, and crisis management.',
      },
    ],
    icon: Mic,
  },
  {
    id: 'graphic-designer',
    title: {
      ar: 'مصمم جرافيك وهويات بصرية',
      en: 'Graphic & Visual Identity Designer',
    },
    department: {
      ar: 'الإعلام والاتصال المؤسسي',
      en: 'Corporate Communications',
    },
    location: {
      ar: 'أبوظبي',
      en: 'Abu Dhabi',
    },
    type: {
      ar: 'دوام كامل',
      en: 'Full-Time',
    },
    summary: {
      ar: 'تطوير الهويات البصرية للمؤتمرات والمنصات، وتصميم المواد الإعلامية والكتيبات المطبوعة والرقمية بدقة وأناقة.',
      en: 'Develop visual identities for summits, stage branding, digital collateral, and institutional publications.',
    },
    requirements: [
      {
        ar: 'محفظة أعمال قوية تعكس تصاميم فاخرة للمؤسسات والفعاليات الرفيعة.',
        en: 'Strong portfolio demonstrating premium brand design for institutional events.',
      },
      {
        ar: 'إتقان برامج Adobe Creative Suite وفهم عميق للطباعة والإنتاج المكاني.',
        en: 'Mastery of Adobe Creative Suite and solid understanding of spatial print production.',
      },
    ],
    icon: Palette,
  },
  {
    id: 'client-relations',
    title: {
      ar: 'مسؤول علاقات كبار العملاء',
      en: 'VIP Client Relations Executive',
    },
    department: {
      ar: 'خدمة العملاء والبروتوكول',
      en: 'Client Services & Protocol',
    },
    location: {
      ar: 'أبوظبي • دبي',
      en: 'Abu Dhabi • Dubai',
    },
    type: {
      ar: 'دوام كامل',
      en: 'Full-Time',
    },
    summary: {
      ar: 'متابعة طلبات واستفسارات كبار العملاء والمؤسسات، والتنسيق المباشر لضمان تقديم تجربة استثنائية وسلسة.',
      en: 'Manage VIP client inquiries, coordinate bespoke automotive bookings, and ensure seamless delivery.',
    },
    requirements: [
      {
        ar: 'مهارات تواصل واستماع متقدمة باللغتين العربية والإنجليزية.',
        en: 'Exceptional interpersonal and communication skills in both Arabic and English.',
      },
      {
        ar: 'خبرة سابقة في خدمة العملاء في قطاعات الضيافة الفاخرة أو السيارات الفارهة.',
        en: 'Prior client-facing experience in luxury automotive or premium hospitality sectors.',
      },
    ],
    icon: Users,
  },
];

export const workPrinciples: WorkPrinciple[] = [
  {
    title: {
      ar: 'الانضباط والاحترافية العالية',
      en: 'High Professional Discipline',
    },
    desc: {
      ar: 'بيئة عمل محفزة تقوم على الدقة والالتزام بأعلى معايير الجودة المعمول بها في دولة الإمارات.',
      en: 'A collaborative culture anchored in meticulous attention to detail and rigorous standards.',
    },
  },
  {
    title: {
      ar: 'مسار تطور مهني وتدريب تخصصي',
      en: 'Specialized Skills Progression',
    },
    desc: {
      ar: 'برامج تدريب مستمرة على أحدث المواد والتقنيات العالمية في مجالي العناية بالمركبات وتنظيم القمم.',
      en: 'Continuous technical upskilling on advanced materials and international event practices.',
    },
  },
  {
    title: {
      ar: 'الشفافية والتقدير المتبادل',
      en: 'Integrity & Recognition',
    },
    desc: {
      ar: 'منظومة عمل تحترم التنوع والكفاءة وتوفر بيئة مستقرة تليق بتطلعات الكوادر الطموحة.',
      en: 'An inclusive workplace that values merit, integrity, and sustainable career longevity.',
    },
  },
];