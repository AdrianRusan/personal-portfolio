/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import { LEDGER_PROOF, proofStats, WORKFLOW_NUMBERS } from "@/data";
import { aboutPage, roAboutPage } from "@/data/pages";
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
    expect(post).toContain("Interactive sessions: 463");
    expect(post).toContain("Wall-clock active hours: 335");
    expect(post).toContain("`git commit`: 4,920");
    expect(post).toContain("`gh pr create`: 928");
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
    expect(JSON.stringify([proofStats, roProofBand])).not.toContain("463");
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
