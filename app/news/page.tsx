import { Metadata } from 'next';
import { getNews } from '@/lib/supabase-server';
import NewsCards from '@/components/NewsCards';

export const metadata: Metadata = {
  title: 'News - Arivial Sangam',
  description: 'Latest news, updates, and announcements from Arivial Sangam.',
};

export default async function NewsPage() {
  const news = await getNews();
  
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      {/* <div className="bg-muted py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-muted-foreground">Stay informed about our latest activities and announcements</p>
        </div>
      </div> */}
      
      {/* News Content */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">
            Keep up with the latest happenings, achievements, and announcements from Arivial Sangam.
          </p>
        </div>
        
        <NewsCards news={news} />
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8">
              Stay updated with our latest news, events, and initiatives directly in your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex h-10 w-full rounded-md border border-primary-foreground/30 bg-transparent px-3 py-2 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 focus:ring-offset-1"
                required
              />
              <button 
                type="submit" 
                className="h-10 px-4 py-2 bg-primary-foreground text-primary rounded-md font-medium hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 focus:ring-offset-1"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm mt-4 text-primary-foreground/70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}