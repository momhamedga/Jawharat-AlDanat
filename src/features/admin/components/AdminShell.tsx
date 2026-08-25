import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminUser } from '@/features/auth/types/auth.types';

interface AdminShellProps {
  user: AdminUser;
  title?: string;
  children: React.ReactNode;
}

export function AdminShell({ user, title, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex" dir="rtl">
      
      {/* ♿ Accessible Skip to Main Content Link */}
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      {/* 💻 Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden lg:block w-64 xl:w-72 shrink-0 border-e border-border/80 min-h-screen sticky top-0 h-screen">
        <AdminSidebar user={user} />
      </div>

      {/* 📱💻 Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} title={title} />
        
        <main
          id="admin-main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 focus:outline-none"
        >
          {children}
        </main>
      </div>

    </div>
  );
}
