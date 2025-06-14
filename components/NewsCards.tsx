'use client'

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
};

interface NewsCardsProps {
  news: NewsArticle[];
}

export default function NewsCards({ news }: NewsCardsProps) {
  // Fallback news if none are provided
  const fallbackNews = [
    {
      id: 'fallback1',
      slug: 'new-digital-literacy-program',
      title: 'New Digital Literacy Program Launches Next Month',
      content: '<p>We\'re excited to announce the launch of our new digital literacy program aimed at seniors in our community. This initiative will help bridge the digital divide and provide essential technology skills.</p><p>The program includes beginner-friendly workshops on computer basics, internet safety, and using online services.</p>',
      image_url: 'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg',
      published_at: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    },
    {
      id: 'fallback2',
      slug: 'annual-cultural-festival',
      title: 'Annual Cultural Festival Celebrates Diversity',
      content: '<p>Our annual cultural festival was a huge success, with over 500 community members participating in the celebrations. The event showcased traditional dances, music, food, and art from various cultures.</p><p>Local artists and performers brought tremendous energy to the event, creating a vibrant atmosphere of cultural exchange and appreciation.</p>',
      image_url: 'https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg',
      published_at: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    },
    {
      id: 'fallback3',
      slug: 'community-cleanup-initiative',
      title: 'Community Cleanup Initiative Sees Great Turnout',
      content: '<p>Last weekend\'s community cleanup initiative was a tremendous success with over 100 volunteers helping to clean up local parks and streets. The event was part of our ongoing commitment to environmental sustainability.</p><p>Volunteers collected over 200 bags of trash and recyclables, making a significant impact on the cleanliness of our neighborhood.</p>',
      image_url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
      published_at: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
    }
  ];
  
  const displayNews = news.length > 0 ? news : fallbackNews;
  
  if (displayNews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No news articles to display at this time.</p>
      </div>
    );
  }
  
  // Function to create excerpt from HTML content
  const createExcerpt = (html: string, maxLength: number = 150) => {
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '');
    
    if (text.length <= maxLength) return text;
    
    // Find the last space within the limit
    const trimmed = text.substring(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(' ');
    
    return lastSpace !== -1 
      ? trimmed.substring(0, lastSpace) + '...' 
      : trimmed + '...';
  };

  // Check if we're on the main news page or just showing a preview
  const isNewsPage = displayNews.length > 3;
  
  return (
    <div className={cn(
      "grid gap-6",
      isNewsPage 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1 lg:grid-cols-3"
    )}>
      {displayNews.map((article, index) => (
        <Link 
          key={article.id}
          href={`/news/${article.slug}`}
          className="group h-full"
        >
          <Card className={cn(
            "overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow",
            isNewsPage && index === 0 && "md:col-span-2 lg:col-span-3"
          )}>
            <div className={cn(
              "relative overflow-hidden",
              isNewsPage && index === 0 ? "h-80" : "h-48"
            )}>
              <Image
                src={article.image_url || 'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg'}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className={cn(
                "absolute bottom-4 left-4 right-4",
                isNewsPage && index === 0 ? "bottom-6 left-6 right-6" : ""
              )}>
                <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full inline-block mb-2">
                  {formatDate(article.published_at)}
                </div>
                <h3 className={cn(
                  "text-white font-bold mb-2 group-hover:underline transition-colors",
                  isNewsPage && index === 0 ? "text-2xl md:text-3xl" : "text-lg"
                )}>
                  {article.title}
                </h3>
              </div>
            </div>
            
            <CardContent className={cn(
              "p-6 flex-grow",
              isNewsPage && index === 0 ? "text-lg" : ""
            )}>
              <p className="text-muted-foreground">
                {createExcerpt(article.content, isNewsPage && index === 0 ? 250 : 150)}
              </p>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0">
              <span className="text-primary text-sm font-medium group-hover:underline">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline-block"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}