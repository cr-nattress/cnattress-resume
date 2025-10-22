# TASK-005: Create Project Folder Structure and Configuration Files

**Task ID:** TASK-005
**User Story:** US-001 - Project Foundation & Setup
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 20 minutes
**Priority:** 🔴 Critical

---

## Task Description

Create the complete folder structure for the project and set up essential configuration files for environment variables, Git, and documentation.

---

## Agent Prompt

You are organizing the project structure for the AI-enhanced portfolio website.

**Goal**: Create a well-organized folder structure that follows Next.js and React best practices.

**Context**: A clear folder structure improves code organization and developer productivity. This is the final task in US-001 (Project Foundation).

**Instructions**:

1. **Create the core directory structure**:
   ```bash
   mkdir -p components/hero components/sections components/ai components/ui
   mkdir -p lib/api lib/analytics
   mkdir -p types
   mkdir -p public/images public/icons
   mkdir -p app/api
   ```

2. **Create `.env.example` template file**:
   ```bash
   # .env.example
   # Copy this to .env.local and fill in your values

   # Anthropic Claude API
   ANTHROPIC_API_KEY=sk-ant-xxxxx

   # Supabase (will be added in Phase 2)
   # NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   # SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

   # GitHub API (optional - for higher rate limits)
   # GITHUB_TOKEN=ghp_xxxxx

   # Email Service (will be added in Phase 4)
   # SENDGRID_API_KEY=SG.xxxxx

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Verify `.gitignore` includes important patterns**:

   Update `.gitignore` to include:
   ```
   # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

   # dependencies
   /node_modules
   /.pnp
   .pnp.js
   .yarn/install-state.gz

   # testing
   /coverage

   # next.js
   /.next/
   /out/

   # production
   /build

   # misc
   .DS_Store
   *.pem

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # local env files
   .env*.local
   .env

   # vercel
   .vercel

   # typescript
   *.tsbuildinfo
   next-env.d.ts

   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo
   ```

4. **Create TypeScript type definitions** in `types/index.ts`:
   ```typescript
   // types/index.ts

   // Placeholder types for future use
   export interface Message {
     id: string;
     role: "user" | "assistant";
     content: string;
     timestamp: Date;
   }

   export interface Project {
     id: string;
     name: string;
     description: string;
     technologies: string[];
     githubUrl: string;
     liveUrl?: string;
     thumbnail: string;
     featured: boolean;
   }

   export interface Experience {
     id: string;
     company: string;
     position: string;
     startDate: Date;
     endDate?: Date;
     description: string;
     technologies: string[];
     achievements: string[];
   }
   ```

5. **Create a comprehensive README.md**:
   ```markdown
   # AI-Enhanced Portfolio Website

   A modern, interactive portfolio website featuring AI-powered chat, dynamic content, and stunning 3D visualizations.

   ## Tech Stack

   - **Framework**: Next.js 15 with App Router
   - **Language**: TypeScript
   - **Styling**: Tailwind CSS + Shadcn/ui
   - **AI**: Anthropic Claude API
   - **Database**: Supabase (PostgreSQL)
   - **Deployment**: Netlify

   ## Getting Started

   ### Prerequisites
   - Node.js 20.x LTS
   - npm or yarn
   - Git

   ### Installation

   1. Clone the repository:
      \`\`\`bash
      git clone https://github.com/yourusername/portfolio.git
      cd portfolio
      \`\`\`

   2. Install dependencies:
      \`\`\`bash
      npm install
      \`\`\`

   3. Set up environment variables:
      \`\`\`bash
      cp .env.example .env.local
      # Edit .env.local with your API keys
      \`\`\`

   4. Run the development server:
      \`\`\`bash
      npm run dev
      \`\`\`

   5. Open [http://localhost:3000](http://localhost:3000) in your browser.

   ## Available Scripts

   - \`npm run dev\` - Start development server
   - \`npm run build\` - Build for production
   - \`npm run start\` - Start production server
   - \`npm run lint\` - Run ESLint
   - \`npm run lint:fix\` - Fix ESLint errors
   - \`npm run format\` - Format code with Prettier
   - \`npm run format:check\` - Check code formatting

   ## Project Structure

   \`\`\`
   ├── app/                  # Next.js App Router pages
   │   ├── api/             # API routes
   │   ├── layout.tsx       # Root layout
   │   └── page.tsx         # Homepage
   ├── components/          # React components
   │   ├── hero/           # Hero section components
   │   ├── sections/       # Page sections
   │   ├── ai/             # AI chat components
   │   └── ui/             # Shadcn/ui components
   ├── lib/                 # Utility functions and libraries
   │   ├── api/            # API utilities
   │   └── analytics/      # Analytics utilities
   ├── types/               # TypeScript type definitions
   ├── public/              # Static assets
   └── backlog/             # Project planning and backlog
   \`\`\`

   ## Development Phases

   - **Phase 1**: Foundation MVP (Weeks 1-2) ✅
   - **Phase 2**: AI Integration (Weeks 3-4)
   - **Phase 3**: Interactive Features (Weeks 5-6)
   - **Phase 4**: Advanced AI Features (Weeks 7-8)
   - **Phase 5**: Polish & Innovation (Weeks 9-10)

   ## Contributing

   This is a personal portfolio project, but feedback and suggestions are welcome!

   ## License

   MIT License - See LICENSE file for details

   ---

   **Built with ❤️ using Next.js, TypeScript, and Claude AI**
   \`\`\`

6. **Create placeholder README in components** folders:
   ```bash
   echo "# Hero Components\n\nComponents for the hero/landing section." > components/hero/README.md
   echo "# Section Components\n\nReusable section components." > components/sections/README.md
   echo "# AI Components\n\nAI-powered interactive components." > components/ai/README.md
   ```

7. **Verify folder structure**:
   ```bash
   tree -L 2 -I 'node_modules|.next'
   ```

---

## Expected Folder Structure

```
chris-nattress.com/
├── app/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── hero/
│   │   └── README.md
│   ├── sections/
│   │   └── README.md
│   ├── ai/
│   │   └── README.md
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   ├── api/
│   ├── analytics/
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   └── icons/
├── backlog/
│   └── epics/
├── .env.example
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
├── components.json
└── README.md
```

---

## Verification

**Automated Checks:**
```bash
# Verify directories exist
test -d components/hero && echo "✓ Hero components directory exists"
test -d components/sections && echo "✓ Sections directory exists"
test -d components/ai && echo "✓ AI components directory exists"
test -d lib/api && echo "✓ API lib directory exists"
test -d types && echo "✓ Types directory exists"

# Verify files exist
test -f .env.example && echo "✓ .env.example exists"
test -f README.md && echo "✓ README.md exists"
test -f types/index.ts && echo "✓ Type definitions exist"
```

**Manual Checks:**
1. ✅ All directories created
2. ✅ .env.example file created
3. ✅ .gitignore properly configured
4. ✅ README.md is comprehensive
5. ✅ TypeScript types defined
6. ✅ Folder structure follows best practices

---

## Expected Outcome

- ✅ Complete folder structure created
- ✅ Environment variable template ready
- ✅ .gitignore configured properly
- ✅ README.md documents setup process
- ✅ TypeScript types defined in types/
- ✅ Project is well-organized and ready for development

---

## Commit Message

```
chore(structure): Create project folder structure and configuration

- Create component directories (hero, sections, ai, ui)
- Create lib directories (api, analytics)
- Add types directory with initial type definitions
- Create .env.example template for environment variables
- Update .gitignore with comprehensive patterns
- Add comprehensive README.md documentation
- Add placeholder READMEs in component folders
```

---

## Next Steps

After completing TASK-005:
1. ✅ Mark US-001 as complete
2. ➡️ Proceed to US-002: Hero Section & Landing Page
3. 🎉 Foundation setup is complete!

---

*Task created: 2025-10-20*
