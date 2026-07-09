# The Agent PR Review Checklist

**The checks that catch bugs the tests pass clean.**

When a fleet of AI agents writes your pull requests, the tests going green means almost nothing. Agents produce code that compiles, passes the tests they also wrote, and still ships a shell-injection vulnerability. This is the exact checklist I run against every agent-generated PR before it merges — security first, because that's the failure mode automated checks miss most.

Use it as a review gate. If you can't tick a box, the PR doesn't merge.

---

## 1 · Security — run this pass first, every time

Agents are trained on public code, and public code is full of insecure patterns. These are the classes I actually catch in agent PRs.

- [ ] **Command / shell injection.** Every `exec`, `spawn`, `execSync`, `child_process`, or shell-out is checked for interpolated user input. No string-concatenated commands — args passed as an array, or the call replaced with a library. *Agents love `exec(\`... ${userInput}\`)`.*
- [ ] **Path traversal.** Any path built from request input is resolved and confined to an allowed root (`../` can't escape). File reads/writes/downloads validate the final resolved path, not the raw string.
- [ ] **SQL / NoSQL injection.** Queries are parameterized — no string-built SQL, no unvalidated object spread into a Mongo filter. ORMs used the safe way, not with raw interpolation.
- [ ] **Secrets.** No hardcoded keys, tokens, or connection strings. Nothing secret is logged, echoed in errors, or committed. New env vars are documented in `.env.example` with placeholders only.
- [ ] **AuthN / AuthZ.** Every new endpoint checks *who* the caller is **and** *whether they may act on this specific resource*. Watch for IDOR — an authenticated user reaching another user's record by changing an ID.
- [ ] **SSRF & outbound requests.** URLs fetched server-side from user input are validated against an allowlist; no fetching arbitrary internal addresses.
- [ ] **Dynamic execution.** No `eval`, `Function()`, dynamic `require`, or unsafe deserialization on untrusted input.
- [ ] **Dependencies.** Every newly added package is intentional, maintained, and license-clean. Run `npm audit` / `pip audit`. A new transitive dep is a new attack surface.
- [ ] **Output encoding.** User-controlled data rendered to HTML is escaped; no `dangerouslySetInnerHTML` on untrusted input.

## 2 · Correctness the tests won't catch

Green tests prove the code does what the test author expected. Agents write both — so the tests often encode the same misunderstanding as the code.

- [ ] **The tests actually assert behavior**, not implementation. A test that mocks the thing under test, or asserts a value the code trivially returns, is theatre.
- [ ] **Error paths are handled**, not swallowed. No empty `catch {}`, no unhandled promise rejections, no errors logged and then ignored. Failures surface.
- [ ] **Edge cases**: empty input, zero, negative, null/undefined, empty array, very large input, unicode. Agents optimize for the happy path.
- [ ] **Boundaries & off-by-one** on any loop, slice, pagination, or range.
- [ ] **Concurrency / races** where two requests hit the same state — no read-modify-write without a guard.
- [ ] **The change matches the ticket.** Agents over-reach: they refactor unrelated code, add speculative abstractions, and rename things. Scope creep in a PR hides real changes.

## 3 · Data & irreversible operations

- [ ] **Migrations are reversible** and don't silently drop or truncate data. Destructive operations (`DROP`, `DELETE` without `WHERE`, mass `UPDATE`) are deliberate and reviewed twice.
- [ ] **Transaction boundaries** wrap multi-step writes so a partial failure can't leave corrupt state.
- [ ] **No production data** in fixtures, logs, or test files.

## 4 · The failures specific to agents

These don't show up in a normal human-PR review because humans don't make them. Agents do, consistently.

- [ ] **Hallucinated APIs.** Methods, flags, or config keys that don't exist on the real library version. It compiles against the agent's imagined API and fails at runtime.
- [ ] **Confidently wrong comments.** The comment describes what the agent *intended*; the code does something else. Trust the code, delete the comment, or fix both.
- [ ] **Plausible-but-wrong constants** — a timeout, limit, or magic number that looks reasonable and is wrong for your system.
- [ ] **Copy-pasted patterns that don't fit** your codebase's conventions, error handling, or logging.
- [ ] **Tests that assert the bug.** The most dangerous output: buggy code plus a test that locks the bug in as correct.

---

## How to use this

Run passes **1 → 4 in order**. Security first: it's the pass that, if you skip it, ships the vulnerability the tests were always going to miss. Don't merge on green — merge on a completed checklist.

This is a condensed version of the adversarial review I run on every PR in a Delivery Sprint: an agent fleet ships the volume, and every pull request goes through this gate before the client ever sees it. Speed without the risk.

**If you'd want your backlog shipped this way — reviewed before it reaches you — book a 30-minute scoping call: [adrian-rusan.com/services](https://www.adrian-rusan.com/services)**

*— Adrian Rusan · 10+ years shipping production software*
