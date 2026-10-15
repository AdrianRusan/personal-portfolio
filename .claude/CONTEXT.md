# CONTEXT — Personal Portfolio

Living context. Update after each session. Keep under 200 lines.
State as of 2026-10-14 (main after PRs #34–#131).

## Recent Changes
- [2026-10-15] #149–#152 (stacked PRs #153–#156), CAEN 6210 fit: one `LEGAL_ENTITY` (footer, /contact, JSON-LD `taxID`), `VAT_LINE`, tiers Plan / Set up / Build / Ship, "AI Strategy Call" → Architecture Session (written build plan) and "AI Audit" → AI Code Audit (findings + one fix PR); these supersede the older names below. Private brief: `~/Code/personal/goals/2026-10-15-3-site-legal-offers-calcom.md`.
- [2026-10-14] #126, #129, #131 (issue #125) copy rewrite from content research, words only: the hero panel on `/` and `/ro` is a review log (`reviewLog`, own repos, the #109 miss included); keyword-led titles on every page (`HOME_TITLE`, `SERVICES_TITLE`, `WORK_TITLE`, `BLOG_TITLE`, /about "Hire a Senior Full-Stack Developer", distinct /contact and /ro/contact); new numbers `THROUGHPUT` (632 merged PRs, 32 active days), `NOW_BOARD`, `RULES_WORDS`; RO teardown fallbacks are an email (`RO_TEARDOWN_EMAIL`). Private research and receipts: `~/Code/personal/goals/2026-10-14-1-content-research/`.
- [2026-10-13/14] #114 redesign (direction M) and #123 design system (semantic tokens, type scale, `DESIGN.md`). Decisions in `docs/plans/feat-114-redesign-research/` and `DESIGN.md`.
- [2026-10-12] #91 two posts, live 14 Nov (fail-closed hooks) and 21 Nov (review bottleneck), every external number sourced and dated. #93 `htmlLimitedBots` keeps metadata in `<head>` on dynamic pages (/blog). #95 RO prices back to 55% of EN (audit from 850 €, workshops 1.650 € / 2.750 €); the strategy call promises a written summary within one working day.
- [2026-10-12] #87 marketing pass on pages (EN + RO): hero mirrors the LinkedIn headline, photo in the hero, one free door (Scoping Call) + teardown fallback, paid first step = €1,000 Reviewed PR, €200 call on /services only, compact /services price rows, honest case-study labels, harness proof, Veracode line in the security FAQ, location Timișoara. EN prices raised: AI Audit from €1,500, workshops €3,000 / €5,000 (RO prices unchanged).
- [2026-10-12] #86 blog cut from 13 files to 8 (301s in `next.config.mjs`), post-end CTAs read prices from `data/ladder.ts`, `/workshops` → `/services#ladder`, nine-PR case study goes live 24 Oct, Herdr-vs-agent-teams paragraph in the parallel post.
- [2026-10-11] #76 testimonials: four client quotes on `/`, `/services` and RO twins; the 2022 Tim Claes quote kept on `/about` and `/ro/despre` only.
- [2026-10-11] #74 real photo (`public/adrian.jpg`) in Bio and the blog author box.
- [2026-10-11] #66–#69 polish wave: one ask per page, shared closing CTA, plain footer, rebuilt home/about/contact/services, receipt project removed from every public page.
- [2026-10-11] #64 agent readiness: `/about`, `/contact` (+ RO), Organization schema, Markdown content negotiation, richer `llms.txt`.
- [2026-10-11] #56–#59: `(en)`/`(ro)` route-group root layouts (true `<html lang="ro">`), per-page schema, OG/X cards, `/privacy`, perf (no lottie/critters, no Sentry Replay), a11y fixes.
- [2026-10-11] #54: one workflow-number source, weekly post schedule, homepage cut to eleven sections, work history aligned to LinkedIn.
- [2026-10-10] #44–#48: `/work` index, cost case study, `/ro` parity with `/`, light-mode and 390px fixes, smoke e2e over every route.

## Architecture (what exists today)
- **Route groups**: `app/(en)/` (/, about, blog, contact, privacy, services, teardown, work, workshops) and `app/(ro)/ro/` (/ro, despre, contact, servicii). Each group has its own root layout; `app/root-shell.tsx` is shared. `app/global-not-found.tsx` handles unmatched URLs.
- **Markdown negotiation**: `middleware.ts` rewrites any page request with `Accept: text/markdown` to `app/api/markdown/[[...path]]`. HTML responses get `Vary` with `Accept` appended (keep `HTML_VARY` in sync with `next.config.mjs`). Unknown paths get a Markdown 404.
- **`lib/markdown/`**: builds each page's Markdown from the same copy objects the components export (`*Copy`) and from `data/*`, so HTML and Markdown can't drift. `app/llms.txt/route.ts` is generated from site data too.
- **Single sources in `data/`**: `index.ts` (BOOKING_URL, STRATEGY_CALL_BOOKING_URL, LEGAL_ENTITY, VAT_LINE, CONTACT_EMAIL, STRATEGY_CALL_*, FINTECH_EMPLOYER, WORKFLOW_NUMBERS/LEDGER_PROOF, CAPACITY, GUARANTEE, faqs, testimonials, workExperience), `ladder.ts` (offers + prices), `work.ts` (case studies), `workshops.ts`, `teardown.ts`, `pages.ts` (about/contact/privacy prose), `nav.ts`, `ro*.ts` (RO copy, `RO_STRATEGY_CALL_*`). Change copy there, never inline in components.
- **Content**: blog in `content/blog/*.mdx`, case studies in `content/work/`. `lib/blog.ts` gates posts by `published` + `isLive(date)`.
- **API**: `app/api/subscribe` (Resend), `app/api/teardown` (form), `app/api/markdown`.
- **Claim tests** (jest, `__tests__/`): guard the honesty rules below.
  - `thirty-pr-claims.test.ts`: no "tests passed"/"CI green" near a 30-PR or shell-injection claim (EN + RO).
  - `workflow-numbers.test.ts`: every workflow number derives from `WORKFLOW_NUMBERS`; the merged-PR count only from `THROUGHPUT`; every review-log row has an RO label.
  - `experience.test.ts`: bans receipt-project phrases on every public surface.
  - `testimonials.test.ts`: exact quote texts; Tim Claes only on `/about` and `/ro/despre`.
  - `post-schedule.test.ts`: weekly post dates and the 00:00 UTC go-live.
- **E2E**: `e2e/smoke.spec.ts` (Playwright), every route at 1440 and 390, against `npm start` on :3045. Run `npm run build` first, then `npm run e2e`.

## Active Decisions
- **Site goal**: lead-gen. Convert visitors into Cal.com scoping calls; judge changes by that.
- **Honesty / no invented proof**: every number and claim on the site must trace to a real source. No invented clients, quotes, metrics or results. When proof is missing, leave the slot out rather than fill it.
- **One number source per fact**:
  - Workflow numbers come only from `WORKFLOW_NUMBERS` (the 66-day post: 463 sessions, 335 hours, 4,920 commits, 928 PRs opened as an upper bound, 66 days, 6 Aug–10 Oct 2026).
  - 30-PR run canonical facts: the repo had **no tests and no CI**; review caught **3** shell-injection paths from request input before merge; a 2026-10-12 re-audit found **5** security misses (#98, #109, #117, stored XSS in #111 and #121; fixes in taco-console#126), listed only in the case study, never "1 missed"; the run took **under three days**. Never say "tests passed", "CI was green", "2.5 days" or "caught all of them". Source: `~/Code/personal/goals/2026-10-11-30pr-canonical-facts.md`.
- **Bono**: named as a client of the PFA (`FINTECH_EMPLOYER`), title Founding Engineer (contract, Sep 2024 – present), LinkedIn-level detail only. No product details, numbers or client names from that work. The receipt project never appears on the site (test-enforced).
- **Names**: no client names beyond what the site already shows. Never name the agent-built SaaS client or its people anywhere, docs included (this repo is public; the banned-name list lives in the private brief `~/Code/personal/goals/2026-10-10-1-portfolio-polish-sell.md`, R1). No compensation or equity details anywhere.
- **Booking is Cal.com, free plan, 3 events** (#151): Scoping Call (`BOOKING_URL`, `scoping-call`, free, 30 min), Architecture Session (`STRATEGY_CALL_BOOKING_URL`, `architecture-session`, €200) and the hidden Sesiune de arhitectură (`RO_STRATEGY_CALL_BOOKING_URL`, `sesiune-arhitectura`, 110 EUR); Stripe takes the paid ones at booking. Prefill is `?topic=` on the Scoping Call only; the analytics event stays `calendly_click`. `isBookingUrl` (`lib/booking.ts`) must match `cal.com`, or prefill and UTMs stop silently. Calendly is deactivated by Adi after deploy; until then its free plan allows one active event, so never create or activate one. Workshops stay `mailto:` (CAEN 8559 pending).
- **Testimonials**: four current quotes in `data/index.ts` `testimonials` (shown on `/`, `/services` and RO twins), plus `earlierTestimonial` (Tim Claes, 2022) on `/about` and `/ro/despre` only, marked `lang="en"` on RO.
- **Weekly posts via date-gated ISR**: one post a week, each hidden until 00:00 UTC on its frontmatter date. Blog, home, feed, sitemap and `llms.txt` use `revalidate = 3600`, so a post appears within an hour of its date with no deploy.
- **RO parity**: `/ro` mirrors `/` in layout and sections, only translated. RO copy lives in `data/ro*.ts`.
- **Rendering**: server components by default; `"use client"` only for interactivity.

- **Merged-PR count**: only `THROUGHPUT` (632 merged PRs in 32 active days, 11 Sep–13 Oct 2026, ledger same-method window, client and own work together, no split). Approved by Adi at the #125 gate. Recount only within one ledger method (never across 11 Sep 2026).
- **Hero panel = review log** (`reviewLog`, RO labels in `roProofBand`): own repos only, each row a real PR with a receipt, misses shown next to catches. Adding a client row needs Adi's approval of the exact line.
- **RO teardown fallback**: `RO_TEARDOWN_EMAIL` (mailto, subject "Teardown gratuit") everywhere RO used to link the EN-only `/teardown`, until an RO teardown page exists.

## Known Issues / Gotchas
- **`/` metadata**: the layout's `title.template` doesn't apply to a page in the layout's own folder, so `/` sets an absolute `HOME_SHARE_TITLE`. A page-level `openGraph` on `/` drops the root `app/opengraph-image.tsx`, so the home share text lives in the layout (`root-shell.tsx`). `/privacy` and the 404s inherit that card.
- **Re-link "nine PRs" on or after 2026-10-24**: `content/blog/2-3x-not-100x.mdx` (the October-run paragraph) had its link to `/work/nine-prs-one-afternoon` removed, because that study is dated 2026-10-24 and 404s until then. Once it is live, restore `[nine PRs](/work/nine-prs-one-afternoon)`.
- **Vercel production deploys fail when merges land seconds apart** ("Git information retrieval failed"; seen on #87, #93, #95 on 2026-10-12). The older deploys fail and the newest one usually succeeds. After merging several PRs, check that the deploy of the LAST merge commit succeeded; if it failed too, Deployments → Redeploy without build cache.
- **Vercel project must be on Node 24** (Project Settings → Node.js Version).
- **Never `pkill`/`killall` `next-server` or kill by pattern**: other projects run dev servers on this machine. Start servers on an explicit port and kill only your own PID.
- **The Vercel CLI on this machine is logged in to another account.** Don't use it for this project; use the Vercel dashboard.
- **Production can land on an older build** when merges land close together (an earlier deployment finishes last). After merging, check the production deployment's commit in the Vercel dashboard and promote the latest one if needed.
- **`npx is-agentic` caches reports**: a CLI rerun can show a stale score. Rescan from the is-agentic website to get a fresh report.
- Shell profile exports `NODE_ENV=development`: always build with `npm run build` (pins production), never raw `next build`.
- `verify:tests` (inside `verify:all`) is environment-dependent; `npm test` and `npm run e2e` are the reliable gates.

## Open Items (Adi)
- `contact@adrian-rusan.com` has no MX records (no mailbox). `CONTACT_EMAIL` points at the Gmail until forwarding exists (#145); then switch the one constant back.
- YouTube channel: set `YOUTUBE_CHANNEL_ID` when live (null hides every YouTube surface).

## Environment
- Node/npm. Required prod env: `NEXT_PUBLIC_SITE_URL`. Optional: `SENTRY_DSN`, Resend vars (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `EMAIL_FROM`).
- Remote: `git@github-personal:AdrianRusan/personal-portfolio.git` (gh account `AdrianRusan`).
