import { Metadata } from 'next';
import { getInitiatives } from '@/lib/supabase-server';
import InitiativeScroller from '@/components/InitiativeScroller'; // Use InitiativeScroller
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isPast } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Initiatives - Arivial Sangam',
  description: 'Explore the various initiatives undertaken by Arivial Sangam.',
};

export const revalidate = 600;

export default async function InitiativesPage() {
  const allInitiatives = await getInitiatives();
  const activeInitiatives = allInitiatives.filter(
    (initiative: { deadline: any; }) => !initiative.deadline || !isPast(initiative.deadline)
  );
  const pastInitiatives = allInitiatives.filter(
    (initiative: { deadline: any; }) => initiative.deadline && isPast(initiative.deadline)
  );

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-100 py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Initiatives</h1>
          <p className="text-xl text-gray-600">Discover the programs and projects we're working on</p>
        </div>
      </div>

      {/* Initiatives Content */}
      <section className="container py-16">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="active">Active Initiatives</TabsTrigger>
              <TabsTrigger value="past">Past Initiatives</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Initiatives</h2>
              <div className="w-20 h-2 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These are our ongoing initiatives that are currently making an impact in our community.
              </p>
            </div>

            {activeInitiatives.length > 0 ? (
              <InitiativeScroller /> // Correct prop
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No active initiatives at the moment. Check back soon!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Projects</h2>
              <div className="w-20 h-2 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore our completed initiatives and the impact they've had on our community.
              </p>
            </div>

            {pastInitiatives.length > 0 ? (
              <InitiativeScroller  /> // Correct prop
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No past initiatives to display.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Propose Initiative */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have an Idea?</h2>
          <p className="text-lg mb-6 max-w-md mx-auto">
            We welcome new initiative proposals from our community. If you have an idea that aligns with our
            mission, we'd love to hear from you.
          </p>
          <a
            href="/admin"
            className="inline-block bg-transparent border-2 border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Propose an Initiative
          </a>
        </div>
      </section>
    </div>
  );
}