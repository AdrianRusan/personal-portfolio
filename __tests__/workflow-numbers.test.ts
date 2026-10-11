/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import { LEDGER_PROOF, proofStats, WORKFLOW_NUMBERS } from "@/data";
import { RO_LEDGER_PROOF, roProofBand } from "@/data/ro-home";

// #54 R1: one set of workflow numbers, from one constant, everywhere.
describe("workflow numbers", () => {
  it("match the 66-day post they come from", () => {
    const post = fs.readFileSync(
      path.join(
        process.cwd(),
        "content/blog/66-days-of-claude-code-by-the-numbers.mdx",
      ),
      "utf8",
    );
    expect(WORKFLOW_NUMBERS).toEqual({
      sessions: 463,
      hours: 335,
      commits: 4920,
      prsOpened: 928,
      days: 66,
    });
    // R3-F18: the headline numbers are a Metric | Count | Scope table.
    expect(post).toContain("| Sessions | 463 | interactive, 66 days |");
    expect(post).toContain("| Wall-clock active hours | 335 | interactive |");
    expect(post).toContain("| `git commit` | 4,920 | all sessions |");
    expect(post).toContain("| `gh pr create` | 928 | all sessions |");
  });

  it("render the canonical line from the constant", () => {
    expect(LEDGER_PROOF).toBe(
      "463 sessions · 335 hours · 4,920 commits · 928 PRs opened (upper bound, not all merged) — 66 days, 6 Aug–10 Oct 2026, counted from my own session logs.",
    );
    expect(RO_LEDGER_PROOF).toContain("4.920");
    expect(proofStats.at(-1)).toEqual({
      figure: "463",
      label: "sessions · 335 h · 66 days",
    });
    expect(roProofBand.stats.at(-1)?.figure).toBe("463");
  });

  // The 66-day post itself is exempt: its "91 days" is the prompt-history
  // window, a separate, labelled count.
  const SOURCE = "66-days-of-claude-code-by-the-numbers.mdx";
  const files = ["app", "components", "data", "content"].flatMap((dir) =>
    (fs.readdirSync(dir, { recursive: true }) as string[])
      .filter((f) => /\.(tsx?|mdx)$/.test(f) && !f.endsWith(SOURCE))
      .map((f) => path.join(dir, f)),
  );

  it.each([
    "1,163",
    "1.163",
    "3,644",
    "3.644",
    "187 agent",
    "~500 agent-hours",
    "91 days",
    "91 de zile",
  ])("no page contains %s", (needle) => {
    const hits = files.filter((f) =>
      fs.readFileSync(f, "utf8").includes(needle),
    );
    expect(hits).toEqual([]);
  });
});
