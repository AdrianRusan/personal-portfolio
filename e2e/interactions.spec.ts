import {
  test,
  expect,
  type Page,
  type APIRequestContext,
} from "@playwright/test";
import { CALENDLY_URL, CONTACT_EMAIL } from "../data";
import { primaryNav, roPrimaryNav } from "../data/nav";

// #133: every link, nav item, CTA, form and control, EN + RO. IDs (I-xx) are the
// rows of docs/plans/feat-133-interaction-audit/interaction-inventory.md.
// Forms never reach Resend: /api/* is mocked with page.route. Calendly is never
// opened: clicks are cancelled after the attribution listener has run.

const SITE = "https://www.adrian-rusan.com";
const desktopOnly = (name: string) =>
  test.skip(name !== "desktop", "request-level check, once is enough");

const hrefsOf = (html: string) =>
  [...html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"[^>]*>/g)].map(
    (m) => [m[0], m[1]!.replace(/&amp;/g, "&")] as const,
  );
const idsOf = (html: string) =>
  new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]!));

// One hop at most: a 30x must land on a 200 directly.
async function resolve(request: APIRequestContext, path: string) {
  const res = await request.get(path, { maxRedirects: 0 });
  if (res.status() < 300 || res.status() >= 400)
    return { status: res.status(), hops: 0, final: path };
  const location = res.headers().location;
  if (!location) return { status: res.status(), hops: 0, final: path };
  const loc = new URL(location, "http://x");
  const next = await request.get(loc.pathname + loc.search, {
    maxRedirects: 0,
  });
  return {
    status: next.status(),
    hops: 1,
    redirect: res.status(),
    final: loc.pathname + loc.hash,
  };
}

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]!).pathname,
  );
}

test.describe("links (I-01..I-08)", () => {
  test("every sitemap and llms.txt URL is a 200", async ({ request }, {
    project,
  }) => {
    desktopOnly(project.name);
    const llms = await (await request.get("/llms.txt")).text();
    const fromLlms = [
      ...llms.matchAll(/https:\/\/www\.adrian-rusan\.com(\/[^\s)\]>]*)?/g),
    ].map((m) => m[1] ?? "/");
    const paths = [...new Set([...(await sitemapPaths(request)), ...fromLlms])];
    expect(paths.length).toBeGreaterThan(15);
    for (const path of paths)
      expect(
        `${path} ${(await request.get(path, { maxRedirects: 0 })).status()}`,
      ).toBe(`${path} 200`);
    for (const path of [
      "/sitemap.xml",
      "/robots.txt",
      "/feed.xml",
      "/llms.txt",
    ])
      expect((await request.get(path)).status()).toBe(200);
  });

  test("every internal href resolves in one hop, every #hash has its id", async ({
    request,
  }, { project }) => {
    desktopOnly(project.name);
    const pages = [
      ...new Set([
        ...(await sitemapPaths(request)),
        "/ro/despre",
        "/ro/contact",
        "/does-not-exist",
      ]),
    ];
    const html: Record<string, string> = {};
    const load = async (path: string) =>
      (html[path] ??= await (await request.get(path)).text());
    const bad: string[] = [];
    const checked = new Map<string, string>();
    for (const page of pages) {
      for (let [, href] of hrefsOf(await load(page))) {
        // Absolute links to this site count as internal.
        if (href.startsWith(SITE)) href = href.slice(SITE.length) || "/";
        if (!href.startsWith("/") && !href.startsWith("#")) continue;
        if (href.startsWith("//")) continue;
        const [pathPart, hash] = href.split("#");
        if (!pathPart) {
          if (hash && !idsOf(await load(page)).has(decodeURIComponent(hash)))
            bad.push(`${page} → ${href}: no id="${hash}"`);
          continue;
        }
        const path = pathPart.split("?")[0]!;
        if (/\.(pdf|xml|txt|png|jpe?g|svg|webp|ico)$/.test(path)) continue;
        if (!checked.has(path)) {
          const r = await resolve(request, path);
          checked.set(
            path,
            r.status === 200 && r.hops <= 1 ? r.final : `HTTP ${r.status}`,
          );
        }
        const final = checked.get(path)!;
        if (final.startsWith("HTTP")) bad.push(`${page} → ${href}: ${final}`);
        else if (
          hash &&
          !idsOf(await load(final.split("#")[0]!)).has(decodeURIComponent(hash))
        )
          bad.push(`${page} → ${href}: no id="${hash}"`);
      }
    }
    expect(bad).toEqual([]);
  });

  test("redirects are one 301 hop to a 200 (I-03)", async ({ request }, {
    project,
  }) => {
    desktopOnly(project.name);
    for (const [from, to] of [
      ["/workshops", "/services#ladder"],
      ["/blog/30-prs-in-2-5-days", "/work/30-reviewed-prs-3-vulnerabilities"],
      ["/blog/claude-code-changed-how-i-ship-software", "/blog/2-3x-not-100x"],
      ["/blog/review-bottleneck-measured-on-my-prs", "/blog/2-3x-not-100x"],
    ]) {
      const r = await resolve(request, from);
      expect(r, from).toMatchObject({
        redirect: 301,
        hops: 1,
        status: 200,
        final: to,
      });
    }
    const target = await (await request.get("/services")).text();
    expect(idsOf(target).has("ladder")).toBe(true);
  });

  test('new-tab links carry rel="noopener" (I-05)', async ({ request }, {
    project,
  }) => {
    desktopOnly(project.name);
    const bad: string[] = [];
    for (const page of [
      ...(await sitemapPaths(request)),
      "/ro/despre",
      "/ro/contact",
    ])
      for (const [tag] of hrefsOf(await (await request.get(page)).text()))
        if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag))
          bad.push(`${page}: ${tag}`);
    expect(bad).toEqual([]);
  });

  test("mailto links decode to the contact address and a clean subject (I-06)", async ({
    request,
  }, { project }) => {
    desktopOnly(project.name);
    const subjects = new Set<string>();
    for (const page of [
      ...(await sitemapPaths(request)),
      "/ro/despre",
      "/ro/contact",
    ])
      for (const [, href] of hrefsOf(await (await request.get(page)).text())) {
        if (!href.startsWith("mailto:")) continue;
        const url = new URL(href);
        expect(url.pathname, `${page} ${href}`).toBe(CONTACT_EMAIL);
        // The raw value: "+" is a literal plus to mail clients, but
        // URLSearchParams would decode it to a space and hide it.
        const raw = href.split("subject=")[1];
        if (raw !== undefined) {
          expect(raw, `${page} ${href}`).not.toContain("+");
          subjects.add(decodeURIComponent(raw));
        }
      }
    // URLSearchParams decodes "+" as a space; mail clients don't, so the raw
    // subjects must be percent-encoded and decode to readable text.
    for (const s of subjects) expect(s).not.toMatch(/%[0-9A-F]{2}/);
    expect([...subjects]).toEqual(
      expect.arrayContaining([
        "AI Strategy Call (€200)",
        "Teardown gratuit",
        "Sesiune de strategie AI (110 €)",
        "Workshop pentru echipă",
      ]),
    );
  });

  test("case studies link to no private repo (I-04)", async ({ request }, {
    project,
  }) => {
    desktopOnly(project.name);
    // Private repos 404 for visitors; cite them as plain text.
    // HTML and the Markdown twin agents read.
    for (const path of await sitemapPaths(request)) {
      const html = await (await request.get(path)).text();
      expect(html, path).not.toMatch(
        /href="https:\/\/github\.com\/AdrianRusan\/taco-console/,
      );
      const md = await (
        await request.get(path, { headers: { Accept: "text/markdown" } })
      ).text();
      expect(md, `${path} (Markdown)`).not.toMatch(
        /\(https:\/\/github\.com\/AdrianRusan\/taco-console/,
      );
    }
  });

  test("RO pages link to no EN page that has an RO twin or fallback (I-07)", async ({
    request,
  }, { project }) => {
    desktopOnly(project.name);
    for (const page of ["/ro", "/ro/servicii", "/ro/despre", "/ro/contact"]) {
      const html = await (await request.get(page)).text();
      const leaks = hrefsOf(html)
        .filter(
          ([tag, href]) =>
            /^\/(services|about|contact|teardown)\b/.test(href) &&
            !/hreflang="en"/i.test(tag),
        )
        .map(([, href]) => href);
      expect(leaks, page).toEqual([]);
    }
  });
});

// Nav item marked current on each route; [] means no nav item owns the page.
const current: Record<string, string[]> = {
  "/": ["Home"],
  "/services": ["Services"],
  "/work": ["Work"],
  "/work/honesty-gate": ["Work"],
  "/blog": ["Blog"],
  "/blog/2-3x-not-100x": ["Blog"],
  "/about": [],
  "/contact": [],
  "/teardown": [],
  "/privacy": [],
  "/ro": ["Acasă"],
  "/ro/servicii": ["Servicii"],
  "/ro/despre": [],
  "/ro/contact": [],
};

test.describe("nav (I-10..I-16)", () => {
  for (const [path, names] of Object.entries(current)) {
    test(`${path} marks ${names.join(", ") || "no item"} as current`, async ({
      page,
    }) => {
      await page.goto(path);
      const nav = page.getByRole("navigation", {
        name: path.startsWith("/ro") ? "Principal" : "Main",
      });
      await expect(nav.locator('a[aria-current="page"]')).toHaveText(names);
    });
  }

  test("workshop pages mark Services as current (I-12)", async ({ page }) => {
    for (const path of ["/workshops/half-day", "/workshops/full-day"]) {
      await page.goto(path);
      await expect(
        page
          .getByRole("navigation", { name: "Main" })
          .locator('a[aria-current="page"]'),
      ).toHaveText(["Services"]);
    }
  });

  test("nav links go where data/nav.ts says, in both locales", async ({
    page,
  }) => {
    for (const [path, items, name] of [
      ["/", primaryNav, "Main"],
      ["/ro", roPrimaryNav, "Principal"],
    ] as const) {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name });
      for (const item of items)
        await expect(
          nav.getByRole("link", { name: item.name, exact: true }),
        ).toHaveAttribute("href", item.link);
    }
  });

  test("every nav link and the CTA are reachable and visible by keyboard (I-14)", async ({
    page,
  }) => {
    await page.goto("/services");
    const nav = page.getByRole("navigation", { name: "Main" });
    const targets = [...primaryNav.map((i) => i.name), "Book a call"];
    const seen: string[] = [];
    for (let i = 0; i < 20 && seen.length < targets.length; i++) {
      await page.keyboard.press("Tab");
      const focused = nav.locator("a:focus");
      if (!(await focused.count())) continue;
      const name = (await focused.innerText()).trim();
      if (targets.includes(name) && !seen.includes(name)) {
        await expect(focused).toBeInViewport();
        seen.push(name);
      }
    }
    expect(seen.sort()).toEqual(targets.sort());
  });

  test("the nav CTA stays on screen while the links scroll (I-15)", async ({
    page,
  }) => {
    await page.goto("/ro/servicii");
    const nav = page.getByRole("navigation", { name: "Principal" });
    await expect(
      nav.getByRole("link", { name: "Programează", exact: true }),
    ).toBeInViewport({ ratio: 1 });
    for (const item of roPrimaryNav) {
      const link = nav.getByRole("link", { name: item.name, exact: true });
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
    }
    await expect(
      nav.getByRole("link", { name: "Programează", exact: true }),
    ).toBeInViewport({ ratio: 1 });
  });

  test("a nav click navigates and moves the current marker (I-16)", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(nav.locator('a[aria-current="page"]')).toHaveText([
      "Services",
    ]);
  });
});

// EN ↔ RO counterpart map (lib/locale.ts); EN-only pages land on the other home.
const localeMap: [string, string][] = [
  ["/", "/ro"],
  ["/services", "/ro/servicii"],
  ["/about", "/ro/despre"],
  ["/contact", "/ro/contact"],
  ["/ro", "/"],
  ["/ro/servicii", "/services"],
  ["/ro/despre", "/about"],
  ["/ro/contact", "/contact"],
  ["/blog", "/ro"],
  ["/work", "/ro"],
  ["/teardown", "/ro"],
  ["/privacy", "/ro"],
  ["/workshops/full-day", "/ro"],
];

test.describe("locale switch (I-20..I-22)", () => {
  for (const [from, to] of localeMap) {
    test(`${from} switches to ${to}`, async ({ page }) => {
      await page.goto(from);
      const nav = page.getByRole("navigation", {
        name: from.startsWith("/ro") ? "Principal" : "Main",
      });
      await nav.locator("a[hreflang]").click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(to);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        to.startsWith("/ro") ? "ro" : "en",
      );
      // The footer switch points at the same counterpart.
      await page.goto(from);
      await expect(page.locator("footer a[hreflang]")).toHaveAttribute(
        "href",
        to,
      );
    });
  }

  test("the footer switch says when it lands on the other homepage (I-22)", async ({
    page,
  }) => {
    await page.goto("/blog");
    const footer = page.locator("footer a[hreflang]");
    await expect(footer).toHaveAttribute("href", "/ro");
    await expect(footer).toHaveAttribute("title", "Pagina principală în română");
    await expect(footer).toHaveAttribute(
      "aria-label",
      "Română, Pagina principală în română",
    );
    // With a twin page it stays a plain link.
    await page.goto("/services");
    await expect(page.locator("footer a[hreflang]")).not.toHaveAttribute(
      "title",
      /./,
    );
  });

  test("an unknown /ro/ URL gets the Romanian 404 (I-23)", async ({ page }) => {
    const res = await page.goto("/ro/nu-exista");
    expect(res?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "ro");
    await expect(page).toHaveTitle("Pagina nu există | Adrian Rusan");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Pagina asta nu există.",
    );
    await expect(
      page.getByRole("link", { name: "Înapoi la pagina principală" }),
    ).toHaveAttribute("href", "/ro");
  });
});

// Captures Vercel Analytics calls (window.va) and blocks the real script.
async function stubAnalytics(page: Page) {
  await page.route("**/_vercel/**", (r) => r.abort());
  await page.addInitScript(() => {
    const w = window as unknown as {
      va: (...a: unknown[]) => void;
      __events: unknown[];
    };
    w.__events = [];
    w.va = (...a: unknown[]) => {
      if (a[0] === "event") w.__events.push(a[1]);
    };
  });
}
const events = (page: Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          __events: { name: string; data?: Record<string, unknown> }[];
        }
      ).__events,
  );
// Clicks before hydration would skip the React onClick that tracks.
const hydrated = (page: Page) => page.waitForLoadState("networkidle");
// Let the capture-phase attribution listener and the React handler run, then stop the navigation.
const cancelNavigation = async (page: Page) => {
  await hydrated(page);
  await page.evaluate(() =>
    document.addEventListener("click", (e) => e.preventDefault()),
  );
};

test.describe("Calendly CTAs and analytics (I-30..I-36)", () => {
  for (const path of [
    "/",
    "/services",
    "/about",
    "/contact",
    "/blog",
    "/work/honesty-gate",
    "/teardown",
    "/ro",
    "/ro/servicii",
    "/ro/contact",
  ]) {
    test(`${path}: every Calendly CTA is the Scoping Call and carries attribution`, async ({
      page,
    }) => {
      await stubAnalytics(page);
      await page.goto(`${path}?utm_source=e2e&utm_medium=test`);
      await cancelNavigation(page);
      const ctas = page.locator('a[href*="calendly.com"]');
      const n = await ctas.count();
      expect(n).toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        const cta = ctas.nth(i);
        if (!(await cta.isVisible())) continue;
        const before = await cta.getAttribute("href");
        expect(before!.startsWith(CALENDLY_URL)).toBe(true);
        await cta.click();
        const url = new URL((await cta.getAttribute("href"))!);
        expect(url.origin + url.pathname).toBe(CALENDLY_URL);
        expect(Object.fromEntries(url.searchParams)).toMatchObject({
          utm_source: "e2e",
          utm_medium: "test",
          utm_content: path,
        });
        // A tier prefill survives the attribution.
        const a1 = new URL(before!).searchParams.get("a1");
        if (a1) expect(url.searchParams.get("a1")).toBe(a1);
      }
      const fired = (await events(page)).filter(
        (e) => e.name === "calendly_click",
      );
      expect(fired.length).toBeGreaterThan(0);
      for (const e of fired) {
        expect(e.data).toMatchObject({
          locale: path.startsWith("/ro") ? "ro" : "en",
        });
        expect(e.data?.source).toEqual(expect.any(String));
      }
    });
  }

  test("the nav CTA fires calendly_click with its source (I-31)", async ({
    page,
  }) => {
    await stubAnalytics(page);
    for (const [path, source, locale, label] of [
      ["/services", "floating_nav", "en", "Book a call"],
      ["/ro", "ro_floating_nav", "ro", "Programează"],
    ] as const) {
      await page.goto(path);
      await cancelNavigation(page);
      await page
        .getByRole("navigation")
        .getByRole("link", { name: label, exact: true })
        .click();
      expect(await events(page)).toContainEqual({
        name: "calendly_click",
        data: { source, locale },
        options: undefined,
      });
    }
  });

  test("the paid-call mailto on /services fires cta_click (I-35)", async ({
    page,
  }) => {
    await stubAnalytics(page);
    await page.goto("/services");
    await cancelNavigation(page);
    await page.locator('main a[href^="mailto:"]').first().click();
    expect((await events(page)).map((e) => e.name)).toContain("cta_click");
  });
});

test.describe("forms (I-40..I-49)", () => {
  test("checklist form: empty, invalid, error, double-submit, success (I-40)", async ({
    page,
  }) => {
    await stubAnalytics(page);
    let calls = 0;
    let reply = 500;
    await page.route("**/api/subscribe", async (route) => {
      calls++;
      await new Promise((r) => setTimeout(r, 300));
      await route.fulfill({
        status: reply,
        contentType: "application/json",
        body: JSON.stringify({ ok: reply === 200 }),
      });
    });
    await page.goto("/blog");
    await hydrated(page);
    // Scoped: Next's route announcer is a page-level role="alert" too.
    const box = page
      .locator("section")
      .filter({ hasText: "The checklist I review agent PRs with" })
      .first();
    const form = box.locator("form");
    const submit = form.getByRole("button");
    await submit.click();
    await expect(box.getByRole("alert")).toHaveText(
      "Please provide a valid email address.",
    );
    expect(calls).toBe(0);

    await form.getByRole("textbox").fill("not-an-email");
    await submit.click();
    await expect(form.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(calls).toBe(0);

    await form.getByRole("textbox").fill("e2e@example.com");
    await submit.click();
    await expect(box.getByRole("alert")).toHaveText(
      "Something went wrong. Please try again in a moment.",
    );
    expect(calls).toBe(1);

    reply = 200;
    await submit.dblclick();
    await expect(box.getByRole("status")).toHaveText("Check your inbox.");
    expect(calls).toBe(2);
    expect(await events(page)).toContainEqual(
      expect.objectContaining({
        name: "email_submit",
        data: { variant: "footer", locale: "en" },
      }),
    );
  });

  test("teardown form: empty, field errors from the API, double-submit, success (I-45)", async ({
    page,
  }) => {
    await stubAnalytics(page);
    let calls = 0;
    let reply: [number, object] = [
      400,
      { ok: false, error: "Please provide a valid repo or PR URL." },
    ];
    let body: Record<string, unknown> = {};
    await page.route("**/api/teardown", async (route) => {
      calls++;
      body = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 300));
      await route.fulfill({
        status: reply[0],
        contentType: "application/json",
        body: JSON.stringify(reply[1]),
      });
    });
    await page.goto("/teardown");
    await hydrated(page);
    const submit = page.getByRole("button", {
      name: "Send for a free teardown",
    });
    await submit.click();
    await expect(page.locator("#teardown-repoUrl-error")).toHaveText(
      "Please provide a valid repo or PR URL.",
    );
    await expect(page.locator("#teardown-email-error")).toHaveText(
      "Please provide a valid email address.",
    );
    await expect(page.getByLabel("Repo or PR URL")).toBeFocused();
    expect(calls).toBe(0);

    await page
      .getByLabel("Repo or PR URL")
      .fill("https://github.com/x/y/pull/1");
    await page.getByLabel("Email").fill("e2e@example.com");
    await submit.click();
    await expect(page.locator("#teardown-repoUrl-error")).toBeVisible();
    expect(calls).toBe(1);

    reply = [200, { ok: true }];
    await page
      .getByLabel("Repo or PR URL")
      .fill("https://github.com/x/y/pull/2");
    await submit.dblclick();
    await expect(page.getByRole("status")).toContainText(
      "your teardown is on the way",
    );
    expect(calls).toBe(2);
    expect(body).toEqual({
      email: "e2e@example.com",
      repoUrl: "https://github.com/x/y/pull/2",
      note: "",
      optIn: false,
    });
    expect(await events(page)).toContainEqual(
      expect.objectContaining({ name: "teardown_request" }),
    );
  });
});

test.describe("controls and keyboard (I-50..I-56)", () => {
  test("blog tag filters are toggle buttons with aria-pressed (I-50)", async ({
    page,
  }) => {
    await page.goto("/blog");
    const all = page.getByRole("button", { name: "All", exact: true });
    await expect(all).toHaveAttribute("aria-pressed", "true");
    const tag = page.getByRole("button", { name: "Security", exact: true });
    await tag.click();
    await expect(tag).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveAttribute("aria-pressed", "false");
  });

  test("the tag filter is in the URL and survives a reload (I-60)", async ({
    page,
  }) => {
    await page.goto("/blog");
    await hydrated(page);
    await page.getByRole("button", { name: "Security", exact: true }).click();
    await expect.poll(() => new URL(page.url()).search).toBe("?tag=security");
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Security", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect.poll(() => new URL(page.url()).search).toBe("");
  });

  test("FAQ items open and close by keyboard (I-51)", async ({ page }) => {
    await page.goto("/services");
    // The first item starts open; the second starts closed.
    const item = page.locator("main details").nth(1);
    await item.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    await expect(item).not.toHaveAttribute("open");
  });

  test("the skip link moves focus to main (I-52)", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  for (const path of ["/", "/services", "/ro", "/blog", "/teardown"]) {
    test(`${path}: every keyboard stop shows a focus ring (I-53)`, async ({
      page,
    }) => {
      await page.goto(path);
      // No transitions, so the focused and blurred styles are final when read.
      await page.addStyleTag({
        content: "*, *::before, *::after { transition: none !important; }",
      });
      const missing: string[] = [];
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          // A ring is what focus adds: compare with the same control blurred,
          // so a resting shadow doesn't count.
          const look = () => {
            const s = getComputedStyle(el);
            const outline =
              s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0
                ? `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`
                : "none";
            return { outline, shadow: s.boxShadow };
          };
          const focused = look();
          el.blur();
          const blurred = look();
          el.focus();
          const ring =
            (focused.outline !== "none" &&
              focused.outline !== blurred.outline) ||
            focused.shadow !== blurred.shadow;
          return {
            ring,
            label: `${el.tagName} ${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40)}`,
          };
        });
        if (info && !info.ring) missing.push(info.label);
      }
      expect([...new Set(missing)]).toEqual([]);
    });
  }

  test("share and copy link use the canonical post URL (I-55)", async ({
    page,
    context,
  }, { project }) => {
    test.skip(project.name !== "desktop", "clipboard check, once is enough");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/blog/2-3x-not-100x?utm_source=e2e#faq");
    const canonical = `${SITE}/blog/2-3x-not-100x`;
    await expect(
      page.getByRole("link", { name: "Share on LinkedIn" }),
    ).toHaveAttribute(
      "href",
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`,
    );
    await page.getByRole("button", { name: "Copy link" }).click();
    await expect(
      page.getByRole("button", { name: "Link copied!" }),
    ).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      canonical,
    );
  });

  test("a blocked clipboard says so on Copy link and Copy code (I-56)", async ({
    page,
  }, { project }) => {
    desktopOnly(project.name);
    await page.addInitScript(() => {
      navigator.clipboard.writeText = () =>
        Promise.reject(new DOMException("blocked", "NotAllowedError"));
    });
    await page.goto("/blog/2-3x-not-100x");
    await hydrated(page);
    await page.getByRole("button", { name: "Copy link" }).click();
    await expect(
      page.getByRole("button", { name: "Couldn't copy the link" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Copy code" }).first().click();
    await expect(
      page.getByRole("button", { name: "Couldn't copy the code" }),
    ).toBeVisible();
  });
});
