# Adrian Rusan — Personal Portfolio

Lead-generation site + service funnel for a freelance/consultant engineer. Its job is to convert startup founders & CTOs into booked Calendly scoping calls — not just to look good.

**Live**: https://www.adrian-rusan.com · **Deploy**: Vercel (main → prod)

> This is a high-level orientation. The authoritative, maintained docs live in `.claude/`:
> - **`.claude/CLAUDE.md`** — stack, verified commands, architecture, conventions, gotchas
> - **`.claude/CONTEXT.md`** — active decisions, known issues, recent changes
> - **`.claude/codebase-profile.md`** — generated structure/pattern profile
>
> Read those before starting work. Keep them current instead of this file.

## Positioning

**"Agent-Accelerated Delivery, Reviewed."** An AI agent fleet ships the volume; a senior engineer security-reviews every PR before the client sees it. Speed without the risk. Adrian Rusan — 10+ years shipping production software.

## Stack

Next.js 15 (App Router, server-first) · React 19 · TypeScript 5 (strict) · Tailwind 3 + shadcn/ui · framer-motion · next-themes. MDX blog (`next-mdx-remote` + `gray-matter` + `rehype-pretty-code`/`shiki`). Sentry + Vercel Analytics/Speed Insights. Jest (unit) + Playwright (e2e).

## Surfaces

- **Homepage** (`app/page.tsx`) — Hero, ProofBand, EmailCapture, ShipVerify, Bio, Offers, CaseStudy, mid-page CTA, WhoFor, Experience, Testimonials, FinalCta, Footer.
- **/services** (`app/services/page.tsx`) — the offer: a €1,000 "Reviewed PR" entry offer, a single Delivery Sprint ladder (Pilot €7,500 / Standard €14,500 / Scale €24,000), plus "starts at" Retainer (€9,000/mo) and Harness Setup cards; guarantees, FAQ (+ FAQPage schema), scarcity.
- **/blog** (`app/blog/**`, `content/blog/*.mdx`) — MDX posts; per-post BlogPosting JSON-LD; conversion block + email capture on each post.
- **SEO** — `app/layout.tsx` metadata + Person/Service JSON-LD, `sitemap.ts`, `robots.ts`, `feed.xml`, file-based OG/Twitter cards (`app/*opengraph-image.tsx`, `lib/og.tsx`), `public/llms.txt`.

## Commands

`npm run dev` · `npm run build` (pins `NODE_ENV=production`; type-checks) · `npm run lint` · `npx tsc --noEmit` (the real type gate) · `npx playwright test`. See `.claude/CLAUDE.md` for the full table + gotchas.

## Content

Static site content lives in `data/index.ts` (no CMS). Blog is MDX in `content/blog/`. Site config + feature flags in `config/environment.ts`.

---

*Superseded the original 2025 overview (2026-07-10) — that version described a pre-blog React-18 portfolio and is no longer accurate. Maintain `.claude/` docs going forward.*
