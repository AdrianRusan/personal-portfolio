# Design research 2026: reference sites for the redesign (#114)

Fetched and checked 2026-10-13. Every reference below loaded live on that date, and each
note describes what the fetched page actually contained. Visual notes come only from
markup that could be verified (font files, CSS variables, theme-color). Where the markup
didn't show styling, the note says so and nothing is guessed.

**The site's only job:** get a free 30-min Scoping Call booked. Every reference is read
for what it does to that job (offer clarity, pricing visibility, proof placement, CTA,
friction, trust). Looks come second.

**Method:** WebSearch plus WebFetch on each candidate, then curl over the raw HTML for
font and colour tokens. Gallery sites (Minimal Gallery, Godly) didn't expose
individual listings to the fetcher, so every reference came from search and direct
knowledge, then got verified by fetch. 22 sites were fetched live. 16 fit the
brief (selling services to technical buyers) and are written up below. 6 were left out
(see the end).

---

## A. Solo technical consultants

### 1. Speedshop: https://www.speedshop.co
- **Sells:** Rails performance retainer (a principal-level engineer owns your app's
  performance), books and a paid Slack community. Two named founders.
- **Conversion:** the "Book a call" button sits in the first section ("Speed is a
  feature."), with a plain "Email us instead" text link beside it. It goes straight to
  an external SavvyCal page. The proof is a "Trusted By" list of about 60 company names
  set as plain text, not logos, plus maintainer credentials (Puma, Ruby Core). No
  prices, no testimonials.
- **Steal:** pair the primary booking button with a low-commitment alternative ("Email
  instead") in the same line. It catches buyers who won't put a call on the calendar yet.
- **Visual:** monochrome tokens (`#000`/`#fff` plus greys, dark-mode pairs), monospace in
  the stack, pixel-art founder portraits, two-column grid. Austere and text-first.

### 2. CSS Wizardry (Harry Roberts): https://csswizardry.com
- **Sells:** web performance audits, consultancy, workshops, masterclasses. Solo, UK.
- **Conversion:** three service cards sit in the hero, followed by "Learn more" and
  "Contact me about a web performance project". A sidebar "Book a Free Call" goes to a
  30-min Calendly, and a header CTA promotes the newest offer ("Arrange a Masterclass").
  Below the cards is a logo wall of about 58 orgs, then 5 named testimonials (BBC, Google,
  Adobe). This is the closest structural match to Adrian's funnel: a free 30-min call
  plus paid services, with proof right under the offer.
- **Steal:** put the offer cards first and the logos plus named quotes directly under
  them, so the claim and its proof sit in one scroll.
- **Visual:** system, serif and code font stacks as CSS variables. Light grey tint, a
  green "positive" token. Classic blog-consultant layout with a sidebar.

### 3. corrode (Matthias Endler): https://corrode.dev
- **Sells:** Rust consulting for teams (audits, mentoring, unblocking stalled projects,
  C++/Python migration), individual mentorship, workshops, a podcast. Solo.
- **Conversion:** the hero CTA is "Book a Free Strategy Call", with "View Services →"
  beside it. A row of 10 logos ("Trusted By Engineering Teams Worldwide") sits directly
  under the hero. 4 named testimonials appear mid-page. The CTA repeats in a closing
  "Let's Talk About Your Team's Rust Goals" section. Migration guides per source
  language (Python, TS, Java, C++) work as SEO entry points into the offer.
- **Steal:** entry pages per buyer situation ("coming from X"), each ending in the same
  call CTA. Adrian's version is pages per buyer problem (AI pilot stalled, legacy
  codebase, team adopting agents).
- **Visual:** white theme-color. No other styling visible in the markup.

### 4. Adam Johnson: https://adamj.eu
- **Sells:** Django/Python consulting, 4 books. Solo, London.
- **Conversion:** a counter-example. Consulting is one nav item and one line ("hire me to
  help on your Python or Django project"). Contact is a page with no booking tool.
  Authority is huge (Django Security Team, PSF Fellow, 460+ posts) but there's no path
  to act on it.
- **Steal:** the authority stack as plain, verifiable facts that link to the official
  rosters. It's proof a technical buyer can check in one click.
- **Visual:** plain text site. Nothing distinctive was verified.

### 5. Ryan Singer: https://ryansinger.co (formerly feltpresence.com)
- **Sells:** Shape Up training, product-execution support and 3-hour live shaping
  sessions. Solo.
- **Conversion:** the offers are well productized (a fixed 3-hour session on a real
  project) but have no price and no booking tool. Contact is an email address at the
  bottom. Proof is the book, a podcast appearance and a recorded case study.
- **Steal:** name a fixed-duration, fixed-format session ("a three-hour shaping session
  on your real project"). It works as a concrete paid first step, much like Adrian's
  €1,000 Reviewed PR.
- **Visual:** system font stack plus Open Sans. Minimal single column.

## B. Productized / priced-in-the-open

### 6. Designjoy: https://www.designjoy.co
- **Sells:** a design subscription, one plan. Solo founder.
- **Conversion:** the most direct funnel in the set. The hero offers "See pricing" and
  "Start today". The single price is shown ($4,995/mo, with $5,995 struck through). The
  pricing card checks out on Stripe directly. "Book a 15-min intro call" appears
  mid-page and again at the bottom. The FAQ spells out refund terms (75% back in week
  one). The nav has just Login, Book a call and See pricing.
- **Steal:** a nav that only holds conversion actions, and one clearly bounded offer
  card with its terms. Caveat: Adrian's buyers are CTOs, so drop the "limited time"
  discount theatre.
- **Visual:** styling not verified from the markup.

### 7. Reyem Technologies: https://www.reyem.tech/pricing
- **Sells:** fractional CTO services, Canada (firm). Fixed-scope programs plus retainers.
- **Conversion:** every offer has a price on one page. Health Check $2,000 (~2 weeks).
  Advisory from $2,750/mo. Fractional CTO from $8,000/mo. AI Adoption Roadmap from
  $7,900. Hourly $350. There's an annualized comparison against a full-time CTO hire. The
  entry offer's fee is credited against a retainer started within 90 days. The main CTA
  is the paid entry offer ("Get a Technology Health Check"), with "Book a Call" in the
  header and a "Compare every engagement ↓" table link.
- **Steal:** (a) a credit-forward clause, where the entry fee comes off the next
  engagement. That makes a €1,500 AI audit a low-risk yes. (b) A comparison table of
  all engagements on one page.
- **Visual:** white theme-color. Nothing else verified.

### 8. Wavect: https://wavect.io
- **Sells:** fractional co-founder/CTO, MVP development, AI enablement, QA. Two-founder
  firm, Austria.
- **Conversion:** weekly retainers have visible prices (Fractional Co-Founder €400/week,
  QA €750/week, Discovery €3,500 fixed and deducted from the final invoice). A
  "No-Bullshit Guarantee" lets you cancel any week, with the last week refunded if it
  had no impact. Review-platform ratings carry dated "checked 2026-10-01" notes and are
  labelled as category positions, not awards. Weakness: no prominent hero CTA. The free
  consultation link is buried in the contact section.
- **Steal:** risk reversal phrased as a mechanism (weekly cancel plus last-week refund),
  and dated, self-qualified proof claims, which fits Adrian's claim-test culture.
- **Visual:** DM Sans plus JetBrains Mono. A sans/mono pairing is the developer-tool
  default.

### 9. Brival: https://brival.co/services/code-audit
- **Sells:** a code and SDLC audit as the entry offer ("Free, for now"), then builds,
  modernization and "AI access to existing systems". Senior-led firm, Poland (an
  Eastern European peer).
- **Conversion:** "Book a 30-Minute Call" in the nav and footer, with "Scope Your Audit"
  at the bottom. Audit deliverables are listed concretely: written report, risk-ranked
  map, prioritized fix sequence, delivery metrics for engineering leaders, dollar and
  time figures for owners, and a readout call. They anchor against $25–40K+ due-diligence
  firms. A case study states a fixed budget, the timeline and "SOC 2 audit passed".
- **Steal:** list what the buyer receives as nouns, split by reader (CTO vs owner). Apply
  this to the €1,500 AI audit page.
- **Visual:** Geist plus Geist Mono variable fonts, sans/mono/display tokens. The
  Vercel-adjacent engineering look.

## C. Small dev studios selling to technical buyers

### 10. Test Double: https://testdouble.com
- **Sells:** embedded engineering, legacy modernization, "Pragmatic AI", Rails upgrades,
  assessments. Employee-owned consultancy.
- **Conversion:** "Ready to solve a real problem?" appears twice in the hero. "Say Hello"
  is in the nav. Free 30-min "Office Hours" pairing sessions act as a no-sales-call entry
  point. Positioning lines aimed at technical buyers: "We're not the cheapest", "We don't
  implement AI for its own sake", and recovering clients from "AI slop".
- **Steal:** (a) a skeptical-of-AI stance as a trust signal for CTOs who've been burned.
  This is close to Adrian's "AI-assisted, human-reviewed" pitch. (b) Framing a free
  working session as an alternative to a sales call.
- **Visual:** a custom slanted display face ("born-ready-slanted"). Playful type on a
  serious offer.

### 11. Evil Martians: https://evilmartians.com
- **Sells:** embedded engineering for devtools and AI-native startups, LLM benchmarking,
  "AI harnesses" for Claude Code, Cursor and Copilot, Rails CI speedups.
- **Conversion:** one price is public: $7,000 per week per engineer. Proof is
  outcome-first (a client's ARR and MAU growth, 65% of clients raising their next round,
  25B+ downloads). The CTA is weak ("Reach out to discuss your project"). The page also
  contradicts its own numbers in two places (ARR figure, PostCSS multiple), so proof
  hygiene matters.
- **Steal:** publish one anchor unit price (per week or per PR) even if the rest is
  scoped. Then keep every number consistent across the page. Adrian's claim tests
  already enforce this.
- **Visual:** very dark theme-color `#18000f` (near-black aubergine) with a mono font
  token. Dark, technical, saturated accents.

### 12. Set Studio: https://set.studio
- **Sells:** design, front-end engineering and strategy (incl. code reviews). Boutique UK
  agency, and owner of the Piccalilli course publisher.
- **Conversion:** case-study proof carries outcome numbers (revenue from six to eight
  figures, 70% lower conversion costs, 7x subscriptions), each beside a client quote.
  "Get in touch" sits in the nav and the closing section. A comparison table frames them
  against bigger agencies ("fair pricing with lower overheads"). The hero has no CTA.
- **Steal:** a "small senior team vs agency" comparison table. Adrian's version is
  solo-plus-AI vs agency vs a hire.
- **Visual:** Saans (regular, italic, medium, bold) with separate display, statement and
  base font tokens. Large colourful 3D "Hello" lettering. Expressive type on a
  restrained grid.

### 13. Planet Argon: https://www.planetargon.com
- **Sells:** Rails consulting, maintenance retainers, upgrades, fractional Rails dev.
- **Conversion:** "Book a Call" in the nav and the closing section ("Not sure where to
  start? That's fine."). A visible 3-step process (Alignment → Roadmap → Ignition), where
  the Roadmap step is marked "No charge". Logos sit near the top. Testimonials and a
  Clutch badge (5 stars, 22 reviews) are near the footer.
- **Steal:** the closing line that lowers the bar ("Not sure where to start? That's
  fine.") directly above the booking button. It speaks to buyers who can't yet define
  the work, which is the whole point of a scoping call.
- **Visual:** loads Roboto Slab, Open Sans, Montserrat, Lora, DM Sans and DM Mono. That's
  a font sprawl to avoid.

### 14. Tighten: https://tighten.com
- **Sells:** Laravel/Vue/React builds and rescues. "We build and rescue web apps and dev
  teams."
- **Conversion:** the hero CTA "See how we can help you →" goes to services, not to a
  booking. Contact is a long form with reCAPTCHA and no calendar. Proof is case studies,
  one CTO testimonial and the Laravel Official Partner badge.
- **Steal:** the "build and rescue" headline names both buyer states (greenfield and
  in-trouble) in one line.
- **Visual:** styling not verified from the markup.

### 15. Spatie: https://spatie.be
- **Sells:** Laravel and AI-feature development, plus its own products and courses.
  Belgium.
- **Conversion:** a hero availability signal ("Yes We're Open for new clients") jumps to
  an "A good match?" fit section, then "Brief us your project". Proof is open-source
  scale (547 packages, 3.05B+ downloads). Booking friction is high: mailto only, no
  calendar, no form.
- **Steal:** an explicit availability status in the hero, plus a "good match?" fit
  checklist before the CTA. That pre-qualifies the buyer and raises intent.
- **Visual:** Druk Bold (heavy condensed display), near-black `#050508` dark theme.
  Loud display type on a dark ground.

### 16. basement.studio: https://basement.studio
- **Sells:** websites, branding, events and product engineering for Bay Area tech
  companies. Argentina.
- **Conversion:** the opposite of a funnel. There's no button CTA, contact is email
  addresses near the bottom, and no prices are shown. Proof is the client list (Vercel,
  Linear, Cursor and others), awards, and co-designing the Geist typeface. It works
  because the brand and the client list do the selling. That doesn't transfer to a solo
  engineer who has to get calls booked.
- **Steal:** separate addresses for new business and general inquiries. That's minor.
  This is mainly a visual reference, not a funnel one.
- **Visual:** not verified from the markup. Award-gallery motion and 3D are known for
  this studio but weren't checked here.

---

## Synthesis

### 5 patterns to adopt (each tied to booking calls)

1. **Offer, proof, CTA in one scroll.** CSS Wizardry and corrode put the offer and the
   booking CTA in the hero, with a logo row and named testimonials directly under it. A
   CTO sees the claim, the evidence and the next step before scrolling away. → Hero:
   one line of offer, "Book a Scoping Call" plus one secondary, then proof immediately.
2. **Publish the prices of the paid entry offers.** Reyem, Wavect, Designjoy and Evil
   Martians show numbers. Visible prices pre-qualify, and they make the *free* call feel
   like a scoping step instead of a sales trap. → Keep €1,000 Reviewed PR and "AI audit
   from €1,500" on the page, next to "the call is free".
3. **Risk reversal as a mechanism, plus a credit-forward clause.** Reyem credits the
   Health Check fee against a retainer. Wavect offers weekly cancellation and a
   last-week refund. → "Audit fee credited if you continue within N days", so saying
   yes on the call costs nothing extra. (This is a pricing decision for Adrian. Don't
   ship it as copy without his sign-off.)
4. **A low-bar line and a low-commitment alternative beside the CTA.** Speedshop has
   "Email us instead", Planet Argon has "Not sure where to start? That's fine.", and Test
   Double has free Office Hours. → Under the booking button: one sentence saying an
   undefined problem is fine, plus an email fallback.
5. **Concrete deliverables and fit-checks before the ask.** Brival lists audit outputs as
   nouns per reader, and Spatie shows availability plus a "good match?" section. → Each
   paid offer lists what you receive. A short "this is for you if..." block sits right
   above the closing CTA.

### 3 patterns to avoid

1. **Authority with no path to act.** Adam Johnson and Ryan Singer have strong
   credibility but only a contact page or email address, with no booking tool. Every
   section that builds trust has to end next to a booking link.
2. **Long forms and mailto-only contact.** Tighten has a multi-field form with
   reCAPTCHA, and Spatie is mailto only. Each extra step drops the CTOs who meant to book.
   The Calendly link stays one click from every page.
3. **Inconsistent or unverifiable numbers, and discount theatre.** Evil Martians
   contradicts its own figures twice, and Designjoy runs "Lifetime discount - limited
   time" with a struck-through price. Technical buyers check. Keep claim tests and give
   dates instead of urgency (as Wavect does).

---

## Visual directions this suggests

### Direction 1: "Engineering Ledger" (calm, mono-accented)
- **Type:** Geist (UI/body) + Geist Mono (numbers, prices, labels, code-ish metadata).
- **Palette:** off-white paper (`~#FAFAF7`) and ink near-black. One functional accent
  (a signal green or electric blue) used only for the booking CTA and "verified" marks.
  A true dark mode with the same single accent.
- **Layout:** a 12-col grid with a narrow left rail for section labels. Prices, durations
  and proof figures set in mono like a spec sheet. Offer cards read like line items in a
  quote.
- **Inspired by:** Brival (Geist pair), Wavect (sans/mono), Speedshop (monochrome
  austerity), Reyem (comparison table).

### Direction 2: "Editorial Consultant" (serif authority, reading-first)
- **Type:** a sturdy text serif for headlines and long-form (e.g. Source Serif or
  Newsreader) + a neutral grotesk for UI and buttons.
- **Palette:** warm paper and charcoal, one deep accent (oxblood or forest) for links
  and CTAs, muted tints for proof blocks.
- **Layout:** a magazine-style homepage. A strong headline, an offer summary, then named
  testimonials as pull-quotes. Case studies and posts get generous measure. A sticky,
  slim "Book a Scoping Call" bar on long pages.
- **Inspired by:** CSS Wizardry (serif stack, testimonials under offers), Set Studio
  (case studies with outcome numbers and quotes), Adam Johnson (verifiable authority
  list).

### Direction 3: "Dark Signal" (bold display on dark, devtool energy)
- **Type:** a heavy condensed display face for a few big statements (Druk-like, e.g.
  Anton or Bebas Neue for free alternatives) + Inter/Geist for body + mono for data.
- **Palette:** a near-black ground with a hint of colour (aubergine `#18000f` à la Evil
  Martians, or blue-black `#050508` à la Spatie). One saturated accent for the CTA. A
  carefully tuned light mode as the secondary theme.
- **Layout:** full-bleed sections, oversized numbers (price, turnaround, PR count) as
  graphic elements, logo and testimonial bands between them. Motion kept to one or two
  purposeful reveals. Performance matters to this audience.
- **Inspired by:** Evil Martians (dark aubergine plus mono), Spatie (Druk on dark,
  availability signal), basement.studio (brand-led confidence), Test Double (expressive
  display type on a serious offer).

---

## Checked but excluded (loaded, not used)
- **jxnl.co**: consulting and training marked closed. Not selling now.
- **timkadlec.com**: author now works at Cloudflare. No offer on the page.
- **hamel.dev / parlance-labs.com**: course funnels (Maven), not service or booking
  funnels. Their one lesson is that a single top banner with a date-bound CTA gets
  attention, but it's course-specific.
- **jonathanstark.com**: sells to freelancers, not technical buyers.
- **darkroom.engineering**: live dev studio, but the fetched content was too thin to
  assess conversion.
