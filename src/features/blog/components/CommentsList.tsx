import { User, MessageSquare } from 'lucide-react';
import type { BlogComment } from '../data/blog.queries';

interface CommentsListProps {
  comments: BlogComment[];
  locale: string;
}

export function CommentsList({ comments, locale }: CommentsListProps) {
  const isAr = locale === 'ar';

  return (
    <section className="space-y-6 pt-8 border-t border-border/80" aria-label={isAr ? 'التعليقات' : 'Comments'}>
      {/* Heading with Counter */}
      <div className="flex items-center gap-2.5">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-black text-foreground">
          {isAr ? 'التعليقات والمشاركات' : 'Reader Perspectives'}
        </h3>
        <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
          {comments.length}
        </span>
      </div>

      {comments.length === 0 ? (
        <div className="bg-card/30 border border-border/60 rounded-2xl p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">
            {isAr
              ? 'لا توجد تعليقات بعد على هذا التحليل.'
              : 'No comments yet on this article.'}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {isAr ? 'كن أول من يشاركنا وجهة نظره الكريمة.' : 'Be the first to share your perspective.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const formattedDate = (() => {
              try {
                const d = new Date(comment.createdAt);
                if (isNaN(d.getTime())) return '';
                return d.toLocaleDateString(isAr ? 'ar-AE' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
              } catch {
                return '';
              }
            })();

            const initial = comment.userName ? comment.userName.trim().charAt(0).toUpperCase() : 'U';

            return (
              <article
                key={comment.id}
                className="bg-card/40 border border-border/70 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary/80 text-primary border border-border/80 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {initial || <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {comment.userName}
                      </h4>
                      <time dateTime={comment.createdAt} className="text-[10px] text-muted-foreground font-medium">
                        {formattedDate}
                      </time>
                    </div>
                  </div>
                </div>

                {/* Plain-text sanitized rendering — 0 dangerouslySetInnerHTML */}
                <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed whitespace-pre-line text-start">
                  {comment.text}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

