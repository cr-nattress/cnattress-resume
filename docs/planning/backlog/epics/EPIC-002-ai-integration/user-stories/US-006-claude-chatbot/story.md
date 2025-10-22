# US-006: Claude AI Chatbot Integration

**Story ID:** US-006
**Epic:** EPIC-002 - AI Integration
**Status:** To Do
**Priority:** 🔴 Critical
**Story Points:** 10
**Estimated Time:** 4-5 hours

---

## User Story

**As a** visitor to the portfolio website
**I want** to ask questions to an AI chatbot about the candidate's skills and experience
**So that** I can quickly understand if they're a good fit for my role without scheduling a call

---

## Acceptance Criteria

- [ ] Netlify function `/api/chat` endpoint created and working
- [ ] Claude API integrated with streaming responses
- [ ] Context system built with resume data for accurate responses
- [ ] AI responds accurately to questions about:
  - Technical skills and proficiency levels
  - Work experience and achievements
  - Project details and technologies used
  - Education and certifications
  - Availability and job preferences
- [ ] Response time under 3 seconds for first token
- [ ] Streaming responses display in real-time
- [ ] Rate limiting implemented (max 20 messages per session)
- [ ] Error handling for API failures with user-friendly messages
- [ ] API key never exposed in client-side code
- [ ] Conversations logged to Supabase for analytics
- [ ] Message history maintained in conversation context

---

## Technical Notes

### Claude API Configuration
- Model: `claude-sonnet-4-20250514`
- Max tokens: 1024
- Temperature: 0.7
- Streaming: enabled

### Context System
Build a comprehensive context object with:
- Full resume text
- Skills with proficiency levels
- Project descriptions
- Work history with achievements
- Personality traits and communication style

### Security Requirements
- API key stored in environment variables (never in code)
- Netlify function acts as proxy (client never calls Claude directly)
- Rate limiting by session ID
- Input sanitization to prevent prompt injection

---

## Definition of Done

- [ ] `/api/chat` endpoint deployed and functional
- [ ] Claude API integration working
- [ ] Streaming responses implemented
- [ ] Context system provides accurate information
- [ ] Rate limiting prevents abuse
- [ ] Error handling covers all failure cases
- [ ] Conversations logged to database
- [ ] No security vulnerabilities
- [ ] Performance meets targets (< 3s first token)
- [ ] Code reviewed and follows best practices

---

## Tasks

This user story contains **5 tasks**:

1. **TASK-010**: Set up Anthropic API and environment variables
2. **TASK-011**: Create Netlify function for Claude API endpoint
3. **TASK-012**: Build resume context system for accurate responses
4. **TASK-013**: Implement streaming response handler
5. **TASK-014**: Add rate limiting and error handling

---

## Dependencies

**Requires:**
- US-005 completed (Supabase database for logging)
- Anthropic API key obtained
- Resume content prepared

**Blocks:**
- US-007 (Chat Widget UI needs this endpoint)
- US-013 (Job Analyzer uses similar patterns)

---

## Verification Steps

1. **Test API Endpoint**:
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"What technologies do you know?"}]}'
   ```

2. **Verify Streaming**:
   - Response should stream chunk by chunk
   - Not wait for entire response before sending

3. **Test Accuracy**:
   - Ask about specific skills → Should give accurate proficiency
   - Ask about projects → Should reference real projects
   - Ask about experience → Should cite actual job history

4. **Test Rate Limiting**:
   - Send 21 messages quickly
   - 21st message should be rate limited

5. **Test Error Handling**:
   - Disconnect internet → Should show friendly error
   - Invalid API key → Should not expose error details to client

---

## Example Conversations to Test

### Conversation 1: Technical Skills
```
User: "What programming languages do you know?"
AI: "I'm proficient in JavaScript/TypeScript, Python, and have experience
     with Go. I've used TypeScript extensively in React and Next.js
     projects for 5+ years..."
```

### Conversation 2: Experience
```
User: "Tell me about your most recent role"
AI: "In my most recent position at [Company], I served as a Senior
     Full-Stack Engineer where I led the migration to microservices
     architecture, resulting in 30% performance improvement..."
```

### Conversation 3: Availability
```
User: "Are you open to remote opportunities?"
AI: "Yes, I'm open to both remote and hybrid opportunities. I have
     experience working remotely and have excellent communication skills..."
```

---

## Notes

**Key Success Factors:**
- Context is everything - build comprehensive resume context
- Streaming makes the experience feel fast
- Error messages should be friendly, never expose internals
- Test thoroughly with different question types

**Common Pitfalls:**
- Not building enough context (AI gives vague answers)
- Exposing API keys in client code
- Not implementing rate limiting (cost explosion)
- Poor error handling (confusing user experience)

**Performance Considerations:**
- Streaming reduces perceived latency
- Keep context concise but comprehensive
- Cache common responses if needed (future optimization)

---

*Story created: 2025-10-20*
*Last updated: 2025-10-20*
