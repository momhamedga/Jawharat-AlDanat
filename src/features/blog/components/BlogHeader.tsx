interface BlogHeaderProps {
  locale: string;
}

export function BlogHeader({ locale }: BlogHeaderProps) {
  const isAr = locale === 'ar';

  return (
    <header className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
      {/* 🏷️ Luxury Kicker Badge */}
      <div className="inline-flex items-center justify-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full">
        <span className="text-[11px] font-bold tracking-widest uppercase">
          {isAr ? 'المعرفة الفاخرة والرؤى الحصرية' : 'Editorial Insights & Luxury Care'}
        </span>
      </div>

      {/* 🏛️ Editorial Page Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
        {isAr ? 'مدونة جوهرة الدانة' : 'Jawharat Al Danat Journal'}
      </h1>

      {/* 📜 Editorial Description */}
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {isAr
          ? 'مقالات متخصصة ودراسات معمقة حول حماية السيارات الفاخرة، والبروتوكول الملكي، وفنون إدارة الفعاليات السيادية في دولة الإمارات.'
          : 'Curated insights and in-depth articles on bespoke automotive preservation, royal protocol, and sovereign event management in the UAE.'}
      </p>

      {/* 🔶 Restrained Brand Diamond Divider */}
      <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto pt-2" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-l from-primary/40 to-transparent" />
        <div className="w-2.5 h-2.5 bg-primary rotate-45 shrink-0 rounded-[1px]" />
        <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
    </header>
  );
}

