// src/app/[locale]/page.tsx
import About from '@/components/home/About';
import EliteEvents from '@/components/home/EliteEvents';
import EventsConferences from '@/components/home/EventsConferences';
import EventShowcase from '@/components/home/EventShowcase';
import Hero from '@/components/home/Hero';
import PpfService from '@/components/home/PpfService';
import ServicesGrid from '@/components/home/ServicesGrid';
import StoryTimeline from '@/components/home/StoryTimeline';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  
  return (
    <>
      <Hero locale={locale} />
            <About locale={locale} />
              <ServicesGrid locale={locale} />
                 <StoryTimeline locale={locale} />
  <EventsConferences locale={locale} />
  <EventShowcase locale={locale} />
  <PpfService locale={locale} />
    </>
  );
}