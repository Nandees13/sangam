'use client'

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeroImage = {
  id: string;
  image_path: string; // Changed from image_url to image_path
  caption: string;
};

interface HeroScrollerProps {
  images: HeroImage[];
}

export default function HeroScroller({ images }: HeroScrollerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  // Fallback image with local path
  const fallbackImage = {
    id: 'fallback',
    image_path: '/images/hero/default-hero.jpg', // Local path in public/images/hero/
    caption: 'Empowering communities through knowledge and action',
  };

  const heroImages = images.length > 0 ? images : [fallbackImage];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, heroImages.length]);

  // Handle slide transitions
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, heroImages.length]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, heroImages.length]);

  // Handle dot navigation
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  if (pathname !== '/') {
    return null;
  }

  

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Images */}
      {heroImages.map((image, index) => (
        <div 
          key={image.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          <Image
            src={image.image_path} // Changed from image_url to image_path
            alt={image.caption}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl">
          {heroImages[currentIndex]?.caption || 'Empowering Communities'}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-white/90">
          Building a better future through knowledge, collaboration, and innovation
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="text-base">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white/20 hover:text-white text-base">
            <Link href="https://vijnanabharati.org/member/register/">Get Involved</Link>
          </Button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300 focus:outline-none',
              index === currentIndex 
                ? 'bg-white scale-100' 
                : 'bg-white/50 hover:bg-white/80 scale-75'
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Down Indicator */}
      {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <a 
          href="#about" 
          className="text-white flex flex-col items-center"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
        </a>
      </div> */}
    </div>
  );
}