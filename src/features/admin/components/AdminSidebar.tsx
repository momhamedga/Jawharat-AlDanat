'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, MessageSquare, Shield, ArrowRight } from 'lucide-react';
import { AdminUser } from '@/features/auth/types/auth.types';
import { isSuperAdmin } from '@/features/auth/services/rbac.service';

interface AdminSidebarProps {
  user: AdminUser;
  onNavigate?: () => void;
}

export function AdminSidebar({ user, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: 'مدير عام',
    ADMIN: 'مدير عمليات',
    EDITOR: 'محرر محتوى',
  };

  const navItems = [
    {
      href: '/admin',
      label: 'لوحة التحكم',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/blog',
      label: 'المقالات والأخبار',
      icon: FileText,
      exact: false,
    },
    {
      href: '/admin/comments',
      label: 'مراجعة التعليقات',
      icon: MessageSquare,
      exact: false,
    },
    ...(isSuperAdmin(user)
      ? [
          {
            href: '/admin/audit',
            label: 'سجل الرقابة والعمليات',
            icon: Shield,
            exact: false,
          },
        ]
      : []),
  ];

  return (
    <aside className="h-full flex flex-col justify-between p-4 sm:p-6 bg-card border-e border-border/80 text-foreground select-none" dir="rtl">
      
      {/* 👑 Top Section: Brand & Nav Links */}
      <div className="space-y-6">
        
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-3 px-2 pb-4 border-b border-border/60">
          <div className="relative w-9 h-9 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="شعار جوهرة الدانة"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-foreground truncate">
              جوهرة الدانة
            </span>
            <span className="text-[10px] font-semibold text-primary truncate">
              لوحة الإدارة المركزية
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5" aria-label="Admin Sidebar Navigation">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/');

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* 👤 Bottom Section: User Role & Public Return */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        
        {/* Authenticated User Pill */}
        <div className="p-3 rounded-2xl bg-secondary/40 border border-border/60 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-foreground truncate">
              {user.fullName}
            </span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 shrink-0">
              {roleLabels[user.role] || user.role}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">
            {user.email}
          </p>
        </div>

        {/* Return to Public Site */}
        <Link
          href="/ar"
          className="flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1"
        >
          <span>الموقع العام</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>

    </aside>
  );
}
