import { createClient } from '@supabase/supabase-js';

// Define TypeScript interfaces for data
interface HeroImage {
  id: string;
  image_path: string;
  caption: string;
  created_at: string;
}

interface AboutContent {
  id: string;
  content: string;
  // Add other fields as per your schema
}

interface Initiative {
  deadline: any;
  id: string;
  title: string;
  description: string;
  created_at: string;
  // Add other fields
}

interface Event {
  image_url: string;
  location: string;
  id: string;
  date: string;
  title: string;
  description: string;
  // Add other fields
}

interface Achievement {
  image_url: string;
  id: string;
  title: string;
  description: string;
  date: string;
  // Add other fields
}

interface News {
  image_url: any;
  id: string;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  // Add other fields
}

// Initialize Supabase client (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey =  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

// Hero Images
// export async function getHeroImages(): Promise<HeroImage[]> {
//   try {
//     const { data, error } = await supabase
//       .from('hero_images')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) {
//       throw new Error(`Supabase error: ${error.message}`);
//     }

//     return data || [];
//   } catch (error) {
//     console.error('Error fetching hero images:', error);
//     return [];
//   }
// }

export async function getHeroImageCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('hero_images')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting hero images:', error);
    return 0;
  }
}

// About Content
export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

// Team Members
export async function getTeamMembers(limit?: number): Promise<any[]> {
  try {
    let query = supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getTeamCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('teams')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting team members:', error);
    return 0;
  }
}

// Initiatives
export async function getInitiatives(limit?: number): Promise<Initiative[]> {
  try {
    let query = supabase
      .from('initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching initiatives:', error);
    return [];
  }
}

export async function getInitiativeCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('initiatives')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting initiatives:', error);
    return 0;
  }
}

// Events
export async function getEvents(limit?: number, upcomingOnly?: boolean): Promise<Event[]> {
  try {
    let query = supabase
      .from('events')
      .select('*');

    if (upcomingOnly) {
      const today = new Date().toISOString();
      query = query.gte('date', today);
    }

    query = query.order('date', { ascending: upcomingOnly !== false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    return null;
  }
}

export async function getEventCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('events')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting events:', error);
    return 0;
  }
}

// Achievements
export async function getAchievements(limit?: number): Promise<Achievement[]> {
  try {
    let query = supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function getAchievementCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('achievements')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting achievements:', error);
    return 0;
  }
}

// News
export async function getNews(limit?: number): Promise<News[]> {
  try {
    let query = supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching news with slug ${slug}:`, error);
    return null;
  }
}

export async function getRelatedNews(currentId: string, limit: number = 3): Promise<News[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .neq('id', currentId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching related news:', error);
    return [];
  }
}

export async function getNewsCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('news')
      .select('', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting news articles:', error);
    return 0;
  }
}

export async function getAllEvents() {
  const { data, error } = await supabase.from('events').select('id');
  if (error || !data) return [];
  return data;
}

