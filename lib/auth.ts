'use client'

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getUserSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function isAuthenticated() {
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}