# Interaction inventory (#133)

Every route, nav item, link, button, form and control on adrian-rusan.com, EN + RO, after #114 and #125.

- **Source:** a local production build (`npm run build`, `npm start -p 3133`, `origin/main` at `d2fde51`) crawled in Chromium at 1440 and 390, plus a GET-only crawl of https://www.adrian-rusan.com on 2026-10-14 (no browser, no JS, no form submits, no Calendly clicks).
- **Tests:** each finding ID below names its test in `e2e/interactions.spec.ts`.
- **Statuses:** OK works and points where it should. BROKEN fails a rule in brief R2. SMELL works but hurts conversion or clarity.

## Counts

| | Findings (checks) | Control rows (per-route tables) |
|---|---|---|
| OK | 22 | 415 |
| BROKEN | 5 (I-04, I-09, I-12, I-50, I-57) | 6 |
| SMELL | 8 | 4 |
| N/A | 2 (no mobile menu toggle, no theme toggle) | |

BROKEN open after #136: **0** (all five are fixed there). SMELL fixed: I-55. SMELL deferred: I-08, I-22, I-23, I-32, I-56, I-58, I-60, each with a recommendation in HANDOFF.md.

Crawls: local 20 sitemap pages, 451 internal hrefs, 25 unique paths, 0 unexpected non-200s. Production: identical counts, 0 unexpected non-200s. The four 301s are one hop each on both. External links: 23 checked, 2 BROKEN (I-04), 1 returns 403 to scripts only (devops.com, opens in a browser).

## Findings

| ID | Area | Check | Observed | Status | Test |
|---|---|---|---|---|---|
| I-01 | Links | Every sitemap and `llms.txt` URL, plus `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/llms.txt` | all 200, local and production | OK | `every sitemap and llms.txt URL is a 200` |
| I-02 | Links | Every internal `href` on every page resolves in at most one hop; every `#hash` has its `id` | 451 hrefs, 0 failures | OK | `every internal href resolves…` |
| I-03 | Links | `/workshops` → `/services#ladder`, three blog 301s | one 301 hop to a 200, `#ladder` exists | OK | `redirects are one 301 hop` |
| I-04 | Links | External links resolve | `taco-console#127` and `#128` on `/work/30-reviewed-prs-3-vulnerabilities` 404: the repo is private | **BROKEN** → fixed in #136 (unlinked, kept as text) | `case studies link to no private repo` |
| I-05 | Links | `target="_blank"` carries `rel="noopener"` | every one does | OK | `new-tab links carry rel="noopener"` |
| I-06 | Links | `mailto:` decodes to `CONTACT_EMAIL` with a clean subject | 6 subjects, all percent-encoded, decode clean (no `+`, no `%xx` left) | OK | `mailto links decode…` |
| I-07 | Links | RO pages never link EN pages that have an RO twin or fallback | only the locale switches (hreflang `en`) | OK | `RO pages link to no EN page…` |
| I-08 | Links | Host redirects | `http://adrian-rusan.com/` takes 2 hops (http→https, apex→www); https apex and http www take 1 | SMELL, deferred (Vercel domain config, out of scope) | production crawl only |
| I-09 | Links | Links inside the Markdown twins (`Accept: text/markdown`) of live posts resolve | the 66-days post's twin links 3 posts that aren't live yet (404); the HTML shows them as plain text, `lib/markdown` didn't | **BROKEN** → fixed in #136 (same gate as `MDXContent`) | jest `links no blog post that isn't live yet` |
| I-10 | Nav | Current item marked on every route | 14 routes as expected; `/about`, `/contact`, `/teardown`, `/privacy` have no nav item by design | OK | `<route> marks … as current` |
| I-12 | Nav | `/workshops/*` marks Services (the workshops live on the services ladder; `/workshops` redirects there) | no item marked | **BROKEN** → fixed in #136 | `workshop pages mark Services as current` |
| I-13 | Nav | Nav hrefs match `data/nav.ts` | EN and RO match; RO Proiecte/Blog → EN `/work`, `/blog` by design | OK | `nav links go where data/nav.ts says` |
| I-14 | Nav | Every nav link and the CTA reachable by Tab and on screen when focused, 1440 + 390 | yes | OK | `every nav link and the CTA are reachable…` |
| I-15 | Nav, 390 | No hamburger: one row, links scroll sideways, the CTA stays on screen | CTA fully visible; every link scrolls into view | OK. Open/close/Escape/focus-return: **N/A**, there is no menu to open | `the nav CTA stays on screen…` |
| I-16 | Nav | Click navigates client-side and moves the current marker | yes | OK | `a nav click navigates…` |
| I-20 | Locale | Nav switch lands on the mapped counterpart with the right `<html lang>` | 13 routes, all as mapped | OK | `<from> switches to <to>` |
| I-21 | Locale | Footer switch points to the same counterpart | yes | OK | same tests |
| I-22 | Locale | On EN-only pages the nav switch says it goes to the RO homepage (title + aria-label); the footer "Română" link says nothing | footer gives no hint | SMELL, deferred (copy) | — |
| I-23 | Locale | `/ro/<unknown>` 404 | renders the EN 404 with the EN nav, `lang="en"` | SMELL, deferred (needs a new RO not-found page, R6) | — |
| I-30 | CTAs | Every Calendly CTA is `CALENDLY_URL`, gets `utm_source`/`utm_medium` from the landing URL plus `utm_content=<page>` on click, keeps its `a1` tier prefill, fires `calendly_click` with `source` + `locale` | 10 pages, every visible CTA | OK | `<page>: every Calendly CTA is the Scoping Call…` |
| I-31 | CTAs | Nav CTA event | `floating_nav`/`en`, `ro_floating_nav`/`ro` | OK | `the nav CTA fires calendly_click` |
| I-32 | CTAs | `/teardown` "Prefer to talk? Book a scoping call" opens Calendly in the same tab (`newTab={false}`); every other Calendly CTA opens a new tab | attribution and event still fire | SMELL, deferred | covered by I-30 |
| I-35 | CTAs | Paid-call `mailto:` on `/services` fires `cta_click` | yes | OK | `the paid-call mailto…` |
| I-40 | Forms | Checklist capture: empty and invalid email show an error with `aria-invalid`, no request; API error shows the retry line; double-click sends one request; success shows "Check your inbox." and fires `email_submit` | all as expected (API mocked with `page.route`) | OK | `checklist form…` |
| I-45 | Forms | Teardown form: empty submit shows both field errors and focuses the first; an API field 400 maps back to its field; double-click sends one request; body is `{email, repoUrl, note, optIn}`; success fires `teardown_request` | all as expected (API mocked) | OK | `teardown form…` |
| I-50 | Controls | Blog tag filters expose their pressed state | plain `<button>`s, no `aria-pressed`: a screen reader can't tell which filter is on | **BROKEN** → fixed in #136 | `blog tag filters are toggle buttons…` |
| I-51 | Controls | FAQ `<details>` open and close by keyboard | yes | OK | `FAQ items open and close by keyboard` |
| I-52 | Controls | Skip link is the first Tab stop and jumps to `#main` | yes | OK | `the skip link moves focus to main` |
| I-53 | Controls | Every keyboard stop shows a focus ring (first 40 stops on `/`, `/services`, `/ro`, `/blog`, `/teardown`) | yes | OK | `<page>: every keyboard stop shows a focus ring` |
| I-54 | Controls | Theme toggle persists | **N/A**: the site follows the system theme, there is no toggle | — | — |
| I-55 | Controls | Share and Copy link use the canonical post URL | Copy link copies `window.location.href`, so a reader's UTMs and `#hash` travel with every shared link and skew attribution; the share hrefs differ between server and client render (hydration mismatch) | SMELL → fixed in #136 (one line) | `share and copy link use the canonical post URL` |
| I-56 | Controls | Copy link / Copy code when the clipboard is blocked | promise rejects, no feedback | SMELL, deferred | — |
| I-57 | Controls | Blog search input and its clear button have accessible names | no label, no `aria-label` (only rendered at 15+ posts, so not live today) | **BROKEN** (latent) → fixed in #136 | not testable until 15 posts |
| I-58 | Controls | `app/global-error.jsx` | "Try again" reloads; EN only, unstyled | SMELL, deferred | — |
| I-60 | Controls | Blog tag filter state survives reload and sharing | clicking a tag doesn't update `?tag=`, so `/blog?tag=security` → All still shows `?tag=security` | SMELL, deferred | — |
| I-59 | Analytics | Only the five named events fire; PII-shaped keys throw | as designed (`__tests__/analytics*.test.ts`) | OK | jest + the event checks above |

## EN ↔ RO locale map

`lib/locale.ts` pairs four pages; every other page switches to the other homepage, and the nav switch says so in its `title` and `aria-label`.

| EN | RO | EN → RO | RO → EN |
|---|---|---|---|
| `/` | `/ro` | `/ro` | `/` |
| `/services` | `/ro/servicii` | `/ro/servicii` | `/services` |
| `/about` | `/ro/despre` | `/ro/despre` | `/about` |
| `/contact` | `/ro/contact` | `/ro/contact` | `/contact` |
| `/blog`, `/blog/*` | none (EN-only) | `/ro` | — |
| `/work`, `/work/*` | none (EN-only) | `/ro` | — |
| `/teardown` | none: RO uses `RO_TEARDOWN_EMAIL` | `/ro` | — |
| `/workshops/*` | none: RO uses the workshop `mailto:` | `/ro` | — |
| `/privacy` | none | `/ro` | — |
| 404 | none (I-23) | `/ro` | — |

## Per-route controls

Generated from the 1440 + 390 crawl. "Seen at" lists the widths where the control is visible. Nav and footer are listed once per locale.

### EN shell (nav + footer), on every EN page

As rendered on `/services`; the locale switch target changes per page (see the locale map).

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Adrian Rusan | a `/` | opens / | 200 | 1440 | OK |
| Home | a `/` | opens / | 200 | 1440 + 390 | OK |
| Services | a `/services` | opens /services | 200 | 1440 + 390 | OK |
| Work | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| Blog | a `/blog` | opens /blog | 200 | 1440 + 390 | OK |
| RO, citește în română | a `/ro/servicii` | opens /ro/servicii | 200 | 1440 + 390 | OK |
| Book a call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Română | a `/ro/servicii` | opens /ro/servicii | 200 | 1440 + 390 | OK |
| About | a `/about` | opens /about | 200 | 1440 + 390 | OK |
| Contact | a `/contact` | opens /contact | 200 | 1440 + 390 | OK |
| Privacy | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |
| RSS | a `/feed.xml` | opens /feed.xml | 200 | 1440 + 390 | OK |
| contact@adrian-rusan.com | a `mailto:contact@adrian-rusan.com` | mail to contact@adrian-rusan.com | decodes clean | 1440 + 390 | OK |
| Adrian Rusan GitHub Profile | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on X | a `https://x.com/adrian_rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan LinkedIn Profile | a `https://linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |

### RO shell (nav + footer), on every RO page

As rendered on `/ro/servicii`; the locale switch target changes per page (see the locale map).

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Adrian Rusan | a `/ro` | opens /ro | 200 | 1440 | OK |
| Acasă | a `/ro` | opens /ro | 200 | 1440 + 390 | OK |
| Servicii | a `/ro/servicii` | opens /ro/servicii | 200 | 1440 + 390 | OK |
| Proiecte | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| Blog | a `/blog` | opens /blog | 200 | 1440 + 390 | OK |
| EN, read in English | a `/services` | opens /services | 200 | 1440 + 390 | OK |
| Programează | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| English | a `/services` | opens /services | 200 | 1440 + 390 | OK |
| Despre | a `/ro/despre` | opens /ro/despre | 200 | 1440 + 390 | OK |
| Contact | a `/ro/contact` | opens /ro/contact | 200 | 1440 + 390 | OK |
| Confidențialitate | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |
| RSS | a `/feed.xml` | opens /feed.xml | 200 | 1440 + 390 | OK |
| contact@adrian-rusan.com | a `mailto:contact@adrian-rusan.com` | mail to contact@adrian-rusan.com | decodes clean | 1440 + 390 | OK |
| Adrian Rusan pe GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan pe X | a `https://x.com/adrian_rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan pe LinkedIn | a `https://linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |

### `/` (HTTP 200)

Nav current: Home. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Get a free teardown | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| See a sample report → | a `/sample-sprint-security-report.pdf` | opens /sample-sprint-security-report.pdf | 200 | 1440 + 390 | OK |
| Here's what the agents get wrong → | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| Own project 3 shell-injection paths from request input caught in revie | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| Client work (NDA) 0 the true count behind a landing-page line labelled | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| Own setup 57% lower cost per merged PR in one month, then it rose 42%  | a `/work/agent-cost-per-commit` | opens /work/agent-cost-per-commit | 200 | 1440 + 390 | OK |
| See all case studies → | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| See every offer and what's included → | a `/services#ladder` | opens /services#ladder | 200, id present | 1440 + 390 | OK |
| Adrian Rusan on GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on X | a `https://x.com/adrian_rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| How is the quality any good if AI agents wrote it? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Unsupervised agents ship vulnerabilities. How do you handle security?  | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Who owns the code? Will you sign an NDA? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Who pays for the LLM and API usage? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Why not an agency, more engineers, or an AI review bot? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What happens after I book a call? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/services` (HTTP 200)

Nav current: Services. Locale switch → `/ro/servicii`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| See all prices ↓ | a `#ladder` | scrolls to #ladder | id present | 1440 + 390 | OK |
| Read the case study → | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| See a sample security report → | a `/sample-sprint-security-report.pdf` | opens /sample-sprint-security-report.pdf | 200 | 1440 + 390 | OK |
| Email me to book the €200 call → | a `mailto:contact@adrian-rusan.com?subject=AI%20Strategy%20Call%20(%E2%82` | mail to contact@adrian-rusan.com, subject "AI Strategy Call (€200)" | decodes clean | 1440 + 390 | OK |
| Scope an audit → | a `https://calendly.com/adrian-rusan/new-meeting?a1=AI+Audit+%28from+%E2%` | Scoping Call + utm_* + utm_content=<page>, a1 "AI Audit (from €1,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or start with a free teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| Half-day agenda → | a `/workshops/half-day` | opens /workshops/half-day | 200 | 1440 + 390 | OK |
| Full-day agenda → | a `/workshops/full-day` | opens /workshops/full-day | 200 | 1440 + 390 | OK |
| Scope an automation → | a `https://calendly.com/adrian-rusan/new-meeting?a1=AI+Automation+%28from` | Scoping Call + utm_* + utm_content=<page>, a1 "AI Automation (from €3,000)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| See the fact gate I built → | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| What's included ↓ | a `#harness` | scrolls to #harness | id present | 1440 + 390 | OK |
| What's included ↓ | a `#entry-offer` | scrolls to #entry-offer | id present | 1440 + 390 | OK |
| What's included ↓ | a `#sprint` | scrolls to #sprint | id present | 1440 + 390 | OK |
| What's included ↓ | a `#retainer` | scrolls to #retainer | id present | 1440 + 390 | OK |
| How the review works → | a `/#ship-verify` | opens /#ship-verify | 200, id present | 1440 + 390 | OK |
| What you get + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Pilot+Sprint+%28%E2%8` | Scoping Call + utm_* + utm_content=<page>, a1 "Pilot Sprint (€7,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Standard+Sprint+%28%E` | Scoping Call + utm_* + utm_content=<page>, a1 "Standard Sprint (€14,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Scale+Sprint+%28from+` | Scoping Call + utm_* + utm_content=<page>, a1 "Scale Sprint (from €24,000)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Guarantees + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What this is not + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Payment + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Start with one PR | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Prefer email? Send the ticket → | a `mailto:contact@adrian-rusan.com?subject=Reviewed%20PR%20(%E2%82%AC1%2C` | mail to contact@adrian-rusan.com, subject "Reviewed PR (€1,000)" | decodes clean | 1440 + 390 | OK |
| Terms + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| How good is the code if AI agents wrote it, and what if the agents get | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Unsupervised agents ship vulnerabilities. How do you handle security?  | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Who owns the code, what happens to our data, and will you sign an NDA? | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Which stacks and languages do you review? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What timezone do you work in? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What counts as one PR? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| How do payment terms work, who invoices, and who pays for LLM and API  | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Why not a contractor by the day, an agency, more engineers, or an AI r | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/teardown` (HTTP 200)

Nav current: none. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| https://github.com/you/your-repo/pull/42 | input | input url field | works | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| e.g. this PR was mostly agent-written; I'm nervous about the auth chan | textarea | textarea field | works | 1440 + 390 | OK |
| optIn | input | input checkbox field | works | 1440 + 390 | OK |
| Send for a free teardown | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |
| Prefer to talk? Book a scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, same tab, attribution added on click | 1440 + 390 | OK (same tab, I-32) |

### `/privacy` (HTTP 200)

Nav current: none. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| contact@adrian-rusan.com | a `mailto:contact@adrian-rusan.com` | mail to contact@adrian-rusan.com | decodes clean | 1440 + 390 | OK |
| /teardown | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/about` (HTTP 200)

Nav current: none. Locale switch → `/ro/despre`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| on the home page | a `/#ship-verify` | opens /#ship-verify | 200, id present | 1440 + 390 | OK |
| the services page | a `/services#process` | opens /services#process | 200, id present | 1440 + 390 | OK |
| Case studies | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| Blog | a `/blog` | opens /blog | 200 | 1440 + 390 | OK |
| LinkedIn | a `https://www.linkedin.com/in/adrian-rusan/` | external, same tab | 200 | 1440 + 390 | OK |
| GitHub | a `https://github.com/AdrianRusan` | external, same tab | 200 | 1440 + 390 | OK |
| X | a `https://x.com/adrian_rusan` | external, same tab | 200 | 1440 + 390 | OK |
| Here's what they get wrong | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/contact` (HTTP 200)

Nav current: none. Locale switch → `/ro/contact`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Email me | a `mailto:contact@adrian-rusan.com` | mail to contact@adrian-rusan.com | decodes clean | 1440 + 390 | OK |
| Send a repo | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/blog` (HTTP 200)

Nav current: Blog. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| All | button | filters posts by tag; pressed state exposed | works | 1440 + 390 | BROKEN I-50 |
| Claude Code | button | filters posts by tag; pressed state exposed | works | 1440 + 390 | BROKEN I-50 |
| Code review | button | filters posts by tag; pressed state exposed | works | 1440 + 390 | BROKEN I-50 |
| Security | button | filters posts by tag; pressed state exposed | works | 1440 + 390 | BROKEN I-50 |
| Featured The Shell-Injection Bugs My Agents Wrote: 4 Caught, 3 Missed  | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| 463 Claude Code Sessions, Counted: My Median Prompt Was 10 Words 463 C | a `/blog/66-days-of-claude-code-by-the-numbers` | opens /blog/66-days-of-claude-code-by-the-numbers | 200 | 1440 + 390 | OK |
| 2–3x on My Backlog, 8% in DX's 400-Company Data: Where the AI Speed-Up | a `/blog/2-3x-not-100x` | opens /blog/2-3x-not-100x | 200 | 1440 + 390 | OK |
| How to Review AI-Generated Code: What 64 Fixes on 30 Agent PRs Were Fo | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/work` (HTTP 200)

Nav current: Work. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| 3 shell-injection paths from request input caught in review. The study | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| 0 the true count behind a landing-page line labelled "real number". Th | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| 57% lower cost per merged PR in one month, then it rose 42% by early O | a `/work/agent-cost-per-commit` | opens /work/agent-cost-per-commit | 200 | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/workshops/full-day` (HTTP 200)

Nav current: none (BROKEN I-12: should be Services). Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Email me for dates | a `mailto:contact@adrian-rusan.com?subject=Team%20workshop%20(full%20day)` | mail to contact@adrian-rusan.com, subject "Team workshop (full day)" | decodes clean | 1440 + 390 | OK |
| contact@adrian-rusan.com | a `mailto:contact@adrian-rusan.com?subject=Team%20workshop%20(full%20day)` | mail to contact@adrian-rusan.com, subject "Team workshop (full day)" | decodes clean | 1440 + 390 | OK |
| Or see the half day version (€3,000) → | a `/workshops/half-day` | opens /workshops/half-day | 200 | 1440 + 390 | OK |
| All services and prices → | a `/services` | opens /services | 200 | 1440 + 390 | OK |

### `/workshops/half-day` (HTTP 200)

Nav current: none (BROKEN I-12: should be Services). Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Email me for dates | a `mailto:contact@adrian-rusan.com?subject=Team%20workshop%20(half%20day)` | mail to contact@adrian-rusan.com, subject "Team workshop (half day)" | decodes clean | 1440 + 390 | OK |
| contact@adrian-rusan.com | a `mailto:contact@adrian-rusan.com?subject=Team%20workshop%20(half%20day)` | mail to contact@adrian-rusan.com, subject "Team workshop (half day)" | decodes clean | 1440 + 390 | OK |
| Or see the full day version (€5,000) → | a `/workshops/full-day` | opens /workshops/full-day | 200 | 1440 + 390 | OK |
| All services and prices → | a `/services` | opens /services | 200 | 1440 + 390 | OK |

### `/ro` (HTTP 200)

Nav current: Acasă. Locale switch → `/`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Sari la conținut | a `#main` | scrolls to #main | id present | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Trimite-mi un repo pe email | a `mailto:contact@adrian-rusan.com?subject=Teardown%20gratuit` | mail to contact@adrian-rusan.com, subject "Teardown gratuit" | decodes clean | 1440 + 390 | OK |
| Vezi un exemplu de raport → | a `/sample-sprint-security-report.pdf` | opens /sample-sprint-security-report.pdf | 200 | 1440 + 390 | OK |
| Iată ce greșesc agenții → | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| Proiect propriu 3 căi de shell injection din input-ul cererilor, prins | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| Proiect pentru client (NDA) 0 e numărul adevărat din spatele unui rând | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| Setup propriu 57% cost mai mic pe PR merge-uit într-o lună, apoi a cre | a `/work/agent-cost-per-commit` | opens /work/agent-cost-per-commit | 200 | 1440 + 390 | OK |
| Toate studiile de caz → | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| Vezi toate ofertele și ce includ → | a `/ro/servicii#ladder` | opens /ro/servicii#ladder | 200, id present | 1440 + 390 | OK |
| Adrian Rusan pe GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan pe LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan pe X | a `https://x.com/adrian_rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Cum poate fi calitatea bună dacă codul l-au scris agenți AI? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Agenții nesupravegheați livrează vulnerabilități. Cum tratezi securita | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Al cui e codul? Semnezi un NDA? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Cine plătește consumul de LLM și API? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| De ce să nu angajez o agenție, mai mulți ingineri sau un bot de review | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Ce se întâmplă după ce programezi o discuție? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Sau trimite-mi un repo pe email pentru un teardown gratuit → | a `mailto:contact@adrian-rusan.com?subject=Teardown%20gratuit` | mail to contact@adrian-rusan.com, subject "Teardown gratuit" | decodes clean | 1440 + 390 | OK |

### `/ro/servicii` (HTTP 200)

Nav current: Servicii. Locale switch → `/services`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Sari la conținut | a `#main` | scrolls to #main | id present | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Vezi toate prețurile ↓ | a `#ladder` | scrolls to #ladder | id present | 1440 + 390 | OK |
| Citește studiul de caz (EN) → | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| Vezi un exemplu de raport de securitate (EN) → | a `/sample-sprint-security-report.pdf` | opens /sample-sprint-security-report.pdf | 200 | 1440 + 390 | OK |
| Scrie-mi ca să rezervi sesiunea de 110 € → | a `mailto:contact@adrian-rusan.com?subject=Sesiune%20de%20strategie%20AI%` | mail to contact@adrian-rusan.com, subject "Sesiune de strategie AI (110 €)" | decodes clean | 1440 + 390 | OK |
| Programează un audit → | a `https://calendly.com/adrian-rusan/new-meeting?a1=Audit+AI+%28de+la+850` | Scoping Call + utm_* + utm_content=<page>, a1 "Audit AI (de la 850 €)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Sau trimite-mi un repo pe email pentru un teardown gratuit → | a `mailto:contact@adrian-rusan.com?subject=Teardown%20gratuit` | mail to contact@adrian-rusan.com, subject "Teardown gratuit" | decodes clean | 1440 + 390 | OK |
| Scrie-mi pentru date libere → | a `mailto:contact@adrian-rusan.com?subject=Workshop%20pentru%20echip%C4%8` | mail to contact@adrian-rusan.com, subject "Workshop pentru echipă" | decodes clean | 1440 + 390 | OK |
| Hai să discutăm o automatizare → | a `https://calendly.com/adrian-rusan/new-meeting?a1=Automatizare+AI+%28de` | Scoping Call + utm_* + utm_content=<page>, a1 "Automatizare AI (de la 1.650 €)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Vezi filtrul de fapte construit de mine (EN) → | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| Ce include ↓ | a `#harness` | scrolls to #harness | id present | 1440 + 390 | OK |
| Ce include ↓ | a `#entry-offer` | scrolls to #entry-offer | id present | 1440 + 390 | OK |
| Ce include ↓ | a `#sprint` | scrolls to #sprint | id present | 1440 + 390 | OK |
| Ce include ↓ | a `#retainer` | scrolls to #retainer | id present | 1440 + 390 | OK |
| Cum funcționează review-ul → | a `/ro#ship-verify` | opens /ro#ship-verify | 200, id present | 1440 + 390 | OK |
| Ce primești + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting?a1=Sprint+Pilot+%284.100` | Scoping Call + utm_* + utm_content=<page>, a1 "Sprint Pilot (4.100 €)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting?a1=Sprint+Standard+%288.` | Scoping Call + utm_* + utm_content=<page>, a1 "Sprint Standard (8.000 €)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting?a1=Sprint+Extins+%28de+l` | Scoping Call + utm_* + utm_content=<page>, a1 "Sprint Extins (de la 13.200 €)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Garanții + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Ce nu este + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Plată + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Începe cu un PR | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Preferi emailul? Trimite tichetul → | a `mailto:contact@adrian-rusan.com?subject=PR%20revizuit%20(550%20%E2%82%` | mail to contact@adrian-rusan.com, subject "PR revizuit (550 €)" | decodes clean | 1440 + 390 | OK |
| Condiții + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Cât de bun e codul dacă l-au scris agenți AI, și ce se întâmplă dacă a | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Agenții nesupravegheați livrează vulnerabilități. Cum tratezi securita | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Al cui e codul, ce se întâmplă cu datele noastre și semnezi un NDA? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Ce stack-uri și limbaje verifici? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| În ce fus orar lucrezi? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Ce înseamnă un PR? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Cum funcționează plata, cine facturează și cine plătește consumul de L | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| De ce nu un contractor plătit pe zi, o agenție, mai mulți ingineri sau | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |

### `/ro/despre` (HTTP 200)

Nav current: none. Locale switch → `/about`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Sari la conținut | a `#main` | scrolls to #main | id present | 1440 + 390 | OK |
| pe pagina principală | a `/ro#ship-verify` | opens /ro#ship-verify | 200, id present | 1440 + 390 | OK |
| pagina de servicii | a `/ro/servicii#process` | opens /ro/servicii#process | 200, id present | 1440 + 390 | OK |
| Studii de caz | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| Blog | a `/blog` | opens /blog | 200 | 1440 + 390 | OK |
| LinkedIn | a `https://www.linkedin.com/in/adrian-rusan/` | external, same tab | 200 | 1440 + 390 | OK |
| GitHub | a `https://github.com/AdrianRusan` | external, same tab | 200 | 1440 + 390 | OK |
| X | a `https://x.com/adrian_rusan` | external, same tab | 200 | 1440 + 390 | OK |
| Iată ce greșesc | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Sau trimite-mi un repo pe email pentru un teardown gratuit → | a `mailto:contact@adrian-rusan.com?subject=Teardown%20gratuit` | mail to contact@adrian-rusan.com, subject "Teardown gratuit" | decodes clean | 1440 + 390 | OK |

### `/ro/contact` (HTTP 200)

Nav current: none. Locale switch → `/contact`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Sari la conținut | a `#main` | scrolls to #main | id present | 1440 + 390 | OK |
| Programează o discuție | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Scrie-mi | a `mailto:contact@adrian-rusan.com` | mail to contact@adrian-rusan.com | decodes clean | 1440 + 390 | OK |
| Trimite un repo pe email | a `mailto:contact@adrian-rusan.com?subject=Teardown%20gratuit` | mail to contact@adrian-rusan.com, subject "Teardown gratuit" | decodes clean | 1440 + 390 | OK |

### `/does-not-exist` (HTTP 404)

Nav current: none. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Back to the homepage | a `/` | opens / | 200 | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/workshops` (HTTP 200, lands on /services#ladder)

Nav current: Services. Locale switch → `/ro/servicii`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| See all prices ↓ | a `#ladder` | scrolls to #ladder | id present | 1440 + 390 | OK |
| Read the case study → | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| See a sample security report → | a `/sample-sprint-security-report.pdf` | opens /sample-sprint-security-report.pdf | 200 | 1440 + 390 | OK |
| Email me to book the €200 call → | a `mailto:contact@adrian-rusan.com?subject=AI%20Strategy%20Call%20(%E2%82` | mail to contact@adrian-rusan.com, subject "AI Strategy Call (€200)" | decodes clean | 1440 + 390 | OK |
| Scope an audit → | a `https://calendly.com/adrian-rusan/new-meeting?a1=AI+Audit+%28from+%E2%` | Scoping Call + utm_* + utm_content=<page>, a1 "AI Audit (from €1,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Or start with a free teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| Half-day agenda → | a `/workshops/half-day` | opens /workshops/half-day | 200 | 1440 + 390 | OK |
| Full-day agenda → | a `/workshops/full-day` | opens /workshops/full-day | 200 | 1440 + 390 | OK |
| Scope an automation → | a `https://calendly.com/adrian-rusan/new-meeting?a1=AI+Automation+%28from` | Scoping Call + utm_* + utm_content=<page>, a1 "AI Automation (from €3,000)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| See the fact gate I built → | a `/work/honesty-gate` | opens /work/honesty-gate | 200 | 1440 + 390 | OK |
| What's included ↓ | a `#harness` | scrolls to #harness | id present | 1440 + 390 | OK |
| What's included ↓ | a `#entry-offer` | scrolls to #entry-offer | id present | 1440 + 390 | OK |
| What's included ↓ | a `#sprint` | scrolls to #sprint | id present | 1440 + 390 | OK |
| What's included ↓ | a `#retainer` | scrolls to #retainer | id present | 1440 + 390 | OK |
| How the review works → | a `/#ship-verify` | opens /#ship-verify | 200, id present | 1440 + 390 | OK |
| What you get + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Pilot+Sprint+%28%E2%8` | Scoping Call + utm_* + utm_content=<page>, a1 "Pilot Sprint (€7,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Standard+Sprint+%28%E` | Scoping Call + utm_* + utm_content=<page>, a1 "Standard Sprint (€14,500)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Book a scoping call | a `https://calendly.com/adrian-rusan/new-meeting?a1=Scale+Sprint+%28from+` | Scoping Call + utm_* + utm_content=<page>, a1 "Scale Sprint (from €24,000)", new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Guarantees + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What this is not + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Payment + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Start with one PR | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| Prefer email? Send the ticket → | a `mailto:contact@adrian-rusan.com?subject=Reviewed%20PR%20(%E2%82%AC1%2C` | mail to contact@adrian-rusan.com, subject "Reviewed PR (€1,000)" | decodes clean | 1440 + 390 | OK |
| Terms + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| How good is the code if AI agents wrote it, and what if the agents get | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Unsupervised agents ship vulnerabilities. How do you handle security?  | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Who owns the code, what happens to our data, and will you sign an NDA? | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Which stacks and languages do you review? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What timezone do you work in? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| What counts as one PR? + | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| How do payment terms work, who invoices, and who pays for LLM and API  | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Why not a contractor by the day, an agency, more engineers, or an AI r | summary | toggles its FAQ answer (Enter/Space) | works | 1440 + 390 | OK |
| Or send a repo for a free 15-minute teardown → | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |

### `/work/30-reviewed-prs-3-vulnerabilities` (HTTP 200)

Nav current: Work. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Case study | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| # | a `#the-setup` | scrolls to #the-setup | id present | 1440 + 390 | OK |
| # | a `#the-timeline` | scrolls to #the-timeline | id present | 1440 + 390 | OK |
| # | a `#what-review-caught-before-merge` | scrolls to #what-review-caught-before-merge | id present | 1440 + 390 | OK |
| The Shell-Injection Bugs My Agents Wrote | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| # | a `#what-review-missed` | scrolls to #what-review-missed | id present | 1440 + 390 | OK |
| taco-console#127 | a `https://github.com/AdrianRusan/taco-console/pull/127` | external, new tab, noopener | 404 (private repo) | 1440 + 390 | BROKEN I-04 |
| taco-console#128 | a `https://github.com/AdrianRusan/taco-console/pull/128` | external, new tab, noopener | 404 (private repo) | 1440 + 390 | BROKEN I-04 |
| # | a `#why-these-got-through` | scrolls to #why-these-got-through | id present | 1440 + 390 | OK |
| # | a `#the-rest-of-review` | scrolls to #the-rest-of-review | id present | 1440 + 390 | OK |
| How to Review AI-Generated Code | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| # | a `#what-id-run-now` | scrolls to #what-id-run-now | id present | 1440 + 390 | OK |
| git diff origin/main...HEAD -U0 \| grep '^+' \ \| grep -iE "exec[a-z]* | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| Copy code | button | copies the snippet, shows Copied! | works | 1440 + 390 | OK |
| # | a `#what-a-team-running-agents-can-take-from-this` | scrolls to #what-a-team-running-agents-can-take-from-this | id present | 1440 + 390 | OK |
| See what the Reviewed PR includes | a `/services#entry-offer` | opens /services#entry-offer | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/work/agent-cost-per-commit` (HTTP 200)

Nav current: Work. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Case study | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| # | a `#how-i-count` | scrolls to #how-i-count | id present | 1440 + 390 | OK |
| Anthropic pricing, fetched 12 Oct 2026 | a `https://platform.claude.com/docs/en/about-claude/pricing` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#what-changed-between-july-and-august` | scrolls to #what-changed-between-july-and-august | id present | 1440 + 390 | OK |
| # | a `#september-and-october-week-by-week` | scrolls to #september-and-october-week-by-week | id present | 1440 + 390 | OK |
| # | a `#what-i-got-wrong-in-the-first-version` | scrolls to #what-i-got-wrong-in-the-first-version | id present | 1440 + 390 | OK |
| # | a `#how-much-does-claude-code-cost-per-developer` | scrolls to #how-much-does-claude-code-cost-per-developer | id present | 1440 + 390 | OK |
| Claude Code docs, fetched 12 Oct 2026 | a `https://code.claude.com/docs/en/costs` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| DevOps.com, 30 Jun 2026 | a `https://devops.com/ai-coding-costs-could-exceed-developer-salaries-gar` | external, new tab, noopener | 200 | 1440 + 390 | OK (403 to bots, opens in a browser) |
| # | a `#why-measure-per-merged-pr-not-per-commit` | scrolls to #why-measure-per-merged-pr-not-per-commit | id present | 1440 + 390 | OK |
| # | a `#what-id-check-first-on-a-teams-setup` | scrolls to #what-id-check-first-on-a-teams-setup | id present | 1440 + 390 | OK |
| See what the audit covers | a `/services#ladder` | opens /services#ladder | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/work/honesty-gate` (HTTP 200)

Nav current: Work. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Case study | a `/work` | opens /work | 200 | 1440 + 390 | OK |
| # | a `#how-the-invented-numbers-got-in` | scrolls to #how-the-invented-numbers-got-in | id present | 1440 + 390 | OK |
| # | a `#why-proofreading-and-prompt-rules-dont-hold` | scrolls to #why-proofreading-and-prompt-rules-dont-hold | id present | 1440 + 390 | OK |
| # | a `#what-i-built` | scrolls to #what-i-built | id present | 1440 + 390 | OK |
| # | a `#the-result` | scrolls to #the-result | id present | 1440 + 390 | OK |
| # | a `#the-same-rule-on-a-repo-you-can-check` | scrolls to #the-same-rule-on-a-repo-you-can-check | id present | 1440 + 390 | OK |
| work-index.test.ts | a `https://github.com/AdrianRusan/personal-portfolio/blob/main/__tests__/` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| workflow-numbers.test.ts | a `https://github.com/AdrianRusan/personal-portfolio/blob/main/__tests__/` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#what-the-gates-dont-catch` | scrolls to #what-the-gates-dont-catch | id present | 1440 + 390 | OK |
| # | a `#why-this-matters-more-since-2-august-2026` | scrolls to #why-this-matters-more-since-2-august-2026 | id present | 1440 + 390 | OK |
| Goodwin, 3 Aug 2026 | a `https://www.goodwinlaw.com/en/insights/publications/2026/08/alerts-tec` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Stack Overflow, 6 Oct 2026 | a `https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-develope` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#how-to-add-one-to-your-pipeline` | scrolls to #how-to-add-one-to-your-pipeline | id present | 1440 + 390 | OK |
| # | a `#faq` | scrolls to #faq | id present | 1440 + 390 | OK |
| # | a `#how-do-you-stop-ai-from-making-up-numbers-in-customer-facing-copy` | scrolls to #how-do-you-stop-ai-from-making-up-numbers-in-customer-facing-copy | id present | 1440 + 390 | OK |
| # | a `#why-doesnt-a-prompt-rule-work` | scrolls to #why-doesnt-a-prompt-rule-work | id present | 1440 + 390 | OK |
| # | a `#does-an-ai-generated-label-under-the-eu-ai-act-solve-this` | scrolls to #does-an-ai-generated-label-under-the-eu-ai-act-solve-this | id present | 1440 + 390 | OK |
| See the AI Automation offer | a `/services#ladder` | opens /services#ladder | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/blog/66-days-of-claude-code-by-the-numbers` (HTTP 200)

Nav current: Blog. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| Claude Code | a `/blog?tag=claude-code` | opens /blog?tag=claude-code | 200 | 1440 + 390 | OK |
| AI | a `/blog?tag=ai` | opens /blog?tag=ai | 200 | 1440 + 390 | OK |
| # | a `#how-i-counted` | scrolls to #how-i-counted | id present | 1440 + 390 | OK |
| Claude Code docs, fetched 12 Oct 2026 | a `https://code.claude.com/docs/en/costs` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#the-headline-numbers` | scrolls to #the-headline-numbers | id present | 1440 + 390 | OK |
| # | a `#977-of-tokens-were-cache-reads` | scrolls to #977-of-tokens-were-cache-reads | id present | 1440 + 390 | OK |
| cost case study | a `/work/agent-cost-per-commit` | opens /work/agent-cost-per-commit | 200 | 1440 + 390 | OK |
| # | a `#a-median-prompt-of-10-words` | scrolls to #a-median-prompt-of-10-words | id present | 1440 + 390 | OK |
| # | a `#27-sessions-for-every-hour-at-the-keyboard` | scrolls to #27-sessions-for-every-hour-at-the-keyboard | id present | 1440 + 390 | OK |
| 2–3x on my backlog | a `/blog/2-3x-not-100x` | opens /blog/2-3x-not-100x | 200 | 1440 + 390 | OK |
| # | a `#1-in-5-subagents-was-a-code-reviewer` | scrolls to #1-in-5-subagents-was-a-code-reviewer | id present | 1440 + 390 | OK |
| # | a `#14-test-runs-per-commit` | scrolls to #14-test-runs-per-commit | id present | 1440 + 390 | OK |
| # | a `#37-usage-limit-episodes` | scrolls to #37-usage-limit-episodes | id present | 1440 + 390 | OK |
| # | a `#what-the-numbers-dont-show` | scrolls to #what-the-numbers-dont-show | id present | 1440 + 390 | OK |
| what I look for in it | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| the cost case study | a `/work/agent-cost-per-commit` | opens /work/agent-cost-per-commit | 200 | 1440 + 390 | OK |
| Share on LinkedIn | a `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Share on X (Twitter) | a `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.adrian-rusan.co` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Copy link | button | copies the post URL, shows Copied! | works | 1440 + 390 | SMELL I-55 |
| Adrian Rusan | a `/` | opens / | 200 | 1440 + 390 | OK |
| Adrian Rusan on GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| See what the setup includes | a `/services#harness` | opens /services#harness | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| 2–3x on My Backlog, 8% in DX's 400-Company Data: Where the AI Speed-Up | a `/blog/2-3x-not-100x` | opens /blog/2-3x-not-100x | 200 | 1440 + 390 | OK |
| The Shell-Injection Bugs My Agents Wrote: 4 Caught, 3 Missed July 9, 2 | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/blog/2-3x-not-100x` (HTTP 200)

Nav current: Blog. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| AI | a `/blog?tag=ai` | opens /blog?tag=ai | 200 | 1440 + 390 | OK |
| Developer productivity | a `/blog?tag=developer-productivity` | opens /blog?tag=developer-productivity | 200 | 1440 + 390 | OK |
| # | a `#what-2026-measured-across-teams` | scrolls to #what-2026-measured-across-teams | id present | 1440 + 390 | OK |
| DX newsletter | a `https://newsletter.getdx.com/p/ai-productivity-gains-are-10-not` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| DX benchmarks | a `https://getdx.com/blog/2026-dx-benchmarks-are-now-available/` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| LinearB | a `https://linearb.io/blog/8-million-prs-engineering-productivity` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Faros AI | a `https://www.faros.ai/blog/ai-software-engineering` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| METR | a `https://metr.org/blog/2026-02-24-uplift-update/` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#my-clock-30-agent-prs-from-open-to-merge` | scrolls to #my-clock-30-agent-prs-from-open-to-merge | id present | 1440 + 390 | OK |
| the 30-PR case study | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| # | a `#three-conditions-i-think-explain-the-gap` | scrolls to #three-conditions-i-think-explain-the-gap | id present | 1440 + 390 | OK |
| # | a `#what-review-cost-and-what-it-still-missed` | scrolls to #what-review-cost-and-what-it-still-missed | id present | 1440 + 390 | OK |
| The case study | a `/work/30-reviewed-prs-3-vulnerabilities#what-review-missed` | opens /work/30-reviewed-prs-3-vulnerabilities#what-review-missed | 200, id present | 1440 + 390 | OK |
| # | a `#measure-your-own-review-wait-this-week` | scrolls to #measure-your-own-review-wait-this-week | id present | 1440 + 390 | OK |
| gh pr list --state merged --limit 200 --json number,author,createdAt,m | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| Copy code | button | copies the snippet, shows Copied! | works | 1440 + 390 | OK |
| what review caught and missed in the 30-PR run | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| 463 Claude Code sessions, counted | a `/blog/66-days-of-claude-code-by-the-numbers` | opens /blog/66-days-of-claude-code-by-the-numbers | 200 | 1440 + 390 | OK |
| Share on LinkedIn | a `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Share on X (Twitter) | a `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.adrian-rusan.co` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Copy link | button | copies the post URL, shows Copied! | works | 1440 + 390 | SMELL I-55 |
| Adrian Rusan | a `/` | opens / | 200 | 1440 + 390 | OK |
| Adrian Rusan on GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| See what the Reviewed PR includes | a `/services#entry-offer` | opens /services#entry-offer | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| The Shell-Injection Bugs My Agents Wrote: 4 Caught, 3 Missed July 9, 2 | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| How to Review AI-Generated Code: What 64 Fixes on 30 Agent PRs Were Fo | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/blog/catching-shell-injection-agents-wrote` (HTTP 200)

Nav current: Blog. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| AI | a `/blog?tag=ai` | opens /blog?tag=ai | 200 | 1440 + 390 | OK |
| Security | a `/blog?tag=security` | opens /blog?tag=security | 200 | 1440 + 390 | OK |
| the 30-PR case study | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| # | a `#vuln-1-a-job-id-from-the-url-straight-into-a-shell` | scrolls to #vuln-1-a-job-id-from-the-url-straight-into-a-shell | id present | 1440 + 390 | OK |
| // Trimmed from 237cfaa. Do not ship. // id comes straight from the UR | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| Copy code | button | copies the snippet, shows Copied! | works | 1440 + 390 | OK |
| Node.js child_process docs | a `https://nodejs.org/api/child_process.html` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| // From 10bf07e. const SAFE_ID = /^[a-zA-Z0-9_-]+$/; if (!SAFE_ID.test | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| # | a `#vuln-2-a-search-query-behind-the-agents-own-filter-twice` | scrolls to #vuln-2-a-search-query-behind-the-agents-own-filter-twice | id present | 1440 + 390 | OK |
| // Trimmed from cf68b1a. The regex is the agent's own. const q = query | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| CSA research note, 11 July 2026 | a `https://labs.cloudsecurityalliance.org/research/csa-research-note-guar` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#what-review-missed` | scrolls to #what-review-missed | id present | 1440 + 390 | OK |
| # | a `#98-a-query-string-into-gh-kept-by-the-fix-commit` | scrolls to #98-a-query-string-into-gh-kept-by-the-fix-commit | id present | 1440 + 390 | OK |
| // Trimmed from 0673fae. Fixed on 12 Oct 2026 in taco-console#127. con | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| # | a `#109-and-117-values-from-storage` | scrolls to #109-and-117-values-from-storage | id present | 1440 + 390 | OK |
| the case study | a `/work/30-reviewed-prs-3-vulnerabilities#what-review-missed` | opens /work/30-reviewed-prs-3-vulnerabilities#what-review-missed | 200, id present | 1440 + 390 | OK |
| # | a `#what-the-seven-have-in-common` | scrolls to #what-the-seven-have-in-common | id present | 1440 + 390 | OK |
| # | a `#how-i-check-agent-written-shell-calls-now` | scrolls to #how-i-check-agent-written-shell-calls-now | id present | 1440 + 390 | OK |
| git diff origin/main...HEAD -U0 \| grep '^+' \ \| grep -iE "exec[a-z]* | pre | scrollable code block, focusable | works | 1440 + 390 | OK |
| # | a `#what-this-means-for-a-repo-with-agent-written-prs` | scrolls to #what-this-means-for-a-repo-with-agent-written-prs | id present | 1440 + 390 | OK |
| Share on LinkedIn | a `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Share on X (Twitter) | a `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.adrian-rusan.co` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Copy link | button | copies the post URL, shows Copied! | works | 1440 + 390 | SMELL I-55 |
| Adrian Rusan | a `/` | opens / | 200 | 1440 + 390 | OK |
| Adrian Rusan on GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Get my free teardown | a `/teardown` | opens /teardown | 200 | 1440 + 390 | OK |
| How to Review AI-Generated Code: What 64 Fixes on 30 Agent PRs Were Fo | a `/blog/what-agents-get-wrong` | opens /blog/what-agents-get-wrong | 200 | 1440 + 390 | OK |
| 2–3x on My Backlog, 8% in DX's 400-Company Data: Where the AI Speed-Up | a `/blog/2-3x-not-100x` | opens /blog/2-3x-not-100x | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

### `/blog/what-agents-get-wrong` (HTTP 200)

Nav current: Blog. Locale switch → `/ro`.

| Control | Target | Expected | Observed | Seen at | Status |
|---|---|---|---|---|---|
| AI | a `/blog?tag=ai` | opens /blog?tag=ai | 200 | 1440 + 390 | OK |
| Code review | a `/blog?tag=code-review` | opens /blog?tag=code-review | 200 | 1440 + 390 | OK |
| the 30-PR case study | a `/work/30-reviewed-prs-3-vulnerabilities` | opens /work/30-reviewed-prs-3-vulnerabilities | 200 | 1440 + 390 | OK |
| # | a `#how-i-counted` | scrolls to #how-i-counted | id present | 1440 + 390 | OK |
| CodeRabbit's December 2025 study | a `https://coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#agents-rebuild-what-the-repo-already-has-11-fixes` | scrolls to #agents-rebuild-what-the-repo-already-has-11-fixes | id present | 1440 + 390 | OK |
| the case study | a `/work/30-reviewed-prs-3-vulnerabilities#why-these-got-through` | opens /work/30-reviewed-prs-3-vulnerabilities#why-these-got-through | 200, id present | 1440 + 390 | OK |
| # | a `#agents-write-for-the-version-they-learned-8-fixes` | scrolls to #agents-write-for-the-version-they-learned-8-fixes | id present | 1440 + 390 | OK |
| # | a `#checks-disappear-and-review-doesnt-notice` | scrolls to #checks-disappear-and-review-doesnt-notice | id present | 1440 + 390 | OK |
| the shell-injection post | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| Agentic Code Review, 15 June 2026 | a `https://addyosmani.com/blog/agentic-code-review/` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| # | a `#parallel-prs-break-each-other` | scrolls to #parallel-prs-break-each-other | id present | 1440 + 390 | OK |
| # | a `#security` | scrolls to #security | id present | 1440 + 390 | OK |
| the case study | a `/work/30-reviewed-prs-3-vulnerabilities#what-review-missed` | opens /work/30-reviewed-prs-3-vulnerabilities#what-review-missed | 200, id present | 1440 + 390 | OK |
| # | a `#the-checklist-security-first-then-by-count` | scrolls to #the-checklist-security-first-then-by-count | id present | 1440 + 390 | OK |
| the shell-injection post | a `/blog/catching-shell-injection-agents-wrote#how-i-check-agent-written-` | opens /blog/catching-shell-injection-agents-wrote#how-i-check-agent-written-shell-calls-now | 200, id present | 1440 + 390 | OK |
| Share on LinkedIn | a `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Share on X (Twitter) | a `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.adrian-rusan.co` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Copy link | button | copies the post URL, shows Copied! | works | 1440 + 390 | SMELL I-55 |
| Adrian Rusan | a `/` | opens / | 200 | 1440 + 390 | OK |
| Adrian Rusan on GitHub | a `https://github.com/AdrianRusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| Adrian Rusan on LinkedIn | a `https://www.linkedin.com/in/adrian-rusan` | external, new tab, noopener | 200 | 1440 + 390 | OK |
| See what the audit covers | a `/services#ladder` | opens /services#ladder | 200, id present | 1440 + 390 | OK |
| or book a free 30-minute scoping call → | a `https://calendly.com/adrian-rusan/new-meeting` | Scoping Call + utm_* + utm_content=<page>, new tab | href ok, new tab, attribution added on click | 1440 + 390 | OK |
| The Shell-Injection Bugs My Agents Wrote: 4 Caught, 3 Missed July 9, 2 | a `/blog/catching-shell-injection-agents-wrote` | opens /blog/catching-shell-injection-agents-wrote | 200 | 1440 + 390 | OK |
| 2–3x on My Backlog, 8% in DX's 400-Company Data: Where the AI Speed-Up | a `/blog/2-3x-not-100x` | opens /blog/2-3x-not-100x | 200 | 1440 + 390 | OK |
| you@company.com | input | input email field | works | 1440 + 390 | OK |
| Get the checklist | button | validates, then POSTs the form once | works | 1440 + 390 | OK |
| How I handle your data | a `/privacy` | opens /privacy | 200 | 1440 + 390 | OK |

