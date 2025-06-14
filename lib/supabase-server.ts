import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// When using SSR, we need to use the service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

// Hero Images
export async function getHeroImages() {
  const { data, error } = await supabase
    .from('hero_images')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
  
  return data || [];
}

export async function getHeroImageCount() {
  const { count, error } = await supabase
    .from('hero_images')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting hero images:', error);
    return 0;
  }
  
  return count || 0;
}

// About Content
export async function getAboutContent() {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .single();
    
  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
  
  return data;
}

// Team Members
export async function getTeamMembers(limit?: number) {
  let query = supabase
    .from('teams')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  
  return data || [];
}

export async function getTeamCount() {
  const { count, error } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting team members:', error);
    return 0;
  }
  
  return count || 0;
}

// Initiatives
export async function getInitiatives(limit?: number) {
  let query = supabase
    .from('initiatives')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching initiatives:', error);
    return [];
  }
  
  return data || [];
}

export async function getInitiativeCount() {
  const { count, error } = await supabase
    .from('initiatives')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting initiatives:', error);
    return 0;
  }
  
  return count || 0;
}

// Events
export async function getEvents(limit?: number, upcomingOnly?: boolean) {
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
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data || [];
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function getEventCount() {
  const { count, error } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting events:', error);
    return 0;
  }
  
  return count || 0;
}

// Achievements
export async function getAchievements(limit?: number) {
  let query = supabase
    .from('achievements')
    .select('*')
    .order('date', { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
  
  return data || [];
}

export async function getAchievementCount() {
  const { count, error } = await supabase
    .from('achievements')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting achievements:', error);
    return 0;
  }
  
  return count || 0;
}

// News
export async function getNews(limit?: number) {
  let query = supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  
  return data || [];
}

export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) {
    console.error(`Error fetching news with slug ${slug}:`, error);
    return null;
  }
  
  return data;
}

export async function getRelatedNews(currentId: string, limit: number = 3) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .neq('id', currentId)
    .order('published_at', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching related news:', error);
    return [];
  }
  
  return data || [];
}

export async function getNewsCount() {
  const { count, error } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error counting news articles:', error);
    return 0;
  }
  
  return count || 0;
}