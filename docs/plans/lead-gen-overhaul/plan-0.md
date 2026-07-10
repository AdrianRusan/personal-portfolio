# adrian-rusan.com — Lead-Generation Overhaul (3-Month Plan)

**Date:** 2026-07-10
**Owner:** Adrian Rusan (solo)
**Goal:** More paying scoping calls in the next 3 months. Ground truth: ~2 Calendly bookings in the last year, none since November.
**Source:** 12-agent multi-lever review (lead-gen, proof, offers, funnel, tracking, email, SEO/GEO, copy, tech/launch, 2026 research) → synthesis → adversarial challenge. 65 findings. Challenge sequencing overrides synthesis sequencing where they conflict — this doc is the reconciled version.

---

## Diagnosis (read this first)

The site is a **strong closer with almost no visitors.** Copy, offer ladder, disqualification, and guarantees are already professional-grade — conversion and price are near-maxed. So money in the next 3 months is gated by **distribution** (traffic) and **proof** (third-party credibility), **not** copywriting or SEO.

The adversarial pass caught the trap in the raw plan: it was ~35 code tasks, i.e. *building more closer.* Polishing a closer that nobody visits converts nobody. **The single biggest lever — Adrian sending warm DMs and posting the existing war-story content on LinkedIn — needs zero new code and is item #1.** Everything else exists to make that outreach land better and to stop the site quietly leaking the few leads it gets.

Second finding the agents surfaced from the actual code (not in the original chat review): **the funnel is silently broken in ways a dashboard won't show.**

- `app/api/subscribe/route.ts` returns fake `"Check your inbox"` success when Resend env vars are unset → the email funnel may be leaking **100%** while looking healthy.
- The send endpoint is **unauthenticated and unthrottled** → an email-bomb / quota-burn vector visible in devtools, on a site whose entire pitch is *"I catch the security bugs agents ship."* That is a credibility landmine for the exact CTO buyer.
- `EmailCapture.tsx` promises **"No pitch"** → makes any nurture a bait-and-switch and legally blocks a drip.
- Proof is **self-referential** (every headline stat traces to a demo on Adrian's own repo) and the lone testimonial (Tim Claes) is about general web work, not the agent-review service. `companies` logo strip (`data/index.ts:214`) is **tools** (Cloudinary, Docker, Stream…), not clients — reads as fake social proof.

**Winning sequence:** unbreak the plumbing → start human distribution *now* against what already exists → make proof real → ship *one* async offer + a buy-now door → *thin* instrumentation. Nurture, GEO, and heavier tooling compound behind those and are explicitly deferred.

---

## Pre-flight gates (verify BEFORE building — each can void a whole initiative)

| # | Gate | Why it matters | Action |
|---|------|----------------|--------|
| G1 | **Vercel plan tier supports custom events** | On Hobby, `@vercel/analytics` `track()` calls are dropped/limited. If Hobby, the entire instrumentation layer silently no-ops. | Check Vercel dashboard plan. If Hobby: either upgrade to Pro or fall back to Plausible/PostHog free tier for events. Do this before touching `CalendlyLink`. |
| G2 | **Checklist PDF actually exists in prod** | `CHECKLIST_URL` → `/agent-pr-review-checklist.pdf`. If missing, the one working funnel delivers a 404. | `curl -I https://www.adrian-rusan.com/agent-pr-review-checklist.pdf` → expect 200. |
| G3 | **Resend env vars set in Vercel prod + preview** | `RESEND_API_KEY`, `EMAIL_FROM`, `RESEND_AUDIENCE_ID`, `NEXT_PUBLIC_SITE_URL`, `SENTRY_DSN`. Missing = silent black-hole (see W0-1). | Vercel → Settings → Env. Then submit the real form on a preview deploy; confirm checklist arrives + contact appears in Resend. |
| G4 | **A demo repo with the 3 vuln diffs can be made public** | `link-real-receipts` (the proof linchpin) needs public, redacted diffs. If the vulns live in client code, this is blocked on non-code work. | Confirm a publishable repo exists or can be reconstructed cleanly. |
| G5 | **Vercel KV / Cron / rate-limit are NEW vendors** | The drip + abuse-hardening tasks need `@upstash/ratelimit` + Vercel KV + `vercel.json` cron — none exist in the repo. Contradicts "no new vendor." Cron on Hobby is daily-granularity + job-capped. | Only accept this surface when the deferred nurture/abuse work is actually scheduled (post-traffic). |

---

## Initiative 0 — Unbreak the money plumbing (DO FIRST — hours, mostly non-code)

These protect the **only conversion paths that already work.** No traffic required. Highest certainty per hour of any work in this plan.

| Task | Change | Files | Effort | Acceptance |
|------|--------|-------|--------|------------|
| **W0-1 fix-capture-blackhole** | No-op only when `NODE_ENV!=='production'`. In prod, missing `RESEND_API_KEY`/`EMAIL_FROM` must `Sentry.captureMessage` and return 500 — never fake `ok:true`. | `app/api/subscribe/route.ts` (~L45-56) | S | With env unset in prod, a submit alerts Sentry and surfaces the error state, not "Check your inbox." |
| **W0-2 calendly-fix** | In Calendly dashboard: timezone → auto-detect (not Europe/Helsinki); add 2-3 qualifying questions (company + repo, backlog size, timeframe). | *(Calendly dashboard — no code)* | S | Booking page shows visitor-local time; new bookings arrive pre-qualified. |
| **W0-3 env-verify** | Confirm G3 vars in prod+preview; live-test the form on a preview. | *(Vercel dashboard)* | S | Real submit on preview → checklist email received + contact in Resend audience. |
| **W0-4 consent-copy-fix** | Replace `"No pitch."` with `"Plus an occasional email on shipping AI-written code safely — unsubscribe anytime."` Unblocks honest nurture. | `components/EmailCapture.tsx:55-60` | S | Copy no longer promises silence; opt-in is truthful. |
| **W0-5 delete-dead-ga** | Remove `analytics.googleAnalyticsId` and the orphan `window.gtag` web-vitals call (Speed Insights covers vitals). Delete `hooks/usePerformance.ts` if unreferenced. | `config/environment.ts`, `hooks/usePerformance.ts` | S | `grep gtag\|googleAnalyticsId` → 0 hits; `tsc --noEmit` + build clean; vitals still in Speed Insights. |

---

## Initiative 1 — Human distribution, starting NOW (THE traffic lever — mostly non-code)

The agents' biggest omission was that the raw plan had **no committed human action.** This is item #1. It runs against the **existing** `/services` + Calendly — do **not** gate it on building new pages. The site is already a strong closer; it just needs visitors.

| Task | Change | Files | Effort | Acceptance |
|------|--------|-------|--------|------------|
| **D1-1 warm-send-list** | Commit a named list: Bono, Brikka/Johan, PGL, GoSocial, Ipsos + Alex, Marin + 10-15 LinkedIn ICPs (funded fintech/health/payments eng leaders). For each: relationship + the specific hook (free teardown or €1k PR). | `notes/outreach-list-2026-07-10.md` | S | ≥20 named targets, each with a one-line personalized angle. |
| **D1-2 outreach-snippets** | Paste-ready warm-intro + cold one-liners. Lead with the **free async teardown** or **€1k PR**, never "here's my site." | `notes/outreach-snippets-2026-07-10.md` | S | 2 warm + 2 cold templates, each ≤5 sentences, ending in the async offer link. |
| **D1-3 linkedin-cadence** | Turn the 6 existing blog posts into a LinkedIn posting schedule (2-3×/week). Post #1 = the shell-injection war story (`catching-shell-injection-agents-wrote.mdx`). Posts born LinkedIn-first, site is the closer. | `notes/linkedin-cadence-2026-07-10.md` | S | 6-week calendar; each post = hook + real finding + link to the on-site version. |
| **D1-4 weekly-ops-cadence** | The operating commitment the dashboard measures: **N DMs + N posts + N teardowns delivered per week.** This is the leading activity that generates the `calendly_click`s. | `notes/metrics-2026-07-10.md` (ops section) | S | Weekly target: e.g. 10 warm DMs, 3 posts, 1-2 free teardowns for named contacts. |
| **D1-5 do-teardowns** | Actually deliver 1-2 free Loom teardowns for **named warm contacts** this week; ask each for a one-line quote afterward. Fastest proof-manufacture there is. | *(execution, no code)* | M | 2 teardowns sent; ≥1 usable quote obtained. |
| **D1-6 get-recommendations** | Convert existing employer relationships into 2-3 LinkedIn recommendations about real delivery. | *(execution, no code)* | S | ≥2 recommendations live on LinkedIn, surfaced per T2-4. |

> These `notes/*` files are the artifacts; **the work is Adrian executing them weekly.** Code cannot do this step — the plan's job is only to make it cheap and tracked.

---

## Initiative 2 — Make proof real & third-party (S, near-first, kills the CTO trust reversal)

| Task | Change | Files | Effort | Acceptance |
|------|--------|-------|--------|------------|
| **T2-1 link-real-receipts** | Hard-link the real GitHub repo + 3 shell-injection vuln diffs inline. Flip ProofBand / CaseStudy CTA from "walk you through on a call" → **"inspect the diffs yourself."** (Gated on G4.) | `components/ProofBand.tsx`, `components/CaseStudy.tsx`, `data/index.ts` (`proofStats`) | S | The "3 shell-injection vulnerabilities" stat links to actual public diffs a skeptic can open. |
| **T2-2 proofstats-honesty** | Honest benchmark framing on `proofStats` (label the 30-PR/2.5-day numbers as a documented self-run benchmark, not a client engagement — pre-empts the "hasn't done this for a paying client" read). | `data/index.ts:13-26` | S | No stat implies a paying client that doesn't exist yet; each is verifiable. |
| **T2-3 testimonial-honesty** | De-carousel the single Tim Claes quote (one item ≠ carousel); honestly label it as general web-delivery, not the agent-review service, so it stops undercutting. | `components/Testimonials.tsx`, `data/index.ts:204-212` | S | One quote, correctly framed; no fake "multiple testimonials" UI. |
| **T2-4 employer+linkedin-proof** | Surface LinkedIn recommendations (from D1-6) as on-site proof; keep the honest employer ladder (Ipsos→PGL→GoSocial→Bono) which is genuinely strong. | `components/Experience.tsx`, `data/index.ts` (`socialMedia`, `workExperience`) | S | Real third-party endorsement visible without leaving the site. |
| **T2-5 fix-fake-logo-strip** | The `companies` strip is dev tools, not clients. Either relabel as "Built with" / stack, or remove — do not let it read as client logos. | `components/*` using `companies`, `data/index.ts:214-245` | S | No vendor logo is presented as a client. |
| **T2-6 kill-template-filler** | Remove leftover generic copy that clashes with the sharp positioning ("Tech enthusiast with a passion for development", generic BentoGrid lines). | `data/index.ts:89-153` (`gridItems`) | S | No boilerplate-portfolio filler remains on a page selling senior review. |

---

## Initiative 3 — One async offer + a buy-now door (the low-friction link outreach needs)

The chat review was right that a 30-min call is high-friction for cold traffic — but the challenge trimmed this hard: **ship ONE async page, not two.** Fold audit positioning into `/teardown`; split later only if demand proves it. Add a **standalone Stripe Payment Link** for the €1k PR — cleanest friction-killer, and it does **not** depend on any `/audit` page.

| Task | Change | Files | Effort | Acceptance |
|------|--------|-------|--------|------------|
| **O3-1 teardown-page** | `/teardown` landing: "Send a repo or a PR. I send back a 15-min Loom of what your AI-generated code is hiding — free, no call." Intake form (repo URL + email). This is the link every DM points to. | `app/teardown/page.tsx`, reuse `EmailCapture` pattern, `data/index.ts` | M | Page live; submission notifies Adrian; positioned as the default async CTA. |
| **O3-2 entryoffer-async-cta** | Give the €1k Reviewed PR a **no-call** path (intake + Stripe), not just `CALENDLY_URL`. | `components/services/EntryOffer.tsx:50-57` | S | A visitor can start the €1k PR without booking a call. |
| **O3-3 stripe-buy-now** | Standalone Stripe **Payment Link** for the €1k Reviewed PR + a short intake for the ticket. No `/audit` dependency. (Adrian creates the link in Stripe dashboard; code just surfaces it.) | Stripe dashboard + `data/index.ts`, `components/services/EntryOffer.tsx` | S | "Buy the €1k Reviewed PR" works end-to-end without a call. |
| **O3-4 homepage-async-rung** | Replace the bare `MagicButton` Calendly block (`app/page.tsx:60-69`) with a two-path "Start" band: **primary = free teardown**, secondary = book a call; surface the €1k PR. Outcome-first framing. | `app/page.tsx`, new `components/StartBand.tsx` | M | Homepage offers a zero-risk async action above the call CTA. |
| **O3-5 guarantee-string** | One risk-reversal guarantee string in `data/index.ts`, dropped beside homepage + CaseStudy + services CTAs. | `data/index.ts`, `components/CaseStudy.tsx`, `app/page.tsx` | S | Same guarantee line reused across all money CTAs. |

---

## Initiative 4 — Thin instrumentation (AFTER G1 confirms custom events work)

The raw plan wanted 7 events + scroll-depth + IntersectionObserver + a sessionStorage attribution layer. **At ~2 bookings/yr there is zero statistical power to optimize a funnel** — that is premature. Ship the minimum that answers *"which channel produced booking intent"* and spend the saved days on Initiative 1.

**Keep:** `calendly_click{source}` on the CTAs + `email_submit` + `teardown_request` + Vercel's **native** pageview UTM.
**Cut (deferred):** `scroll_depth`, `offer_view`, generic `cta_click`, and the custom UTM sessionStorage merge (Vercel captures `utm_*` on pageviews natively).

| Task | Change | Files | Effort | Acceptance |
|------|--------|-------|--------|------------|
| **M4-1 add-track-util** | `lib/analytics.ts`: typed `track(event, props?)` over `@vercel/analytics`, event = literal union `calendly_click\|email_submit\|teardown_request`. No-op when `!isProduction`. Runtime guard throws in dev if any prop key matches `/email\|name\|phone/`. | `lib/analytics.ts` | S | Firing in prod appears in Vercel → Events; email prop throws in dev; `tsc` clean. |
| **M4-2 calendly-link-wrapper** | `components/CalendlyLink.tsx` firing `calendly_click{source}` on each CTA. **Note:** `MagicButton` renders via Radix Slot `asChild` + `next/link`, not a raw `<a>` — thread `onClick` through the Slot; use `sendBeacon` and verify it fires before the tab opens (race with `target=_blank`). | `components/CalendlyLink.tsx`, `components/ui/MagicButton.tsx`, all CTA sites | M | Each CTA emits one `calendly_click` with a distinct `source`; beacon confirmed to fire pre-navigation. |
| **M4-3 email+teardown-events** | Fire `email_submit{variant}` (no PII) on capture success; `teardown_request` on `/teardown` submit. | `components/EmailCapture.tsx`, `app/teardown/page.tsx` | S | Opt-in and teardown intake each produce one clean event. |
| **M4-4 kpi-ritual-doc** | `notes/metrics-2026-07-10.md`: 5 KPIs (visitors; `calendly_click` + rate; `calendly_click` by `utm_source`; `email_submit` + lead rate; bookings pulled manually) + the weekly-ops cadence from D1-4. Decision rule: shift outreach to the `utm_source` with highest click-per-visit. | `notes/metrics-2026-07-10.md` | S | Weekly check < 5 min; ties leading indicator (clicks by channel) to lagging (bookings). |

**Outreach link convention:** `?utm_source=linkedin&utm_medium=post`, `?utm_source=coldemail&utm_medium=email&utm_campaign=<batch>`, `?utm_source=warm&utm_medium=dm`.

---

## Deferred — explicitly NOT now (taste discipline; each has a trigger to revisit)

| Deferred item | Why not now | Revisit when |
|---------------|-------------|--------------|
| PostHog / Plausible for per-person funnels | Vercel `track()` covers named events at this volume; 2nd vendor + consent surface, no marginal insight. | Per-person funnels genuinely needed (and add a consent gate then). |
| Separate `/audit` page + `case-study-factory` data engine | Premature productization / CMS-for-nothing (1 demo, 0 clients). "Three similar lines beats wrong abstraction." | `/teardown` demand proves the split; client #2's case study actually exists. |
| Full nurture drip (Vercel Cron + KV + 6 emails + dedicated sending subdomain + DMARC warmup) | Heavy infra + **new vendors** for a list of ~0 subscribers. A leaky bucket only matters once water is in it. | Subscribers > ~50. Then do it *with* consent + one-click unsubscribe. |
| `scroll_depth`, `offer_view`, `cta_click`, custom UTM store | Vanity metrics with zero statistical power at near-zero traffic; Vercel captures UTM natively. | Traffic is high enough for the numbers to mean something. |
| Cold-email warmed domain + SPF/DKIM/DMARC + mailbox warmup | Multi-week infra that only pays once warm + LinkedIn are saturated. | Cold email becomes a committed channel after warm network is worked. |
| Payload/Next.js productized-build offer | Dilutes the sharp "reviewed delivery" positioning. | Only if the review pitch underperforms with the warm network; demote immediately if it pulls low-fit inquiries. |
| SEO/GEO polish (llms.txt, JSON-LD Offer nodes, canonicals, sitemap lastmod) | SEO cannot move 3-month revenue; wildcard robots already permits answer bots. | Post-3-month, as a compounding play. Keep only the LinkedIn follow-loop card if cheap. |
| Hero LCP / TextGenerateEffect SSR refactor, Sentry sampling downgrade | Perf/housekeeping, low money leverage, no evidence a buyer bounced. | Measure with PageSpeed later; act only on evidence. |
| One-click unsubscribe + `List-Unsubscribe` headers | *Not* fully deferred — pull forward into W0 alongside consent-copy-fix (cheap, and required the moment any nurture ships). | Do with W0-4. |

---

## Execution order (what "we can do now" means)

1. **This session / today:** Initiative 0 (W0-1…W0-5) + gates G1-G3. Pure protection of existing funnels.
2. **This week, in parallel:** Initiative 1 (Adrian executes outreach — the actual traffic) **and** Initiative 2 code (make proof real). These do not depend on each other.
3. **Week 1-2:** Initiative 3 (`/teardown` + Stripe buy-now + homepage async rung) — the link outreach points at.
4. **Week 2, after G1:** Initiative 4 thin instrumentation, so channels become measurable once traffic exists.
5. **Ongoing:** weekly ops cadence (D1-4) + the 5-min KPI ritual (M4-4). Revisit deferred items only at their stated triggers.

**The failure mode this plan guards against:** spending 3 weeks shipping code with zero new traffic. If a week passes with more commits than DMs sent, the sequencing has slipped — outreach (Initiative 1) is the lever; the code is support.

---

## Validation before any commit (per project rules)

`npx tsc --noEmit` → `npm run lint` → `npm run build` → `npx playwright test`. `tsc --noEmit` is the real type gate (build ignores type errors). Solo context: gitmoji commits, feature branch before commits, GitHub-issues tracker.
