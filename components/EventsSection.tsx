"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  image_url: string;
  id: string;
  date: string;
  title: string;
  description: string;
}

interface EventsSectionProps {
  upcomingEvents: Event[];
}

export default function EventsSection({ upcomingEvents }: EventsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <section id="events" className="container py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-xl">No upcoming events at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="container py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-muted-foreground max-w-xl">Join us at our upcoming events and be part of our community.</p>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {upcomingEvents.map((event, index) => (
              <div key={index} className="min-w-full px-4">
                <Card
                  className="relative bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507206130118-b5909f1b5c2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  }}
                >
                  <div className="absolute inset-0 bg-white border-black" />
                  <CardContent className="relative p-8 text-black flex flex-col md:flex-row items-center md:items-start gap-">
  {/* Text Section */}
  <div className="flex-1">
    <p className="text-sm font-semibold mb-2">{event.date}</p>
    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
    <p className="text-sm mb-4">{event.description}</p>
    <Button
      variant="outline"
      size="sm"
      asChild
      className="text-black border-black hover:bg-white/20"
    >
      <Link href="/events">Learn More</Link>
    </Button>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/3">
    <img
      src={event.image_url || "/placeholder.jpg"}
      alt={event.title}
      className="rounded-lg object-cover w-full h-48 md:h-full"
    />
  </div>
</CardContent>

                </Card>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <Button asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
    </section>
  );
}
