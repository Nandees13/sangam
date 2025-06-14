import HeroScroller from '@/components/HeroScroller';
import AboutSection from '@/components/AboutSection';
import TeamInitiativeScroller from '@/components/TeamInitiativeScroller';
import EventTimeline from '@/components/EventTimeline';
import AchievementCards from '@/components/AchievementCards';
import NewsCards from '@/components/NewsCards';
import { getAboutContent, getTeamMembers, getInitiatives, getEvents, getAchievements, getNews } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  // Fetch data from Supabase
  const aboutContent = await getAboutContent();
  const initiatives = await getInitiatives(3); // Get 3 latest initiatives
  const upcomingEvents = await getEvents(3, true); // Get 3 upcoming events
  const achievements = await getAchievements(3); // Get 3 latest achievements
  const latestNews = await getNews(3); // Get 3 latest news items
  const heroImages = [
  {
    id: "hero-1",
    image_path: "/hero/hero1-img.jpeg",
    caption: "Building Stronger Communities Together"
  },
  {
    id: "hero-2", 
    image_path: "/hero/hero2-img.jpeg", // Add more images as needed
    caption: "Innovation Through Collaboration"
  },
  {
    id: "hero-3",
    image_path: "/hero/hero3-img.jpeg",
    caption: "Empowering Future Generations"
  }
];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroScroller images={heroImages} />

      {/* About Section */}
      {/* <section id="about" className="container py-16 md:py-24">
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
      </section>
      
      {/* Initiatives Section */}
      <section id="initiatives" className="bg-muted py-16 md:py-10">
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
      
      {/* Events Section */}
      <section id="events" className="container py-16 md:py-10">
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
      <section id="achievements" className="bg-muted py-16 md:py-10">
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