'use client'

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// File upload helpers
export const uploadImage = async (bucket: string, filePath: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
  
  return publicUrl;
};

// Hero Images
export const createHeroImage = async (caption: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('hero', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('hero_images')
    .insert([{ image_url: imageUrl, caption }])
    .select();
    
  if (error) throw new Error(`Error creating hero image: ${error.message}`);
  return data[0];
};

export const updateHeroImage = async (id: string, caption: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('hero', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('hero_images')
    .update({ 
      caption,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating hero image: ${error.message}`);
  return data[0];
};

export const deleteHeroImage = async (id: string) => {
  const { error } = await supabase
    .from('hero_images')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting hero image: ${error.message}`);
  return true;
};

// About Content
export const updateAboutContent = async (id: string, title: string, description: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('about', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('about_content')
    .update({ 
      title,
      description,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating about content: ${error.message}`);
  return data[0];
};

// Team Members
export const createTeamMember = async (name: string, role: string, description: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('teams', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('teams')
    .insert([{ name, role, description, image_url: imageUrl }])
    .select();
    
  if (error) throw new Error(`Error creating team member: ${error.message}`);
  return data[0];
};

export const updateTeamMember = async (id: string, name: string, role: string, description: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('teams', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('teams')
    .update({ 
      name,
      role,
      description,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating team member: ${error.message}`);
  return data[0];
};

export const deleteTeamMember = async (id: string) => {
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting team member: ${error.message}`);
  return true;
};

// Initiatives
export const createInitiative = async (title: string, description: string, deadline: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('initiatives', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('initiatives')
    .insert([{ title, description, deadline, image_url: imageUrl }])
    .select();
    
  if (error) throw new Error(`Error creating initiative: ${error.message}`);
  return data[0];
};

export const updateInitiative = async (id: string, title: string, description: string, deadline: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('initiatives', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('initiatives')
    .update({ 
      title,
      description,
      deadline,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating initiative: ${error.message}`);
  return data[0];
};

export const deleteInitiative = async (id: string) => {
  const { error } = await supabase
    .from('initiatives')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting initiative: ${error.message}`);
  return true;
};

// Events
export const createEvent = async (title: string, description: string, date: string, location: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('events', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, date, location, image_url: imageUrl }])
    .select();
    
  if (error) throw new Error(`Error creating event: ${error.message}`);
  return data[0];
};

export const updateEvent = async (id: string, title: string, description: string, date: string, location: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('events', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('events')
    .update({ 
      title,
      description,
      date,
      location,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating event: ${error.message}`);
  return data[0];
};

export const deleteEvent = async (id: string) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting event: ${error.message}`);
  return true;
};

// Achievements
export const createAchievement = async (title: string, description: string, date: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('achievements', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('achievements')
    .insert([{ title, description, date, image_url: imageUrl }])
    .select();
    
  if (error) throw new Error(`Error creating achievement: ${error.message}`);
  return data[0];
};

export const updateAchievement = async (id: string, title: string, description: string, date: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('achievements', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('achievements')
    .update({ 
      title,
      description,
      date,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating achievement: ${error.message}`);
  return data[0];
};

export const deleteAchievement = async (id: string) => {
  const { error } = await supabase
    .from('achievements')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting achievement: ${error.message}`);
  return true;
};

// News
export const createNews = async (title: string, content: string, slug: string, imageFile: File) => {
  const filePath = `${Date.now()}_${imageFile.name}`;
  const imageUrl = await uploadImage('news', filePath, imageFile);
  
  const { data, error } = await supabase
    .from('news')
    .insert([{ 
      title, 
      content, 
      slug, 
      image_url: imageUrl,
      published_at: new Date().toISOString() 
    }])
    .select();
    
  if (error) throw new Error(`Error creating news article: ${error.message}`);
  return data[0];
};

export const updateNews = async (id: string, title: string, content: string, slug: string, imageFile?: File) => {
  let imageUrl;
  
  if (imageFile) {
    const filePath = `${Date.now()}_${imageFile.name}`;
    imageUrl = await uploadImage('news', filePath, imageFile);
  }
  
  const { data, error } = await supabase
    .from('news')
    .update({ 
      title,
      content,
      slug,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select();
    
  if (error) throw new Error(`Error updating news article: ${error.message}`);
  return data[0];
};

export const deleteNews = async (id: string) => {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(`Error deleting news article: ${error.message}`);
  return true;
};