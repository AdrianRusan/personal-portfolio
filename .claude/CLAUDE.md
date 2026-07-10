# Personal Portfolio — Project Rules

Freelance/consultant portfolio + lead-gen funnel for Adrian Rusan (Full-Stack Engineer, 10+ yrs). Live: https://www.adrian-rusan.com. Primary job of this site: **convert visitors into scoping calls** (Calendly) — not just look good. Weigh changes against that goal.

> Overrides nothing in global `~/.claude/CLAUDE.md`; adds project specifics. Read `.claude/CONTEXT.md` (Active Decisions + Known Issues) before starting work, and `.claude/codebase-profile.md` for structure.

## Stack

- **Next.js 15.5** (App Router, server-first) · **React 19.2** · **TypeScript 5** (`strict: true`)
- **Tailwind 3.4** + shadcn/ui (`components/ui`, `components.json`) + `cn()` (`lib/utils.ts`)
- **framer-motion 11** animations · **next-themes** dark/light · **lucide-react** + **react-icons**
- **MDX blog**: `next-mdx-remote` + `gray-matter` + `rehype-pretty-code`/`shiki` (`lib/blog.ts`, `content/blog/*.mdx`)
- **Observability**: Sentry (`@sentry/nextjs`, org `adrianrusan`), Vercel Analytics + Speed Insights (prod only)
- **Tests**: Jest (unit — configured, currently 0 test files) · Playwright (`e2e/*.spec.ts`)
- **Deploy**: Vercel, branch previews. Package manager: npm.

## Commands (verified 2026-07-09)

| Task | Command | Notes |
|---|---|---|
| Dev | `npm run dev` | localhost:3000 |
| Build | `npm run build` | `cross-env NODE_ENV=production next build` — now type-checks (ignoreBuildErrors removed) |
| Lint | `npm run lint` | eslint-config-next |
| Typecheck | `npx tsc --noEmit` | still NOT wired to build; run manually. Currently clean (e2e/playwright excluded from app tsconfig) |
| Unit tests | `npm test` | jest 30; 14 tests across `__tests__/` (utils, blog, api-subscribe) |
| E2E | `npx playwright test` | no npm script; `e2e/portfolio-journey.spec.ts`, `e2e/error-scenarios.spec.ts` |
| Security | `npm run security-check` | `scripts/security-check.js` |
| Verify all | `npm run verify:all` | tests → build → security |
| Bundle analyze | `npm run analyze` | `ANALYZE=true` |

**Validation order before commit**: `npx tsc --noEmit` → `npm run lint` → `npm run build` → `npx playwright test`. Because build ignores type errors, `tsc --noEmit` is the real type gate — don't skip it.

## Architecture

```
app/                 App Router: layout.tsx (SEO/metadata), page.tsx (homepage, dynamic imports),
  services/          /services offer page (pricing, risk-reversal, Calendly CTAs)
  blog/[slug]/       MDX blog + opengraph-image.tsx
  sitemap.ts robots.ts feed.xml/  SEO surface (Schema.org, AI-crawler allowlist, RSS)
components/          Section components (Hero, Offers, Testimonials, CaseStudy, ShipVerify, ...)
  ui/                shadcn + custom animated primitives (Spotlight, BentoGrid, MagicButton, ...)
  blog/  services/   Feature-scoped components
lib/                 blog.ts (MDX pipeline), utils.ts (cn), blog-types.ts
config/environment.ts  Site config, feature flags, env validation
data/index.ts        Static content (projects, experience, testimonials) — hardcoded, no CMS yet
content/blog/        MDX posts (frontmatter via gray-matter)
context/             theme-provider
hooks/               (currently empty; Core Web Vitals via Vercel Speed Insights)
scripts/             verify-*.js, security-check.js, performance scripts
e2e/                 Playwright specs
```

## Conventions

- **Server components by default**; add `"use client"` only for interactivity (animation, theme, forms). Heavy client components → `dynamic()` import with `Skeleton` fallback.
- **Named exports**, `import type` for types, no `any` (repo already has strict violations — don't add more).
- **Styling**: Tailwind utilities + `cn()`; no inline style objects for themeable values (use CSS vars / tokens).
- **Content edits**: static site content lives in `data/index.ts`, not in components. Blog = MDX in `content/blog/`.
- **SEO is load-bearing** (this site's discovery channel): touching `layout.tsx` metadata, `sitemap.ts`, `robots.ts`, or Schema.org JSON-LD → verify rich-results + OG tags still valid.
- Solo context: gitmoji commit format, tracker = github-issues. Feature branch before commits.

## Gotchas

- **`next build` needs `NODE_ENV=production`** — shell profile exports `NODE_ENV=development`; a raw `next build` leaks it and re-triggers a `<Html>/pages/_document` prerender failure. Always build via `npm run build` (pins `cross-env NODE_ENV=production`). Build now type-checks (`ignoreBuildErrors` removed), but `tsc --noEmit` is still the manual pre-commit gate.
- **`verify:tests` script is flaky** — its Playwright/e2e orchestration step is environment-dependent and can fail independent of unit tests. `npm test` (jest, 14 tests) is the reliable unit gate.
- **e2e/playwright excluded from app `tsconfig`** — `tsc --noEmit` no longer type-checks `e2e/*.spec.ts` (they need `@playwright/test`). Run `npx playwright test` for e2e; don't expect tsc to cover them.
- **Images**: only `utfs.io` / `ufs.sh` (uploadthing) remote patterns allowed in `next.config.mjs`; adding an external image host requires editing `remotePatterns`. `dangerouslyAllowSVG` is on with a strict CSP.
- **Env**: `NEXT_PUBLIC_SITE_URL` is required in production (`validateEnvironment` throws). Analytics/Sentry gated on env + `isProduction`.
