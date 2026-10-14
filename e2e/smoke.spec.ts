import { readdirSync, readFileSync } from 'fs';
import { test, expect } from '@playwright/test';

// Every public route, EN and RO. Keep in sync with app/sitemap.ts.
const routes = [
  '/',
  '/services',
  '/teardown',
  '/privacy',
  '/about',
  '/contact',
  '/blog',
  '/blog/2-3x-not-100x',
  '/blog/66-days-of-claude-code-by-the-numbers',
  '/blog/catching-shell-injection-agents-wrote',
  '/blog/what-agents-get-wrong',
  '/work',
  '/work/30-reviewed-prs-3-vulnerabilities',
  '/work/agent-cost-per-commit',
  '/work/honesty-gate',
  '/workshops/full-day',
  '/workshops/half-day',
  '/ro',
  '/ro/servicii',
  '/ro/despre',
  '/ro/contact',
];

// #54 R4: weekly posts 404 until their date (00:00 UTC), then join the list.
const scheduled: Record<string, string> = {
  '/blog/the-rules-file-my-agents-follow': '2026-10-17',
  '/blog/how-i-run-claude-code-agents-in-parallel': '2026-10-24',
  '/work/nine-prs-one-afternoon': '2026-10-24',
  '/blog/reviewer-agents-that-dont-trust-other-agents': '2026-10-31',
  '/blog/auditing-my-claude-code-setup-with-an-agent': '2026-11-07',
  '/blog/claude-code-fail-closed-hooks': '2026-11-14',
  '/blog/how-i-measure-claude-code-roi': '2026-11-21',
  '/blog/ai-reviewers-on-the-bugs-i-missed': '2026-11-28',
};
for (const [route, date] of Object.entries(scheduled)) {
  if (Date.now() >= new Date(date).getTime()) routes.push(route);
  else
    test(`${route} 404s before ${date}`, async ({ page }) => {
      expect((await page.goto(route))?.status()).toBe(404);
    });
}

// #79: any `published: false` post 404s, whatever its date.
const drafts = readdirSync('content/blog')
  .filter((f) => f.endsWith('.mdx') && /^published:\s*false\s*$/m.test(readFileSync(`content/blog/${f}`, 'utf-8')))
  .map((f) => f.replace(/\.mdx$/, ''));
for (const slug of drafts) {
  test(`/blog/${slug} is a draft and 404s`, async ({ page }) => {
    expect((await page.goto(`/blog/${slug}`))?.status()).toBe(404);
  });
}

for (const route of routes) {
  test(`${route} renders a complete, accessible page`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    // D1: the document language matches the route group.
    await expect(page.locator('html')).toHaveAttribute('lang', route.startsWith('/ro') ? 'ro' : 'en');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /^https?:\/\//);

    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .flatMap((json) => JSON.parse(json));
    // The article image must be the card the page itself serves (route-group URLs are hashed).
    const article = ld.find((d) => d['@type'] === 'BlogPosting' || d['@type'] === 'Article');
    if (article) {
      const og = await page.locator('meta[property="og:image"]').first().getAttribute('content');
      expect(article.image).toBe(og?.split('?')[0]);
    }

    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    expect(await page.locator('img:not([alt])').count()).toBe(0);

    // C01: a "Book…" link never opens an email client (EN "Book", RO "Programează"/"Rezervă").
    const mailtoLabels = await page.locator('a[href^="mailto:"]').allTextContents();
    expect(mailtoLabels.filter((t) => /^\s*(book|programează|rezervă)/i.test(t))).toEqual([]);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('unknown route returns 404 with the site shell', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible();
});

test('privacy is linked from the footer and from both forms', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('footer a[href="/privacy"]')).toHaveCount(1);
  await expect(page.locator('a[href="/privacy"]')).toHaveCount(2); // footer row + checklist form
  await page.goto('/teardown');
  await expect(page.locator('form a[href="/privacy"]')).toHaveCount(1);
});

test('/teardown has exactly one form', async ({ page }) => {
  await page.goto('/teardown');
  await expect(page.locator('form')).toHaveCount(1);
});

// #64 R1: the same URL answers Markdown or HTML by Accept.
for (const path of ['/', '/blog/2-3x-not-100x', '/ro']) {
  test(`${path} answers Markdown or HTML by Accept`, async ({ request }) => {
    const md = await request.get(path, { headers: { Accept: 'text/markdown' } });
    expect(md.status()).toBe(200);
    expect(md.headers()['content-type']).toBe('text/markdown; charset=utf-8');
    expect(md.headers()['vary']).toMatch(/Accept/);
    const body = await md.text();
    expect(body).toMatch(/^# /);
    expect(body).toContain('/llms.txt');

    const html = await request.get(path, { headers: { Accept: 'text/html' } });
    expect(html.status()).toBe(200);
    expect(html.headers()['content-type']).toContain('text/html');
  });
}

// D7: cut posts 301 to the page that now holds their content; A4 F20: /workshops to the ladder.
for (const [from, to] of [
  ['/workshops', '/services#ladder'],
  ['/blog/30-prs-in-2-5-days', '/work/30-reviewed-prs-3-vulnerabilities'],
  ['/blog/claude-code-changed-how-i-ship-software', '/blog/2-3x-not-100x'],
  ['/blog/review-bottleneck-measured-on-my-prs', '/blog/2-3x-not-100x'],
]) {
  test(`${from} 301s to ${to}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    const location = new URL(res.headers()['location'], 'http://x');
    expect(location.pathname + location.hash).toBe(to);
  });
}

test('unknown path with Accept: text/markdown is a Markdown 404', async ({ request }) => {
  const res = await request.get('/does-not-exist', { headers: { Accept: 'text/markdown' } });
  expect(res.status()).toBe(404);
  expect(res.headers()['content-type']).toBe('text/markdown; charset=utf-8');
  const body = await res.text();
  expect(body).toContain('/sitemap.xml');
  expect(body).toContain('/llms.txt');
});

test('client-side navigation still gets the page, not Markdown', async ({ page }) => {
  await page.goto('/');
  await page.locator('footer a[href="/about"]').click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('h1')).toHaveText('About');
});

// P1 (#66): one closing ask per page, and the footer itself asks for nothing.
for (const path of ['/about', '/blog', '/does-not-exist', '/', '/ro', '/ro/despre']) {
  test(`${path} has exactly one closing ask`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#closing-cta-heading')).toHaveCount(1);
    await expect(page.locator('footer a[href*="calendly.com"]')).toHaveCount(0);
    // D6 / A4 F6: the email lives in the footer; the checklist on the blog only.
    await expect(page.locator('footer a[href^="mailto:contact@"]')).toHaveCount(1);
    if (path !== '/blog') await expect(page.locator('input[type="email"]')).toHaveCount(0);
  });
}

// A1 F2 / A4 F1: each home card carries its own study's label, so the
// client-NDA study never reads "Own project".
for (const [path, label] of [['/', 'Client work (NDA)'], ['/ro', 'Proiect pentru client (NDA)']]) {
  test(`${path} labels the honesty-gate card as client work`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#work a[href="/work/honesty-gate"]')).toContainText(label);
  });
}

// P2 (#67): /contact's three option blocks are its ask; the call is the one
// Calendly button in the page body, and the footer still asks for nothing.
for (const path of ['/contact', '/ro/contact']) {
  test(`${path} asks once, from its own option blocks`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#closing-cta-heading')).toHaveCount(0);
    await expect(page.locator('main a[href*="calendly.com"]')).toHaveCount(1);
    await expect(page.locator('main a[href^="mailto:contact@"]')).not.toHaveCount(0);
    await expect(page.locator('main a[href="/teardown"]')).toHaveCount(1);
    // A1 F4: the paid strategy call is on /services only.
    await expect(page.locator('main a[href*="Strategy"], main a[href*="strategie"]')).toHaveCount(0);
    await expect(page.locator('footer a[href*="calendly.com"]')).toHaveCount(0);
  });
}

test('the nav is one row and clears the H1 at scroll 0', async ({ page }) => {
  for (const path of ['/', '/services', '/about']) {
    await page.goto(path);
    const nav = (await page.getByRole('navigation', { name: 'Main' }).boundingBox())!;
    const h1 = (await page.locator('h1').boundingBox())!;
    expect(nav.height).toBeLessThan(80);
    expect(nav.y + nav.height).toBeLessThanOrEqual(h1.y);
  }
});

// A4 F15: the home link is marked current on both homes (Vercel reports the
// EN home as "/index"; lib/locale navPathname folds it back).
for (const [path, name] of [['/', 'Home'], ['/ro', 'Acasă']]) {
  test(`${path} marks ${name} as the current page`, async ({ page }) => {
    await page.goto(path);
    const nav = page.getByRole('navigation', { name: path === '/' ? 'Main' : 'Principal' });
    await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'page');
  });
}

test('the locale switch reads "RO", with no glyph, where no twin exists', async ({ page }) => {
  for (const path of ['/teardown', '/does-not-exist']) {
    await page.goto(path);
    await expect(page.getByRole('navigation', { name: 'Main' }).locator('a[hreflang="ro"]')).toHaveText('RO');
  }
});

// D6 / A1 F3: /services ends in its own ask (book, or the teardown fallback);
// the checklist capture lives on the blog only.
test('pages with their own closing block end in one ask and no checklist', async ({ page }) => {
  // #125: RO has no teardown page, so its fallback is the teardown by email.
  for (const [path, fallback] of [
    ['/services', 'a[href="/teardown"]'],
    ['/ro/servicii', 'a[href^="mailto:"]'],
  ]) {
    await page.goto(path);
    await expect(page.locator('#closing-cta-heading')).toHaveCount(0);
    await expect(page.locator('input[type="email"]')).toHaveCount(0);
    const close = page.locator('section[aria-labelledby="services-final-cta"]');
    await expect(close.locator('a[href*="calendly.com"]')).toHaveCount(1);
    await expect(close.locator(fallback)).toHaveCount(1);
  }
});

// P4 (#69): posts and case studies end in one offer card (PostCta) and keep only
// the checklist; /privacy carries no sales block at all.
test('posts, studies and /privacy drop the shared closing ask', async ({ page }) => {
  for (const [path, offers] of [
    ['/work/honesty-gate', 1],
    ['/work/30-reviewed-prs-3-vulnerabilities', 1],
    ['/blog/catching-shell-injection-agents-wrote', 1],
    ['/privacy', 0],
  ] as const) {
    await page.goto(path);
    await expect(page.locator('#closing-cta-heading')).toHaveCount(0);
    await expect(page.locator('#post-cta-heading')).toHaveCount(offers);
    // D6: the checklist stays on posts and studies, not on /privacy.
    await expect(page.locator('input[type="email"]')).toHaveCount(offers);
    await expect(page.locator('footer a[href*="calendly.com"]')).toHaveCount(0);
  }
});

test('the shell-post FAQ renders as headings', async ({ page }) => {
  await page.goto('/blog/catching-shell-injection-agents-wrote');
  const h2 = await page.locator('#faq').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const h3 = await page.locator('section[aria-labelledby="faq"] h3').first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(h2).toBeGreaterThanOrEqual(24);
  expect(h3).toBeGreaterThanOrEqual(20);
});

// #76: the client quotes render where they speak to the offer; the 2022 quote moved to /about.
for (const [path, quotes] of [
  ['/', ["What people I've worked with say", 'A true craftsman.', 'Alexandra Stroe']],
  ['/ro', ['Ce spun oamenii cu care am lucrat', 'Un mare meseriaș.', 'Alexandra Stroe']],
  ['/services', ['caught the contradictions in the handoff', 'Tasks disappeared as fast as I could add them.', 'partner agency']],
  ['/ro/servicii', ['A prins contradicțiile din handoff', 'Task-urile dispăreau', 'agenție parteneră']],
] as const) {
  test(`${path} shows its client quotes`, async ({ page }) => {
    await page.goto(path);
    const main = page.locator('main');
    for (const text of quotes) await expect(main.getByText(text).first()).toBeVisible();
    await expect(main.locator('figure blockquote')).toHaveCount(2);
    await expect(page.getByText('Tim Claes')).toHaveCount(0);
  });
}

for (const [path, label] of [
  ['/about', 'Earlier client work'],
  ['/ro/despre', 'Proiect anterior pentru un client'],
] as const) {
  test(`${path} keeps the earlier client quote under the bio`, async ({ page }) => {
    await page.goto(path);
    const main = page.locator('main');
    await expect(main.getByText(label, { exact: true })).toBeVisible();
    await expect(main.locator('figure figcaption')).toHaveText('Tim Claes, Freelance mobile & web engineer');
    await expect(main.locator('figure')).toHaveAttribute('lang', 'en');
  });
}
