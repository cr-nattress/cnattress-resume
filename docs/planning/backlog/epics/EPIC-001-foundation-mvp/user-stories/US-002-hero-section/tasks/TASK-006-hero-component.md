# TASK-006: Create Hero Section Component Structure

**Task ID:** TASK-006
**User Story:** US-002 - Hero Section & Landing Page
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 30 minutes
**Priority:** 🔴 Critical

---

## Task Description

Create the HeroSection component with proper structure, layout, and responsive design foundation.

---

## Agent Prompt

You are building the hero section for the AI-enhanced portfolio website.

**Goal**: Create a responsive HeroSection component that serves as the landing page's focal point.

**Context**: This is the first visual element visitors see. It needs to make a strong first impression while being performant and responsive. Part of EPIC-001 (Foundation MVP).

**Instructions**:

1. **Install Framer Motion** for animations:
   ```bash
   npm install framer-motion
   ```

2. **Create HeroSection component** at `components/hero/HeroSection.tsx`:

   ```tsx
   "use client";

   import { motion } from "framer-motion";

   export default function HeroSection() {
     return (
       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
         {/* Gradient Background */}
         <div className="absolute inset-0 bg-gradient-hero" />

         {/* Content Container */}
         <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col items-center justify-center text-center space-y-8">
             {/* Name and Title */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="space-y-4"
             >
               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                 Chris Nattress
               </h1>
               <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                 Software Engineer & AI Architect
               </p>
             </motion.div>

             {/* CTA Buttons - Will be added in next task */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-4"
             >
               {/* Placeholder for CTA buttons */}
               <div className="h-12 w-48 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center text-white">
                 CTA Buttons Here
               </div>
             </motion.div>

             {/* Scroll Indicator */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
             >
               <p className="text-gray-400 text-sm mb-2">Scroll to Explore</p>
               <svg
                 className="w-6 h-6 mx-auto animate-bounce text-gray-400"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M19 14l-7 7m0 0l-7-7m7 7V3"
                 />
               </svg>
             </motion.div>
           </div>
         </div>
       </section>
     );
   }
   ```

3. **Update `app/page.tsx`** to use the HeroSection:

   ```tsx
   import HeroSection from "@/components/hero/HeroSection";

   export default function Home() {
     return (
       <main>
         <HeroSection />
         {/* Other sections will be added in US-003 */}
       </main>
     );
   }
   ```

4. **Verify the component renders**:
   - Start dev server: `npm run dev`
   - Visit http://localhost:3000
   - Should see hero section with gradient, name, and placeholder

5. **Test responsive design**:
   - Open browser DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on Mobile (375px), Tablet (768px), Desktop (1440px)
   - Verify text scales appropriately

---

## Implementation Details

### Component Structure

**File**: `components/hero/HeroSection.tsx`

**Key Features:**
- Uses `"use client"` directive for Framer Motion
- Responsive typography with Tailwind breakpoint classes
- Gradient background from theme configuration
- Flexbox layout for centering content
- Scroll indicator with animated arrow

### Responsive Classes Explained

```tsx
// Heading sizes
text-5xl       // Mobile: 3rem (48px)
sm:text-6xl    // Small screens (640px+): 3.75rem (60px)
lg:text-7xl    // Large screens (1024px+): 4.5rem (72px)

// Button layout
flex-col           // Mobile: Stack vertically
sm:flex-row        // Small screens+: Horizontal layout
```

---

## Verification

**Visual Checks:**
1. ✅ Hero section fills viewport height (100vh)
2. ✅ Gradient background displays (navy to purple)
3. ✅ Name and title centered and readable
4. ✅ Fade-in animation plays on load
5. ✅ Scroll indicator visible at bottom
6. ✅ Arrow bounces smoothly

**Responsive Checks:**
1. ✅ Mobile (375px): Text is readable, no horizontal scroll
2. ✅ Tablet (768px): Layout adjusts appropriately
3. ✅ Desktop (1440px): Proper spacing and alignment

**Technical Checks:**
```bash
# No TypeScript errors
npm run build

# No console errors in browser
# Check DevTools Console tab
```

---

## Expected Outcome

- ✅ HeroSection component created and rendering
- ✅ Gradient background displays correctly
- ✅ Responsive design works on all screen sizes
- ✅ Framer Motion animations smooth and performant
- ✅ Component follows project conventions
- ✅ No TypeScript or runtime errors

---

## Troubleshooting

### Issue: "Cannot find module 'framer-motion'"
**Solution:** Install the package:
```bash
npm install framer-motion
```

### Issue: Animations not working
**Solution:** Ensure component has `"use client"` directive at the top

### Issue: Gradient not showing
**Solution:** Verify `tailwind.config.ts` has `bg-gradient-hero` defined

### Issue: Text not responsive
**Solution:** Check Tailwind breakpoint classes are applied correctly

---

## Commit Message

```
feat(hero): Create responsive HeroSection component

- Add HeroSection component with gradient background
- Implement Framer Motion entrance animations
- Add responsive typography for mobile, tablet, desktop
- Include scroll indicator with bounce animation
- Update homepage to use HeroSection component
```

---

## Next Steps

After completing TASK-006:
1. ✅ Mark TASK-006 as complete
2. ➡️ Proceed to TASK-007: Implement Gradient Background and Typography
3. Continue building out hero section features

---

*Task created: 2025-10-20*
