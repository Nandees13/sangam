<<<<<<< HEAD
import { Metadata } from 'next';
import { getNewsBySlug, getRelatedNews } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import NewsCards from '@/components/NewsCards';

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found - Arivial Sangam',
    };
  }
  
  return {
    title: `${article.title} - Arivial Sangam News`,
    description: article.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getNewsBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = await getRelatedNews(article.id, 3);
  
  return (
    <div className="min-h-screen">
      {/* Article Image Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image 
          src={article.image_url || 'https://images.pexels.com/photos/6592696/pexels-photo-6592696.jpeg'}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container pb-12 md:pb-16">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full mb-4">
              {formatDate(article.published_at)}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{article.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </article>
            
            <div className="mt-12 pt-8 border-t">
              <Button asChild variant="outline">
                <Link href="/news">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"></path></svg>
                  Back to News
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              
              {relatedArticles.length > 0 ? (
                <div className="space-y-6">
                  {relatedArticles.map((item) => (
                    <div key={item.id} className="group">
                      <Link href={`/news/${item.slug}`} className="block">
                        <div className="relative h-36 mb-3 overflow-hidden rounded-md">
                          <Image
                            src={item.image_url || 'https://images.pexels.com/photos/6592696/pexels-photo-6592696.jpeg'}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(item.published_at)}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No related articles found.</p>
              )}
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-3">Share This Article</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
=======
import { getNewsBySlug, getRelatedNews } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import NewsCards from '@/components/NewsCards';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Initialize Supabase client for image URL generation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// Export revalidate for Incremental Static Regeneration (optional)
export const revalidate = 600; // Revalidate every 10 minutes

// Generate static parameters for all news slugs
export async function generateStaticParams() {
  const { data, error } = await supabase
    .from('news')
    .select('slug');

  if (error) {
    console.error('Error fetching news slugs:', error);
    return [];
  }

  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsPage({ params }: { params: { slug: string } }) {
  // Fetch the news article by slug
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    notFound(); // Return 404 if news article is not found
  }

  // Fetch related news (excluding the current article)
  const relatedNews = await getRelatedNews(news.id, 3);

  // Map news data to include public image URL
  const mappedNews = {
    id: news.id,
    title: news.title || '',
    content: news.content || '',
    image: news.image_url ? supabase.storage.from('images').getPublicUrl(news.image_url).data.publicUrl : '',
    date: news.published_at || '',
  };

  // Map related news to include public image URLs
  const mappedRelatedNews = relatedNews.map((item) => ({
    id: item.id,
    title: item.title || '',
    content: item.content || '',
    image: item.image_url ? supabase.storage.from('images').getPublicUrl(item.image_url).data.publicUrl : '',
    date: item.published_at || '',
  }));

  return (
    <div className="container py-16 md:py-24">
      {/* News Article */}
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{mappedNews.title}</h1>
        {mappedNews.image && (
          <img
            src={mappedNews.image}
            alt={mappedNews.title}
            className="w-full h-96 object-cover rounded-md mb-6"
          />
        )}
        <p className="text-muted-foreground mb-4">
          Published on {new Date(mappedNews.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="prose prose-lg dark:prose-invert mb-8">
          {mappedNews.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </article>

      {/* Related News */}
      {mappedRelatedNews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Related News</h2>
          <NewsCards news={mappedRelatedNews} />
        </section>
      )}
>>>>>>> 6ae2606 (new addition)
    </div>
  );
}