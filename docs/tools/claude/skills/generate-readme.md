# Skill: Generate Outstanding README

**Expert technical writer that creates beautiful, stylish, and unforgettable README.md files following industry best practices from top open-source projects.**

## Purpose

Generate or update a README.md file that is:
- ✨ **Beautiful** - Professional formatting with visual elements
- 🎯 **Eye-catching** - Compelling tagline and value proposition
- 🚀 **Modern** - Follows current best practices and trends
- 💫 **Unforgettable** - Makes users want to try it immediately

## Usage

```bash
# Generate a new README for the current project
/generate-readme

# Update an existing README.md
/generate-readme --update

# Generate with specific focus
/generate-readme --focus "enterprise security"
/generate-readme --focus "developer experience"
/generate-readme --focus "performance benchmarks"
```

## What This Skill Does

This skill analyzes your codebase and generates a comprehensive README.md that follows the structure and formatting of excellent projects like **Express.js**, **FastAPI**, **Fastify**, **NestJS**, **HTTPie**, and **Ghost**.

### Key Capabilities

1. **Intelligent Analysis** - Automatically detects:
   - Project type (web framework, API, library, CLI tool, application)
   - Technology stack and dependencies
   - Core functionality and features
   - Target audience (open-source, internal, enterprise)

2. **Comprehensive Structure** - Includes all essential sections:
   - Compelling header with badges and tagline
   - Quick start guide with minimal example
   - Usage examples with code snippets
   - Feature highlights and architecture overview
   - Documentation links and community resources
   - Contributing guidelines and license

3. **Visual Excellence** - Incorporates:
   - Status badges (CI, version, license, coverage)
   - Code blocks with syntax highlighting
   - Tables for comparisons and features
   - Strategic emoji usage for section headers
   - Placeholder references for screenshots/GIFs

4. **Professional Tone** - Maintains:
   - Friendly but authoritative voice
   - Clear, scannable formatting
   - Active voice with direct instructions
   - Consistent terminology throughout

## Skill Execution Steps

When you invoke this skill, Claude will:

### Phase 1: Repository Analysis (2-3 minutes)

1. **Scan project structure**
   - Read package.json, requirements.txt, or equivalent
   - Identify programming languages and frameworks
   - Check for existing documentation
   - Analyze configuration files

2. **Understand functionality**
   - Review main entry points
   - Examine example code or tests
   - Identify core features and capabilities
   - Determine unique selling points

3. **Detect project context**
   - Check for LICENSE file
   - Look for CONTRIBUTING.md
   - Identify if open-source or internal
   - Find existing community channels

### Phase 2: README Generation (3-5 minutes)

#### 1. Header Section
Generate a compelling header with:

- **Project name** as H1 heading
- **One-line tagline** that captures essence and value
- **Badges** (all placeholders will be marked as TODO):
  ```markdown
  ![Build Status](https://github.com/user/repo/workflows/CI/badge.svg)
  ![Version](https://img.shields.io/npm/v/package-name)
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Coverage](https://img.shields.io/codecov/c/github/user/repo)
  ```
- **Table of Contents** for navigation (if 5+ sections)

#### 2. Project Introduction
Write a clear 2-3 sentence explanation:
- What the project does
- Why it exists (value proposition)
- Who should use it

#### 3. Quick Start / Installation

Provide copy-paste ready instructions:

```markdown
## Quick Start

### Prerequisites
- Node.js 20+ (or appropriate version)
- npm or yarn

### Installation
\`\`\`bash
npm install your-package
\`\`\`

### Hello World Example
\`\`\`javascript
// Minimal working example
const app = require('your-package');

app.start();
\`\`\`

Expected output:
\`\`\`
Server running at http://localhost:3000
\`\`\`
```

#### 4. Usage & Examples

Include 3-5 practical examples with:
- Well-commented code
- Realistic use cases (not foo/bar)
- Expected outputs
- Links to full examples directory

```markdown
## Usage Examples

### Basic Example
\`\`\`javascript
// Description of what this does
const result = doSomething();
\`\`\`

### Advanced Example
\`\`\`javascript
// More complex scenario
\`\`\`

See the [examples directory](./examples) for more.
```

#### 5. Features & Highlights

Create bulleted list (5-10 items):
```markdown
## Features

- 🚀 **High Performance** - Optimized for speed (include benchmark if available)
- 📦 **Zero Dependencies** - Lightweight and self-contained
- 🔒 **Type Safe** - Full TypeScript support
- 🎯 **Developer Friendly** - Intuitive API design
- 📚 **Well Documented** - Comprehensive guides and examples
```

#### 6. Core Concepts / Architecture

Brief explanation of:
- How the project works (high-level)
- Design philosophy or principles
- Key concepts users should understand
- Architecture diagram placeholder (if complex)

#### 7. Documentation & Resources

Link to additional resources:
```markdown
## Documentation

- 📖 [Full Documentation](https://docs.example.com)
- 🎓 [Getting Started Guide](./docs/getting-started.md)
- 📘 [API Reference](./docs/api.md)
- 🎥 [Video Tutorials](https://youtube.com/...)
```

#### 8. Community & Support

Provide support channels:
```markdown
## Community & Support

- 💬 [GitHub Discussions](https://github.com/user/repo/discussions) - Ask questions and share ideas
- 🐛 [GitHub Issues](https://github.com/user/repo/issues) - Report bugs and request features
- 💬 [Discord Server](https://discord.gg/...) - Chat with the community
- 🐦 [Twitter](https://twitter.com/...) - Follow for updates
- 📚 [Stack Overflow](https://stackoverflow.com/questions/tagged/your-tag) - Community Q&A
```

#### 9. Contributing

Warm invitation with guidelines:
```markdown
## Contributing

We love contributions! 🎉

Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Good First Issues
New to the project? Check out our [good first issues](https://github.com/user/repo/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

### Development Setup
\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
npm test
\`\`\`
```

#### 10. Roadmap (Optional)

Include future plans:
```markdown
## Roadmap

See our [project board](https://github.com/user/repo/projects/1) for upcoming features.

Planned improvements:
- [ ] Feature X
- [ ] Performance optimization Y
- [ ] Integration with Z

See [CHANGELOG.md](CHANGELOG.md) for version history.
```

#### 11. License

Clear license statement:
```markdown
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 [Your Name]
```

#### 12. Acknowledgments

Credits and thanks:
```markdown
## Acknowledgments

- Inspired by [Project X](https://github.com/...)
- Built with [Framework Y](https://framework.com)
- Special thanks to [contributors](https://github.com/user/repo/graphs/contributors)

### Sponsors

Support this project:
- [Become a sponsor](https://github.com/sponsors/user)
- [Open Collective](https://opencollective.com/project)
```

### Phase 3: Quality Assurance

Before finalizing, verify:

- ✅ Badge URLs are valid or marked as TODO
- ✅ All code examples have syntax highlighting
- ✅ Installation commands are correct
- ✅ Links are tested or marked as TODO
- ✅ Table of Contents anchors match headings
- ✅ No broken markdown formatting
- ✅ Spelling and grammar checked
- ✅ Tone is consistent throughout
- ✅ Mobile-friendly (no excessively wide content)
- ✅ Appropriate length (not too brief, not overwhelming)

## Formatting Rules

### Visual Elements

1. **Badges** - Use shields.io format:
   ```markdown
   ![Build](https://img.shields.io/github/workflow/status/user/repo/CI)
   ![Version](https://img.shields.io/npm/v/package-name)
   ![License](https://img.shields.io/badge/license-MIT-blue)
   ```

2. **Code Fences** - Always include language hint:
   ```markdown
   \`\`\`javascript
   const example = true;
   \`\`\`

   \`\`\`bash
   npm install package
   \`\`\`

   \`\`\`typescript
   interface Config { }
   \`\`\`
   ```

3. **Tables** - For comparisons and structured data:
   ```markdown
   | Feature | This Project | Alternative |
   |---------|--------------|-------------|
   | Speed   | Fast         | Slow        |
   | Size    | Small        | Large       |
   ```

4. **Emoji** - Use sparingly (max 5-7 total):
   - 🚀 for performance/deployment
   - 📦 for installation/packages
   - 🔒 for security
   - 📚 for documentation
   - 💡 for features/ideas
   - 🐛 for bugs
   - ✅ for completed/verified

5. **Inline Code** - For filenames, commands, variables:
   ```markdown
   Edit the `package.json` file
   Run `npm install`
   Set the `API_KEY` environment variable
   ```

6. **Horizontal Rules** - Separate major sections:
   ```markdown
   ---
   ```

### Content Style

- **Active voice**: "Run the server" not "The server is run"
- **Second person**: "You can install..." not "One can install..."
- **Short paragraphs**: Maximum 3-5 sentences
- **Scannable**: Heavy use of bullets and headings
- **Consistent terms**: Same names throughout
- **Professional yet friendly**: Approachable authority
- **Fact-based**: Back claims with data or links

### Link Guidelines

- **Descriptive text**: "[API Documentation](url)" not "[Click here](url)"
- **Specific sections**: Link to exact page or heading
- **Absolute URLs**: Full URLs for external resources
- **Relative paths**: For internal files (./docs/guide.md)

## Special Considerations

### For Open-Source Projects

- Emphasize community and contribution
- Include Code of Conduct reference
- Add contributor recognition
- Provide issue/PR templates info
- Include security policy (SECURITY.md)

### For Libraries/Frameworks

- Show API examples prominently
- Include TypeScript types
- Demonstrate configuration options
- Provide migration guides
- Show platform compatibility

### For CLI Tools

- Show command syntax clearly
- Include flag/option explanations
- Describe GIF demonstration locations
- Include shell completion instructions

### For APIs/Services

- Show endpoint examples with curl
- Include authentication setup
- Provide rate limiting info
- Link to API playground
- Show response examples (JSON/XML)

## Example Quality Benchmarks

Your generated README should match the quality of:

- **Express.js** - Clear philosophy, minimal quick-start, extensive community links
- **FastAPI** - Outstanding code examples, benchmark tables, auto-docs showcase
- **Fastify** - Performance-focused, clean structure, benchmark comparisons
- **NestJS** - Strong branding, multi-language support, clear architecture
- **HTTPie** - Excellent CLI examples, visual GIFs, community-focused
- **Ghost** - Beautiful banner, clear use case, professional presentation

## Output Requirements

The generated README must:

1. **Immediately communicate value** - First 3 seconds clarity
2. **Zero to running in <5 minutes** - Quick start works
3. **Showcase best features** - Without overwhelming
4. **Guide next steps clearly** - Docs, examples, community
5. **Encourage contribution** - For open-source projects
6. **Look professional** - Proper formatting and structure
7. **Scale well** - Mobile to desktop views
8. **Maintain consistency** - Tone, style, terminology

## Validation Checklist

After generation, confirm:

- [ ] Project name and tagline are compelling
- [ ] All badges are valid or marked TODO
- [ ] Quick start example actually works
- [ ] Code blocks have language hints
- [ ] Links point to real resources or marked TODO
- [ ] Table of Contents anchors match headings
- [ ] No markdown formatting errors
- [ ] Spelling and grammar correct
- [ ] Consistent tone throughout
- [ ] Mobile-friendly formatting
- [ ] Appropriate length for project scope

## Execution Flow

When this skill runs:

1. **Analyze** (30 seconds)
   - Scan repository structure
   - Identify project type and tech stack
   - Detect existing docs and conventions

2. **Outline** (30 seconds)
   - Determine which sections to include
   - Identify unique selling points
   - Plan structure and flow

3. **Generate** (3-4 minutes)
   - Write each section following best practices
   - Add code examples and snippets
   - Insert badges and visual elements
   - Create placeholder references

4. **Polish** (30 seconds)
   - Review for consistency
   - Check formatting
   - Verify links and references
   - Add TODOs for missing info

5. **Present** (10 seconds)
   - Save as README.md (or update existing)
   - Show summary of what was generated
   - List TODOs for manual completion

## Tips for Best Results

1. **Run in clean repository** with actual code present
2. **Have dependencies installed** so package files are accurate
3. **Review and customize** - Don't use verbatim without review
4. **Add real badges** from shields.io after generation
5. **Create screenshots/GIFs** for visual sections
6. **Update links** to point to actual resources
7. **Keep it current** - Update as project evolves

## Customization via Focus

Add `--focus` parameter to emphasize specific aspects:

- `--focus "security"` - Highlight security features and practices
- `--focus "performance"` - Include benchmarks and optimization details
- `--focus "developer experience"` - Emphasize DX and ease of use
- `--focus "enterprise"` - Tailor for B2B and enterprise use cases
- `--focus "beginner-friendly"` - Prioritize getting started simplicity
- `--focus "multilingual"` - Include multi-language support sections

## Known Limitations

- **Badges require manual update** - URLs must be verified and customized
- **Screenshots/GIFs** - Placeholders only; actual media must be added
- **Community links** - Must be updated with real Discord/Slack/etc URLs
- **Benchmarks** - Require actual performance data to be meaningful
- **Examples** - May need refinement to match actual API surface

## Success Metrics

A successful README generation:

- ✅ New visitors understand project in <30 seconds
- ✅ Users can install and run "Hello World" in <5 minutes
- ✅ Contributors know how to get started
- ✅ All navigation works (TOC, links)
- ✅ Mobile and desktop rendering perfect
- ✅ No markdown errors or broken formatting
- ✅ Professional impression that builds trust

---

**Based on best practices from**: Express.js, Fastify, NestJS, refine, Ghost CMS, FastAPI, HTTPie, Django, Next.js, GraphQL.NET, Ocelot, and the awesome-readme curated list.

**Last Updated**: October 2025
