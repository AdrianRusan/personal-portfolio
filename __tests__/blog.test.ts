import { getPosts, getPost, getAllTags } from "@/lib/blog";

describe("getPosts", () => {
  it("returns only published posts", async () => {
    const posts = await getPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.frontmatter.published === true)).toBe(true);
    // hello-world.mdx is published: false and must be excluded
    expect(posts.some((p) => p.slug === "hello-world")).toBe(false);
  });

  it("sorts newest first by date", async () => {
    const posts = await getPosts();
    const times = posts.map((p) => new Date(p.frontmatter.date).getTime());
    const sorted = [...times].sort((a, b) => b - a);
    expect(times).toEqual(sorted);
  });

  it("shapes each post with slug, frontmatter, readingTime, headings", async () => {
    const [post] = await getPosts();
    expect(post).toBeDefined();
    expect(typeof post!.slug).toBe("string");
    expect(typeof post!.readingTime).toBe("string");
    expect(Array.isArray(post!.headings)).toBe(true);
  });
});

describe("getPost", () => {
  it("returns source + frontmatter for a real slug", async () => {
    const [first] = await getPosts();
    const post = await getPost(first!.slug);
    expect(post.slug).toBe(first!.slug);
    expect(typeof post.source).toBe("string");
    expect(post.source.length).toBeGreaterThan(0);
  });

  it("throws for a missing slug", async () => {
    await expect(getPost("does-not-exist-xyz")).rejects.toThrow(
      /Post not found/,
    );
  });
});

describe("getAllTags", () => {
  it("returns a unique, sorted tag list", async () => {
    const tags = await getAllTags();
    expect(new Set(tags).size).toBe(tags.length); // unique
    expect([...tags].sort()).toEqual(tags); // sorted
  });
});
