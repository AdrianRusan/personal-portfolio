# AI SEO findings for the #114 redesign

Checked 2026-10-13: the repo at `a9ce617`, plus curl against https://www.adrian-rusan.com.
**Verdict:** the agent layer is above average for a solo consultant site. It is all built from data, so it survives a redesign as long as the rewrite keeps copy in `*Copy` exports and `data/*`. Most of the risk is in copy: plain, citable passages and entity facts.

## 1. What exists today (live, verified)

| Surface | Source | Live state |
|---|---|---|
| Markdown twins | `middleware.ts` → `app/api/markdown/[[...path]]` → `lib/markdown/*` | `Accept: text/markdown` returns 200 `text/markdown` on /, /services, /about, /contact, /work, /blog, /teardown, /ro, /ro/servicii. Each twin ends with links to llms.txt and the sitemap. |
| llms.txt | `app/llms.txt/route.ts` (revalidate 3600) | 81 lines: summary blockquote, "When to use", "When not to use", "How to engage", Proof, Services with prices, Workshops, Case studies, Posts, Start here, Română. Prices come from `data/ladder.ts`. |
| llms-full.txt | none | 404 |
| robots | `app/robots.ts` | `*` Allow /, plus explicit Allow for GPTBot, Google-Extended, ClaudeBot, PerplexityBot, FacebookBot and bingbot. Sitemap listed. |
| Sitemap | `app/sitemap.ts` | 20 URLs, EN + RO. |
| hreflang | page `alternates` | en / ro / x-default on the home pair and the services pair. |
| JSON-LD | see `schema-findings.md` | Person, Organization and WebSite on every page, plus per-page types. |
| Server rendering | RSC | The H1 and all body copy are in the HTML response with no JS needed (hero H1 checked). |

Tests that pin this layer: `__tests__/markdown.test.ts` (a twin for every sitemap URL, absolute links, /about and /contact over 500 chars, q=0 handling, Vary) and `__tests__/page-schema.test.ts` (llms.txt lists every sitemap URL and has the when-to-use, when-not-to-use and how-to-engage sections).

## 2. Must-keep (the redesign must not break these)

1. **Copy stays in exported `*Copy` objects and `data/*`.** `lib/markdown` and `llms.txt` read those exports. If new components hard-code strings, the Markdown twins drift from the HTML or break outright. Keep every exported `*Copy` shape that `lib/markdown/pages.ts` imports (`HomeCopy`, `ServicesCopy`, …), or update `lib/markdown` in the same PR.
2. **Same URLs, same twin coverage.** Every sitemap URL keeps a Markdown twin; `markdown.test.ts` enforces this. A new route needs a twin plus an llms.txt line.
3. **`middleware.ts` matcher and `HTML_VARY`**, unchanged. If a redesign moves routes or adds `app/(group)` folders, re-run the curl check in §5.
4. **The structure of llms.txt**: "When to use / When not to use / How to engage / Proof / Services (price) / Case studies / Posts / Română". Agents read these sections when they shortlist a vendor. Prices stay generated from `ladder.ts`, never typed in by hand.
5. **Server-rendered body copy.** No hero text, prices or FAQ answers that only appear after client JS or an animation runs (framer-motion `initial={{opacity:0}}` is fine; content injected on mount is not). Keep FAQs in native `<details>`, which the HTML already contains.
6. **Entity facts, identical everywhere:** "Adrian Rusan", "Senior full-stack engineer", "10+ years in production", "Timișoara, Romania", `contact@adrian-rusan.com`, the Calendly scoping-call URL, and the GitHub, LinkedIn and X `sameAs` profiles. The H1 should still say what he does in one line.
7. **Explicit AI-crawler allows** in robots, and no WAF or Vercel bot rule that blocks them.
8. **Dated proof with its source and caveat**, e.g. "The 30 and the 3 come from one documented run … March 2026. The case study lists everything review caught and everything it missed." Passages like this get cited. Keep the date and the honest caveat in the same paragraph.

## 3. Ranked improvements for the copy rewrite (highest value first)

1. **A definition sentence at the top of every page (40–60 words, standalone).** Example shape for /: "Adrian Rusan is a senior full-stack engineer in Timișoara, Romania, who ships client backlogs with Claude Code agents and personally security-reviews every pull request before merge. Work is sold as fixed-price offers, from a €1,000 Reviewed PR to a €7,500+ Delivery Sprint." The current hero ("I ship your backlog…") is first person with no name, so a lifted passage loses the entity. Do the same for /services, /about and each case study.
2. **Use the visitor's question as the H2.** Current H2s such as "Proof by the numbers" and "Who reviews your code" are labels. Better: "How much does a reviewed AI pull request cost?", "Who reviews AI-generated code before it merges?", "What do AI coding agents get wrong?". Answer directly in the first sentence under each one. The FAQ already does this; extend the pattern to the section headings.
3. **Fix the home Markdown twin's empty "Case studies" section.** `CaseStudyCards` copy has `lead: ""` and `homeMd` prints only the heading plus "See all". The three case studies that the HTML links (30-PR run, honesty gate, cost per merged PR) are missing from `/` as Markdown. Add them as one-line entries with their figure (as `/work`'s twin already does) when the cards are redesigned.
4. **Show "Last updated" on /services, /about and the case studies.** Price pages and proof pages age, and AI engines weight recency. Blog posts already carry `updated`. The same date should feed `dateModified` (see schema findings).
5. **One canonical proof block per fact, written so it can be quoted alone.** For each headline number (30 PRs / 3 injections / 5 misses; $73→$32 cost per PR; 2M+ concurrent PGL viewers), give the number, its date, its source link and its caveat in one paragraph. Never split the number from its caveat across a card and a tooltip.
6. **Add a "Pricing" section to llms.txt, or a `/pricing.md` twin of /services#ladder,** as a flat table: offer, price, duration, what is delivered, VAT note. llms.txt already has prices inline, so this is low effort. Only do it if the rewrite changes the ladder structure; otherwise it adds nothing.
7. **RO parity on the agent surface.** llms.txt RO lines are one-liners with no prices; /ro has no FAQ schema (see schema findings). If RO is meant to get leads from Romanian AI answers, give `/ro/servicii` the same definition sentence and question-shaped H2s in Romanian.
8. **Add a `Link` header or `<link rel="alternate" type="text/markdown">` on HTML pages** pointing to the same URL, so agents that do not try content negotiation can find the twin. This is not copy work and can be deferred to after the redesign.
9. **robots: optionally name the search and user agents** (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `Perplexity-User`, `meta-externalagent`). They are already allowed through `*`, so this is cosmetic. The comment "FacebookBot = Meta's AI crawler" is inaccurate, and the non-standard `Host:` line can go. Low priority.
10. **Off-site consensus (not page work):** keep the LinkedIn headline, GitHub bio and X bio wording the same as the new hero and the Person `description`. Models trust facts they see repeated across sources.

## 4. Copy-rewrite guardrails (AI-visibility side)

- No invented numbers, clients or quotes. Every new stat keeps a source; `npm test` claim tests (`thirty-pr-claims`, `workflow-numbers`, `testimonials`, `experience`) must still pass.
- Do not name clients beyond those the site shows today: Bono Fintech (LinkedIn-level detail only), the testimonial companies already on the page, PGL, Ipsos and GoSocial in the bio.
- No keyword stuffing and no separate "AI version" of the copy. The Markdown twin must be the same words as the HTML.
- Keep "2–3x, not 100x". It is a distinctive and quotable position.

## 5. Re-verify after the redesign ships (≈10 min)

```
B=https://www.adrian-rusan.com
for p in "" services about contact work blog teardown ro ro/servicii ro/despre ro/contact; do
  curl -s -o /dev/null -w "$p %{http_code} %{content_type}\n" -H 'Accept: text/markdown' $B/$p; done
curl -s $B/llms.txt | head -20; curl -s $B/robots.txt
```
Expect 200 and `text/markdown` everywhere, llms.txt prices that match /services, and the robots allows unchanged. Then run `npm test` (markdown, page-schema and claim suites).

Not checked: live citation rates in ChatGPT, Perplexity or AI Overviews (no query panel was run). Treat this as a structure audit, not a visibility measurement.
