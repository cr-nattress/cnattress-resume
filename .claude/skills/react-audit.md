# React/Next.js Best Practices Audit

You are conducting a comprehensive audit of this Next.js + TypeScript codebase against industry best practices and the guidelines defined in `knowledge/nextjs-typescript.md`.

## Your Task

Analyze the entire codebase and generate a detailed `REACT_RECOMMENDATIONS.md` file with actionable recommendations for improving code quality, performance, type safety, and adherence to Next.js best practices.

## Analysis Steps

### 1. Read the Guidelines
First, read `knowledge/nextjs-typescript.md` to understand the complete set of best practices you'll be auditing against.

### 2. Explore the Codebase
Systematically analyze:

**Component Architecture:**
- All React components in `app/`, `components/`, and subdirectories
- Server vs Client component usage (proper `'use client'` directives)
- Component patterns (functional components, props typing, composition)
- File naming conventions (PascalCase for components, proper extensions)

**TypeScript Quality:**
- Type definitions in `types/` or inline interfaces
- Use of `any` (should be avoided)
- Proper return type annotations
- Interface vs Type usage
- Generic type usage

**State Management:**
- Local state with useState/useReducer
- Context API usage (proper typing, error handling)
- Custom hooks implementation and naming

**Data Fetching:**
- Server Component data fetching patterns
- Client-side fetching (SWR, React Query, or fetch)
- API route implementations
- Error handling in data fetching

**Performance:**
- Image optimization (Next.js Image component)
- Dynamic imports usage
- Memoization (useMemo, useCallback, React.memo)
- Bundle size considerations

**API Routes:**
- Proper HTTP method handlers (GET, POST, PUT, DELETE)
- Input validation (Zod or similar)
- Error handling and status codes
- Type safety in routes

**Project Structure:**
- Directory organization (feature-based vs type-based)
- File colocation
- Path alias usage (@/* imports)
- Separation of concerns

**Code Organization:**
- Service layer patterns
- Utility functions organization
- Constants management
- Custom hooks extraction

**Security:**
- Environment variable usage
- Input validation and sanitization
- CSRF protection considerations
- Proper error message handling (no sensitive data leaks)

### 3. Document Findings
For each category, document:

**✅ Strengths:** What the codebase does well
**⚠️ Issues:** Problems that need attention (with severity: Critical/High/Medium/Low)
**📝 Recommendations:** Specific, actionable improvements with code examples
**📍 Locations:** File paths and line numbers for each issue

### 4. Generate Recommendations File

Create `REACT_RECOMMENDATIONS.md` with this structure:

```markdown
# React/Next.js Codebase Audit - Recommendations

**Audit Date:** [Current Date]
**Next.js Version:** [Detected version]
**TypeScript Version:** [Detected version]

## Executive Summary

[Brief overview of overall code quality, major strengths, and critical issues]

**Overall Score:** [X/10]

**Key Metrics:**
- Total Components Analyzed: [N]
- Critical Issues: [N]
- High Priority Issues: [N]
- Medium Priority Issues: [N]
- Low Priority Issues: [N]

---

## 1. Component Architecture

### ✅ Strengths
[List what's done well]

### ⚠️ Issues Found

#### [Issue Title] - [Severity: Critical/High/Medium/Low]
**Location:** `path/to/file.tsx:123`
**Description:** [What's wrong and why it matters]
**Current Code:**
```typescript
[Example of problematic code]
```
**Recommended Fix:**
```typescript
[Example of corrected code]
```
**Impact:** [Performance/Type Safety/Maintainability/etc.]

[Repeat for each issue]

---

## 2. TypeScript Quality

[Same structure as above]

---

## 3. State Management

[Same structure as above]

---

## 4. Data Fetching & API Routes

[Same structure as above]

---

## 5. Performance Optimization

[Same structure as above]

---

## 6. Project Structure & Organization

[Same structure as above]

---

## 7. Security Considerations

[Same structure as above]

---

## 8. Testing Coverage

[Assess test coverage and quality]

---

## Priority Action Items

### 🚨 Critical (Fix Immediately)
1. [Issue with link to section]
2. [Issue with link to section]

### ⚠️ High Priority (Fix This Week)
1. [Issue with link to section]
2. [Issue with link to section]

### 📋 Medium Priority (Fix This Sprint)
1. [Issue with link to section]
2. [Issue with link to section]

### 💡 Low Priority (Future Improvement)
1. [Issue with link to section]
2. [Issue with link to section]

---

## Quick Wins

[List of easy improvements that provide immediate value]

1. **[Quick Win Title]** - [Estimated time: Xm]
   - Description and benefit
   - Implementation hint

---

## Long-term Improvements

[Strategic recommendations for major refactoring or architectural changes]

---

## Best Practice Checklist

Use this checklist for future development:

- [ ] All components have proper TypeScript interfaces for props
- [ ] Server/Client components are correctly designated
- [ ] No use of `any` type without justification
- [ ] Async operations have proper error handling
- [ ] Images use Next.js Image component
- [ ] API routes validate input data
- [ ] Environment variables are properly typed
- [ ] Custom hooks follow naming conventions (use*)
- [ ] Components are under 250 lines when possible
- [ ] Reusable logic is extracted into hooks/utilities
- [ ] Tests exist for critical paths
- [ ] Accessibility considerations in interactive elements

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Project Guidelines](knowledge/nextjs-typescript.md)

---

**Next Review:** Schedule follow-up audit in 2-4 weeks after implementing critical fixes.
```

## Important Guidelines

- **Be Specific:** Always include file paths, line numbers, and concrete code examples
- **Be Constructive:** Frame issues as opportunities for improvement
- **Prioritize:** Use severity levels to help developers focus on what matters most
- **Be Thorough:** Analyze all relevant files, don't just sample
- **Be Practical:** Recommendations should be actionable with clear implementation steps
- **Consider Context:** The project uses Anthropic Claude AI, Supabase, and targets Netlify deployment
- **Check Consistency:** Look for pattern inconsistencies across similar components

## After Generation

1. Write the `REACT_RECOMMENDATIONS.md` file to the repository root
2. Provide a summary of the top 3-5 most critical findings
3. Suggest which issue to tackle first based on impact and effort

Begin the audit now.
