'use client';

import { useActionState, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import {
  contactInquirySchema,
  INITIAL_FORM_STATE,
} from '@/features/contact/schemas/contact.schema';
import type { ContactInquiryInput, ContactFormState } from '@/features/contact/schemas/contact.schema';
import { submitContactInquiry } from '@/features/contact/actions/contact.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServiceItem {
  slug: string;
  titleAr: string;
  titleEn: string;
}

interface ContactFormProps {
  locale: string;
  serviceItems?: ServiceItem[];
}

// ---------------------------------------------------------------------------
// Validation error messages (bilingual)
// ---------------------------------------------------------------------------
const errorMessages: Record<string, { ar: string; en: string }> = {
  name_min: { ar: 'الاسم قصير جداً (حرفان على الأقل)', en: 'Name is too short (at least 2 characters)' },
  name_max: { ar: 'الاسم يتجاوز الحد المسموح', en: 'Name exceeds maximum length' },
  phone_min: { ar: 'رقم الهاتف غير مكتمل', en: 'Phone number is incomplete' },
  phone_max: { ar: 'رقم الهاتف يتجاوز الحد المسموح', en: 'Phone number exceeds maximum length' },
  phone_format: { ar: 'صيغة رقم الهاتف غير صحيحة (مثال: +971500000000)', en: 'Invalid phone number format' },
  email_invalid: { ar: 'البريد الإلكتروني غير صحيح', en: 'Invalid email address' },
  email_max: { ar: 'البريد الإلكتروني يتجاوز الحد المسموح', en: 'Email exceeds maximum length' },
  message_min: { ar: 'يرجى كتابة رسالة توضيحية (5 أحرف على الأقل)', en: 'Please provide a message (at least 5 characters)' },
  message_max: { ar: 'الرسالة تتجاوز الحد المسموح', en: 'Message exceeds maximum length' },
  service_type_invalid: { ar: 'نوع الخدمة المختار غير صالح', en: 'Selected service type is invalid' },
};

const serverMessages: Record<string, { ar: string; en: string }> = {
  rate_limited: {
    ar: 'لقد تم إرسال عدة طلبات مؤخراً. يرجى الانتظار بضع دقائق قبل المحاولة مجدداً.',
    en: 'Too many requests recently. Please wait a few minutes before trying again.',
  },
  email_failed: {
    ar: 'تعذر إرسال الرسالة حالياً. يرجى المحاولة لاحقاً أو التواصل معنا هاتفياً.',
    en: 'Failed to dispatch message. Please try again later or contact us directly by phone.',
  },
  server_error: {
    ar: 'حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقاً.',
    en: 'An unexpected server error occurred. Please try again later.',
  },
  origin_invalid: {
    ar: 'مصدر الطلب غير مصرح به.',
    en: 'Unauthorized request origin.',
  },
};

function getErrorMessage(code: string, locale: string): string {
  const lang = locale === 'ar' ? 'ar' : 'en';
  return errorMessages[code]?.[lang] || code;
}

function getServerMessage(code: string, locale: string): string {
  const lang = locale === 'ar' ? 'ar' : 'en';
  return serverMessages[code]?.[lang] || code;
}

// ---------------------------------------------------------------------------
// Luxury Field Styles (Logical direction-first)
// ---------------------------------------------------------------------------
const inputBaseClass =
  'w-full bg-background/60 border border-border/80 rounded-xl px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10 text-start transition-all duration-200';

const labelBaseClass = 'block text-xs font-semibold text-foreground/90 tracking-wide mb-1.5 text-start w-full';

const sectionHeaderClass = 'text-[11px] font-bold tracking-widest text-primary uppercase text-start block w-full';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ContactForm({ locale, serviceItems = [] }: ContactFormProps) {
  const isAr = locale === 'ar';
  const formRef = useRef<HTMLFormElement>(null);

  // React 19 useActionState for server action submission
  const [serverState, formAction, isServerPending] = useActionState<ContactFormState, FormData>(
    submitContactInquiry,
    INITIAL_FORM_STATE,
  );

  // React Hook Form for client-side state & validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      message: '',
      honeypot: '',
    },
  });

  const selectedService = useWatch({ control, name: 'serviceType' });

  const isPending = isSubmitting || isServerPending;

  // On valid client validation, submit native form to trigger Server Action
  const onValidSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // ---------------------------------------------------------------------------
  // Success View — Luxury Private Consultation Confirmation
  // ---------------------------------------------------------------------------
  if (serverState.success && serverState.message === 'success') {
    return (
      <div
        className="bg-card/40 border border-primary/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center space-y-6 backdrop-blur-sm shadow-xl"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto border border-primary/25 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-bold tracking-widest text-primary uppercase">
            {isAr ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received'}
          </span>
          <h3 className="text-2xl font-black text-foreground">
            {isAr ? 'شكراً لتواصلكم مع جوهرة الدانة' : 'Thank You for Contacting Us'}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {isAr
            ? 'تم تحويل استفساركم مباشرة إلى مكتب الاستشارات المختص. سيقوم أحد مستشارينا بالتواصل معكم في أقرب وقت لتلبية متطلباتكم بأعلى معايير التميز.'
            : 'Your request has been forwarded to our senior advisory desk. A dedicated consultant will connect with you promptly to address your bespoke requirements.'}
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Luxury Consultation Form
  // ---------------------------------------------------------------------------
  return (
    <form
      ref={formRef}
      action={formAction}
      dir={isAr ? 'rtl' : 'ltr'}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onValidSubmit)(e);
      }}
      className="bg-card/40 border border-border/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 backdrop-blur-sm shadow-xl transition-all duration-300"
      noValidate
    >
      {/* Server error alert */}
      {!serverState.success && serverState.message && serverState.message !== 'validation_failed' && (
        <div
          role="alert"
          aria-live="polite"
          className="bg-destructive/10 border border-destructive/25 rounded-xl p-4 text-xs sm:text-sm text-destructive font-medium flex items-center gap-2.5 text-start"
        >
          <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
          <span>{getServerMessage(serverState.message, locale)}</span>
        </div>
      )}

      {/* ── Group 01: Client Details ── */}
      <fieldset className="space-y-4">
        <div>
          <legend className={sectionHeaderClass}>
            <bdi className="font-mono">01.</bdi> {isAr ? 'بيانات مقدم الطلب' : 'Client Identification'}
          </legend>
          <p className="text-xs text-muted-foreground mt-0.5 text-start">
            {isAr ? 'يرجى إدخال بيانات التواصل المباشرة' : 'Please provide your direct contact details'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="contact-name" className={labelBaseClass}>
              {isAr ? 'الاسم الكامل' : 'Full Name'} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder={isAr ? 'سعادة / السيد...' : 'e.g., John Doe'}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              aria-invalid={!!errors.name}
              className={inputBaseClass}
              {...register('name')}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-xs text-destructive font-medium mt-1 text-start" role="alert">
                {getErrorMessage(errors.name.message || '', locale)}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label htmlFor="contact-phone" className={labelBaseClass}>
              {isAr ? 'رقم الهاتف المباشر' : 'Direct Phone'} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder="+971 50 000 0000"
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              aria-invalid={!!errors.phone}
              className={`${inputBaseClass} text-left font-mono`}
              {...register('phone')}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="text-xs text-destructive font-medium mt-1 text-start" role="alert">
                {getErrorMessage(errors.phone.message || '', locale)}
              </p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label htmlFor="contact-email" className={labelBaseClass}>
            {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Email Address'} <span className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder="client@domain.ae"
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            aria-invalid={!!errors.email}
            className={`${inputBaseClass} text-left font-mono`}
            {...register('email')}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-destructive font-medium mt-1 text-start" role="alert">
              {getErrorMessage(errors.email.message || '', locale)}
            </p>
          )}
        </div>
      </fieldset>

      {/* ── Group 02: Service Selection (Custom Radix Select) ── */}
      {serviceItems.length > 0 && (
        <fieldset className="space-y-4 pt-4 border-t border-border/60">
          <div>
            <legend className={sectionHeaderClass}>
              <bdi className="font-mono">02.</bdi> {isAr ? 'موضوع الاستشارة أو الخدمة' : 'Service Consultation'}
            </legend>
            <p className="text-xs text-muted-foreground mt-0.5 text-start">
              {isAr ? 'حدد الخدمة المطلوبة لتوجيه الطلب للمستشار المختص' : 'Select a service domain for specialist routing'}
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-service-trigger" className={labelBaseClass}>
              {isAr ? 'الخدمة المطلوبة' : 'Service Domain'}
            </label>

            <Controller
              control={control}
              name="serviceType"
              render={({ field }) => (
                <Select
                  dir={isAr ? 'rtl' : 'ltr'}
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="contact-service-trigger">
                    <SelectValue
                      placeholder={isAr ? 'اختر الخدمة أو مجال الاستشارة...' : 'Select service or consultation topic...'}
                    />
                  </SelectTrigger>
                  <SelectContent dir={isAr ? 'rtl' : 'ltr'}>
                    {serviceItems.map((item) => {
                      const title = isAr ? item.titleAr : item.titleEn;
                      return (
                        <SelectItem key={item.slug} value={title}>
                          {title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />

            {/* Hidden input to guarantee presence in native FormData */}
            <input type="hidden" name="serviceType" value={selectedService || ''} />

            {errors.serviceType && (
              <p className="text-xs text-destructive font-medium mt-1 text-start" role="alert">
                {getErrorMessage(errors.serviceType.message || '', locale)}
              </p>
            )}
          </div>
        </fieldset>
      )}

      {/* ── Group 03: Inquiry Message ── */}
      <fieldset className="space-y-4 pt-4 border-t border-border/60">
        <div>
          <legend className={sectionHeaderClass}>
            <bdi className="font-mono">03.</bdi> {isAr ? 'تفاصيل الطلب والاستفسار' : 'Inquiry Details'}
          </legend>
          <p className="text-xs text-muted-foreground mt-0.5 text-start">
            {isAr ? 'يرجى تقديم نبذة عن متطلباتكم أو مواعيد الفعالية/السيارة' : 'Outline your specific vehicle or event requirements'}
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="contact-message" className={labelBaseClass}>
            {isAr ? 'تفاصيل الرسالة' : 'Consultation Notes & Requirements'} <span className="text-primary">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            dir={isAr ? 'rtl' : 'ltr'}
            placeholder={
              isAr
                ? 'يرجى كتابة تفاصيل الاستفسار أو موعد الخدمة المطلوبة...'
                : 'Please specify your requirements, preferred timeframe, or consultation details...'
            }
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            aria-invalid={!!errors.message}
            className={`${inputBaseClass} resize-none min-h-[110px] text-start`}
            {...register('message')}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-xs text-destructive font-medium mt-1 text-start" role="alert">
              {getErrorMessage(errors.message.message || '', locale)}
            </p>
          )}
        </div>
      </fieldset>

      {/* Honeypot Security Field — Anti-Bot Trap */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
        <label htmlFor="contact-hp">Leave empty</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {/* ── Submit Action ── */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isAr ? 'جاري معالجة الطلب...' : 'Processing Consultation Request...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-primary-foreground/80" />
              <span>{isAr ? 'تقديم طلب الاستشارة الخاصة' : 'Request Private Consultation'}</span>
              <Send className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}