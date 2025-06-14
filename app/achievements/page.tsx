import { Metadata } from 'next';
import { getAchievements } from '@/lib/supabase-server';
import AchievementCards from '@/components/AchievementCards';


type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string; // Required by AchievementCards
};

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  slug: string;
  image_url: string;
  published_at: string;
};

export const metadata: Metadata = {
  title: 'Achievements - Arivial Sangam',
  description: 'Discover the accomplishments and milestones of Arivial Sangam.',
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  // Map data to match Achievement type
  const mappedAchievements: Achievement[] = achievements.map((item) => ({
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    date: item.date || '',
    image_url: item.image_url || '', // Handle missing image_url
  }));

  return (
    <div className="min-h-screen">
      {/* Achievements Content */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones & Recognition</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">
            At Arivial Sangam, we take pride in our accomplishments and the positive impact 
            we've made in our community. Here are some of our notable achievements over the years.
          </p>
        </div>
        
        <AchievementCards achievements={mappedAchievements} />
      </section>
      
      {/* Impact Numbers */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">
              The numbers tell a story of our dedication and the difference we've made.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Years of Service</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Community Initiatives</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">People Impacted</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Awards Received</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}