'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, isUpcoming } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  location?: string;
};

interface EventTimelineProps {
  events: Event[];
}

export default function EventTimeline({ events }: EventTimelineProps) {
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  
  // Fallback events if none are provided
  const fallbackEvents = [
    {
      id: 'fallback1',
      title: 'Annual Community Festival',
      date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
      description: 'Join us for our annual celebration of culture, art, and community with performances, food, and activities for the whole family.',
      image_url: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
      location: 'Community Park'
    },
    {
      id: 'fallback2',
      title: 'Educational Workshop Series',
      date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
      description: 'A series of workshops focusing on digital literacy, financial education, and skill development for community members of all ages.',
      image_url: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg',
      location: 'Arivial Sangam Center'
    }
  ];
  
  const displayEvents = events.length > 0 ? events : fallbackEvents;
  
  const toggleEvent = (eventId: string) => {
    setExpandedEvents(prev => 
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };
  
  if (displayEvents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No events to display at this time.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {displayEvents.map((event, index) => {
        const isExpanded = expandedEvents.includes(event.id);
        const upcoming = isUpcoming(event.date);
        
        return (
          <div key={event.id} className={cn(
            "relative rounded-lg overflow-hidden shadow-sm border transition-all",
            upcoming ? "border-primary/50" : "border-muted",
            isExpanded ? "shadow-md" : ""
          )}>
            <div className="absolute top-4 left-4 z-10">
              <div className={cn(
                "px-3 py-1 text-sm font-medium rounded-full",
                upcoming 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted-foreground/20 text-muted-foreground"
              )}>
                {upcoming ? 'Upcoming' : 'Past Event'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 md:h-auto md:col-span-1">
                <Image
                  src={event.image_url || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 md:col-span-2">
                <div className="mb-2 font-semibold text-primary">{formatDate(event.date, true)}</div>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                
                <div className="mb-3 flex items-center text-muted-foreground text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path></svg>
                  <span>{event.location || 'Arivial Sangam Center'}</span>
                </div>
                
                <div className={cn(
                  "prose prose-sm max-w-none transition-all duration-300",
                  isExpanded ? "" : "line-clamp-2"
                )}>
                  <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleEvent(event.id)}
                    aria-expanded={isExpanded}
                    className="text-muted-foreground"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </Button>
                  
                  <Button asChild size="sm">
                    <Link href={`/events/${event.id}`}>
                      View Details
                    </Link>
                  </Button>
                  
                  {upcoming && (
                    <Button size="sm" variant="outline">
                      Register
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}