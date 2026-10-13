# HANDOFF: #114 redesign (direction M)

**Verdict: ready to merge in order.** Five PRs, each green on the full ladder (tsc → lint → build → jest 263 → e2e 128). AA passes on all 22 routes in both themes at 1440 and 390, every Markdown twin is unchanged, and Lighthouse went up on all three measured pages. Review time: about 40 minutes (10 for the canvas, 30 for the UAT list).

Direction M (G + J) was settled with Adi through `/grill` after 4 rounds (A–L); the decisions are in `design-directions.md`. The copy is unchanged by design ("design now, copy later").

## 1. Merge order

1. #115 `feat/114-redesign-research`: docs only (research, OpenSEO, directions, screenshots, this file).
2. #116 `feat/114-redesign-tokens`: colours, fonts, grain, pills, the nav bar.
3. #117 `feat/114-redesign-home`: `/` and `/ro`.
4. #118 `feat/114-redesign-services`: `/services`, `/ro/servicii`, `/teardown`, workshops, the shared `ClosingBand`.
5. #119 `feat/114-redesign-rest`: about/despre, contact, privacy, work, blog, 404, footer, OG. Closes #114.

Each build PR targets `main` and contains the ones below it, so merge strictly in this order. Each diff shrinks as the PR below it lands. Between merges the site briefly mixes styles: shared pieces such as the closing band and the quote style change before every page does.

## 2. Lighthouse (mobile, local production build, 3-run median)

| Page | Perf | LCP (ms) | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|---|
| `/` | 94 → 96 | 3,074 → 2,698 | 100 → 100 | 96 → 96 | 100 → 100 | 0 → 0 |
| `/services` | 94 → 97 | 3,070 → 2,622 | 100 → 100 | 96 → 96 | 100 → 100 | 0 → 0 |
| `/blog` | 92 → 96 | 3,303 → 2,769 | 100 → 100 | 96 → 96 | 100 → 100 | 0 → 0 |

Best practices is 96 on both sides only because the Vercel insights scripts 404 on a local server.

## 3. UAT click-through (after merge, on production or a Vercel preview)

Do these at 390 (phone) and desktop, in light and dark (OS setting).

**Nav and CTAs**
1. On `/`, `/services`, `/blog/<any post>` and `/ro`, the top bar is one row. At desktop it shows "Timișoara HH:MM", and the time matches Romanian time.
2. "Book a call" (nav), "Book a scoping call" (hero) and the closing-band button each open the Calendly Scoping Call in a new tab. In Vercel Analytics, `calendly_click` still arrives with sources `floating_nav`, `hero`, `final_cta`.
3. The hero's "Get a free teardown" goes to `/teardown`, and `cta_click` (`teardown`, `hero`) still fires.
4. The RO switch goes from `/services` to `/ro/servicii` and back; on `/teardown` it reads "RO" and lands on `/ro`.

**Pages**
5. On `/` and `/ro`, the proof panel sits right of the H1 at desktop and under the CTAs on a phone. Diacritics (ș, ț, ă, î) render in the same font as the rest of the line.
6. On `/services`, the trust panel is beside the H1; "See all prices ↓" jumps to the ladder below the nav; the FAQ items open and close with the keyboard (Tab, Enter).
7. On `/teardown`, submit the form with an empty repo field (validation message), then with a real PR link (success state). Don't submit spam; one real test is enough.
8. On `/workshops/full-day`, the agenda shows times in the left column, and "Email me for dates" opens a mail draft.
9. On `/about`, the 2022 quote shows under "Earlier client work" with no line between the label and the quote.
10. On `/blog`, the filter chips work. On a post, the table-of-contents links (desktop) jump to their headings, and code blocks, tables and the end CTA are readable in dark mode.
11. `/does-not-exist` shows the left-aligned 404 with links back.

**Agent and social surface**
12. `curl -H 'Accept: text/markdown' https://www.adrian-rusan.com/` returns the same Markdown as before the merge.
13. Paste `https://www.adrian-rusan.com/` and one blog post URL into the LinkedIn Post Inspector: the cards show the paper/orange design.

## 4. OpenSEO

Credits spent: **144** (account had 454 at the start, not the 2,000 the brief assumed; 310 left). One project (it already existed), nothing scheduled, no rank trackers. AI-visibility audit skipped for budget. Details: `keyword-research.md`, `seo-baseline.md`.

## 5. Deferred

1. **Copy rewrite (EN + RO)**: Adi ruled "design now, copy later" (2026-10-13). It runs after the content-research pass (session transcripts, LinkedIn, history), using the page targets in `keyword-research.md` and the findings in `copy-findings.md` / `cro-findings.md`. Open it as its own issue.
2. Duplicate `<title>` on `/contact` and `/ro/contact` ("Contact | Adrian Rusan"): a one-line copy fix, left for the copy issue.
3. `Person.email` publishes the personal Gmail next to `contact@` (`schema-findings.md`): Adi to confirm, then a one-line change.
4. The hero panel's content after content research (today: the proof stats; Adi liked the real review log on canvas G).
5. Tailwind 4: not needed for M; skipped.
6. `app/icon.svg` and the manifest `theme_color` still use the old violet.
7. The blog's `AuthorBox`, `RelatedPosts` and `EmailCapture` card were only restyled through tokens, with no layout pass.

## 6. After merging (Adi)

1. Merge #115 → #116 → #117 → #118 → #119, one at a time.
2. In the Vercel dashboard, check production is on the last merge commit. Deploys fail when merges land seconds apart (CONTEXT Known Issues); if it isn't, redeploy without build cache, or promote the latest one.
3. Run the UAT list above on production.
4. Rescan is-agentic from its website (not the CLI; the CLI caches).
5. Open the copy-rewrite issue (deferred item 1).

## 7. Issue comment draft (not posted)

To post on #114 after the merges, if Adi wants:

```
Redesign is in: direction M, 5 PRs (#115–#119), merged in order.

Layout only. Copy, prices, URLs, JSON-LD and the Markdown twins are the same as before; I checked the twins byte for byte and the tags page by page against main.

Lighthouse mobile, 3-run median, local prod build:
• / 94 → 96, LCP 3.07s → 2.70s
• /services 94 → 97, LCP 3.07s → 2.62s
• /blog 92 → 96, LCP 3.30s → 2.77s

Accessibility stays at 100, and contrast passes on all 22 routes in both themes, desktop and 390.

Next is the copy rewrite, after the content research. Should I open it as a separate issue?
```
