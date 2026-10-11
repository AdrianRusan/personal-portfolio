/** @jest-environment node */
import { NextRequest } from "next/server";
import sitemap from "@/app/sitemap";
import { middleware } from "@/middleware";
import { markdownFor } from "@/lib/markdown";
import { notFoundMarkdown } from "@/lib/markdown/format";
import { getPosts } from "@/lib/blog";

const FOOTER_LINKS = [
  "https://www.adrian-rusan.com/llms.txt",
  "https://www.adrian-rusan.com/sitemap.xml",
];

describe("markdownFor", () => {
  it("has Markdown for every sitemap URL, ending with llms.txt and sitemap links", async () => {
    for (const { url } of await sitemap()) {
      const path = new URL(url).pathname;
      const md = await markdownFor(path);
      expect([path, md?.startsWith("# ")]).toEqual([path, true]);
      for (const link of FOOTER_LINKS) expect(md).toContain(link);
    }
  });

  it("renders / and /ro from their own copy", async () => {
    expect(await markdownFor("/")).toContain(
      "# Ship the roadmap you can't hire for.",
    );
    const ro = await markdownFor("/ro");
    expect(ro).toContain("De la o sesiune de 110 € la un retainer lunar");
    expect(ro).not.toContain("From a €200 call");
  });

  it("serves a post's MDX source as Markdown, figures as text", async () => {
    const [post] = await getPosts();
    const md = await markdownFor(`/blog/${post!.slug}`);
    expect(md).toContain(`# ${post!.frontmatter.title}`);
    const study = await markdownFor("/work/honesty-gate");
    expect(study).toContain("*Figure: ");
    expect(study).not.toMatch(/<(figure|svg)/);
  });

  it("makes site links absolute", async () => {
    const md = await markdownFor("/about");
    expect(md).toContain("](https://www.adrian-rusan.com/work)");
    expect(md).not.toMatch(/\]\(\//);
  });

  it("gives /about and /contact (and RO twins) 500+ characters", async () => {
    for (const path of ["/about", "/contact", "/ro/despre", "/ro/contact"]) {
      expect((await markdownFor(path))!.length).toBeGreaterThan(500);
    }
    expect(await markdownFor("/contact")).toContain(
      "Rusan Adrian-Ionuț PFA · CIF 49119790",
    );
  });

  it("returns null for unknown paths, drafts and deep paths", async () => {
    for (const path of [
      "/nope",
      "/blog/nope",
      "/blog/x/y",
      "/workshops/x",
      "/api",
    ]) {
      expect(await markdownFor(path)).toBeNull();
    }
  });

  it("treats a trailing slash like the page", async () => {
    expect(await markdownFor("/about/")).toBe(await markdownFor("/about"));
  });
});

describe("notFoundMarkdown", () => {
  it("explains the 404 and links llms.txt and the sitemap", () => {
    const md = notFoundMarkdown("/nope`x");
    expect(md).toMatch(/^# 404/);
    expect(md).toContain("`/nopex`");
    for (const link of FOOTER_LINKS) expect(md).toContain(link);
  });
});

describe("middleware", () => {
  const run = (path: string, accept: string) =>
    middleware(
      new NextRequest(`https://www.adrian-rusan.com${path}`, {
        headers: { accept },
      }),
    );

  it("rewrites Markdown requests to the Markdown route", () => {
    expect(
      run("/about", "text/markdown").headers.get("x-middleware-rewrite"),
    ).toBe("https://www.adrian-rusan.com/api/markdown/about");
    expect(
      run("/", "text/markdown, text/html;q=0.9").headers.get(
        "x-middleware-rewrite",
      ),
    ).toBe("https://www.adrian-rusan.com/api/markdown");
  });

  it("passes HTML through with Vary: Accept", () => {
    const res = run("/", "text/html,application/xhtml+xml,*/*;q=0.8");
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.headers.get("vary")).toBe("Accept");
  });
});
