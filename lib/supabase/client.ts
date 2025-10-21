/**
 * Supabase Client Configuration
 *
 * This module provides configured Supabase clients for both client-side and server-side usage.
 * It uses environment variables to connect to your Supabase project.
 *
 * @module supabase-client
 */

import { createClient } from '@supabase/supabase-js';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

/**
 * Client-side Supabase client
 * Uses the anonymous (public) key - safe to use in the browser
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Server-side Supabase client with service role key
 * ONLY use this server-side - never expose to the client!
 * Has elevated permissions that bypass RLS policies
 */
export function getServiceRoleClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

/**
 * Database table types for type safety
 */
export interface VisitorAnalytic {
  id?: string;
  session_id: string;
  page_section?: string;
  time_spent?: number;
  interaction_type?: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface ChatConversation {
  id?: string;
  session_id: string;
  message: string;
  response: string;
  context?: Record<string, any>;
  response_time_ms?: number;
  created_at?: string;
}

export interface JobAnalysis {
  id?: string;
  session_id: string;
  job_description: string;
  match_score?: number;
  analysis?: Record<string, any>;
  strengths?: string[];
  gaps?: string[];
  recommendations?: string[];
  created_at?: string;
}

export interface ProjectView {
  id?: string;
  session_id: string;
  project_name: string;
  view_duration?: number;
  interaction_data?: Record<string, any>;
  created_at?: string;
}

/**
 * Analytics helper functions
 */
export const analytics = {
  /**
   * Track a visitor interaction
   */
  async trackVisitor(data: Omit<VisitorAnalytic, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('visitor_analytics')
      .insert(data);

    if (error) {
      console.error('Error tracking visitor:', error);
      return { success: false, error };
    }

    return { success: true };
  },

  /**
   * Log a chat conversation
   */
  async logConversation(data: Omit<ChatConversation, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('chat_conversations')
      .insert(data);

    if (error) {
      console.error('Error logging conversation:', error);
      return { success: false, error };
    }

    return { success: true };
  },

  /**
   * Save a job analysis
   */
  async saveJobAnalysis(data: Omit<JobAnalysis, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('job_analyses')
      .insert(data);

    if (error) {
      console.error('Error saving job analysis:', error);
      return { success: false, error };
    }

    return { success: true };
  },

  /**
   * Track project view
   */
  async trackProjectView(data: Omit<ProjectView, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('project_views')
      .insert(data);

    if (error) {
      console.error('Error tracking project view:', error);
      return { success: false, error };
    }

    return { success: true };
  },

  /**
   * Get conversation stats (admin only - requires service role)
   */
  async getConversationStats() {
    const client = getServiceRoleClient();

    const { data, error } = await client
      .from('daily_conversation_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching conversation stats:', error);
      return { success: false, error };
    }

    return { success: true, data };
  },

  /**
   * Get popular sections (admin only - requires service role)
   */
  async getPopularSections() {
    const client = getServiceRoleClient();

    const { data, error } = await client
      .from('popular_sections')
      .select('*')
      .order('view_count', { ascending: false });

    if (error) {
      console.error('Error fetching popular sections:', error);
      return { success: false, error };
    }

    return { success: true, data };
  }
};
