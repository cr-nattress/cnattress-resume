# US-013: Job Fit Analyzer Tool

**Story ID:** US-013
**Epic:** EPIC-004 - Advanced AI Features
**Status:** To Do
**Priority:** 🔴 Critical
**Story Points:** 10
**Estimated Time:** 4-5 hours

---

## User Story

**As a** recruiter or hiring manager
**I want** to paste a job description and get an instant analysis of how well the candidate matches
**So that** I can quickly determine if this candidate is worth pursuing without reading the entire resume

---

## Acceptance Criteria

- [ ] Job Fit Analyzer section visible on page (after projects section)
- [ ] Large textarea input for job description (or file upload option)
- [ ] "Analyze Match" button triggers analysis
- [ ] Loading state with progress indicator during analysis
- [ ] Match score displays as animated progress bar (0-100)
- [ ] Color-coded score: 0-60 (red), 61-80 (yellow), 81-100 (green)
- [ ] Results section shows:
  - Overall match score with justification
  - "Strong Matches" section: Top 5 matching skills with evidence
  - "Learning Opportunities" section: Top 3 gaps with recommendations
  - Custom cover letter generated specifically for this JD
- [ ] "Download Cover Letter" button exports as .txt or .docx
- [ ] "Download Analysis" button exports full analysis as PDF
- [ ] All analyses saved to Supabase `job_analyses` table
- [ ] Analysis completes in under 5 seconds
- [ ] Error handling for invalid/empty job descriptions
- [ ] Mobile responsive design
- [ ] Accessible keyboard navigation and screen reader support

---

## Technical Notes

### UI Components
```typescript
<JobAnalyzer>
  <JobDescriptionInput />
  <AnalyzeButton />
  <LoadingState />
  <MatchScore score={92} />
  <SkillsBreakdown matches={[]} gaps={[]} />
  <CoverLetter content={""} />
  <ExportButtons />
</JobAnalyzer>
```

### API Integration
- POST to `/api/analyze-job` with job description
- Receive structured response with match data
- Parse and display in UI
- Save to Supabase for analytics

### Match Score Calculation (AI-driven)
Claude analyzes:
- Required skills vs candidate skills
- Experience level match
- Industry/domain match
- Soft skills alignment
- Cultural fit indicators

### Data Persistence
```typescript
interface JobAnalysis {
  id: string;
  sessionId: string;
  jobDescription: string;
  matchScore: number;
  analysis: {
    strengths: Array<{ skill: string; evidence: string }>;
    gaps: Array<{ skill: string; recommendation: string }>;
    justification: string;
  };
  coverLetter: string;
  createdAt: Date;
}
```

---

## Definition of Done

- [ ] Job analyzer UI implemented and styled
- [ ] API endpoint `/api/analyze-job` functional
- [ ] AI provides accurate match scores
- [ ] Skills breakdown is detailed and specific
- [ ] Cover letters are personalized with specific achievements
- [ ] Export functionality works (cover letter + analysis)
- [ ] Loading states and error handling implemented
- [ ] Data saved to Supabase
- [ ] Mobile responsive
- [ ] Accessibility tested
- [ ] Performance tested (< 5s analysis time)

---

## Tasks

This user story contains **5 tasks**:

1. **TASK-019**: Create Job Analyzer UI components
2. **TASK-020**: Build `/api/analyze-job` endpoint
3. **TASK-021**: Implement match score calculation with AI
4. **TASK-022**: Generate custom cover letter with AI
5. **TASK-023**: Add export functionality (PDF, DOCX)

---

## Dependencies

**Requires:**
- EPIC-002 completed (Claude API integration)
- Resume content comprehensive and up-to-date
- Supabase database with `job_analyses` table

**Blocks:**
- None

---

## Verification Steps

1. **Test with Real Job Descriptions**:
   - Paste a frontend engineer JD → Should score high (90+)
   - Paste a data scientist JD → Should score lower, identify gaps
   - Paste a managerial JD → Should identify limited management experience

2. **Verify Match Score Accuracy**:
   - Score should correlate with actual fit
   - Skills breakdown should be specific
   - Gaps should be realistic and actionable

3. **Test Cover Letter Quality**:
   - Should reference specific achievements
   - Should address job requirements
   - Should be professional and concise
   - Requires minimal editing

4. **Performance Testing**:
   - Time from "Analyze" click to results
   - Should complete in < 5 seconds

5. **Export Testing**:
   - Download cover letter → Opens correctly
   - Download analysis → Formatted properly

---

## Design Reference

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  📋 Want to see how I fit your role?                ║
║                                                       ║
║  ┌──────────────────────────────────────────────┐  ║
║  │ Paste job description here...                │  ║
║  │                                              │  ║
║  └──────────────────────────────────────────────┘  ║
║           [Analyze Match with AI]                   ║
║                                                       ║
║  ─────────── Results ──────────────                ║
║                                                       ║
║  Match Score: 92/100 ████████████████████░░         ║
║                                                       ║
║  ✓ Strong Matches:                                   ║
║    • React & Next.js (5 years experience)           ║
║    • PostgreSQL optimization (expert level)         ║
║    • Microservices architecture                     ║
║                                                       ║
║  ⚠ Learning Opportunities:                          ║
║    • GraphQL (recommended: Apollo tutorials)        ║
║                                                       ║
║  [Download Custom Cover Letter] [Download Analysis] ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## Example AI Prompt

```
You are analyzing a job description to determine how well a candidate matches.

CANDIDATE PROFILE:
{fullResumeContext}

JOB DESCRIPTION:
{userProvidedJobDescription}

Analyze and provide:

1. MATCH SCORE (0-100):
   - Calculate based on required skills, experience level, and domain fit
   - Be realistic - don't inflate scores

2. STRONG MATCHES (Top 5):
   - List specific skills/experiences that match well
   - Provide evidence from candidate's background
   Format: {"skill": "React", "evidence": "5 years building production apps"}

3. LEARNING OPPORTUNITIES (Top 3):
   - Skills mentioned in JD that candidate lacks or needs to improve
   - Provide specific, actionable learning recommendations
   Format: {"skill": "GraphQL", "recommendation": "Apollo GraphQL tutorial"}

4. JUSTIFICATION:
   - 2-3 sentence explanation of the match score

5. CUSTOM COVER LETTER:
   - 3 paragraphs
   - Reference specific requirements from JD
   - Cite specific achievements from candidate's background
   - Professional tone, enthusiastic but not desperate

Return as JSON.
```

---

## Notes

**Key Success Factors:**
- Match scores must be credible and justifiable
- Skills breakdown must be specific, not generic
- Cover letters must reference actual achievements
- Analysis must help recruiters make decisions
- Experience should feel like magic, but results must be useful

**Common Pitfalls:**
- Inflating match scores (leads to distrust)
- Generic cover letters (defeats the purpose)
- Vague skill matches (not actionable)
- Slow analysis time (users abandon)
- Poor error messages (confusing UX)

**Testing Strategy:**
- Test with 10+ real job descriptions
- Compare scores to actual fit assessment
- Have recruiters review cover letter quality
- Test edge cases (very short JDs, non-technical roles)

---

*Story created: 2025-10-20*
*Last updated: 2025-10-20*
