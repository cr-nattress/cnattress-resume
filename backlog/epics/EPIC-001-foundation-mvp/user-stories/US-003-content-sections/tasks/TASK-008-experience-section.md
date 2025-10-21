# TASK-008: Create Experience Section Component

**Task ID:** TASK-008
**User Story:** US-003 - Core Content Sections
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 2-3 hours
**Priority:** 🔴 Critical

---

## Task Description

Create the Experience section component displaying all 6 work positions with detailed achievements and technologies from resume data.

---

## Agent Prompt

You are building the Professional Experience section for the AI-enhanced portfolio website.

**Goal**: Create an Experience component that displays Chris's complete work history in a professional, scannable timeline format.

**Context**: This is the most important content section - recruiters need to quickly understand the career progression, roles, achievements, and technologies. All data is already structured in resume-context.ts. Part of US-003 (Core Content Sections) in EPIC-001 (Foundation MVP).

**Instructions**:

1. **Create Experience component** at `components/sections/Experience.tsx`:

   ```tsx
   import { resumeData } from "@/lib/ai/resume-context";
   import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

   export default function Experience() {
     return (
       <section id="experience" className="py-20 bg-slate-800">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto">
             {/* Section Header */}
             <div className="text-center mb-16">
               <h2 className="text-4xl font-bold gradient-text mb-4">
                 Professional Experience
               </h2>
               <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
               <p className="text-gray-400 text-lg">
                 12+ years building scalable applications across fintech, healthcare, and hospitality
               </p>
             </div>

             {/* Timeline */}
             <div className="relative">
               {/* Vertical line */}
               <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

               {/* Experience Entries */}
               <div className="space-y-12">
                 {resumeData.experience.map((exp, index) => (
                   <div
                     key={index}
                     className={`relative flex flex-col md:flex-row gap-8 ${
                       index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                     }`}
                   >
                     {/* Timeline dot */}
                     <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-800 z-10"></div>

                     {/* Spacer for alternating layout */}
                     <div className="hidden md:block md:w-1/2"></div>

                     {/* Experience Card */}
                     <Card className="md:w-1/2 bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 ml-8 md:ml-0">
                       <CardHeader>
                         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                           <CardTitle className="text-2xl font-bold text-white">
                             {exp.role}
                           </CardTitle>
                           <span className="text-sm font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                             {exp.period}
                           </span>
                         </div>
                         <CardDescription className="text-lg">
                           <span className="font-semibold text-purple-400">{exp.company}</span>
                           <span className="text-gray-500"> • </span>
                           <span className="text-gray-400">{exp.location}</span>
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         {/* Description */}
                         <p className="text-gray-300 leading-relaxed">
                           {exp.description}
                         </p>

                         {/* Key Achievements */}
                         <div>
                           <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                             Key Achievements
                           </h4>
                           <ul className="space-y-2">
                             {exp.achievements.map((achievement, i) => (
                               <li key={i} className="flex items-start gap-2 text-gray-300">
                                 <svg
                                   className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                                   fill="currentColor"
                                   viewBox="0 0 20 20"
                                 >
                                   <path
                                     fillRule="evenodd"
                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                     clipRule="evenodd"
                                   />
                                 </svg>
                                 <span className="text-sm leading-relaxed">{achievement}</span>
                               </li>
                             ))}
                           </ul>
                         </div>

                         {/* Technologies */}
                         <div>
                           <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                             Technologies
                           </h4>
                           <div className="flex flex-wrap gap-2">
                             {exp.technologies.map((tech, i) => (
                               <span
                                 key={i}
                                 className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-full"
                               >
                                 {tech}
                               </span>
                             ))}
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>
     );
   }
   ```

2. **Verify the component renders**:
   - Component should compile without errors
   - All 6 positions should render
   - Check that resumeData.experience imports correctly

3. **Test responsive design**:
   - Mobile (< 768px): Timeline on left, cards full width
   - Desktop (≥ 768px): Alternating left/right layout with centered timeline
   - All achievements and technologies display correctly

4. **Test data mapping**:
   - Verify all 6 companies appear:
     * Smart Moving (2024-Current)
     * Safelite Autoglass (2024)
     * Progressive Leasing (2021-2024)
     * Aspenware (2021)
     * Inntopia/Ryan Solutions (2014-2021)
     * Resort Technology Partners (2012-2014)

---

## Implementation Details

### Data Integration
- Maps over `resumeData.experience` array
- Displays all fields: company, role, location, period, description, achievements, technologies
- No hardcoded data - all from resume-context.ts

### Component Features
- Vertical timeline with gradient line
- Alternating card layout on desktop (zigzag pattern)
- Timeline dots at each position
- Hover effects on cards
- Achievement lists with checkmark icons
- Technology badges
- Responsive breakpoints for mobile/desktop

### Styling
- Dark background (bg-slate-800)
- Glass morphism cards
- Gradient timeline line
- Color-coded elements:
  - Blue: Period badges, timeline
  - Purple: Company names
  - Green: Achievement checkmarks
  - Gradient: Technology badges

---

## Verification

**Visual Checks:**
1. ✅ Section displays with dark background
2. ✅ All 6 positions rendered in chronological order (newest first)
3. ✅ Timeline line visible and styled
4. ✅ Timeline dots at each position
5. ✅ Cards alternate left/right on desktop
6. ✅ All achievements displayed as bullet points
7. ✅ All technologies shown as badges

**Data Checks:**
1. ✅ Smart Moving shows "2024 - Current"
2. ✅ Safelite shows "2024"
3. ✅ Progressive Leasing shows "2021 - 2024"
4. ✅ All company names, locations correct
5. ✅ All achievements mapped correctly
6. ✅ All technologies displayed

**Responsive Checks:**
1. ✅ Mobile: Timeline on left, cards stacked vertically
2. ✅ Desktop: Alternating left/right layout
3. ✅ Achievements readable on all screen sizes
4. ✅ Technology badges wrap properly

**Technical Checks:**
```bash
# No TypeScript errors
npm run build

# Dev server runs without errors
npm run dev

# Check in browser at localhost:3000/#experience
```

---

## Expected Outcome

- ✅ Experience section component created
- ✅ All 6 work positions displayed
- ✅ Complete work history from 2012-Current shown
- ✅ Achievements and technologies for each role visible
- ✅ Professional timeline layout with visual appeal
- ✅ Responsive design works on mobile and desktop
- ✅ Data pulled correctly from resumeData
- ✅ No TypeScript errors

---

## Commit Message

```
feat(experience): Add Professional Experience timeline section

- Create Experience component with full work history
- Display all 6 positions from resumeData
- Implement vertical timeline with alternating cards
- Show achievements and technologies for each role
- Add responsive layout (mobile: stacked, desktop: zigzag)
- Use glass morphism cards with hover effects
```

---

## Next Steps

After completing TASK-008:
1. ✅ Mark TASK-008 as complete
2. ➡️ Proceed to TASK-009: Create Skills Section Component
3. Continue building content sections

---

*Task created: 2025-10-21*
