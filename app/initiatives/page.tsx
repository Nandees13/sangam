import { Metadata } from 'next';
import { getInitiatives } from '@/lib/supabase-server';
import TeamInitiativeScroller from '@/components/TeamInitiativeScroller';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isDeadlineExpired } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Initiatives - Arivial Sangam',
  description: 'Explore the various initiatives undertaken by Arivial Sangam.',
};

export default async function InitiativesPage() {
  const allInitiatives = await getInitiatives();
  const activeInitiatives = allInitiatives.filter(initiative => !isDeadlineExpired(initiative.deadline));
  const pastInitiatives = allInitiatives.filter(initiative => isDeadlineExpired(initiative.deadline));
  
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Initiatives</h1>
          <p className="text-xl text-muted-foreground">Discover the programs and projects we're working on</p>
        </div>
      </div>
      
      {/* Initiatives Content */}
      <section className="container py-16 md:py-24">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="active">Active Initiatives</TabsTrigger>
              <TabsTrigger value="past">Past Initiatives</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="active">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Initiatives</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground max-w-2xl">
                These are our ongoing initiatives that are currently making an impact in our community.
              </p>
            </div>
            
            {activeInitiatives.length > 0 ? (
              <TeamInitiativeScroller items={activeInitiatives} type="initiative" />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No active initiatives at the moment. Check back soon!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Initiatives</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground max-w-2xl">
                Explore our completed initiatives and the impact they've had on our community.
              </p>
            </div>
            
            {pastInitiatives.length > 0 ? (
              <TeamInitiativeScroller items={pastInitiatives} type="initiative" />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past initiatives to display.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Propose Initiative */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have an Idea?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We welcome new initiative proposals from community members. If you have an idea 
            that aligns with our mission, we'd love to hear from you.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-transparent border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            Propose an Initiative
          </a>
        </div>
      </section>
    </div>
  );
}