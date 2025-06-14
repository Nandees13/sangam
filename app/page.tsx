import HeroScroller from '@/components/HeroScroller';
import AboutSection from '@/components/AboutSection';
import TeamInitiativeScroller from '@/components/TeamInitiativeScroller';
import EventTimeline from '@/components/EventTimeline';
import AchievementCards from '@/components/AchievementCards';
import NewsCards from '@/components/NewsCards';
import { getHeroImages, getAboutContent, getTeamMembers, getInitiatives, getEvents, getAchievements, getNews } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

<<<<<<< HEAD
=======
// Export revalidate for Incremental Static Regeneration (ISR)
export const revalidate = 600; // Revalidate every 10 minutes

>>>>>>> 6ae2606 (new addition)
export default async function Home() {
  // Fetch data from Supabase
  const heroImages = await getHeroImages();
  const aboutContent = await getAboutContent();
  const initiatives = await getInitiatives(3); // Get 3 latest initiatives
  const upcomingEvents = await getEvents(3, true); // Get 3 upcoming events
  const achievements = await getAchievements(3); // Get 3 latest achievements
  const latestNews = await getNews(3); // Get 3 latest news items
<<<<<<< HEAD
  
=======

>>>>>>> 6ae2606 (new addition)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroScroller images={heroImages} />
<<<<<<< HEAD
      
      {/* About Section */}
      <section id="about" className="container py-16 md:py-24">
=======

      {/* About Section */}
      {/* <section id="about" className="container py-16 md:py-24">
>>>>>>> 6ae2606 (new addition)
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Arivial Sangam</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
        </div>
        <AboutSection content={aboutContent} isPreview={true} />
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
<<<<<<< HEAD
      </section>
      
=======
      </section> */}

      {/* Events Section */}
      <section id="events" className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">Join us at our upcoming events and be part of our community.</p>
        </div>
        <EventTimeline events={upcomingEvents} />
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </section>

>>>>>>> 6ae2606 (new addition)
      {/* Initiatives Section */}
      <section id="initiatives" className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Initiatives</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">Explore our key initiatives aimed at community development and empowerment.</p>
          </div>
          <TeamInitiativeScroller items={initiatives} type="initiative" />
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/initiatives">View All Initiatives</Link>
            </Button>
          </div>
        </div>
      </section>
<<<<<<< HEAD
      
      {/* Events Section */}
      <section id="events" className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">Join us at our upcoming events and be part of our community.</p>
        </div>
        <EventTimeline events={upcomingEvents} />
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section id="achievements" className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">Celebrating our milestones and successes.</p>
          </div>
          <AchievementCards achievements={achievements} />
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/achievements">View All Achievements</Link>
            </Button>
          </div>
        </div>
      </section>
      
=======

      {/* Achievements Section */}
      <section id="key-achievements" className="bg-[#1d2b36] text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">KEY ACHIEVEMENTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.length > 0 ? (
              achievements.map((item) => (
                <div key={item.id} className="relative group overflow-hidden rounded-md shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <h3 className="text-lg font-semibold p-4 group-hover:underline">
                      <span className="text-orange-400 mr-2">›</span>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No achievements available.</p>
            )}
          </div>
        </div>
      </section>

>>>>>>> 6ae2606 (new addition)
      {/* News Section */}
      <section id="news" className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">Stay updated with our latest news and announcements.</p>
        </div>
        <NewsCards news={latestNews} />
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </section>
<<<<<<< HEAD
      
=======

>>>>>>> 6ae2606 (new addition)
      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Be part of our mission to empower and strengthen our community through knowledge and action.</p>
          <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}