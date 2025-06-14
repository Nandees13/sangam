'use client'

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn, formatDate, isDeadlineExpired } from '@/lib/utils';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  description: string;
};

type Initiative = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  deadline: string;
};

type Item = TeamMember | Initiative;

interface TeamInitiativeScrollerProps {
  items: Item[];
  type: 'team' | 'initiative';
}

export default function TeamInitiativeScroller({ items, type }: TeamInitiativeScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  const scrollAmount = 300;

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      // Initial check
      checkScrollButtons();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, [items]);

  const scrollLeftButton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mouse drag scrolling functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setCurrentScrollPosition(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = currentScrollPosition - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Fallback items if none provided
  const getFallbackItems = () => {
    if (type === 'team') {
      return [
        {
          id: 'fallback1',
          name: 'Priya Sharma',
          role: 'President',
          image_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
          description: 'Priya has been leading Arivial Sangam for 5 years, bringing extensive experience in community development.',
        },
        {
          id: 'fallback2',
          name: 'Raj Kumar',
          role: 'Director of Operations',
          image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
          description: 'Raj oversees the day-to-day operations and ensures our initiatives are executed effectively.',
        },
        {
          id: 'fallback3',
          name: 'Ananya Patel',
          role: 'Community Outreach',
          image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          description: 'Ananya builds partnerships with local organizations to expand our community impact.',
        }
      ] as TeamMember[];
    } else {
      return [
        {
          id: 'fallback1',
          title: 'Digital Literacy Program',
          description: 'Providing technology education to underserved communities to bridge the digital divide.',
          image_url: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg',
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        },
        {
          id: 'fallback2',
          title: 'Cultural Heritage Preservation',
          description: 'Documenting and preserving traditional arts, crafts, and knowledge for future generations.',
          image_url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
        },
        {
          id: 'fallback3',
          title: 'Youth Mentorship Program',
          description: 'Connecting experienced professionals with young individuals for career guidance and skill development.',
          image_url: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg',
          deadline: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        }
      ] as Initiative[];
    }
  };

  const displayItems = items.length > 0 ? items : getFallbackItems();

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {showLeftArrow && (
        <button
          onClick={scrollLeftButton}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 p-2 rounded-full shadow-md border border-border hover:bg-muted focus:outline-none"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
      )}
      
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 p-2 rounded-full shadow-md border border-border hover:bg-muted focus:outline-none"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
        </button>
      )}
      
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 snap-x no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {displayItems.map((item) => (
          <Card 
            key={item.id} 
            className={cn(
              "flex-shrink-0 w-[300px] snap-start overflow-hidden",
              type === 'initiative' && 'deadline' in item && isDeadlineExpired(item.deadline) 
                ? 'border-muted' 
                : ''
            )}
          >
            <div className="relative h-60">
              <Image
  src={
    item.image_url && item.image_url !== ''
      ? item.image_url
      : type === 'team'
        ? 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg'
        : 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg'
  }
  alt={type === 'team' ? (item.name || '') : (item.title || '')}
  fill
/>
              
              {type === 'initiative' && 'deadline' in item && (
                <div className={cn(
                  "absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full",
                  isDeadlineExpired(item.deadline)
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground"
                )}>
                  {isDeadlineExpired(item.deadline) ? 'Completed' : `Deadline: ${formatDate(item.deadline)}`}
                </div>
              )}
            </div>
            
            <CardContent className="pt-6">
              {type === 'team' && 'role' in item && (
                <div className="text-sm font-medium text-primary mb-1">{item.role}</div>
              )}
              
              <h3 className="text-xl font-bold mb-2">
                {type === 'team' ? ('name' in item ? item.name : '') : ('title' in item ? item.title : '')}
              </h3>
              
              <p className={cn(
                "text-muted-foreground",
                type === 'team' ? 'line-clamp-3' : 'line-clamp-3'
              )}>
                {item.description}
              </p>
            </CardContent>
            
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={type === 'team' ? `/team#${item.id}` : `/initiatives#${item.id}`}>
                  {type === 'team' ? 'View Profile' : 'Learn More'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}