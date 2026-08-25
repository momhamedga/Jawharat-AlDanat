import { z } from 'zod';

export const ALLOWED_SERVICE_OPTIONS = [
  // Slugs
  'paint-protection-ppf',
  'polishing-ceramic',
  'deep-cleaning-detailing',
  'heat-insulation-film',
  'events-conferences',
  'vip-event-management',
  // Arabic titles
  'حماية الطلاء (PPF)',
  'تلميع ونانو سيراميك',
  'تنظيف عميق وعناية دقيقة',
  'عزل حراري وتظليل',
  'تنظيم المعارض والمؤتمرات',
  'إدارة فعاليات كبار الشخصيات',
  // English titles
  'Paint Protection (PPF)',
  'Polishing & Ceramic',
  'Deep Cleaning & Detailing',
  'Heat Insulation Film',
  'Events & Conferences',
  'VIP Event Management',
] as const;

export const contactInquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'name_min' })
    .max(100, { message: 'name_max' })
    .trim(),
  phone: z
    .string()
    .min(7, { message: 'phone_min' })
    .max(20, { message: 'phone_max' })
    .regex(/^[+0-9\s-]+$/, { message: 'phone_format' }),
  email: z
    .string()
    .email({ message: 'email_invalid' })
    .max(150, { message: 'email_max' })
    .toLowerCase()
    .trim(),
  serviceType: z
    .string()
    .refine(
      (val) => !val || ALLOWED_SERVICE_OPTIONS.includes(val as typeof ALLOWED_SERVICE_OPTIONS[number]),
      { message: 'service_type_invalid' },
    )
    .optional(),
  message: z
    .string()
    .min(5, { message: 'message_min' })
    .max(2000, { message: 'message_max' })
    .trim(),
  honeypot: z.string().max(0, { message: 'bot_detected' }).optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export const INITIAL_FORM_STATE: ContactFormState = {
  success: false,
  message: '',
};
