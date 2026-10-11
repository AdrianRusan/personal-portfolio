import { test, expect } from '@playwright/test';

// Every public route, EN and RO. Keep in sync with app/sitemap.ts.
const routes = [
  '/',
  '/services',
  '/teardown',
  '/privacy',
  '/blog',
  '/blog/2-3x-not-100x',
  '/blog/30-prs-in-2-5-days',
  '/blog/66-days-of-claude-code-by-the-numbers',
  '/blog/catching-shell-injection-agents-wrote',
  '/blog/claude-code-changed-how-i-ship-software',
  '/blog/what-agents-get-wrong',
  '/work',
  '/work/agent-cost-per-commit',
  '/work/honesty-gate',
  '/workshops/full-day',
  '/workshops/half-day',
  '/ro',
  '/ro/servicii',
];

// #54 R4: weekly posts 404 until their date (00:00 UTC), then join the list.
const scheduled: Record<string, string> = {
  '/blog/the-rules-file-my-agents-follow': '2026-10-17',
  '/blog/how-i-run-claude-code-agents-in-parallel': '2026-10-24',
  '/blog/auditing-my-claude-code-setup-with-an-agent': '2026-10-31',
};
for (const [route, date] of Object.entries(scheduled)) {
  if (Date.now() >= new Date(date).getTime()) routes.push(route);
  else
    test(`${route} 404s before ${date}`, async ({ page }) => {
      expect((await page.goto(route))?.status()).toBe(404);
    });
}

for (const route of routes) {
  test(`${route} renders a complete, accessible page`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /^https?:\/\//);

    for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(json)).not.toThrow();
    }

    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    expect(await page.locator('img:not([alt])').count()).toBe(0);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('unknown route returns 404 with the site shell', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible();
});

test('privacy is linked from the footer and from both forms', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('footer a[href="/privacy"]')).toHaveCount(2); // footer row + checklist form
  await page.goto('/teardown');
  await expect(page.locator('form a[href="/privacy"]')).toHaveCount(1);
});
