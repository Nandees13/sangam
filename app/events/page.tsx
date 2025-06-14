import { Metadata } from 'next';
import { getEvents } from '@/lib/supabase-server';
import EventTimeline from '@/components/EventTimeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isUpcoming } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Events - Arivial Sangam',
  description: 'Upcoming and past events hosted by Arivial Sangam.',
};

export default async function EventsPage() {
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter(event => isUpcoming(event.date));
  const pastEvents = allEvents.filter(event => !isUpcoming(event.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      {/* <div className="bg-muted py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl text-muted-foreground">Join us at our upcoming events or revisit our past gatherings</p>
        </div>
      </div>
       */}
      {/* Events Content */}
      <section className="container py-16 md:py-24">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground max-w-2xl">
                Mark your calendars and join us at these upcoming events.
              </p>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <EventTimeline events={upcomingEvents} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Events</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground max-w-2xl">
                Revisit our past events and the memories we've created together.
              </p>
            </div>
            
            {pastEvents.length > 0 ? (
              <EventTimeline events={pastEvents} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past events to display.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Host an Event */}
      {/* <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Host an Event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We welcome collaboration opportunities for hosting events that align with our mission. 
            If you're interested in partnering with us, please reach out.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-transparent border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section> */}
    </div>
  );
}