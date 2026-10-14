# Design system

Direction M (#114) on a named token layer (#123). There are two sources of truth: `app/globals.css` holds the values and roles, and `tailwind.config.ts` maps them to classes. `__tests__/design-system.test.ts` fails the build when a page steps outside them. To add a page, pick existing roles. Don't type pixels.

## 1. Colour

Every colour is a CSS variable with a light and a dark value, and the theme comes from the OS (next-themes, class `dark`). Use the role, never a hex or a stock Tailwind colour (`red-400`, `gray-500`…).

| Class | Role | Light | Dark |
|---|---|---|---|
| `bg-page` | page background (paper, with grain) | `#F4F3EE` | `#191814` |
| `bg-raised` | panels, inputs, the hero panel | `#FFFFFF` | `#211F1A` |
| `bg-chip` | quiet pill, closing band (`/50`) | `#E8E6DF` | `#2B2A24` |
| `text-ink`, `border-ink` | headings, strong text, full-strength rules | `#1F1E1A` | `#EEEDE7` |
| `text-body` | body text | `#33312B` | `#D6D4CC` |
| `text-muted` | meta, eyebrows, captions | `#5C5A50` | `#ABA89C` |
| `accent` | the one accent: primary CTA, links, active state | `#C4340E` | `#FF6A3D` |
| `text-accent-ink` | accent text on an accent tint (`bg-accent/10`) | `#B23210` | `#FF8A63` |
| `border-rule` / `border-ink/15` | hairline rules | ink at 14% | ink at 12% |
| `text-destructive` | form errors | `#B81E1E` | `#E05252` |

- Every text pair is ≥ 4.5:1 in both themes. A tinted badge is `text-accent-ink` on `bg-accent/10`, never `text-accent`.
- The accent is for actions and state. Body copy and headings never use it.
- `bg-white` is literal white. Use `bg-raised` for a surface.
- OG images (`lib/og.tsx` `OG_PALETTE`) and `app/manifest.ts` can't read CSS variables, so they repeat the light values. Keep them in sync.

## 2. Type

There are two families: Host Grotesk (`font-sans`, everything) and Geist Mono (`font-mono`, only for meta and code). Pick the role, not the size.

| Class | Use | Size (mobile → desktop) |
|---|---|---|
| `type-hero` | the home H1 only | 44 → 72 → 84px |
| `type-title` | page H1, closing band H2 | 40 → 60 → 72px |
| `type-title-sm` | article and case-study H1 | 38 → 48 → 60px |
| `type-section` | section H2 (`SectionHeading`) | 30 → 48px |
| `type-subsection` | H2/H3 inside a section, card titles | 24 → 30px |
| `type-item` | list-item H3 (steps, case cards, fit list) | 20 → 24px |
| `type-label` | small semibold H3 (offer blocks, form titles) | 18px |
| `type-stat` | big figures | 36 → 48px |
| `type-lead` | the paragraph under an H1 | 17 → 18px |
| `type-prose`, `type-prose-h2/h3` | blog and case-study bodies | 17 / 30 / 24px |
| `eyebrow` | mono meta label above a heading or row | 12px |

- Big type is light (380) and tight (`display`, `type-light`). Bold is only for `type-label`, strong inline text and buttons.
- Headings are left-aligned and never centred. No all-caps labels, and no accent colour on a single word.
- Line length: `measure-title` (16em, H1/H2 display), `measure-sm` (34em), `measure` (38em, the default for paragraphs), `measure-lg` (42em).

## 3. Layout

- Every page sits in `container-wide` (max 1360px) inside `gutter` (20 / 40 / 48px).
- Sections: `section` (64 → 112px vertical) for home-style sections, `section-compact` (48 → 64px) for stacked offer blocks. The page head uses `page-head` (112 → 144px top, clearing the fixed nav). Separate sections with `border-t border-ink/15`, not with extra space.
- Structure is ruled rows and columns. There are no cards, with one exception, the raised panel (`hero-panel`, the retainer and setup price boxes). Pills are `rounded-full`, panels and inputs `rounded-xl`/`rounded-lg` (12px), tags `rounded-md`.
- Shared primitives:
  - `SectionHeading`, the section H2 with eyebrow and lead;
  - `ClosingBand`, the closing ask;
  - `PageShell` (nav, main, closing CTA, footer);
  - `ProsePage`, ruled two-column prose;
  - `Quote` / `Testimonials`;
  - `FloatingNav`.

## 4. Actions

- Buttons are the two pills in `components/ui/button.tsx`:
  - `ctaPrimary`: filled accent, the page's one booking ask;
  - `ctaSecondary`: chip, everything else.
  
  `PrimaryCta` wraps `ctaPrimary` with tracking. One filled pill per view.
- Text links are `text-accent` with an underline or `→`. The nav links, CTAs and icon links are at least 44px tall (`min-h-11`), and the pills show focus as `ring-2 ring-accent`.

## 5. Surface and motion

- Paper grain is one static SVG noise tile on `body`, the same in both themes. Don't add gradients, glows or shadows beyond `hero-panel`.
- Motion answers the reader, it doesn't decorate. framer-motion runs only in the blog filter (`BlogListClient`). The FAQ is native `<details>`. `prefers-reduced-motion` is respected, and no section fades in on scroll.

## 6. Checks

- `npm test`: `design-system.test.ts` rejects arbitrary colours, stock palette colours, pre-#123 token names and off-scale `text-[Npx]` outside its allowlist. Each exception there carries its reason.
- `npm run e2e`: no horizontal overflow at 390, the nav stays in one row, and the FAQ H2 is larger than its H3s.
- Contrast is checked in both themes when colours change (axe `color-contrast`, 1440 and 390).
