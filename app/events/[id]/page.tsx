import { Metadata } from 'next';
import { getEventById } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = await getEventById(params.id);

  if (!event) {
    return {
      title: 'Event Not Found - Arivial Sangam',
    };
  }
  return {
    title: `${event.title} - Arivial Sangam Events`,
    description: event.description.substring(0, 160),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Event Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src={event.image_url || 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg'}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container pb-12 md:pb-16">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full mb-4">
              {formatDate(event.date)}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-6">About This Event</h2>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>

              <div className="space-y-4">
                <div>
                  <div className="font-medium">Date & Time</div>
                  <div className="text-muted-foreground">{formatDate(event.date, true)}</div>
                </div>

                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">
                    {event.location || 'Arivial Sangam Community Center'}
                  </div>
                </div>

                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-muted-foreground">info@arivialsangam.org</div>
                </div>
              </div>
              <div className="mt-8">
                <Button className="w-full">Register Now</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild variant="outline">
            <Link href="/events">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Events
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
