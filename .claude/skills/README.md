# Claude Code Skills

Custom skills for automating project workflows.

## Available Skills

### generate-backlog

**Purpose**: Automatically generate a complete, structured backlog from requirements documents.

**Use Case**: You have a feature request, requirements doc, or project brief and want to break it into actionable epics, user stories, and task prompts.

**How to Use**:

```bash
# In Claude Code, type:
/generate-backlog path/to/requirements.md

# Or with specific epic number:
/generate-backlog docs/features/analytics.md --epic-number 010
```

**What It Generates**:

1. **Epic Files** - High-level feature groupings with business value
2. **User Story Files** - Specific capabilities following "As a...I want...so that..." format
3. **Task Files** - Atomic, executable tasks with AI-ready prompts
4. **Directory Structure** - Organized following backlog/epics/EPIC-XXX/user-stories/US-XXX/tasks/ pattern
5. **Overview Document** - Quick start guide with priorities and timelines

**Example Output Structure**:

```
backlog/epics/
└── EPIC-010-analytics-dashboard/
    ├── epic.md
    ├── SUMMARY.md
    └── user-stories/
        ├── US-001-setup-analytics/
        │   ├── story.md
        │   └── tasks/
        │       ├── TASK-001-install-analytics-package.md
        │       ├── TASK-002-configure-tracking.md
        │       └── TASK-003-add-page-view-tracking.md
        └── US-002-create-dashboard/
            ├── story.md
            └── tasks/
                └── [4 task files]
```

**Key Features**:

- **AI-Ready Prompts**: Each task includes a detailed "Agent Prompt" section that can be copy-pasted directly to Claude or other AI assistants
- **Story Points**: Automatic effort estimation using Fibonacci sequence
- **Priority Assignment**: Categorizes work as Critical, Medium, or Low priority
- **Verification Steps**: Includes specific steps to confirm each task is complete
- **Business Value**: Explains WHY each epic matters, not just WHAT to build
- **Success Metrics**: Defines measurable outcomes for each epic

**Best Practices**:

1. **Start with a clear requirements document** - The skill works best with well-defined requirements
2. **Review and refine** - Generated backlog is a starting point; review and adjust story points
3. **Follow execution order** - Overview document suggests optimal sequence
4. **Update as you go** - Mark tasks complete with checkboxes as you work

**Strategy**:

The skill follows this analysis approach:

1. **Analyze** - Understand main goal, key features, dependencies, complexity
2. **Decompose** - Break into epics (4-8 hours each)
3. **Detail** - Create user stories (30min-2hrs each)
4. **Atomize** - Generate tasks (5-30min each)
5. **Structure** - Organize into proper directory hierarchy
6. **Document** - Add overview with quick start guide

## Adding New Skills

To create a new skill:

1. Create a new `.md` file in `.claude/skills/`
2. Follow the format:
   ```markdown
   # Skill: Skill Name

   Description of what the skill does

   ## Usage
   [Usage instructions]

   ## What This Skill Does
   [Detailed explanation]

   ## Skill Execution Steps
   [Step-by-step process]
   ```

3. Document the skill in this README

## Skill Guidelines

When creating skills:

- **Be specific** about what the skill does
- **Include examples** of input and output
- **Document prerequisites** (tools, setup, etc.)
- **Provide clear instructions** for execution
- **Add verification steps** to confirm success
- **Consider error cases** and document them

## Questions?

See the main project README or check individual skill documentation files.
