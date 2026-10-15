/**
 * @jest-environment node
 */
import sitemap from "@/app/sitemap";
import { GET as llmsTxt } from "@/app/llms.txt/route";
import { faqJsonLd, pageJsonLd, SITE_URL } from "@/lib/page-schema";

describe("pageJsonLd", () => {
  it("uses the canonical URL form Next renders (no trailing slash on home)", () => {
    expect(pageJsonLd({ path: "/", name: "Home", crumbs: [] }).url).toBe(
      SITE_URL,
    );
    expect(
      pageJsonLd({
        path: "/blog",
        name: "Blog",
        crumbs: [{ name: "Blog", path: "/blog" }],
      }).url,
    ).toBe(`${SITE_URL}/blog`);
  });

  it("starts the breadcrumb at Home and ends at the page", () => {
    const page = pageJsonLd({
      path: "/blog/x",
      name: "X",
      crumbs: [
        { name: "Blog", path: "/blog" },
        { name: "X", path: "/blog/x" },
      ],
    });
    const items = page.breadcrumb.itemListElement;
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items[0]!.item).toBe(SITE_URL);
    expect(items.at(-1)!.item).toBe(page.url);
    expect(page["@id"]).toBe(`${page.url}#webpage`);
  });

  it("builds FAQPage questions from q/a pairs", () => {
    const faq = faqJsonLd([{ q: "Q?", a: "A." }]);
    expect(faq.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Q?",
      acceptedAnswer: { "@type": "Answer", text: "A." },
    });
  });
});

describe("/llms.txt", () => {
  it("lists every sitemap URL", async () => {
    const text = await (await llmsTxt()).text();
    for (const { url } of await sitemap()) {
      expect(text).toContain(`(${url})`);
    }
    // Generated from frontmatter, so it inherits the 30-PR facts (no tests, no CI).
    expect(text).not.toMatch(/tests? passed|CI (was )?green|green CI|2\.5 days/i);
  });

  // #64 R2: agent guidance, with prices and numbers from the site's data.
  it("says when to use and not use Adrian Rusan, and how to engage", async () => {
    const text = await (await llmsTxt()).text();
    for (const heading of [
      "## When to use Adrian Rusan",
      "## When not to use",
      "## How to engage",
    ]) {
      expect(text).toContain(heading);
    }
    expect(text).toContain("Architecture Session (€200)");
    expect(text).toContain("rusan.adrian.ionut@gmail.com");
    expect(text).toContain("https://calendly.com/adrian-rusan/new-meeting");
    expect(text).toContain("463 sessions · 335 hours");
    expect(text).toContain("Accept: text/markdown");
  });
});
