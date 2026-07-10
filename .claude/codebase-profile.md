<!-- Metadata: DO NOT REMOVE THIS BLOCK -->
---
generated-at: 2026-07-09T00:00:00Z
commit-sha: 927bd505d1892cd351c0611ee32d936f358c7b28
last-verified: 2026-07-09
staleness-check: commit-count=52, days-old=0, lock-file-hash=verified
profile-version: 1.0
---
<!-- End Metadata -->

# Codebase Profile: personal-portfolio

## Tech Stack & Versions

| Layer | Technology | Version | Notes |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 15.5.20 | Strict React mode, experimental CSS + package optimizations |
| **Runtime** | React | 19.2.4 | Full React 19 support; `"use client"` only for interactive components |
| **Language** | TypeScript | 5.x | Strict mode; `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` |
| **Styling** | Tailwind CSS | 3.4.1 | Custom color palette (blacks, whites, purples); dark mode class-based |
| **MDX Blog** | next-mdx-remote | 6.0.0 | Server-side RSC rendering; gray-matter for frontmatter |
| **Code Highlighting** | Shiki | 4.0.2 | `one-dark-pro` theme; rehype-pretty-code with slug + autolink headings |
| **Animations** | Framer Motion | 11.2.6 | Optimized imports via next.config; used in UI spotlight, text effects |
| **Icons** | Lucide React, react-icons | 1.7.0, 5.2.1 | Tree-shakeable SVG icon libraries |
| **Error Tracking** | @sentry/nextjs | 9.36.0 | Server, edge, and client-side instrumentation; source maps hidden in prod |
| **Analytics** | @vercel/analytics, @vercel/speed-insights | 1.3.1, 1.0.12 | Enabled only in production; alongside Sentry |
| **Theme Management** | next-themes | 0.4.6 | Dark/light mode provider; theme persisted via class |
| **Testing (unit)** | Jest | - | next/jest; jsdom environment; `__tests__/**/*.test.ts` + `**/*.spec.ts` |
| **Testing (e2e)** | Playwright | - | 5 device/browser profiles; screenshots + videos on failure; 2s retry in CI |

## Directory Architecture

```
project-root/
├── app/                           # Next.js App Router (default: server components)
│   ├── layout.tsx                 # Root layout w/ metadata, ThemeProvider, JSON-LD
│   ├── page.tsx                   # Homepage; dynamic imports w/ skeletons
│   ├── blog/
│   │   ├── page.tsx               # Blog index; server-side `getPosts()`
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Post detail; `getPost(slug)` → MDXContent
│   │   │   └── opengraph-image.tsx
│   ├── services/page.tsx          # Services offer page
│   ├── globals.css                # Tailwind directives
│   ├── feed.xml/route.ts          # RSS feed (API route)
│   ├── robots.ts, sitemap.ts      # SEO
│   └── not-found.tsx
│
├── components/                    # React components (server-first)
│   ├── ui/                        # Presentational (shadcn-style)
│   │   ├── button.tsx, Skeleton.tsx, BentoGrid.tsx
│   │   ├── TextGenerateEffect.tsx ("use client" w/ framer-motion)
│   │   ├── FloatingNav.tsx, GridBackground.tsx, SpotlightBackground.tsx
│   │   ├── CanvasRevealEffect.tsx, PinContainer.tsx, MovingBorders.tsx
│   │   └── MagicButton.tsx, InfiniteMovingCards.tsx, GradientBackground.tsx
│   ├── blog/                      # Blog-specific
│   │   ├── MDXContent.tsx         # next-mdx-remote wrapper; RSC, rehype plugins
│   │   ├── PostBody.tsx           # MDX component overrides (headings, links, images)
│   │   ├── CodeBlock.tsx          # Pre/code highlighting
│   │   ├── BlogListClient.tsx     # Client list w/ tag filtering
│   │   ├── PostHeader.tsx, PostCard.tsx
│   │   └── TableOfContents.tsx, ShareButtons.tsx
│   ├── services/                  # Services page components
│   │   └── [service-specific components]
│   ├── Hero.tsx, About.tsx, Projects.tsx
│   ├── Experience.tsx, Testimonials.tsx
│   ├── Approach.tsx, CaseStudy.tsx, WhoFor.tsx
│   ├── Offers.tsx, ProofBand.tsx, ShipVerify.tsx, FinalCta.tsx
│   └── Footer.tsx
│
├── lib/                           # Utilities & data processing
│   ├── blog.ts                    # Blog pipeline: getPosts(), getPost(slug), getAllTags()
│   ├── blog-types.ts              # BlogPost, BlogFrontmatter, Heading types
│   └── utils.ts                   # cn() (clsx + tailwind-merge)
│
├── context/                       # React context providers
│   └── theme-provider.tsx         # "use client" wrapper for next-themes
│
├── hooks/                         # Custom React hooks (currently none)
│
├── config/                        # Configuration
│   └── environment.ts             # Feature flags, site config, env validation
│
├── data/                          # Static content data
│   ├── index.ts                   # navItems, offers, stats, testimonials, projects, etc.
│   └── confetti.json              # Confetti animation config
│
├── content/                       # MDX source
│   └── blog/
│       ├── 2-3x-not-100x.mdx
│       ├── 30-prs-in-2-5-days.mdx
│       └── [slug].mdx             # Frontmatter: title, date, tags, description, published, featured
│
├── public/                        # Static assets (favicons, images, manifest)
│
├── e2e/                           # Playwright tests
│   └── *.spec.ts                  # Browser/mobile device coverage
│
├── scripts/                       # Utility scripts
│   ├── verify-build.js            # Build size, type checks
│   ├── verify-tests.js            # Test coverage
│   ├── security-check.js          # Dependency vulnerabilities
│   └── measure-performance.js, analyze-lighthouse.js
│
├── .claude/                       # Claude Code config
│   ├── CLAUDE.md                  # Project-specific rules (if exists)
│   ├── CONTEXT.md                 # Active decisions + known issues
│   └── codebase-profile.md        # This file
│
├── next.config.mjs                # Image optimization, security headers, Sentry config
├── tailwind.config.ts             # Theme, content glob, custom utilities
├── tsconfig.json                  # Strict TS, @ alias, target ES2017
├── jest.config.js                 # next/jest, jsdom, coverage config
├── playwright.config.ts           # Multi-device, CI retry, HTML reporter
├── instrumentation.ts             # Sentry runtime registration (RSC hook)
├── sentry.server.config.ts        # Server-side Sentry init
├── sentry.edge.config.ts          # Edge runtime Sentry init
└── package.json, package-lock.json
```

## Key Architecture Decisions

### 1. **Server-First Rendering (App Router)**
- Default: all pages and most components are server components
- RSC (React Server Components) used for data fetching, MDX processing, metadata
- Only "use client" for interactive UI (animations, theme switching, event handlers)
- Benefits: reduced JS payload, secure secrets handling, direct DB/file access

### 2. **MDX Blog Pipeline**
- **Source:** `content/blog/*.mdx` files with YAML frontmatter
- **Processing:** `lib/blog.ts` uses gray-matter to parse, extract headings, reading time
- **Rendering:** `components/blog/MDXContent.tsx` wraps next-mdx-remote/rsc with rehype plugins:
  - `rehype-slug`: auto-generate heading IDs
  - `rehype-autolink-headings`: wrap headings with links
  - `rehype-pretty-code` (Shiki): syntax highlight with `one-dark-pro` theme
- **Custom Components:** MDX elements override via `mdxComponents` object (links, images, headings)
- **Sorting/Filtering:** sorted by date; filtered by `published` flag; tags aggregated at build time

### 3. **Component Layering**
- **`components/ui/`:** Presentational, reusable, design-system (button, skeleton, grids)
  - Heavy animations (TextGenerateEffect, Spotlight, CanvasRevealEffect) are "use client"
  - Custom Tailwind utilities embedded in files (e.g., SVG mesh backgrounds)
- **`components/blog/`:** Blog-specific rendering (post layout, ToC, code blocks)
- **`components/services/`, other feature dirs:** Page-specific sections; mostly server-side
- **Top-level components:** Feature sections (Hero, About, Projects) imported into pages

### 4. **Styling System**
- **Tailwind + Custom Theme:**
  - Dark mode via `class` strategy (no system preference pollution)
  - Custom colors: blacks (000, 000319, rgba variants), whites (FFF, BEC1DD, C1C2D3), purple (CBACF9)
  - Extended utilities: animations (tailwindcss-animate), gradients, shadows
- **No CSS-in-JS:** Styled-jsx present but unused; Tailwind is the primary vehicle
- **Utility Function:** `cn()` in `lib/utils.ts` merges class strings with clsx + tailwind-merge

### 5. **Observability & Error Handling**
- **Sentry:** Configured at build time via `next.config.mjs` with withSentryConfig
  - `instrumentation.ts` lazy-loads server/edge configs based on `NEXT_RUNTIME`
  - Source maps hidden in production (security); trace sampling at 100% in dev
  - Server and edge runtimes instrumented; client-side via Next.js wrapper
- **Analytics:** Vercel Analytics + Speed Insights (production only)
- **Performance:** Vercel Speed Insights reports Core Web Vitals (production only)
- **Errors:** Custom error boundaries can be added per page/segment

### 6. **Image Optimization**
- Remote patterns whitelisted: `utfs.io` (UploadThing), `*.ufs.sh`
- Formats: WebP + AVIF with fallback JPEG
- Device sizes: mobile (640–1080px) + desktop (1200–3840px)
- Cache: 1 year immutable for hashed assets
- CSP: `sandbox` on SVG uploads; dangerouslyAllowSVG enabled

### 7. **Testing Strategy**
- **Unit/Component:** Jest with jsdom; `setupFilesAfterEnv` for global setup
  - Test discovery: `__tests__/**/*.{ts,tsx}` or `**/*.{spec,test}.{ts,tsx}`
  - Coverage collected from `components/` and `app/`
- **E2E:** Playwright; 5 device profiles (Chromium, Firefox, WebKit, Pixel 5, iPhone 12)
  - CI: 2 retries, 1 worker; local: no retry, 2 workers
  - Screenshots + videos retained on failure; traces on first retry
  - Base URL: `http://localhost:3000`; webServer auto-start `npm run dev`

## Naming Conventions

### File & Directory Naming
- **Components:** PascalCase (`Hero.tsx`, `TextGenerateEffect.tsx`)
- **Utilities/Hooks:** camelCase (`blog.ts`, `utils.ts`)
- **Styles:** Global in `app/globals.css`; no separate CSS files (Tailwind only)
- **Content:** kebab-case for MDX slugs (`2-3x-not-100x.mdx`, `catching-shell-injection-agents-wrote.mdx`)
- **Config:** lowercase or camelCase (`environment.ts`, `sentry.server.config.ts`)

### TypeScript Conventions
- Named exports preferred; `export type` for types
- Strict mode enforced; no `any`
- Component props typed inline or via interface (e.g., `interface MDXContentProps`)
- Functional components; no class components
- Async/await for async operations

### CSS Class Naming
- Tailwind utilities; no BEM or other CSS naming scheme
- `cn()` helper for conditional classes
- Dark mode via `dark:` prefix (class-based dark mode)

## Notable Patterns & Conventions

### 1. **Dynamic Imports with Loading States**
```tsx
// app/page.tsx
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <ExperienceSkeleton />
});
```
Used for heavy components to reduce initial bundle; loading state is Skeleton component.

### 2. **MDX Component Overrides**
All MDX elements (headings, links, images, code) are customized in `PostBody.tsx`:
- Links: external vs. internal (Next.js Link for internal, bare `<a>` for external)
- Images: wrapped in Next/Image with responsive sizing
- Code: rendered via CodeBlock component with Shiki highlighting
- Headings: custom font sizes + `scroll-mt-20` for anchor offset

### 3. **Data-First Architecture**
Static content lives in `data/index.ts`:
- Navigation items, offers, testimonials, projects, stats
- Imported directly into components; no separate CMS
- Enables type-safe content without database queries

### 4. **Framer Motion Usage**
Used for:
- Text stagger animations (TextGenerateEffect, words fade in)
- Spotlight effects (CanvasRevealEffect, SpotlightBackground)
- Interactive reveals (PinContainer, MovingBorders)
- All wrapped in "use client"; optimized imports in next.config

### 5. **Blog Frontmatter Structure**
```yaml
---
title: "..."
date: "2026-07-08"
tags: ["ai", "..."]
description: "..."
published: true
featured: false
image: "url"
language: "en"
---
```
Parsed by gray-matter; `published` flag controls visibility; tags used for filtering.

### 6. **Server vs. Client Boundary**
- **Server:** Blog post fetching, metadata generation, MDX rendering, data transformation
- **Client:** Theme switching (ThemeProvider), animations, interactive filters (BlogListClient)
- Rule: use "use client" only when state/events needed; otherwise server RSC

### 7. **Environment Configuration**
- Feature flags in `config/environment.ts` (blog, contactForm, darkMode, etc.)
- Site metadata (name, URL, email) centralized
- Sentry/Analytics keys loaded from env vars
- Validation happens at runtime for required vars (production only)

## Testing Patterns

### Unit Tests (Jest)
- Located in `__tests__/` or co-located as `.test.ts` / `.spec.ts`
- Render via React Testing Library or jest-dom assertions
- Mock external dependencies (analytics, Sentry) in setup
- Coverage focused on components/ and app/

### E2E Tests (Playwright)
- Located in `e2e/*.spec.ts`
- Multi-device: desktop (Chrome, Firefox, Safari), mobile (Pixel 5, iPhone 12)
- Base URL `http://localhost:3000`; Playwright starts dev server automatically
- Failure artifacts: screenshots, videos, traces retained for debugging

## Build & Deployment

### Build Process
1. **Type Checking:** TypeScript strict mode (TS errors fail build if not ignored)
2. **Linting:** ESLint (next/eslint config)
3. **Next.js Build:** `next build` produces optimized static/dynamic routes
4. **Sentry Instrumentation:** Source maps uploaded; hidden in client bundles
5. **Image Optimization:** Remote images fetched; modern formats served

### Verification Scripts
- `npm run verify:build` — checks bundle size, Next.js output
- `npm run verify:tests` — runs Jest suite
- `npm run verify:security` — checks npm audit, dependencies
- `npm run verify:all` — runs all three

### Environment Variables
- `SENTRY_DSN` — optional; enables error tracking if set
- `NEXT_PUBLIC_SITE_URL` — required in production
- `ANALYZE=true` — enables bundle analyzer (`npm run analyze`)

## Performance & Observability

### Core Web Vitals
- Tracked via Vercel Speed Insights in production (FCP, LCP, INP, CLS, TTFB)

### Optimization Techniques
- Image optimization (WebP, AVIF, responsive sizing)
- CSS optimization (`experimental.optimizeCss` enabled)
- Package import optimization (framer-motion, lucide-react)
- Shiki included in `serverExternalPackages` (not bundled client-side)
- Critters + mini-svg-data-uri for inlined CSS/SVG

### Error Tracking
- Sentry captures server, edge, and client errors
- Source maps hidden in production
- Router transition errors auto-captured via instrumentation
- Sensitive data (passwords, tokens) filtered before transmission

## Common Tasks & Workflows

### Adding a Blog Post
1. Create `.mdx` file in `content/blog/` with frontmatter (title, date, tags, published: true)
2. Use MDX syntax; custom components (headings, links, images) auto-applied
3. `getPosts()` auto-discovers and sorts; `published: false` hides draft
4. Visit `/blog` to verify; tag filtering works automatically

### Creating a New Page
1. Add `.tsx` file in `app/[route]/page.tsx` (server component by default)
2. Export metadata (title, description, OG) from same file
3. Import data from `data/index.ts` or fetch server-side
4. Use dynamic() for heavy components; provide loading skeleton
5. Tailwind classes; no external CSS files

### Adding a New Component
1. Create in `components/` or subdirectory (e.g., `components/ui/`)
2. Default: server component (no "use client")
3. If needs state/events: add "use client" at top
4. Type props via interface; use TypeScript strict mode
5. Export named export; import with @ alias (`@/components/...`)

### Running Tests
- **Unit:** `npm test` (Jest watch mode)
- **E2E:** `npm run test:e2e` (Playwright; requires dev server running)
- **CI:** `npm run verify:all` before merge (types, build, tests, security)

## Known Issues & Limitations

1. **TypeScript Build Errors Ignored:** `next.config.mjs` sets `ignoreBuildErrors: true`
   - Allows build to proceed despite TS errors
   - Review TS output manually before shipping

2. **Feature Flag for Blog:** `config/environment.ts` has `blog: false`
   - Intended for content management; currently blog is always rendered

3. **Sentry Source Maps:** Hidden in production by design
   - Reduces information leakage; use Sentry UI for debugging

4. **Vercel Analytics Production-Only:** SpeedInsights and Analytics only run in production
   - Local/staging dev won't report metrics

## Recommendations for Contributors

1. **Keep components server-first** — add "use client" only when event handling or state is required
2. **Use data/index.ts for static content** — avoids prop drilling and query duplication
3. **Leverage MDX for blog content** — avoid mixing Markdown and React; use custom components for interactivity
4. **Test with Playwright on mobile devices** — responsive design is critical; don't assume desktop only
5. **Run verify:all before pushing** — catches type, build, test, and security issues early
6. **Check Sentry dashboard in production** — errors are captured but not loudly surfaced in logs

## Files for Reference

- **Config & Setup:** `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `jest.config.js`, `playwright.config.ts`
- **Blog Pipeline:** `lib/blog.ts`, `lib/blog-types.ts`, `components/blog/MDXContent.tsx`, `components/blog/PostBody.tsx`
- **Data & Routes:** `data/index.ts`, `app/page.tsx`, `app/blog/page.tsx`, `app/services/page.tsx`
- **Sentry & Observability:** `instrumentation.ts`, `sentry.server.config.ts`, `next.config.mjs` (withSentryConfig)
- **Performance & Styling:** `tailwind.config.ts`, `lib/utils.ts`
- **Environment:** `config/environment.ts`, `context/theme-provider.tsx`
