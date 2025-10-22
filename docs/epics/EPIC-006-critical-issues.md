# EPIC-006: Critical Issues - Security & Architecture

**Status:** 📋 Ready for Development
**Priority:** P0 - Critical
**Estimated Effort:** 16-20 hours
**Target Completion:** Week 2-3 (2 weeks)
**Owner:** Development Team
**Depends On:** EPIC-005 (Quick Wins)

---

## 📋 Overview

This EPIC addresses critical security vulnerabilities and architectural improvements identified in the React/Next.js audit (`REACT_RECOMMENDATIONS.md`). These issues impact security, type safety, and production readiness of the application.

### Business Value
- 🔒 **Security:** Eliminate critical vulnerabilities (CSRF, input validation, rate limiting)
- 🎯 **Type Safety:** Complete TypeScript strict mode compliance
- ⚡ **Performance:** Major bundle size reduction via server component optimization
- 🏗️ **Architecture:** Production-ready infrastructure (persistent rate limiting)
- 📊 **Risk Mitigation:** Address issues that could cause security incidents or outages

### Success Metrics
- Zero critical security vulnerabilities (validated by security audit)
- 100% input validation coverage on API routes
- 30-40% reduction in initial bundle size
- TypeScript strict mode with zero errors/warnings
- Rate limiting works across server restarts and multi-instance deployments

---

## ⚠️ Risk Assessment

### High Risk Items
- **CSRF Protection:** API routes vulnerable to cross-site attacks
- **Input Validation:** Potential for injection attacks and data corruption
- **Rate Limiting:** In-memory implementation fails in production scenarios

### Medium Risk Items
- **Type Safety:** Missing return types reduce error detection
- **Architecture:** Client-side home page impacts SEO and performance

---

## 📚 User Stories

### US-006.1: Add Zod Input Validation to All API Routes
**As a** system administrator
**I want** all user input validated with a schema validation library
**So that** malicious or malformed data cannot compromise the application

**Priority:** P0 - Critical (Security)
**Effort:** 3-4 hours
**Reference:** `REACT_RECOMMENDATIONS.md` - Section 4 (Critical)

#### Acceptance Criteria
- [ ] Zod library installed and configured
- [ ] Schema validation added to `/api/chat` endpoint
- [ ] Schema validation added to `/api/analyze-job` endpoint
- [ ] Schema validation added to `/api/analytics` endpoint
- [ ] Validation errors return structured 400 responses with field-level errors
- [ ] All API routes reject invalid input before processing
- [ ] TypeScript types inferred from Zod schemas
- [ ] Unit tests added for schema validation

#### Implementation Tasks

**Phase 1: Setup (30 minutes)**
1. Install Zod: `npm install zod`
2. Create schemas directory: `lib/schemas/`
3. Create base error response type

**Phase 2: Chat API (1 hour)**
1. Create `lib/schemas/chat.schema.ts`
2. Define `MessageSchema` and `ChatRequestSchema`
3. Update `app/api/chat/route.ts` to use validation
4. Add Zod error handling
5. Test with valid and invalid inputs

**Phase 3: Job Analyzer API (45 minutes)**
1. Create `lib/schemas/job-analyzer.schema.ts`
2. Define `JobAnalyzerRequestSchema`
3. Update `app/api/analyze-job/route.ts`
4. Test edge cases (empty input, too long, special characters)

**Phase 4: Analytics API (45 minutes)**
1. Create `lib/schemas/analytics.schema.ts`
2. Define `AnalyticsEventSchema`
3. Update `app/api/analytics/route.ts`
4. Test all analytics event types

**Phase 5: Testing (30 minutes)**
1. Create unit tests for schemas
2. Test API routes with invalid payloads
3. Verify error messages are helpful

#### Technical Notes

```typescript
// lib/schemas/chat.schema.ts
import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant'], {
    errorMap: () => ({ message: 'Role must be either "user" or "assistant"' })
  }),
  content: z.string()
    .min(1, 'Message content cannot be empty')
    .max(10000, 'Message content too long (max 10,000 characters)'),
});

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema)
    .min(1, 'At least one message is required')
    .max(50, 'Too many messages in conversation history'),
  sessionId: z.string()
    .min(10, 'Session ID must be at least 10 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Session ID contains invalid characters'),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type Message = z.infer<typeof MessageSchema>;

// lib/schemas/job-analyzer.schema.ts
export const JobAnalyzerRequestSchema = z.object({
  jobDescription: z.string()
    .min(100, 'Job description too short (minimum 100 characters)')
    .max(50000, 'Job description too long (maximum 50,000 characters)')
    .trim(),
});

export type JobAnalyzerRequest = z.infer<typeof JobAnalyzerRequestSchema>;

// lib/schemas/analytics.schema.ts
export const AnalyticsEventSchema = z.object({
  type: z.enum(['visitor', 'project_view', 'section_view']),
  data: z.object({
    session_id: z.string().min(10),
    page_section: z.string().optional(),
    time_spent: z.number().nonnegative().optional(),
    interaction_type: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
  }),
});

export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;

// app/api/chat/route.ts - Usage
import { ChatRequestSchema } from '@/lib/schemas/chat.schema';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validatedData = ChatRequestSchema.parse(body);
    const { messages, sessionId } = validatedData;

    // ... rest of implementation

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
            code: e.code
          }))
        },
        { status: 400 }
      );
    }

    // ... other error handling
  }
}
```

**Files Changed:**
- `lib/schemas/chat.schema.ts` (NEW)
- `lib/schemas/job-analyzer.schema.ts` (NEW)
- `lib/schemas/analytics.schema.ts` (NEW)
- `app/api/chat/route.ts`
- `app/api/analyze-job/route.ts`
- `app/api/analytics/route.ts`
- `package.json` (add zod dependency)

**Dependencies:**
- Zod npm package

**Testing:**
```bash
# Test chat API with invalid input
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [], "sessionId": ""}'
# Should return 400 with validation errors

# Test with valid input
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}], "sessionId": "test-session-123"}'
# Should return 200 with streaming response
```

---

### US-006.2: Add Explicit Return Type Annotations to All Functions
**As a** developer
**I want** explicit return types on all functions and components
**So that** TypeScript can catch type errors at compile time

**Priority:** P0 - Critical (Type Safety)
**Effort:** 3-4 hours
**Reference:** `REACT_RECOMMENDATIONS.md` - Section 1 & 2 (Critical)

#### Acceptance Criteria
- [ ] All React components have return type annotations (`: ReactElement`, `: FC`, or `: JSX.Element`)
- [ ] All utility functions have return type annotations
- [ ] All async functions have `Promise<T>` return types
- [ ] All API route handlers have return type annotations
- [ ] Custom hooks have explicit return types
- [ ] TypeScript compilation succeeds with zero errors
- [ ] ESLint warnings reduced to zero for implicit returns

#### Implementation Tasks

**Phase 1: Components (2 hours)**
1. Update `app/page.tsx` - Home component
2. Update `app/layout.tsx` - RootLayout component
3. Update `components/chat/ChatWidget.tsx`
4. Update `components/sections/*.tsx` (6 files)
5. Update `components/ui/*.tsx` (2 files)
6. Update `components/ThemeToggle.tsx`
7. Update `components/Footer.tsx`
8. Update `components/Providers.tsx`

**Phase 2: Hooks & Context (45 minutes)**
1. Update `lib/hooks/useChat.ts` - return type for `useChat()`
2. Update `lib/hooks/useAnalytics.ts` - return type for `useAnalytics()`
3. Update `lib/contexts/theme-context.tsx` - ThemeProvider and useTheme

**Phase 3: Utilities & Services (45 minutes)**
1. Update `lib/utils/session.ts` - getSessionId, clearSession
2. Update `lib/supabase/client.ts` - all analytics methods
3. Update `lib/ai/resume-context.ts` - getSystemPrompt

**Phase 4: API Routes (30 minutes)**
1. Update `app/api/chat/route.ts` - POST and GET handlers
2. Update `app/api/analyze-job/route.ts` - POST handler
3. Update `app/api/analytics/route.ts` - POST and GET handlers

#### Technical Notes

```typescript
// Components - Option 1: Explicit ReactElement
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return <main>...</main>;
}

// Components - Option 2: FC type
import { FC } from 'react';

interface ChatWidgetProps {
  initiallyMinimized?: boolean;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ initiallyMinimized = true }) => {
  return <div>...</div>;
};

// Utility functions
export function getSessionId(): string {
  // ...
}

export function clearSession(): void {
  // ...
}

// Async functions
export async function getSystemPrompt(): Promise<string> {
  // ...
}

// Custom hooks
interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  // ...
}

// API route handlers
export async function POST(req: NextRequest): Promise<Response> {
  // ...
}

export async function GET(): Promise<NextResponse> {
  // ...
}

// Supabase analytics methods
async trackVisitor(
  data: Omit<VisitorAnalytic, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: any }> {
  // ...
}
```

**Files Changed:** 20+ files (see Phase tasks)

**Dependencies:** None

**Validation:**
```bash
# Run TypeScript compiler
npm run build

# Check for implicit return warnings
npx tsc --noEmit --strict

# Should show zero errors related to implicit returns
```

---

### US-006.3: Refactor Home Page to Server Component with Client Islands
**As a** visitor
**I want** the page to load 30-40% faster
**So that** I can start reading content immediately

**Priority:** P0 - Critical (Performance & Architecture)
**Effort:** 3-4 hours
**Reference:** `REACT_RECOMMENDATIONS.md` - Section 1 (High Priority)

#### Acceptance Criteria
- [ ] `app/page.tsx` is a Server Component (no `"use client"` directive)
- [ ] Hero section extracted into separate `components/Hero.tsx` Client Component
- [ ] All static sections (About, Experience, Skills, Projects) remain as imports
- [ ] ChatWidget and ThemeToggle remain as Client Components
- [ ] Scroll interactions work correctly
- [ ] Initial bundle size reduced by 25-30KB
- [ ] Lighthouse performance score improved by 5-10 points
- [ ] SEO meta tags properly rendered in server component

#### Implementation Tasks

**Phase 1: Extract Hero Component (1.5 hours)**
1. Create new file `components/Hero.tsx` as Client Component
2. Move hero JSX from `app/page.tsx` to `components/Hero.tsx`
3. Move scroll helper functions into Hero component
4. Add proper TypeScript types and return annotation
5. Test scroll-to-section functionality

**Phase 2: Refactor Home Page (1 hour)**
1. Remove `"use client"` directive from `app/page.tsx`
2. Import new Hero component
3. Keep section components as server-side imports
4. Verify no client-only hooks used in page.tsx
5. Test page loads correctly

**Phase 3: Optimization (30 minutes)**
1. Ensure static sections can be server-rendered
2. Verify no state/effects in server components
3. Test dynamic imports still work (from EPIC-005)

**Phase 4: Testing (1 hour)**
1. Run production build
2. Compare bundle sizes before/after
3. Run Lighthouse audit
4. Test all interactive elements
5. Verify SSR/hydration works correctly

#### Technical Notes

```typescript
// components/Hero.tsx (NEW FILE)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function Hero() {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-hero p-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            {/* Avatar */}
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                CN
              </div>
            </div>

            <CardTitle className="text-5xl sm:text-6xl font-bold gradient-text">
              Chris Nattress
            </CardTitle>

            <CardDescription className="text-2xl text-gray-200 font-semibold">
              Technical Lead | Senior Software Engineer
            </CardDescription>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              {/* Location icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Avon, CO</span>
              <span className="mx-2">•</span>
              <span>12+ Years Experience</span>
              <span className="mx-2">•</span>
              <span>Open to Opportunities</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-200 leading-relaxed text-center text-lg">
              Specialized in <span className="font-semibold text-blue-300">C#/.NET Core</span>, <span className="font-semibold text-purple-300">Angular</span>,
              <span className="font-semibold text-blue-300"> cloud architectures</span>, and <span className="font-semibold text-purple-300">AI systems</span>.
              Proven track record leading distributed teams and architecting innovative solutions from microservices to AI-powered automation.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">12+</div>
                <div className="text-xs text-gray-400 mt-1">Years</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">6</div>
                <div className="text-xs text-gray-400 mt-1">Companies</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">25+</div>
                <div className="text-xs text-gray-400 mt-1">APIs Built</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">$500M+</div>
                <div className="text-xs text-gray-400 mt-1">Processed</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection('projects')}
              >
                {/* Icon */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Projects
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
                onClick={() => scrollToSection('contact')}
              >
                {/* Icon */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <a href="/resume.pdf" download>
                  {/* Icon */}
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="text-center pt-4">
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce"
                aria-label="Scroll to content"
              >
                <span className="text-sm mb-1">Explore Portfolio</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// app/page.tsx (UPDATED - SERVER COMPONENT)
import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

// Server component imports
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

// Client component imports
import { Hero } from "@/components/Hero";
import { ThemeToggle } from "@/components/ThemeToggle";

// Dynamic imports (from EPIC-005)
const ChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget').then(mod => ({ default: mod.ChatWidget })),
  {
    loading: () => <div className="fixed bottom-6 right-6 w-12 h-12 bg-deep-purple rounded-full animate-pulse" />,
    ssr: false
  }
);

const JobAnalyzer = dynamic(
  () => import('@/components/sections/JobAnalyzer'),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading Job Analyzer...</div>
        </div>
      </section>
    )
  }
);

export default function Home(): ReactElement {
  return (
    <>
      {/* Client island for interactive hero */}
      <Hero />

      {/* Server-rendered static content */}
      <About />
      <Experience />
      <Skills />
      <Projects />
      <JobAnalyzer />
      <Contact />
      <Footer />

      {/* Client components */}
      <ChatWidget />
      <ThemeToggle />
    </>
  );
}
```

**Files Changed:**
- `components/Hero.tsx` (NEW)
- `app/page.tsx` (major refactor)

**Files Deleted:** None

**Dependencies:**
- Requires EPIC-005 (dynamic imports) to be completed first

**Performance Gains:**
- Bundle size: -25 to -30KB
- FCP improvement: -0.2 to -0.3s
- LCP improvement: -0.3 to -0.5s
- TTI improvement: -0.5 to -0.7s

---

### US-006.4: Implement CSRF Protection on API Routes
**As a** security engineer
**I want** all state-changing API requests protected against CSRF attacks
**So that** malicious websites cannot perform unauthorized actions

**Priority:** P0 - Critical (Security)
**Effort:** 3-4 hours
**Reference:** `REACT_RECOMMENDATIONS.md` - Section 7 (High Priority)

#### Acceptance Criteria
- [ ] CSRF middleware implemented and active
- [ ] CSRF tokens generated and set in cookies
- [ ] All POST API routes verify CSRF tokens
- [ ] Client-side code sends CSRF tokens in headers
- [ ] Invalid CSRF tokens return 403 Forbidden
- [ ] CSRF tokens properly secured (HttpOnly, Secure, SameSite)
- [ ] Chat functionality still works after CSRF implementation
- [ ] Job analyzer still works after CSRF implementation

#### Implementation Tasks

**Phase 1: CSRF Library Setup (1 hour)**
1. Create `lib/csrf.ts` with token generation and verification
2. Create Next.js middleware file `middleware.ts`
3. Configure CSRF secret in `.env.local`
4. Add CSRF token cookie handling

**Phase 2: API Route Protection (1.5 hours)**
1. Add CSRF verification to `/api/chat` POST route
2. Add CSRF verification to `/api/analyze-job` POST route
3. Add CSRF verification to `/api/analytics` POST route
4. Update error responses for CSRF failures

**Phase 3: Client-Side Integration (1 hour)**
1. Update `lib/hooks/useChat.ts` to include CSRF token
2. Update `components/sections/JobAnalyzer.tsx` to include CSRF token
3. Create utility function to extract CSRF token from cookies
4. Test all API calls with CSRF protection

**Phase 4: Testing (30 minutes)**
1. Test valid requests with correct CSRF tokens
2. Test requests without CSRF tokens (should fail)
3. Test requests with invalid CSRF tokens (should fail)
4. Verify chat and job analyzer work end-to-end

#### Technical Notes

```typescript
// lib/csrf.ts (NEW FILE)
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'change-this-in-production';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate a secure CSRF token
 */
export function generateCsrfToken(): string {
  return crypto
    .randomBytes(CSRF_TOKEN_LENGTH)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Verify CSRF token from request
 */
export async function verifyCsrfToken(request: NextRequest): Promise<boolean> {
  const token = request.headers.get('x-csrf-token');

  if (!token) {
    console.warn('CSRF: Missing token in request header');
    return false;
  }

  const cookieStore = cookies();
  const cookieToken = cookieStore.get('csrf-token')?.value;

  if (!cookieToken) {
    console.warn('CSRF: Missing token in cookie');
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  if (token.length !== cookieToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ cookieToken.charCodeAt(i);
  }

  const isValid = result === 0;

  if (!isValid) {
    console.warn('CSRF: Token mismatch');
  }

  return isValid;
}

// middleware.ts (NEW FILE)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set CSRF token cookie if not present or expired
  const existingToken = request.cookies.get('csrf-token');

  if (!existingToken) {
    const token = generateCsrfToken();

    response.cookies.set('csrf-token', token, {
      httpOnly: false, // Needs to be accessible by JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });
  }

  return response;
}

// Match all routes to ensure CSRF token is always set
export const config = {
  matcher: '/:path*',
};

// lib/utils/csrf-token.ts (NEW FILE)
/**
 * Get CSRF token from cookie for client-side use
 */
export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(/csrf-token=([^;]+)/);
  return match ? match[1] : null;
}

// app/api/chat/route.ts - Add CSRF verification
import { verifyCsrfToken } from '@/lib/csrf';

export async function POST(req: NextRequest): Promise<Response> {
  const startTime = Date.now();

  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // **NEW: Verify CSRF token**
    const isValidCsrf = await verifyCsrfToken(req);

    if (!isValidCsrf) {
      return NextResponse.json(
        {
          error: 'Invalid CSRF token',
          message: 'Request appears to be unauthorized. Please refresh the page and try again.'
        },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();

    // ... rest of existing implementation
  } catch (error) {
    // ... existing error handling
  }
}

// lib/hooks/useChat.ts - Send CSRF token
import { getCsrfToken } from '@/lib/utils/csrf-token';

const sendMessage = useCallback(async (content: string) => {
  if (!content.trim() || isLoading) return;

  setError(null);
  setIsLoading(true);

  // ... existing code ...

  try {
    // ... existing abort controller setup ...

    // **NEW: Get CSRF token**
    const csrfToken = getCsrfToken();

    if (!csrfToken) {
      throw new Error('CSRF token not found. Please refresh the page.');
    }

    // Send request to API
    const response = await fetch(API_ENDPOINTS.CHAT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // **NEW: Include CSRF token**
      },
      body: JSON.stringify({
        messages: conversationHistory,
        sessionId: sessionId.current
      }),
      signal: abortControllerRef.current.signal
    });

    // ... rest of existing implementation
  } catch (err) {
    // ... existing error handling
  }
}, [messages, isLoading]);

// components/sections/JobAnalyzer.tsx - Send CSRF token
import { getCsrfToken } from '@/lib/utils/csrf-token';

const analyzeJob = async () => {
  if (!jobDescription.trim()) {
    setError("Please paste a job description");
    return;
  }

  setAnalyzing(true);
  setError(null);
  setResult(null);

  try {
    const csrfToken = getCsrfToken();

    if (!csrfToken) {
      throw new Error('CSRF token not found. Please refresh the page.');
    }

    const response = await fetch(API_ENDPOINTS.ANALYZE_JOB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken, // **NEW: Include CSRF token**
      },
      body: JSON.stringify({ jobDescription }),
    });

    // ... rest of existing implementation
  } catch (err) {
    setError("Failed to analyze job. Please try again.");
    console.error(err);
  } finally {
    setAnalyzing(false);
  }
};
```

**Files Changed:**
- `lib/csrf.ts` (NEW)
- `lib/utils/csrf-token.ts` (NEW)
- `middleware.ts` (NEW)
- `app/api/chat/route.ts`
- `app/api/analyze-job/route.ts`
- `app/api/analytics/route.ts`
- `lib/hooks/useChat.ts`
- `components/sections/JobAnalyzer.tsx`
- `.env.local` (add CSRF_SECRET)
- `.env.example` (document CSRF_SECRET)

**Dependencies:** None

**Security Notes:**
- Use a strong random secret for `CSRF_SECRET` in production
- Tokens rotate every 24 hours
- Constant-time comparison prevents timing attacks
- SameSite=strict prevents CSRF from cross-origin

**Testing:**
```bash
# Test without CSRF token (should fail)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}], "sessionId": "test-123"}'
# Expected: 403 Forbidden

# Test with CSRF token (should succeed)
# 1. First get the CSRF token from browser cookies
# 2. Then include it in the request
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: YOUR_TOKEN_HERE" \
  -H "Cookie: csrf-token=YOUR_TOKEN_HERE" \
  -d '{"messages": [{"role": "user", "content": "Hello"}], "sessionId": "test-123"}'
# Expected: 200 OK with streaming response
```

---

### US-006.5: Implement Persistent Rate Limiting with Redis
**As a** system administrator
**I want** rate limiting that persists across server restarts
**So that** the application is protected in production serverless environments

**Priority:** P1 - High (Production Readiness)
**Effort:** 4-5 hours
**Reference:** `REACT_RECOMMENDATIONS.md` - Section 4 (High Priority)

#### Acceptance Criteria
- [ ] Vercel KV or Upstash Redis configured
- [ ] Rate limiting utility function created
- [ ] Chat API uses persistent rate limiting
- [ ] Analytics API uses persistent rate limiting
- [ ] Rate limit headers returned (X-RateLimit-*)
- [ ] Rate limits persist across server restarts
- [ ] Rate limits work in multi-instance deployments
- [ ] Graceful fallback if Redis unavailable

#### Implementation Tasks

**Phase 1: Redis Setup (1 hour)**
1. Choose provider: Vercel KV (if on Vercel) or Upstash Redis
2. Create Redis database
3. Install SDK: `@vercel/kv` or `@upstash/redis`
4. Add connection credentials to `.env.local`
5. Test connection

**Phase 2: Rate Limiting Utility (2 hours)**
1. Create `lib/rate-limit.ts` with sliding window algorithm
2. Implement `rateLimit()` function
3. Add support for different limits per endpoint
4. Add graceful fallback for Redis failures
5. Unit test rate limiting logic

**Phase 3: API Integration (1.5 hours)**
1. Replace in-memory rate limiting in `/api/chat`
2. Add rate limiting to `/api/analyze-job` (if not already present)
3. Update `/api/analytics` rate limiting
4. Add rate limit headers to responses
5. Update error messages with retry-after

**Phase 4: Testing (30 minutes)**
1. Test rate limit enforcement
2. Test rate limit reset after window
3. Test multi-request scenarios
4. Verify Redis fallback works
5. Test in production-like environment

#### Technical Notes

**Option 1: Vercel KV (if deploying to Vercel)**
```bash
# Install Vercel KV
npm install @vercel/kv

# Setup via Vercel CLI or dashboard
# Automatically sets environment variables
```

**Option 2: Upstash Redis (platform-agnostic)**
```bash
# Install Upstash Redis
npm install @upstash/redis

# Get credentials from https://console.upstash.com/
# Add to .env.local:
# UPSTASH_REDIS_REST_URL=https://...
# UPSTASH_REDIS_REST_TOKEN=...
```

```typescript
// lib/rate-limit.ts (NEW FILE)
import { kv } from '@vercel/kv'; // or: import { Redis } from '@upstash/redis';

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

interface RateLimitConfig {
  limit: number;      // Max requests
  window: number;     // Time window in seconds
}

/**
 * Rate limit using sliding window algorithm with Redis
 *
 * @param identifier - Unique identifier (e.g., IP + sessionId)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and metadata
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 100, window: 3600 }
): Promise<RateLimitResult> {
  const { limit, window } = config;
  const key = `rate_limit:${identifier}`;

  try {
    // Get current count
    const current = await kv.get<number>(key);
    const now = Date.now();
    const resetTime = now + (window * 1000);

    if (current === null) {
      // First request - set key with expiry
      await kv.set(key, 1, { ex: window });

      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: resetTime
      };
    }

    if (current >= limit) {
      // Rate limit exceeded
      const ttl = await kv.ttl(key);
      const resetTimestamp = now + (ttl * 1000);

      return {
        success: false,
        limit,
        remaining: 0,
        reset: resetTimestamp
      };
    }

    // Increment counter
    const newCount = await kv.incr(key);

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - newCount),
      reset: resetTime
    };

  } catch (error) {
    console.error('Rate limit error (falling back to allow):', error);

    // Graceful fallback: allow request if Redis fails
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Date.now() + (window * 1000)
    };
  }
}

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMITS = {
  CHAT: { limit: 100, window: 3600 },      // 100 requests per hour
  ANALYZE: { limit: 20, window: 3600 },    // 20 analyses per hour
  ANALYTICS: { limit: 60, window: 60 },    // 60 requests per minute
} as const;

// app/api/chat/route.ts - Use persistent rate limiting
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // ... existing validation ...

    // **NEW: Persistent rate limiting**
    const clientIp = req.headers.get('x-forwarded-for') ||
                     req.headers.get('x-real-ip') ||
                     'unknown';
    const rateLimitId = `chat:${clientIp}:${sessionId}`;

    const rateLimitResult = await rateLimit(rateLimitId, RATE_LIMITS.CHAT);

    if (!rateLimitResult.success) {
      const retryAfter = new Date(rateLimitResult.reset).toISOString();

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // ... rest of implementation ...

    // Add rate limit headers to successful response
    const response = new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      },
    });

    return response;

  } catch (error) {
    // ... existing error handling ...
  }
}

// app/api/analyze-job/route.ts - Add rate limiting
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitId = `analyze:${clientIp}`;

    const rateLimitResult = await rateLimit(rateLimitId, RATE_LIMITS.ANALYZE);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many analysis requests. Please wait before trying again.',
          retryAfter: new Date(rateLimitResult.reset).toISOString()
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    // ... rest of implementation ...

  } catch (error) {
    // ... error handling ...
  }
}
```

**Environment Variables:**
```bash
# .env.local
# Option 1: Vercel KV (auto-configured on Vercel)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...

# Option 2: Upstash Redis
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Files Changed:**
- `lib/rate-limit.ts` (NEW)
- `app/api/chat/route.ts`
- `app/api/analyze-job/route.ts`
- `app/api/analytics/route.ts`
- `package.json` (add Redis SDK)
- `.env.local` (add Redis credentials)
- `.env.example` (document Redis variables)

**Dependencies:**
- Vercel KV or Upstash Redis account
- `@vercel/kv` or `@upstash/redis` npm package

**Testing:**
```typescript
// Manual test script
// test-rate-limit.ts
import { rateLimit } from './lib/rate-limit';

async function test() {
  const identifier = 'test-user-123';

  // Make 105 requests (limit is 100)
  for (let i = 1; i <= 105; i++) {
    const result = await rateLimit(identifier, { limit: 100, window: 60 });
    console.log(`Request ${i}: ${result.success ? 'ALLOWED' : 'DENIED'} - Remaining: ${result.remaining}`);

    if (i === 100) {
      console.log('✅ First 100 requests should be allowed');
    }
    if (i === 101) {
      console.log('❌ Request 101 should be denied');
    }
  }
}

test();
```

**Production Deployment:**
1. Create Redis database in Vercel or Upstash dashboard
2. Copy connection credentials
3. Add to Vercel environment variables
4. Deploy application
5. Monitor Redis usage and adjust limits as needed

---

## 🎯 Implementation Order

Execute user stories in this order to manage dependencies:

### Week 1 (8-10 hours)
1. **US-006.1** - Add Zod input validation (3-4 hours) - **DAY 1-2**
2. **US-006.2** - Add explicit return type annotations (3-4 hours) - **DAY 2-3**

### Week 2 (8-10 hours)
3. **US-006.3** - Refactor home page to server component (3-4 hours) - **DAY 4-5**
   - *Requires EPIC-005 dynamic imports completed first*
4. **US-006.4** - Implement CSRF protection (3-4 hours) - **DAY 5-6**

### Week 3 (4-5 hours)
5. **US-006.5** - Implement persistent rate limiting (4-5 hours) - **DAY 7-8**

**Total Time:** 18-22 hours over 2-3 weeks

---

## 📊 Definition of Done

### EPIC Complete When:
- [ ] All 5 user stories completed and accepted
- [ ] All acceptance criteria met for each story
- [ ] Security audit shows zero critical vulnerabilities
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] All API routes have Zod validation
- [ ] CSRF protection active on all POST endpoints
- [ ] Rate limiting uses Redis (not in-memory)
- [ ] Home page is server component with client islands
- [ ] Bundle size reduced by 25-30KB
- [ ] All tests passing (unit + integration)
- [ ] Security documentation updated
- [ ] Deployment runbook created

---

## 🧪 Testing Strategy

### Security Testing
- [ ] Penetration testing for CSRF vulnerabilities
- [ ] Input validation fuzzing with malformed payloads
- [ ] Rate limit bypass attempts
- [ ] SQL injection attempts (if applicable)
- [ ] XSS attempts in chat and job analyzer

### Performance Testing
- [ ] Lighthouse audit before/after refactor
- [ ] Bundle size analysis
- [ ] Core Web Vitals measurement
- [ ] Load testing with concurrent users

### Integration Testing
- [ ] Chat flow end-to-end
- [ ] Job analyzer flow end-to-end
- [ ] Analytics tracking end-to-end
- [ ] Admin dashboard access
- [ ] Multi-browser testing (Chrome, Firefox, Safari)

### Automated Testing
```typescript
// Example test for Zod validation
describe('Chat API Input Validation', () => {
  it('rejects empty messages array', async () => {
    const response = await POST(createRequest({ messages: [] }));
    expect(response.status).toBe(400);
  });

  it('rejects messages without sessionId', async () => {
    const response = await POST(createRequest({
      messages: [{ role: 'user', content: 'Hello' }]
    }));
    expect(response.status).toBe(400);
  });

  it('accepts valid chat request', async () => {
    const response = await POST(createRequest({
      messages: [{ role: 'user', content: 'Hello' }],
      sessionId: 'test-session-123'
    }));
    expect(response.status).toBe(200);
  });
});

// Example test for CSRF
describe('CSRF Protection', () => {
  it('rejects request without CSRF token', async () => {
    const response = await POST(createRequest({}, { skipCsrf: true }));
    expect(response.status).toBe(403);
  });

  it('accepts request with valid CSRF token', async () => {
    const token = generateCsrfToken();
    const response = await POST(createRequest({}, { csrfToken: token }));
    expect(response.status).toBe(200);
  });
});
```

---

## 📦 Deliverables

### New Files
- `lib/schemas/chat.schema.ts` - Zod schemas for chat
- `lib/schemas/job-analyzer.schema.ts` - Zod schemas for job analyzer
- `lib/schemas/analytics.schema.ts` - Zod schemas for analytics
- `lib/csrf.ts` - CSRF token generation and verification
- `lib/utils/csrf-token.ts` - Client-side CSRF utilities
- `middleware.ts` - Next.js middleware for CSRF
- `lib/rate-limit.ts` - Redis-based rate limiting
- `components/Hero.tsx` - Extracted client component

### Updated Files
- All API routes (`app/api/*/route.ts`) - Validation, CSRF, rate limiting
- All components (15+ files) - Return type annotations
- All utility functions (5+ files) - Return type annotations
- `app/page.tsx` - Server component refactor
- `lib/hooks/useChat.ts` - CSRF token support
- `components/sections/JobAnalyzer.tsx` - CSRF token support

### Documentation
- Security documentation (`docs/SECURITY.md`)
- API documentation with validation schemas
- Rate limiting documentation
- Deployment runbook for Redis setup
- Updated README with security features

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests pass (unit, integration, security)
- [ ] Security audit completed
- [ ] Redis database provisioned
- [ ] Environment variables configured
- [ ] CSRF secret generated (strong random value)
- [ ] Rate limits configured appropriately
- [ ] Zod schemas cover all edge cases
- [ ] Error messages user-friendly
- [ ] Performance benchmarks meet targets

### Deployment Steps
1. Deploy to staging environment first
2. Run full security scan
3. Perform load testing
4. Verify Redis connectivity
5. Test rate limiting behavior
6. Verify CSRF protection active
7. Check bundle size reduction
8. Monitor error rates
9. Deploy to production
10. Monitor for 24 hours

### Post-Deployment
- [ ] Monitor error logs for validation failures
- [ ] Monitor Redis performance and usage
- [ ] Track rate limit violations
- [ ] Measure performance improvements
- [ ] Check Core Web Vitals in production
- [ ] Verify SEO improvements
- [ ] Document lessons learned

---

## 📈 Success Metrics (Targets)

### Security
- **Critical Vulnerabilities:** 0 ✅
- **CSRF Protection:** 100% of POST endpoints
- **Input Validation:** 100% of API routes
- **Rate Limit Bypass Attempts:** 0 successful

### Performance
- **Bundle Size:** -25 to -30KB
- **Lighthouse Score:** +5 to +10 points
- **FCP:** -0.2 to -0.3s
- **LCP:** -0.3 to -0.5s
- **TTI:** -0.5 to -0.7s

### Code Quality
- **TypeScript Errors:** 0
- **Type Coverage:** 100% explicit return types
- **Test Coverage:** 80%+ for new code

### Reliability
- **API Error Rate:** < 0.1%
- **Rate Limit Accuracy:** 99.9%
- **Redis Uptime:** 99.9%

---

## 🔗 Related Documentation

- **Audit Report:** `REACT_RECOMMENDATIONS.md`
- **Quick Wins EPIC:** `EPIC-005-quick-wins.md`
- **Next.js Guidelines:** `knowledge/nextjs-typescript.md`
- **Project Instructions:** `CLAUDE.md`
- **Zod Documentation:** https://zod.dev
- **Vercel KV:** https://vercel.com/docs/storage/vercel-kv
- **Upstash Redis:** https://docs.upstash.com/redis

---

## ⚠️ Risks & Mitigation

### Risk 1: Redis Downtime
**Impact:** Rate limiting fails, potential abuse
**Mitigation:** Graceful fallback to allow requests (with logging)
**Prevention:** Use managed Redis with high availability

### Risk 2: CSRF Breaks Existing Clients
**Impact:** API calls fail, features break
**Mitigation:** Phased rollout, comprehensive testing
**Prevention:** Test all API consumers before deployment

### Risk 3: Zod Validation Too Strict
**Impact:** Legitimate requests rejected
**Mitigation:** Review schemas with product team, add logging
**Prevention:** Start with loose validation, tighten over time

### Risk 4: Home Page Refactor Breaks SEO
**Impact:** Search rankings drop
**Mitigation:** Test with Google Search Console, monitor analytics
**Prevention:** Validate server-side rendering before deployment

---

## 📝 Notes

- **Breaking Changes:** CSRF protection requires client-side updates
- **Backward Compatibility:** All changes maintain API contract
- **Data Migration:** None required
- **Rollback Plan:** Git revert + environment variable rollback
- **Support Impact:** Potential increase in "token invalid" support tickets

**Estimated Team Velocity:** 18-22 hours over 2-3 weeks for one developer, 12-15 hours with pair programming

---

*Created: 2025-10-21*
*Last Updated: 2025-10-21*
*EPIC Status: Ready for Development*
*Depends On: EPIC-005 (Quick Wins) must be completed first*
