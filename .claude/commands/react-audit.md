You are conducting a comprehensive audit of this Next.js + TypeScript codebase against industry best practices and the guidelines defined in `knowledge/nextjs-typescript.md`.

Your task is to analyze the entire codebase and generate a detailed `REACT_RECOMMENDATIONS.md` file with actionable recommendations.

## Analysis Process

### 1. Read Guidelines
First, read `knowledge/nextjs-typescript.md` to understand all best practices.

### 2. Explore Codebase Structure
Use the Task tool with subagent_type=Explore to systematically discover:
- All React components in `app/`, `components/`, and subdirectories
- TypeScript configuration and type definitions
- API routes and data fetching patterns
- Custom hooks and utilities
- State management implementations

### 3. Analyze Against Best Practices

For each category, evaluate:

**Component Architecture:**
- Server vs Client component usage (`'use client'` directives)
- Props interface typing (proper TypeScript interfaces)
- Component composition patterns
- File naming conventions (PascalCase for components)

**TypeScript Quality:**
- Presence of `any` types (should be avoided)
- Return type annotations on functions
- Type safety in API routes and data fetching
- Proper use of generics and utility types

**State Management:**
- useState/useReducer patterns
- Context API implementation and typing
- Custom hooks (proper naming with `use` prefix)

**Data Fetching:**
- Server Component data fetching (async components)
- Client-side fetching patterns (fetch, SWR, etc.)
- Error handling in data operations
- API route implementations with validation

**Performance:**
- Image optimization (Next.js Image component usage)
- Dynamic imports for code splitting
- Memoization (useMemo, useCallback, React.memo)
- Lazy loading patterns

**Project Structure:**
- Directory organization clarity
- File colocation
- Path alias usage (@/*)
- Separation of concerns (components, services, utilities)

**Security:**
- Environment variable handling
- Input validation (Zod or similar)
- API route security
- Error messages (no sensitive data exposure)

### 4. Document Findings

Create `REACT_RECOMMENDATIONS.md` with this structure:

```markdown
# React/Next.js Codebase Audit Report

**Generated:** [Date]
**Next.js Version:** [Version from package.json]
**TypeScript:** Strict mode [enabled/disabled]

---

## Executive Summary

[2-3 paragraph overview of code quality]

**Overall Assessment:** [Excellent/Good/Needs Improvement/Critical Issues]

**Quick Stats:**
- Components Analyzed: X
- 🚨 Critical Issues: X
- ⚠️  High Priority: X
- 📋 Medium Priority: X
- 💡 Low Priority: X

---

## 1. Component Architecture

### ✅ What's Working Well
- [Strength 1]
- [Strength 2]

### ⚠️ Issues & Recommendations

#### [Issue Title] - 🚨 Critical / ⚠️ High / 📋 Medium / 💡 Low

**Location:** `path/to/file.tsx:123-145`

**Problem:**
[Clear description of the issue]

**Current Code:**
```typescript
// Problematic code example
```

**Recommended:**
```typescript
// Fixed code example
```

**Why It Matters:**
[Impact on performance/maintainability/type safety]

**Effort:** [Low/Medium/High]

[Repeat for each issue]

---

## 2. TypeScript Type Safety

[Same structure]

---

## 3. State Management

[Same structure]

---

## 4. Data Fetching & APIs

[Same structure]

---

## 5. Performance Optimization

[Same structure]

---

## 6. Code Organization

[Same structure]

---

## 7. Security & Best Practices

[Same structure]

---

## Priority Matrix

### 🚨 Critical - Fix Immediately
1. [Issue] - `file:line` - [Brief description]

### ⚠️ High Priority - This Week
1. [Issue] - `file:line` - [Brief description]

### 📋 Medium Priority - This Sprint
1. [Issue] - `file:line` - [Brief description]

### 💡 Low Priority - Future Enhancements
1. [Issue] - `file:line` - [Brief description]

---

## Quick Wins (< 30 minutes each)

1. **[Quick Win Title]**
   - What: [Description]
   - Where: `file:line`
   - How: [Simple implementation steps]
   - Benefit: [Impact]

---

## Implementation Roadmap

### Week 1: Critical Fixes
- [ ] [Task 1]
- [ ] [Task 2]

### Week 2-3: High Priority
- [ ] [Task 1]
- [ ] [Task 2]

### Month 2: Medium Priority
- [ ] [Task 1]

---

## Code Quality Checklist

Use for all future development:

**TypeScript:**
- [ ] No `any` types without justification
- [ ] All function parameters and returns typed
- [ ] Props interfaces defined for all components
- [ ] Proper error type handling in try-catch

**Components:**
- [ ] Server/Client components correctly designated
- [ ] Components under 250 lines
- [ ] Reusable logic extracted to hooks
- [ ] Proper use of React.memo when needed

**Performance:**
- [ ] Images use next/image
- [ ] Heavy components dynamically imported
- [ ] Expensive calculations memoized
- [ ] No unnecessary re-renders

**Data & APIs:**
- [ ] API routes validate input
- [ ] Proper error handling in data fetching
- [ ] Type-safe API responses
- [ ] Rate limiting where appropriate

**Security:**
- [ ] Env variables properly typed and used
- [ ] User input sanitized
- [ ] No sensitive data in client code
- [ ] CORS configured correctly

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Project Guidelines](knowledge/nextjs-typescript.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Next Review:** Re-run audit in 4 weeks after implementing critical fixes.
```

## Execution Guidelines

1. **Be thorough** - Analyze ALL components and files, not just a sample
2. **Be specific** - Always include exact file paths and line numbers
3. **Be practical** - Provide concrete, copy-paste-ready code examples
4. **Be prioritized** - Use severity levels consistently
5. **Be constructive** - Frame as opportunities for improvement
6. **Be contextual** - Consider this project uses Claude AI, Supabase, Netlify

## After Generating Report

1. Write the `REACT_RECOMMENDATIONS.md` file
2. Summarize the top 3-5 critical findings
3. Recommend which issue to tackle first based on effort vs impact
4. Offer to implement the highest priority fix

Begin the comprehensive audit now.
