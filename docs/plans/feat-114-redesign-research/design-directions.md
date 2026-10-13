# Design directions (#114)

**Recommendation: A, Merge Record.** It puts the thing a buyer is actually unsure about (can I trust AI-written code?) in the hero as a concrete object: the five-step review every PR gets. It is also the lightest of the three to build and to load.

Canvas (12 artboards: each direction's hero, one proof section and the services price rows, light and dark, at 1440 and 390): https://claude.ai/artifact/2HTiHx1b3gBpsZZjAMNUMo. The canvas is private until Adi shares it.

Copy on the canvas is a draft to judge layout. Final copy comes after OpenSEO keyword research and goes through `/adi-voice`. Prices and the ladder are unchanged. B and C quote testimonials as excerpts; the site keeps the exact quote texts (`testimonials.test.ts`).

## 1. The three directions

| | A · Merge Record | B · Byline | C · Throughput |
|---|---|---|---|
| Idea | The page reads like a code review: a review checklist card in the hero, PR-stat proof, prices as line items | The person and the people who vouch: big portrait, serif headlines, named pull-quotes | The honest number, set large: "2–3x" huge, "100x" struck through, one yellow proof band |
| Type | Instrument Sans (variable, width axis) + JetBrains Mono only inside the review card | Newsreader (serif, optical sizes) + Public Sans | Archivo (variable, width 62–125) |
| Light | cool paper `#F6F7F9`, ink `#15202B`, merge green `#1F6F50`, caught red `#A3361F` | white, ink `#1A1C24`, cobalt `#2443B8`, tint `#F1F3FA` | white, ink `#101418`, signal yellow `#FFD23F` |
| Dark | `#0F161C`, ink `#E7EDF2`, green `#4CC39A`, red `#F29478` | `#13151C`, ink `#ECEEF4`, periwinkle `#9AACFF` | `#101418`, ink `#F3F4F1`, same yellow |
| Hero | H1 "AI agents write the code. I decide what merges." + the review card with photo | Portrait left, serif H1 right | 2–3x at 340 px, condensed |
| Proof | 30 / 3 / 5 (misses shown honestly) + Doros quote | Stroe quote large, Doros + Iojiban, the 30-PR run as one sentence | 30 / 3 / 5 on yellow + Iojiban quote |
| Prices | Tabular rows: name, what, time, price, terms | Menu rows with leader dots | Three columns, prices set huge |

All three meet AA on body text and CTAs in both themes (worst pair: A light muted `#4A5866` on `#F6F7F9`, ≈6.9:1; B dark periwinkle CTA with ink text ≈ 8:1; C ink on yellow ≈ 13:1). All three stack to one column at 390 with no fixed widths.

## 2. Scored against the goal (book a Scoping Call)

| Criterion | A | B | C |
|---|---|---|---|
| 5-second test: what he does, for whom | strong: the H1 is the offer, the card shows the method | good: the face carries trust, the offer arrives second | mixed: the number lands first, the offer needs a second read |
| Answers the main objection (AI code quality) | strongest: the review order is visible before scrolling | indirect: via quotes | indirect: via stats |
| Honesty fit ("2–3x, not 100x", the 5 misses) | shows misses as data, calm tone | as prose | the big number risks reading as the hype the site argues against |
| Proof next to the ask | stats + quote one scroll below the CTA | the best quote layout of the three | stats strong, room for one quote |
| Lighthouse risk | lowest: text LCP, one variable font, mono subset for one card | photo LCP on mobile (the portrait is the largest element) | 340 px condensed display text: font swap shift risk on LCP |
| Distinct from the 2024 template | yes | yes, but closest to a classic consultant page | yes, the loudest |

Where B is better: testimonial presentation. A can borrow it: one large pull-quote on `/services` and `/about` in A's type.

## 3. Libraries (R6): recommend zero new runtime deps

1. **Fonts via `next/font/google`** (already used for Inter). Self-hosted at build, no runtime dep. A uses Instrument Sans and JetBrains Mono, both SIL Open Font License. JetBrains Mono loads only the 400 weight, subset to Latin.
2. **`motion` v12: not adopted.** `framer-motion` is imported in one file today (`components/blog/BlogListClient.tsx`). The direction needs one hero reveal at most, which CSS handles with `prefers-reduced-motion` respected. Proposal for the tokens PR: replace that one use with CSS and drop `framer-motion`, so the redesign removes a dependency instead of adding one. If Adi prefers to keep it, it stays as is.
3. **Copy-paste registries** (Magic UI, Aceternity, Origin UI, React Bits, Cult UI): nothing in A needs them. Their effects (spotlights, beams, marquees) are the template look we are leaving.
4. **GSAP and Lenis: no.** There is no scroll storytelling in A, and Lenis would add scroll hijacking risk for keyboard users.
5. **Tailwind 4: deferred.** It isn't needed for A, and a zero-visual-change upgrade PR would delay the redesign. It is listed as a deferred item in HANDOFF.md.

## 4. If Adi picks A: what changes where

- `tailwind.config` + `app/globals.css`: colour tokens as CSS variables for both themes, the type scale, radius 6 px for controls and 10 px for the one card style.
- `components/ui`: button variants (primary green, text link), the review card, stat row, price row.
- Then home + `/ro`, services + teardown + workshops, then the rest, as the brief's PR plan says.
