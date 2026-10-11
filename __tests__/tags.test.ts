import { filterTags, tagLabel } from "@/lib/tags";

describe("tagLabel", () => {
  it("uses the listed spelling for names sentence case gets wrong", () => {
    expect(tagLabel("claude-code")).toBe("Claude Code");
    expect(tagLabel("claude-md")).toBe("CLAUDE.md");
    expect(tagLabel("ai")).toBe("AI");
  });

  it("sentence-cases any other slug", () => {
    expect(tagLabel("developer-productivity")).toBe("Developer productivity");
    expect(tagLabel("next.js")).toBe("Next.js");
  });
});

describe("filterTags", () => {
  const all = ["ai", "claude-code", "code-review", "llm-costs", "mdx", "security"];

  it("offers the four index filters, in order", () => {
    expect(filterTags(all)).toEqual([
      "claude-code",
      "code-review",
      "security",
      "llm-costs",
    ]);
  });

  it("adds a linked tag that isn't one of the four, if a post uses it", () => {
    expect(filterTags(all, "ai")).toContain("ai");
    expect(filterTags(all, "bogus")).not.toContain("bogus");
    expect(filterTags(all, "security")).toHaveLength(4);
  });
});
