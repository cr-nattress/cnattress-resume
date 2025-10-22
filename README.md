# Chris Nattress Portfolio

> AI-powered career portfolio with an intelligent chatbot concierge built using Next.js 15, Claude AI, and Supabase

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License](https://img.shields.io/badge/license-ISC-blue)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Development](#development)
- [API Reference](#api-reference)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This is a modern, AI-powered portfolio website that showcases professional experience through an interactive career concierge. Visitors can chat with an AI assistant powered by Claude that has comprehensive knowledge of professional background, skills, and achievements.

**Built for:**
- Software engineers seeking to showcase their work
- Recruiters and hiring managers looking to learn about experience
- Anyone interested in building an AI-enhanced portfolio

**Key technologies:**
- **Next.js 15** - React framework with App Router
- **Claude AI** - Anthropic's advanced language model for intelligent responses
- **Supabase** - PostgreSQL database for analytics and conversation logging
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful, accessible component library

---

## Features

- 🤖 **AI Career Concierge** - Interactive chatbot that answers questions about professional experience, skills, and projects with streaming responses
- 🎯 **Job Fit Analyzer** - AI-powered tool that analyzes job descriptions against your experience to show compatibility
- 💬 **Message Persistence** - Conversation history stored in browser session for continuity
- 📊 **Analytics Dashboard** - Track chat interactions and visitor engagement with detailed metrics
- 🔒 **CSRF Protection** - Security measures on all API endpoints to prevent cross-site request forgery
- 🛡️ **Rate Limiting** - Protect API endpoints from abuse (100 requests/hour per IP)
- 🎨 **Beautiful Gradient Design** - Modern, responsive interface that works on all devices
- ⚡ **Type-Safe** - Full TypeScript implementation with strict mode enabled
- 🚀 **Server Components** - Optimized performance using React Server Components
- 🔐 **Admin Dashboard** - Password-protected analytics interface at `/admin/analytics`
- 🌙 **Dark Mode** - Theme toggle with system preference detection
- 📱 **Mobile Responsive** - Seamless experience across desktop, tablet, and mobile

---

## Quick Start

### Prerequisites

- **Node.js 20+** (recommended: 20.x LTS)
- **npm** or **yarn**
- **Supabase account** (free tier works)
- **Anthropic API key** (Claude AI)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/cr-nattress/cnattress-resume.git
cd cnattress-resume
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```bash
# Supabase (get from https://app.supabase.com/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Anthropic (get from https://console.anthropic.com/settings/keys)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_ACCESS_KEY=your-secret-admin-key
```

4. **Set up the database**

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy schema from docs/infrastructure/supabase.md
# Or run: cat docs/infrastructure/supabase.md
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Hello World Example

Once running, click the floating chat button in the bottom-right corner and try asking:

```
"What technologies does Chris know?"
```

You should receive a streaming AI response with details about technical skills and experience.

---

## Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                      Next.js App                        │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Hero.tsx  │  │  ChatWidget  │  │  Job Analyzer │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                 │                   │          │
│         └────────┬────────┴──────────┬────────┘          │
│                  │                   │                   │
│         ┌────────▼────────┐  ┌───────▼────────┐         │
│         │  /api/chat      │  │ /api/analytics │         │
│         │  /api/csrf      │  │ /api/analyze-job│        │
│         └────────┬────────┘  └───────┬────────┘         │
└──────────────────┼────────────────────┼──────────────────┘
                   │                    │
         ┌─────────▼─────────┐  ┌───────▼────────┐
         │  Anthropic API    │  │   Supabase     │
         │  (Claude AI)      │  │   (Analytics)  │
         └───────────────────┘  └────────────────┘
```

### Key Components

**Frontend:**
- `app/page.tsx` - Homepage with hero section
- `components/Hero.tsx` - Hero section with stats and CTAs
- `components/chat/ChatWidget.tsx` - AI chat interface with streaming
- `components/sections/JobAnalyzer.tsx` - AI-powered job matching tool
- `app/admin/analytics/page.tsx` - Analytics dashboard

**Backend API Routes:**
- `app/api/chat/route.ts` - Handles AI chat requests with streaming responses
- `app/api/analytics/route.ts` - Retrieves conversation analytics
- `app/api/analyze-job/route.ts` - Job description matching analysis
- `app/api/csrf/route.ts` - CSRF token generation and validation

**Core Libraries:**
- `lib/ai/resume-context.ts` - Resume data and system prompts for AI
- `lib/hooks/useChat.ts` - React hook for chat functionality
- `lib/hooks/useCsrf.ts` - React hook for CSRF token management
- `lib/supabase/client.ts` - Supabase client and analytics helpers
- `lib/csrf.ts` - CSRF protection utilities

### Design Philosophy

- **AI-First** - Intelligence embedded throughout the user experience
- **Privacy-Focused** - Minimal tracking, anonymous analytics
- **Security-First** - CSRF protection, rate limiting, input validation
- **Performance** - Server components, streaming responses, optimized bundles
- **Developer Experience** - Strict TypeScript, clear architecture, comprehensive docs

---

## Configuration

### Environment Variables

All configuration is managed through environment variables. See `.env.local.example` for the complete reference.

**Required:**
- `ANTHROPIC_API_KEY` - Your Claude AI API key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)

**Optional:**
- `ANTHROPIC_MODEL` - Claude model to use (default: `claude-sonnet-4-20250514`)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per hour (default: `100`)
- `ADMIN_ACCESS_KEY` - Password for admin dashboard
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable/disable tracking (default: `true`)

### Customizing the AI

Edit `lib/ai/resume-context.ts` to customize:

- **Resume data** - Update `resumeData` object with your information
- **System prompt** - Modify `getSystemPrompt()` to change AI behavior
- **Suggested questions** - Edit `ChatWidget.tsx` for different starter questions

---

## Deployment

### Deploy to Netlify

This project is optimized for Netlify deployment with Next.js.

1. **Connect repository to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20 (configured in `netlify.toml`)

3. **Add environment variables**
   - Add all variables from `.env.local.example` in Netlify dashboard
   - Go to Site settings → Environment variables

4. **Deploy**
   - Click "Deploy site"
   - First build takes ~2-3 minutes

**Continuous deployment** is automatic - every push to `main` triggers a new build.

For detailed deployment instructions, see [Deployment Guide](docs/guides/deployment.md).

### Other Platforms

This Next.js app can also deploy to:
- **Vercel** - Native Next.js platform
- **Railway** - Full-stack deployment
- **AWS Amplify** - AWS infrastructure
- **Self-hosted** - Docker or PM2

---

## Development

### Project Structure

```
chris-nattress.com/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── chat/            # AI chat endpoint
│   │   ├── analytics/       # Analytics endpoint
│   │   ├── analyze-job/     # Job analyzer endpoint
│   │   └── csrf/            # CSRF token endpoint
│   ├── admin/               # Admin dashboard
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── ui/                  # Shadcn/ui components
│   ├── chat/                # Chat widget
│   ├── sections/            # Page sections
│   └── Hero.tsx             # Hero component
├── lib/                     # Shared utilities
│   ├── ai/                  # AI/resume context
│   ├── hooks/               # React hooks
│   ├── supabase/            # Database client
│   ├── schemas/             # Zod validation schemas
│   └── csrf.ts              # CSRF utilities
├── docs/                    # Documentation
│   ├── guides/              # Setup and deployment guides
│   ├── reference/           # Technical reference
│   └── infrastructure/      # Database and infrastructure
├── .claude/                 # Claude Code skills
└── public/                  # Static assets
```

### Available Scripts

```bash
# Development
npm run dev         # Start dev server on http://localhost:3000

# Production
npm run build       # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

### Testing the Chat API

```bash
# Send a test message to the chat API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "x-csrf-token: your-csrf-token" \
  -d '{
    "messages": [{"role": "user", "content": "What technologies does Chris know?"}],
    "sessionId": "test-session-123"
  }'
```

### Database Setup

The Supabase schema is in `docs/infrastructure/supabase.md`. To set it up:

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Run the schema SQL

This creates all required tables:
- `chat_conversations` - AI chat logs with response times
- `visitor_analytics` - Anonymous visitor tracking
- `job_analyses` - Job description match analysis
- `project_views` - Portfolio project interactions

---

## API Reference

### POST /api/chat

Send a message to the AI chatbot.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What is your experience with Node.js?"}
  ],
  "sessionId": "unique-session-id"
}
```

**Headers:**
```
Content-Type: application/json
x-csrf-token: <csrf-token>
```

**Response:** Server-Sent Events (SSE) stream

```
data: {"text":"I have"}
data: {"text":" extensive"}
data: {"text":" experience..."}
data: [DONE]
```

**Rate Limits:** 100 requests per hour per IP

### POST /api/analyze-job

Analyze a job description against resume.

**Request:**
```json
{
  "jobDescription": "Looking for a senior developer with React and Node.js experience..."
}
```

**Headers:**
```
Content-Type: application/json
x-csrf-token: <csrf-token>
```

**Response:**
```json
{
  "analysis": {
    "matchScore": 85,
    "strengths": ["React expertise", "Node.js experience"],
    "gaps": ["Specific framework X"],
    "recommendation": "Strong fit for this role..."
  }
}
```

### GET /api/csrf

Get a CSRF token for protected requests.

**Response:**
```json
{
  "csrfToken": "abc123..."
}
```

### GET /api/analytics

Retrieve chat analytics (requires admin key).

**Headers:**
```
x-admin-key: your-admin-access-key
```

**Response:**
```json
{
  "conversations": [
    {
      "id": "uuid",
      "session_id": "session-123",
      "message": "What technologies...",
      "response": "I have experience...",
      "created_at": "2025-10-21T12:00:00Z",
      "response_time_ms": 1234
    }
  ],
  "total": 42
}
```

---

## Documentation

- 📖 [Complete Documentation](docs/) - Full documentation index
- 🚀 [Deployment Guide](docs/guides/deployment.md) - Detailed deployment instructions
- 🧪 [Testing Guide](docs/guides/testing.md) - Testing strategies
- 🔧 [Repository Setup](docs/guides/repository-setup.md) - Initial setup guide
- 💻 [Claude Instructions](docs/reference/claude-instructions.md) - Claude Code development guide
- 🗄️ [Supabase Setup](docs/infrastructure/supabase.md) - Database configuration

---

## Contributing

Contributions are welcome! This project serves as both a portfolio site and a template for others building AI-powered portfolios.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Use **TypeScript** for all new code
- Follow the existing code style
- Add JSDoc comments for public APIs
- Update documentation for user-facing changes
- Test locally before submitting

---

## License

This project is licensed under the ISC License.

Copyright © 2025 Chris Nattress

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

---

## Acknowledgments

**Built with:**
- [Next.js](https://nextjs.org/) - React framework
- [Anthropic Claude](https://www.anthropic.com/) - AI language model
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

**Inspired by:**
- Modern portfolio sites that prioritize user experience
- AI-first applications that augment human capabilities
- Open source projects that empower developers

---

**Live Site:** Coming soon after deployment
**Repository:** https://github.com/cr-nattress/cnattress-resume

Built with ❤️ using Claude Code
