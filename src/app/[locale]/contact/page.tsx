import ContactForm from "@/components/contact/ContactForm";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
     {/* 🌌 تأثير الإضاءة المحيطية مع المصفوفة المنقطة (Dot Grid Matrix) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-light-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-turquoise/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* 👑 الهيدر الموحد */}
        <ContactHeader locale={locale} />

        {/* 🏢 شبكة عرض قنوات الاتصال والاستمارة التفاعلية */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* كروت قنوات الاتصال والعناوين (5 أعمدة) */}
          <div className="lg:col-span-5">
            <ContactInfo locale={locale} />
          </div>

          {/* استمارة إرسال الطلبات التفاعلية (7 أعمدة) */}
          <div className="lg:col-span-7">
            <ContactForm locale={locale} />
          </div>

        </div>
      </div>
    </div>
  );
}