# US-003: Core Content Sections

**Story ID:** US-003
**Epic:** EPIC-001 - Foundation MVP
**Status:** In Progress
**Priority:** 🔴 Critical
**Story Points:** 8
**Estimated Time:** 4-8 hours

---

## User Story

**As a** recruiter or hiring manager visiting the portfolio
**I want** to see detailed information about Chris's professional experience, skills, and background
**So that** I can quickly assess his qualifications and determine if he's a good fit for my team

---

## Acceptance Criteria

- [ ] About section displays professional summary, photo, and quick stats
- [ ] Experience section shows all 6 positions with details from resume
- [ ] Each experience entry includes: company, role, period, location, achievements, technologies
- [ ] Skills section displays all skill categories in an organized grid
- [ ] Contact section includes contact form and contact information
- [ ] All data pulled from existing resumeData in lib/ai/resume-context.ts
- [ ] Sections are responsive on mobile, tablet, and desktop
- [ ] Professional typography and spacing throughout
- [ ] Smooth transitions between sections
- [ ] All links functional (LinkedIn, email, etc.)

---

## Technical Notes

### Data Integration
- Import `resumeData` from `@/lib/ai/resume-context`
- Use existing structured data (no manual entry needed)
- Map over arrays for dynamic rendering

### Component Structure
```
components/sections/
├── About.tsx       - Professional summary, photo, stats
├── Experience.tsx  - Work history timeline
├── Skills.tsx      - Technology and expertise grid
└── Contact.tsx     - Contact form and info
```

### Responsive Design
- Mobile (< 768px): Single column, stacked layout
- Tablet (768px - 1024px): Two column where appropriate
- Desktop (> 1024px): Multi-column optimized layout

### Styling
- Use Tailwind CSS utility classes
- Maintain gradient theme from hero section
- Card-based layouts for experience entries
- Badge/chip design for skills

---

## Definition of Done

- [ ] All 4 section components created and implemented
- [ ] Data correctly pulled from resume-context.ts
- [ ] All 6 work experiences displayed with full details
- [ ] All skill categories visible and organized
- [ ] Contact form functional (ready for future email integration)
- [ ] Responsive design verified on 3+ screen sizes
- [ ] Code reviewed and follows project conventions
- [ ] No TypeScript errors
- [ ] Sections integrated into homepage

---

## Tasks

This user story contains **4 tasks**:

1. **TASK-007**: Create About Section Component
2. **TASK-008**: Create Experience Section Component
3. **TASK-009**: Create Skills Section Component
4. **TASK-010**: Create Contact Section Component

---

## Dependencies

**Requires:**
- US-001 completed (project foundation)
- US-002 completed (hero section)
- resumeData available in lib/ai/resume-context.ts

**Blocks:**
- EPIC-003 US-009 (Interactive Career Timeline - enhancement)
- EPIC-003 US-010 (Projects Showcase Grid)

---

## Verification Steps

1. Visit http://localhost:3000
2. Scroll down from hero section
3. Verify About section displays:
   - Professional summary
   - Contact links work (LinkedIn, email)
4. Verify Experience section shows all 6 positions:
   - Smart Moving
   - Safelite Autoglass
   - Progressive Leasing
   - Aspenware
   - Inntopia/Ryan Solutions
   - Resort Technology Partners
5. Verify Skills section displays all categories:
   - Core Technologies
   - Frontend Frameworks
   - Cloud & DevOps
   - Architecture & Design
   - AI & Development Tools
   - Methodologies
6. Verify Contact section has functional form
7. Test responsive design on mobile, tablet, desktop
8. Run `npm run build` to verify no errors

---

## Design Reference

```
┌─────────────────────────────────────────────┐
│           [HERO SECTION]                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  ABOUT                                      │
│  ┌──────────┐  Professional summary         │
│  │  Photo   │  12+ years experience         │
│  │          │  6 companies, 3 Tech Lead     │
│  └──────────┘  [LinkedIn] [Email] [GitHub]  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  EXPERIENCE                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ● Smart Moving - Technical Lead            │
│    2024-Current | Dallas, TX                │
│    • Achievement 1                          │
│    • Achievement 2                          │
│    [Angular] [C#] [TypeScript]              │
│  ─────────────────────────────────────────  │
│  ● Safelite - Senior Engineer               │
│  ... (repeat for all 6 positions)           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  SKILLS & EXPERTISE                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │Core Tech │ │ Frontend │ │  Cloud   │   │
│  │ C# .NET  │ │ Angular  │ │  Azure   │   │
│  │   SQL    │ │   Vue    │ │   AWS    │   │
│  └──────────┘ └──────────┘ └──────────┘   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  CONTACT                                    │
│  Ready to work together?                    │
│  ┌─────────────────────────────────────┐   │
│  │ Name:    [____________]             │   │
│  │ Email:   [____________]             │   │
│  │ Message: [____________]             │   │
│  │          [____________]             │   │
│  │                 [Send Message]      │   │
│  └─────────────────────────────────────┘   │
│  Or reach out directly:                     │
│  📧 cnattress@gmail.com                     │
│  🔗 LinkedIn                                │
└─────────────────────────────────────────────┘
```

---

## Notes

**Key Success Factors:**
- Show comprehensive professional background
- Make information scannable (recruiters are busy)
- Use actual resume data (maintain single source of truth)
- Professional presentation that matches industry standards

**Data Reuse:**
- This is the same data the AI chatbot uses
- Single source of truth in resume-context.ts
- Easy to update in one place

**Future Enhancements:**
- EPIC-003 will add interactive timeline (horizontal scrolling)
- EPIC-004 will add job fit analyzer
- EPIC-005 will add visual polish and animations

---

*Story created: 2025-10-21*
*Status: Ready for execution*
