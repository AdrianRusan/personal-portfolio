# Design directions (#114)

## Round 3 (current)

Adi on round 2: "I kinda like E and D. Not completely but I like them still." So round 3 blends D and E and adds what the gallery pass (20 Awwwards/Minimal Gallery/SiteInspire sites, Aug–Oct 2026) found: visible structure, paper texture, one hot accent, big light grotesk with tight tracking, plain-text status in the header, and the work itself as the hero. Every proof element on all three is now real data. D's made-up queue is gone; the hero shows the actual review log from the 30-PR run (#112, #111, #121, #119 caught; #109 missed), worded from the canonical facts.

**Recommendation: G, Review Log.** It keeps what worked in D (warm paper, quiet type, a product panel as the hero, pill CTAs) and swaps the illustrative queue for E's honesty: the real review log, with the miss shown next to the catches. It is the most readable of the three for a CTO skimming on a phone, and the lightest to build.

| | G · Review Log | H · Field Sheet | I · Signal |
|---|---|---|---|
| From | D-led, plus E's real data | E-led, warmer, with bigger type | the gallery's boldest pattern |
| Look | Paper `#F4F3EE` with SVG grain, Host Grotesk 88 px at weight 380, tracking −4.5 %, orange-red `#D63A12` CTA, Geist Mono for meta | A page framed in hairlines with crop marks, nav in ruled cells, Geist 128 px at weight 300, electric blue `#1F3BFF`, highlighter yellow for misses | "Adrian Rusan" as a 232 px red wordmark, white `#FFFFFB`, one red `#D11F14` used three times (wordmark, CTA, Reviewed PR price) |
| Header status | Timișoara local time | "one sprint at a time" (from `CAPACITY`) + local time | local time + contact email |
| Hero | H1 + CTA left; review-log panel right | H1 in a big ruled cell; dithered portrait cell; three cells below (pitch, CTAs, `curl` line) | wordmark, then H1 + red CTA; review log as a full-width ruled table below |
| Proof | Stroe + Doros quotes | the 31-PR grid figure + Doros | the review log + Doros |
| Prices | three ruled columns, big light numbers | three ruled cells, Reviewed PR tinted | three ruled columns, Reviewed PR price in red |

All three keep: one primary ask (scoping call) with the teardown as the fallback, the guarantee line, AA contrast in both themes, and server-rendered text. The SVG grain and the dithered PNG are the only decoration.

## Round 2 (D and E partly liked)

Adi rejected A, B and C ("I don't like any of them") and asked for directions based on modern sites from October 2026. A second research pass captured 27 live sites at 1440 and 390 (Cursor, Warp, Zed, Linear, Vercel, Factory, Cognition, Poolside, Mintlify, Anthropic, rauno.me, emilkowal.ski, paco.me, leerob and others). The traits that read as late 2026:

1. warm or neutral paper grounds with one rare electric accent;
2. the agent's real work as the hero (queues, "ready for review", PR counts);
3. monospace as the brand voice, laid out like a spec sheet with visible grid lines and figure captions;
4. texture instead of gradient blobs (dithering, paper grain, procedural line art);
5. quiet headlines: sentence case, weight 400–500, often one full sentence;
6. agent-native touches in the first screen (a copyable command, a Markdown/skill URL).

The traits that now look dated: navy with neon glows, bento grids with giant stat numbers, and one bold grotesk on cool grey with a SaaS green. A and C each had one of these.

**Recommendation: E, Spec Sheet.** Its main figure is the real 30-PR run, with every PR from #95 to #125 marked merged, closed, injection caught, or miss found, straight from the canonical facts. That makes the honesty the visual itself, and nothing on it is illustrative. It has the strongest 2026 vocabulary of the three: mono, grid lines, figure captions, a dithered portrait, and a real agent-native line (`curl -H "Accept: text/markdown"`, which the site already supports).

| | D · Review Queue | E · Spec Sheet | F · Index |
|---|---|---|---|
| Look | Cursor-like: warm paper `#F7F7F4`, quiet 56 px Host Grotesk H1, electric blue `#3B3BF5`, procedural contour backdrop | Warp/Zed-like: Geist Mono throughout, Instrument Serif italic H1, page frame with grid lines, indigo `#2A1EFF` + highlighter yellow | Emil/Paco/Rauno-like: Geist 15 px, one narrow column, labelled sections, one big blue round "Book a scoping call" button |
| Hero | An example review queue (agents working, waiting for my review, merged), with the caught injection shown as a review note | H1 + CTAs + the curl line; dithered portrait as fig. 1 | One sentence that says it all, next to the round button |
| Proof | 30 / 3 / 5 list + Doros quote | fig. 2: the 31-PR grid from real data, with a legend | Linked 30-PR summary + two quotes as text |
| Prices | Three bordered tiles, Reviewed PR highlighted | Spec table, Reviewed PR price highlighted | Three plain rows |
| Risk | The queue is illustrative (captioned as such), so it can read as proof that isn't real | Mono body text is slower to read on long pages (services); keep mono for UI and data, and use the serif or a sans for long prose if needed | Reads as a personal blog; the offer is less visible. Weakest at selling |
| Lighthouse | text LCP, 2 fonts, inline SVG backdrop | text LCP, 2 fonts, 11 KB dithered PNG | lightest of all |

## Round 1 (rejected)

**Recommendation at the time: A, Merge Record.** It puts the thing a buyer is actually unsure about (can I trust AI-written code?) in the hero as a concrete object: the five-step review every PR gets. It is also the lightest of the three to build and to load.

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
2. **`motion` v12: not adopted.** `framer-motion` is imported in one file today (`components/blog/BlogListClient.tsx`). The direction needs one hero reveal at most, which CSS handles with `prefers-reduced-motion` respected. Adi's ruling (2026-10-13): keep `framer-motion` 11 as it is. No migration and no removal.
3. **Copy-paste registries** (Magic UI, Aceternity, Origin UI, React Bits, Cult UI): nothing in A needs them. Their effects (spotlights, beams, marquees) are the template look we are leaving.
4. **GSAP and Lenis: no.** There is no scroll storytelling in A, and Lenis would add scroll hijacking risk for keyboard users.
5. **Tailwind 4: deferred.** It isn't needed for A, and a zero-visual-change upgrade PR would delay the redesign. It is listed as a deferred item in HANDOFF.md.

## 4. If Adi picks A: what changes where

- `tailwind.config` + `app/globals.css`: colour tokens as CSS variables for both themes, the type scale, radius 6 px for controls and 10 px for the one card style.
- `components/ui`: button variants (primary green, text link), the review card, stat row, price row.
- Then home + `/ro`, services + teardown + workshops, then the rest, as the brief's PR plan says.
