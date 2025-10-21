# Epics Index - AI-Enhanced Portfolio Website

> Master index of development epics organized by implementation phases

**Project**: AI-Enhanced Portfolio Website
**Source**: [plan.md](./plan.md)
**Last Updated**: 2025-10-20

---

## Overview

This index breaks down the complete portfolio website into manageable epics, aligned with the 5-phase implementation roadmap. Each epic represents a significant feature or capability that delivers user value.

---

## Phase 1 Epics: Foundation MVP (Week 1-2)

### Epic 1.1: Project Foundation & Setup
**Status**: Pending
**Priority**: Critical
**Dependencies**: None

**Description**:
Initialize the Next.js 15 project with all core technologies and development tools configured for the entire build process.

**Key Tasks**:
- Initialize Next.js 15 project with TypeScript
- Configure Tailwind CSS and Shadcn/ui component library
- Set up ESLint, Prettier, and Git repository
- Create folder structure (app/, components/, lib/, types/)
- Configure environment variables structure

**Success Criteria**:
- Development server runs without errors
- All linters and formatters configured
- Hot reload working properly
- TypeScript strict mode enabled

**Related Sections**: [Technology Stack](./plan.md#technology-stack), [System Architecture](./plan.md#system-architecture)

---

### Epic 1.2: Hero Section & Landing Page
**Status**: Pending
**Priority**: Critical
**Dependencies**: Epic 1.1

**Description**:
Create the stunning first impression with animated hero section, gradient backgrounds, and clear call-to-action buttons.

**Key Tasks**:
- Design and implement hero section with gradient background (navy to deep purple)
- Add name, title, and tagline with typography hierarchy
- Implement CTA buttons (Ask AI, Download Resume, View Projects)
- Add smooth scroll navigation to other sections
- Implement basic Framer Motion entrance animations

**Deliverables**:
- Responsive hero section working on all screen sizes
- Smooth scroll behavior to all page sections
- Animated elements with proper timing

**Success Criteria**:
- Hero loads and animates within 1 second
- All CTAs are clearly visible and clickable
- Mobile-first responsive design implemented

**Related Sections**: [Visual Design - Section 1](./plan.md#section-1-hero--landing)

---

### Epic 1.3: Core Content Sections
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 1.2

**Description**:
Build the fundamental content sections that display professional experience, skills, and background information.

**Key Tasks**:
- Create About/Summary section with professional bio
- Build Experience section with job history cards
- Add Skills section with technology badges
- Create Contact section with form UI
- Implement responsive grid layouts for all sections

**Deliverables**:
- 4 main content sections (About, Experience, Skills, Contact)
- Responsive design for mobile, tablet, desktop
- Static content properly formatted and styled

**Success Criteria**:
- All resume content is displayed and readable
- Sections have consistent spacing and typography
- Works seamlessly on all device sizes

**Related Sections**: [Phase 1 Tasks](./plan.md#phase-1-foundation-mvp-week-1-2)

---

### Epic 1.4: Netlify Deployment Pipeline
**Status**: Pending
**Priority**: Critical
**Dependencies**: Epic 1.1, Epic 1.2, Epic 1.3

**Description**:
Set up production deployment infrastructure with CI/CD pipeline on Netlify.

**Key Tasks**:
- Connect GitHub repository to Netlify
- Configure build settings and environment variables
- Set up netlify.toml configuration file
- Configure custom domain (if applicable)
- Test deployment and fix build issues

**Deliverables**:
- Live website deployed to production URL
- Automatic deployments on git push
- Deploy previews for pull requests

**Success Criteria**:
- Site loads in under 2 seconds
- Lighthouse performance score above 90
- No console errors on production build
- Works on Chrome, Firefox, Safari, Edge

**Related Sections**: [Deployment](./plan.md#deployment)

---

## Phase 2 Epics: AI Integration (Week 3-4)

### Epic 2.1: Supabase Database Setup
**Status**: Pending
**Priority**: Critical
**Dependencies**: Epic 1.4

**Description**:
Establish backend database infrastructure with Supabase for analytics, chat history, and data persistence.

**Key Tasks**:
- Create Supabase project and configure PostgreSQL database
- Implement database schema (visitor_analytics, chat_conversations, job_analyses, project_views)
- Set up Row Level Security (RLS) policies
- Create Supabase client utility functions in lib/supabase.ts
- Test database connections and CRUD operations

**Deliverables**:
- All database tables created and configured
- Supabase client utility ready for use
- RLS policies protecting data

**Success Criteria**:
- Database accepts and stores data correctly
- No unauthorized access possible
- Client connection works from both server and client components

**Related Sections**: [Database Schema](./plan.md#database-schema)

---

### Epic 2.2: Claude AI Chatbot Integration
**Status**: Pending
**Priority**: Critical
**Dependencies**: Epic 2.1

**Description**:
Integrate Claude AI API to power the interactive career concierge chatbot that answers questions about experience and skills.

**Key Tasks**:
- Create Netlify function for Claude API endpoint (/api/chat)
- Implement streaming responses for real-time chat experience
- Build context system with resume data for accurate responses
- Add rate limiting and error handling
- Implement message history and conversation threading

**Deliverables**:
- Working Claude API endpoint with streaming
- Context-aware AI responses about career/skills
- Rate limiting to prevent abuse

**Success Criteria**:
- AI responds accurately to questions about skills and experience
- Response time under 3 seconds for first token
- No API key exposure in client-side code
- Graceful error handling for API failures

**Related Sections**: [AI Career Concierge](./plan.md#-ai-career-concierge), [API Endpoints](./plan.md#api-endpoints)

---

### Epic 2.3: AI Chat Widget UI
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 2.2

**Description**:
Design and build the persistent chat widget component with minimize/maximize functionality.

**Key Tasks**:
- Design chat widget component (AIChatWidget.tsx)
- Add minimize/maximize functionality
- Implement message history UI with scrolling
- Add typing indicators and loading states
- Persist chat state in local storage
- Implement glassmorphism design with animations

**Deliverables**:
- Fully functional chat widget UI
- Persistent across page navigation
- Mobile-responsive design

**Success Criteria**:
- Chat widget doesn't impact page performance
- Smooth animations on open/close
- Message history persists on page reload
- Works on mobile and desktop

**Related Sections**: [Visual Design - AI Avatar](./plan.md#section-1-hero--landing)

---

### Epic 2.4: Analytics & Visitor Tracking
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 2.1

**Description**:
Implement anonymous visitor analytics to track engagement and optimize content.

**Key Tasks**:
- Implement visitor tracking with anonymous session IDs
- Track section views and time spent per section
- Log AI conversations to database
- Create admin dashboard component (hidden route /admin)
- Build analytics visualization components

**Deliverables**:
- Anonymous analytics tracking system
- Admin dashboard showing visitor stats
- Conversation logs in database

**Success Criteria**:
- Analytics data appears correctly in database
- No PII (Personally Identifiable Information) collected
- Admin dashboard loads and displays metrics
- Tracking doesn't slow down site performance

**Related Sections**: [Phase 2 Tasks](./plan.md#phase-2-ai-integration-week-3-4)

---

## Phase 3 Epics: Interactive Features (Week 5-6)

### Epic 3.1: Interactive Career Timeline
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 1.3, Epic 2.2

**Description**:
Build the horizontal scrolling timeline visualization with expandable job nodes and AI-generated insights.

**Key Tasks**:
- Design horizontal scrolling timeline component (TimelineSection.tsx)
- Implement expandable nodes for each job position
- Add tech stack badges to each position
- Integrate AI insights for career milestones
- Add smooth animations and transitions

**Deliverables**:
- Interactive timeline with all career positions
- Expandable detail cards for each job
- AI-generated insights for achievements

**Success Criteria**:
- Timeline is intuitive and easy to navigate
- Smooth horizontal scrolling experience
- Mobile-friendly interaction (touch gestures)
- All animations perform smoothly

**Related Sections**: [Interactive Timeline](./plan.md#-interactive-timeline), [Visual Design - Section 3](./plan.md#section-3-interactive-timeline)

---

### Epic 3.2: Projects Showcase Grid
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 1.3

**Description**:
Create a filterable, responsive grid layout showcasing portfolio projects with detailed modal views.

**Key Tasks**:
- Create responsive grid layout for projects (ProjectsGrid.tsx)
- Add project cards with thumbnails and descriptions
- Implement filtering by technology stack
- Add modal view for detailed project information
- Include links to GitHub repos and live demos

**Deliverables**:
- Responsive project grid with filtering
- Modal overlays for project details
- Technology filter buttons

**Success Criteria**:
- At least 50% of visitors view one project
- Filtering works smoothly without lag
- Modal is accessible and keyboard-navigable
- Mobile experience is touch-optimized

**Related Sections**: [Project Deep Dives](./plan.md#-project-deep-dives)

---

### Epic 3.3: GitHub Live Integration
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 3.2

**Description**:
Integrate with GitHub API to display live repository statistics and contribution activity.

**Key Tasks**:
- Set up GitHub API integration with Netlify function (/api/github-stats)
- Fetch live repository stats (stars, forks, languages)
- Display contribution heatmap calendar
- Show recent activity feed
- Implement caching to avoid rate limits (1 hour TTL)

**Deliverables**:
- Live GitHub stats display
- Contribution heatmap visualization
- Recent activity timeline

**Success Criteria**:
- GitHub data updates automatically (hourly)
- Graceful fallback if API rate limited
- Stats display accurately
- Loading states while fetching data

**Related Sections**: [Visual Design - Section 2](./plan.md#section-2-career-snapshot), [API Endpoints](./plan.md#api-endpoints)

---

### Epic 3.4: Enhanced Page Animations
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 3.1, Epic 3.2

**Description**:
Add scroll-triggered animations, parallax effects, and micro-interactions throughout the site.

**Key Tasks**:
- Add scroll-triggered animations with Framer Motion
- Implement parallax effects on hero section
- Add hover effects to all interactive elements
- Create smooth page transitions
- Optimize animations for performance

**Deliverables**:
- Scroll-triggered section reveals
- Parallax hero background
- Consistent hover states

**Success Criteria**:
- Animations don't cause performance issues
- All interactive elements have clear hover states
- Mobile animations are optimized (reduced motion)
- Accessibility: respects prefers-reduced-motion

**Related Sections**: [Phase 3 Tasks](./plan.md#phase-3-interactive-features-week-5-6)

---

## Phase 4 Epics: Advanced AI Features (Week 7-8)

### Epic 4.1: Job Fit Analyzer Tool
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 2.2

**Description**:
Build the AI-powered job description analyzer that calculates match scores and generates custom cover letters.

**Key Tasks**:
- Create UI for job description input (JobAnalyzer.tsx)
- Build Netlify function to analyze JD with Claude (/api/analyze-job)
- Display match score with animated progress bar
- Show detailed breakdown of matching skills
- Highlight gaps and provide learning recommendations
- Generate custom cover letter on demand
- Save analyses to database for tracking

**Deliverables**:
- Working job fit analyzer interface
- Match score calculation and display
- Custom cover letter generation
- Gap analysis with recommendations

**Success Criteria**:
- Job analyzer provides accurate, useful feedback
- Match score correlates with real job requirements
- Cover letters are personalized and professional
- Analysis completes in under 5 seconds

**Related Sections**: [Job Fit Analyzer](./plan.md#-job-fit-analyzer), [Visual Design - Section 4](./plan.md#section-4-job-fit-analyzer)

---

### Epic 4.2: Dynamic Resume Regenerator
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 2.2, Epic 3.1

**Description**:
Implement AI-powered content adaptation that emphasizes different skills based on visitor focus area.

**Key Tasks**:
- Build interface for role type selection (frontend, backend, full-stack, DevOps, AI/ML)
- Create AI prompts for different focus areas
- Implement real-time content regeneration
- Add smooth transitions between content states
- Persist selected view preference

**Deliverables**:
- Role type selector UI
- Dynamic content regeneration
- Smooth content transitions

**Success Criteria**:
- Resume regeneration happens in under 3 seconds
- Content accurately emphasizes selected focus
- Transitions are smooth and professional
- Selected preference persists across page loads

**Related Sections**: [Dynamic Resume Regeneration](./plan.md#-dynamic-resume-regeneration)

---

### Epic 4.3: AI Project Deep Dives
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 2.2, Epic 3.2

**Description**:
Add AI-powered explanations and insights to project showcases with architecture diagrams and code walkthroughs.

**Key Tasks**:
- Add 'Ask AI' button to each project card
- Generate architecture explanations with Claude
- Implement code explanation feature for key snippets
- Create AI-generated executive summaries
- Add visual diagrams where applicable

**Deliverables**:
- AI explanation feature for projects
- Architecture insights
- Executive summaries

**Success Criteria**:
- Project explanations are clear and comprehensive
- AI accurately describes technical architecture
- Explanations help non-technical recruiters understand
- Loading states keep users informed

**Related Sections**: [Project Deep Dives](./plan.md#-project-deep-dives)

---

### Epic 4.4: Smart Contact Form
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 1.3, Epic 2.4

**Description**:
Enhance the contact form with AI-powered suggestions and integrate email delivery.

**Key Tasks**:
- Enhance contact form with AI pre-fill suggestions
- Analyze visitor behavior to customize placeholder text
- Integrate email service (SendGrid or Netlify Forms)
- Add form validation and error handling
- Implement spam protection

**Deliverables**:
- Working contact form with email delivery
- AI-powered suggestion system
- Spam protection

**Success Criteria**:
- Contact form emails arrive correctly formatted
- AI suggestions improve form completion rate
- No spam submissions get through
- Form is accessible and keyboard-navigable

**Related Sections**: [Phase 4 Tasks](./plan.md#phase-4-advanced-ai-features-week-7-8), [API Endpoints](./plan.md#api-endpoints)

---

## Phase 5 Epics: Polish & Innovation (Week 9-10)

### Epic 5.1: 3D Tech Stack Visualization
**Status**: Pending
**Priority**: High
**Dependencies**: Epic 1.2

**Description**:
Create the stunning 3D skill constellation using Three.js with interactive physics and glow effects.

**Key Tasks**:
- Set up Three.js and React Three Fiber (TechStackOrb.tsx)
- Create 3D skill constellation with physics simulation
- Implement interactive zoom and rotation controls
- Add glow effects and particle systems
- Optimize performance for mobile devices
- Add fallback 2D view for low-performance devices

**Deliverables**:
- Interactive 3D tech stack visualization
- Physics-based skill relationships
- Mobile-optimized performance

**Success Criteria**:
- 3D visualizations run smoothly (60fps) on mid-range devices
- Intuitive controls for rotation and zoom
- Fallback 2D mode for unsupported browsers
- Loading state while 3D scene initializes

**Related Sections**: [3D Tech Stack Visualization](./plan.md#-3d-tech-stack-visualization), [Visual Design - Section 1](./plan.md#section-1-hero--landing)

---

### Epic 5.2: Advanced Visual Effects
**Status**: Pending
**Priority**: Medium
**Dependencies**: Epic 3.4

**Description**:
Add premium visual polish with 3D floating logos, cursor-following particles, and micro-interactions.

**Key Tasks**:
- Add hero section 3D floating tech logos
- Implement cursor-following particle effects
- Create smooth page transitions with Framer Motion
- Add micro-interactions to all buttons and links
- Implement glassmorphism design patterns

**Deliverables**:
- Cursor-following particle system
- 3D floating elements in hero
- Consistent micro-interactions

**Success Criteria**:
- Effects enhance rather than distract
- Performance remains above 60fps
- Mobile experience is optimized (particles disabled on mobile)
- Respects user's motion preferences

**Related Sections**: [Phase 5 Tasks](./plan.md#phase-5-polish--innovation-week-9-10)

---

### Epic 5.3: Easter Eggs & Unique Features
**Status**: Pending
**Priority**: Low
**Dependencies**: Epic 2.3

**Description**:
Add hidden features and delightful surprises that make the portfolio memorable.

**Key Tasks**:
- Add Konami code secret developer mode
- Implement terminal emulator (accessible with ~ key)
- Create AI-generated quiz about experience
- Add dark/light mode toggle with smooth transition
- Hide additional secrets for curious visitors

**Deliverables**:
- Konami code activation
- Terminal emulator feature
- Dark mode toggle
- Hidden quiz feature

**Success Criteria**:
- Easter eggs are discoverable but not obvious
- Features don't break main site functionality
- Dark mode preserves all design quality
- Terminal emulator is functional and fun

**Related Sections**: [Phase 5 Tasks](./plan.md#phase-5-polish--innovation-week-9-10)

---

### Epic 5.4: Performance Optimization
**Status**: Pending
**Priority**: Critical
**Dependencies**: All previous epics

**Description**:
Comprehensive performance audit and optimization to ensure blazing-fast load times.

**Key Tasks**:
- Optimize images with next/image and lazy loading
- Implement code splitting for better load times
- Add service worker for PWA capabilities
- Run comprehensive Lighthouse audits
- Fix all performance bottlenecks
- Implement edge caching strategies

**Deliverables**:
- Optimized image loading
- Code splitting implementation
- PWA functionality
- Lighthouse score improvements

**Success Criteria**:
- Lighthouse Performance score: 95+
- First Contentful Paint under 1.5 seconds
- Time to Interactive under 3 seconds
- All images optimized and lazy-loaded

**Related Sections**: [Phase 5 Tasks](./plan.md#phase-5-polish--innovation-week-9-10), [Success Metrics](./plan.md#success-metrics)

---

### Epic 5.5: SEO & Accessibility
**Status**: Pending
**Priority**: Critical
**Dependencies**: All previous epics

**Description**:
Ensure the site is discoverable by search engines and accessible to all users.

**Key Tasks**:
- Add comprehensive meta tags and Open Graph data
- Implement schema markup for rich snippets
- Ensure WCAG AA accessibility compliance
- Add alt text to all images and proper ARIA labels
- Implement semantic HTML throughout
- Create XML sitemap and robots.txt

**Deliverables**:
- Complete meta tag implementation
- Schema markup for person/portfolio
- WCAG AA compliance certification
- Sitemap and robots.txt

**Success Criteria**:
- Lighthouse Accessibility score: 100
- All images have descriptive alt text
- Keyboard navigation works perfectly
- Screen reader compatibility verified
- Rich snippets appear in Google search

**Related Sections**: [Phase 5 Tasks](./plan.md#phase-5-polish--innovation-week-9-10), [Success Metrics](./plan.md#success-metrics)

---

## Epic Dependencies Graph

```
Phase 1 (Foundation MVP)
┌──────────────────────────────────────────┐
│ 1.1 Project Foundation & Setup          │
└────────────┬─────────────────────────────┘
             │
     ┌───────┴────────┬────────────────┐
     ▼                ▼                ▼
┌─────────┐  ┌──────────────┐  ┌──────────────┐
│ 1.2     │  │ 1.3 Content  │  │ 1.4 Netlify  │
│ Hero    │  │ Sections     │  │ Deployment   │
└─────────┘  └──────────────┘  └──────┬───────┘
                                       │
Phase 2 (AI Integration)               │
                                       ▼
                             ┌──────────────────┐
                             │ 2.1 Supabase DB  │
                             └────────┬─────────┘
                                      │
                          ┌───────────┼───────────┐
                          ▼           ▼           ▼
                    ┌─────────┐ ┌─────────┐ ┌─────────┐
                    │ 2.2 AI  │ │ 2.4     │ │ 2.3 Chat│
                    │ Chat    │ │Analytics│ │ Widget  │
                    └────┬────┘ └─────────┘ └─────────┘
                         │
Phase 3 (Interactive)    │
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
┌─────────┐      ┌──────────────┐    ┌──────────────┐
│ 3.1     │      │ 3.2 Projects │    │ 3.4 Enhanced │
│Timeline │      │ Grid         │    │ Animations   │
└─────────┘      └──────┬───────┘    └──────────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ 3.3 GitHub   │
                 │ Integration  │
                 └──────────────┘
                        │
Phase 4 (Advanced AI)   │
                        │
     ┌──────────────────┼──────────────────┐
     ▼                  ▼                  ▼
┌─────────┐      ┌──────────────┐  ┌──────────────┐
│ 4.1 Job │      │ 4.2 Resume   │  │ 4.3 Project  │
│Analyzer │      │ Regenerator  │  │ Deep Dives   │
└─────────┘      └──────────────┘  └──────────────┘
     │
     ▼
┌─────────────┐
│ 4.4 Smart   │
│ Contact Form│
└─────────────┘
     │
Phase 5 (Polish)│
     │
     ▼
┌─────────────────────────────────────────┐
│ All Phase 5 Epics can run in parallel   │
│ 5.1 3D Visualization                    │
│ 5.2 Visual Effects                      │
│ 5.3 Easter Eggs                         │
│ 5.4 Performance (depends on all)        │
│ 5.5 SEO & Accessibility (depends on all)│
└─────────────────────────────────────────┘
```

---

## Epic Prioritization Matrix

| Epic | Business Value | Technical Complexity | User Impact | Priority Score |
|------|---------------|---------------------|-------------|----------------|
| 1.1 Project Foundation | Critical | Medium | N/A | 10 |
| 1.2 Hero Section | Critical | Low | High | 10 |
| 1.3 Content Sections | Critical | Low | High | 10 |
| 1.4 Netlify Deployment | Critical | Medium | High | 10 |
| 2.1 Supabase DB | High | Medium | Medium | 8 |
| 2.2 Claude AI Chat | Critical | High | Very High | 10 |
| 2.3 Chat Widget UI | High | Medium | High | 9 |
| 2.4 Analytics | Medium | Low | Low | 6 |
| 3.1 Timeline | High | Medium | High | 9 |
| 3.2 Projects Grid | High | Low | High | 8 |
| 3.3 GitHub Integration | Medium | Medium | Medium | 7 |
| 3.4 Animations | Medium | Medium | Medium | 7 |
| 4.1 Job Analyzer | Very High | High | Very High | 10 |
| 4.2 Resume Regenerator | Medium | High | Medium | 7 |
| 4.3 Project Deep Dives | Medium | Medium | Medium | 7 |
| 4.4 Smart Contact | High | Low | High | 8 |
| 5.1 3D Visualization | High | Very High | High | 8 |
| 5.2 Visual Effects | Medium | High | Medium | 7 |
| 5.3 Easter Eggs | Low | Medium | Low | 4 |
| 5.4 Performance | Critical | Medium | Very High | 10 |
| 5.5 SEO & Accessibility | Critical | Medium | Very High | 10 |

---

## Success Metrics by Epic

### Phase 1 Metrics
- Site deployed and accessible: ✓/✗
- Mobile responsive: ✓/✗
- Lighthouse performance > 90: ✓/✗

### Phase 2 Metrics
- AI chat response time < 3s: ✓/✗
- Chat engagement rate > 30%: ✓/✗
- Analytics tracking correctly: ✓/✗

### Phase 3 Metrics
- Timeline navigation intuitive: ✓/✗
- GitHub stats updating: ✓/✗
- 50%+ view projects: ✓/✗

### Phase 4 Metrics
- Job analyzer accuracy: ✓/✗
- Resume regeneration < 3s: ✓/✗
- Contact form submission rate > 5%: ✓/✗

### Phase 5 Metrics
- Lighthouse performance > 95: ✓/✗
- Lighthouse accessibility = 100: ✓/✗
- 3D rendering 60fps: ✓/✗

---

## Quick Reference

### Total Epics: 21
- Phase 1: 4 epics
- Phase 2: 4 epics
- Phase 3: 4 epics
- Phase 4: 4 epics
- Phase 5: 5 epics

### Estimated Timeline: 10 weeks
- Foundation: 2 weeks
- AI Integration: 2 weeks
- Interactive Features: 2 weeks
- Advanced AI: 2 weeks
- Polish: 2 weeks

### Critical Path Epics:
1. Project Foundation (1.1)
2. Hero Section (1.2)
3. Netlify Deployment (1.4)
4. Claude AI Chat (2.2)
5. Job Analyzer (4.1)
6. Performance Optimization (5.4)
7. SEO & Accessibility (5.5)

---

## Next Steps

1. Review and approve epic definitions
2. Create detailed user stories for Phase 1 epics
3. Set up project tracking (GitHub Projects or similar)
4. Begin Epic 1.1: Project Foundation & Setup

---

*This epic index serves as the master roadmap for building the AI-enhanced portfolio website. Each epic will be broken down into specific user stories and tasks during sprint planning.*
