# Repository Cleanup Analysis

**Analysis Date:** October 21, 2025  
**Purpose:** Identify unused files that can be archived or removed

---

## Executive Summary

This repository contains a Next.js portfolio application with significant documentation, planning materials, and utility scripts. Analysis reveals **~45+ files** that are not directly used by the running application and can be safely moved to a cleanup folder or archived.

---

## 🗂️ Unused Files by Category

### 1. **Extract/Utility Scripts** (Not Used by Application)
These are one-time utility scripts for extracting resume content. They depend on packages not in `package.json`:

- ✅ `extract-resume.js` (582 bytes) - Requires `mammoth` package
- ✅ `extract_pdf.py` (362 bytes) - Requires `PyPDF2` package  
- ✅ `extract_docx.py` (755 bytes) - Requires `python-docx` package

**Recommendation:** Move to `archive/scripts/` folder.

---

### 2. **Documentation & Planning Files** (Not Used by Application)

#### Root Documentation Files:
- ✅ `CLAUDE.md` (5,231 bytes)
- ✅ `DEPLOYMENT.md` (9,459 bytes)
- ✅ `EPIC-002-IMPLEMENTATION.md` (11,130 bytes)
- ✅ `REACT_RECOMMENDATIONS.md` (43,677 bytes)
- ✅ `REPOSITORY-SETUP.md` (7,124 bytes)
- ✅ `TESTING-GUIDE.md` (8,001 bytes)

#### Planning Directory (2 files):
- ✅ `planning/plan.md` (31,909 bytes)
- ✅ `planning/epics-index.md` (27,377 bytes)

#### Backlog Directory (~26 items):
- ✅ `backlog/README.md`
- ✅ `backlog/BACKLOG-OVERVIEW.md`
- ✅ `backlog/COMPLETION-SUMMARY.md`
- ✅ `backlog/epics/` (entire directory with user stories and tasks)

#### Docs Directory:
- ✅ `docs/epics/EPIC-005-quick-wins.md`

#### Knowledge Directory (6 files):
- ✅ `knowledge/CHRIS_NATTRESS_RESUME.docx` (19,229 bytes)
- ✅ `knowledge/CHRIS_NATTRESS_RESUME.pdf` (178,135 bytes)
- ✅ `knowledge/README-GENERATOR.md` (10,744 bytes)
- ✅ `knowledge/README-GUIDELINES.md` (44,567 bytes)
- ✅ `knowledge/context-engineering.md` (7,201 bytes)
- ✅ `knowledge/nextjs-typescript.md` (36,008 bytes)

**Note:** `public/resume.pdf` IS used by the application (download button on homepage).

**Recommendation:** Move to `archive/documentation/` folder.

---

### 3. **Unused Code** (Dead Code)

#### Unused Hook:
- ✅ `lib/hooks/useAnalytics.ts` (125 lines)
  - **Status:** Defined but never imported or used in any component
  - **Dependencies:** Uses `lib/utils/session.ts` (which is also only used by this unused hook)
  - **Related:** `lib/utils/session.ts` is ONLY imported by `useAnalytics.ts`

#### Unused Helper Functions:
In `lib/ai/resume-context.ts`, these exported functions are never imported anywhere:
- ✅ `findRelevantExperience()` (lines 237-244)
- ✅ `getSkillsByCategory()` (lines 249-254)
- ✅ `getAllTechnologies()` (lines 259-262)

**Recommendation:** 
- Delete `lib/hooks/useAnalytics.ts` and `lib/utils/session.ts`
- OR move to `archive/unused-code/` if you plan to implement analytics later
- Remove unused helper functions from `resume-context.ts` or keep them for future use

---

### 4. **IDE/Tool Configuration** (Keep but worth noting)

#### .claude Directory:
- `.claude/README.md`
- `.claude/config.json`
- `.claude/skills/` (directory)

**Recommendation:** Keep these (used by Claude AI IDE integration).

---

## 📊 Summary Statistics

| Category | File Count | Total Size (est.) |
|----------|-----------|-------------------|
| Extract Scripts | 3 | ~2 KB |
| Documentation | ~35+ | ~400+ KB |
| Unused Code | 2 files + 3 functions | ~8 KB |
| **Total** | **~40+ files** | **~410+ KB** |

---

## 🎯 Recommended Actions

### Option 1: Archive Structure (Recommended)
Create an `archive/` directory to preserve history:

```
archive/
├── scripts/
│   ├── extract-resume.js
│   ├── extract_pdf.py
│   └── extract_docx.py
├── documentation/
│   ├── planning/
│   ├── backlog/
│   ├── knowledge/
│   ├── docs/
│   ├── CLAUDE.md
│   ├── DEPLOYMENT.md
│   ├── EPIC-002-IMPLEMENTATION.md
│   ├── REACT_RECOMMENDATIONS.md
│   ├── REPOSITORY-SETUP.md
│   └── TESTING-GUIDE.md
└── unused-code/
    ├── useAnalytics.ts
    └── session.ts
```

### Option 2: Delete Non-Essential Files
If you don't need the historical context:
- Delete extract scripts (can recreate if needed)
- Delete all planning/backlog files (project is complete)
- Delete knowledge base files (info is in the app code)
- Delete unused hooks

### Option 3: Keep Documentation, Clean Code
- Keep all documentation files (they provide context)
- Only remove unused code files
- This is the most conservative approach

---

## ✅ Files Currently Used by Application

### Application Code (Keep):
- `app/` - All files used
- `components/` - All files used
- `lib/ai/resume-context.ts` - Used (but has unused helper functions)
- `lib/contexts/theme-context.tsx` - Used
- `lib/hooks/useChat.ts` - Used
- `lib/supabase/client.ts` - Used
- `lib/utils.ts` - Used
- `public/resume.pdf` - Used (download link)

### Configuration Files (Keep):
- `package.json`, `package-lock.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `components.json` (shadcn/ui config)
- `netlify.toml`
- `.gitignore`
- `.env.local.example`

---

## 🚀 Next Steps

1. **Review this analysis** - Confirm which files you want to keep
2. **Choose an approach** - Archive, delete, or selective cleanup
3. **Create backup** - Commit current state before cleanup
4. **Execute cleanup** - Move or delete files as decided
5. **Update .gitignore** - Add `archive/` if using that approach
6. **Test application** - Ensure nothing breaks after cleanup

---

## ⚠️ Important Notes

- **README.md** - Keep! This is the main project documentation visible on GitHub
- **package.json** - Some extract scripts require packages not listed here (mammoth, PyPDF2, python-docx)
- **Resume files** - The PDF in `public/` is used, but the ones in `knowledge/` are duplicates
- **Analytics** - The `useAnalytics` hook exists but is never used. The admin analytics page (`app/admin/analytics/page.tsx`) fetches data directly from the API without using this hook.

---

*Generated by repository analysis on Oct 21, 2025*
