'use client';

import { useState, useTransition } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { likePostAction } from '../actions/blog.action';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
  locale: string;
}

export function LikeButton({ postId, initialLikes, locale }: LikeButtonProps) {
  const isAr = locale === 'ar';
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (hasLiked || isPending) return;

    // Optimistic increment
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    startTransition(async () => {
      const res = await likePostAction(postId);
      if (!res.success) {
        // Rollback on failure
        setLikes((prev) => Math.max(0, prev - 1));
        setHasLiked(false);
      } else if (res.likes !== undefined) {
        setLikes(res.likes);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={hasLiked || isPending}
      aria-label={isAr ? 'الإعجاب بهذا المقال' : 'Like this article'}
      aria-pressed={hasLiked}
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus:outline-none cursor-pointer active:scale-95 disabled:cursor-default ${
        hasLiked
          ? 'bg-destructive/10 border-destructive/30 text-destructive'
          : 'bg-card/70 border-border/80 text-foreground hover:border-destructive/40 hover:text-destructive hover:bg-destructive/5'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-destructive" />
      ) : (
        <Heart
          className={`w-4 h-4 transition-transform ${hasLiked ? 'fill-destructive text-destructive scale-110' : 'text-destructive'}`}
        />
      )}
      <span>{isAr ? 'أعجبني هذا التحليل' : 'Like this article'}</span>
      <span className="bg-background/80 px-2 py-0.5 rounded-md text-xs font-mono font-bold text-foreground">
        {likes}
      </span>
    </button>
  );
}

