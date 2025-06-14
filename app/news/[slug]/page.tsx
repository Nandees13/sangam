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
    </div>
  );
}