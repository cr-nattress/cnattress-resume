# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered career portfolio website with an intelligent Claude-powered chatbot concierge. Built with Next.js 15 App Router, TypeScript, Anthropic Claude AI, and Supabase analytics.

**Tech Stack:**
- Next.js 15.5.6 with App Router
- TypeScript 5.9 (strict mode enabled)
- Anthropic Claude AI SDK
- Supabase (PostgreSQL for analytics)
- Tailwind CSS + Shadcn/ui components

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Production
npm run build        # Production build - must pass before commits
npm start            # Start production server

# Code Quality
npm run lint         # ESLint checks
```

## Architecture

### Core System Flow

```
User Message → ChatWidget.tsx → /api/chat → Claude AI → Streaming Response
                    ↓
              Supabase Analytics
```

### Critical Files & Locations

**AI System:**
- `lib/ai/resume-context.ts` - Resume data structure and system prompts for Claude AI
  - Contains `resumeData` object with professional background
  - `getSystemPrompt()` function defines AI personality and behavior
  - Modify this to change what the AI knows about the portfolio owner

**API Routes (Next.js App Router):**
- `app/api/chat/route.ts` - Handles AI chat with streaming responses, rate limiting (100 req/hr per IP)
- `app/api/analytics/route.ts` - Retrieves conversation analytics (requires admin auth)

**Frontend:**
- `components/chat/ChatWidget.tsx` - Main chat interface with session management
- `lib/hooks/useChat.ts` - React hook managing chat state and streaming
- `app/admin/analytics/page.tsx` - Analytics dashboard (password-protected)

**Database:**
- `lib/supabase/client.ts` - Supabase client initialization and analytics helpers
- `supabase/schema.sql` - Complete database schema with tables:
  - `chat_conversations` - AI chat logs with response times
  - `visitor_analytics` - Anonymous visitor tracking
  - `job_analyses` - Job description match analysis
  - `project_views` - Portfolio project interactions

### Design Patterns

**Streaming AI Responses:**
- Uses Server-Sent Events (SSE) from `/api/chat`
- `useChat` hook manages streaming state with abort controllers
- Messages stream token-by-token for responsive UX

**Session Management:**
- Client-side session IDs (UUID v4) stored in browser
- Sessions persist across page refreshes via localStorage
- No user authentication required for chat

**Rate Limiting:**
- IP-based rate limiting on chat endpoint (100 requests/hour default)
- Configurable via `RATE_LIMIT_MAX_REQUESTS` env var
- Uses in-memory Map (resets on server restart)

## TypeScript Configuration

Strict mode enabled with:
- `strictNullChecks: true`
- `noImplicitAny: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`

Path alias: `@/*` maps to repository root

## Environment Variables

Required for development (see `.env.local.example`):

```bash
# Anthropic AI
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_ACCESS_KEY=your-secret-key
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** Never commit actual keys. Use `.env.local` (gitignored).

## Deployment (Netlify)

Configuration in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

**Known Issues:**
- Do NOT enable `@netlify/plugin-nextjs` plugin - conflicts with Next.js 15 native support
- Do NOT set `NODE_ENV` manually - Netlify handles this automatically
- Use Node version "20" not "20.18.0" (invalid version)

## Customizing the AI

To personalize for a different portfolio owner:

1. **Edit Resume Data:** Update `lib/ai/resume-context.ts`
   - Modify `resumeData` object with new professional info
   - Update skills, experience, education sections

2. **Adjust AI Personality:** Change `getSystemPrompt()` function
   - Modify tone, formality, response style
   - Update instructions for handling specific question types

3. **Update Suggested Questions:** Edit `components/chat/ChatWidget.tsx`
   - Change initial prompt suggestions shown to users

## Database Setup

Run `supabase/schema.sql` in Supabase SQL Editor to create:
- All required tables with proper constraints
- Indexes for query performance
- Row Level Security (RLS) policies for public access

Tables are designed for anonymous analytics - no PII stored.

## Error Handling

- `app/error.tsx` - Global error boundary (client component)
- `app/not-found.tsx` - Custom 404 page
- Both styled to match site's gradient theme

## Testing the Chat API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "What technologies does Chris know?"}],
    "sessionId": "test-session-123"
  }'
```

Response streams as Server-Sent Events ending with `data: [DONE]`.
