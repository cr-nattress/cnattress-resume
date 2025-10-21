-- ============================================
-- Chris Nattress Portfolio - Database Schema
-- ============================================
-- This schema supports AI-powered portfolio features including:
-- - Visitor analytics tracking
-- - AI chat conversations logging
-- - Job description analysis
-- - Project interaction tracking
--
-- Created: 2025-10-21
-- Last Updated: 2025-10-21
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: visitor_analytics
-- Purpose: Track anonymous visitor behavior
-- ============================================
CREATE TABLE IF NOT EXISTS visitor_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  page_section TEXT,
  time_spent INTEGER,
  interaction_type TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Indexes for performance
  CONSTRAINT visitor_analytics_session_id_idx UNIQUE (session_id, created_at)
);

-- Create index for faster session queries
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_session
  ON visitor_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_created
  ON visitor_analytics(created_at DESC);

-- ============================================
-- TABLE: chat_conversations
-- Purpose: Log AI chat interactions
-- ============================================
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT chat_conversations_message_length CHECK (char_length(message) <= 10000),
  CONSTRAINT chat_conversations_response_length CHECK (char_length(response) <= 50000)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session
  ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created
  ON chat_conversations(created_at DESC);

-- ============================================
-- TABLE: job_analyses
-- Purpose: Store job description match analyses
-- ============================================
CREATE TABLE IF NOT EXISTS job_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  job_description TEXT NOT NULL,
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
  analysis JSONB DEFAULT '{}',
  strengths TEXT[],
  gaps TEXT[],
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT job_analyses_description_length CHECK (char_length(job_description) <= 20000)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_job_analyses_session
  ON job_analyses(session_id);
CREATE INDEX IF NOT EXISTS idx_job_analyses_created
  ON job_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_analyses_match_score
  ON job_analyses(match_score DESC);

-- ============================================
-- TABLE: project_views
-- Purpose: Track project portfolio interactions
-- ============================================
CREATE TABLE IF NOT EXISTS project_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  view_duration INTEGER,
  interaction_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_views_session
  ON project_views(session_id);
CREATE INDEX IF NOT EXISTS idx_project_views_project
  ON project_views(project_name);
CREATE INDEX IF NOT EXISTS idx_project_views_created
  ON project_views(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE visitor_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON visitor_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous chat inserts" ON chat_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous job analysis inserts" ON job_analyses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous project view inserts" ON project_views
  FOR INSERT WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard)
-- Note: You'll need to configure authentication in Supabase
CREATE POLICY "Allow authenticated reads" ON visitor_analytics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated chat reads" ON chat_conversations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated job analysis reads" ON job_analyses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated project view reads" ON project_views
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- ANALYTICS VIEWS
-- ============================================

-- View: Daily conversation statistics
CREATE OR REPLACE VIEW daily_conversation_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_conversations,
  COUNT(DISTINCT session_id) as unique_visitors,
  AVG(response_time_ms) as avg_response_time_ms,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY response_time_ms) as median_response_time_ms
FROM chat_conversations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View: Popular page sections
CREATE OR REPLACE VIEW popular_sections AS
SELECT
  page_section,
  COUNT(*) as view_count,
  COUNT(DISTINCT session_id) as unique_visitors,
  AVG(time_spent) as avg_time_spent
FROM visitor_analytics
WHERE page_section IS NOT NULL
GROUP BY page_section
ORDER BY view_count DESC;

-- View: Project engagement stats
CREATE OR REPLACE VIEW project_engagement_stats AS
SELECT
  project_name,
  COUNT(*) as total_views,
  COUNT(DISTINCT session_id) as unique_viewers,
  AVG(view_duration) as avg_duration,
  MAX(view_duration) as max_duration
FROM project_views
GROUP BY project_name
ORDER BY total_views DESC;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE visitor_analytics IS 'Tracks anonymous visitor behavior and interactions';
COMMENT ON TABLE chat_conversations IS 'Logs all AI chatbot conversations for analytics and improvement';
COMMENT ON TABLE job_analyses IS 'Stores job description match analyses performed by AI';
COMMENT ON TABLE project_views IS 'Tracks which portfolio projects visitors view and for how long';

COMMENT ON COLUMN chat_conversations.response_time_ms IS 'Time in milliseconds to generate AI response';
COMMENT ON COLUMN job_analyses.match_score IS 'Job match score from 0-100';
COMMENT ON COLUMN visitor_analytics.metadata IS 'Additional tracking data in JSON format';
