# Ship / Verify — Pricing Strategy (2026-07-09)

Research-backed pricing for the productized services on adrian-rusan.com/services.
Produced by a 6-agent workflow: 4 market-research lenses → synthesis → adversarial sanity-check (verdict: ADJUST, 5 corrections applied). Approved for publishing 2026-07-09.

## Final published prices (LIVE on /services)

### Delivery Sprint
| Tier | Published | Scope | Internal ceiling (quote toward on the call) |
|---|---|---|---|
| Pilot | **from €7,500** | 5–6 reviewed PRs · ~3–5 days | €9,500 |
| **Standard** *(recommended)* | **from €14,500** | 10–15 PRs · ~1–2 weeks | €18,000 |
| Scale | **from €24,000 — scoped after a 30-min assessment** | 16–20+ PRs · ~2–3 weeks | €30,000 |

### Retainer (monthly)
| Tier | Published | Scope |
|---|---|---|
| Steady | **from €7,000/mo** | 6–8 reviewed PRs/mo, 3-mo min |
| **Core** *(recommended)* | **from €12,000/mo** | 12–15 PRs/mo, priority queue |
| Embedded | **from €22,000/mo — 1 slot** | 20+ PRs/mo, dedicated capacity (quote toward €25–27k as proof accumulates) |

### Harness Setup
| Tier | Published | Scope |
|---|---|---|
| Install | **from €9,000** | one repo · ~1 wk |
| **Install + Enablement** *(recommended)* | **from €18,000** | + workshops · ~2 wks |
| Fleet Rollout | **from €30,000 — scoped after assessment** | multi-repo / org-wide |

## The one idea

Price against the **buyer's alternative**, not the operator's Romanian cost base. A Western senior-contractor-month is €12–16k for **1×** output. Ship/Verify delivers **2–3× + bundled adversarial security review**, and the verify layer is **supply-capped at ~2 concurrent slots**. Supply-constrained ⇒ optimize **value-per-slot**, not conversion volume. A too-low published number is worse than a lost tire-kicker: it anchors the whole relationship and burns a scarce, non-parallelizable slot. (The original draft Pilot at €4,000 was ~2× too low.)

## Anchoring strategy

Three tiers everywhere (3-tier pages convert ~1.4× two-tier; 4+ convert worse). Asymmetric-dominance decoy on Sprint: **Pilot is small and priced HIGHER per-PR than Standard** — its job is to push buyers up, not to be the value play. **Standard is the per-PR-cheapest hero** ("a senior contractor-month of reviewed output"), engineered to catch the 60–70% who pick the middle. **Scale is the high visible anchor** that makes Standard feel modest. Published "from" anchors filter; the internal ceiling captures on the call based on repo familiarity, security surface, and timeline pressure. Scale/Embedded/Fleet use "from + scoped after assessment" — custom scope + on-brand for anti-hype work + the assessment call is itself a qualification step.

## Two value ceilings to sell against

1. **Hire-replacement (sell Standard + Core against this):** fully-loaded Western-EU senior = €110–150k/yr (~€9–12.5k/mo) + recruiter fee (15–25% of first-year = €13.5–37.5k) + 1–3 mo ramp, and every unfilled seat bleeds **€10–20k/mo in lost output already being paid**. Rational ceiling ≈ **€20–30k/mo** — which is why a €14.5–18k Standard reads as a discount.
2. **Breach/insurance (sell the VERIFY layer against this):** IBM 2025 avg financial-services breach ≈ **€5.1M** (+22% vs global), unsupervised/shadow-AI adds ~€620k, slow detection adds ~€1.02M. One prevented shell-injection vuln (3 caught that passed tests) is worth a large multiple of any sprint fee. The security review is bundled into every PR — never a cuttable line item.

## Adversarial adjustments applied (from the sanity-check)

- Standard €13,500 → **€14,500** (supply-constrained; anchor was at contractor-month floor).
- Embedded €20,000 → **€22,000/mo** (scarcest asset was at its own floor).
- Steady €6,500 → **€7,000/mo** (was the cheapest reviewed-PR unit in the system — anomaly).
- Pilot scope 5–8 → **5–6 PRs** (holds €7,500; makes per-PR strictly > Standard in ALL scenarios so the decoy is robust to range cherry-picking).
- Scale + Embedded + Fleet → **"from + scoped/1-slot"** presentation, not clean published numbers.

## Risks & when to revisit

**Likely too LOW:** (1) US-heavy inbound → shift **+20–40%** (US Standard could carry €18–22k). (2) Security premium may be under-captured (packaged secure-code-review floor ~€27k, pentests reach €45k) → Scale/Embedded could carry +20–30%. (3) Genuine scarcity → if the calendar fills, **RAISE anchors, don't queue**.
**Possibly too HIGH:** (4) If ICP skews earlier-stage/less-funded, the hire-replacement ceiling weakens — watch **Pilot→Standard conversion**; if Pilots don't convert, the decoy is mispriced, not Standard. (5) Single reference proof (3 vulns, one 30-PR run) → **quote toward internal ceilings only once 2–3 named case studies exist.**
**What changes them:** signed named-fintech case study → **+20% across the board**; a second verify operator (removes 2-slot bottleneck) → LOWER per-unit to chase volume; majority-US pipeline → reprice in USD at the higher band. **Revisit every 2–3 closed deals.**

---

## Market research (4 lenses)

### Lens: contractor-rates

A "senior contractor-month" is the single most useful anchor for the Standard sprint tier, and its cost depends entirely on which market's rate you quote. Western-European senior full-stack contractors bill roughly €80-100/hr at the top and commonly €500-800/day remote (a German-facing senior remote day rate benchmark sits around €632), which annualizes to a senior contractor-month of ~€12,000-16,000 at ~20 billed days. Eastern-Europe/Romania senior contractors sit 35-40% below that — roughly $45-70/hr (€42-65) or €360-560/day, i.e. a senior contractor-month of ~€8,000-11,000; Romania's oft-cited ~€16/hr average blends in all juniors and is NOT the senior remote-to-West rate. The EE-vs-WE gap is explicit in the data: WE $70-130/hr vs EE $30-70/hr. Fractional/retainer models cluster higher per month because they bundle judgment and accountability, not hours: fractional-CTO retainers run $2,999-15,000/mo (core band ~$8-15k ≈ €7,500-13,500), and fractional senior-engineer retainers run $5-10k/mo (≈€4,600-9,300). US senior contractors ($80-180/hr, fractional leads $200-350/hr) sit clearly above EU and support a US-facing premium. Strategic read: because Adrian sells reviewed OUTCOMES to EU/US funded startups, he should anchor the Standard tier to the buyer's own senior-contractor-month cost (~€12-15k Western/blended), not his Romanian cost base — the 2-3x throughput plus adversarial security review is the justification to price at or above one Western senior-contractor-month, while his EE cost base (~€8-11k) is pure margin, not a price ceiling.

**Anchors:**
- Western-EU senior full-stack contractor day rate: €500-800/day (€80-100/hr top end)
- Western-EU senior contractor-MONTH (~20 days): ~€12,000-16,000 — the anchor for the 'recommended' Standard tier
- Eastern-EU/Romania senior contractor day rate: €360-560/day ($45-70/hr)
- Eastern-EU senior contractor-month: ~€8,000-11,000 (Adrian's cost base, not a price ceiling)
- EE-vs-WE differential: EE 35-40% cheaper; WE $70-130/hr vs EE $30-70/hr
- Fractional-CTO monthly retainer: $2,999-15,000/mo, core band $8-15k (≈€7,500-13,500)
- Fractional senior-engineer retainer: $5,000-10,000/mo (≈€4,600-9,300)
- US senior contractor: $80-180/hr (7+yr >$100/hr); US fractional leads $200-350/hr — supports US-facing premium
- Romania all-levels average ~€16/hr — a blended junior-inclusive figure, NOT the senior remote-to-West rate

**Sources:** https://www.index.dev/blog/european-developer-hourly-rates, https://brainsource.io/european-remote-developer-rates-2025/, https://www.remotepass.com/blog/global-contractor-rates-2025, https://devico.io/blog/cost-of-hiring-romanian-developers-in-2025-rate-guide, https://lemon.io/rate-calculator/romania/, https://wild.codes/blog/cost-of-hiring-eastern-european-developers-in-2025, https://fractionalctoexperts.com/blog/fractional-cto-pricing-guide, https://truvisory.com/fractional-cto/fractional-cto-cost/, https://www.fractionaljobs.io/help/how-much-does-fractional-talent-cost-to-hire, https://www.fullstack.com/labs/resources/blog/software-development-price-guide-hourly-rate-comparison, https://arc.dev/freelance-developer-rates/full-stack, https://www.quora.com/What-is-the-average-daily-remote-contract-rate-for-a-senior-software-engineer-in-Europe

### Lens: ai-agentic-dev-services

The 2025-2026 market splits into three reference bands that bracket these offers. (1) Fixed-price AI-native "build" engagements cluster at $15k-$40k (~€14k-€37k) for a production workflow shipped in 6-12 weeks, often phased as Discovery ~$5k (~€4.6k) + Build $18k-$25k (~€17k-€23k) + optional Run retainer $2k-$6k/mo (~€1.8k-€5.5k). (2) Productized week-long sprints (design/dev sprint model, e.g. thoughtbot, Zypsy) sit at $8k-$25k (~€7.5k-€23k) per single-focus sprint with a senior practitioner, and $25k-$30k for a full 5-day sprint with prototype + IP transfer. (3) Underlying labor floor: senior Western-EU full-stack/architect contractors bill €80-100/hr, i.e. roughly €640-800/day, so a "senior contractor-month of reviewed output" anchors around €13k-€16k — a clean justification for the Standard sprint tier. Monthly dev retainers broadly run €3k-€10k (with €5k-€8k/mo buying ~30-50 hrs of steady feature delivery), while AI-automation agency retainers tier from ~€1.5k-€4k (base) through ~€4k-€12k (full-service) and $2k-$20k+ at the mid/upper end. Fixed-price scoped audits/prototypes land at $12k-$40k (~€11k-€37k) and full production systems with QA/monitoring/handover at $50k-$100k (~€46k-€92k). Notably, "governed/reviewed AI output" (versioned prompts, audit logs, reviewer queues, human-in-the-loop) is emerging explicitly as a premium differentiator that supports pricing above the commodity T&M band of $80-250/hr — directly validating the adversarial-security-review positioning. Hourly billing is in visible decline across AI-focused services in favor of outcome/output pricing, so fixed-scope PR-count packaging is on-trend rather than novel.

**Anchors:**
- Fixed-price AI-native build engagement: ~€14k-€37k for a production workflow shipped in 6-12 weeks (maps to Sprint Standard/Scale)
- Phased AI-native model: Discovery ~€4.6k + Build ~€17k-€23k + Run retainer ~€1.8k-€5.5k/mo (validates Pilot -> Standard -> Retainer ladder)
- Productized single-focus week sprint (senior practitioner): ~€7.5k-€23k; full 5-day design sprint with IP transfer ~€23k-€28k
- Senior Western-EU full-stack/architect contractor: €80-100/hr => ~€640-800/day => ~€13k-€16k for a 'contractor-month' (anchor for Standard sprint 'senior contractor-month of reviewed output')
- Monthly software dev retainer: ~€3k-€10k/mo; €5k-€8k/mo buys ~30-50 hrs steady feature delivery (floor for Retainer Steady/Core tiers)
- AI-automation agency retainer tiers: base ~€1.5k-€4k, mid avg ~€3k, full-service ~€4k-€12k/mo (Embedded tier can push €12k-€20k+)
- Fixed-price scoped audit/prototype: ~€11k-€37k; full production system with QA/monitoring/handover: ~€46k-€92k (upper bound / Scale reference)
- Commodity AI-dev T&M band being displaced: $80-250/hr (~€75-230/hr) — the floor the reviewed-outcomes framing must price above
- Single-agent AI MVP build (agency): $50k-$70k (~€46k-€64k); dedicated team $15k-€60k/mo — context for harness-setup + enablement upsell

**Sources:** https://ai-native-agency.com/, https://thoughtbot.com/services/product-design-sprint, https://design-sprint.com/prices/, https://llms.zypsy.com/design-sprint-agency, https://www.index.dev/blog/european-developer-hourly-rates, https://brainsource.io/european-remote-developer-rates-2025/, https://www.kumohq.co/blog/software-development-retainer-vs-fixed-price-agency-2026, https://taskip.net/ai-automation-agency-pricing/, https://digitalagencynetwork.com/ai-agency-pricing/, https://www.techaheadcorp.com/blog/agentic-ai-development-costs/, https://productcrafters.io/blog/how-much-does-it-cost-to-build-an-ai-agent/, https://www.launchadvisor.co/guides/value-based-pricing-custom-software-development-company, https://shipkit.us/blog/fixed-price-mvp-development-how-to-launch-your-product-predictably-in-2026, https://getdx.com/blog/ai-coding-assistant-pricing/

### Lens: security-review-premium

The "VERIFY" half — senior manual/adversarial security review — commands roughly 2-3x a plain senior delivery day rate, and that multiple is the core of Adrian's pricing power. Senior security consultants bill $1,000-$3,500+/day (~EUR 900-3,200/day); pentesters quote $1,000-$3,000/day (~EUR 900-2,700), versus a senior EU full-stack contractor at ~EUR 450-700/day. The premium is corroborated structurally: security specialists earn a documented 40-60% pay premium over general developers (Index.dev/RemotePass 2025), and hourly appsec consultants run $200-$350/hr (~EUR 180-320). Packaged secure-code-review engagements have a high floor — professional-services firms cite "no less than $30,000" (~EUR 27k), while scoped small-app reviews start ~$8,000 (~EUR 7k) and complex apps run $10,000-$18,000 (~EUR 9-16k), typically 1-3 weeks of a single expert's time (Schellman, ScienceSoft, Software Secured). Web-app pentests, the closest one-shot adversarial analog, land at $5,000-$30,000 (~EUR 4.5-27k), up to $50k for complex scope. On the recurring side, PTaaS subscriptions anchor at ~$2,500/month platform fee plus ~$1,800 per 8-hour credit, with annual contract values of $15,000-$50,000 (~EUR 13.5-45k) — a useful ceiling reference for the AI-Native Delivery Retainer. Two tailwinds support premium positioning: security-review rates rose 15-20% since 2024 on demand/talent shortage, and the human verify layer is explicitly non-parallelizable, which is exactly the scarcity that justifies day rates at the top of these bands rather than the middle. Adrian's differentiator (adversarial security review bundled into every delivered PR, with proof like 3 caught shell-injection vulns) lets him charge the security-review premium on top of delivery, not as a separate line item buyers can cut.

**Anchors:**
- Senior security consultant day rate: ~EUR 900-3,200/day ($1,000-$3,500+); general cyber consultant avg ~EUR 780/day ($865)
- Pentester/adversarial-review day rate: ~EUR 900-2,700/day ($1,000-$3,000)
- Senior EU full-stack contractor (plain delivery) baseline: ~EUR 450-700/day — the number the security layer is 2-3x above
- Security-specialist pay premium over general devs: +40-60% (documented market delta)
- Appsec consultant hourly: ~EUR 180-320/hr ($200-$350); London EUR 225-540, Berlin EUR 135-315
- Packaged secure code review, professional-services floor: ~EUR 27k+ ($30,000 minimum cited)
- Secure code review, scoped small app: ~EUR 7k ($8,000); complex app: ~EUR 9-16k ($10,000-$18,000), 1-3 weeks single expert
- Web-app pentest (one-shot adversarial): ~EUR 4.5-27k ($5,000-$30,000), up to ~EUR 45k for complex
- PTaaS recurring: ~EUR 2,250/mo platform ($2,500) + ~EUR 1,600 per 8h credit ($1,800); ACV ~EUR 13.5-45k ($15,000-$50,000)
- Market movement: security-review rates up 15-20% since 2024 on demand + talent shortage

**Sources:** https://www.blazeinfosec.com/post/how-much-does-penetration-testing-cost/, https://www.getastra.com/blog/security-audit/penetration-testing-cost/, https://deepstrike.io/blog/penetration-testing-cost, https://www.schellman.com/services/penetration-testing/secure-code-review, https://www.softwaresecured.com/post/the-best-secure-code-review-providers-in-2026, https://www.scnsoft.com/security/pricing, https://iso27001cost.com/consultant-cost, https://www.contractrates.fyi/CyberSecurity-Consultant/hourly-rates, https://www.cleveroad.com/blog/it-consulting-rates/, https://www.index.dev/blog/freelance-developer-rates-by-country, https://www.remotepass.com/blog/global-contractor-rates-2025, https://www.brightdefense.com/resources/penetration-testing-pricing/, https://vulnvoyager.com/blog/ptaas-penetration-testing-as-a-service-market-pricing/, https://firecompass.com/ptaas-pricing-2026-models-what-you-get/

### Lens: value-anchoring-wtp

For this ICP (funded, fintech-adjacent eng leaders), the rational value ceiling is set by two independent anchors, and the offer should sit far below one and be justified by the other. Anchor 1 — replacement cost of a senior hire: a Western-EU senior engineer runs €110k-150k/yr fully loaded (a €90k German senior = ~€110-115k loaded), i.e. ~€9-12.5k/month, PLUS a one-time recruiter fee of 15-25% of first-year salary (€13.5-37.5k) and 1-3 months of ramp at reduced productivity, on a 4-10 week time-to-hire that stretches with 1-3 month notice periods. Critically, every unfilled senior seat bleeds €10-20k/month in lost output — that vacancy cost is the real WTP driver, because the buyer is already paying it while unable to hire. Stacking loaded salary-equivalent (~€9-12.5k) + vacancy/opportunity cost (~€10-20k) means a "senior-contractor-month of reviewed output" can rationally be anchored at €20-30k/month before any risk premium, so a €12-18k Standard sprint reads as a bargain. Anchor 2 — the breach/insurance ceiling justifies premium pricing on the security-review layer: IBM's 2025 report puts the average financial-services breach at $5.56M (~€5.1M, 22% above the $4.44M global average), with shadow/unsupervised AI adding ~$670k and slow detection (>200 days) adding ~$1.02M; a single prevented shell-injection vuln reaching prod is worth a large multiple of any sprint fee, which is exactly the fear these buyers pay to retire. On conversion structure: three-tier pages convert ~1.4x two-tier (and 4+ tiers convert worse), 60-70% of consulting buyers pick the middle tier, and a well-built "anchor–hero–decoy" spread lifts premium/mid selection 30-40% (Ariely), so the recommended architecture is exactly three tiers with Standard as the margin-rich hero, Pilot as the entry/decoy, and Scale as the high visible anchor.

**Anchors:**
- Fully-loaded EU senior engineer: €110k-150k/yr (~€9-12.5k/month) — the salary-replacement floor the Standard sprint maps to
- Recruiter fee: 15-25% of first-year salary = €13.5k-37.5k one-time, before any ramp or productivity loss
- Vacancy cost: €10-20k/month in lost output per unfilled senior seat — the buyer is already paying this; it is the core WTP driver
- Derived rational ceiling for a 'senior-contractor-month of reviewed output': ~€20-30k/month (loaded salary + vacancy cost), so a €12-18k Standard tier reads as a discount
- Fintech/financial-services data breach: $5.56M avg (~€5.1M), 22% above the $4.44M global average — the catastrophe-avoidance ceiling that justifies a premium on the adversarial security review
- Unsupervised/shadow-AI breach premium: +$670k (~€620k); slow detection (>200 days): +$1.02M — direct dollar value of the human verify layer
- Recommended 3-tier spread ~1 : 2 : 3 mirroring PR counts — e.g. Pilot ~€6-8k (decoy/entry), Standard ~€12-18k (hero, where 60-70% land), Scale ~€22-30k (high anchor)
- CEE senior contractor reference: €40-70/hr (~€7-12k/month) — the low commodity comparison to price ABOVE, not toward, given the reviewed-outcome + accountability premium

**Sources:** https://www.highcircl.com/en/blog/cost-to-hire-senior-developer-europe, https://decode.agency/article/hidden-costs-hiring-in-house-developers/, https://www.index.dev/blog/european-developer-hourly-rates, https://www.ibm.com/reports/data-breach, https://opti9tech.com/blog/the-real-cost-of-a-data-breach-for-financial-services-firms/, https://www.kiteworks.com/cybersecurity-risk-management/ibm-2025-data-breach-report-ai-risks/, https://www.getmonetizely.com/articles/the-decoy-effect-how-strategic-pricing-tiers-can-maximize-revenue, https://www.digitalapplied.com/blog/subscription-pricing-page-psychology-decision-framework-2026, https://www.agent37.com/blog/pricing-strategy-for-consulting-services, https://untappedpricing.co.uk/the-anchoring-effect-in-pricing/



---

*Full raw workflow output (all sources, anchors, per-lens detail) archived in the session task log; regenerate via the pricing-research workflow script if needed.*
