# Project Backlog

> Backlog for the AI-Enhanced Portfolio Website

**Last Updated**: October 22, 2025

## 📍 Start Here

**New to this project?** Check the **[epics-index.md](./epics-index.md)** for project status and overview!

## 🗂️ Directory Structure

```
backlog/
├── epics-index.md               ⭐ Project status & epic tracking
├── README.md                     📍 You are here
├── overview.md                   📋 Project overview
├── project-plan.md               📅 Implementation plan
└── epics/
    ├── EPIC-004-advanced-ai/                 🟡 Phase 4 - In Progress (31% complete)
    │   └── epic.md
    └── EPIC-005-polish-innovation/           ⏸️ Phase 5 - Pending
        └── epic.md
```

**Note**: Completed epics (EPIC-001, EPIC-002, EPIC-003) have been archived after successful implementation.

## 🚀 Quick Start

**Current Focus**: Complete EPIC-004 (Advanced AI Features)

1. **Review Status**: [epics-index.md](./epics-index.md) - See what's done and what's next
2. **Read Epic**: [EPIC-004](./epics/EPIC-004-advanced-ai/epic.md)
3. **Follow Git Workflow**: See below for branching strategy
4. **Start Working**: Implement remaining user stories (US-014, US-015, US-016)

## 🌲 Git Workflow for Epics

**IMPORTANT**: Each epic must be developed in its own feature branch and manually tested before merging.

### Before Starting Each Epic:

1. **Create Epic Branch** from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b epic-004-advanced-ai
   ```

2. **Branch Naming Convention**:
   - Format: `epic-{number}-{short-name}`
   - Examples:
     - `epic-004-advanced-ai`
     - `epic-005-polish-innovation`
     - `epic-006-critical-issues`

3. **All Epic Work Goes in This Branch**:
   - All user stories for the epic
   - All tasks and subtasks
   - All commits related to the epic
   - Bug fixes discovered during epic work

### During Epic Development:

```bash
# Regular commits as you work
git add .
git commit -m "feat(US-014): Implement dynamic resume regenerator"

# Push epic branch to remote (for backup/collaboration)
git push origin epic-004-advanced-ai
```

### After Epic Completion:

1. **Manual Testing Checklist**:
   - [ ] All user stories completed
   - [ ] All acceptance criteria met
   - [ ] Manual testing in browser (desktop + mobile)
   - [ ] No console errors
   - [ ] All features working as expected
   - [ ] Performance tested
   - [ ] Accessibility tested

2. **Merge Epic Branch**:
   ```bash
   # Switch to main and pull latest
   git checkout main
   git pull origin main

   # Merge epic branch (manual merge, NOT via PR)
   git merge epic-004-advanced-ai

   # Push to main
   git push origin main

   # Optional: Delete local epic branch after successful merge
   git branch -d epic-004-advanced-ai
   ```

3. **Update Documentation**:
   - Mark epic as complete in `epics-index.md`
   - Archive epic files if needed
   - Update project status

### Example Epic Workflow:

```bash
# Starting EPIC-004
git checkout main
git checkout -b epic-004-advanced-ai

# Work on US-014 (Resume Regenerator)
# ... make changes ...
git add .
git commit -m "feat(US-014): Add resume regenerator API endpoint"
git commit -m "feat(US-014): Create resume regenerator UI component"
git commit -m "feat(US-014): Add role type selector and state management"

# Work on US-015 (Project Deep Dives)
git commit -m "feat(US-015): Add 'Ask AI' button to project cards"
git commit -m "feat(US-015): Implement project explanation API"

# Work on US-016 (Smart Contact Form)
git commit -m "feat(US-016): Add AI suggestions to contact form"
git commit -m "feat(US-016): Integrate email delivery service"

# Push branch for backup
git push origin epic-004-advanced-ai

# After all user stories complete and manually tested:
git checkout main
git pull origin main
git merge epic-004-advanced-ai --no-ff  # Creates merge commit
git commit -m "Merge EPIC-004: Advanced AI Features - Complete (32/32 story points)"
git push origin main
```

### Why This Workflow?

- ✅ **Isolation**: Each epic's work is isolated from main
- ✅ **Manual Testing**: Full testing before merge ensures quality
- ✅ **Clean History**: Clear epic boundaries in git history
- ✅ **Rollback Safety**: Easy to revert an entire epic if needed
- ✅ **Collaboration Ready**: Epic branches can be shared/reviewed before merge

## ✅ Completed Epics

**Total Progress**: 91/159 story points (57% complete)

### Phase 1: Foundation MVP ✅ COMPLETE (28 points)
- ✅ Project Foundation & Setup
- ✅ Hero Section & Landing Page
- ✅ Core Content Sections (About, Experience, Skills, Contact)
- ✅ Netlify Deployment Pipeline
- [View commits](https://github.com/chris-nattress/chris-nattress/commit/15f37f6)

### Phase 2: AI Integration ✅ COMPLETE (32 points)
- ✅ Supabase Database Setup
- ✅ Claude AI Chatbot Integration
- ✅ AI Chat Widget UI
- ✅ Analytics & Visitor Tracking
- [View commits](https://github.com/chris-nattress/chris-nattress/commit/a4836d5)

### Phase 3: Interactive Features ✅ COMPLETE (31 points)
- ✅ Interactive Career Timeline
- ✅ Projects Showcase Grid
- ✅ GitHub Live Integration
- ✅ Enhanced Page Animations
- [View commits](https://github.com/chris-nattress/chris-nattress/commit/1efab00)

### Supplemental Work ✅ COMPLETE
- ✅ EPIC-005 Quick Wins (6 user stories) - Performance & Type Safety
- ✅ EPIC-006 Critical Issues (4/5 user stories) - Security improvements
  - Zod input validation
  - Return type annotations
  - Server component refactor
  - CSRF protection

## 🎯 Remaining Work

### 🟡 Phase 4: Advanced AI Features (IN PROGRESS - 31% complete)

**Status**: 1/4 user stories complete | [View EPIC-004](./epics/EPIC-004-advanced-ai/epic.md)

**Completed**:
- ✅ US-013: Job Fit Analyzer (10 points)

**Remaining**:
- ⏸️ US-014: Dynamic Resume Regenerator (8 points)
- ⏸️ US-015: AI Project Deep Dives (7 points)
- ⏸️ US-016: Smart Contact Form (7 points)

**Estimated Time**: 11-15 hours

### ⏸️ Phase 5: Polish & Innovation (PENDING)

**Status**: Not started | [View EPIC-005](./epics/EPIC-005-polish-innovation/epic.md)

**User Stories**:
- ⏸️ US-017: 3D Tech Stack Visualization (10 points)
- ⏸️ US-018: Advanced Visual Effects (8 points)
- ⏸️ US-019: Easter Eggs & Unique Features (5 points)
- ⏸️ US-020: Performance Optimization (8 points)
- ⏸️ US-021: SEO & Accessibility (5 points)

**Estimated Time**: 14-19 hours

### 🔧 Remaining EPIC-006 Work

- ⏸️ US-006.5: Persistent Rate Limiting with Redis (4-5 hours)

---

## 📋 Recommended Next Steps

1. **Create epic branch** for EPIC-004:
   ```bash
   git checkout main
   git checkout -b epic-004-advanced-ai
   ```

2. **Implement US-014** (Resume Regenerator)
3. **Implement US-015** (Project Deep Dives)
4. **Implement US-016** (Smart Contact Form)
5. **Manual testing** of all Phase 4 features
6. **Merge epic branch** to main after testing
7. **Begin EPIC-005** for production launch

## 📚 Key Documents

| Document | Purpose |
|----------|---------|
| [epics-index.md](./epics-index.md) | Project status & epic tracking |
| [overview.md](./overview.md) | Project overview |
| [project-plan.md](./project-plan.md) | Implementation plan |
| [EPIC-004](./epics/EPIC-004-advanced-ai/epic.md) | Current work (Advanced AI) |
| [EPIC-005](./epics/EPIC-005-polish-innovation/epic.md) | Next phase (Polish & Innovation) |
| [CLAUDE.md](../../CLAUDE.md) | Project setup & configuration guide |

## 💡 Development Tips

**Git Workflow**:
- Always create an epic branch before starting work
- Commit frequently with clear messages
- Manual test all features before merging
- Keep epic branches focused on single epic scope

**Code Quality**:
- TypeScript strict mode is enabled - all code must be type-safe
- Run `npm run build` before merging to catch errors
- Test on multiple browsers and devices
- Follow existing code patterns and conventions

**AI Features**:
- Test all AI endpoints thoroughly
- Monitor API costs and usage
- Implement proper error handling
- Cache responses where appropriate

**Documentation**:
- Update `epics-index.md` when epics complete
- Keep commit messages descriptive
- Document any new environment variables
- Update CLAUDE.md if setup changes

---

**Current Status**: 60% complete | **Next Epic**: EPIC-004 (Advanced AI Features) | **Remaining**: ~28-37 hours
