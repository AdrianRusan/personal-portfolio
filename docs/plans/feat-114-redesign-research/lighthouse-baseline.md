# Lighthouse baseline (before redesign)

- Build: `main` @ `a9ce617`, `npm run build`, `npm start -- -p 3114` (local production).
- Tool: Lighthouse 13.5.0, default mobile emulation (simulated throttling), 3 runs per page. Median shown.
- Date: 2026-10-13.

| Page | Perf | A11y | Best practices | SEO | LCP (ms) | TBT (ms) | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 94 | 100 | 96 | 100 | 3,074 | 9 | 0 |
| `/services` | 94 | 100 | 96 | 100 | 3,070 | 16 | 0 |
| `/blog` | 92 | 100 | 96 | 100 | 3,303 | 14 | 0 |

Runs: home 93/94/94, services 94/94/94, blog 92/92/92 (perf).

Notes:
1. Best practices is 96 only because `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` 404 on a local server. The same penalty applies to the after-run, so the comparison stays fair.
2. The LCP element on `/` is the hero `<h1>` (text). Render delay is ~40 ms, so LCP is driven by the simulated network load of JS/CSS/fonts, not by the server.
3. The after-run must use the same command, port, Lighthouse version and 3-run median.
