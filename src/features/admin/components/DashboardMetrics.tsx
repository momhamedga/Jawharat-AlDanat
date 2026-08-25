import { DashboardStats } from '../types/cms.types';
import { FileText, CheckCircle, FileEdit, Archive, MessageSquare, Clock, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

interface DashboardMetricsProps {
  stats: DashboardStats;
}

export function DashboardMetrics({ stats }: DashboardMetricsProps) {
  const cards = [
    {
      title: 'إجمالي المقالات',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-foreground',
      bg: 'bg-secondary/40',
      border: 'border-border/80',
    },
    {
      title: 'المقالات المنشورة',
      value: stats.publishedArticles,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
    {
      title: 'المسودات الحالية',
      value: stats.draftArticles,
      icon: FileEdit,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      title: 'المقالات المؤرشفة',
      value: stats.archivedArticles,
      icon: Archive,
      color: 'text-muted-foreground',
      bg: 'bg-muted/40',
      border: 'border-border/60',
    },
    {
      title: 'التعليقات المعتمدة',
      value: stats.approvedComments,
      icon: MessageSquare,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/30',
    },
    {
      title: 'بانتظار المراجعة',
      value: stats.pendingComments,
      icon: Clock,
      color: stats.pendingComments > 0 ? 'text-amber-500' : 'text-muted-foreground',
      bg: stats.pendingComments > 0 ? 'bg-amber-500/15' : 'bg-secondary/30',
      border: stats.pendingComments > 0 ? 'border-amber-500/40' : 'border-border/60',
      href: '/admin/comments?status=PENDING',
    },
    {
      title: 'إجمالي المشاهدات',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
    },
    {
      title: 'إجمالي الإعجابات',
      value: stats.totalLikes.toLocaleString(),
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4" dir="rtl">
      {cards.map((card) => {
        const Icon = card.icon;
        const content = (
          <div
            className={`p-4 rounded-2xl border ${card.border} ${card.bg} flex flex-col justify-between space-y-2 shadow-2xs h-full transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-muted-foreground truncate">
                {card.title}
              </span>
              <Icon className={`w-4 h-4 ${card.color} shrink-0`} />
            </div>
            <span className="text-xl sm:text-2xl font-black text-foreground">
              {card.value}
            </span>
          </div>
        );

        if (card.href) {
          return (
            <Link key={card.title} href={card.href} className="block cursor-pointer">
              {content}
            </Link>
          );
        }

        return <div key={card.title}>{content}</div>;
      })}
    </div>
  );
}
