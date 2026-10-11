import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getRelatedPosts } from "@/lib/blog";
import { BLOG_CTAS, getPostCta } from "@/lib/blog-cta";
import type { BlogFrontmatter, BlogPost } from "@/lib/blog-types";

const fm = (over: Partial<BlogFrontmatter> = {}): BlogFrontmatter => ({
  title: "t",
  description: "d",
  date: "2026-01-01",
  tags: [],
  published: true,
  ...over,
});

const post = (slug: string, tags: string[], date: string): BlogPost => ({
  slug,
  frontmatter: fm({ tags, date }),
  readingTime: "1 min read",
  headings: [],
});

describe("getPostCta", () => {
  it("defaults to the teardown CTA when frontmatter has no cta", () => {
    expect(getPostCta(fm())).toBe(BLOG_CTAS.teardown);
  });

  it.each(["teardown", "audit", "workshop", "harness"] as const)(
    "returns the %s CTA when frontmatter asks for it",
    (cta) => {
      expect(getPostCta(fm({ cta }))).toBe(BLOG_CTAS[cta]);
    },
  );

  it("falls back to teardown for an unknown cta value", () => {
    expect(getPostCta(fm({ cta: "bogus" as never }))).toBe(BLOG_CTAS.teardown);
  });

  it("gives every CTA a label, href and tracked cta id", () => {
    for (const [key, c] of Object.entries(BLOG_CTAS)) {
      expect(c.label.length).toBeGreaterThan(0);
      expect(c.href).toMatch(/^\//);
      expect(c.cta).toBe(key);
    }
  });

  it("is set explicitly on every post file, drafts included", () => {
    const dir = path.join(process.cwd(), "content/blog");
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      expect(Object.keys(BLOG_CTAS)).toContain(data.cta);
    }
  });

  it.each([
    ["audit", "/services#ladder"],
    ["harness", "/services#harness"],
    ["workshop", "/workshops/full-day"],
  ] as const)("points the %s CTA at its page, not email", (cta, href) => {
    expect(BLOG_CTAS[cta].href).toBe(href);
  });

  it("adds the free teardown as a second link on security/review posts", () => {
    const c = getPostCta(fm({ cta: "audit", tags: ["security"] }));
    expect(c.href).toBe("/services#ladder");
    expect(c.secondary?.href).toBe("/teardown");
    expect(
      getPostCta(fm({ cta: "audit", tags: ["ai"] })).secondary,
    ).toBeUndefined();
    // An existing second link wins.
    expect(
      getPostCta(fm({ cta: "workshop", tags: ["code-review"] })).secondary
        ?.href,
    ).toBe("/workshops/half-day");
  });

  it("offers the half-day workshop as the workshop CTA's second link", () => {
    expect(BLOG_CTAS.workshop.secondary?.href).toBe("/workshops/half-day");
  });

  it("ignores prototype keys", () => {
    expect(getPostCta(fm({ cta: "constructor" as never }))).toBe(
      BLOG_CTAS.teardown,
    );
  });
});

describe("getRelatedPosts", () => {
  const posts = [
    post("current", ["ai", "security", "code-review"], "2026-07-01"),
    post("one-shared-new", ["ai"], "2026-07-09"),
    post("two-shared", ["security", "code-review"], "2026-05-01"),
    post("one-shared-old", ["security"], "2026-01-01"),
    post("none-shared", ["mdx"], "2026-08-01"),
  ];

  it("ranks by shared-tag count, newest first on ties, excluding self", () => {
    expect(getRelatedPosts(posts[0]!, posts).map((p) => p.slug)).toEqual([
      "two-shared",
      "one-shared-new",
    ]);
  });

  it("never returns posts with zero shared tags", () => {
    const only = [posts[0]!, posts[4]!];
    expect(getRelatedPosts(posts[0]!, only)).toEqual([]);
  });

  it("handles a post with no tags", () => {
    const untagged = {
      ...posts[0]!,
      frontmatter: fm({ tags: undefined as never }),
    };
    expect(getRelatedPosts(untagged, posts)).toEqual([]);
  });
});
