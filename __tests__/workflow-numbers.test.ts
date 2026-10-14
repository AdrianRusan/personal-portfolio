/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import {
  LEDGER_PROOF,
  reviewLog,
  THROUGHPUT,
  THROUGHPUT_LINE,
  WORKFLOW_NUMBERS,
} from "@/data";
import { aboutPage, roAboutPage } from "@/data/pages";
import {
  RO_LEDGER_PROOF,
  RO_THROUGHPUT_LINE,
  roProofBand,
} from "@/data/ro-home";

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
  });

  // P2 (R1-F10): the ledger is said once, on /about; the home stats are
  // buyer outcomes, not usage.
  it("show the ledger on /about only, once", () => {
    const count = (s: string, needle: string) => s.split(needle).length - 1;
    expect(count(JSON.stringify(aboutPage), "463 sessions")).toBe(1);
    expect(count(JSON.stringify(roAboutPage), "463 de sesiuni")).toBe(1);
    expect(count(JSON.stringify(aboutPage), "session logs")).toBe(1);
    expect(JSON.stringify([reviewLog, roProofBand])).not.toContain("463");
  });

  // #125: the merged-PR count comes from the same-method ledger window
  // (11 Sep–14 Oct 2026) and only through THROUGHPUT; the window is stated.
  it("render the merged-PR line from one constant, window stated", () => {
    expect(THROUGHPUT).toEqual({ mergedPrs: 632, activeDays: 33 });
    expect(THROUGHPUT_LINE).toContain("632 merged PRs in 33 active days (11 Sep–14 Oct 2026)");
    expect(THROUGHPUT_LINE).toContain("client and own work");
    expect(RO_THROUGHPUT_LINE).toContain("632 de PR-uri merge-uite în 33 de zile active");
    const literal = files.filter(
      (f) => f !== path.join("data", "index.ts") && /\b632\b/.test(fs.readFileSync(f, "utf8")),
    );
    expect(literal).toEqual([]);
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
