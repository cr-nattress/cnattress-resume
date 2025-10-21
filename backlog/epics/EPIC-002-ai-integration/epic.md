# EPIC-002: AI Integration

**Epic ID:** EPIC-002
**Phase:** 2 - AI Integration
**Timeline:** Week 3-4
**Status:** To Do
**Priority:** 🔴 Critical
**Total Story Points:** 32

---

## Business Value

Integrate Claude AI to create an interactive career concierge chatbot that differentiates the portfolio from traditional resumes. This epic delivers the core "wow" factor that demonstrates AI expertise and provides unique value to recruiters.

### Why This Matters

- **Differentiation**: Only 1% of portfolios have working AI integration
- **Proof of Expertise**: Demonstrates actual AI implementation skills, not just claims
- **User Engagement**: Visitors can ask questions and get immediate, personalized answers
- **Lead Generation**: Analytics track visitor interests and conversation topics
- **Recruiter Value**: Answers "Does this candidate fit?" without scheduling calls

---

## Current State vs Target State

### Current State
- Static portfolio website deployed (EPIC-001 complete)
- No backend infrastructure or database
- No AI capabilities
- No visitor analytics

### Target State
- Supabase PostgreSQL database configured with schema
- Claude AI API integrated with streaming responses
- Persistent chat widget with minimize/maximize functionality
- Anonymous visitor analytics tracking engagement
- Chat conversations logged for improvement insights
- Admin dashboard showing analytics (hidden route)

---

## Technical Approach

### Tech Stack
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Database**: Supabase (PostgreSQL with RLS)
- **Backend**: Netlify Serverless Functions
- **State Management**: React hooks + localStorage
- **Real-time**: Streaming responses from Claude API

### Architecture Decisions
1. Use Netlify Functions to keep API keys secure (never expose in client)
2. Implement streaming for real-time chat experience
3. Store chat history in Supabase for analytics and improvement
4. Use anonymous session IDs (no PII) for privacy
5. Build reusable context system for resume data

### Data Flow
```
User Input → Chat Widget → Netlify Function → Claude API
                                ↓
                          Supabase (logs)
                                ↓
                        Analytics Dashboard
```

---

## User Stories

This epic contains **4 user stories**:

### US-005: Supabase Database Setup (8 points)
Configure PostgreSQL database with schema for analytics, chat logs, and job analyses

### US-006: Claude AI Chatbot Integration (10 points)
Integrate Claude API with streaming responses and context system

### US-007: AI Chat Widget UI (9 points)
Build persistent chat widget with minimize/maximize and message history

### US-008: Analytics & Visitor Tracking (5 points)
Implement anonymous analytics and admin dashboard

---

## Acceptance Criteria

### Must Have ✓
- [ ] Supabase project created with all tables configured
- [ ] Database schema implemented: `visitor_analytics`, `chat_conversations`, `job_analyses`, `project_views`
- [ ] Row Level Security (RLS) policies configured
- [ ] Claude API endpoint (`/api/chat`) working with streaming responses
- [ ] Chat widget UI functional with minimize/maximize
- [ ] Message history persists in localStorage
- [ ] AI responds accurately to questions about skills and experience
- [ ] Response time under 3 seconds for first token
- [ ] Anonymous visitor tracking implemented
- [ ] Admin dashboard shows conversation logs and analytics
- [ ] No API keys exposed in client-side code
- [ ] Rate limiting prevents abuse

### Should Have
- [ ] Chat widget remembers conversation across page navigation
- [ ] Typing indicators and loading states
- [ ] Error handling for API failures
- [ ] Graceful degradation if APIs unavailable

### Nice to Have
- [ ] Chat widget suggests common questions
- [ ] Conversation export functionality
- [ ] Multi-language support for chat

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API costs higher than expected | Medium | Medium | Implement rate limiting, cache common responses |
| Claude API downtime | High | Low | Add error handling, fallback messages, retry logic |
| Database security misconfiguration | High | Medium | Use Supabase RLS policies, test with unauthorized access |
| Chat widget performance issues | Medium | Low | Lazy load widget, optimize rendering, test on mobile |
| Conversation quality poor | High | Medium | Build comprehensive context system, test thoroughly |
| PII accidentally logged | High | Low | Use anonymous session IDs, audit logs regularly |

---

## Success Metrics

### Technical Metrics
- AI response time < 3 seconds for first token
- Chat widget doesn't impact page performance (< 100ms load)
- Database queries execute in < 200ms
- No client-side API key exposure
- 99%+ uptime for chat functionality

### Business Metrics
- **Target**: 30%+ of visitors engage with chat
- **Target**: Average conversation length > 3 messages
- **Target**: Chat provides useful answers 90%+ of the time
- Analytics data flowing to database correctly
- Admin dashboard loads and displays metrics

### User Experience Metrics
- Chat widget is discoverable without being intrusive
- Conversations feel natural and helpful
- Mobile experience is smooth
- Loading states keep users informed

---

## Dependencies

### Required Before Starting
- EPIC-001 completed (foundation and deployment in place)
- Anthropic API key obtained
- Supabase account created
- Resume content prepared for AI context

### Blocks These Epics
- EPIC-003: Interactive Timeline (needs AI insights)
- EPIC-004: Advanced AI Features (builds on chat infrastructure)

---

## Estimated Timeline

| User Story | Estimated Time | Story Points |
|-----------|----------------|--------------|
| US-005: Supabase Database Setup | 3-4 hours | 8 |
| US-006: Claude AI Chatbot | 4-5 hours | 10 |
| US-007: Chat Widget UI | 3-4 hours | 9 |
| US-008: Analytics Tracking | 2-3 hours | 5 |
| **Total** | **12-16 hours** | **32** |

---

## Database Schema

### Tables to Create

```sql
-- Visitor Analytics
CREATE TABLE visitor_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  page_section TEXT,
  time_spent INTEGER,
  interaction_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Chat Conversations
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Job Analyses (for Phase 4)
CREATE TABLE job_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  job_description TEXT NOT NULL,
  match_score INTEGER,
  analysis JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Project Interactions
CREATE TABLE project_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  view_duration INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### `/api/chat` - POST
**Purpose**: Send message to Claude AI, receive streaming response

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "What technologies do you know?" }
  ]
}
```

**Response**: Server-sent events (streaming)

### `/api/analytics` - POST
**Purpose**: Log visitor interaction to Supabase

**Request Body**:
```json
{
  "sessionId": "uuid",
  "pageSection": "hero",
  "timeSpent": 45,
  "interactionType": "scroll"
}
```

---

## Definition of Done

- [ ] All 4 user stories completed
- [ ] All acceptance criteria met
- [ ] Database schema created and tested
- [ ] Claude API integration working with streaming
- [ ] Chat widget functional on all devices
- [ ] Analytics tracking visitor behavior
- [ ] Admin dashboard shows data
- [ ] Security tested (no API key exposure, RLS working)
- [ ] Performance tested (response times meet targets)
- [ ] Code reviewed and merged to main branch
- [ ] Deployed to production
- [ ] 30%+ chat engagement rate achieved

---

## Related Documentation

- [Epic Index](../../../planning/epics-index.md#phase-2-epics-ai-integration-week-3-4)
- [Master Plan](../../../planning/plan.md#phase-2-ai-integration-week-3-4)
- [Database Schema](../../../planning/plan.md#database-schema)
- [API Endpoints](../../../planning/plan.md#api-endpoints)
- [AI Career Concierge](../../../planning/plan.md#-ai-career-concierge)

---

## Notes

This epic is what makes the portfolio unique and memorable. The AI chatbot is the killer feature that demonstrates real capability, not just claims on a resume.

**Key Success Factors:**
1. AI responses must be accurate and helpful
2. Chat widget should be persistent but not annoying
3. Keep API keys secure - never expose in client code
4. Build comprehensive context about skills and experience
5. Test conversations thoroughly before launch

**Performance Considerations:**
- Use streaming for better perceived performance
- Lazy load chat widget to not impact initial page load
- Cache common questions/responses if needed
- Implement rate limiting from day one

---

*Epic created: 2025-10-20*
*Last updated: 2025-10-20*
