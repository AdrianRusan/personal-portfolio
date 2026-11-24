// Runs the validation ladder in order and reports each step as passed or
// failed. A step that couldn't run counts as failed: "not run" is never
// "passed". Exits 1 if any step failed.
const { spawnSync } = require("child_process");

const steps = [
  { name: "TypeScript", command: "npx tsc --noEmit" },
  { name: "Lint", command: "npm run lint" },
  { name: "Build", command: "npm run build" },
  { name: "Unit and claim tests", command: "npm test" },
  // Playwright starts its own server (see playwright.config.ts) against the
  // build above, so no dev server has to be running.
  { name: "E2E", command: "npm run e2e" },
];

console.log("🧪 Running the validation ladder...");

const results = steps.map(({ name, command }) => {
  console.log(`\n▶ ${name}: ${command}`);
  const run = spawnSync(command, { shell: true, stdio: "inherit" });
  const passed = run.status === 0;
  return {
    name,
    passed,
    reason: run.error ? run.error.message : `exit ${run.status}`,
  };
});

console.log("\n📊 Results");
for (const { name, passed, reason } of results) {
  console.log(`${passed ? "✅" : "❌"} ${name}${passed ? "" : ` (${reason})`}`);
}

const failed = results.filter((r) => !r.passed);
if (failed.length > 0) {
  console.log(`\n${failed.length} of ${results.length} steps failed.`);
  process.exit(1);
}
console.log(`\nAll ${results.length} steps passed.`);
