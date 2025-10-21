# US-009: Interactive Career Timeline

**Story ID:** US-009
**Epic:** EPIC-003 - Interactive Features
**Status:** To Do
**Priority:** 🟡 High
**Story Points:** 9
**Estimated Time:** 3-4 hours

---

## User Story

**As a** recruiter or hiring manager
**I want** to see an interactive timeline of the candidate's career progression
**So that** I can quickly understand their experience trajectory and key achievements at each role

---

## Acceptance Criteria

- [ ] Horizontal scrolling timeline with all career positions displayed
- [ ] Timeline shows positions chronologically from earliest to most recent
- [ ] Each position represented by a node/circle on the timeline
- [ ] Clicking a node expands details panel showing:
  - Company name and logo
  - Position title
  - Date range (start - end or "Present")
  - Job description/responsibilities
  - Key achievements with metrics
  - Technologies used (as badges)
- [ ] Tech stack badges display for each position
- [ ] AI-generated insight for each role (pulled from chat API)
- [ ] Smooth animations for expand/collapse
- [ ] Timeline is horizontally scrollable (mouse wheel, trackpad, touch)
- [ ] Current/selected node is highlighted
- [ ] Mobile: Swipe gestures work for navigation
- [ ] Keyboard navigation: Arrow keys move between nodes
- [ ] Responsive design: works on mobile, tablet, desktop
- [ ] Loading state while fetching AI insights
- [ ] All animations maintain 60fps

---

## Technical Notes

### Timeline Layout
- Use CSS Grid or Flexbox for horizontal layout
- Implement native scroll-snap for better UX
- Use IntersectionObserver to track visible nodes

### Data Structure
```typescript
interface TimelineItem {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date; // undefined for current role
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}
```

### AI Insights
- Call chat API for each position: "Provide a one-sentence insight about this role: {position} at {company}"
- Cache insights in localStorage to avoid repeat API calls
- Show loading skeleton while fetching

### Animation Strategy
- Use Framer Motion for expand/collapse
- CSS transforms for smooth scrolling
- requestAnimationFrame for scroll tracking

---

## Definition of Done

- [ ] Timeline component implemented and functional
- [ ] All positions display correctly
- [ ] Horizontal scrolling works smoothly
- [ ] Expand/collapse animations smooth (60fps)
- [ ] AI insights display for each role
- [ ] Tech badges styled and responsive
- [ ] Mobile gestures work properly
- [ ] Keyboard navigation functional
- [ ] Accessibility tested (screen reader, keyboard only)
- [ ] Performance tested on low-end devices
- [ ] Code reviewed and follows best practices

---

## Tasks

This user story contains **4 tasks**:

1. **TASK-015**: Create timeline data structure and content
2. **TASK-016**: Build horizontal scrolling timeline component
3. **TASK-017**: Implement expandable detail panels
4. **TASK-018**: Add AI insights and tech stack badges

---

## Dependencies

**Requires:**
- EPIC-001 completed (foundation in place)
- EPIC-002 completed (AI API for insights)
- Career data prepared (positions, descriptions, achievements)

**Blocks:**
- None

---

## Verification Steps

1. **Desktop Testing**:
   - Load page and scroll to timeline section
   - Verify timeline displays horizontally
   - Click each node → Details panel should expand
   - Verify smooth animations
   - Use arrow keys → Should navigate nodes

2. **Mobile Testing**:
   - Swipe left/right → Timeline should scroll
   - Tap node → Details should expand
   - Verify touch gestures work smoothly

3. **Performance Testing**:
   - Open DevTools Performance tab
   - Record while interacting with timeline
   - Verify animations maintain 60fps
   - Check for layout shifts or jank

4. **Accessibility Testing**:
   - Tab through timeline → All nodes should be focusable
   - Use screen reader → Content should be announced
   - Verify ARIA labels are present

---

## Design Reference

```
Timeline Layout:

○────────●────────●────────●────────○
2016    2018    2020    2022    2024
         │
   ┌─────┴──────────────────────┐
   │ Senior Full-Stack Engineer │
   │ TechCorp Inc.              │
   │ • Led microservices migration          │
   │ • React, Node.js, PostgreSQL          │
   │ • 30% performance improvement         │
   └────────────────────────────┘

💬 AI: "This role established expertise in
       cloud architecture and DevOps practices"
```

---

## Notes

**Key Success Factors:**
- Timeline should be immediately understandable
- Horizontal scrolling should feel natural
- Expanded details should provide value beyond resume
- AI insights should add context, not just repeat info
- Mobile experience is as important as desktop

**Common Pitfalls:**
- Horizontal scroll conflicts with page scroll
- Animation performance on mobile
- Too much information in expanded view
- Poor touch target sizes on mobile
- Not respecting prefers-reduced-motion

**Performance Considerations:**
- Lazy load AI insights (only fetch when node expanded)
- Use CSS transforms (not top/left for animations)
- Implement scroll debouncing
- Cache AI insights in localStorage
- Test on actual mobile devices

---

*Story created: 2025-10-20*
*Last updated: 2025-10-20*
