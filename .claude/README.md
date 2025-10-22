# Claude Code Configuration

This directory contains custom configurations and commands for Claude Code.

## 📁 Directory Structure

```
.claude/
├── commands/          # Custom slash commands
│   └── react-audit.md # React/Next.js best practices audit
├── skills/            # Reusable analysis skills
│   └── react-audit.md # Audit skill (alternate format)
├── config.json        # Command metadata and descriptions
└── README.md          # This file
```

## 🚀 Available Commands

### `/react-audit` - React/Next.js Best Practices Audit

**Purpose:** Comprehensive codebase analysis against Next.js + TypeScript best practices from `knowledge/nextjs-typescript.md`

**What it does:**
1. ✅ Reads project guidelines from knowledge base
2. 🔍 Explores entire codebase structure
3. 📊 Analyzes components, TypeScript usage, state management, APIs
4. 📝 Generates detailed `REACT_RECOMMENDATIONS.md` report
5. 🎯 Prioritizes findings by severity (Critical/High/Medium/Low)
6. 💡 Provides actionable fixes with code examples

**How to use:**

```
/react-audit
```

**Output:** Creates `REACT_RECOMMENDATIONS.md` at repository root

**What you'll get:**
- Executive summary with overall code quality assessment
- Category-by-category analysis:
  - Component Architecture
  - TypeScript Type Safety
  - State Management
  - Data Fetching & APIs
  - Performance Optimization
  - Code Organization
  - Security & Best Practices
- Priority matrix (Critical → Low priority)
- Quick wins (< 30 min fixes)
- Implementation roadmap
- Code quality checklist for future development

**When to use:**
- ✅ Before major refactoring
- ✅ After adding significant features
- ✅ During code review preparation
- ✅ When onboarding new team members
- ✅ Quarterly code quality check-ins
- ✅ Before production deployments

**Example output structure:**

```markdown
# React/Next.js Codebase Audit Report

## Executive Summary
Overall Assessment: Good
- Components Analyzed: 25
- 🚨 Critical Issues: 2
- ⚠️  High Priority: 5
- 📋 Medium Priority: 8
- 💡 Low Priority: 12

## 1. Component Architecture
### ⚠️ Issues & Recommendations

#### Missing 'use client' directive - ⚠️ High
Location: `components/ChatWidget.tsx:1`
Problem: Component uses useState but not marked as client component
[... detailed fix with code examples ...]

[... more findings ...]
```

## 🔧 Configuration

### Adding New Commands

1. Create a markdown file in `.claude/commands/`:
   ```bash
   .claude/commands/my-command.md
   ```

2. Write the command prompt (what Claude should do when invoked)

3. Add metadata to `config.json`:
   ```json
   {
     "commands": {
       "my-command": {
         "description": "What this command does"
       }
     }
   }
   ```

4. Restart Claude Code or reload commands

### Command Best Practices

- **Be specific:** Clear, detailed instructions for Claude
- **Include output format:** Specify exactly what should be generated
- **Add examples:** Show expected results
- **Consider context:** Reference project-specific files and patterns
- **Test thoroughly:** Run commands on sample codebases first

## 📚 Knowledge Base Integration

Commands can reference files in `knowledge/` directory:

- `knowledge/nextjs-typescript.md` - Next.js + TypeScript best practices guide
- `CLAUDE.md` - Project-specific instructions and architecture

Commands automatically have access to these files and should reference them for context-aware analysis.

## 🎯 Tips for Effective Audits

1. **Run during low activity** - Comprehensive analysis takes time
2. **Review critically** - Not all suggestions may fit your context
3. **Implement incrementally** - Start with critical, work down priority list
4. **Track progress** - Use generated checklists
5. **Re-audit regularly** - Code quality needs continuous attention

## 🔄 Updating Commands

To modify existing commands:

1. Edit the `.md` file in `.claude/commands/`
2. Optionally update description in `config.json`
3. Reload Claude Code to pick up changes

## 📖 Example Usage Session

```
User: /react-audit

Claude: I'll conduct a comprehensive audit of your Next.js codebase...
[Reads knowledge/nextjs-typescript.md]
[Explores codebase structure]
[Analyzes components, types, APIs...]
[Generates REACT_RECOMMENDATIONS.md]

Summary of top findings:
🚨 Critical: 2 issues found
1. Missing client directive in components/ChatWidget.tsx
2. Unhandled promise rejection in app/api/chat/route.ts

⚠️ High Priority: 5 issues found
[... detailed summary ...]

Would you like me to implement the first critical fix?
```

## 🛠️ Troubleshooting

**Command not found:**
- Ensure `.md` file exists in `.claude/commands/`
- Check `config.json` syntax is valid
- Try restarting Claude Code
- Verify command name matches filename (without .md extension)

**Command runs but produces unexpected results:**
- Review the command prompt in the `.md` file
- Ensure knowledge base files are up to date
- Check if file paths referenced in command are correct

**Command times out:**
- For large codebases, break audit into smaller commands
- Consider increasing timeout limits in Claude Code settings

## 📞 Support

For issues with:
- **Custom commands:** Check `.claude/commands/` file format
- **Claude Code itself:** See https://docs.claude.com/en/docs/claude-code
- **Project-specific issues:** See `CLAUDE.md` in repository root

---

**Created:** 2025-10-21
**Maintained by:** Claude Code automation
**Version:** 1.0.0
