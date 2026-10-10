import { LEDGER_PROOF } from "@/data";

// The 90-day line must say exactly what the ledger records (R2) and name no
// client or repo (R1).
describe("LEDGER_PROOF", () => {
  it("states merged PRs and commits, never 'reviewed'", () => {
    expect(LEDGER_PROOF).toMatch(/1,163 PRs merged/);
    expect(LEDGER_PROOF).toMatch(/3,644 commits/);
    expect(LEDGER_PROOF).not.toMatch(/review/i);
  });

  it("names no client or repo", () => {
    expect(LEDGER_PROOF).not.toMatch(
      /bono|site2go|softboys|weasweb|dentstore|dentotal|brikka|github\.com/i,
    );
  });
});
