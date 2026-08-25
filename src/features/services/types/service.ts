export type ServiceCategory = 'automotive' | 'events';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface ServiceCapability {
  title: LocalizedText;
  desc: LocalizedText;
}

export interface ServiceHighlight {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ServiceMethodologyStep {
  step: string;
  title: LocalizedText;
  desc: LocalizedText;
}

export interface ServiceItem {
  slug: string;
  category: ServiceCategory;
  heroImage: string;
  galleryImages?: string[];
  title: LocalizedText;
  shortTitle: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  overview: LocalizedText;
  capabilities: ServiceCapability[];
  highlights: ServiceHighlight[];
  methodology: ServiceMethodologyStep[];
  relatedSlugs: string[];
}
