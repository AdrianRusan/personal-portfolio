# HANDOFF — #133 routes, nav, links and interactivity audit

State as of 2026-10-14. Verdict: ready to merge once Adi has clicked the UAT list below. 0 BROKEN open, the full ladder is green on both branches, and nothing is deferred inside the tests (no `test.fail()` left).

## What changed, check first

1. `docs/plans/feat-133-interaction-audit/interaction-inventory.md`: 36 findings, every control per route at 1440 + 390, the EN↔RO locale map. Read the Findings table (2 min).
2. `e2e/interactions.spec.ts` (#135): 62 tests per viewport, inside `npm run e2e`. Forms never reach Resend (`page.route`), Calendly is never opened (clicks are cancelled after the attribution listener has run).
3. Fixes (#136): workshop nav marker (I-12), blog filter `aria-pressed` + search labels (I-50, I-57), canonical share URL (I-55), private taco-console links unlinked (I-04), and unpublished-post links kept out of the Markdown twins (I-09).

Review time: about 15 minutes for both PRs, plus 10 minutes of clicking.

## Merge order

1. **#135** `feat/133-interaction-audit` → `main` (squash).
2. Check that GitHub retargeted **#136** to `main`. If it didn't, change the base to `main` in the PR.
3. **#136** `feat/133-interaction-fixes` → `main` (squash). It closes #133.

Merge them a minute apart: Vercel production deploys fail when merges land seconds apart (CONTEXT Known Issues).

## UAT click list (≤ 10, on the #136 Vercel preview)

1. At phone width, open `/workshops/half-day`. Expected: **Services** is underlined in the nav, and "Book a call" stays fully on screen.
2. At phone width on `/services`, tap **RO**. Expected: `/ro/servicii` in Romanian. Tap **EN**: back on `/services`.
3. On `/blog` (or `/teardown`), tap **RO**. Expected: `/ro` (no Romanian twin), and hovering the switch says "Pagina principală în română".
4. **The one real Scoping Call click-through.** Open `/services?utm_source=uat` and click **Book a call** in the nav. Expected: Calendly's Scoping Call opens in a new tab with `utm_source=uat&utm_content=/services` in its URL. **Stop before picking a time.**
5. On `/services`, click **Scope an audit →**. Expected: Calendly opens with the first answer already set to "AI Audit (from €1,500)". Close the tab without booking.
6. On `/services`, click **Email me to book the €200 call →**. Expected: your mail app opens to contact@adrian-rusan.com with the subject "AI Strategy Call (€200)" (€ sign intact). Don't send.
7. On `/blog`, tap **Security**, then **All**. Expected: the post list filters, then comes back. With VoiceOver (Cmd+F5) the buttons read "selected"/"not selected" (or "pressed"/"not pressed", depending on the VoiceOver version).
8. Open a post with `?utm_source=uat` on the URL, click **Copy link**, paste it somewhere. Expected: `https://www.adrian-rusan.com/blog/<slug>`, with no `?utm_source`.
9. Open `/work/30-reviewed-prs-3-vulnerabilities`. Expected: "taco-console#127" and "#128" are plain text, not links.
10. Optional, preview only, never production: submit the checklist form with your own address. Expected: "Check your inbox." if the Preview env has the Resend vars. Without them the API fails closed, so the red retry line is correct too.

## Deferred SMELLs, one recommendation each

| ID | What | Recommendation |
|---|---|---|
| I-08 | `http://adrian-rusan.com/` takes 2 redirect hops (http→https, then apex→www) | Leave it. Nothing links to the http apex; Vercel adds the HTTPS hop itself. Revisit only if Search Console reports redirect chains. |
| I-22 | On EN-only pages the footer "Română" link goes to `/ro` with no hint, unlike the nav switch | Give `LocaleSwitch` the same `title`/`aria-label` as the nav switch when `hasTwin()` is false (about 6 lines, no visible copy change). |
| I-23 | `/ro/<unknown>` shows the English 404 | Add `app/(ro)/ro/not-found.tsx` with RO copy through `/adi-voice` when a RO page with traffic exists. It's a new page, so outside this brief. |
| I-32 | `/teardown` "Prefer to talk? Book a scoping call" opens Calendly in the same tab; every other Calendly CTA uses a new tab | Keep it. A visitor who clicks it has picked the call over the form, and attribution and the event still fire. Make it `newTab` only if analytics show teardown visitors dropping off after it. |
| I-56 | Copy link / Copy code: a blocked clipboard fails silently | Wrap `navigator.clipboard.writeText` in try/catch and show "Couldn't copy" (copy through `/adi-voice`). Low traffic, low priority. |
| I-58 | `app/global-error.jsx` is unstyled, EN only | Leave it: it only renders when the root layout itself crashes, and Sentry reports it. |
| I-60 | Blog tag filters don't update `?tag=` | Push `?tag=` with `router.replace` on click, so the filter survives reload and shares. Do it with the blog remake if it touches `/blog`. |

## For the blog worker (`content/blog/*`)

- **No broken in-post links in the HTML.** All 56 unique links across the 11 post files (published or not) were checked. The 7 that don't return 200 are expected:
  - five links to posts that aren't live yet (`the-rules-file-my-agents-follow` ×3, `how-i-run-claude-code-agents-in-parallel`, `reviewer-agents-that-dont-trust-other-agents`). `MDXContent` shows those as plain text until the post's date;
  - `how-i-run-claude-code-agents-in-parallel` → `/work/nine-prs-one-afternoon`: both go live on 24 Oct, so it works. The plain-text gate only covers `/blog/` links, not `/work/`, so never date that post before the study;
  - `how-i-measure-claude-code-roi` → `github.com/anthropics/claude-code/blob/main/CHANGELOG.md` returned 503 once (a GitHub blip, most likely). Recheck it before 21 Nov.
- Agents used to get those five unpublished links as live 404s through the Markdown twin. #136 fixes that in `lib/markdown`, so there's nothing to change in the posts.
- The 24 Oct re-link of `[nine PRs](/work/nine-prs-one-afternoon)` in `2-3x-not-100x.mdx` is still yours (memory: re-link nine PRs).

## Post-merge steps

1. Vercel dashboard → Deployments: check that Production is on the #136 merge commit. If an older deploy finished last, promote the latest. If it failed, use Redeploy without build cache.
2. Re-run the read-only production crawl and expect `0 unexpected`. It's a GET-only crawl of the sitemap, every internal href, `#hash` ids, the four 301s and `llms.txt`, with no browser. Run `node docs/plans/feat-133-interaction-audit/get-crawl.mjs https://www.adrian-rusan.com` (Node 18+, no dependencies). The same checks run in `e2e/interactions.spec.ts` `links (I-01..I-08)` if you point `E2E_PORT` at a local build.
3. `curl -s -H "Accept: text/markdown" https://www.adrian-rusan.com/blog/66-days-of-claude-code-by-the-numbers | grep -c "adrian-rusan.com/blog/the-rules-file"` returns `0` until 17 Oct (I-09 live).

## Evidence

- Before: local build of `d2fde51` and production, both: 20 pages, 451 internal hrefs, 25 unique paths, 0 unexpected non-200s, 4 one-hop 301s.
- After (#136 build): same counts, 0 unexpected.
- Screenshots at 390: `screenshots/` (nav, locale switch, both forms mocked, blog filter).
