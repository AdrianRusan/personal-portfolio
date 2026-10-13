# SEO baseline (before redesign, 2026-10-13)

**Verdict:** technically clean. OpenSEO found 1 issue on the 10 pages it could crawl: `/contact` and `/ro/contact` share the title "Contact | Adrian Rusan". Fix it in the redesign PR that touches contact.

Source: OpenSEO site audit `ebebfcf1` on https://www.adrian-rusan.com/, plain crawler, no JS rendering. The plan allows **10 pages per audit**, so blog posts, case studies and `/workshops/half-day` were not crawled. The local Lighthouse run (`lighthouse-baseline.md`) and the schema review (`schema-findings.md`) cover the rest.

## 1. Pages crawled

| URL | Title | Words | Response |
|---|---|---|---|
| `/` | Adrian Rusan \| AI Agents Ship It, I Review Every PR | 1,147 | 55 ms |
| `/about` | About \| Adrian Rusan | 486 | 49 ms |
| `/contact` | Contact \| Adrian Rusan | 169 | 69 ms |
| `/services` | AI Services and Prices, From a €200 Call \| Adrian Rusan | 2,206 | 185 ms |
| `/teardown` | Free AI Code Teardown — 15-min Loom, no call \| Adrian Rusan | 255 | 57 ms |
| `/workshops/full-day` | Full-day Claude Code workshop for engineering teams | 420 | 46 ms |
| `/ro` | Livrare cu agenți AI, revizuită de un senior \| Adrian Rusan | 1,279 | 132 ms |
| `/ro/servicii` | Servicii AI și prețuri, de la 110 € \| Adrian Rusan | 2,398 | 67 ms |
| `/ro/despre` | Despre \| Adrian Rusan | 547 | 53 ms |
| `/ro/contact` | Contact \| Adrian Rusan | 185 | 45 ms |

All are 200, indexable and in the sitemap. No broken links, redirect chains, canonical conflicts, missing H1s or thin-content flags.

## 2. What the redesign must keep or fix

1. Titles: rewrite them with the target terms from `keyword-research.md`, keeping each under ~60 characters and unique (fixes the contact duplicate).
2. Meta descriptions are all present and specific. Rewrite them with the new copy, but keep them that concrete.
3. Word counts: `/services` and `/ro/servicii` are long (2,200–2,400 words). That's fine for SEO, but CRO (`cro-findings.md`) argues for showing less on `/`.
4. Keep server rendering. The plain crawler sees every word today; nothing may move behind client-side JS.

OpenSEO credits for this audit: 0.
