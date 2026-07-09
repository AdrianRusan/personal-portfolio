# Pricing & Offer Restructure — Proposal (Group A)

**Date**: 2026-07-09 · **For sign-off before implementation** · Addresses audit findings pricing-1/2/3/6/7/8 + offer-1/2/3/4/5/6.

This is one coherent redesign of the `/services` money section and the homepage Offers block. Pricing is fully open — this proposes the optimal architecture for the ICP (startup founders & CTOs buying reviewed agent-speed delivery). One recommended design, with the decision forks called out at the end.

---

## The problems today

1. **Nine priced SKUs** shown before the call (Sprint 3 + Retainer 3 + Harness 3) — choice overload for a consultative sale, and it fights the page's own "I'll tell you the number on the call" close.
2. **Value metric is "reviewed PRs"** — a unit of *effort*, not *outcome*. It hands the buyer a per-PR rate (~€1,160–1,360/PR) and invites "we only got 10 PRs, we overpaid" disputes. A PR is non-comparable across teams.
3. **Anchor collision at ~€7k**: Pilot Sprint €7,500 (one-off), Steady Retainer €7,000/mo (recurring), Harness Install €9,000 (setup) — three different commitments reading as the same number.
4. **Retainer prices *cheaper* per-PR** than the one-off Sprint (€890 vs €1,160) with no framing — a sharp CTO notices the flagship gets undercut.
5. **No entry offer** — the ladder starts at €7,500, too big a first commitment for a cold founder buying an unproven "agent" service.
6. **Weak risk reversal** — "first PR in 48h or 25% off" rewards *speed* (a vanity metric), not the *quality* the buyer is actually anxious about.
7. **Strongest anchor buried** — the "senior contractor-month of output, reviewed, in two weeks" equivalence sits in a table cell.

---

## Recommended architecture

**Principle: one flagship, one anchor, priced on the outcome.** Collapse to a single visible Sprint ladder; demote Retainer + Harness to one "starts at" line each; add a paid entry rung; reframe the value metric and the guarantee.

### Tier 0 — NEW entry offer: "The Reviewed PR" (de-risks the cold buyer) — offer-1
- **What**: You send one real ticket from your backlog. An agent ships it; I security-review it line-by-line; you get the merge-ready PR + a one-page review report showing exactly what the review caught.
- **Price**: **€1,000 flat**, delivered in ~48h.
- **The hook**: **fully credited toward any Sprint booked within 30 days.** So it's a risk-free trial of the entire method — on *your* codebase, not a case study.
- **Why it works**: turns "trust an unproven agent service with €7.5k" into "spend €1k to watch it work on my code." It's also the honest proof the site otherwise lacks.

### Tier 1 — The flagship: Delivery Sprint (the ONLY visible 3-tier ladder)
Priced on the **outcome + the artifacts**, PR range demoted to a scoping detail (pricing-1). Numbers kept (they were research-backed), "from" already dropped.

| Rung | Price | The outcome (what's sold) | ~scope (small print) |
|---|---|---|---|
| **Pilot** | **€7,500** | A focused feature slice, shipped and reviewed end-to-end | ~5–6 PRs · 3–5 days |
| **Standard** ⭐ *Recommended* | **€14,500** | **A senior contractor-month of output — reviewed — in two weeks** | ~10–15 PRs · 1–2 wks |
| **Scale** | **€24,000** | A major surface, shipped and reviewed in depth | ~16–20+ PRs · 2–3 wks |

- **Anchor moves (pricing-3, offer-5)**: present **Scale first / most visibly** so it anchors; make **Standard the visually-recommended "best value"** with the contractor-month equivalence promoted to a headline line *above* the table, not a cell: *"A senior contractor costs ~€10–14k/month and takes weeks to onboard. Standard ships a reviewed contractor-month in two weeks — €14,500, fixed."*
- Every price framed **"fixed on the scope call"**, not "from".

### Tier 2 — Also available (demoted from full tables → one line each)
This is what kills the 9-SKU overload and the €7k collision (pricing-2, pricing-3, cro-6).

- **Delivery Retainer** — *"A permanently reserved senior-review slot + a committed monthly reviewed-PR band. Starts at €9,000/mo (3-month commitment). ~20–30% below one-off Sprint rate — that's what the commitment buys."* → link/expander for detail.
  - Raising the entry from €7,000 → **€9,000/mo** clears the collision with the €7,500 Pilot and stops the retainer visually undercutting the Sprint (pricing-6). The lower per-PR rate is now *named* as a deliberate commitment discount, not an accident.
- **Agent Harness Setup** — *"I install and harden the ship/verify harness in your repo so your team ships at agent speed with the guardrails built in. Starts at €9,000."* → link/expander.

Result: **one** 3-tier ladder visible (Pilot/Standard/Scale), **two** "starts at" anchors, everything else on the call. Tier-naming inconsistency disappears because only the Sprint shows a ladder (offer-6).

### Single-anchor disclosure (pricing-7, pricing-8)
- **Services hero**: one line — *"Delivery Sprints start at €7,500 — most engagements land €12–18k, fixed on the scope call."*
- **Homepage Offers**: lead with the Sprint as the primary card + soft anchor (*"Sprints from €7,500 — most €12–18k"*); Retainer + Harness rendered smaller/secondary.
- Keep the detailed Sprint table for the scroller; the hero anchor and the "I'll tell you the number" close now agree (anchor sets the floor, call sets the figure).

### Risk reversal — switch from speed to quality (offer-3)
- **Primary (the Pilot/Reviewed-PR is the proof vehicle)**: *"If the first reviewed PR isn't merge-ready to your standard, you don't pay for it."* — a *quality* promise, which is what the buyer is actually anxious about.
- **Keep the security guarantee**: *"If an in-scope vulnerability is later found in a PR I marked reviewed, I fix it free and re-review the surrounding batch."*
- Drop the "48h or 25% off" speed trigger (or keep it as a secondary SLA, not the headline).
- ⚠️ **Operational commitment** — only adopt "you don't pay if not merge-ready" if you're prepared to honor it. It's strong precisely because it's real.

### Give the Retainer a guarantee (offer-2)
It carries the biggest commitment (3 months × €9k+ = €27k+) yet currently has none.
- Apply the Sprint's security guarantee verbatim.
- **Proof-month**: month 1 is the trial — if the agreed reviewed-PR cadence isn't hit, cancel at the end of month 1, no further obligation. Softens the 3-month commit without discounting.

### Name the deliverables as keepable assets (offer-4)
The value stack is currently four flat bullets. Elevate the two that are genuinely differentiated:
- **The Sprint Security Report** — every vulnerability class checked; what was caught and fixed; written up. *Yours to keep.*
- **The Agent Failure Map** — what the agents consistently got wrong on *your* codebase, so your own CLAUDE.md/harness gets better. *Yours to keep.*

---

## What changes on the pages (implementation scope, once approved)

- `components/services/DeliverySprint.tsx` — promote contractor-month anchor above table; mark Standard "Recommended"; reorder so Scale anchors; reframe rows to outcome-first.
- `components/services/Retainer.tsx` + `HarnessSetup.tsx` — collapse from 3-tier tables to a single "starts at" card each (+ optional expander).
- `components/services/ServicesHero.tsx` — add the single-anchor line.
- `components/services/DeliverySprint.tsx` (guarantees) + `ServicesFaq.tsx` — swap reversal to the quality trigger; add retainer guarantee + proof-month.
- **NEW** entry offer block (`components/services/EntryOffer.tsx`) — "The Reviewed PR" €1,000, credited.
- `components/Offers.tsx` + `data/index.ts` (offers) — homepage leads with Sprint + soft anchor; Retainer/Harness secondary.
- Value stack copy — name the Security Report + Failure Map.

Estimated: ~M–L, one workflow, file-partitioned like the previous batches.

---

## Decisions — LOCKED 2026-07-09

1. Sprint numbers: **keep** €7,500 / €14,500 / €24,000.
2. Retainer entry: **raise €7,000 → €9,000/mo** (clears the collision, stops undercutting the Sprint).
3. Entry offer: **YES — "The Reviewed PR", €1,000, credited** toward a Sprint booked within 30 days.
4. Risk reversal: **YES — quality trigger** ("first reviewed PR not merge-ready to your standard → you don't pay for it"); keep the security guarantee. Owner has confirmed this is operationally honorable.
5. Retainer guarantee + **proof-month**: YES (security guarantee + cancel-at-month-1 if cadence missed).
6. Disclosure: **single anchor visible** — "Sprints start at €7,500 — most land €12–18k, fixed on the scope call."
7. Value stack: name **The Sprint Security Report** + **The Agent Failure Map** as keepable assets.
