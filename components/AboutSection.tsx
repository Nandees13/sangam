import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type AboutContent = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
};

export interface AboutSectionProps {
  content?: AboutContent;
  isPreview?: boolean;
}

export const fallbackContent: AboutContent = {
  id: 'about-static',
  title: 'About Arivial Sangam',
  description: `
    <p>Arivial Sangam is a community organization dedicated to empowering individuals through knowledge sharing and collaborative initiatives.</p>
    <p>Founded on the principles of education, cultural preservation, and community development, we work to create positive change in our society.</p>
    <p>Our organization brings together experts, enthusiasts, and community members to address local challenges and create sustainable solutions.</p>
    <p>Through workshops, events, and ongoing programs, we aim to build a stronger, more connected community.</p>
  `,
  image_url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg',
};

export default function AboutSection({ content, isPreview = false }: AboutSectionProps) {
  const aboutContent = content || fallbackContent;

  return (
    <div className={cn("grid grid-cols-1", isPreview ? "lg:grid-cols-2 gap-12 items-center" : "gap-8")}>
      {/* Image: show only in preview */}
      {isPreview && (
        <div className="relative rounded-lg overflow-hidden shadow-md h-[400px]">
          <Image
            src='/public/hero/hero1-img.jpeg'
            alt="About Arivial Sangam"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className={cn("flex flex-col", isPreview ? "" : "mt-8")}>
        <h3 className={cn(
          "font-bold mb-4",
          isPreview ? "text-2xl" : "text-3xl"
        )}>
          {aboutContent.title}
        </h3>

        <div
          className={cn("prose max-w-none", isPreview ? "line-clamp-4" : "")}
          dangerouslySetInnerHTML={{ __html: aboutContent.description }}
        />

        {isPreview && (
          <div className="mt-6">
            <Button asChild variant="outline" size="sm">
              <Link href="/about">Read More</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
