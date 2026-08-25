'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminArticleDetail, PostStatus } from '../types/cms.types';
import { AdminUser } from '@/features/auth/types/auth.types';
import { canManageAdminOps } from '@/features/auth/services/rbac.service';
import {
  createArticleAction,
  updateArticleAction,
  archiveArticleAction,
  publishArticleAction,
} from '../actions/article.action';
import { MarkdownRenderer } from '@/features/blog/components/MarkdownRenderer';
import {
  Save,
  ArrowRight,
  Eye,
  AlertTriangle,
  Loader2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Link2,
  Globe,
  Archive,
  CheckCircle,
} from 'lucide-react';

interface ArticleEditorProps {
  initialData?: AdminArticleDetail | null;
  user: AdminUser;
}

export function ArticleEditor({ initialData, user }: ArticleEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const canPublish = canManageAdminOps(user);

  // Active Tab: 'ar' | 'en' | 'seo' | 'preview'
  const [activeTab, setActiveTab] = useState<'ar' | 'en' | 'seo' | 'preview'>('ar');
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form State
  const [form, setForm] = useState({
    slug: initialData?.slug || '',
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.titleEn || '',
    excerptAr: initialData?.excerptAr || '',
    excerptEn: initialData?.excerptEn || '',
    contentAr: initialData?.contentAr || '',
    contentEn: initialData?.contentEn || '',
    categoryAr: initialData?.categoryAr || 'أخبار الدانة',
    categoryEn: initialData?.categoryEn || 'AlDanat News',
    readTimeAr: initialData?.readTimeAr || '5 دقائق',
    readTimeEn: initialData?.readTimeEn || '5 min read',
    image: initialData?.image || '/images/about.webp',
    status: (initialData?.status || 'DRAFT') as PostStatus,
    seoTitleAr: initialData?.seoTitleAr || '',
    seoTitleEn: initialData?.seoTitleEn || '',
    seoDescriptionAr: initialData?.seoDescriptionAr || '',
    seoDescriptionEn: initialData?.seoDescriptionEn || '',
    ogImage: initialData?.ogImage || '',
  });

  const isSlugChanged = isEditing && initialData?.status === 'PUBLISHED' && form.slug !== initialData.slug;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Auto-slug generator from English title (if slug is empty)
  const handleAutoSlug = () => {
    if (!form.slug && form.titleEn) {
      const generated = form.titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      handleChange('slug', generated);
    }
  };

  // Insert Markdown helper
  const insertMarkdown = (target: 'contentAr' | 'contentEn', syntax: string, placeholder = 'نص') => {
    const textarea = document.getElementById(target) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = form[target];
    const selected = current.substring(start, end) || placeholder;

    let insertion = '';
    switch (syntax) {
      case 'h2':
        insertion = `\n## ${selected}\n`;
        break;
      case 'h3':
        insertion = `\n### ${selected}\n`;
        break;
      case 'bold':
        insertion = `**${selected}**`;
        break;
      case 'italic':
        insertion = `*${selected}*`;
        break;
      case 'list':
        insertion = `\n- ${selected}`;
        break;
      case 'quote':
        insertion = `\n> ${selected}\n`;
        break;
      case 'link':
        insertion = `[${selected}](https://example.com)`;
        break;
      default:
        insertion = selected;
    }

    const nextContent = current.substring(0, start) + insertion + current.substring(end);
    handleChange(target, nextContent);
  };

  const handleSave = async (targetStatus?: PostStatus) => {
    setIsPending(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const payload = {
      ...form,
      status: targetStatus || form.status,
    };

    try {
      let res;
      if (isEditing && initialData) {
        res = await updateArticleAction(initialData.id, payload);
      } else {
        res = await createArticleAction(payload);
      }

      if (!res.success) {
        setErrorMessage(res.error || 'حدث خطأ أثناء حفظ المقال');
        if (res.fieldErrors) setFieldErrors(res.fieldErrors);
      } else {
        const msg = payload.status === 'PUBLISHED'
          ? 'تم نشر المقال بنجاح!'
          : payload.status === 'ARCHIVED'
          ? 'تمت أرشفة المقال بنجاح'
          : 'تم حفظ المسودة بنجاح';
        setSuccessMessage(msg);
        setForm((prev) => ({ ...prev, status: payload.status }));
        router.refresh();
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1200);
      }
    } catch (err) {
      console.error('[ArticleEditor] Submit failed:', err);
      setErrorMessage('حدث خطأ غير متوقع أثناء إرسال البيانات');
    } finally {
      setIsPending(false);
    }
  };

  const handleArchive = async () => {
    if (!initialData) return;
    const confirm = window.confirm('هل أنت متأكد من أرشفة هذا المقال؟ سيختفي المقال من الموقع العام ومحركات البحث فوراً.');
    if (!confirm) return;

    setIsPending(true);
    try {
      const res = await archiveArticleAction(initialData.id);
      if (!res.success) {
        setErrorMessage(res.error || 'فشلت أرشفة المقال');
      } else {
        setSuccessMessage('تمت أرشفة المقال بنجاح');
        setForm((prev) => ({ ...prev, status: 'ARCHIVED' }));
        router.refresh();
        setTimeout(() => router.push('/admin/blog'), 1200);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handlePublishDirect = async () => {
    if (!initialData) {
      handleSave('PUBLISHED');
      return;
    }
    const confirm = window.confirm('هل أنت متأكد من نشر هذا المقال الآن؟ سيصبح متاحاً للجمهور مباشرة.');
    if (!confirm) return;

    setIsPending(true);
    try {
      const res = await publishArticleAction(initialData.id);
      if (!res.success) {
        setErrorMessage(res.error || 'فشل نشر المقال');
      } else {
        setSuccessMessage('تم نشر المقال بنجاح!');
        setForm((prev) => ({ ...prev, status: 'PUBLISHED' }));
        router.refresh();
        setTimeout(() => router.push('/admin/blog'), 1200);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* 🧭 Top Bar: Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-xl border border-border/80 hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-foreground">
              {isEditing ? `تعديل المقال: ${initialData.titleAr}` : 'إنشاء مقال جديد'}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  form.status === 'PUBLISHED'
                    ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                    : form.status === 'DRAFT'
                    ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                    : 'bg-muted text-muted-foreground border-border/80'
                }`}
              >
                {form.status === 'PUBLISHED' ? 'منشور (PUBLISHED)' : form.status === 'DRAFT' ? 'مسودة (DRAFT)' : 'مؤرشف (ARCHIVED)'}
              </span>
              <span className="text-[11px] text-muted-foreground font-semibold">
                • {canPublish ? 'صلاحيات كاملة' : 'صلاحيات محرر (مسودات فقط)'}
              </span>
            </div>
          </div>
        </div>

        {/* 🎛️ Dynamic Publishing Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Save Draft Button */}
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSave('DRAFT')}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-border/80 bg-secondary/40 text-foreground text-xs font-bold hover:bg-secondary transition-all disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>حفظ كمسودة</span>
          </button>

          {/* Publish / Republish Button (ADMIN / SUPER_ADMIN only) */}
          {canPublish && (
            <button
              type="button"
              disabled={isPending}
              onClick={handlePublishDirect}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all disabled:opacity-60 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              <span>{form.status === 'PUBLISHED' ? 'تحديث ونشر' : form.status === 'ARCHIVED' ? 'إعادة النشر' : 'نشر المقال الآن'}</span>
            </button>
          )}

          {/* Archive Button (ADMIN / SUPER_ADMIN only on existing posts) */}
          {canPublish && isEditing && form.status !== 'ARCHIVED' && (
            <button
              type="button"
              disabled={isPending}
              onClick={handleArchive}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-bold transition-all disabled:opacity-60 cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>أرشفة</span>
            </button>
          )}
        </div>
      </div>

      {/* ⚠️ Feedback Banners */}
      {errorMessage && (
        <div className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ⚠️ Slug Change Warning */}
      {isSlugChanged && (
        <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            تنبيه: تعديل الرابط الدائم (Slug) لمقال منشور بالفعل سيغير عنوان URL العام للمقال وقد يؤثر على فهرسة محركات البحث (SEO).
          </span>
        </div>
      )}

      {/* 📑 Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border/60 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('ar')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ar' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          المحتوى بالعربية (AR)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('en')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'en' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          المحتوى بالإنجليزية (EN)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'seo' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          الرابط وتهيئة محركات البحث (SEO)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'preview' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>المعاينة المباشرة</span>
        </button>
      </div>

      {/* 🇦🇪 Tab 1: Arabic Content */}
      {activeTab === 'ar' && (
        <div className="space-y-5 p-6 rounded-3xl border border-border/80 bg-card shadow-xs">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              عنوان المقال (بالعربية) *
            </label>
            <input
              type="text"
              value={form.titleAr}
              onChange={(e) => handleChange('titleAr', e.target.value)}
              placeholder="مثال: بروتوكول المواكب الرسمية في أبوظبي..."
              className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {fieldErrors.titleAr && <p className="text-[11px] text-destructive font-medium">{fieldErrors.titleAr}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                التصنيف (بالعربية) *
              </label>
              <input
                type="text"
                value={form.categoryAr}
                onChange={(e) => handleChange('categoryAr', e.target.value)}
                placeholder="مثال: بروتوكول الفعاليات"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              {fieldErrors.categoryAr && <p className="text-[11px] text-destructive font-medium">{fieldErrors.categoryAr}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                وقت القراءة (بالعربية) *
              </label>
              <input
                type="text"
                value={form.readTimeAr}
                onChange={(e) => handleChange('readTimeAr', e.target.value)}
                placeholder="مثال: 5 دقائق"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              {fieldErrors.readTimeAr && <p className="text-[11px] text-destructive font-medium">{fieldErrors.readTimeAr}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              المقتطف القصير (بالعربية) *
            </label>
            <textarea
              rows={3}
              value={form.excerptAr}
              onChange={(e) => handleChange('excerptAr', e.target.value)}
              placeholder="موجز يلخص محتوى المقال في جملتين أو ثلاث..."
              className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {fieldErrors.excerptAr && <p className="text-[11px] text-destructive font-medium">{fieldErrors.excerptAr}</p>}
          </div>

          {/* Markdown Editor Surface */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-foreground">
                المحتوى الكامل (Markdown - بالعربية) *
              </label>
              
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/40 border border-border/60">
                <button type="button" onClick={() => insertMarkdown('contentAr', 'h2', 'عنوان رئيسي')} className="p-1 rounded hover:bg-secondary text-foreground" title="H2">
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'h3', 'عنوان فرعي')} className="p-1 rounded hover:bg-secondary text-foreground" title="H3">
                  <Heading3 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'bold', 'نص غامق')} className="p-1 rounded hover:bg-secondary text-foreground" title="Bold">
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'italic', 'نص مائل')} className="p-1 rounded hover:bg-secondary text-foreground" title="Italic">
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'list', 'عنصر قائمة')} className="p-1 rounded hover:bg-secondary text-foreground" title="List">
                  <List className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'quote', 'اقتباس')} className="p-1 rounded hover:bg-secondary text-foreground" title="Quote">
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentAr', 'link', 'عنوان الرابط')} className="p-1 rounded hover:bg-secondary text-foreground" title="Link">
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              id="contentAr"
              rows={12}
              value={form.contentAr}
              onChange={(e) => handleChange('contentAr', e.target.value)}
              placeholder="اكتب المقال بصيغة Markdown..."
              className="w-full p-4 rounded-xl border border-border/80 bg-background font-sans text-sm text-foreground leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {fieldErrors.contentAr && <p className="text-[11px] text-destructive font-medium">{fieldErrors.contentAr}</p>}
          </div>

        </div>
      )}

      {/* 🇬🇧 Tab 2: English Content (LTR) */}
      {activeTab === 'en' && (
        <div className="space-y-5 p-6 rounded-3xl border border-border/80 bg-card shadow-xs" dir="ltr">
          
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-foreground">
              Article Title (English) *
            </label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => handleChange('titleEn', e.target.value)}
              onBlur={handleAutoSlug}
              placeholder="e.g. Official Royal Protocol in Abu Dhabi..."
              className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
            />
            {fieldErrors.titleEn && <p className="text-[11px] text-destructive font-medium">{fieldErrors.titleEn}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Category (English) *
              </label>
              <input
                type="text"
                value={form.categoryEn}
                onChange={(e) => handleChange('categoryEn', e.target.value)}
                placeholder="e.g. Events Protocol"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
              />
              {fieldErrors.categoryEn && <p className="text-[11px] text-destructive font-medium">{fieldErrors.categoryEn}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Read Time (English) *
              </label>
              <input
                type="text"
                value={form.readTimeEn}
                onChange={(e) => handleChange('readTimeEn', e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
              />
              {fieldErrors.readTimeEn && <p className="text-[11px] text-destructive font-medium">{fieldErrors.readTimeEn}</p>}
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-foreground">
              Excerpt (English) *
            </label>
            <textarea
              rows={3}
              value={form.excerptEn}
              onChange={(e) => handleChange('excerptEn', e.target.value)}
              placeholder="Brief summary of the article..."
              className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
            />
            {fieldErrors.excerptEn && <p className="text-[11px] text-destructive font-medium">{fieldErrors.excerptEn}</p>}
          </div>

          {/* Markdown Editor Surface */}
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-foreground">
                Full Content (Markdown - English) *
              </label>
              
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/40 border border-border/60">
                <button type="button" onClick={() => insertMarkdown('contentEn', 'h2', 'Main Heading')} className="p-1 rounded hover:bg-secondary text-foreground" title="H2">
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'h3', 'Sub Heading')} className="p-1 rounded hover:bg-secondary text-foreground" title="H3">
                  <Heading3 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'bold', 'Bold text')} className="p-1 rounded hover:bg-secondary text-foreground" title="Bold">
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'italic', 'Italic text')} className="p-1 rounded hover:bg-secondary text-foreground" title="Italic">
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'list', 'List item')} className="p-1 rounded hover:bg-secondary text-foreground" title="List">
                  <List className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'quote', 'Quote')} className="p-1 rounded hover:bg-secondary text-foreground" title="Quote">
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => insertMarkdown('contentEn', 'link', 'Link label')} className="p-1 rounded hover:bg-secondary text-foreground" title="Link">
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              id="contentEn"
              rows={12}
              value={form.contentEn}
              onChange={(e) => handleChange('contentEn', e.target.value)}
              placeholder="Write the article in Markdown format..."
              className="w-full p-4 rounded-xl border border-border/80 bg-background font-sans text-sm text-foreground leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {fieldErrors.contentEn && <p className="text-[11px] text-destructive font-medium">{fieldErrors.contentEn}</p>}
          </div>

        </div>
      )}

      {/* ⚙️ Tab 3: Slug, Image & SEO */}
      {activeTab === 'seo' && (
        <div className="space-y-5 p-6 rounded-3xl border border-border/80 bg-card shadow-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                الرابط الدائم (Slug) *
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleChange('slug', e.target.value.toLowerCase().trim())}
                placeholder="royal-protocol-abu-dhabi"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm font-mono text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                dir="ltr"
              />
              {fieldErrors.slug && <p className="text-[11px] text-destructive font-medium">{fieldErrors.slug}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                مسار الصورة الرئيسية (Image URL / Path) *
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="/images/Speakers-1.webp"
                className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-sm font-mono text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                dir="ltr"
              />
              {fieldErrors.image && <p className="text-[11px] text-destructive font-medium">{fieldErrors.image}</p>}
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-4">
            <h3 className="text-xs font-black text-foreground">
              تهيئة محركات البحث المتقدمة (SEO Meta Tags - اختياري)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-muted-foreground">
                  عنوان SEO بالعربية (Title Tag AR)
                </label>
                <input
                  type="text"
                  value={form.seoTitleAr}
                  onChange={(e) => handleChange('seoTitleAr', e.target.value)}
                  placeholder="إذا تُرك فارغاً سيتم استخدام عنوان المقال"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5" dir="ltr">
                <label className="block text-xs font-bold text-muted-foreground text-left">
                  SEO Title Tag (EN)
                </label>
                <input
                  type="text"
                  value={form.seoTitleEn}
                  onChange={(e) => handleChange('seoTitleEn', e.target.value)}
                  placeholder="Defaults to article title if empty"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-muted-foreground">
                  وصف Meta Description بالعربية
                </label>
                <textarea
                  rows={2}
                  value={form.seoDescriptionAr}
                  onChange={(e) => handleChange('seoDescriptionAr', e.target.value)}
                  placeholder="إذا تُرك فارغاً سيتم استخدام مقتطف المقال"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5" dir="ltr">
                <label className="block text-xs font-bold text-muted-foreground text-left">
                  Meta Description (EN)
                </label>
                <textarea
                  rows={2}
                  value={form.seoDescriptionEn}
                  onChange={(e) => handleChange('seoDescriptionEn', e.target.value)}
                  placeholder="Defaults to excerpt if empty"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-sans"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 👁️ Tab 4: Live Safe Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-6 p-6 rounded-3xl border border-border/80 bg-card shadow-xs">
          
          <div className="space-y-4 pb-6 border-b border-border/60">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {form.categoryAr} • {form.readTimeAr}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {form.titleAr || 'عنوان المقال التجريبي'}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {form.excerptAr}
            </p>
            <div className="p-4 rounded-2xl bg-secondary/30">
              <MarkdownRenderer content={form.contentAr} />
            </div>
          </div>

          <div className="space-y-4 pt-2" dir="ltr">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-sans">
              {form.categoryEn} • {form.readTimeEn}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground font-sans text-left">
              {form.titleEn || 'Sample English Article Title'}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans text-left">
              {form.excerptEn}
            </p>
            <div className="p-4 rounded-2xl bg-secondary/30 text-left">
              <MarkdownRenderer content={form.contentEn} />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
