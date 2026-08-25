import { Mail, Phone, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface ContactInfoProps {
  locale: string;
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const isAr = locale === 'ar';

  const dict = {
    directHeading: isAr ? 'القنوات المباشرة' : 'Direct Channels',
    directSub: isAr ? 'تواصل فوري مع فريق الاستشارات' : 'Immediate communication with our advisors',
    locationsHeading: isAr ? 'المقرات الإقليمية' : 'Regional Presence',
    locationsSub: isAr ? 'مراكز الخدمة والإدارة التنفيذية' : 'Service centers & executive administration',
    hq: isAr ? 'المقر الرئيسي — أبوظبي' : 'Headquarters — Abu Dhabi',
    hqAddress: siteConfig.contact.locations.abuDhabi[isAr ? 'ar' : 'en'],
    dubaiBranch: isAr ? 'مركز الخدمات — دبي' : 'Service Hub — Dubai',
    dubaiAddress: siteConfig.contact.locations.dubai[isAr ? 'ar' : 'en'],
    primaryPhoneLabel: isAr ? 'الهاتف الرئيسي' : 'Primary Line',
    secondaryPhoneLabel: isAr ? 'الخط المباشر' : 'Direct Line',
    whatsappLabel: isAr ? 'المحادثة الفورية عبر واتساب' : 'Instant WhatsApp Support',
    emailLabel: isAr ? 'البريد الإلكتروني الرسمي' : 'Official Enterprise Email',
    commitmentHeading: isAr ? 'سرعة الاستجابة والخصوصية' : 'Response & Confidentiality',
    commitmentText: isAr
      ? 'نلتزم بالرد على جميع الاستفسارات والطلبات الخاصة خلال ساعات العمل الرسمية بأعلى درجات السرية والاحترافية.'
      : 'All executive inquiries and bespoke service requests receive prompt attention with strict confidentiality.',
  };

  const primaryPhone = siteConfig.contact.phones[0];
  const secondaryPhone = siteConfig.contact.phones[1];

  return (
    <aside
      className="bg-card/40 border border-border/70 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-sm"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── 01. Direct Communication Channels ── */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-primary uppercase text-start block">
            <bdi className="font-mono">01.</bdi> {dict.directHeading}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5 text-start">{dict.directSub}</p>
        </div>

        <div className="space-y-3">
          {/* Primary Phone */}
          {primaryPhone && (
            <a
              href={`tel:${primaryPhone.raw}`}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-background/50 border border-border/60 hover:border-primary/50 hover:bg-background/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/80 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {dict.primaryPhoneLabel}
                </p>
                <p
                  className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 text-left font-mono"
                  dir="ltr"
                >
                  {primaryPhone.display}
                </p>
              </div>
            </a>
          )}

          {/* Secondary Phone */}
          {secondaryPhone && (
            <a
              href={`tel:${secondaryPhone.raw}`}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-background/50 border border-border/60 hover:border-primary/50 hover:bg-background/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/80 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {dict.secondaryPhoneLabel}
                </p>
                <p
                  className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 text-left font-mono"
                  dir="ltr"
                >
                  {secondaryPhone.display}
                </p>
              </div>
            </a>
          )}

          {/* WhatsApp Direct */}
          <a
            href={siteConfig.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-3 rounded-xl bg-background/50 border border-border/60 hover:border-primary/50 hover:bg-background/80 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/80 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {dict.whatsappLabel}
              </p>
              <p
                className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 text-left font-mono"
                dir="ltr"
              >
                {siteConfig.contact.whatsapp.display}
              </p>
            </div>
          </a>

          {/* Official Email */}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-3.5 p-3 rounded-xl bg-background/50 border border-border/60 hover:border-primary/50 hover:bg-background/80 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/80 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {dict.emailLabel}
              </p>
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                {siteConfig.contact.email}
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* ── 02. Regional Presence (Abu Dhabi & Dubai) ── */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-primary uppercase text-start block">
            <bdi className="font-mono">02.</bdi> {dict.locationsHeading}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5 text-start">{dict.locationsSub}</p>
        </div>

        <div className="space-y-3">
          {/* Abu Dhabi */}
          <div className="p-3.5 rounded-xl bg-background/40 border border-border/60 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-foreground">{dict.hq}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {dict.hqAddress}
              </p>
            </div>
          </div>

          {/* Dubai */}
          <div className="p-3.5 rounded-xl bg-background/40 border border-border/60 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-foreground">{dict.dubaiBranch}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {dict.dubaiAddress}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. Service Commitment & Discretion ── */}
      <section className="pt-6 border-t border-border/60">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-foreground">{dict.commitmentHeading}</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {dict.commitmentText}
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}