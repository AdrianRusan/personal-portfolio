/**
 * @jest-environment node
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPost, getPosts, isLive } from "@/lib/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// #54 R4: one post a week, each hidden until its date.
const SCHEDULE = [
  ["66-days-of-claude-code-by-the-numbers", "2026-10-10"],
  ["the-rules-file-my-agents-follow", "2026-10-17"],
  ["how-i-run-claude-code-agents-in-parallel", "2026-10-24"],
  ["auditing-my-claude-code-setup-with-an-agent", "2026-10-31"],
] as const;

const at = (iso: string) => jest.useFakeTimers().setSystemTime(new Date(iso));
const slugs = async () => (await getPosts()).map((p) => p.slug);

afterEach(() => jest.useRealTimers());

describe("post schedule", () => {
  it("goes live at 00:00 UTC on the date", () => {
    expect(isLive("2026-10-17", new Date("2026-10-16T23:59:59Z"))).toBe(false);
    expect(isLive("2026-10-17", new Date("2026-10-17T00:00:00Z"))).toBe(true);
  });

  it("dates each post as scheduled", async () => {
    at("2026-11-01T00:00:00Z");
    for (const [slug, date] of SCHEDULE) {
      expect((await getPost(slug)).frontmatter.date).toBe(date);
    }
  });

  it.each(SCHEDULE.map(([, date], i) => [date, i] as const))(
    "on %s shows exactly the posts dated up to then",
    async (date, i) => {
      at(`${date}T12:00:00Z`);
      const live = await slugs();
      SCHEDULE.forEach(([slug], j) => {
        expect(live.includes(slug)).toBe(j <= i);
      });
    },
  );

  it("treats a future post as missing", async () => {
    at("2026-10-11T12:00:00Z");
    await expect(getPost("the-rules-file-my-agents-follow")).rejects.toThrow(
      /Post not found/,
    );
  });
});

// #79: any `published: false` post stays hidden, whatever its date.
const DRAFTS = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""))
  .filter(
    (slug) =>
      !matter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8"))
        .data.published,
  );

describe("draft posts", () => {
  it("includes the queued drafts", () => {
    expect(DRAFTS).toContain("hitting-usage-limits-with-18-sessions-open");
  });

  it.each(DRAFTS)("%s stays hidden", async (slug) => {
    at("2100-01-01T00:00:00Z");
    expect(await slugs()).not.toContain(slug);
    await expect(getPost(slug)).rejects.toThrow(/Post not found/);
  });
});

describe("getPost slug", () => {
  it("rejects anything but a plain slug", async () => {
    await expect(getPost("../work/honesty-gate")).rejects.toThrow(
      /Post not found/,
    );
  });
});
