# Implementation Plan

## Overview

Transform the existing single-file static portfolio (`index.html`) into a production-ready, component-based web application built with Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide React, while preserving all verified content (Lake Shore institutional projects, IT experience, education, contact details). Add a small PHP + MySQL backend endpoint for the contact form (deployed to Hostinger) that validates and stores submissions, with PHP/MySQL labeled as "Learning" only since no prior evidence exists. The original `index.html` is archived (not deleted) for reference. Dark/light theming, accessibility, responsive layout, and SEO metadata are included. No experience, links, or metrics are fabricated; unverified project contributions remain explicitly attributed as such.

## Types

New TypeScript types (in `src/types/index.ts`):

- `Project`: `{ id: string; title: string; tag: string; description: string; iconLabel: string; skills: string[]; liveUrl: string; contributionNote: string; }`
- `SkillGroup`: `{ title: string; skills: string[]; }`
- `ExperienceItem`: `{ role: string; company: string; duration: string; techSupport: string[]; infrastructure: string[]; }`
- `EducationItem`: `{ degree: string; school: string; note: string; }`
- `QuickStat`: `{ value: string; label: string; }`
- `ContactPayload`: `{ name: string; email: string; subject?: string; message: string; }`
- `ContactResult`: `{ ok: boolean; message: string; }`
- `Theme`: `'light' | 'dark'`

Backend PHP (loose typing): request body validated against the same fields; response JSON `{ success: bool, message: string, id?: int }`.

## Files

New files:

- `package.json` — project manifest and scripts.
- `vite.config.ts` — Vite + React plugin, path alias `@` -> `src`.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — strict TS config.
- `tailwind.config.js` — content paths, `darkMode: 'class'`, theme tokens ported from current CSS variables.
- `postcss.config.js` — Tailwind + autoprefixer.
- `.env.example` — `VITE_API_BASE_URL=` (backend base URL).
- `.gitignore` — node_modules, dist, .env, backend config.
- `index.html` — Vite entry (replaces old single-file site; old archived).
- `public/robots.txt`, `public/favicon.svg`, `public/og-image.png` (placeholder).
- `src/main.tsx` — React root render with StrictMode.
- `src/App.tsx` — layout composition + theme provider.
- `src/index.css` — Tailwind directives + base/global styles.
- `src/types/index.ts`
- `src/data/profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `education.ts`
- `src/components/layout/Header.tsx`, `Footer.tsx`
- `src/components/sections/Hero.tsx`, `About.tsx`, `ExperienceSection.tsx`, `Projects.tsx`, `Skills.tsx`, `Education.tsx`, `Contact.tsx`
- `src/components/ui/Button.tsx`, `Card.tsx`, `Tag.tsx`, `SkillPill.tsx`, `SectionHead.tsx`
- `src/components/theme/ThemeProvider.tsx`
- `src/hooks/useScrollSpy.ts`, `useReducedMotion.ts`
- `src/lib/api.ts` — `submitContact(payload)` fetch wrapper.
- `backend/contact.php` — validated, PDO-based insert + mail.
- `backend/config.example.php` — DB credentials template (never committed with real values).
- `backend/schema.sql` — table creation script.
- `legacy/index.html` — archived original site (preserved).
- `README.md` — setup, dev, build, deploy, backend setup.

Modified files:

- `README.txt` — replace with pointer to `README.md`.

Files to delete: none (original archived, not deleted).

Configuration updates: add npm scripts `dev`, `build`, `preview`, `lint`, `typecheck`, `test`.

## Functions

New functions:

- `src/lib/api.ts`: `submitContact(payload: ContactPayload): Promise<ContactResult>` — POST JSON to `${VITE_API_BASE_URL}/contact.php`, handles network/HTTP errors, returns normalized result.
- `src/hooks/useScrollSpy.ts`: `useScrollSpy(ids: string[]): string` — returns active section id based on IntersectionObserver.
- `src/hooks/useReducedMotion.ts`: `useReducedMotion(): boolean`.
- `src/components/theme/ThemeProvider.tsx`: `useTheme()` context exposing `theme`, `toggleTheme()`, persisted to localStorage, applied to `<html class>`.
- Backend `backend/contact.php`: `sanitize(string): string`, `validate(array): array` (returns errors), `jsonResponse(int status, array body)`, main handler: parse JSON input, validate, PDO insert, attempt mail notification, return JSON. Uses prepared statements; never echoes credentials.

Modified functions: none (greenfield frontend).

Removed functions: none.

## Classes

New classes: none (functional components only).

Modified classes: none.

Removed classes: none.

## Dependencies

New npm (frontend):
- `react@^18`, `react-dom@^18`
- `framer-motion@^11`
- `lucide-react`
- dev: `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint` + react plugins, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

Backend (PHP, deployed to Hostinger, no composer required): uses built-in PDO (mysql), `mail()`. Optional SMTP via PHPMailer documented as future enhancement.

## Testing

- Unit: Vitest + React Testing Library for `Contact` form validation states (empty submit shows errors; valid submit calls `submitContact`), `Header` mobile menu toggle, `ThemeProvider` toggles class.
- Type check: `tsc --noEmit`.
- Lint: eslint.
- Manual: responsive breakpoints (850px, 620px), keyboard navigation, reduced-motion, Lighthouse accessibility/performance, backend endpoint via Hostinger or local XAMPP (POST test, validation errors, DB row insertion, SQL injection attempt rejected).
- Backend smoke: `curl -X POST .../contact.php -d '{...}'`.

## Implementation Order

1. Scaffold Vite React TS project + tooling (package.json, configs, tailwind, postcss).
2. Archive original `index.html` to `legacy/index.html`; create new Vite `index.html` entry.
3. Define types and data modules (reuse verified content; mark PHP/MySQL as Learning).
4. Implement theme provider + base layout (Header/Footer) with responsive nav.
5. Implement UI primitives (Button, Card, Tag, SkillPill, SectionHead).
6. Implement sections: Hero, About, Experience, Projects, Skills, Education, Contact.
7. Implement contact form + `api.ts` submit wrapper with loading/error/success states.
8. Add Framer Motion reveals (respect reduced motion) and Lucide icons.
9. SEO meta, robots, favicon, accessibility pass (aria, focus, skip link).
10. Backend: schema.sql, config.example.php, contact.php with validation + PDO + mail.
11. Write README.md with setup/build/deploy/backend instructions.
12. Update README.txt pointer.
13. Run typecheck, lint, unit tests, build; fix issues.
14. Manual responsiveness + backend smoke test checklist.

## Notes / Assumptions

- No PHP runtime detected locally; backend tested on Hostinger or via user's XAMPP. Frontend can be developed/tested independently with a mocked API base URL.
- Git is not available in this environment; version control steps omitted. User may initialize repo manually.
- Project contribution claims remain unverified and are phrased as such, per original site.
- Dark/light mode included as toggle (defaults to dark to match existing brand).
- Images: none optimized/converted; user to supply screenshots; placeholders use gradient/icon tiles (no fabrication).
