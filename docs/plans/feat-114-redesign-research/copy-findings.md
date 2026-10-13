# Copy findings — message hierarchy, headlines, objections, levers

**Verdict:** keep the voice (plain, specific, candid about limits) and rebuild the order: accountability first, honest proof second, smallest paid step third. Every line below reuses proof from `data/*` or `.claude/CONTEXT.md`; where proof is missing it says **drop the slot**. All final EN + RO copy still goes through `/adi-voice`, and RO strings live in `data/ro*.ts`.

## Top 3 copy directions
1. **Sell the accountable merge.** The site's sharpest lines are "The agent writes a draft. I decide what merges." (FAQ) and "Generation was never the slow part. Review is." (/about). Both are buried. Promote them to hero/problem level.
2. **Make the honesty the proof.** Own-repo numbers labelled as own-repo, the 5 misses listed in the case study, "2–3x, not 100x". With no client metric for the core offer, candour is the differentiator a skeptical CTO can check.
3. **Sell the first step, not the ladder.** Free teardown → Reviewed PR €1,000, paid after you've seen it → Delivery Sprint, with the 30-day credit. One path per page; the ladder lives on /services.

## Message hierarchy per page (order = what the reader must believe, in sequence)

| Page | 1. Claim | 2. Why believe | 3. Risk removed | 4. Ask |
|---|---|---|---|---|
| `/` | Agents ship your backlog, I review every PR, security first | 30 PRs / 3 shell injections caught (own dashboard, Mar 2026); Doros quote; 10+ yrs | Guarantee; fixed price; tokens included | Scoping call (teardown as text link) |
| `/services` | Fixed-price reviewed PRs, 2–3x throughput | Process (scope call → agents → review → handoff); sample security report | Reviewed PR paid after you see it; credit; NDA/IP FAQ | Scoping call; "start here" = Reviewed PR |
| `/about` | Review is the slow, valuable part, and I'm the reviewer | Work history (PGL 2M+, Ipsos 300+, GoSocial, Bono founding eng.); ledger numbers; harness | Writes async; "how the numbers are counted" | Scoping call |
| `/contact` | Three ways in, response times stated | Legal entity, location, hours overlap | Email within one working day | Scoping call dominant |
| `/teardown` | See what your AI code is hiding, free | "review caught 3 shell-injection paths before merge" | NDA, private repo, nothing published | Send repo (call as fallback) |
| `/work` | Documented runs, with misses | Provenance labels per study | Every miss listed | Scoping call after the list |
| `/ro` | Same as `/` | Same proof, translated | Same | Programează o discuție; RO fallback (not the EN teardown) |

## Headline options (hero `/`)
- **A (keep):** "I ship your backlog with AI agents and review every PR myself." Matches the LinkedIn headline; best for LinkedIn traffic.
- **B:** "AI agents write the code. I decide what merges." From the FAQ. Shortest statement of the accountability idea; needs the subhead to say "backlog" and "security first".
- **C:** "Your backlog, shipped by AI agents and security-reviewed by me, PR by PR." Leads with the reader's noun (backlog).
Subhead (keep, already sourced): "Security first: injection, auth, secrets and access control, checked line by line before a PR reaches you. Expect 2–3x the throughput, not 100x."

**Problem section:** "Generation was never the slow part. Review is." then the 30-PR line ("with no tests and no CI, review was the only gate").
**/services hero:** keep "Ship your backlog 2–3x faster. I security-review every PR before you see it." Entry-offer section: "Start with one ticket. €1,000, paid after you've seen the PR."
**/teardown alt:** "Send me a repo. You get a 15-minute video of what I'd block in review." (same facts as the live heading).
**CTA labels:** "Book a 30-minute scoping call" + microcopy "You leave knowing which offer fits and what it costs. Scope and fixed price in writing within one working day." Avoid "Get started" / "Learn more".

**Watch-outs in live copy:** "Expect 2–3x the throughput, not 100x" and "Agents give you 2–3x throughput, not 100x" are contrast constructions; keep one instance (it's a real positioning claim), state it plainly elsewhere. Em dashes in `LEDGER_PROOF`-style short lines are fine in body, not in headlines.

## Objection list
Answered on the site (keep, shorten to answer-first):
1. Quality of agent code → draft vs. merge decision; review log per sprint.
2. Agent fails a ticket → I fix or write it; costs me time, not you money.
3. Security → Veracode ~44% (only outside figure); security first pass; 3 caught; in-scope vuln in a reviewed PR fixed free.
4. IP, NDA, data, which AI tools → you own it; NDA/DPA first; tools agreed in writing.
5. Who pays tokens → included (except Fleet Setup).
6. Stack fit → TS/JS, Node, Nest, React, Next, SQL, MongoDB; says so if outside.
7. Timezone / meetings → EET/EEST, async in writing.
8. Payment terms, invoicing, currency → fixed EUR ex-VAT, 50/50 sprints, Reviewed PR after delivery.
9. Why not agency / hire / review bot / day-rate → hours vs. reviewed outcome; bot can't be accountable.
10. What counts as a PR → one ticket, split on the scope call if too big.

Raised by the offer but unanswered (**GAP, needs Adi's real answer, don't invent**):
- "You're one person. What if you're sick or booked?" (only `CAPACITY` + "I'll tell you the next start date").
- "Have you done this for a paying client?" → honest answer is the NDA/own-repo labelling; **drop the slot** for a client sprint result until one exists with consent.
- "My team already uses Copilot/Cursor. Why you?" → partly covered by Train/Build tiers; no proof of team outcomes, so no claim.

## Psychological levers

**Honest here (use):**
- **Risk reversal / regret aversion:** `GUARANTEE` and "paid after you've seen the PR" are real terms. Put them at every money CTA (already the rule: printed once per page in the hero).
- **Pratfall effect:** the 5 listed misses and "2–3x, not 100x" raise trust because they are verifiable.
- **Reciprocity:** the free teardown gives real value first; "Why is this free?" states the motive openly.
- **Foot-in-the-door / commitment:** teardown → €1,000 Reviewed PR → sprint, with the real 30-day credit (`CREDIT_TERMS`).
- **Hick's law / paradox of choice / default:** one ask per page, Ship-only ladder on `/`, Reviewed PR marked "start here".
- **Authority via specificity:** dated, sourced numbers (30, 3, 2M+, 300+, ledger) and named testimonials with roles.
- **Genuine scarcity:** "one sprint or retainer at a time" is a real capacity limit (`limited: true`). State it; no counters.
- **Mental accounting:** the computed per-PR band (€950–1,500) next to the sprint price; it's derived from real sizes.
- **Liking / similarity:** photo, first person, Timișoara, CTO-phrased FAQ.

**Manipulative or unprovable (don't):**
- Countdown timers, "2 slots left this month", fake deadlines (no data; violates brief R6).
- Struck-through "was" prices, charm pricing (€997), decoy tiers; prices and ladder are fixed.
- Bandwagon numbers ("trusted by 50 teams"), logo walls beyond the names already shown, invented quotes. **Drop the slot.**
- Fear framing that overstates Veracode ("half your AI code is vulnerable", "your app is already compromised").
- Implying the 30-PR run was client work, or "tests passed" / "CI green" / "caught all of them" / "1 missed".
- Follow-up pressure or exit-intent popups: contradicts "I don't follow up unless you ask".
- "100x" or velocity claims beyond 2–3x; naming any client beyond Bono Fintech, the testimonial companies in `data/index.ts`, "partner agency".
