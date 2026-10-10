import { LEDGER_PROOF } from "@/data";

// The 90-day line must say exactly what the ledger records (R2) and name no
// client or repo (R1).
describe("LEDGER_PROOF", () => {
  it("states merged PRs and commits, never 'reviewed'", () => {
    expect(LEDGER_PROOF).toMatch(/1,163 PRs merged/);
    expect(LEDGER_PROOF).toMatch(/3,644 commits/);
    expect(LEDGER_PROOF).not.toMatch(/review/i);
  });

  // Pinned verbatim: any rewording must be re-checked for client or repo names
  // (R1), and listing those names here would publish them.
  it("names no client or repo", () => {
    expect(LEDGER_PROOF).toBe(
      "Across all my work: 1,163 PRs merged and 3,644 commits in the 91 days from 12 Jul to 10 Oct 2026, counted from my own session ledger.",
    );
  });
});
