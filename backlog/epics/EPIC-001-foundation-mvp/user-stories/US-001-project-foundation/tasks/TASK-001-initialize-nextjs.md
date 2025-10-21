# TASK-001: Initialize Next.js 15 Project with TypeScript

**Task ID:** TASK-001
**User Story:** US-001 - Project Foundation & Setup
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 30 minutes
**Priority:** 🔴 Critical

---

## Task Description

Initialize a new Next.js 15 project with TypeScript support, App Router, and configure it for the AI-enhanced portfolio website.

---

## Agent Prompt

You are setting up the foundation for an AI-enhanced portfolio website.

**Goal**: Initialize a Next.js 15 project with TypeScript and App Router, and verify it runs successfully.

**Context**: This is the first step in EPIC-001 (Foundation MVP). A properly configured Next.js project is essential for all future development.

**Instructions**:

1. **Navigate to the project directory**:
   ```bash
   cd C:\Users\RED\OneDrive\Documents\github\chris-nattress.com
   ```

2. **Create Next.js 15 app using create-next-app**:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --use-npm --import-alias "@/*"
   ```

   When prompted, select:
   - ✅ TypeScript: Yes
   - ✅ ESLint: Yes
   - ✅ Tailwind CSS: Yes
   - ✅ `src/` directory: No (use `/app` directly)
   - ✅ App Router: Yes
   - ✅ Import alias: @/*

   Note: The `.` installs into the current directory

3. **Verify the project structure** was created:
   ```bash
   ls
   ```

   You should see:
   - `app/` - App Router directory
   - `public/` - Static assets
   - `package.json` - Dependencies
   - `tsconfig.json` - TypeScript config
   - `tailwind.config.ts` - Tailwind config
   - `next.config.ts` - Next.js config

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Configure TypeScript for strict mode**:

   Edit `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "strictNullChecks": true,
       "noImplicitAny": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noImplicitReturns": true,
       // ... keep existing options
     }
   }
   ```

6. **Update Next.js config** for production optimization:

   Edit `next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     reactStrictMode: true,
     poweredByHeader: false,
     compress: true,
   };

   export default nextConfig;
   ```

7. **Start the development server**:
   ```bash
   npm run dev
   ```

8. **Open browser** and navigate to http://localhost:3000
   - Verify the default Next.js welcome page loads
   - Check browser console for errors (should be none)

---

## Implementation Details

### File Locations
- Configuration: `tsconfig.json`, `next.config.ts`
- Entry point: `app/layout.tsx`, `app/page.tsx`
- Dependencies: `package.json`

### Required Dependencies
These should be automatically installed by create-next-app:
- `next@^15.0.3`
- `react@^18.3.0`
- `react-dom@^18.3.0`
- `typescript@^5.6.0`
- `@types/node`
- `@types/react`
- `@types/react-dom`

### TypeScript Configuration Highlights
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Verification

**Automated Tests:**
1. Run `npm run dev` successfully
2. Access http://localhost:3000 without errors
3. No TypeScript compilation errors

**Manual Checks:**
1. ✅ Development server starts on port 3000
2. ✅ Default Next.js page displays in browser
3. ✅ No console errors in browser DevTools
4. ✅ TypeScript strict mode is enabled in tsconfig.json
5. ✅ Hot reload works (change app/page.tsx and see instant update)

**Success Indicators:**
```bash
# Running npm run dev should show:
  ▲ Next.js 15.0.3
  - Local:        http://localhost:3000
  - Ready in 1.2s

# No errors in terminal
# No errors in browser console
```

---

## Expected Outcome

- ✅ Next.js 15 project initialized with TypeScript
- ✅ Development server runs on http://localhost:3000
- ✅ TypeScript strict mode enabled
- ✅ App Router configured
- ✅ Hot module replacement (HMR) working
- ✅ No compilation errors or warnings
- ✅ Default Next.js page visible in browser

---

## Troubleshooting

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install` to install dependencies

### Issue: Port 3000 already in use
**Solution:**
- Kill existing process: `npx kill-port 3000`
- Or use different port: `npm run dev -- -p 3001`

### Issue: TypeScript errors on first build
**Solution:** Ensure all @types packages installed:
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

### Issue: Import alias @/* not working
**Solution:** Check tsconfig.json has:
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## Commit Message

```
feat(init): Initialize Next.js 15 project with TypeScript

- Initialize Next.js 15 with App Router
- Enable TypeScript strict mode
- Configure Next.js for production optimization
- Set up absolute imports with @/* alias
- Verify development server runs successfully
```

---

## Next Steps

After completing this task:
1. ✅ Mark TASK-001 as complete
2. ➡️ Proceed to TASK-002: Configure Tailwind CSS
3. 📝 Document any issues encountered

---

*Task created: 2025-10-20*
*Last updated: 2025-10-20*
