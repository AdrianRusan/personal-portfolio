# Product Marketing Context — adrian-rusan.com

**Document version:** v1
**Last updated:** 2026-10-13
**Sources (only these):** `.claude/CONTEXT.md` Active Decisions, `data/*.ts` (index, ladder, teardown, work, workshops, ro*), `content/work/*.mdx` frontmatter, live site fetched 2026-10-13 (/, /services, /about, /contact, /teardown, /work, /ro). Anything not in those is marked **GAP**.

## Product Overview
**One-liner (live, = LinkedIn headline, `SITE_TAGLINE`):** "AI Agents Ship It, I Review Every PR."
**What it does:** Adrian runs several Claude Code agents in parallel git worktrees on a client's backlog tickets; he security-reviews every PR line by line (injection, auth, secrets, access control first, then correctness and scope) before it reaches the client. Fixed price agreed before work starts. Expected gain stated as "2–3x the throughput, not 100x".
**Category (shelf):** AI-assisted software delivery with senior human review. Adjacent shelves buyers search on: "AI code review", "AI code security audit", "Claude Code consultant/workshop". **GAP:** no keyword or search data in the repo to say which shelf buyers actually use.
**Product type:** Productized service, solo senior engineer (Rusan Adrian-Ionuț PFA, Timișoara, invoiced in EUR, USD on request).
**Business model:** Published price ladder, EUR ex-VAT (prices fixed; presentation only may change):

| Tier | Offer | EN price | RO price | Duration |
|---|---|---|---|---|
| Advise | AI Strategy Call | €200 (mailto until Stripe) | 110 € | 1 h |
| Advise | AI Audit | from €1,500 | from 850 € | 2–3 days |
| Train | Team workshop | €3,000 half-day / €5,000 full-day | 1.650 € / 2.750 € | 3.5 h / 8 h, ≤10 people |
| Build | AI Automation | from €3,000 | from 1.650 € | 1–3 wk |
| Build | Agent Fleet Setup | from €4,000 | from 2.200 € | 1 wk |
| Ship | Reviewed PR (paid first step) | €1,000 | 550 € | ~48 h |
| Ship | Delivery Sprint | from €7,500 (sizes €7,500 / €14,500 / €24,000; €950–1,500 per PR, computed) | from 4.100 € (500–850 € per PR) | 1–2 wk, larger 2–3 wk |
| Ship | Retainer | from €4,000/month, 3 months then monthly | from 2.200 €/month | monthly |

Free doors: **Scoping Call** (30 min, Calendly, the one active event) and **Free AI Code Teardown** (~15-min Loom, email + repo/PR link, 2–3 business days). Credit: move up a tier within 30 days and what was paid counts.

## Target Audience
**Target companies (`whoFor.forList`):** funded startups and scaleups, especially where security review is non-negotiable: fintech, health, payments, anything handling money or PII.
**Decision-makers:** people who lead engineering, founders, or whoever owns delivery. Schema audience: "Startup and scale-up founders and CTOs". FAQ heading: "Questions CTOs ask".
**Primary use case:** a growing backlog they can't hire their way out of, and agent-written code nobody senior is accountable for.
**Jobs to be done:**
- Ship backlog tickets faster without adding headcount.
- Get agent speed while a senior human stays accountable for what merges.
- Find out what their existing AI-written code is hiding (teardown, audit).
- Teach the team the agent workflow (workshop, fleet setup).
**Traffic sources (brief):** LinkedIn, YouTube, search. **GAP:** YouTube channel not live (`YOUTUBE_CHANNEL_ID = null`); no analytics or funnel numbers in the repo.

## Personas
| Persona | Cares about | Challenge | Value promised (live copy) |
|---|---|---|---|
| CTO / Head of Eng (decision maker) | security, merge quality, predictable cost | backlog > team capacity; agent code risk | reviewed PRs at a fixed price, security first |
| Founder (financial buyer) | speed, spend certainty | hiring takes months | 2–3x throughput, fixed price, first PR within days, guarantee |
| Lead dev (technical influencer) | conventions, review rigor | fear of noisy agent PRs | PRs follow their CLAUDE.md; adversarial review; log of what review caught |
**GAP:** no interview or call notes in the repo to confirm these beyond the FAQ ("the four objections the call kept raising", C16).

## Problems & Pain Points
**Core problem (live):** "Your backlog is growing and agent code needs review." "Agents without review ship bugs faster."
**Why alternatives fall short (FAQ):**
- Agency: sells a team's hours with a markup.
- More engineers: months to hire and ramp.
- AI review bot: cheap and worth running, but can't be held accountable for a merge.
- Day-rate contractor / staff-aug: buys time, not a reviewed outcome.
**Cost of inaction (sourced):** Veracode, July 2026: known vulnerability in ~44% of AI code-generation tasks (`VERACODE_LINE`, the only outside market figure allowed).
**Emotional tension:** fear of shipping an injection bug from agent code; distrust of "100x" hype.

## Competitive Landscape
**Direct:** other solo AI-dev consultants/agencies — **GAP:** none named in repo; do not invent.
**Secondary:** AI review bots — not accountable for a merge.
**Indirect:** hiring, agencies, day-rate contractors — slow or hour-based.

## Differentiation
- One senior human reviews every PR (capacity capped: one sprint or retainer at a time, `CAPACITY`).
- Security pass first on every PR.
- Fixed price before work starts; LLM/API usage included (except Fleet Setup).
- Risk reversal: "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it." (`GUARANTEE`) plus in-scope vuln in a reviewed PR fixed free.
- Public honesty: case study lists the 5 security bugs review missed; "2–3x, not 100x".
- Own harness: "20+ skills and 20+ hooks…" (`HARNESS_PROOF`).

## Objections (from `faqs`)
| Objection | Response (live) |
|---|---|
| Quality if agents wrote it? | Draft vs. merge decision; line-by-line review; log of what got caught |
| Agents fail a ticket? | I fix or write it; failed run costs me time, not you money |
| Security? | Veracode 44%; security first pass; 3 shell-injection paths caught on 30-PR run; in-scope vuln fixed free |
| IP / NDA / data | You own all code; NDA/DPA before access; tools agreed in writing |
| Who pays tokens? | Included in fixed price |
| Stack fit? | TS/JS, Node, Nest, React, Next, SQL, MongoDB; says so on the call if outside |
| Timezone | EET/EEST, async in writing |
| Why not agency/hire/bot? | see above |
**Anti-persona (`whoFor.notForList`):** rate shoppers; "100x" seekers who don't care who reviews; staff-aug seat with badge and standups.

## Switching Dynamics
**Push:** backlog growth; can't hire fast; agent PRs nobody senior reviews.
**Pull:** fixed price, first PR in ~48 h, guarantee, security-first review.
**Habit:** hiring plan / existing agency / "our devs already use Copilot".
**Anxiety:** handing repo access to a solo outsider; agent code quality; single point of failure (capacity one client at a time). **GAP:** no stated continuity/backup answer for "what if you're unavailable".

## Customer Language
**How clients describe him (verbatim, `testimonials`):**
- "Meticulous, smart and proactive. A true craftsman. Rock solid work." — testimonial in `data/index.ts` (CEO quote)
- "…told us up front when an estimate was too optimistic. He takes problems over and drives them forward without anyone having to push." — Alexandra Stroe, Co-founder & COO, Bono Fintech
- "He caught the contradictions in the handoff before any code was written…" — Paul Doros, Lead Developer, partner agency
- "Tasks disappeared as fast as I could add them." — Teodora Iojiban, PM, Bono Fintech
**How buyers describe the problem:** **GAP** (no verbatim prospect language; FAQ questions are Adi's phrasing of call objections).
**Words to use:** reviewed PR, merge-ready, security first, fixed price, backlog, line by line, accountable, 2–3x.
**Words to avoid:** 100x, "tests passed", "CI green", "caught all of them", "2.5 days", "1 missed", staff-aug, hourly.
**Glossary:** Reviewed PR = one ticket as one reviewed pull request; Sprint = fixed batch of PRs; Harness = rules, scripts, hooks and CI checks that keep agents on track; Teardown = free Loom review.

## Brand Voice
**Tone:** plain, direct, candid about limits. **Style:** short declaratives, numbers with sources, first person. **Personality:** meticulous, honest, skeptical of hype, calm. All site copy goes through `/adi-voice`.

## Proof Points (inventory — the ONLY usable proof)
| Proof | Source | Use limits |
|---|---|---|
| 30 PRs reviewed in under 3 days | 30-PR case study, `proofStats` | own dashboard, March 2026; no tests, no CI |
| 3 shell-injection paths caught before merge | same | never pair with "tests passed"/"CI green" |
| 5 security bugs review missed | case study only | never "1 missed"; listed only in the study |
| 2M+ concurrent viewers, PGL Major live graphics | `workExperience` | credibility, not offer proof |
| 300+ survey projects at Ipsos; mentored 3 juniors | `workExperience` | |
| GoSocial: -70% processing time; 10 h/week reporting removed | `workExperience` | |
| Bono Fintech: founding engineer (contract), Sep 2024–present; core platform, AI internal tools, led 2-engineer squad | `workExperience` | LinkedIn-level only, no product detail or numbers |
| Workflow ledger: 463 sessions · 335 h · 4,920 commits · 928 PRs opened (upper bound) · 66 days | `WORKFLOW_NUMBERS` | /about only per P2 |
| Honesty Gate: "real number" count was 0 | case study, client work (NDA) | never name the client |
| Cost per merged PR $73 → $32 (−57%), then +42% | cost case study, own setup | |
| 9 reviewed PRs merged in 100 minutes | nine-PR study | live 24 Oct 2026 only |
| 20+ skills, 20+ hooks | `HARNESS_PROOF` | |
| Veracode ~44% | `VERACODE_LINE` | only outside figure |
| 4 testimonials + Tim Claes (2022, /about + /ro/despre only) | `testimonials` | exact text, test-enforced |
| Sample sprint security report PDF | `SAMPLE_REPORT_URL` | redacted, from own run |
**Customers named:** Bono Fintech, the testimonial companies in `data/index.ts`, "partner agency" (unnamed), PGL, Ipsos, GoSocial (employers). No others.
**GAPS (drop the slot until real):** no paid client sprint/Reviewed PR result; no client-side metric for the core offer; no logos; no booking/conversion numbers; no workshop attendee quotes; no audit report results from a client.

## Goals
**Business goal:** booked Scoping Calls (Calendly `new-meeting`), teardown as fallback.
**Conversion action:** "Book a scoping call"; secondary "Get a free teardown".
**Current metrics:** **GAP** (Vercel Analytics exists in prod; no numbers in repo).

## Changelog
- v1 (2026-10-13) — Initial context, auto-drafted from CONTEXT.md, data/* and the live site for the #114 redesign.
