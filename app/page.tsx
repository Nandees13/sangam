import HeroScroller from "@/components/HeroScroller";
import AboutSection from "@/components/AboutSection";
import InitiativeScroller from "@/components/InitiativeScroller";
import AchievementCards from "@/components/AchievementCards";
import NewsCards from "@/components/NewsCards";
import EventsSection from "@/components/EventsSection";
import { getAboutContent, getInitiatives, getEvents, getAchievements, getNews } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const [ initiatives, upcomingEvents, achievements, latestNews] = await Promise.all([
    getInitiatives(3),
    getEvents(3, true),
    getAchievements(3),
    getNews(3),
  ]);

  const heroImages = [
    { id: "hero-1", image_path: "/hero/hero1-img.jpeg", caption: "Building Stronger Communities Together" },
    { id: "hero-2", image_path: "/hero/hero2-img.jpeg", caption: "Innovation Through Collaboration" },
    { id: "hero-3", image_path: "/hero/hero3-img.jpeg", caption: "Empowering Future Generations" },
  ];

  return (
    <div className="min-h-screen">
      <HeroScroller images={heroImages} />
      <section id="about" className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Arivial Sangam</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
        </div>
      <AboutSection isPreview />
        
      </section>
      <section id="initiatives" className="bg-muted py-16 md:py-10">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Initiatives</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">Explore our key initiatives aimed at community development and empowerment.</p>
          </div>
          <InitiativeScroller  />
          
        </div>
      </section>
      <EventsSection upcomingEvents={upcomingEvents} />
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
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Be part of our mission to empower and strengthen our community through knowledge and action.</p>
          <Button asChild size="lg" variant="outline" className="text-primary-foreground text-black border-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="https://vijnanabharati.org/member/register/">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}