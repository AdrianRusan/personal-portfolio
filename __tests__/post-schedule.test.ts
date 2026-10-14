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
  // #134 slate: the blind AI-reviewer test moves up; the reviewer-agents post
  // takes 7 Nov and the setup-audit post is cut (never live, no redirect).
  ["ai-reviewers-on-the-bugs-i-missed", "2026-10-31"],
  ["claude-code-subagents-in-review", "2026-11-07"],
  // #90: A3 angle 1 fills the 14 Nov slot. #99: the ROI method post takes 21 Nov.
  ["claude-code-fail-closed-hooks", "2026-11-14"],
  ["how-i-measure-claude-code-roi", "2026-11-21"],
  // #134 slate: team rollout absorbs the cut setup-audit checks.
  ["claude-code-team-rollout", "2026-11-28"],
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
    at("2026-11-29T00:00:00Z");
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
  // No drafts are queued today; this still covers the next one.
  it("keeps every draft hidden", async () => {
    at("2100-01-01T00:00:00Z");
    for (const slug of DRAFTS) {
      expect(await slugs()).not.toContain(slug);
      await expect(getPost(slug)).rejects.toThrow(/Post not found/);
    }
  });
});

describe("getPost slug", () => {
  it("rejects anything but a plain slug", async () => {
    await expect(getPost("../work/honesty-gate")).rejects.toThrow(
      /Post not found/,
    );
  });
});
