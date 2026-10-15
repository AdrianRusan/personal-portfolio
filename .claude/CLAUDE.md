# Personal Portfolio — Project Rules

Freelance/consultant portfolio + lead-gen funnel for Adrian Rusan (Full-Stack Engineer, 10+ yrs). Live: https://www.adrian-rusan.com. Primary job of this site: **convert visitors into scoping calls** (Cal.com) — not just look good. Weigh changes against that goal.

> Overrides nothing in global `~/.claude/CLAUDE.md`; adds project specifics. Read `.claude/CONTEXT.md` (Active Decisions + Known Issues) before starting work, and `.claude/codebase-profile.md` for structure.

## Stack

- **Next.js 15.5** (App Router, server-first) · **React 19.2** · **TypeScript 5** (`strict: true`)
- **Tailwind 3.4** + shadcn/ui (`components/ui`, `components.json`) + `cn()` (`lib/utils.ts`)
- **framer-motion 11** animations · **next-themes** dark/light · **lucide-react** + **react-icons**
- **MDX blog**: `next-mdx-remote` + `gray-matter` + `rehype-pretty-code`/`shiki` (`lib/blog.ts`, `content/blog/*.mdx`)
- **Observability**: Sentry (`@sentry/nextjs`, org `adrianrusan`), Vercel Analytics + Speed Insights (prod only)
- **Tests**: Jest 30 (unit + claim tests, `__tests__/`) · Playwright (`e2e/smoke.spec.ts`)
- **Deploy**: Vercel (Node 24), branch previews. Package manager: npm.

## Commands (verified 2026-10-14 against package.json)

| Task | Command | Notes |
|---|---|---|
| Dev | `npm run dev` | localhost:3000 |
| Build | `npm run build` | `cross-env NODE_ENV=production next build`; type-checks |
| Start | `npm start` | `next start`; pass `-- -p <port>` for a non-default port |
| Lint | `npm run lint` | `next lint` (eslint-config-next) |
| Typecheck | `npx tsc --noEmit` | no script; excludes `e2e/` |
| Unit + claim tests | `npm test` | jest; 28 suites, 270 tests on 2026-10-14 |
| E2E | `npm run e2e` | `playwright test`; starts `npm start` on :3045 (`E2E_PORT`), so run `npm run build` first; every route at 1440 + 390 |
| Security | `npm run security-check` | `scripts/security-check.js` |
| Verify all | `npm run verify:all` | `verify:build` → `verify:tests` → `verify:security` |
| Bundle analyze | `npm run analyze` | `ANALYZE=true` production build |

**Validation order before commit**: `npx tsc --noEmit` → `npm run lint` → `npm run build` → `npm test` → `npm run e2e`.

## Architecture

```
middleware.ts        Accept: text/markdown → rewrite to /api/markdown; Vary: Accept on HTML
app/
  (en)/              EN root layout + /, about, blog, contact, privacy, services, teardown, work, workshops
  (ro)/ro/           RO root layout (<html lang="ro">) + /ro, despre, contact, servicii
  api/               markdown/[[...path]] (Markdown twin of every page), subscribe (Resend), teardown
  root-shell.tsx     shared shell for both root layouts
  global-not-found.tsx  404 for unmatched URLs
  sitemap.ts robots.ts feed.xml/ llms.txt/  SEO + agent surface (generated from data)
components/          Section components; each exports a `*Copy` object reused by lib/markdown
  ui/  blog/  services/
lib/
  markdown/          Markdown for every page from the same copy + data (HTML and Markdown can't drift)
  blog.ts            MDX pipeline; posts hidden until published + isLive(date)
  page-schema.tsx person-schema.ts  JSON-LD
  analytics.ts booking.ts locale.ts og.tsx
data/                Single sources: index.ts (URLs, numbers, testimonials, work history),
                     ladder.ts, work.ts, workshops.ts, teardown.ts, pages.ts, nav.ts, ro*.ts
content/blog/ content/work/  MDX posts and case studies
__tests__/           jest, incl. claim tests (thirty-pr-claims, workflow-numbers, experience, testimonials)
e2e/                 Playwright smoke
config/environment.ts  site config, feature flags, env validation
```

## Conventions

- **Server components by default**; add `"use client"` only for interactivity (animation, theme, forms). Heavy client components → `dynamic()` import.
- **Named exports**, `import type` for types, no `any` (repo already has strict violations — don't add more).
- **Styling**: follow `DESIGN.md` (#123): semantic colour tokens (`page`, `ink`, `body`, `muted`, `accent`…), `type-*` roles, `measure*`, `section`/`gutter`. No hex, stock palette or `text-[Npx]` (`__tests__/design-system.test.ts` fails on them). Tailwind utilities + `cn()`; no inline style objects for themeable values.
- **Content edits**: site copy and numbers live in `data/*` (one constant per fact), not in components. Blog = MDX in `content/blog/`, case studies in `content/work/`. Change EN and RO together (`data/ro*.ts`).
- **Claims**: no invented proof. New numbers or quotes need a real source; run `npm test` (claim tests) after any copy change. See `.claude/CONTEXT.md` Active Decisions for names, Bono and booking rules.
- **SEO is load-bearing** (this site's discovery channel): touching `layout.tsx` metadata, `sitemap.ts`, `robots.ts`, or Schema.org JSON-LD → verify rich-results + OG tags still valid.
- Solo context: gitmoji commit format, tracker = github-issues. Feature branch before commits.

## Gotchas

- **`next build` needs `NODE_ENV=production`**: the shell profile exports `NODE_ENV=development`, and a raw `next build` re-triggers a `<Html>/pages/_document` prerender failure. Always build via `npm run build`.
- **Never `pkill`/`killall` or kill by pattern**: other projects' `next-server`s run on this machine. Use an explicit port; kill only your own PID.
- **Vercel CLI here is on another account**: don't use it for this project. Vercel must run Node 24; after close merges, check production is on the latest commit and promote it if not.
- **Calendly free plan**: never create or activate a Calendly event. The site books on Cal.com (`BOOKING_URL`) since #151; Calendly stays live only until Adi deactivates it after deploy. Cal.com is read-only for agents too.
- **`verify:tests` is environment-dependent**: `npm test` and `npm run e2e` are the reliable gates.
- **e2e is excluded from the app `tsconfig`**: tsc doesn't check `e2e/*.spec.ts`.
- **Images**: only `utfs.io` / `ufs.sh` remote patterns in `next.config.mjs`; a new host needs `remotePatterns`. `dangerouslyAllowSVG` is on with a strict CSP.
- **Env**: `NEXT_PUBLIC_SITE_URL` is required in production (`validateEnvironment` throws). Analytics/Sentry gated on env + `isProduction`.
