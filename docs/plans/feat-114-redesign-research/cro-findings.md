# CRO findings — live site, 2026-10-13

**Verdict:** the site is honest and objection-complete; it loses conversions to *too many doors on the home page* and *proof that isn't about the core offer*. Goal per page = Book a Scoping Call (Calendly `new-meeting`); teardown is the fallback.
**Basis:** Markdown twins + rendered HTML of /, /services, /about, /contact, /teardown, /work, /ro, plus `data/*`. Not checked: visual weight of buttons, mobile layout at 390 px, the post-submit state of the teardown form, real traffic or conversion numbers (none in repo — **GAP**). Low traffic means most "test ideas" are sequential before/after changes, not A/B tests.

## Top 5 (ranked by expected impact)
1. **Home shows the whole 8-offer ladder (from €200 to €24,000) before "Who this is for".** Four tier cards, each "from €X", turn a visitor who came for "ship my backlog" into someone comparing a €200 call, an audit and a workshop. Show only the Ship path on `/` (Reviewed PR €1,000 → Delivery Sprint from €7,500 → Retainer from €4,000/month) plus one "Other ways to work with me (advice, training, builds) →" link to `/services#ladder`. Prices unchanged; presentation only.
2. **The strongest proof isn't next to the ask.** The hero's three stats mix offer proof (30 PRs, 3 injections) with a credibility stat (2M+ PGL viewers) that says nothing about reviewing agent code. The one quote that *is* about review judgement, Paul Doros ("caught the contradictions in the handoff before any code was written"), sits only on /services. Put Doros beside the Verify step on `/`; keep 2M+ in the bio, not the proof band (or keep it, labelled as background).
3. **No client result for the core offer, and the page doesn't say so plainly.** Every number for the reviewed-PR offer comes from own projects (labelled "Own project" / "Own setup" — good). Don't fill the slot. Make the label the feature: "Measured on my own repos; client work is under NDA." Drop any layout slot designed for a client-metric or logo wall.
4. **RO funnel breaks at the fallback.** `/ro` hero secondary CTA is "Teardown gratuit (EN)" → English page and form; case studies and blog are EN-only. A Romanian visitor who isn't ready to book has no Romanian next step. Fix: RO teardown page (copy in `data/ro*.ts`), or make the RO secondary CTA the email (`contact@`) in Romanian.
5. **Paid €200 call is a `mailto:` door on /services** ("Email me to book the €200 call"). It competes with the free Scoping Call and adds friction (write an email, wait). Keep it, but visually below the free call, and swap to Stripe/Calendly when the open item lands. Never create a second Calendly event (free plan).

## Per page

### `/` (home)
- **5-second test:** pass. H1 "I ship your backlog with AI agents and review every PR myself." matches the LinkedIn headline (message match for LinkedIn traffic). Guarantee directly under it.
- **Primary ask:** Book a scoping call (hero, nav "Book a call", closing CTA). Secondary: free teardown.
- **Friction:** 11 sections; full ladder (#1); 2M+ in proof band (#2); generic button copy "Book a scoping call" says the action, not the payoff; testimonials (Tufeanu, Stroe) speak to reliability, not agent review.
- **Fixes, ranked:** (1) Ship-only ladder; (2) Doros quote next to Verify; (3) button + microcopy under it: "30 minutes. You leave with the scope and a fixed price in writing within one working day." (already true, `callSteps`); (4) make the teardown CTA visibly secondary (text link, not twin button); (5) move "Who this is for" above prices so the not-fit list filters before people price-compare.

### `/services`
- **5-second test:** pass. "Ship your backlog 2–3x faster. I security-review every PR before you see it."
- **Primary ask:** Book a scoping call. Paid entry: Reviewed PR €1,000.
- **Friction:** 8 offers in 4 tiers with no "start here" marker beyond one sentence; €200 mailto (#5); 8 long merged FAQ answers; "every miss listed in the case study" is honest but abstract.
- **Fixes:** (1) mark Reviewed PR as "Start here" visually and say why (paid after you've seen it); (2) a 3-question chooser above the ladder: "Want code shipped? → Ship. Want your team doing it? → Train/Build. Want a second opinion? → Advise." (3) put the Sprint size table (Pilot/Standard/Scale, PR counts) where the sprint is, not deep in the page; (4) FAQ answers lead with the one-line answer, detail after; (5) sample security report link next to the Sprint price.

### `/about`
- **5-second test:** pass; "Generation was never the slow part. Review is." is the sharpest line on the site.
- **Primary ask:** relies on nav + shared closing CTA.
- **Friction:** reads as a CV; the workflow ledger (463 sessions…) is buried at the end; no photo-adjacent CTA.
- **Fixes:** (1) closing CTA with the guarantee; (2) promote the "How the numbers are counted" block — it's the trust differentiator for skeptical CTOs; (3) keep the Tim Claes quote here only (test-enforced).

### `/contact`
- **5-second test:** pass. Three options, response times, legal entity (CIF), location.
- **Friction:** low. The three options are equal-weight.
- **Fixes:** (1) make the Scoping Call the visually dominant option; (2) Calendly inline embed or the "what happens after you book" 3 steps here too.

### `/teardown`
- **5-second test:** pass. Clear free offer, 2–3 business days, trust notes for private repos and NDAs.
- **Friction:** "I only need your email" while the form also asks for a repo/PR link; post-submit next step unknown (**not checked**); no link to the sample security report as a preview of the output.
- **Fixes:** (1) "Your email and a repo or PR link. Nothing else."; (2) show what the Loom covers via the redacted sample report; (3) thank-you state offers the Scoping Call (once, no pressure — matches "I don't follow up unless you ask").

### `/work`
- **5-second test:** pass for researchers; 3 studies (nine-PR study goes live 24 Oct).
- **Friction:** index ends without a dedicated CTA tied to what the reader just saw; Markdown twin drops the figure/labels shown in HTML.
- **Fixes:** (1) closing CTA "Want this review on your backlog? Book a scoping call."; (2) keep provenance labels (Own project / Client work (NDA) / Own setup) prominent; (3) each case study ends with the Reviewed PR €1,000 entry offer.

### `/ro`
- **5-second test:** pass; true parity with `/`, "Prețuri pentru firme cu sediul în România" is clear.
- **Friction:** EN-only fallback (#4); "Studiile de caz și articolele sunt în engleză" is honest but a dead end.
- **Fixes:** (1) RO teardown or RO email fallback; (2) apply the same Ship-only ladder and Doros placement as EN.

## Test / measure ideas (instrument first: Calendly click events via `lib/analytics.ts`)
1. Ship-only ladder on `/` vs. full ladder: hero-to-Calendly click rate.
2. Hero button copy: "Book a scoping call" vs. "Find out what it costs in 30 minutes" (live claim: "You leave knowing which offer fits and what it costs").
3. Teardown as text link vs. second button: Calendly clicks vs. teardown submits.
4. Doros quote beside Verify vs. current testimonials block.
