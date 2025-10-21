# TASK-003: Install and Configure Shadcn/ui

**Task ID:** TASK-003
**User Story:** US-001 - Project Foundation & Setup
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 20 minutes
**Priority:** 🔴 Critical

---

## Task Description

Install and configure Shadcn/ui component library to provide accessible, customizable UI components for the portfolio website.

---

## Agent Prompt

You are setting up the component library for the AI-enhanced portfolio website.

**Goal**: Install Shadcn/ui and add initial components needed for the MVP.

**Context**: Shadcn/ui provides high-quality, accessible React components that we'll use throughout the site. This is part of US-001 (Project Foundation).

**Instructions**:

1. **Initialize Shadcn/ui**:
   ```bash
   npx shadcn@latest init
   ```

   When prompted, choose:
   - Style: **Default**
   - Base color: **Slate**
   - CSS variables: **Yes**

2. **Verify configuration file created**:
   ```bash
   cat components.json
   ```

   Should look like:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "default",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "tailwind.config.ts",
       "css": "app/globals.css",
       "baseColor": "slate",
       "cssVariables": true
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     }
   }
   ```

3. **Install initial components** for MVP:
   ```bash
   npx shadcn@latest add button card input textarea
   ```

   This will create:
   - `components/ui/button.tsx`
   - `components/ui/card.tsx`
   - `components/ui/input.tsx`
   - `components/ui/textarea.tsx`
   - `lib/utils.ts` (utility functions)

4. **Verify component files** were created:
   ```bash
   ls components/ui
   ls lib
   ```

5. **Test a component** in `app/page.tsx`:
   ```tsx
   import { Button } from "@/components/ui/button";
   import { Card } from "@/components/ui/card";

   export default function Home() {
     return (
       <main className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
         <Card className="p-8 bg-white/10 backdrop-blur">
           <h1 className="text-4xl font-bold text-white mb-4">
             Shadcn/ui Configured!
           </h1>
           <Button className="bg-deep-purple hover:bg-deep-purple-700">
             Test Button
           </Button>
         </Card>
       </main>
     );
   }
   ```

6. **Verify in browser**:
   - Visit http://localhost:3000
   - Should see card with button
   - Button should have hover effect
   - Components should be properly styled

---

## Implementation Details

### Directory Structure
```
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── textarea.tsx
lib/
└── utils.ts
```

### Key Files Created

**`lib/utils.ts`** - Utility functions for className merging:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This utility is used by all Shadcn components for className composition.

---

## Verification

**Automated Checks:**
```bash
# Verify components exist
test -f components/ui/button.tsx && echo "✓ Button component exists"
test -f components/ui/card.tsx && echo "✓ Card component exists"
test -f lib/utils.ts && echo "✓ Utils file exists"
```

**Manual Checks:**
1. ✅ Shadcn/ui initialized successfully
2. ✅ components.json configuration file exists
3. ✅ UI components created in components/ui/
4. ✅ Utils file created in lib/utils.ts
5. ✅ Test page displays components correctly
6. ✅ Button hover effect works
7. ✅ No TypeScript errors

---

## Expected Outcome

- ✅ Shadcn/ui installed and configured
- ✅ Initial UI components available (button, card, input, textarea)
- ✅ Utility functions set up
- ✅ Components render correctly in browser
- ✅ No compilation errors

---

## Troubleshooting

### Issue: "Cannot find module '@/components/ui/button'"
**Solution:** Ensure tsconfig.json has paths configured:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Issue: Styles not applying to components
**Solution:** Check that globals.css is imported in app/layout.tsx

### Issue: "clsx is not installed"
**Solution:** Shadcn should auto-install dependencies, but if not:
```bash
npm install clsx tailwind-merge
```

---

## Commit Message

```
feat(ui): Install and configure Shadcn/ui component library

- Initialize Shadcn/ui with default style and slate color
- Add initial components: button, card, input, textarea
- Create lib/utils.ts for className utilities
- Configure components.json for project structure
```

---

*Task created: 2025-10-20*
