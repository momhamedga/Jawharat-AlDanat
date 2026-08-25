import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'يرجى إدخال البريد الإلكتروني' })
    .email({ message: 'البريد الإلكتروني غير صالح' })
    .max(255, { message: 'البريد الإلكتروني طويل جداً' }),
  password: z
    .string()
    .min(1, { message: 'يرجى إدخال كلمة المرور' })
    .max(128, { message: 'كلمة المرور تتجاوز الحد الأقصى' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

