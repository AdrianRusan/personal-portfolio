# CONTEXT — Personal Portfolio

Living context. Update after each session (`/context-save`). Keep under 200 lines.

## Recent Changes
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
- **P1**: `tsc --noEmit` currently RED — real type errors in `lib/blog.ts` (18–19: object possibly undefined) + e2e implicit-any. Build masks them via `ignoreBuildErrors`.
- **P2**: Zero Jest unit tests despite jest config — `verify:tests` passes vacuously; no real unit coverage.
- **P2**: `config.features.blog === false` while blog is live — stale feature flag, misleading.
- **P3**: `@playwright/test` types unresolved under `tsc` — e2e specs pollute typecheck output.
- **P3**: 3 overlapping PRD docs at repo root (Enhancement / Enterprise-Systems / NextJS-Vercel) + stale `PROJECT_OVERVIEW.md` (says React 18, 8 yrs, blog "future"). Consolidate/date them.

## Backlog / Opportunities (from /skills review)
- CRO audit of `/services` + homepage funnel (highest ROI)
- `.agents/product-marketing.md` positioning/ICP doc (feeds copy + SEO skills)
- SEO audit + Schema.org (Service/FAQ/Article) validation
- AI-SEO: `llms.txt` / answer-engine optimization
- Blog content pipeline is ready but under-used — thought-leadership posts for organic + trust

## Environment
- Node/npm. Required prod env: `NEXT_PUBLIC_SITE_URL`. Optional: `NEXT_PUBLIC_GA_ID`, `SENTRY_DSN`.
- Remote: `git@github-personal:AdrianRusan/personal-portfolio.git` (gh account `AdrianRusan`).
