import { getHeroImageCount, getEventCount, getNewsCount, getTeamCount, getInitiativeCount, getAchievementCount } from '@/lib/supabase-server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch counts of various content types
  const heroCount = await getHeroImageCount();
  const eventCount = await getEventCount();
  const newsCount = await getNewsCount();
  const teamCount = await getTeamCount();
  const initiativeCount = await getInitiativeCount();
  const achievementCount = await getAchievementCount();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" asChild>
          <Link href="/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
            View Site
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
        <Card>
=======
        {/* <Card>
>>>>>>> 6ae2606 (new addition)
          <CardHeader className="pb-2">
            <CardTitle>Hero Images</CardTitle>
            <CardDescription>Manage homepage hero carousel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{heroCount}</div>
            <p className="text-sm text-muted-foreground">Total hero images</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/hero-form">Manage Hero Images</Link>
            </Button>
          </CardFooter>
<<<<<<< HEAD
        </Card>
=======
        </Card> */}
>>>>>>> 6ae2606 (new addition)
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage team profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamCount}</div>
            <p className="text-sm text-muted-foreground">Total team members</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/teams-form">Manage Team</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Initiatives</CardTitle>
            <CardDescription>Manage organization initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{initiativeCount}</div>
            <p className="text-sm text-muted-foreground">Total initiatives</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/initiatives-form">Manage Initiatives</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Events</CardTitle>
            <CardDescription>Manage events calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{eventCount}</div>
            <p className="text-sm text-muted-foreground">Total events</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/events-form">Manage Events</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Manage organization achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievementCount}</div>
            <p className="text-sm text-muted-foreground">Total achievements</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/achievements-form">Manage Achievements</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>News Articles</CardTitle>
            <CardDescription>Manage news and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newsCount}</div>
            <p className="text-sm text-muted-foreground">Total articles</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/news-form">Manage News</Link>
            </Button>
          </CardFooter>
        </Card>
        
<<<<<<< HEAD
        <Card>
=======
        {/* <Card>
>>>>>>> 6ae2606 (new addition)
          <CardHeader className="pb-2">
            <CardTitle>About Content</CardTitle>
            <CardDescription>Manage about page content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">About section</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/adpage/about-form">Edit About Content</Link>
            </Button>
          </CardFooter>
<<<<<<< HEAD
        </Card>
=======
        </Card> */}
>>>>>>> 6ae2606 (new addition)
      </div>
    </div>
  );
}