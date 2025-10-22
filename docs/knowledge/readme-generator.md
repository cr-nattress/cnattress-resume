# README Generator Prompt

Use this prompt in any repository to generate a beautiful, professional, and comprehensive README.md file that will impress software engineers viewing your project on GitHub.

---

## The Prompt

```
You are an expert technical writer specializing in creating outstanding README files for GitHub repositories. Your task is to analyze this codebase and generate a beautiful, stylish, and unforgettable README.md that follows industry best practices.

## Analysis Phase

First, analyze the repository thoroughly:

1. **Identify the project type**: Determine if this is a web framework, API, library, CLI tool, full-stack application, or other type of software
2. **Understand the technology stack**: Identify programming languages, frameworks, and key dependencies
3. **Discover the core functionality**: Understand what the project does and its key features
4. **Find existing documentation**: Look for existing docs, examples, tests, and configuration files
5. **Identify the audience**: Determine if this is open-source, internal, enterprise, or a personal project
6. **Check for existing conventions**: Review commit messages, code style, and any existing documentation patterns

## README Structure

Generate a comprehensive README.md with the following sections:

### 1. Header Section
- **Project name** as the main H1 heading
- **Compelling tagline** (one sentence that captures the essence and value)
- **Badges**: Include relevant shields.io badges:
  - Build/CI status (GitHub Actions, Travis, CircleCI, etc.)
  - Version (npm, PyPI, NuGet, etc.)
  - License
  - Code coverage (if applicable)
  - Downloads/popularity metrics
  - Language/platform indicators
- **Logo/banner** (placeholder reference if none exists)
- **Table of Contents** (for READMEs with 5+ sections)

### 2. Project Introduction
- Clear explanation of what the project does (2-3 sentences)
- Key value proposition - why this project exists
- What problems it solves
- Who should use it

### 3. Quick Start / Installation
- **Prerequisites**: List required software/versions (e.g., Node.js 18+, Python 3.9+)
- **Installation commands**: Provide copy-paste ready commands
  ```bash
  npm install your-package
  # or
  pip install your-package
  ```
- **Minimal working example**: A "Hello World" that users can run immediately
- **Expected output**: Show what success looks like
- **Alternative installation methods**: Docker, CLI installers, etc. (if applicable)

### 4. Usage & Examples
- **Basic usage example** with well-commented code
- **Common use cases** (3-5 practical examples)
- **Code snippets** with proper syntax highlighting
- **Sample outputs** showing expected results
- **Screenshots or GIFs** (describe where they would go if not present)
- **Links to more examples** or an examples directory

### 5. Features & Highlights
- Bulleted list of key features (5-10 items)
- Each feature with a brief description
- Highlight unique selling points
- Performance metrics or benchmarks (if applicable)
- **Optional**: Comparison table with similar tools (if relevant)

### 6. Core Concepts / Architecture
- Brief explanation of how the project works (high-level)
- Key design principles or philosophy
- Architecture diagram placeholder (if complex)
- Important terminology or concepts

### 7. Documentation & Resources
- Link to full documentation (or note that README is the primary docs)
- API reference location
- Tutorials or guides
- Video tutorials or talks (if any)
- Blog posts or articles

### 8. Community & Support
- How to get help:
  - GitHub Issues for bugs and features
  - Discussions for questions
  - Discord/Slack/forum links
  - Stack Overflow tags
- Where to follow updates (Twitter, blog, etc.)
- Code of Conduct reference

### 9. Contributing
- Warm invitation to contributors
- Link to CONTRIBUTING.md (or provide inline guidelines)
- How to:
  - Report bugs
  - Suggest features
  - Submit pull requests
- Link to "good first issues"
- Development setup instructions
- Testing guidelines
- Code style requirements

### 10. Roadmap (Optional)
- Upcoming features or improvements
- Link to project board or issues with "enhancement" label
- Version history or changelog reference

### 11. License
- Clear license statement
- Link to LICENSE file
- Copyright information

### 12. Acknowledgments
- Credits to contributors
- Inspiration or related projects
- Sponsors/backers (if applicable)
- Special thanks

## Formatting Guidelines

Follow these strict formatting rules:

### Visual Elements
- Use **badges** at the top for quick status information
- Include **code fences** with language hints for all code blocks:
  ```javascript
  // Example
  ```
- Use **tables** for structured comparisons or feature matrices
- Add **emoji icons** sparingly for section headers (max 5 in entire README)
- Use **bold** for emphasis and **inline code** for filenames, commands, and technical terms
- Include **horizontal rules** (`---`) to separate major sections

### Content Style
- **Active voice**: Write clear, direct instructions
- **Second person** ("you can install...") for guides
- **Short paragraphs**: 3-5 sentences maximum
- **Scannable**: Use bullet points, numbered lists, and headings liberally
- **Consistent terminology**: Use the same names/terms throughout
- **Professional but friendly**: Approachable yet authoritative tone
- **Avoid hype**: Back claims with facts or links

### Code Examples
- All code must be **copy-paste ready**
- Include **comments** explaining non-obvious parts
- Show **expected output** or results
- Use **realistic examples** (not just "foo" and "bar")
- Keep examples **concise** but **complete**

### Links
- Use **descriptive link text** (not "click here")
- Link to **specific sections** of documentation
- Include **absolute URLs** for external resources
- Test all links for validity

## Special Considerations

### For Open-Source Projects
- Emphasize **community** and **contribution opportunities**
- Include **Code of Conduct** reference
- Add **contributor recognition**
- Provide **issue templates** information
- Include **security policy** reference (SECURITY.md)

### For Libraries/Frameworks
- Show **API examples** prominently
- Include **TypeScript** types or type hints if applicable
- Demonstrate **configuration options**
- Provide **migration guides** for major versions
- Show **browser/platform compatibility**

### For CLI Tools
- Show **command syntax** clearly
- Include **flag/option** explanations
- Provide **GIF demonstrations** of usage (or describe where they'd go)
- Include **shell completion** instructions

### For APIs/Services
- Show **endpoint examples** with curl or HTTP client
- Include **authentication** setup
- Provide **rate limiting** information
- Link to **API playground** or Postman collection
- Show **response examples** with actual JSON/XML

## Output Requirements

Generate a complete README.md that:

1. **Immediately communicates value** in the first 3 seconds of viewing
2. **Gets users from zero to running** in under 5 minutes
3. **Showcases the best features** without overwhelming
4. **Guides next steps** clearly (docs, examples, community)
5. **Encourages contribution** (for open-source)
6. **Looks professional** with proper formatting and structure
7. **Scales well** from mobile to desktop GitHub views
8. **Maintains consistency** in tone, style, and terminology

## Validation Checklist

Before finalizing, ensure:

- [ ] Badge URLs are valid (or marked as placeholders)
- [ ] All code examples use proper syntax highlighting
- [ ] Installation commands are correct and current
- [ ] Links point to actual resources or are clearly marked as TODO
- [ ] Table of Contents anchors match heading IDs
- [ ] No broken markdown formatting
- [ ] Spelling and grammar are correct
- [ ] Tone is consistent throughout
- [ ] README length is appropriate (not too brief, not overwhelming)
- [ ] Mobile-friendly (no excessively wide tables or code blocks)

## Example Quality Benchmarks

Model your README after these excellent examples:
- **Express.js**: Clear philosophy, minimal quick-start, extensive community links
- **FastAPI**: Outstanding code examples, benchmark tables, auto-generated docs showcase
- **Fastify**: Performance-focused, clean structure, benchmark comparisons
- **NestJS**: Strong branding, multi-language support, clear architecture
- **HTTPie**: Excellent CLI examples, visual GIFs, community-focused
- **Ghost**: Beautiful banner, clear use case, professional presentation

---

Now, analyze this repository and generate an outstanding README.md file. Make it so impressive that any software engineer who sees it will immediately understand the project's value and want to try it or contribute to it.

If any information is missing or unclear from the codebase analysis, make reasonable assumptions based on best practices, but mark uncertain sections with TODO comments for the maintainer to fill in.

Begin your analysis and generation now.
```

---

## Usage Instructions

1. **Copy the entire prompt** from the code block above
2. **Paste it into your AI assistant** (Claude, GPT-4, etc.) while in your repository directory
3. **Review the generated README.md** and customize any placeholders or TODOs
4. **Add actual badges, screenshots, or GIFs** where indicated
5. **Update links** to point to your actual documentation, community channels, etc.
6. **Commit the new README** to your repository

## Tips for Best Results

- **Run this in a clean repository** with your actual code present
- **Have existing documentation** available for the AI to reference
- **Review and customize** - don't use the generated README verbatim without review
- **Add real badges** from shields.io after generation
- **Create actual screenshots/GIFs** for visual sections
- **Update regularly** - READMEs should evolve with your project

## Customization Options

You can modify the prompt to emphasize specific aspects:

- Add "**Focus on security features**" for security-focused projects
- Add "**Emphasize enterprise use cases**" for B2B tools
- Add "**Highlight developer experience**" for DX-focused libraries
- Add "**Include multilingual sections**" for international projects
- Add "**Prioritize getting started speed**" for beginner-friendly tools

---

**Generated with best practices from**: Express, Fastify, NestJS, FastAPI, HTTPie, Ghost, Django, Next.js, GraphQL.NET, Ocelot, and the awesome-readme curated list.
