/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";

// The 30-PR run's repo had no test suite and no CI (goals/2026-10-11-30pr-
// canonical-facts.md). So no copy may say the bugs "passed the tests" or that
// "CI was green" near a 30-PR or shell-injection claim.
const TEST_CLAIM =
  /tests? passed|passed (the )?(automated )?tests|automated tests? passed|CI (was )?green|green CI|testele (au )?trec|trecuseră de teste|testele treceau|CI verde/gi;
const RUN_CLAIM = /shell.injection|30 (reviewed )?PRs|30 de PR/i;
const WINDOW = 300;

// W1 owns these (MDX, llms.txt) and fixes them under C10. Remove each entry
// once its copy is fixed; the second test fails if one is already clean.
const PENDING_W1 = new Set([
  "content/blog/2-3x-not-100x.mdx",
  "content/blog/30-prs-in-2-5-days.mdx",
  "content/blog/catching-shell-injection-agents-wrote.mdx",
  "content/blog/claude-code-changed-how-i-ship-software.mdx",
  "content/blog/what-agents-get-wrong.mdx",
  "public/llms.txt",
]);

const ROOTS = [
  "app",
  "components",
  "data",
  "lib",
  "content",
  "public/llms.txt",
];
const EXT = /\.(tsx?|mdx|txt)$/;

const files = (p: string): string[] => {
  if (!fs.existsSync(p)) return [];
  if (fs.statSync(p).isFile()) return EXT.test(p) ? [p] : [];
  return fs.readdirSync(p).flatMap((f) => files(path.join(p, f)));
};

const violations = (file: string) => {
  const text = fs.readFileSync(file, "utf8");
  return [...text.matchAll(TEST_CLAIM)]
    .filter((m) =>
      RUN_CLAIM.test(
        text.slice(Math.max(0, m.index - WINDOW), m.index + WINDOW),
      ),
    )
    .map((m) => m[0]);
};

const all = ROOTS.flatMap(files);

describe("30-PR run claims", () => {
  it("never pair the run with passing tests or green CI", () => {
    const found = all
      .filter((f) => !PENDING_W1.has(f))
      .flatMap((f) => violations(f).map((v) => `${f}: "${v}"`));
    expect(found).toEqual([]);
  });

  it("keeps the W1 pending list honest", () => {
    const clean = [...PENDING_W1].filter((f) => violations(f).length === 0);
    expect(clean).toEqual([]);
  });
});
