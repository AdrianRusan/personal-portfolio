import { test, expect } from '@playwright/test';

// Every public route, EN and RO. Keep in sync with app/sitemap.ts.
const routes = [
  '/',
  '/services',
  '/teardown',
  '/blog',
  '/blog/2-3x-not-100x',
  '/blog/30-prs-in-2-5-days',
  '/blog/66-days-of-claude-code-by-the-numbers',
  '/blog/auditing-my-claude-code-setup-with-an-agent',
  '/blog/catching-shell-injection-agents-wrote',
  '/blog/claude-code-changed-how-i-ship-software',
  '/blog/how-i-run-claude-code-agents-in-parallel',
  '/blog/the-rules-file-my-agents-follow',
  '/blog/what-agents-get-wrong',
  '/work',
  '/work/agent-cost-per-commit',
  '/work/honesty-gate',
  '/workshops/full-day',
  '/workshops/half-day',
  '/ro',
  '/ro/servicii',
];

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
