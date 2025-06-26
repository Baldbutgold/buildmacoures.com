import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a safe fallback for when environment variables are missing
let supabase: any = null;
let isConfigured = false;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isConfigured = true;
  } else {
    console.warn('Supabase environment variables not found. Some features may not work.');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

// Export the client (can be null)
export { supabase };

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => isConfigured;

// Helper function to get Supabase client with error handling
export const getSupabaseClient = () => {
  if (!isConfigured) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }
  return supabase;
};