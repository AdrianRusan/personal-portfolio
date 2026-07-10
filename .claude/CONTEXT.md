# CONTEXT — Personal Portfolio

Living context. Update after each session (`/context-save`). Keep under 200 lines.

## Recent Changes
- [2026-07-10] Docs cleanup: consolidated 3 root PRD vision docs → `docs/prd-archive.md`; removed originals; refreshed stale CLAUDE.md gotchas/commands (build type-checks, tests exist, blog flag fixed). Branch `docs-consolidate-prd-archive`.
- [2026-07-10] Added real Jest unit coverage (PR #17): 14 tests, fixed scaffolded-but-uninstalled jest harness.
- [2026-07-09] Implemented P0/P1 audit fixes (branch `audit-p0-p1-implementation`, commit ae8f347) via 12-agent workflow
  - 27 files: positioning/SEO metadata, honesty copy reframes (CaseStudy/ProofBand/Scarcity), funnel (nav CTA, footer, EmailCapture+Bio+/api/subscribe, pricing "from" drop), blog type fixes
  - tsc app-clean + lint clean; build blocked by pre-existing P0 Html bug (see below)
  - **Done since**: Calendly `scoping-call` 30-min event created (#1); ESP wired to Resend (`/api/subscribe`, needs `RESEND_API_KEY`/`RESEND_AUDIENCE_ID`/`EMAIL_FROM` env in Vercel); OG cards built; lead-magnet PDF at `public/agent-pr-review-checklist.pdf`
  - **Open user actions**: add real photo `public/adrian.jpg` (Bio uses AR initials fallback for now); one ICP testimonial to replace Tim Claes; confirm Bono Fintech + reconcile with workExperience; Google verification token (`GOOGLE_SITE_VERIFICATION`); set the Resend env vars + verify sending domain
- [2026-07-09] Ran multi-agent lead-gen audit → `audits/portfolio-audit-2026-07-09.md` (71 findings)
- [2026-07-09] Bootstrapped `.claude/` harness (`/init-project`)
  - Added: `.claude/CLAUDE.md`, `.claude/CONTEXT.md`, `.claude/codebase-profile.md`
  - Why: no project-level config existed; every skill/agent ran blind on this repo
- [prior] Shipped `/services` offer page: research-backed prices, trust strip, risk-reversal, Scarcity, ServicesFinalCta (commits 74e9290, cbb3120)
- [prior] Wired Calendly booking into every scoping-call CTA (1acab0c)
- [prior] Homepage ship-verify pass (#10)

## Active Decisions
- **Site goal**: lead-gen — convert visitors → Calendly scoping calls. Judge changes by conversion impact.
- **Content**: static in `data/index.ts`; blog = MDX in `content/blog/`. No CMS (PayloadCMS is a PRD future item, not built).
- **Rendering**: server components by default; `dynamic()` + Skeleton for heavy client components.
- **Type gate**: `npx tsc --noEmit` is the real check (build ignores type errors).
- **Deploy**: Vercel, branch previews. Sentry org `adrianrusan`, project `personal-portfolio`.

## Known Issues
- **RESOLVED 2026-07-09**: local `npm run build` `<Html>`/`pages/_document` prerender failure — root cause was shell `NODE_ENV=development` leaking into `next build`; fixed by pinning `NODE_ENV=production` in the build script (commit adf2e2c). Was NOT Sentry.
- **RESOLVED 2026-07-09**: type gate — `tsc --noEmit` clean, e2e/playwright excluded from app tsconfig, `ignoreBuildErrors` removed; `npm run build` now type-checks and passes green (tech-3 closed).
- **RESOLVED 2026-07-10**: Jest unit tests added (PR #17) — 14 tests across `__tests__/` (utils/blog/api-subscribe); `jest` + `jest-environment-jsdom` + `@testing-library/jest-dom` now real devDeps; `npm test` green. Was P2 (vacuous `verify:tests`).
- **RESOLVED 2026-07-10**: 3 overlapping root PRD docs consolidated into `docs/prd-archive.md` (dated, deduped, marks shipped vs abandoned); originals `git rm`'d (full text in git history). `PROJECT_OVERVIEW.md` refreshed in #16. Was P3.
- **RESOLVED (#16)**: `config.features.blog` flipped `true` — stale flag fixed.
- Note: shell profile exports `NODE_ENV=development` — any raw `next build` (not via `npm run build`) will re-trigger the `<Html>` bug. Always build through the npm script.
- **P3**: `verify:tests` script is flaky (env-dependent Playwright/e2e step) — unrelated to unit tests; `npm test` is the reliable unit gate.

## Backlog / Opportunities (from /skills review)
- CRO audit of `/services` + homepage funnel (highest ROI)
- `.agents/product-marketing.md` positioning/ICP doc (feeds copy + SEO skills)
- SEO audit + Schema.org (Service/FAQ/Article) validation
- AI-SEO: `llms.txt` / answer-engine optimization
- Blog content pipeline is ready but under-used — thought-leadership posts for organic + trust

## Environment
- Node/npm. Required prod env: `NEXT_PUBLIC_SITE_URL`. Optional: `NEXT_PUBLIC_GA_ID`, `SENTRY_DSN`.
- Remote: `git@github-personal:AdrianRusan/personal-portfolio.git` (gh account `AdrianRusan`).
