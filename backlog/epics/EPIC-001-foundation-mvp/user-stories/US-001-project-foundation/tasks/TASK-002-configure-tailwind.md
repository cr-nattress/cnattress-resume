# TASK-002: Configure Tailwind CSS and Custom Theme

**Task ID:** TASK-002
**User Story:** US-001 - Project Foundation & Setup
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 20 minutes
**Priority:** 🔴 Critical

---

## Task Description

Configure Tailwind CSS with a custom color palette featuring navy to deep purple gradients for the portfolio website's visual theme.

---

## Agent Prompt

You are configuring the visual design system for the AI-enhanced portfolio website.

**Goal**: Set up Tailwind CSS with custom theme colors and configuration optimized for the portfolio design.

**Context**: This is part of US-001 (Project Foundation). The custom theme will be used throughout the site for consistent branding.

**Instructions**:

1. **Verify Tailwind is installed** (should be from create-next-app):
   ```bash
   npm list tailwindcss
   ```

2. **Update `tailwind.config.ts`** with custom theme:

   Replace the contents with:
   ```typescript
   import type { Config } from "tailwindcss";

   const config: Config = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx,mdx}",
       "./components/**/*.{js,ts,jsx,tsx,mdx}",
       "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
       extend: {
         colors: {
           // Custom brand colors
           'navy': {
             DEFAULT: '#0f172a',
             50: '#f8fafc',
             100: '#f1f5f9',
             200: '#e2e8f0',
             300: '#cbd5e1',
             400: '#94a3b8',
             500: '#64748b',
             600: '#475569',
             700: '#334155',
             800: '#1e293b',
             900: '#0f172a',
             950: '#020617',
           },
           'deep-purple': {
             DEFAULT: '#4c1d95',
             50: '#faf5ff',
             100: '#f3e8ff',
             200: '#e9d5ff',
             300: '#d8b4fe',
             400: '#c084fc',
             500: '#a855f7',
             600: '#9333ea',
             700: '#7e22ce',
             800: '#6b21a8',
             900: '#581c87',
             950: '#4c1d95',
           },
         },
         backgroundImage: {
           'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
           'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #4c1d95 100%)',
         },
         animation: {
           'fade-in': 'fadeIn 0.6s ease-in-out',
           'slide-up': 'slideUp 0.5s ease-out',
         },
         keyframes: {
           fadeIn: {
             '0%': { opacity: '0' },
             '100%': { opacity: '1' },
           },
           slideUp: {
             '0%': { transform: 'translateY(20px)', opacity: '0' },
             '100%': { transform: 'translateY(0)', opacity: '1' },
           },
         },
       },
     },
     plugins: [],
   };

   export default config;
   ```

3. **Update global styles** in `app/globals.css`:

   Replace with:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
     }

     body {
       @apply bg-background text-foreground;
       font-feature-settings: "rlig" 1, "calt" 1;
     }
   }

   @layer components {
     .gradient-text {
       @apply bg-clip-text text-transparent bg-gradient-to-r from-deep-purple-400 to-navy-400;
     }
   }
   ```

4. **Test the configuration**:
   - Start dev server: `npm run dev`
   - Create a test component in `app/page.tsx`:
   ```tsx
   export default function Home() {
     return (
       <main className="min-h-screen bg-gradient-hero flex items-center justify-center">
         <h1 className="text-5xl font-bold gradient-text">
           Tailwind Configured!
         </h1>
       </main>
     );
   }
   ```

5. **Verify in browser**:
   - Visit http://localhost:3000
   - Should see gradient background and gradient text
   - Check browser DevTools that Tailwind classes are applied

---

## Verification

**Success Indicators:**
- ✅ Tailwind CSS compiles without errors
- ✅ Custom colors (navy, deep-purple) are available
- ✅ Gradient background displays correctly
- ✅ Custom animations work
- ✅ Hot reload updates styles immediately

**Manual Check:**
```bash
# In browser DevTools, inspect element
# Verify computed styles show custom colors
# Example: background should show gradient from navy to purple
```

---

## Expected Outcome

- ✅ Tailwind configured with custom brand colors
- ✅ Gradient utilities available (bg-gradient-hero)
- ✅ Custom animations defined
- ✅ Global styles updated
- ✅ Test page displays gradient correctly

---

## Commit Message

```
feat(tailwind): Configure custom theme with brand colors

- Add navy and deep-purple color palettes
- Define gradient-hero background
- Add custom fade-in and slide-up animations
- Update global CSS with base styles
```

---

*Task created: 2025-10-20*
