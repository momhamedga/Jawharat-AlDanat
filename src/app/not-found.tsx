import Link from 'next/link';
import '@/app/globals.css';
import { Compass } from 'lucide-react';

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased min-h-screen flex items-center justify-center p-4">
        <main className="max-w-md w-full p-8 rounded-3xl border border-border/80 bg-card shadow-xl text-center space-y-6">
          <div className="p-3.5 rounded-2xl bg-primary/10 text-primary w-fit mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-black text-primary font-sans">404</span>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              الصفحة غير موجودة • Page Not Found
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              عذراً، الرابط المطلوب غير متوفر أو تم نقله.
            </p>
          </div>

          <div className="pt-2 flex gap-3 justify-center">
            <Link
              href="/ar"
              className="p-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors"
            >
              العودة للرئيسية • Return Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
