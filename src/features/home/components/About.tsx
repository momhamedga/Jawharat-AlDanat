import Image from 'next/image';
import { Shield, Sparkles, Clock, Target, Compass } from 'lucide-react';

interface AboutProps {
  locale: string;
}

export default function About({ locale }: AboutProps) {
  const isAr = locale === 'ar';

  const coreValues = [
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      titleAr: 'الجودة أولاً',
      titleEn: 'Quality First',
      descAr: 'معايير فائقة لا نساوم عليها في كل تفصيل من خدماتنا.',
      descEn: 'Uncompromising standards across every dimension of our craft.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      titleAr: 'العميل في القلب',
      titleEn: 'Client Centricity',
      descAr: 'رضاكم وثقتكم هي مقياس نجاحنا الحقيقي وغايتنا الدائمة.',
      descEn: 'Your trust and satisfaction are our true benchmark of success.',
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      titleAr: 'الالتزام والدقة',
      titleEn: 'Precision & Punctuality',
      descAr: 'تنفيذ احترافي دقيق ننجز به ما نعد في الوقت المحدد دائماً.',
      descEn: 'Flawless execution delivering exactly what is promised on time.',
    },
  ];

  return (
    <section
      className="relative w-full bg-card/40 border-b border-border/60 py-20 lg:py-28 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={isAr ? 'عن الشركة والرؤية' : 'About & Vision'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 🏛️ Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{isAr ? 'عن جوهرة الدانة • الرؤية والرسالة' : 'About Jawharat Al Danat • Vision & Mission'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {isAr ? 'هوية وطنية راسخة ورؤية استراتيجية للمستقبل' : 'A Rooted Heritage & Strategic Future Vision'}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {isAr
              ? 'انطلقت جوهرة الدانة من العاصمة أبوظبي لترسي نموذجاً فريداً يجمع بين الدقة الحرفية في حماية السيارات وإدارة الفعاليات الرسمية بأعلى معايير الفخامة.'
              : 'Established in Abu Dhabi, Jawharat Al Danat sets an exceptional standard combining bespoke automotive protection with prestigious official event management.'}
          </p>
        </div>

        {/* 🧱 2-Column Balanced Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Visual Asset (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-lg group">
              <Image
                src="/images/about.webp"
                alt={isAr ? 'فريق ومقر جوهرة الدانة' : 'Jawharat Al Danat Headquarters'}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 start-4 end-4 p-4 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 text-xs flex justify-between items-center">
                <span className="font-bold text-foreground">
                  {isAr ? 'تأسست في أبوظبي' : 'Founded in Abu Dhabi'}
                </span>
                <span className="text-primary font-semibold">
                  {isAr ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}
                </span>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mission Box */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>{isAr ? 'رسالتنا' : 'Our Mission'}</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
                {isAr
                  ? 'صنع تجارب استثنائية تجمع بين الفخامة والاحترافية، لنكون الخيار الأول لكل من يبحث عن التميز في دولة الإمارات.'
                  : 'Crafting exceptional experiences that blend absolute luxury with master professionalism, to remain the premier choice across the UAE.'}
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>{isAr ? 'رؤيتنا 2031' : 'Our Vision 2031'}</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
                {isAr
                  ? 'أن نكون العلامة الأبرز والأكثر ثقة في إدارة الفعاليات الكبرى وحلول العناية الفائقة بالسيارات على مستوى الدولة.'
                  : 'To be the most prominent and trusted brand in high-level event management and premium automotive care across the nation.'}
              </p>
            </div>

          </div>

        </div>

        {/* ⚜️ 3 Core Values Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border/60">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-3 transition-colors hover:border-primary/40"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 w-fit">
                {val.icon}
              </div>
              <h3 className="text-base font-bold text-foreground">
                {isAr ? val.titleAr : val.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isAr ? val.descAr : val.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}