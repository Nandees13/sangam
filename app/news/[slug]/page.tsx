import { getNewsBySlug, getRelatedNews } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import NewsCards from '@/components/NewsCards';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export const revalidate = 600;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const { data, error } = await supabase.from('news').select('slug');

  if (error || !data) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data.map((item) => ({ slug: item.slug }));
}

// Optional: generateMetadata function if needed
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: 'News Not Found - Arivial Sangam',
    };
  }

  return {
    title: `${news.title} - Arivial Sangam News`,
    description: news.content?.substring(0, 160),
  };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);

  if (!news) return notFound();

  const relatedNews = await getRelatedNews(news.id, 3);

  const mappedNews = {
    id: news.id,
    title: news.title || '',
    content: news.content || '',
    image: news.image_url
      ? supabase.storage.from('images').getPublicUrl(news.image_url).data.publicUrl
      : '',
    date: news.published_at || '',
  };

  const mappedRelatedNews = relatedNews.map((item) => ({
    id: item.id,
    title: item.title || '',
    content: item.content || '',
    image: item.image_url
      ? supabase.storage.from('images').getPublicUrl(item.image_url).data.publicUrl
      : '',
    date: item.published_at || '',
    slug: item.slug || '',
  }));

  return (
    <div className="container py-16 md:py-24">
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
          Published on{' '}
          {new Date(mappedNews.date).toLocaleDateString('en-US', {
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

      {mappedRelatedNews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Related News</h2>
          <NewsCards news={relatedNews} />
        </section>
      )}
    </div>
  );
}
