# US-001: Project Foundation & Setup

**Story ID:** US-001
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Priority:** 🔴 Critical
**Story Points:** 8
**Estimated Time:** 2-3 hours

---

## User Story

**As a** developer
**I want** a properly configured Next.js 15 project with TypeScript, Tailwind CSS, and all development tools
**So that** I have a solid foundation to build features efficiently without technical debt

---

## Acceptance Criteria

- [ ] Next.js 15 project initialized with TypeScript strict mode
- [ ] Tailwind CSS configured with custom color palette (navy to deep purple gradient)
- [ ] Shadcn/ui component library installed and configured
- [ ] ESLint and Prettier configured for code quality
- [ ] Git repository initialized with .gitignore properly configured
- [ ] Folder structure created: `/app`, `/components`, `/lib`, `/types`
- [ ] Environment variables template file (`.env.example`) created
- [ ] Development server runs without errors (`npm run dev`)
- [ ] Hot reload works properly for TypeScript and CSS changes
- [ ] Package.json scripts configured (dev, build, start, lint, format)

---

## Technical Notes

### Next.js Configuration
- Use App Router (not Pages Router)
- Enable TypeScript strict mode in tsconfig.json
- Configure absolute imports with `@/` prefix

### Tailwind Configuration
Custom theme colors for gradient:
```javascript
colors: {
  'navy': '#0f172a',
  'deep-purple': '#4c1d95',
}
```

### Shadcn/ui Setup
Initialize with:
```bash
npx shadcn@latest init
```

Select options:
- Style: Default
- Base color: Slate
- CSS variables: Yes

---

## Definition of Done

- [ ] `npm run dev` starts development server successfully
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` shows no errors
- [ ] TypeScript compilation succeeds with no errors
- [ ] Hot reload responds within 1 second to file changes
- [ ] Git repository has initial commit
- [ ] README.md documents setup process
- [ ] All dependencies install without peer dependency warnings

---

## Tasks

This user story contains **5 tasks**:

1. **TASK-001**: Initialize Next.js 15 project with TypeScript
2. **TASK-002**: Configure Tailwind CSS and custom theme
3. **TASK-003**: Install and configure Shadcn/ui
4. **TASK-004**: Set up ESLint, Prettier, and code quality tools
5. **TASK-005**: Create project folder structure and configuration files

---

## Dependencies

**Requires:**
- Node.js 20.x LTS installed
- npm or yarn package manager
- Git installed
- Code editor (VS Code recommended)

**Blocks:**
- US-002 (Hero Section)
- US-003 (Content Sections)
- US-004 (Netlify Deployment)

---

## Verification Steps

After completing all tasks:

1. Run `npm run dev` and verify:
   - Server starts on http://localhost:3000
   - Default Next.js page loads
   - No console errors

2. Make a change to `app/page.tsx` and verify:
   - Hot reload updates the page within 1 second
   - No compilation errors

3. Run `npm run build` and verify:
   - Build completes successfully
   - No TypeScript errors
   - Optimized production bundle created

4. Run `npm run lint` and verify:
   - No linting errors
   - ESLint rules are being applied

---

## Related Files

Files that will be created/modified:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind custom theme
- `next.config.ts` - Next.js configuration
- `eslint.config.js` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `.gitignore` - Git ignore patterns
- `components.json` - Shadcn/ui configuration
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage

---

## Notes

**Important:**
- Use Node.js 20.x LTS (not Node 18 or 22)
- Enable TypeScript strict mode from the start
- Don't install unnecessary dependencies
- Keep the initial setup minimal and focused

**Common Pitfalls:**
- Forgetting to add `.env.local` to .gitignore
- Not enabling TypeScript strict mode
- Installing too many packages upfront
- Not testing hot reload after setup

---

*Story created: 2025-10-20*
*Last updated: 2025-10-20*
