// src/components/blog/BlogClient.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { blogCategories, BlogPost, Comment } from './blogData';
import BlogCard from './BlogCard';
import { Sparkles, ArrowRight, ArrowLeft, Heart, Send, User, MessageSquare } from 'lucide-react';
import { incrementLikes, incrementViews, createComment } from '@/app/[locale]/blog/actions';

interface BlogClientProps {
  locale: string;
  initialPosts?: BlogPost[]; // تم جعلها اختيارية لحماية الـ Server Component من الانهيار
}

export default function BlogClient({ locale, initialPosts = [] }: BlogClientProps) {
  const isAr = locale === 'ar';
  
  // 🛡️ تأمين مطلق: نضمن تماماً أن posts تبدأ بمصفوفة حقيقية حتى لو كانت فارغة
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [selectedCategory, setSelectedCategory] = useState<string>(blogCategories[isAr ? 'ar' : 'en'][0]);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isPending, startTransition] = useTransition();

  // فتح المقال وزيادة الـ Views في السيرفر بالخلفية دون تعطيل الـ UI
  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    startTransition(async () => {
      await incrementViews(post.id);
      // تحديث العداد محلياً فوراً
      setPosts(prev => (prev || []).map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
    });
  };

  // معالجة الإعجاب الحقيقي وإرساله لـ Neon بـ Optimistic Update سريع
  const handleLike = async (postId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    // تحديث تفاؤلي سريع لعرض النقرات فوراً
    setPosts(prev => (prev || []).map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    if (activePost && activePost.id === postId) {
      setActivePost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }

    const res = await incrementLikes(postId);
    if (!res?.success) {
      // إرجاع القيمة القديمة في حال الفشل النادر للسيرفر
      setPosts(prev => (prev || []).map(p => p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p));
      if (activePost && activePost.id === postId) {
        setActivePost(prev => prev ? { ...prev, likes: Math.max(0, prev.likes - 1) } : null);
      }
    }
  };

  // معالجة إضافة تعليق وإرساله لـ NeonDB حياً
  const handleAddComment = async (postId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const name = commentName.trim();
    const text = commentText.trim();

    setCommentName('');
    setCommentText('');

    const res = await createComment(postId, name, text);

    if (res?.success && res.comment) {
      const serverComment: Comment = {
        id: res.comment.id,
        userName: res.comment.user_name,
        text: res.comment.text,
        createdAt: res.comment.created_at
      };

      // حقن التعليق الجديد أعلى القائمة حياً في نفس اللحظة
      const updatedPosts = (posts || []).map(p => {
        if (p.id === postId) {
          return { ...p, comments: [serverComment, ...(p.comments || [])] };
        }
        return p;
      });

      setPosts(updatedPosts);
      if (activePost && activePost.id === postId) {
        setActivePost(prev => prev ? { ...prev, comments: [serverComment, ...(prev.comments || [])] } : null);
      }
    }
  };

  // 🛡️ تصفية آمنة للمقالات تمنع الكراش نهائياً
  const filteredPosts = (posts || []).filter(post => {
    if (!post) return false;
    if (selectedCategory === 'الكل' || selectedCategory === 'All') return true;
    const cat = isAr ? post.categoryAr : post.categoryEn;
    return cat === selectedCategory;
  });

  return (
    <section className="relative w-full  py-40 md:py-32 bg-slate-50 overflow-hidden font-['Cairo'] select-none" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-light-gold/15 to-transparent rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        
        {activePost ? (
          <div className="space-y-8 max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
            <button onClick={() => setActivePost(null)} className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-brand-deep-gold transition-colors">
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isAr ? 'العودة للمدونة' : 'Back to Blog'}</span>
            </button>

            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 bg-brand-light-gold/15 text-brand-deep-gold text-xs font-black rounded-md">
                {isAr ? activePost.categoryAr : activePost.categoryEn}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {isAr ? activePost.titleAr : activePost.titleEn}
              </h1>
              <p className="text-slate-400 text-xs font-bold">
                {isAr ? activePost.categoryAr : activePost.categoryEn} • {isAr ? 'مشاهدة' : 'Views'} {activePost.views || 0}
              </p>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed pt-4 border-t border-slate-100">
              {isAr ? activePost.contentAr : activePost.contentEn}
            </p>

            <div className="pt-6 border-t border-slate-100 flex justify-start">
              <button onClick={() => handleLike(activePost.id)} className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 px-5 py-2.5 rounded-xl font-black text-sm shadow-sm transition-transform active:scale-95">
                <Heart className="w-4 h-4 fill-current" />
                <span>{isAr ? 'أعجبني هذا المقال' : 'Like this article'}</span>
                <span className="bg-white/80 px-2 py-0.5 rounded-md text-xs font-bold text-rose-500">{activePost.likes || 0}</span>
              </button>
            </div>

            <div className="pt-10 space-y-6">
              <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-turquoise" />
                <span>{isAr ? 'شاركونا آراءكم الفاخرة' : 'Share Your Thoughts'}</span>
              </h3>

              <form onSubmit={(e) => handleAddComment(activePost.id, e)} className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={isAr ? 'الاسم الكريم' : 'Your Name'}
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-brand-light-gold/80"
                  />
                </div>
                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    placeholder={isAr ? 'اكتب تعليقك الراقي هنا...' : 'Write your comment here...'}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-brand-light-gold/80 resize-none"
                  />
                </div>
                <button type="submit" className="flex items-center gap-2 bg-brand-deep-gold text-white px-5 h-11 rounded-xl font-black text-xs sm:text-sm shadow-md hover:bg-brand-turquoise transition-colors duration-300">
                  <span>{isAr ? 'إرسال التعليق' : 'Post Comment'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="space-y-3">
                {(!activePost.comments || activePost.comments.length === 0) ? (
                  <p className="text-xs font-bold text-slate-400 text-center py-4">{isAr ? 'لا توجد تعليقات بعد. كن أول من يترك بصمته!' : 'No comments yet. Be the first to leave a mark!'}</p>
                ) : (
                  activePost.comments.map((com) => (
                    <div key={com.id} className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-inner">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-800">{com.userName}</h4>
                          <span className="text-[9px] font-bold text-slate-400">
                            {typeof com.createdAt === 'string' ? com.createdAt.split('T')[0] : new Date(com.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-600">{com.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="space-y-12">
       <div className="text-center space-y-4 flex flex-col items-center relative z-10">
  
  {/* 🏷️ الـ Badge الكريمي الملكي الموحد بدون أيقونات طبقاً للصورة */}
  <div className="flex items-center justify-center bg-brand-light-gold/15 text-brand-deep-gold px-5 py-1.5 rounded-full">
    <span className="text-[10px] md:text-xs font-bold tracking-wide">
      {isAr ? 'المعرفة الفاخرة والدليل الإرشادي' : 'Luxury Knowledge & Insights'}
    </span>
  </div>
  
  {/* 🏛️ العنوان الموحد بالوزن العريض الصارم واللون الداكن الفخم */}
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight pt-1">
    {isAr ? 'مدونة جوهرة الدانة' : 'AlDanat Luxury Blog'}
  </h2>
  
  {/* 🔶 الفاصل الهندسي الفاخر المعتمد (Diamond Divider) متناسق مع ألوان ثيمك */}
  <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto mt-4">
    <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-brand-deep-gold/40" />
    <div className="w-2.5 h-2.5 bg-brand-deep-gold rotate-45 transform flex-shrink-0 rounded-[1px]" />
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-brand-deep-gold/40" />
  </div>

</div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
              {blogCategories[isAr ? 'ar' : 'en'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-xs font-black border transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-brand-deep-gold text-white border-brand-deep-gold shadow-md shadow-brand-deep-gold/10'
                      : 'bg-white text-slate-600 border-slate-200/70 hover:border-brand-light-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <p className="text-center text-sm font-bold text-slate-400 py-12 w-full">
                {isAr ? 'لا توجد مقالات متوفرة حالياً.' : 'No articles available at the moment.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    locale={locale}
                    likes={post.likes || 0}
                    onLike={(e) => handleLike(post.id, e)}
                    onReadMore={() => handleOpenPost(post)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}