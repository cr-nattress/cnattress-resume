# Skill: Generate Backlog from Requirements

Generate a complete backlog with epics, user stories, and task prompts from a requirements document.

## Usage

```bash
# Option 1: Direct path to requirements document
generate-backlog path/to/requirements.md

# Option 2: Specify epic number
generate-backlog path/to/requirements.md --epic-number 009
```

## What This Skill Does

This skill automatically analyzes a requirements or feature document and generates a complete, structured backlog including:

1. **Epic files** with business value, acceptance criteria, and ROI projections
2. **User story files** with acceptance criteria and story points
3. **Task files** with detailed agent prompts for AI execution
4. **Directory structure** following best practices
5. **Summary/overview document** with quick start guide

## Analysis Strategy

### Phase 1: Document Analysis

**Read and understand the requirements document:**

1. **Identify the main goal** - What is the overarching objective?
2. **Extract key features** - What are the distinct features or capabilities needed?
3. **Understand dependencies** - What work depends on other work?
4. **Assess complexity** - How long will each piece take?
5. **Determine business value** - What's the ROI or impact?

### Phase 2: Epic Decomposition

**Break requirements into epics (major features/initiatives):**

Rules for Epic creation:
- Each epic = 1 major feature or capability
- Target: 4-8 hours of work per epic
- Should deliver standalone business value
- Can be prioritized independently

**Epic components to generate:**
```
- Epic ID (EPIC-XXX)
- Title (clear, action-oriented)
- Business Value (why this matters)
- Current State vs Target State
- Technical Approach (high-level how)
- User Stories (3-9 stories per epic)
- Acceptance Criteria (measurable outcomes)
- Risks and Mitigations
- Success Metrics
- Estimated Story Points (sum of user stories)
```

### Phase 3: User Story Creation

**Break each epic into user stories (features/capabilities):**

Rules for User Story creation:
- Each story = 1 specific capability or improvement
- Target: 30 minutes to 2 hours of work per story
- Follow format: "As a [who], I want [what], so that [why]"
- Assign story points (1, 2, 3, 5, 8 using Fibonacci)

**Story components to generate:**
```
- Story ID (US-XXX)
- Epic reference
- User story statement
- Acceptance Criteria (4-8 specific criteria)
- Story Points (effort estimate)
- Priority (High/Medium/Low)
- Technical Notes (implementation hints)
- Definition of Done
- Tasks (3-6 tasks per story)
```

### Phase 4: Task Prompt Creation

**Break each user story into actionable tasks:**

Rules for Task creation:
- Each task = 1 atomic action
- Target: 5-30 minutes of work per task
- Must be executable by AI or human
- Include verification steps

**Task components to generate:**
```
- Task ID (TASK-XXX)
- User Story reference
- Task Description (what to do)
- Agent Prompt (detailed instructions for AI)
- Commands to Execute (bash/code)
- Verification Steps (how to confirm done)
- Expected Output (what success looks like)
- Estimated Time
```

## Story Point Guidelines

Use Fibonacci sequence for estimation:

- **1 point**: 15-30 minutes, trivial change
  - Update a config value
  - Add a simple alt text
  - Install a package

- **2 points**: 30-60 minutes, straightforward change
  - Update a component with known pattern
  - Write a simple function
  - Configure a service

- **3 points**: 1-2 hours, moderate complexity
  - Build a new component with state
  - Integrate an API
  - Write comprehensive content

- **5 points**: 2-4 hours, significant complexity
  - Design and implement a feature
  - Complex business logic
  - Multi-component integration

- **8 points**: 4-8 hours, high complexity
  - Major architectural change
  - Multiple interconnected features
  - Research + implementation

## Priority Guidelines

**🔴 Critical (High)**:
- Blocks other work
- Urgent business need
- Quick wins with high impact
- Week 1 priorities

**🟡 Medium**:
- Important but not blocking
- Weeks 2-4 work
- Moderate business impact

**🟢 Low**:
- Nice to have
- Future iterations
- Polish and refinement

## Prompt Template Structure

For each task, generate an "Agent Prompt" section that can be directly copy-pasted to an AI coding assistant:

```markdown
## Agent Prompt

You are working on [EPIC-XXX: Epic Title].

**Goal**: [Clear, specific goal]

**Context**: [Why this task matters, what it's part of]

**Instructions**:
1. [Step 1 with specific details]
2. [Step 2 with file paths and code snippets]
3. [Step 3 with expected outcomes]

**Implementation Details**:
- File to modify: `path/to/file.ts`
- Specific changes: [exact changes needed]
- Code example:
\`\`\`typescript
// Example of what to implement
\`\`\`

**Verification**:
1. Run: `npm run dev`
2. Check: [specific behavior to verify]
3. Test: [how to test the change]

**Expected Outcome**: [Specific, measurable result]

**Commit Message**: `type(scope): description`
```

## Directory Structure Template

Generate this structure:

```
backlog/epics/
└── EPIC-XXX-feature-name/
    ├── epic.md                    # Epic overview and details
    ├── SUMMARY.md                 # Quick reference (optional)
    └── user-stories/
        ├── US-001-story-name/
        │   ├── story.md           # User story details
        │   └── tasks/
        │       ├── TASK-001-task-name.md
        │       ├── TASK-002-task-name.md
        │       └── TASK-003-task-name.md
        ├── US-002-story-name/
        │   ├── story.md
        │   └── tasks/
        │       └── [...]
        └── US-003-story-name/
            ├── story.md
            └── tasks/
                └── [...]
```

## Skill Execution Steps

When this skill is invoked:

1. **Read the requirements document** provided by user
2. **Analyze and identify**:
   - Main objective/goal
   - Key features needed
   - Dependencies and order
   - Complexity estimates
   - Business value

3. **Create epics** (typically 1-6 epics):
   - Write epic.md for each
   - Include all required sections
   - Assign priority and story points

4. **Create user stories** for each epic (3-9 stories per epic):
   - Write story.md for each
   - Follow "As a...I want...so that..." format
   - Add acceptance criteria
   - Assign story points

5. **Create tasks** for each user story (3-6 tasks per story):
   - Write TASK-XXX.md for each
   - Include detailed agent prompt
   - Add verification steps
   - Estimate time

6. **Generate overview document** (optional):
   - Create BACKLOG-OVERVIEW.md
   - Include quick start guide
   - Add priority matrix
   - Show file structure
   - Include ROI projections

7. **Create directory structure**:
   - Use proper naming conventions
   - Follow hierarchy: epic → stories → tasks
   - Ensure all files are well-organized

8. **Report completion**:
   - Summary of what was created
   - Total story points
   - Recommended execution order
   - Next steps

## Example Agent Prompt Output

Here's what a task file's agent prompt should look like:

```markdown
# TASK-003: Add Schema Markup to Homepage

**Task ID:** TASK-003
**User Story:** US-002 - Implement Structured Data
**Status:** To Do
**Estimated Time:** 20 minutes

## Task Description

Add JSON-LD schema markup for VacationRental to the homepage to enable rich snippets in Google search results.

## Agent Prompt

You are implementing structured data for the vacation rental website.

**Goal**: Add VacationRental schema markup to enable rich snippets showing rating, price, and amenities in Google search results.

**Context**: This is part of EPIC-004 (SEO Optimization). Schema markup helps search engines understand our property and display enhanced results.

**Instructions**:
1. Open `app/layout.tsx` or create `app/schema.json`
2. Add JSON-LD script with VacationRental schema
3. Include these fields:
   - name: "11 Emmons Road - Crested Butte Vacation Rental"
   - address: Unit 324, 11 Emmons Road, Crested Butte, CO 81224
   - aggregateRating: 4.98 out of 5
   - amenityFeature: ["WiFi", "Kitchen", "Parking", "Ski Storage"]
   - geo: lat/long coordinates

**Implementation**:

File: `app/layout.tsx`

Add this script tag to the <head>:

\`\`\`typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "name": "11 Emmons Road - Ski-In/Ski-Out Crested Butte",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11 Emmons Road, Unit 324",
        "addressLocality": "Crested Butte",
        "addressRegion": "CO",
        "postalCode": "81224"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.98",
        "reviewCount": "127"
      }
    })
  }}
/>
\`\`\`

**Verification**:
1. Run: `npm run dev`
2. Visit: http://localhost:3000
3. View source and confirm JSON-LD is present
4. Test with: https://search.google.com/test/rich-results
5. Confirm no errors in Rich Results Test

**Expected Outcome**:
- JSON-LD schema present in page source
- Rich Results Test shows "Valid VacationRental"
- No validation errors

**Commit Message**: `feat(seo): Add VacationRental schema markup for rich snippets`
```

## Quality Checklist

Before completing, verify:

- [ ] All epic files have business value clearly stated
- [ ] Each user story follows "As a...I want...so that..." format
- [ ] Story points are assigned to all stories (total shown in epic)
- [ ] Each task has a detailed agent prompt that can be copy-pasted
- [ ] Verification steps are specific and measurable
- [ ] Directory structure follows naming conventions
- [ ] File names use kebab-case
- [ ] Overview document includes quick start guide
- [ ] Dependencies are noted where applicable
- [ ] Success metrics are included
- [ ] Realistic time estimates are provided

## Notes

- **Be specific**: Agent prompts should be executable without clarification
- **Be realistic**: Story points should reflect actual effort
- **Be structured**: Follow the hierarchy: Epic → Story → Task
- **Be business-focused**: Always explain the "why" not just the "what"
- **Be measurable**: Include verification and success criteria

## Example Invocation

```
User: "Generate backlog from requirements document at docs/features/analytics.md"