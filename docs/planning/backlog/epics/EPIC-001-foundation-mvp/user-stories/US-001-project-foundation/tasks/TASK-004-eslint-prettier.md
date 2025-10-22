# TASK-004: Set Up ESLint, Prettier, and Code Quality Tools

**Task ID:** TASK-004
**User Story:** US-001 - Project Foundation & Setup
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 25 minutes
**Priority:** 🔴 Critical

---

## Task Description

Configure ESLint and Prettier to enforce code quality standards and consistent formatting across the codebase.

---

## Agent Prompt

You are setting up code quality tools for the AI-enhanced portfolio website.

**Goal**: Configure ESLint and Prettier with rules optimized for Next.js, TypeScript, and React development.

**Context**: Consistent code quality and formatting prevent bugs and improve maintainability. This is part of US-001 (Project Foundation).

**Instructions**:

1. **Install Prettier and related dependencies**:
   ```bash
   npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
   ```

2. **Create `.prettierrc` configuration file**:
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": false,
     "printWidth": 100,
     "tabWidth": 2,
     "useTabs": false,
     "arrowParens": "always",
     "endOfLine": "lf"
   }
   ```

3. **Create `.prettierignore` file**:
   ```
   # Dependencies
   node_modules/
   .next/
   out/
   build/
   dist/

   # Logs
   *.log

   # Environment files
   .env*

   # Generated files
   .turbo/
   coverage/
   ```

4. **Update ESLint configuration** (create/update `eslint.config.js`):
   ```javascript
   import { FlatCompat } from "@eslint/eslintrc";
   import js from "@eslint/js";
   import prettier from "eslint-plugin-prettier";
   import path from "path";
   import { fileURLToPath } from "url";

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   const compat = new FlatCompat({
     baseDirectory: __dirname,
     recommendedConfig: js.configs.recommended,
   });

   const eslintConfig = [
     ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
     {
       plugins: {
         prettier,
       },
       rules: {
         "prettier/prettier": "error",
         "@typescript-eslint/no-unused-vars": "error",
         "@typescript-eslint/no-explicit-any": "warn",
         "react/no-unescaped-entities": "off",
         "react-hooks/exhaustive-deps": "warn",
       },
     },
   ];

   export default eslintConfig;
   ```

5. **Add npm scripts** to `package.json`:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "lint:fix": "next lint --fix",
       "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
       "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\""
     }
   }
   ```

6. **Test ESLint**:
   ```bash
   npm run lint
   ```
   Should show no errors (or auto-fixable warnings only)

7. **Test Prettier**:
   ```bash
   npm run format:check
   ```
   Should show files are formatted correctly

8. **Format all files**:
   ```bash
   npm run format
   ```

---

## Verification

**Automated Checks:**
```bash
# Verify config files exist
test -f .prettierrc && echo "✓ Prettier config exists"
test -f .prettierignore && echo "✓ Prettier ignore exists"
test -f eslint.config.js && echo "✓ ESLint config exists"

# Run linting
npm run lint

# Check formatting
npm run format:check
```

**Manual Checks:**
1. ✅ ESLint runs without errors: `npm run lint`
2. ✅ Prettier formats code correctly: `npm run format`
3. ✅ VS Code shows linting errors inline (if using VS Code)
4. ✅ All configuration files created
5. ✅ npm scripts work correctly

---

## Expected Outcome

- ✅ ESLint configured with Next.js and TypeScript rules
- ✅ Prettier configured for consistent formatting
- ✅ npm scripts available for linting and formatting
- ✅ `npm run lint` passes with no errors
- ✅ `npm run format` formats all files correctly
- ✅ IDE integration works (if applicable)

---

## Optional: VS Code Integration

If using VS Code, create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Also create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## Commit Message

```
chore(lint): Configure ESLint and Prettier for code quality

- Install and configure Prettier with project standards
- Update ESLint config for Next.js, TypeScript, React
- Add npm scripts for linting and formatting
- Create .prettierignore for build artifacts
- Add VS Code settings for IDE integration (optional)
```

---

*Task created: 2025-10-20*
