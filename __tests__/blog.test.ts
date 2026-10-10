import { getPosts, getPost, getAllTags, WORK_DIR } from "@/lib/blog";

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

  it("throws for an unpublished draft, so its page and OG image 404", async () => {
    // hello-world.mdx is published: false
    await expect(getPost("hello-world")).rejects.toThrow(/Post not found/);
  });
});

describe("getAllTags", () => {
  it("returns a unique, sorted tag list", async () => {
    const tags = await getAllTags();
    expect(new Set(tags).size).toBe(tags.length); // unique
    expect([...tags].sort()).toEqual(tags); // sorted
  });
});

describe("case studies (content/work via the dir param)", () => {
  it("lists only published case studies from content/work", async () => {
    const studies = await getPosts(WORK_DIR);
    expect(studies.every((s) => s.frontmatter.published === true)).toBe(true);
    // the blog list must not leak into the work list
    expect(studies.some((s) => s.slug === "30-prs-in-2-5-days")).toBe(false);
  });

  it("reads a case study by slug from content/work", async () => {
    const study = await getPost("honesty-gate", WORK_DIR);
    expect(study.slug).toBe("honesty-gate");
    expect(study.source.length).toBeGreaterThan(0);
  });

  it("keeps the blog as the default directory", async () => {
    await expect(getPost("honesty-gate")).rejects.toThrow(/Post not found/);
  });
});

describe("case-study honesty guard", () => {
  it("fails the build when a published case study still holds a TODO(adi)", async () => {
    const fs = await import("fs");
    const os = await import("os");
    const path = await import("path");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "work-"));
    fs.writeFileSync(
      path.join(dir, "draft.mdx"),
      '---\ntitle: "t"\ndescription: "d"\ndate: "2026-10-10"\ntags: []\npublished: true\n---\n\n{/* TODO(adi): fill */}\n',
    );
    await expect(getPosts(dir)).rejects.toThrow(/TODO\(adi\)/);
  });

  it("also catches the marker in frontmatter and in other spellings", async () => {
    const fs = await import("fs");
    const os = await import("os");
    const path = await import("path");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "work-"));
    fs.writeFileSync(
      path.join(dir, "draft.mdx"),
      '---\ntitle: "t"\ndescription: "TODO (Adi): real number"\ndate: "2026-10-10"\ntags: []\npublished: true\n---\n\nbody\n',
    );
    await expect(getPosts(dir)).rejects.toThrow(/TODO\(adi\)/);
  });

  it("lets the finished honesty-gate case study through the gate", async () => {
    await expect(getPosts(WORK_DIR)).resolves.toBeDefined();
  });
});
