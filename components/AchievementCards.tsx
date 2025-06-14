'use client'

import { useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Achievement = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
};

interface AchievementCardsProps {
  achievements: Achievement[];
}

export default function AchievementCards({ achievements }: AchievementCardsProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  
  // Fallback achievements if none are provided
  const fallbackAchievements = [
    {
      id: 'fallback1',
      title: 'Community Service Excellence Award',
      description: 'Arivial Sangam was recognized for outstanding service to the community, particularly for our digital literacy program that reached over 1,000 seniors in the past year.',
      image_url: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg',
      date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    },
    {
      id: 'fallback2',
      title: 'Cultural Preservation Initiative',
      description: 'Our efforts to document and preserve traditional arts and crafts received national recognition and funding to expand the program to neighboring communities.',
      image_url: 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg',
      date: new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString(),
    },
    {
      id: 'fallback3',
      title: 'Environmental Sustainability Project',
      description: 'Successfully implemented a community-wide recycling program that reduced waste by 30% and engaged over 500 households in sustainable practices.',
      image_url: 'https://images.pexels.com/photos/7656724/pexels-photo-7656724.jpeg',
      date: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
    }
  ];
  
  const displayAchievements = achievements.length > 0 ? achievements : fallbackAchievements;
  
  if (displayAchievements.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No achievements to display at this time.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayAchievements.map((achievement) => (
        <Card key={achievement.id} className="overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={achievement.image_url || 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg'}
              alt={achievement.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {formatDate(achievement.date)}
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {achievement.title}
            </h3>
            
            <div className="text-muted-foreground line-clamp-3 mb-4">
              {achievement.description}
            </div>
            
            <Dialog open={openDialog === achievement.id} onOpenChange={(open) => setOpenDialog(open ? achievement.id : null)}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary">
                  Read More
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{achievement.title}</DialogTitle>
                  <DialogDescription>{formatDate(achievement.date)}</DialogDescription>
                </DialogHeader>
                <div className="relative h-56 w-full mt-4 mb-6 rounded-md overflow-hidden">
                  <Image
                    src={achievement.image_url || 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg'}
                    alt={achievement.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="prose max-w-none dark:prose-invert">
                  <p>{achievement.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}