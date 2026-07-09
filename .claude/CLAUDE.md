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
| Build | `npm run build` | **ignores type errors** (`next.config.mjs` `ignoreBuildErrors: true`) |
| Lint | `npm run lint` | eslint-config-next |
| Typecheck | `npx tsc --noEmit` | **NOT wired to build** — run manually; currently has known errors (see CONTEXT) |
| Unit tests | `npx jest` | jest 30; no test files yet |
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
hooks/               usePerformance (Core Web Vitals)
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

- **Build hides type errors** — `ignoreBuildErrors: true`. A green `npm run build` does NOT mean types are clean. Always run `npx tsc --noEmit` separately.
- **`config.features.blog === false`** in `config/environment.ts` while the blog is shipped and routed. Flag is stale/unused — don't trust it to gate blog rendering; verify actual routing before relying on it.
- **Jest configured, zero unit tests** — `verify:tests` / `npx jest` pass vacuously. Coverage claims are hollow until tests exist.
- **`@playwright/test` types not resolved by `tsc`** — playwright runs fine (`npx playwright test`), but e2e specs show up as type errors under `tsc --noEmit`. Filter e2e noise when reading typecheck output.
- **Images**: only `utfs.io` / `ufs.sh` (uploadthing) remote patterns allowed in `next.config.mjs`; adding an external image host requires editing `remotePatterns`. `dangerouslyAllowSVG` is on with a strict CSP.
- **Env**: `NEXT_PUBLIC_SITE_URL` is required in production (`validateEnvironment` throws). Analytics/Sentry gated on env + `isProduction`.
