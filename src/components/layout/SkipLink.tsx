
export function SkipLink({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-bold focus:shadow-lg focus:outline-none"
    >
      {isAr ? 'الانتقال إلى المحتوى الرئيسي' : 'Skip to main content'}
    </a>
  );
}
