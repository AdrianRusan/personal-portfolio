# Portfolio Full-Site Lead-Gen Audit — adrian-rusan.com

**Date**: 2026-07-09
**Method**: Multi-agent ultracode workflow — 2 inventory agents → 9 expert lenses (positioning, offer, pricing, CRO, copywriting, trust, retention, SEO, technical UX) → each finding adversarially verified by a skeptic agent → synthesis.
**Scale**: 84 agents, ~3.9M tokens. 75 findings raised, **71 survived adversarial verification** (4 rejected as generic/unfounded). 37 hard claims inventoried.
**Business context (authoritative)**: ICP = startup/scale-up **founders & CTOs**. Proof status = **mixed/unverified**. Pricing = **fully open to restructure**. Stage = **not launched/marketed yet**. Primary goal = **booked Calendly scoping calls**; secondary = credibility + email/nurture capture.

> Positioning is strong and differentiated: *"Agent-Accelerated Delivery Sprints, Reviewed"* — an agent fleet ships volume, a senior engineer security-reviews every PR. The bones are good. The problems are (1) a **load-bearing proof integrity gap**, (2) a **legacy generic-freelancer layer** bleeding through metadata/footer/blog, and (3) a **leaky one-shot funnel** with no nurture capture.

---

## 1. Executive summary — the 5 highest-leverage moves

1. **Fix the proof-integrity crisis (P0-adjacent, do first).** The flagship number — *"30 reviewed PRs in 2.5 days · 3 shell-injection bugs caught"* — is repeated 6+ times sitewide as if it were client delivery, but your own blog reveals it was **your personal admin dashboard**, and the posts **contradict each other** (3 shell-injection vs "15+ security issues"; review time "2.5-7.5 hours" vs "2.5 days almost entirely review"). A CTO who clicks through catches this and every other number becomes suspect. **Reframe honestly as a self-run method benchmark, reconcile the numbers, or replace with a real attributed engagement.** This is the single largest trust hole.

2. **Purge the legacy generic-freelancer layer.** Metadata/OG/JSON-LD, the blog framing, and the footer still sell "Full-Stack Engineer from Romania / digital presence / portfolio." That's what Google, Slack link-previews, and AI crawlers ingest — and it prices you as a commodity contractor *before* the differentiator is ever seen. Rewrite title/description/OG/Twitter/JSON-LD to the positioning; rewrite the 2024-dated agency footer; reframe the blog index.

3. **Plug the funnel leaks.** The blog (your best cold entry point for the ICP) is a **100% conversion dead-end** — no nav, no booking CTA, no email capture on any post. There's **no persistent "Book a call" button** in the nav on any page, and the one nav item that converts ("Contact") routes to a **mailto** that competes with Calendly. Add a persistent booking CTA + blog conversion blocks.

4. **Add one email-capture + a real lead magnet.** €7.5k–€30k engagements aren't bought on first visit; the site captures the ~5% ready to book and loses the 95%. Use the review checklist you already reference ("The Agent PR Review Checklist — the checks that catch bugs the tests pass clean") as the magnet. One field, wired to any ESP.

5. **Rationalize pricing to single-anchor disclosure.** Today the page shows **nine priced SKUs** with **"from €X"** hedging that contradicts the three-times-stated "fixed price" promise, on a value metric (reviewed-PR count) that's a timesheet in disguise. Collapse to one flagship Sprint ladder + two "starts at" anchors; drop "from"; re-axis on outcome.

---

## 2. Prioritized action plan

**P0 = blocks launch / actively repels the ICP. Effort: S ≤1h · M ≤half-day · L ≥1 day.**

### P0 (3)
| id | page | section | fix | effort |
|---|---|---|---|---|
| positioning-1 / seo-1 / trust-8 / tech-8 | global | `app/layout.tsx` metadata + JSON-LD | Rewrite title/description/OG/Twitter + Person JSON-LD to the agent-delivery positioning; fix `sameAs` GitHub handle (`adrian-rusan`→`AdrianRusan`) | M |
| seo-4 / tech-9 | global | `app/sitemap.ts` | Drop all `/#fragment` entries (several point at removed sections); **add `/services`** (currently missing) | S |
| positioning-2 / cro-2 / trust-7 / tech-6 | home | `components/Footer.tsx` | Replace 2024-dated "digital presence" agency block; point CTA at Calendly not mailto; dynamic `{new Date().getFullYear()}` | M |

> **Proof integrity (trust-1, trust-3, trust-4 + claims ledger §5)** is verified at P1 but is functionally **P0** — treat it as launch-blocking. Grouped in the claims ledger below.

### P1 (23) — the launch-readiness core
| id | page | fix | effort |
|---|---|---|---|
| trust-1 | home | Re-label CaseStudy as a self-run method demo ("my own repo, run end-to-end") — stop implying client delivery | S |
| trust-3 | home | Soften ProofBand caption "Real numbers from real work. No projections" → defensible "a run I did myself, I'll walk you through it" | S |
| trust-4 | services | Scarcity: drop fabricated "Currently 2 sprints run… dated waitlist"; reframe as capacity *ceiling* (max 2, one reviewer) | S |
| trust-5 | global | Add real photo + credentialed bio near ShipVerify ("who's reviewing your code"); the "one accountable human" pitch needs a visible human | M |
| trust-6 | global | Stop leading proof on the off-ICP Tim Claes testimonial; substitute a method artifact (redacted sample PR review) | M |
| cro-1 / nurture-2 | blog | Add nav + end-of-post conversion block (book CTA + related posts) to every post — blog is a dead-end today | M |
| cro-3 | global | Add persistent "Book a call" Calendly button in `FloatingNav`; repoint "Contact" off the mailto | M |
| cro-4 | global | Point `CALENDLY_URL` at a named event (`/scoping-call`) matching the "20-min" copy — **create the event first** | S |
| nurture-1 | global | Add one email-capture surface (blog foot + homepage inline); wire to an ESP | M |
| nurture-5 | blog | Un-feature `hello-world.mdx`; feature `catching-shell-injection-agents-wrote.mdx` (or unpublish hello-world) | S |
| positioning-3 | blog | Reframe blog index H1/intro/meta off "React/Next tutorials" to agent-accelerated delivery | S |
| positioning-4 | home | Rename "Work Experience" → proof-of-seniority frame; surface fintech/security credential | S |
| cw-3 | services | ServicesHero H1: lead with outcome+guardrail, demote "priced before we start" to subhead | S |
| pricing-4 | services | Drop "from €X" everywhere — commit to number or tight band "fixed on the scope call" | S |
| tech-2 | home | Render Hero H1 as real server-visible text; make word-fade progressive enhancement (LCP + no-JS fallback) | M |
| tech-3 | global | Fix 4 blog type errors (`lib/blog.ts`, MDXContent, PostBody, blog/page), then remove `ignoreBuildErrors: true` | M |
| seo-3 | services | Add FAQPage + Service JSON-LD *(defer Offer/price schema until pricing locked)*; add OG image; reframe meta off the unverified "30 PRs" | M |

### P2 (30) & P3 (15)
Full list in §7. Highlights: single-anchor pricing disclosure (pricing-1/2/3/7/8), paid entry offer / down-sell below the €7.5k Pilot (offer-1), Retainer missing a guarantee (offer-2), `/llms.txt` for AI crawlers (seo-6), BlogPosting schema (seo-5), `title.template` (seo-7), `prefers-reduced-motion` (tech-5), broken `border-black/.1` Tailwind class (tech-10), replace Google verification placeholder (seo-8/tech-7), reframe borrowed Google/Coca-Cola/P&G brand credit (trust-9), CTA name/duration consistency (cro-7).

---

## 3. Copy rewrites (before → after)

| where | before | after |
|---|---|---|
| `layout.tsx` title | Adrian Rusan \| Full-Stack Engineer from Romania | Adrian Rusan \| Agent-Accelerated Delivery, Reviewed |
| `layout.tsx` desc | Explore the portfolio of Adrian Rusan, a full-stack engineer with 10+ years… React, Next.js, TypeScript | An AI agent fleet ships your backlog; a senior engineer security-reviews every PR before you see it. Fixed-scope delivery sprints for startup & scale-up founders and CTOs. |
| CaseStudy body | Nine agent batches ran a backlog through the harness in parallel. The agents produced 30 PRs… caught 3 shell-injection vulnerabilities | This one's my own repo, run end-to-end to show the mechanics. Nine agent batches produced 30 PRs for an internal admin dashboard. The review still caught 3 shell-injection bugs the tests passed clean — the exact failure this service exists to catch. |
| ProofBand caption | Real numbers from real work. No projections, no "up to." | Every number here is from a run I did myself — the repo, the PRs, and the review notes are real, and I'll walk you through them on a call. |
| Scarcity | Currently 2 Delivery Sprints run at a time. When both slots are taken, new engagements join a dated waitlist. | I run at most 2 Delivery Sprints at a time — the review layer is one person and doesn't parallelize. If both slots are full, I'll give you the next honest start date rather than overcommit. |
| Footer H2 | Ready to take your digital presence to the next level? … Copyright © 2024 | Still weighing it? Book a 20-min scoping call — you'll leave with a fixed price and scope, no obligation. © {current year} |
| ServicesHero H1 | Reviewed outcomes at agent speed — priced before we start | Your backlog, shipped at agent speed — every PR security-reviewed before you see it |
| Blog index | Blog / Writing about React, Next.js, TypeScript… | Field notes on agent-accelerated delivery / How I ship production software with an agent fleet — and the senior review layer that catches what the agents miss. |
| Experience H2 | Work Experience | Where the senior judgment comes from |
| Pricing rows | Price · from €7,500 · from €14,500 · from €24,000 | €7,500 · €14,500 · €22k–26k — fixed on the scope call, locked day 0, no runaway bill |

> ⚠️ Every "after" here is a **starting draft**, not final. Several verifier notes flag that the rewrites lean em-dash-heavy or slightly over-clever — tighten at implementation. **Do not bake any unverified metric ("2-3x", "30 PRs") into copy as hard fact** until §5 is resolved.

---

## 4. Recommended pricing architecture (pricing is fully open)

**Problems today**: 9 visible SKUs (choice overload); "from €X" contradicts the "fixed price" promise stated 3×; value metric = reviewed-PR count (a work-unit/timesheet proxy, non-comparable across teams, invites "we only got 10 PRs" disputes); three entry tiers collide at ~€7k meaning three different things; retainer prices *cheaper* per-PR than the sprint (inverts the value story); no true entry offer for a cold buyer.

**Recommended structure:**

1. **One flagship, shown as good-better-best.** Lead the page and homepage with the **Delivery Sprint** ladder only. Demote **Retainer** and **Harness Setup** to a single "Also available — starts at €X, scoped on the call" line each. One price ladder visible, two soft anchors, everything else on the call.

2. **Single-anchor disclosure.** One line in the hero: *"Sprints start at €7,500 — most engagements land €12k–18k, fixed on the scope call."* Keep the detailed 3-tier table for the scroller. Makes the hero anchor and the "I'll tell you the number" close consistent, filters hourly-rate shoppers, sets a budget frame.

3. **Re-axis the value metric onto the outcome**, not PR count. Price against *"a reviewed backlog slice + the security findings log"* (the page already calls the findings log "the artifact the sprint is selling"). PR range becomes a small-print scoping input, never the headline beside price. Row label "Roughly ~5–6 PRs" → "Backlog cleared: a focused feature slice, reviewed end-to-end (~5–6 PRs)."

4. **Engineer a real anchor + volume break.** Establish the top tier (Scale) first and visibly so it anchors; price the "Recommended" middle tier so its per-outcome value is clearly best (a visible volume break vs Pilot) — today tiers scale flat at ~€1,300/PR with no reason to pick the middle.

5. **Drop "from" entirely.** Specific number framed "fixed on the scope call," or a tight honest band ("€12,000–€15,000"). Never an open-ended floor on a page selling fixed price.

6. **Add a paid entry offer / down-sell below the €7,500 Pilot** (offer-1): a fixed-fee *"One Reviewed PR"* or *"Agent-Reviewed Teardown"* — ~€750–1,500, ~48h, **fully credited toward any sprint booked within 30 days**. Buyer sends one real task; you demonstrate the method on their code at low risk. This is the missing first rung for a cold founder.

7. **Give the Retainer a guarantee** (it carries the biggest commitment — €21k–66k over 3 months — yet is the only offer with none): the Sprint's security guarantee verbatim + a proof-month reversal (month 1 is the trial; miss the reviewed-PR cadence → cancel at month end). Price it on **reserved capacity + commitment**, and if per-PR is lower, *name it* as a deliberate commitment discount rather than letting a sharp CTO notice the flagship gets undercut.

8. **Frame all numbers as launch pricing**, not battle-tested rate cards (the PR-throughput they're derived from is a self-run benchmark — see §5).

---

## 5. Trust & claims ledger — 37 hard claims, all UNVERIFIED at audit time

Legend: **KEEP** (defensible as-is) · **EVIDENCE** (true but needs attribution/artifact) · **REFRAME** (soften/restate) · **CUT/RECONCILE** (remove or fix contradiction). Founder must mark each.

### 🔴 Critical — the proof edifice (resolve before launch)
| claim | locations | verdict | what's needed |
|---|---|---|---|
| "30 reviewed PRs · 9 batches · 2.5 days" | proofStats, CaseStudy, ServicesHero, blog, /blog link — **6+ places** | **RECONCILE** | Blog reveals it's your **own admin dashboard**, not client work. Reframe as an explicit self-benchmark, or link a redactable artifact (PR list + timestamps). |
| "3 shell-injection vulnerabilities caught" | proofStats, Hero, ProcessSteps, FAQ, HarnessSetup, ServicesFinalCta | **RECONCILE** | Blog says "15+ security issues… three PRs had shell injection" and the write-up is "sanitized reconstructions." Number shifts 3 vs 15+ across sources. Pick one defensible number + state provenance. |
| "Real numbers from real work. No projections." | ProofBand caption | **REFRAME** | Explicitly stakes credibility on the stats being literal client-real. Turns any inflated stat into a falsehood. Soften unless every stat is client-verifiable. |
| "2-3x faster" (+ "small team's throughput") | Hero, ShipVerify, FinalCta, FAQ, every post | **REFRAME** | Baseline is self-reported ("~a week solo"). State the baseline or make it directional; don't assert as measured fact. |
| "Currently 2 Sprints run… dated waitlist… retainers hold a permanent slot" | Scarcity | **CUT** | Fabricated present-tense demand for a pre-launch service with zero clients. Reframe as a capacity ceiling. |
| Blog posts internally contradict | claude-code-…mdx vs 30-prs / shell-injection posts | **RECONCILE** | Review time "2.5-7.5 hrs" vs "2.5 days almost entirely review"; 3 vs 15+ bugs; personal dashboard vs implied client. Highest-severity: your marketing and your own narrative disagree. |

### 🟡 Attribution / consistency
| claim | verdict | note |
|---|---|---|
| Tim Claes testimonial (only one on site) | **REFRAME/REPLACE** | Off-ICP (freelance peer, "web related projects"), not a founder/CTO about agent delivery. Don't headline it. Never fabricate a replacement. |
| "Bono Fintech" in ProofBand + TrustStrip | **RECONCILE** | Appears as career waypoint but **absent from workExperience[]**. Reconcile the two lists; confirm name-use permission (trust-10). |
| "300+ projects for Google, Coca-Cola, P&G" | **REFRAME** | These were *Ipsos's* end clients, not yours. Reframe as "projects for Ipsos accounts including…" (trust-9). |
| "10+ years" | **KEEP (verify)** | Earliest role Jun 2016 → ~9-10 yrs by 2026. Borderline; confirm career-start date. |
| Employer strip = engagements? | **EVIDENCE** | Confirm each relationship + permission; label employers vs clients honestly. |
| Guarantees ("48h or 25% off", security re-review, working-harness) | **KEEP (operationalize)** | Forward promises, low fabrication risk — but must be genuinely deliverable before a client invokes them. |

### 🟢 Housekeeping tells
- `Copyright © 2024` (Footer) → dynamic year. **CUT.**
- `google: 'your-google-verification-code'` placeholder shipped to prod → set real token or remove. **CUT.**
- Commented-out company logo strip (cloudinary/appwrite/etc.) = tools not clients → **do NOT re-enable** as social proof.
- Stale `gridItems`/`projects[]` (ShopValue, NextHub, "JS animation library") in `data/index.ts` → dead off-positioning content, purge so it can't resurface.
- Sitemap anchors (`/#about`, `/#projects`, `/#approach`) point at removed sections → reconcile.

---

## 6. Retention & launch-readiness checklist

**Nurture (the 95% not ready to book) — currently zero capture:**
- [ ] Email capture: blog post foot + slim homepage inline block (between ProofBand/ShipVerify) + replace dead footer mailto. One field. (nurture-1/2/6)
- [ ] Lead magnet: **"The Agent PR Review Checklist — the checks that catch bugs the tests pass clean."** Email → PDF/Notion. On-differentiator, low-maintenance, ICP-fit. (nurture-3)
- [ ] Blog as living engine, not a launch dump: stagger the 4 same-day posts across dates; commit to a visible cadence; broaden into evergreen CTO-decision topics (nurture-4). Un-feature hello-world (nurture-5).
- [ ] Make email the primary subscribe path; keep RSS secondary (nurture-7).
- [ ] Blog conversion blocks: related posts + soft book-a-call at post foot (cro-1/nurture-2).
- [ ] Wire an ESP before promising any cadence — a signup that posts nowhere / a promised newsletter that never ships damages credibility more than no capture.

**Pre-launch go-live checklist:**
- [ ] Resolve §5 proof integrity (reconcile numbers, reframe self-benchmark honestly) — **launch-blocking**
- [ ] Metadata/OG/JSON-LD rewritten to positioning; `sameAs` handle fixed; OG image self-hosted + positioning-led
- [ ] Real Google verification token (remove placeholder)
- [ ] `npx tsc --noEmit` green; `ignoreBuildErrors` removed
- [ ] `CALENDLY_URL` → named event created + matching copy
- [ ] Persistent booking CTA in nav on all pages; no CTA routes to mailto
- [ ] Real photo + credentialed bio present
- [ ] Footer year dynamic; agency copy gone
- [ ] Sitemap = real routes only, includes `/services`
- [ ] Pricing: single-anchor disclosure, no "from", one flagship ladder
- [ ] `/llms.txt` published for the AI crawlers robots.ts already invites
- [ ] FAQPage + BlogPosting schema (defer Offer/price schema until pricing locked)

---

## 7. Findings by lens (full record)

**Counts (survived):** Trust & credibility 11 · SEO 10 · CRO 8 · Technical UX 8 · Positioning 7 · Copywriting 7 · Pricing 7 · Retention 7 · Offer 6. **Priority:** P0 ×3 · P1 ×23 · P2 ×30 · P3 ×15. Rejected by verifiers: 4.

Detailed per-finding data (issue / why-it-costs-leads / fix / before-after / verifier downside) is preserved in the workflow journal at
`.../subagents/workflows/wf_5a92797f-36b/journal.jsonl`
and the extracted working set at `scratchpad/audit-data.json`. Key P1 items are inlined in §2–§6 above; P2/P3 one-liners:

- **Pricing**: single-anchor disclosure (pricing-8), collapse 9 SKUs to 1 flagship + 2 anchors (pricing-2), fix anchor collision at ~€7k (pricing-3), re-axis value metric off PR count (pricing-1), homepage soft anchor (pricing-7), retainer commitment-discount framing (pricing-6).
- **Offer**: paid entry offer below Pilot (offer-1), Retainer guarantee + proof-month (offer-2), reversal on a quality not speed trigger (offer-3), name the security-log/failure-map as keepable assets (offer-4), promote "contractor-month" anchor out of the table cell (offer-5), unify tier vocabulary (offer-6).
- **CRO**: mid-page booking CTA after ShipVerify (cro-5), standardize CTA name+duration (cro-7).
- **Copywriting**: rewrite 40-word feature-first hero subhead (cw-1), link "…what the agents get wrong" once (cw-2), drop honesty meta-claim → link the proof (cw-4), plain-language "two-step…three ways" (cw-5), cut "AI-Native" eyebrow buzzword (cw-6), make "fintech-adjacent" concrete (cw-7).
- **Positioning**: demote off-ICP testimonial (positioning-5), add founder-facing business outcomes alongside CTO mechanics (positioning-6), attach ", Reviewed" consistently (positioning-7).
- **Retention**: lead magnet (nurture-3), blog cadence (nurture-4), footer email capture (nurture-6), email over RSS (nurture-7).
- **SEO**: Service/ProfessionalService schema (seo-2), BlogPosting schema per post (seo-5), `/llms.txt` (seo-6), `title.template` + descriptive blog title (seo-7), stagger/de-dup post dates (seo-9), self-hosted positioning OG card (seo-10), real verification token (seo-8).
- **Technical UX**: `prefers-reduced-motion` handling (tech-5), fix `border-black/.1`→`/10` invalid class (tech-10), replace verification placeholder (tech-7).
- **Trust**: reframe Google/Coca-Cola/P&G borrowed credit (trust-9), confirm/permission Bono Fintech (trust-10), verification placeholder (trust-11), replace PGL "millions of fans" vanity metric (trust-12).

---

*Generated by the `portfolio-lead-audit` ultracode workflow. The synthesis agent hit a session limit; this report was assembled from the workflow journal by the main session. Every finding here survived an independent adversarial-verification pass.*
