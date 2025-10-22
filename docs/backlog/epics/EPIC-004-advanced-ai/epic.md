# EPIC-004: Advanced AI Features

**Epic ID:** EPIC-004
**Phase:** 4 - Advanced AI Features
**Timeline:** Week 7-8
**Status:** To Do
**Priority:** 🟡 High
**Total Story Points:** 32

---

## Business Value

Leverage AI to create unique, high-value tools that directly benefit recruiters and hiring managers. These features transform the portfolio from "impressive" to "unforgettable" by providing practical, AI-powered functionality that competitors don't have.

### Why This Matters

- **Unique Selling Proposition**: Tools that actively help recruiters do their job better
- **Lead Generation**: Job analyzer encourages engagement and captures intent data
- **Conversation Starter**: Features worth discussing in interviews
- **Skill Demonstration**: Proves advanced AI integration beyond basic chatbots
- **Viral Potential**: Unique tools get shared and generate word-of-mouth

---

## Current State vs Target State

### Current State
- Basic AI chatbot functional (EPIC-002)
- Static content presentation (EPIC-001)
- Interactive timeline and projects (EPIC-003)
- Resume content is fixed

### Target State
- Job Fit Analyzer: Paste JD → Get match score + custom cover letter
- Dynamic Resume Regenerator: Adapts content emphasis based on role focus
- AI Project Deep Dives: Click "Ask AI" on any project for detailed explanations
- Smart Contact Form: AI suggests message based on visitor behavior
- All features provide measurable value to recruiters
- Analytics track which AI features drive conversions

---

## Technical Approach

### Tech Stack Additions
- **File Upload**: React Dropzone or native input for job descriptions
- **Progress Visualization**: Custom progress bars for match scores
- **Rich Text**: Markdown rendering for AI-generated content
- **State Persistence**: LocalStorage for generated content

### Architecture Decisions
1. Create dedicated API endpoints for each AI feature
2. Build reusable prompt templates for consistent AI responses
3. Cache generated content to reduce API costs
4. Implement loading states with progress indicators
5. Log all analyses to Supabase for improvement insights

### AI Prompting Strategy
- **Job Analyzer**: Structured prompts with skill extraction and matching
- **Resume Regenerator**: Content reordering and emphasis adjustment
- **Project Deep Dives**: Technical architecture explanation prompts
- **Smart Contact**: Behavioral analysis and message suggestion

---

## User Stories

This epic contains **4 user stories**:

### US-013: Job Fit Analyzer Tool (10 points)
Paste job description, get match score, gap analysis, and custom cover letter

### US-014: Dynamic Resume Regenerator (8 points)
AI adapts resume content emphasis based on role type selection

### US-015: AI Project Deep Dives (7 points)
"Ask AI" button on projects generates architecture explanations

### US-016: Smart Contact Form (7 points)
AI-enhanced contact form with behavior-based suggestions

---

## Acceptance Criteria

### Must Have ✓
- [ ] Job Fit Analyzer UI with job description input (textarea or file upload)
- [ ] Match score calculation (0-100) with visual progress bar
- [ ] Detailed breakdown of matching skills
- [ ] Gap analysis showing missing skills
- [ ] Learning recommendations for gaps
- [ ] Custom cover letter generation based on JD
- [ ] All analyses saved to Supabase
- [ ] Resume regenerator with role type selector (Frontend, Backend, Full-Stack, DevOps, AI/ML)
- [ ] Content dynamically re-emphasizes based on selection
- [ ] Smooth transitions between content states (< 3 seconds)
- [ ] "Ask AI" button on each project card
- [ ] AI generates architecture explanations
- [ ] Executive summaries for non-technical recruiters
- [ ] Smart contact form with AI pre-fill suggestions
- [ ] Email integration working (SendGrid or Netlify Forms)
- [ ] All features have loading states
- [ ] Error handling for all AI calls

### Should Have
- [ ] Job analyzer export results as PDF
- [ ] Resume regenerator persists selection
- [ ] Project explanations include diagrams (ASCII art or mermaid)
- [ ] Contact form suggests meeting times

### Nice to Have
- [ ] Job analyzer compares multiple JDs
- [ ] Resume regenerator shows before/after diff
- [ ] Project deep dives include code walkthroughs
- [ ] Contact form AI detects spam/low-quality

---

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API costs higher than expected | High | Medium | Cache aggressively, implement rate limiting |
| Match scores inaccurate | High | Medium | Test with real JDs, refine prompts iteratively |
| Cover letters generic/poor quality | High | Medium | Use structured prompts, include specific achievements |
| Resume regeneration feels gimmicky | Medium | Low | Test with real users, keep changes subtle |
| AI explanations too technical | Medium | Medium | Generate multiple versions (technical + executive) |

---

## Success Metrics

### Technical Metrics
- Job analysis completes in < 5 seconds
- Resume regeneration completes in < 3 seconds
- Match scores correlate with real job fit
- Cover letters are personalized and relevant
- All AI features maintain high quality responses

### Business Metrics
- **Target**: 20%+ of visitors use job analyzer
- **Target**: 50%+ of job analyzer users download cover letter
- **Target**: 10%+ use resume regenerator
- **Target**: Contact form submission rate > 5%
- Analytics show which features drive engagement

### User Experience Metrics
- Job analyzer is intuitive (no instructions needed)
- Match scores are credible and actionable
- Cover letters require minimal editing
- Resume regeneration feels valuable, not gimmicky
- Contact form AI is helpful, not annoying

---

## Dependencies

### Required Before Starting
- EPIC-002 completed (AI infrastructure in place)
- EPIC-003 completed (Projects grid for deep dives)
- Job description examples for testing
- Email service configured (SendGrid or Netlify)

### Blocks These Epics
- None (final feature epic before polish)

---

## Estimated Timeline

| User Story | Estimated Time | Story Points |
|-----------|----------------|--------------|
| US-013: Job Fit Analyzer | 4-5 hours | 10 |
| US-014: Resume Regenerator | 3-4 hours | 8 |
| US-015: Project Deep Dives | 2-3 hours | 7 |
| US-016: Smart Contact Form | 2-3 hours | 7 |
| **Total** | **11-15 hours** | **32** |

---

## AI Prompt Templates

### Job Fit Analyzer Prompt
```
Analyze this job description and compare it to the candidate profile:

JOB DESCRIPTION:
{jobDescription}

CANDIDATE PROFILE:
{resumeContext}

Provide:
1. Match score (0-100) with justification
2. Top 5 matching skills with proficiency evidence
3. Top 3 skill gaps with learning recommendations
4. Custom cover letter highlighting relevant experience
```

### Resume Regenerator Prompt
```
Reorder and emphasize resume sections for a {roleType} position.

CURRENT RESUME:
{resumeContent}

TARGET ROLE: {roleType}

Adjust emphasis to highlight:
- Most relevant technologies
- Most relevant projects
- Most relevant achievements

Return restructured content with same information, different emphasis.
```

---

## API Endpoints

### `/api/analyze-job` - POST
**Purpose**: Analyze job description and return match score

**Request Body**:
```json
{
  "jobDescription": "string",
  "sessionId": "string"
}
```

**Response**:
```json
{
  "matchScore": 92,
  "strengths": ["React", "TypeScript", "PostgreSQL"],
  "gaps": ["GraphQL"],
  "recommendations": ["Course on GraphQL fundamentals"],
  "coverLetter": "Dear Hiring Manager..."
}
```

### `/api/regenerate-resume` - POST
**Purpose**: Regenerate resume with different emphasis

### `/api/explain-project` - POST
**Purpose**: Generate project architecture explanation

---

## Definition of Done

- [ ] All 4 user stories completed
- [ ] All acceptance criteria met
- [ ] Job analyzer provides accurate, useful feedback
- [ ] Resume regeneration happens quickly (< 3s)
- [ ] Project explanations are clear and comprehensive
- [ ] Contact form emails arrive correctly formatted
- [ ] All analyses logged to Supabase
- [ ] Performance tested (all features respond quickly)
- [ ] Security tested (no prompt injection vulnerabilities)
- [ ] Code reviewed and merged to main branch
- [ ] Deployed to production
- [ ] Analytics confirm usage targets met

---

## Related Documentation

- [Epic Index](../../../planning/epics-index.md#phase-4-epics-advanced-ai-features-week-7-8)
- [Master Plan](../../../planning/plan.md#phase-4-advanced-ai-features-week-7-8)
- [Job Fit Analyzer Design](../../../planning/plan.md#section-4-job-fit-analyzer)
- [API Endpoints](../../../planning/plan.md#api-endpoints)

---

## Notes

This epic is where AI expertise truly shines. These aren't toy features - they're practical tools that help recruiters do their jobs better.

**Key Success Factors:**
1. Job analyzer must provide real value, not generic feedback
2. Match scores must be credible and justifiable
3. Cover letters must be personalized with specific achievements
4. Resume regeneration should be subtle, not jarring
5. All features should feel polished and professional

**Prompt Engineering is Critical:**
- Test prompts extensively with real job descriptions
- Include specific examples in prompts for better results
- Use structured output formats for consistent parsing
- Iterate based on quality of AI responses

**Cost Management:**
- Cache generated content aggressively
- Implement per-session rate limiting
- Monitor API usage and costs closely
- Consider Claude Haiku for simpler tasks

---

*Epic created: 2025-10-20*
*Last updated: 2025-10-20*
