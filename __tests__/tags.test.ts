import { tagLabel } from "@/lib/tags";

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
