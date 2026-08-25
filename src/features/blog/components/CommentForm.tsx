'use client';

import { useActionState, useRef } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { addCommentAction, type CommentActionResult } from '../actions/blog.action';

interface CommentFormProps {
  postId: number;
  locale: string;
}

const errorMessages: Record<string, { ar: string; en: string }> = {
  name_min: { ar: 'الاسم قصير جداً (حرفان على الأقل)', en: 'Name is too short (at least 2 characters)' },
  name_max: { ar: 'الاسم يتجاوز الحد المسموح', en: 'Name exceeds maximum length' },
  comment_min: { ar: 'التعليق قصير جداً (3 أحرف على الأقل)', en: 'Comment is too short (at least 3 characters)' },
  comment_max: { ar: 'التعليق يتجاوز الحد المسموح', en: 'Comment exceeds maximum length' },
  RATE_LIMITED: {
    ar: 'لقد قمت بإرسال عدة تعليقات مؤخراً. يرجى الانتظار بضع دقائق.',
    en: 'Too many comments submitted recently. Please wait a few minutes.',
  },
  BOT_DETECTED: { ar: 'تم رفض الطلب.', en: 'Submission rejected.' },
  SERVER_ERROR: { ar: 'تعذر إرسال التعليق حالياً. يرجى المحاولة لاحقاً.', en: 'Failed to submit comment. Please try again.' },
};

function getLocalizedMessage(key: string, locale: string): string {
  const lang = locale === 'ar' ? 'ar' : 'en';
  return errorMessages[key]?.[lang] || key;
}

export function CommentForm({ postId, locale }: CommentFormProps) {
  const isAr = locale === 'ar';
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<CommentActionResult | null, FormData>(
    addCommentAction,
    null,
  );

  return (
    <div className="bg-card/50 border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          {isAr ? 'شاركنا وجهة نظرك الكريمة' : 'Share Your Perspective'}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {isAr
            ? 'نرحب بتعليقاتكم واستفساراتكم حول محتوى هذا المقال. تخضع المشاركات للمراجعة قبل النشر.'
            : 'We welcome your valuable thoughts and inquiries on this editorial topic. Comments appear following editorial review.'}
        </p>
      </div>

      {state?.success && (
        <div
          role="status"
          className="bg-primary/10 border border-primary/25 rounded-xl p-4 flex items-center gap-3 text-xs sm:text-sm text-primary font-medium"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            {isAr
              ? 'تم استلام تعليقكم الكريم بنجاح وسيظهر بعد المراجعة والاعتماد، شكراً لمشاركتكم.'
              : 'Your comment was received successfully and will appear after editorial review. Thank you for your contribution.'}
          </span>
        </div>
      )}

      {state && !state.success && state.code && (
        <div
          role="alert"
          className="bg-destructive/10 border border-destructive/25 rounded-xl p-4 text-xs sm:text-sm text-destructive font-medium"
        >
          {getLocalizedMessage(state.code, locale)}
        </div>
      )}

      <form
        ref={formRef}
        action={async (formData: FormData) => {
          await formAction(formData);
          if (formRef.current) {
            formRef.current.reset();
          }
        }}
        className="space-y-4"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <input type="hidden" name="postId" value={postId} />

        {/* Anti-bot Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
          <label htmlFor="blog-hp">Leave empty</label>
          <input id="blog-hp" type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
        </div>

        {/* User Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="comment-user-name"
            className="block text-xs font-semibold text-foreground/90 text-start"
          >
            {isAr ? 'الاسم الكريم' : 'Your Name'} <span className="text-primary">*</span>
          </label>
          <input
            id="comment-user-name"
            type="text"
            name="userName"
            required
            autoComplete="name"
            placeholder={isAr ? 'سعادة / السيد...' : 'Your name or title'}
            className="w-full bg-background/70 border border-border/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-start transition-all"
          />
          {state?.errors?.userName && (
            <p className="text-xs text-destructive font-medium text-start" role="alert">
              {getLocalizedMessage(state.errors.userName, locale)}
            </p>
          )}
        </div>

        {/* Comment Text */}
        <div className="space-y-1.5">
          <label
            htmlFor="comment-text"
            className="block text-xs font-semibold text-foreground/90 text-start"
          >
            {isAr ? 'نص التعليق' : 'Comment Content'} <span className="text-primary">*</span>
          </label>
          <textarea
            id="comment-text"
            name="text"
            rows={3}
            required
            placeholder={
              isAr
                ? 'اكتب تعليقك أو استفسارك هنا...'
                : 'Share your thoughts or questions regarding this article...'
            }
            className="w-full bg-background/70 border border-border/80 rounded-xl p-4 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none text-start transition-all"
          />
          {state?.errors?.text && (
            <p className="text-xs text-destructive font-medium text-start" role="alert">
              {getLocalizedMessage(state.errors.text, locale)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl shadow-xs hover:bg-primary/90 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
              </>
            ) : (
              <>
                <span>{isAr ? 'إرسال التعليق للمراجعة' : 'Submit for Review'}</span>
                <Send className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
