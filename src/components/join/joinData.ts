// src/components/join/joinData.ts
import { ShieldCheck, Mic, Palette, Users } from 'lucide-react';
import React from 'react';

export interface JobRole {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: React.ComponentType<any>;
}

export interface FeatureItem {
  ar: string;
  en: string;
}

// البيانات المستوحاة بدقة من Screenshot 2026-06-10 161245.png
export const jobRoles: JobRole[] = [
  {
    id: 'ppf',
    titleAr: 'متخصص تظريف',
    titleEn: 'PPF Specialist',
    icon: ShieldCheck
  },
  {
    id: 'events',
    titleAr: 'مدير فعاليات',
    titleEn: 'Events Manager',
    icon: Mic
  },
  {
    id: 'designer',
    titleAr: 'مصمم جرافيك',
    titleEn: 'Graphic Designer',
    icon: Palette
  },
  {
    id: 'relations',
    titleAr: 'مسؤول علاقات العملاء',
    titleEn: 'Client Relations',
    icon: Users
  }
];

export const features: FeatureItem[] = [
  { ar: 'بيئة عمل محفزة ومبدعة في قلب أبوظبي', en: 'A motivating & creative work environment in the heart of Abu Dhabi' },
  { ar: 'حوافز تنافسية ومسار واضح للتطور المهني', en: 'Competitive incentives & a clear path for career progression' },
  { ar: 'فريق متنوّع يجمع بين الاحترافية والشفافية', en: 'A diverse team that combines professionalism & transparency' }
];