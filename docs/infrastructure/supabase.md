# Supabase Setup Guide

This directory contains the database schema and configuration for the Chris Nattress Portfolio AI features.

## Quick Start

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in (or create an account)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `chris-nattress` (or your preference)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your target audience
5. Click "Create new project"
6. Wait for the project to finish setting up (~2 minutes)

### 2. Run the Database Schema

1. In your Supabase dashboard, click on the **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `schema.sql` from this directory
4. Paste it into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. Verify that all tables were created successfully

### 3. Get Your API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Find these values:
   - **Project URL**: Copy this
   - **anon public key**: Copy this
   - **service_role key**: Copy this (keep it secret!)

### 4. Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema Overview

The schema includes 4 main tables:

### `visitor_analytics`
Tracks anonymous visitor behavior and page interactions.

**Key Fields:**
- `session_id`: Unique identifier for visitor session
- `page_section`: Which section of the site was viewed
- `time_spent`: Time in seconds
- `interaction_type`: Type of interaction (scroll, click, etc.)

### `chat_conversations`
Logs all AI chatbot conversations for analytics and improvement.

**Key Fields:**
- `session_id`: Links to visitor session
- `message`: User's message
- `response`: AI's response
- `context`: Additional context data (JSON)
- `response_time_ms`: How long the AI took to respond

### `job_analyses`
Stores job description match analyses performed by AI.

**Key Fields:**
- `job_description`: The job posting text
- `match_score`: Score from 0-100
- `analysis`: Detailed analysis (JSON)
- `strengths`: Array of matching strengths
- `gaps`: Array of skill gaps
- `recommendations`: Suggested actions

### `project_views`
Tracks which portfolio projects visitors view and for how long.

**Key Fields:**
- `project_name`: Name of the project
- `view_duration`: Time spent viewing (seconds)
- `interaction_data`: Additional interaction data (JSON)

## Row Level Security (RLS)

The schema automatically configures RLS policies:

- ✅ **Anonymous users** can INSERT (for tracking)
- ✅ **Authenticated users** can SELECT (for admin dashboard)
- ❌ **No public reads** (privacy-first approach)

## Useful Analytics Views

The schema creates helpful views for analytics:

### `daily_conversation_stats`
```sql
SELECT * FROM daily_conversation_stats;
```
Shows daily AI chat statistics including total conversations and response times.

### `popular_sections`
```sql
SELECT * FROM popular_sections;
```
Shows which page sections get the most engagement.

### `project_engagement_stats`
```sql
SELECT * FROM project_engagement_stats;
```
Shows engagement metrics for each portfolio project.

## Testing the Setup

Run these queries in the SQL Editor to verify everything works:

```sql
-- Test visitor analytics insert
INSERT INTO visitor_analytics (session_id, page_section, time_spent, interaction_type)
VALUES ('test-session-123', 'hero', 45, 'scroll');

-- Test chat conversation insert
INSERT INTO chat_conversations (session_id, message, response, response_time_ms)
VALUES ('test-session-123', 'What technologies do you know?', 'I have experience with...', 1234);

-- Verify data
SELECT * FROM visitor_analytics;
SELECT * FROM chat_conversations;
```

## Next Steps

After setting up Supabase:

1. ✅ Add environment variables to `.env.local`
2. ✅ Get an Anthropic API key for Claude AI
3. ✅ Install the Supabase client library: `npm install @supabase/supabase-js`
4. ✅ Start building the AI chat integration

## Troubleshooting

### "relation already exists" error
This means the tables are already created. You can either:
- Drop the tables first: `DROP TABLE IF EXISTS table_name CASCADE;`
- Or skip re-running the schema

### RLS is blocking my inserts
Make sure you're using the correct Supabase client configuration:
- Use `anon` key for client-side operations
- Use `service_role` key only server-side for admin operations

### Can't see data in tables
Check that RLS policies are correctly configured. For testing, you can temporarily disable RLS:
```sql
ALTER TABLE visitor_analytics DISABLE ROW LEVEL SECURITY;
```
(Don't forget to re-enable it for production!)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor Guide](https://supabase.com/docs/guides/database/sql-editor)

---

Need help? Check the main project README or create an issue.
