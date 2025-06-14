import AboutSection, { fallbackContent as aboutContent } from '@/components/AboutSection';
import type { AboutContent } from '@/components/AboutSection';

export const metadata = {
  title: 'About | Arivial Sangam',
  description: 'Learn more about Arivial Sangam and its mission.',
};

export default function AboutPage() {
  return (
    <section className="container py-16 md:py-24">
      <AboutSection content={aboutContent} isPreview={false} />
    </section>
  );
}
