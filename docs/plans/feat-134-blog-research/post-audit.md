# Post audit: all 11 posts (#134, 2026-10-14)

**Verdict:** every post has at least one first-hand finding that the top 5 results for its query lack, so none is cut on merit. Two are merged into other slots to make room for stronger buyer topics (see `slate.md`). Five numbers failed a recount and must change in the rewrites. Reviewing this takes about 15 minutes: the table, then the "failed" lines.

Method: three audit agents, one per cluster. Each listed every factual claim and checked external ones against the primary source (URL + date) and own numbers against receipts. Receipt paths stay in the private goals folder, because this repo is public. Scores are `blog-analyze` 0–100, applied by reading against the checklist, not a tool run. SERP = WebSearch order (approximates a US Google page; not a rank tracker). Volumes: OpenSEO, US, 2026-10-13 and 2026-10-14.

## Summary

| Post | Status | Target query (vol / KD) | Score | Claims | Failed or wrong (fix in rewrite) | What it adds over the top 5 | Verdict |
|---|---|---|---|---|---|---|---|
| `2-3x-not-100x` | live 07-09 | does AI make developers faster (n/m); ai code review bottleneck (n/m) | 80 | all own timing numbers recomputed from GitHub and matched | DX "nearly 20%" isn't year-on-year, and 21 Jul is a last-updated date; 36-PR window needs a stated cut-off | per-PR open-to-merge timestamps for agent PRs | KEEP+REWRITE (review-queue angle) |
| `catching-shell-injection-agents-wrote` | live 07-09 | vibe coding security (110 / 16); ai generated code security (10) | 77 | every code claim traced to agent commit → fix commit | title "4 caught, 3 missed" is shell-only and reads against the site's 5 security misses; grep returns 1–4 lines, not 2–4; GuardFall quote overstated | real diffs: input → sink → fix, including the misses | KEEP+REWRITE |
| `what-agents-get-wrong` | live 07-09 | how to review ai generated code (n/m); ai code review (1,300 / 37, owned by `/`) | 76 | 25 of 25 examples check out | "64 fixes" doesn't reproduce: one-defect-per-bullet recount gives ~75 (duplication 17 not 11, types 13 not 10, error handling 7 not 4); ranking unchanged | a counted taxonomy of what review changed on a real batch | KEEP+REWRITE (publish the counting rule) |
| `66-days-of-claude-code-by-the-numbers` | live 10-10 | claude code usage (4,400 / 25) | 79 | every count matches `WORKFLOW_NUMBERS` and the mining output; Opus 5.5 rates confirmed | `cleanupPeriodDays` cited to the wrong docs page; links 3 scheduled posts | one heavy user's counted logs (cache writes 2% of tokens, 42% of dollars) | KEEP+REWRITE (usage + cost angle) |
| `the-rules-file-my-agents-follow` | 10-17 | claude md examples (720 / 13) | 71 | rule-file word counts, `onFailure` version and the Cline postmortem check out | transcript counts 372 commands / 112 denials don't reproduce (recount 304 / ~136) | one rules file measured before/after (−68%) and which rules became hooks | KEEP+REWRITE in place |
| `how-i-run-claude-code-agents-in-parallel` | 10-24 | claude code worktrees (720 / 20); parallel agents (170 / 24) | 71 | 25-vs-9 agent counts check out | "as of 2.1.296" is stale (2.1.299 on 14 Oct); docs now cover cross-session messaging; docs say `claude agents` omits interactive sessions, CLI showed them | the five things a worktree still shares, from real runs | KEEP+REWRITE (weakest; links the nine-PR study, live the same day) |
| `reviewer-agents-that-dont-trust-other-agents` | 10-31 | claude code subagents (2,400 / 19) | 73 | 85-PR, 39-unverifiable and 20-BLOCK counts trace to a receipt (now archived privately) | none failed; narrow audience | verdicts that can't be checked later, counted | REPLACE: re-angled as the subagents post (same receipts + model-mix data) |
| `auditing-my-claude-code-setup-with-an-agent` | 11-07 | n/m | 69 | `/skill-doctor` version, 1,536-char cap and word counts check out | "84% of 3,279 spawns on Opus" fails (recount 1,455 spawns, 67%); "0 of 12 refuted" fails (2 refuted) | a self-audit with dates | CUT, merged into the subagents and team-rollout posts (not live: no redirect needed) |
| `claude-code-fail-closed-hooks` | 11-14 | claude code hooks (3,600 / 16) | 78 | 27 of 29 verified against docs, changelog and the 12 Oct test files | "20 sessions" was 20 + 1 control; description 224 chars; the secret-scan bypass it describes is still open | failure-mode tests (crash, timeout, truncated JSON), not deny-list snippets | KEEP+REWRITE |
| `how-i-measure-claude-code-roi` | 11-21 | claude code cost (4,400 / 38) | 80 | ledger method and OTel/retention claims verified | `modelPricing` version is 2.1.243 (CHANGELOG), not 2.1.242; the 44-min median is March-run only; the 16-hour wait needs the LinearB link | a ledger that shows its own method break and a rising cost per merged PR | KEEP+REWRITE (team-lead angle) |
| `ai-reviewers-on-the-bugs-i-missed` | 11-28 | claude code review (2,900 / 12) | 79 | every count, time and token figure traces to the 12 Oct experiment log | #117 said "missed (fix deleted)"; canonical is "partly fixed" | a blind AI-vs-human review on commits whose human misses are known | KEEP+REWRITE, moved up to 10-31 |

Set-level findings:
1. No post links `/services`, and 3 of 7 scheduled posts have fewer than 2 internal links.
2. Seven descriptions run past 160 characters.
3. Three live posts retell the same 30-PR run. Each rewrite gets its own job: what review changes (`what-agents-get-wrong`), security sinks (`catching-shell-injection…`), throughput and wait (`2-3x…`).
4. The harness data repeats across rules, audit and hooks; the review story repeats across reviewer-agents and ai-reviewers. Merging frees two slots.
5. No post has a question H2, which costs AI-answer extraction.

## Per-post detail (claims, SERP, gap)


Method: each claim was checked against its primary source on 2026-10-14. External pages were fetched; own data came from GitHub timestamps, git history of my own repos, the session-mining output and `data/index.ts`. Scores use the `blog-analyze` 100-point rubric (Content 30 / SEO 25 / E-E-A-T 15 / Technical 15 / AI citation 15). Readability is a script estimate (Flesch reading ease, crude syllable count). SERP rank is search-tool order, US-only, and most result dates weren't shown.

Shared findings, all 4 posts:
- **No `/services` link in any post** (R7 needs one).
- **No question-form H2s** (0 of 27). Each post has an FAQ in frontmatter.
- **The site un-links scheduled posts.** The 66-days post links 3 not-yet-live posts (the rules file 17 Oct, parallel 24 Oct, reviewer agents 31 Oct). The live page renders them as plain text, so nothing is broken, but until those dates it has only 4 working internal links.
- **Overlap.** 2-3x, shell and what-agents all retell the 30-PR run. Give each one its own job: speed and review wait / security diffs / the non-security fix taxonomy. Each should link the case study for the rest instead of restating the tally.

---

#### 1. `2-3x-not-100x` (live since 2026-07-09)

**Target query:** "how much faster is AI coding" (variants "AI coding productivity 2026", "does AI make developers faster"). Intent: informational, with a decision behind it: a CTO or engineering lead deciding whether agent adoption pays off. seoTitle "How Much Faster Is AI Coding, Really? 2026 Data and My PRs" (58 chars) already targets it. keyword-research.md has no volume for this exact term; the hub term is "claude code best practices" (1,900).

**blog-analyze: 80/100.** Content 26 · SEO 18 · E-E-A-T 13 · Technical 12 · AI citation 11.
- 1,271 words, FRE ≈ 69, average sentence 17.7 words (28% over 20 words).
- 4 internal links, 5 external, 0 to `/services`. The H1 is 79 chars (seoTitle 58). Answer-first opening, measurement table, FAQ.
- Cost points: no keyword in the H2s, no `/services` link, no retrieval dates on sources, no question H2s.

**Claims**

| # | Claim | Source checked | Verdict |
|---|---|---|---|
| 1 | DX, 11 Mar 2026: random sample from 400 companies, Nov 2024–Feb 2026, AI usage +65%, PR throughput +7.76%, author Justin Reock | newsletter.getdx.com/p/ai-productivity-gains-are-10-not (11 Mar 2026) | verified |
| 2 | Leaders say most orgs land at 5–15% | same page | verified. The page attributes this to engineering leaders, as the post does |
| 3 | DX benchmarks, 21 Jul 2026: year-on-year PR throughput up nearly 20% | getdx.com/blog/2026-dx-benchmarks-are-now-available/ ("Last Updated July 21, 2026") | **partly failed.** "Nearly 20%" is verified, but the page doesn't say "year-on-year", and 21 Jul is a last-updated date, not a publication date. Reword to "DX's 2026 benchmarks (updated 21 Jul 2026) report PR throughput up nearly 20%" |
| 4 | LinearB, 4 May 2026: 8.1M PRs, 4,800 teams, AI PRs wait >16 h for pickup vs ~200 min, 32.7% vs 84.5% merged in 30 days | linearb.io/blog/8-million-prs-engineering-productivity (4 May 2026) | verified |
| 5 | LinearB: 400+ lines at P75 for AI PRs | same | verified, with a nuance: LinearB says "AI-assisted" PRs (400+ vs 157 unassisted) |
| 6 | Faros, 23 Jul 2025: high-AI teams merge 98% more PRs, review time +91%, no company-level gain | faros.ai/blog/ai-software-engineering (23 Jul 2025, data to June 2025) | verified |
| 7 | METR, 24 Feb 2026: 19% slower in 2025; 2026 estimate 18% faster (original group) and 4% (new recruits), CIs cross zero, "only very weak evidence" | metr.org/blog/2026-02-24-uplift-update/ (24 Feb 2026) | verified. The 2026 CIs are −38%..+9% and −15%..+9%. The 2025 CI (+2%..+39%) does not cross zero, and the post doesn't say it does |
| 8 | 30 of 31 PRs merged, under three days, 2 d 19 h first PR to last merge | GitHub timestamps, own private repo | verified |
| 9 | Open-to-merge median 44 min, middle half 28–62 min, p90 2 h, slowest 9.5 h and 17.6 h | GitHub timestamps | verified. The middle half is 27–63 or 28–62 depending on the quantile method; p90 is 2.1 h |
| 10 | 9 review sittings (merges <30 min apart) | GitHub timestamps | verified |
| 11 | 25 of 30 merged PRs had a review fix commit | git history per merge | verified |
| 12 | 2.1 d from first worker wave, 2.8 d from first PR; 5–7 d ÷ that = 1.8–3.3x | timestamps + arithmetic | verified as arithmetic. The 5–7 days is the author's estimate, and the post says so |
| 13 | Size didn't predict the wait in March: rank correlation 0.07 | recomputed Spearman on additions+deletions vs minutes | verified (0.067) |
| 14 | Only #95 waited >16 h; #97 (9.5 h) redid the closed #96 | timestamps | verified |
| 15 | Median PR 388 lines | GitHub additions+deletions | verified |
| 16 | October, this site: nine PRs merged a median 27 min after opening, in 2 sittings | public repo PRs #34–#43 | verified (26.6 min, 2 sittings) |
| 17 | 36 PRs merged 10–12 Oct: median 27 min, p90 2.3 h, rank correlation 0.56 | public repo, PRs merged before the post's edit on 12 Oct 14:57 UTC | verified (36 PRs; 26.8 min; p90 2.28 h by the inclusive method, 2.8 h by the exclusive one; Spearman 0.565). Today a full-day 10–12 Oct window gives 44 PRs, so name the cut-off |
| 18 | "I scoped every issue in that run" | all 33 issues #62–#94 were authored by me | verified for authorship. "Scoped" is a self-report |
| 19 | Review fixed 3 request-input shell paths; missed 5 (3 shell strings, one from request input #98, 2 stored XSS) | canonical 30-PR facts (re-audit 12 Oct) | verified, consistent with the canonical facts |
| 20 | Fixed all 5 the same day | own repo's fix PR, merged 12 Oct 2026 | verified |
| 21 | #109 merged 29 min after opening, in a sitting that merged two PRs in 13 s; the bug sat for seven months | timestamps (07:02:26 / 07:02:39 UTC, 12 Mar) | verified |
| 22 | Transcripts deleted after Claude Code's 30-day default | code.claude.com/docs/en/claude-directory ("default is 30 days") | verified |
| 23 | "Months of harness work" before runs held up | — | opinion, should be marked as such |
| 24 | `gh pr list … jq` snippet | — | runnable (field names valid). Not executed on a team repo |

**Top 5 results** ("how much faster is AI coding" plus a 2026 variant):
1. DX newsletter, "How much does AI impact development speed?" (newsletter.getdx.com/p/how-much-does-ai-impact-development-speed, date not shown): a roundup of studies; the speed-up depends on the task and how well you know the codebase.
2. hamy.xyz, "AI agents speed increase" (hamy.xyz/blog/2026-07_ai-agents-speed-increase-software-engineer, Jul 2026): one senior engineer's self-tracked estimate of ~3x coding and PRs per week.
3. HackerNoon, "AI makes coding feel faster but the data says otherwise" (hackernoon.com/ai-makes-coding-feel-faster-but-the-data-says-otherwise, date not shown): commentary on METR −19%.
4. Kodezi, "Comparative study, AI for coder productivity" (blog.kodezi.com/comparative-study-ai-for-coder-productivity-enhancement, date not shown): vendor productivity claims.
5. newmarketpitch, "AI Coding: what is actually working now?" (newmarketpitch.com/blogs/news/ai-code-assistant-what-works, date not shown): opinion piece, no data.

The variant results are roundups that recycle Copilot 55%, Google 21% and METR −19%.

**What this post adds:** per-PR open-to-merge timestamps from my own repos, set against DX, LinearB, Faros and METR, plus a runnable way to measure the same thing on your team. Only hamy.xyz is first-hand, and it uses self-reported counts, not timestamps.

**Verdict: KEEP+REWRITE.** This is the best buyer fit of the four. A CTO adopting agents asks exactly this question, and the post answers it with first-hand GitHub timestamps that none of the top 5 has. It ends on a concrete action (a named owner for pickup time) that leads straight into a review-capacity conversation. What the rewrite needs:
- fix the DX-benchmark wording (#3);
- name the cut-off for the 36-PR window (#17);
- mark the harness ramp as opinion;
- add a `/services` link and keyword-bearing H2s;
- restore the nine-PR case-study link on or after 24 Oct (R9).

---

#### 2. `catching-shell-injection-agents-wrote` (live since 2026-07-09, featured)

**Target query:** "shell injection AI generated code" (variants "AI generated code security vulnerabilities", "command injection AI code"). Intent: informational and problem-aware, from an eng lead worried about agent-written security bugs. Commercial neighbour: "ai code security" (110, KD 19, CPC $38), which maps to `/teardown`; the post's CTA is the teardown.

**blog-analyze: 77/100.** Content 25 · SEO 16 · E-E-A-T 13 · Technical 12 · AI citation 11.
- 1,107 words, FRE ≈ 70, 38% of sentences over 20 words.
- Only 2 internal links and 2 external links in the body, 0 to `/services`.
- Strong: real code from the diffs with fix commits, and a runnable grep.
- Weak: the title tally differs from the site's canonical tally; no question H2s; thin outbound sourcing.

**Claims**

| # | Claim | Source checked | Verdict |
|---|---|---|---|
| 1 | 7 shell-string calls in 30 PRs: 4 caught (3 from request input + 1 from config), 3 missed (#98, #109, #117) | canonical facts: 6 shell-string sites + #98 from the 12 Oct re-audit; re-audit misses #98/#109/#117 + 2 XSS | **verified but conflicting framing.** The arithmetic is consistent with the canonical facts. But the title says "4 Caught, 3 Missed" while the site, the case study and the other posts say "3 shell-injection paths from request input caught, 5 security misses". A reader comparing pages sees two tallies for one run. Recommend a title on the canonical tally ("3 caught, 5 missed"), with the shell-only 4/3 inside the body and its scope stated |
| 2 | The repo had no tests and no CI | canonical facts | verified |
| 3 | #112: job ID from the URL into `execSync`; the rewrite deleted a February allowlist (`SAFE_ID`) | agent commit removes `SAFE_ID` and builds `` `openclaw cron run "${id}"` ``; the allowlist came from a security PR merged 16 Feb 2026 | verified |
| 4 | Anyone with the API token, or anyone at all with no token configured, could run commands | the middleware at the time disabled auth when no token was set | verified |
| 5 | The fix restored the allowlist and used `execFileSync` with an argv array | fix commit | verified |
| 6 | A hyphen-led ID (`--help`) still reached the CLI as a flag | regex reading; the 12 Oct fix later rejected `-`-leading IDs | verified (code reading) |
| 7 | #111: query through a `[^a-zA-Z0-9\s._-]` strip into `execSync(rg …)`; hyphens kept, so `--files` reached `rg` | agent commit; the 12 Oct fix PR notes "`q=--files` listed every log file" | verified |
| 8 | #121 copied the same regex the next day; its commit said "shell-safe query sanitization" | agent commit message | verified |
| 9 | GuardFall (Adversa AI), disclosed 30 Jun 2026, "bypassed the command filters of 10 of 11" agents; CSA note 11 Jul 2026 | labs.cloudsecurityalliance.org/…guardfall… (11 Jul 2026) | verified, wording loose. The page says "10 of 11 … were vulnerable to at least one of five shell-injection bypass techniques". Use that |
| 10 | Node `child_process` docs say which functions spawn a shell | nodejs.org/api/child_process.html | verified |
| 11 | #98: `repo`/`state`/`label` from the query into a `gh` command string; the review fix moved `ghExec` to a shared helper and kept the string | agent and fix commits | verified |
| 12 | #109: `gh pr view ${pr_number} -R ${project}` via `exec`, both values from a DB row | agent commit | verified |
| 13 | #117's format check was deleted by a rebased PR (#118) minutes later | #118's merge removes the `validateRepo` import and its call, leaving no callers; merged 3.4 min after #117 | verified |
| 14 | Sat for seven months; all 3 fixed on 12 Oct 2026 | own repo's fix PR merged 12 Oct 2026 | verified |
| 15 | Two AI reviewers both flagged #98 and #109 | the scheduled 28 Nov post's own results table | traced to my own experiment write-up. The raw run receipts weren't re-checked in this audit. Re-check before the 28 Nov post goes live |
| 16 | The grep pattern finds every call above | ran it on the 7 agent commits | verified (every commit has ≥1 hit) |
| 17 | The grep "returned 2 to 4 lines each" | same run: 3, 2, 2, 2, **1**, 4, 2 | **failed.** It's 1 to 4 (the config-path commit returns 1) |
| 18 | "A few minutes per PR" to trace | — | the post marks it as an estimate (OK) |
| 19 | FAQ: Veracode 2026 GenAI Code Security Report (28 Jul 2026), ~44% of tasks had a known vulnerability | veracode.com/blog/2026-genai-code-security-report-ai-risk/ (28 Jul 2026) | verified |

**Top 5 results** ("shell injection AI generated code" plus variant):
1. arXiv 2508.21669, "Cybersecurity AI: Hacking the AI Hackers via Prompt Injection" (Aug 2025): prompt injection steers an agent into a working reverse shell.
2. arXiv 2604.09089, "DeepGuard: Secure Code Generation…" (Apr 2026): a base model emits `shell=True` with f-strings; the fix is an argument list.
3. CSA research note on GuardFall (Jul 2026): 10 of 11 open-source agents' command filters can be bypassed.
4. Security Affairs, "GuardFall flaw hits 10 of 11 popular open-source AI agents" (date not shown): news coverage of the same finding.
5. skills.cat, "injection vulnerabilities ai generated code" (date not shown): generic advice.

Variant: arXiv 2508.21634, a large-scale comparison of human and AI code, finds CWE-78 far more often in AI-written Python.

**What this post adds:** real agent-written shell-injection diffs from one PR run, each with its review fix commit, the misses explained (wrapper function, DB row, rebase deletion), and a runnable grep-and-trace check. None of the top 5 shows a real agent PR with its fix.

**Verdict: KEEP+REWRITE.** This is the most distinctive post of the four. It has primary-source code that the corpus studies and guardrail-bypass research don't, it is exactly what an eng lead worries about when agents start opening PRs, and its CTA (the free teardown) is the natural next step. What the rewrite needs:
- put the headline on the canonical tally (claim 1);
- fix "2 to 4 lines" (claim 17) and the GuardFall wording (claim 9);
- add a `/services` link and 1–2 more outside sources (Veracode belongs in the body, not only the FAQ);
- make sure the AI-reviewer result it quotes is re-checked before 28 Nov.

---

#### 3. `what-agents-get-wrong` (live since 2026-07-09)

**Target query:** "how to review AI-generated code" (variant "AI generated code review checklist"). Intent: informational / how-to, from a lead setting review policy for agent PRs. keyword-research.md lists it as a buyer term with no measured volume. The close head term is "ai code review" (1,300, KD 37, CPC $56).

**blog-analyze: 76/100.** Content 25 · SEO 17 · E-E-A-T 12 · Technical 12 · AI citation 10.
- 987 words, FRE ≈ 61, 37% of sentences over 20 words.
- 5 internal links, 2 external, 0 to `/services`.
- Strong: a counted taxonomy with a real example per row, and a checklist ordered by count.
- Weak: the headline count can't be reproduced exactly (see below); 2 outside sources; the security section is just a pointer; no question H2s.

**Claims**

| # | Claim | Source checked | Verdict |
|---|---|---|---|
| 1 | 25 of 30 PRs needed ≥1 fix | git history per merge (none on #110, #114, #116, #123, #124) | verified |
| 2 | 28 fix commits plus the build-fix part of one feature commit | git history per merge | verified (25 PRs + 3 extra commits on #95, #113, #125; the build-fix part is in #124's feature commit) |
| 3 | **64 fixes = 61 distinct defects; 2 defects fixed on several branches, one of them 3 times** | re-derived (see below) | the arithmetic is verified: the `null` type fix appears on #122, #124 and #125 and the `swr` dependency on #124 and #125, so 61 + 2 + 1 = 64. **The total of 64 is method-dependent**: one defect per commit-message bullet gives about 73 |
| 4 | Per-category counts | re-derived (see below) | **partly verified.** Exact for: older Next.js 8 (4 async-params + 4 force-dynamic), security 9, missing dependency 3, input validation 3, wrong behaviour 2, docs 2, other ~9. Not reproduced: duplicated code 11 (bullet tally 17), type holes 10 (13, of which 3 are the repeated `null` fix), error handling 4 (7), client/API payload 3 (2). **The ranking holds** under both methods: duplicated > types > security > Next.js |
| 5 | #104 used date-fns `formatDistanceToNow` while `timeAgo` had been in `lib/format.ts` since 16 Feb | review fix commit message; file history (first commit 16 Feb 2026) | verified |
| 6 | #104, #106 and #115 formatted dates their own way | review fix commits | verified |
| 7 | #118: `last_commit: null` broke the build; three later branches fixed it | fix diffs (`null → undefined`) on #122, #124, #125 | verified |
| 8 | 4 PRs read `params` synchronously and 4 left out `force-dynamic` | fix commits on #99, #118, #119, #120 (params) and #109, #118, #119, #120 (force-dynamic) | verified |
| 9 | Synchronous `params` "returns 404 or 500 on every request" | — | opinion ("by my reading"), labelled OK |
| 10 | Commit trailers name Claude Sonnet 4 and Claude Opus 4.6 | branch commits of #95–#125: 14 Sonnet 4, 7 Opus 4.6 | verified |
| 11 | #109 reads `commit.sha`/`commit.author`; `gh` returns `oid`/`authors` | agent commit reads `commit.sha`; the 12 Oct fix PR lists "`gh` returns `oid`" as an open follow-up | verified. "The tab throws on any PR with commits" wasn't re-run |
| 12 | #100: no `res.ok` check | the agent commit has none; the fix adds error state and checks | verified |
| 13 | #97: reorder with an empty list was accepted | the fix adds an `items.length === 0 → 400` check | verified |
| 14 | #102: client sent `reorderedIds`, API expected `items`; every drag got a 400 | fix commit message; API schema is `items` (zod) | verified |
| 15 | `swr` imported by two pages, missing from `package.json` and the lockfile | 2 importing pages; fix commits add `swr` | verified |
| 16 | #112's lockfile rewrite dropped a dependency that #113 restored | `react-syntax-highlighter` (added by #109) is in the lockfile before #112's agent commit and gone after; #113's lockfile commit restores it | verified |
| 17 | #101 deleted the input schema #97 added; still missing on 12 Oct | `AddItemSchema` added in #97, removed in #101; absent from the work-queue route at the March run's last merge | verified (at that commit) |
| 18 | #107's review fix loosened a path check to `..` only | fix commit message | verified |
| 19 | Four checks went missing, review caught one | #112 allowlist (caught), #101 schema, #107 loosening, #118 rebase deletion | verified |
| 20 | CodeRabbit, Dec 2025: 10.83 vs 6.45 issues per PR, 470 PRs | coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report (17 Dec 2025) | verified |
| 21 | Addy Osmani, "Agentic Code Review", 15 Jun 2026: agents "weaken CI to make themselves pass" | addyosmani.com/blog/agentic-code-review/ (15 Jun 2026) | verified (exact quote) |
| 22 | Two search screens wrote their own highlight helpers instead of `sanitizeSnippet` (in the repo since 16 Feb), giving stored XSS | `sanitizeSnippet` first commit 16 Feb 2026; both agent commits build `<mark>` via `.replace` on raw text | verified |
| 23 | 9 of 61 defects would break the build or a page | — | unverifiable judgment (the post says it was judged from code, not run). Keep it labelled |
| 24 | FAQ: the three-agent panel flagged all 5 missed bugs | the scheduled 28 Nov post | traced to my own experiment write-up, not re-checked here |
| 25 | FAQ: fixed all 5 on 12 Oct 2026 | fix PR merged 12 Oct 2026 | verified |

**Re-derivation of the 64-fix table.** One defect per bullet in each review fix commit's message (from `git log M^1..M^2` per merge, #95–#125). Bullets that don't fix a defect are excluded: log-prefix standardization, doc comments, re-exports, unused imports, and the "create constants file" plumbing behind a dedupe.

| Category | Post | Re-derived | Note |
|---|---:|---:|---|
| Duplicated code / existing helpers | 11 | 17 | the post likely grouped per PR (12 PRs) and merged some |
| Type holes | 10 | 13 | includes the `null` fix ×3 |
| Security and hardening | 9 | 9 | #111, #112 ×2, #113, #117 ×2, #118, #119, #121 |
| Older Next.js | 8 | 8 | exact |
| Error handling | 4 | 7 | #98, #100 ×2, #102 ×2, #111, #121 |
| Input validation | 3 | 3 | exact |
| Client/API payload | 3 | 2 | #102 reorder, #101 labels format |
| Missing dependency / lockfile | 3 | 3 | exact |
| Wrong behaviour | 2 | 2 | #101, #103 hard-coded project lists |
| Docs | 2 | 2 | exact |
| Other (FKs, seed, artifacts, name clashes, schema alignment) | 9 | ~9 | judgment on what counts |
| **Total** | **64** | **~75** | |

Conclusion: the shape and the ranking hold, but "64" is not a count anyone can reproduce from the history without the original agent's itemization, and that itemization wasn't kept. For the rewrite, either publish the counting rule with a per-PR receipt and recount, or say "about 60–75 fixes depending on how you split a commit, ranked the same way".

**Top 5 results** ("how to review AI-generated code" plus "checklist" variant):
1. Graphite, "How to review code written by AI" (graphite.com/guides/how-to-review-code-written-by-ai, date not shown): generic guide on tests, scope and dependencies.
2. Real Python, "Review AI-generated code" (realpython.com/review-ai-generated-code/, date not shown): treat it as untrusted code and verify behaviour.
3. Formation, "Reviewing AI-generated code" (formation.dev/blog/reviewing-ai-generated-code, date not shown): the person who opens the PR owns every line.
4. aicodereview.cc, "How to Review AI-Generated Code, a 2026 Checklist" (2026): hallucinated APIs and packages, scope, be able to explain each block.
5. juststeveking, "Reviewing AI Generated Work" (juststeveking.com/articles/reviewing-ai-generated-work/, date not shown): a personal process essay.

The variant results are checklists of 10 to 50+ items with no counts.

**What this post adds:** a categorized count of real review fixes on 30 agent PRs, with a verified example per category, and a checklist ordered by that frequency. None of the top 5 has any counted data.

**Verdict: KEEP+REWRITE.** The topic is a buyer query: setting review policy for agent PRs leads straight to "have a senior engineer review them" (the offer). The SERP is all generic checklists, so a counted taxonomy is a real gap. But the headline number is the post's main asset, and it doesn't reproduce exactly. A rewrite must either recount with a published rule or soften it to a range, or the post risks the very trust it is trying to earn. It should also hand all security content to the shell post (one link), lead with the duplicated-helper and old-framework findings (the most novel ones), add a `/services` link, and add more outside sources.

---

#### 4. `66-days-of-claude-code-by-the-numbers` (live since 2026-10-10)

**Target query:** "claude code usage statistics" now. For buyers, "claude code cost per developer" / "claude code token usage cost" fits better. Intent: informational. A CTO budgeting for Claude Code wants cost and usage patterns. The post's seoTitle "Claude Code Usage Stats: 463 Sessions, 45B Tokens, 66 Days" is 58 chars.

**blog-analyze: 79/100.** Content 26 · SEO 18 · E-E-A-T 11 · Technical 13 · AI citation 11.
- 1,305 words, FRE ≈ 66, 35% of sentences over 20 words.
- 8 internal links, but 3 point to scheduled posts and render unlinked until they go live. 1 external domain (2 links, the same docs page). 0 to `/services`.
- Strong: an accessible SVG chart, the method stated, scope labels on every number.
- Weak: external sourcing is thin; the buyer payoff (what this costs a team) is buried under vanity counts.

**Claims** (own counts traced to the session-mining output of 10 Oct 2026; `WORKFLOW_NUMBERS` = 463 / 335 / 4,920 / 928 / 66)

| # | Claim | Verdict |
|---|---|---|
| 1 | 463 interactive sessions, 66 days (6 Aug–10 Oct), 53 active days | verified (`WORKFLOW_NUMBERS`, mining output) |
| 2 | 335 wall-clock hours; 890 session-hours; 2.7 sessions per keyboard hour | verified (335.4 / 889.8 → 2.65) |
| 3 | 3,599 subagent sessions; 172,480 tool calls; 4,920 `git commit`; 928 `gh pr create`; 454 `git worktree add`; 6,981 test runs; 2,835 typecheck runs; 37 usage-limit episodes | verified |
| 4 | 10,511 prompts, median 10 words, mean 21; 1,620 slash commands; 288 interrupts; 76 active prompt days | verified |
| 5 | Prompt history goes back to 12 July | verified as the window floor. The mining window starts on 12 July, so history may go back further |
| 6 | Sessions by month 80 / 279 / 770 (all sessions) | verified |
| 7 | Over 600 headless runs | verified (1,129 − 463 = 666) |
| 8 | Busiest 10-minute window: 18 interactive sessions; median day ~6 h, 7–8 new sessions | verified (active-segment method, 18; 6.0 h; 7.5) |
| 9 | Tokens: 43.97B cache reads, 950M writes, 83M output, 627K input; ≈45B total; 97.7% reads, 2.1% writes | verified |
| 10 | Opus 5.5 list rates: $0.20/M cache read, $8/M 1-hour write, $20/M output | verified: platform.claude.com/docs/en/about-claude/pricing (fetched 14 Oct 2026; Opus 5.5 row $4 in, $8 1-hour write, $0.20 hit, $20 out) |
| 11 | ≈$18,000 at list rates; shares 49% / 42% / 9%; a write costs 40× a read | verified by arithmetic ($8,794 + $7,604 + $1,657 ≈ $18,055) |
| 12 | Assumes the 1-hour cache "a subscription uses" | unverifiable from the pricing page. State it as an assumption |
| 13 | 90% Opus, 7% Sonnet | verified (148,708 and 11,255 of 164,544 messages) |
| 14 | 1,119 Agent spawns: 615 general, 132 Explore, 252 reviewers, 86 copy/design, 20 other, 14 untyped; 22.5% / 30% | verified |
| 15 | 1.4 test runs per commit | verified (6,981 / 4,920) |
| 16 | `/insights` analyzes up to 200 new sessions per run | verified: code.claude.com/docs/en/costs ("up to 200 sessions it hasn't seen before") |
| 17 | `/usage` shows `Prompt cache (main)` from v2.1.251, the likely cause from v2.1.260 | verified: code.claude.com/docs/en/costs |
| 18 | `cleanupPeriodDays` defaults to 30 | verified on code.claude.com/docs/en/claude-directory, not on /costs. Cite the right page |
| 19 | One account kept 60 days, three kept 30; now 365 on three of four | current state verified (three at 365, one at 60). The past 30-day state can't be checked now |
| 20 | "Reviewers catch what the author missed"; "most obvious problems are gone by the time a PR reaches me" | opinion, labelled as uncounted (OK) |

**Top 5 results** ("claude code usage statistics" plus "token usage cache reads cost" variant):
1. vincentqiao.com, "Claude Code /stats: See How Much AI Does For You" (date not shown): explains the `/stats` command.
2. docs.rs ccstats (no date): a CLI that parses local logs for tokens and cost.
3. Raycast ccusage extension (no date): a tool listing with no data.
4. danbruegge, "Claude Code usage stats for one week" (tiny.write.as, date not shown): one week of first-hand solo numbers. Not opened; check it before claiming the angle is unique.
5. claudelog, "How to see usage in Claude Code" (date not shown): `/usage`, `/stats` and the 5-hour windows.

The variant results are pricing explainers on cache reads at ~0.1x and writes at 1.25x of base input, from older model pricing.

**What this post adds:** 66 days of one engineer's deduplicated Claude Code counts, plus a cost finding nobody in the top 5 has: cache writes are 2% of the tokens and 42% of the list-price dollars. It also has a stated method and links to cost per merged PR.

**Verdict: KEEP+REWRITE (lowest priority of the four).** As it stands, it's the weakest fit for buyers. Session counts and prompt lengths are interesting to practitioners, but they don't answer a CTO's question, and the first-hand SERP competition is thin but real (danbruegge). The genuinely novel, first-hand finding is the cost structure, which is a budgeting question an engineering lead does ask. Rewrite it around "what Claude Code actually costs, and why cache writes drive it":
- keep the slug and the date;
- target "claude code cost per developer" or "claude code token usage";
- move the session and prompt stats to a supporting table;
- add 2–3 more outside sources (the pricing page, the caching docs);
- add a `/services` link (Agent Fleet Setup);
- cite `cleanupPeriodDays` from the right docs page and state the 1-hour-cache assumption.

REPLACE isn't justified: the slug is live, and the data underneath is sound.



Audited 2026-10-14. Claude Code current version: **2.1.299 (14 Oct 2026)** per the [changelog](https://code.claude.com/docs/en/changelog). Scores use `blog-analyze` / `quality-scoring.md` (Content 30 · SEO 25 · E-E-A-T 15 · Technical 15 · AI citation 15). Search volumes are US figures from `keyword-research.md`.

#### 1. `the-rules-file-my-agents-follow` (live 17 Oct)

**Target query:** `claude md examples` (720/mo, KD 13), informational. A CTO would search "CLAUDE.md best practices" or "claude code rules file". The seoTitle "CLAUDE.md Examples: 5 Rules and Which Hooks Enforce Them" (56 chars) fits.

**blog-analyze: 71/100.** Content 24 · SEO 15 · E-E-A-T 11 · Technical 11 · AI 10. Strong original data and short sentences (ASL 14.6). Weak points:
- the description is 169 chars;
- it has only 1 internal link, no `/services` link and 1 external source;
- there are no question H2s and no images.

**Claims:**

| Claim | Status |
|---|---|
| Rules file 3,382 words = `CLAUDE.md` 939 + 8 rule files | verified (`wc -w`, 14 Oct) |
| 2,408 words always loaded, 974 in 3 path-scoped files | verified (191 + 516 + 267 = 974) |
| 274 commits behind it on 12 Oct | verified (`git log`; last commit 12 Oct) |
| Hook log, 23 Sep–12 Oct: 105 commit-format rejections | verified for a cut at mid-afternoon 12 Oct UTC. The full day of 12 Oct gives 110. State the cut time or use the full-day numbers |
| 6 outbound-voice denials, first on 1 Oct | verified |
| Secret scan ran 329 times, 24 unresolved-repo passes | verified for the same cut (full day: 333 / 25) |
| 204 skip-token uses, 79 on 24 Sep | verified (full day: 205) |
| Transcripts hold 372 commands with the token; 366 after a denial; 112 denials, 109 from the noisy check, 3 from a test key | **failed reproduction.** My recount over the same 4 config directories through 12 Oct finds 304 commands with the token, 297 of them after a denial in the same session. It finds about 136 deny messages: 129 from the "hardcoded credential assignment" check and 2 AWS-key shapes. The pattern holds: the agent learned the override from a false positive. The exact numbers don't hold. Re-derive with a committed script, or say "about 300" |
| Every deny message ends with "[skip-secret-scan] to override" | verified. The hook still prints it today, so the post's proposed fix is not applied |
| Merge-gate token used 0 times in the window | verified |
| One of 3 gates fails closed fully; the secret scan and the merge gate each have an allow path | verified. The secret scan allows an unresolved repo and missing git. The merge gate skips on any `--help` in the command |
| Secret scan misses a commit wrapped in `bash -c`, `sudo`, `timeout` or `env` | verified (the hook's commit regex, plus a hook-lab test on 12 Oct) |
| Claude Code 2.1.295 added `onFailure: "block"` (covers can't start, timeout, unexpected exit) | verified ([changelog](https://code.claude.com/docs/en/changelog), 2.1.295, 8 Oct 2026) |
| Rule 3 in the rules file from 23 Aug | verified (`git log -S`, 11f81c0, 23 Aug) |
| Rule 3 in notes by 28 Apr; credited to May corrections | unverifiable (no receipt found) |
| Taste file 282 words | verified |
| 8 rule files deleted over the repo's life | verified (8 paths) |
| Cline postmortem, 24 Feb 2026, the issue-triage quote | verified ([cline.bot](https://cline.bot/blog/post-mortem-unauthorized-cline-cli-npm), 24 Feb 2026) |
| `paths:` frontmatter scopes rule loading | verified (memory docs, path-scoped rules) |

**Top 5 for `claude md examples`:**
1. morphllm.com, "CLAUDE.md Examples and Best Practices for Claude Code in 2026": templates by stack.
2. inventivehq.com, "How to write a CLAUDE.md file": a section-by-section guide.
3. heyuan110.com, "CLAUDE.md Best Practices: Write Files That Actually Work" (5 Mar 2026): length limits and project-type examples.
4. hackernoon.com, "How to write a CLAUDE.md that actually helps Claude Code": applies to AGENTS.md too.
5. usagebar.com, "How to Use CLAUDE.md Examples in Claude Code": sample files.

All five are template lists. Several say "rules are context, not enforcement". None measures what happens when a rule fails.

**What this post adds:**
- a rule-by-rule "what enforces it" map;
- hook-log counts;
- the skip-token finding: one false positive teaches the agent the override.

Nobody in the top 5 has data.

**Verdict: KEEP+REWRITE.** The slot is fixed (it goes live 17 Oct in any case), and the skip-token finding is first-hand and novel. A CTO can turn "a gate with a typed escape is a request" into a policy for the team. To do:
- fix or round the transcript counts;
- add `/services` plus 2 internal links;
- cut the description to 160 chars.

Overlap: rule 1 previews `claude-code-fail-closed-hooks` (14 Nov), and the word counts repeat in the audit post. Keep the hook test results in the 14 Nov post only.

#### 2. `how-i-run-claude-code-agents-in-parallel` (24 Oct)

**Target query:** `claude code parallel agents` (170, KD 24), with `claude code git worktrees` (140, KD 19) as secondary. Informational and how-to. An eng lead would search "run multiple claude code agents in parallel". The seoTitle is 57 chars.

**blog-analyze: 71/100.** Content 22 · SEO 16 · E-E-A-T 11 · Technical 11 · AI 11. It has 3 internal and 3 external links. The description is 229 chars, too long. There is no `/services` link, and 27% of sentences run over 20 words.

**Claims:**

| Claim | Status |
|---|---|
| 18:11 on 12 Oct: Herdr listed 25 agents across 15 workspaces; `claude agents` listed 9 | verified (session receipt with the command output) |
| 18:25: 9 / 8 / 6 / 2 sessions per config directory = 25 | verified (receipt) |
| `claude agents` lists only the config directory it runs under | verified in substance. [Agent view docs](https://code.claude.com/docs/en/agent-view): with `CLAUDE_CONFIG_DIR` set, it "runs as a separate instance with its own sessions". **Flag:** the docs also say "Interactive sessions you have open in other terminals don't appear until you background them". The local CLI listed `interactive` sessions anyway, so the docs and the CLI disagree. Mention that, or avoid depending on it |
| `-w` creates `.claude/worktrees/<name>/` on a branch named `worktree-<name>`, cut from the default branch; `worktree.baseRef: "head"` | verified ([worktrees docs](https://code.claude.com/docs/en/worktrees), fetched 14 Oct) |
| `.worktreeinclude` copies gitignored files; a worktree is a fresh checkout | verified (worktrees docs) |
| Worktrees share `.git` (and so the stash) | verified (worktrees docs "What worktrees share"; the stash is a shared ref per git) |
| "Don't ask again" in a worktree is saved to the main checkout's settings | verified (worktrees docs; since v2.1.211) |
| Ten agents use quota "roughly ten times as fast" | verified (agent view docs) |
| `--bg` moves into a worktree, commits and pushes, never pushes to main, force-pushes or merges; CLAUDE.md git instructions win | verified (agent view docs) |
| `claude attach <id>` | verified (agent view docs; a name also works since 2.1.290, 5 Oct) |
| Subagent `isolation: worktree` | verified (worktrees docs) |
| Agent teams: experimental, off by default, one shared checkout | verified ([agent teams docs](https://code.claude.com/docs/en/agent-teams): "experimental and disabled by default"; "Avoid file conflicts") |
| Agent view is a research preview; sessions stop if the machine shuts down | verified (agent view docs) |
| "As of 2.1.296 (9 Oct 2026)" | true when written (2.1.296 = 9 Oct). **Stale at go-live:** the current version is 2.1.299 (14 Oct). Docs also now list cross-session messaging, which the post doesn't mention. Re-date before 24 Oct |
| Content run used E2E ports 3081–3084 | verified (run brief) |
| `pkill -f next-server` took down another project's server on 10 Oct | verified (memory note with the date) |
| Parallel `herdr worktree create` raced on `.git/config.lock` | verified (orchestration lessons note; date not separately checked) |
| Herdr is a multiplexer for coding agents and runs Codex too | verified ([herdr.dev](https://herdr.dev), 14 Oct) |
| Links to `/work/nine-prs-one-afternoon` (twice) | the study goes live on 24 Oct, the same day. Confirm it's live at 00:00 UTC, or the links 404 |

**Top 5 for `claude code parallel agents git worktrees`:**
1. mindstudio.ai, "Parallel agentic development with git worktrees".
2. morphllm.com, "Claude Code Git Worktree: How Parallel Agents Actually Work": native `-w`, subagent worktrees.
3. dev.to (stacknotice), "Git worktrees + Claude Code: run parallel AI agents on the same repo (2026)".
4. aident.ai, "How to Run Parallel Claude Code Agents With Git Worktrees".
5. aibuilderclub.com, "Claude Code worktree parallel agents": notes that ports, DBs and merges aren't isolated, and that agent teams are experimental.

The SERP already covers `-w`, the ports and databases caveat, and agent teams being experimental.

**What this post adds:**
- shared permission approvals;
- quota as a shared resource;
- config-directory blindness (a 25 vs 9 count);
- two real incidents (a pattern kill, the `config.lock` race).

That is a thin margin, because the core table half-overlaps the SERP.

**Verdict: KEEP+REWRITE (lowest priority of the four; first to cut if the slate needs a slot).** The buyer angle is weak as written: it's a solo multi-account setup. A CTO cares about running agents for a team: shared approvals across worktrees, quota, and merge order. Lead with the shared-approvals and quota rows, plus the two incidents. Cut the Herdr CLI block to one line. Link `/services` and the nine-PR study.

Overlap: the brief and run material duplicates `/work/nine-prs-one-afternoon`, and the usage-limit line points to `66-days`.

#### 3. `reviewer-agents-that-dont-trust-other-agents` (31 Oct)

**Target query:** `claude code multi-agent code review` (no measured volume). The nearest measured query is `claude code review skill` (590, KD 0). The intent is informational with a commercial tail: the site sells review. A CTO would search "AI code review agents", "do AI reviewers catch real bugs". The seoTitle is 56 chars.

**blog-analyze: 73/100.** Content 25 · SEO 14 · E-E-A-T 11 · Technical 12 · AI 11. It is the most original data set of the four, and its 4 tables suit AI extraction. It has 1 internal link, 1 external source, no `/services` link and no images. The slug doesn't contain the target query.

**Claims:**

| Claim | Status |
|---|---|
| 85 PRs with a reviewer verdict, 9 May–10 Jul 2026, 3 own repos | verified against the counting agent's receipt (read-only `gh` queries). A spot check of 2 searches matched |
| 5 panel-posted / 41 single-agent / 39 author summary only | verified (receipt) |
| Outcomes 47 / 7 / 20 / 1 / 10 / 0; 81 of 85 merged; no PR over 2 cycles | verified (receipt) |
| BLOCK sample n = 20: 11 fixed, 5 probably fixed, 3 deferred, 1 unclear; 11 security, 4 correctness, 4 completeness, 1 naming | verified (receipt; non-random sample, as the post says) |
| 10 of 11 security BLOCKs fixed or probably fixed; the 3 deferred were completeness | verified (receipt) |
| 10 of the 39 state no verdict | verified (receipt: 10 "verdict not stated", all in format C) |
| Reviewer models since 7 Oct: Sonnet 5.5 / Opus 5.5 / Sonnet 5.5 | verified (agent frontmatter; commit 7cc4fc1, 7 Oct) |
| Panel posts to the PR only on a 3-cycle stall | verified (panel-review skill, lines 70–77) |
| Managed Code Review: inline findings, check run with a severity table, always completes neutral | verified ([Code Review docs](https://code.claude.com/docs/en/code-review), fetched 14 Oct: "always completes with a neutral conclusion so it never blocks merging") |
| 8-commit blind test, 2 shell strings approved; post on 28 Nov | not re-checked here (it belongs to the 28 Nov post audit) |

**Top 5 for `claude code multi-agent code review subagents`:**
1. tembo.io, "Claude Code Subagents: A 2026 Practical Guide".
2. lilting.ch, "Claude Code multi-agent PR review": describes the managed Code Review flow.
3. claude.com/blog, "How and when to use subagents in Claude Code": advises read-only reviewer subagents.
4. morphllm.com, "Claude Code Subagents: Why the Best Coding Agents Delegate".
5. claudelog.com, "What are Sub-Agents in Claude Code".

All five are how-to explainers. None reports outcomes of reviewer agents on real PRs.

**What this post adds:**
- the only outcome data (85 PRs);
- the audit-trail finding: 39 of 85 verdicts are uncheckable;
- the BLOCK-to-fix trace.

**Verdict: KEEP+REWRITE.** It is the best Scoping-Call driver of the four: an eng lead adopting reviewer agents gets a concrete governance rule ("the reviewer posts its own verdict on the PR, every cycle"), backed by data nobody else has. To do:
- add a `/services` link and a link to the 30-PR study;
- link the 28 Nov post once it is live;
- say upfront that the data predates the 5.5 models.

Overlap: `ai-reviewers-on-the-bugs-i-missed` (28 Nov) and `what-agents-get-wrong` (live) cover the human and AI review of the same work. Consider merging 31 Oct and 28 Nov into one stronger post, which would free a slot.

#### 4. `auditing-my-claude-code-setup-with-an-agent` (7 Nov)

**Target query:** `audit claude code setup` (no measured volume). The nearest measured query is `claude code workflows` (1,900, KD 28). The intent is how-to. A CTO would search "claude code skills not triggering" or "CLAUDE.md too long". The seoTitle is 55 chars.

**blog-analyze: 69/100.** Content 23 · SEO 14 · E-E-A-T 11 · Technical 11 · AI 10. Weak points:
- the description is 221 chars;
- it has 2 internal links, no `/services` link and 1 external source;
- the headline numbers mix agent-audit figures with recounts, which hurts trust when they don't reproduce.

**Claims:**

| Claim | Status |
|---|---|
| `/skill-doctor` needs v2.1.252+; shows context cost and use; flags never-invoked skills | verified ([skills docs](https://code.claude.com/docs/en/skills), fetched 14 Oct) |
| Listing truncates `description` + `when_to_use` at 1,536 chars | verified (skills docs) |
| 9 Aug analysis: 43 of 65 skills unfired in 70 days; median 74 vs 657 chars | verified (dated agent-audit report) |
| 80-char cap removed 10 Aug, replaced with "There is no length cap" | verified (git 1a0faed, 10 Aug; finished in 11f81c0, 23 Aug) |
| Tracked skills 57 on 1 Jul → 19 on 12 Oct | verified (git ls-tree) |
| 21 of 24 own skills fired 28 Aug–12 Oct; 3 never fired (an onboarding skill and 2 audit skills) | verified (recount receipt). Its method filtered files by modification time, not start time |
| `/skill-doctor` showed 20 of 24 as "never"; `ship` and `grill` on that list; typed `/status` moved 0 → 1 | verified (receipt: `ship` 0× never, `grill` 0× never, `status` 1× after the typed run) |
| `ship` 15 and `grill` 13 invocations in the previous 7 days | unverifiable from the receipt: it shows 30 each since 28 Aug, not the 7-day split |
| "24 = 19 tracked + 5 outside git" | partly verified: 19 tracked is right; today there are 22 skill directories with a SKILL.md |
| 4 Jul audit: ~21,000 always-loaded tokens, 6,000–8,000 removable; `confidence: N` parsed by a gating script | verified (dated agent audit; the post correctly calls these estimates) |
| `CLAUDE.md` 3,179 (5 Jul) → 1,824 (7 Jul) → 939 | verified (git) |
| CLAUDE + rules 9,976 (22 Aug) → 4,106 (23 Aug) → 3,382 | verified (git history size table, `wc -w`) |
| July audit: 81% of 4,994 spawns on the top tier; 324 of 431 calls without `model:`; 86.7% vs 86.9% | verified (dated agent audit) |
| Recount: 2,769 of 3,279 spawns (84%) on Opus, 28 Aug–12 Oct | **failed independent reproduction.** The receipt shows 2,490 + 279 Opus of 3,279, so the figure is consistent with its own script. My recount takes one model per subagent transcript whose first event falls in the window, and gets 1,455 spawns, 973 on Opus (67%). The two methods differ: modification-time vs start-time filtering, and possibly counting per call. Re-derive with one committed script before 7 Nov, or drop the percentage |
| Stale model IDs fixed 7 Oct; session default still Opus | verified (git 7cc4fc1 and 1d36c80, 7 Oct) |
| Metric scripts and memory layer removed 11 Sep; memory layer 4 writes vs a threshold of 10 | verified (git fe68aa0 / ad4816b / 630a747, 11 Sep) |
| GitHub MCP server removed 22 Sep from one account, still configured in a second config directory on 12 Oct | verified (still configured on 14 Oct) |
| A 94-line doc said "ran live"; a trigger table routing to 18 skills, 14 gone | not re-checked (from dated agent audits; low risk) |
| Honesty 0.75 → 0.941; failed claims 11 → 0; checkable rate 1.0; tests "25/25" → 130/133, exit 1 | verified (29 Jul remediation report) |
| "Including the 2 the July audit counted as real failures" | not re-checked |
| 22 Sep deep audit: 69 agents, 5 phases, 89 findings, 5 brief errors | verified (run-state: 12 + 35 + 3 + 18 + 1 = 69 agents) |
| Refuters killed 0 of 71, then "0 of 12" | first half verified (P2: 0 refuted, 90 seeds dropped). **The second half fails:** the P4 run-state records 2 refuted. Fix it to "2" or drop it |
| An agent printed MCP-config secrets into its transcript | verified in substance (the audit's "What I got wrong" section) |
| `.claude.json` holds MCP server config | verified (local config files) |

**Top 5 for `audit claude code setup skills CLAUDE.md`:**
1. smithery.ai, "Claude Code Excellence Audit": a community skill that scores a setup.
2. skills.sh (reizam), "claude-md-audit": trims CLAUDE.md.
3. claudepluginhub.com, "claude-memory audit": checks CLAUDE.md, rules and memory against a checklist.
4. skills.sh (fearovex), "claude-folder-audit": orphaned skills and drift.
5. vibeindex.ai, "hook-audit" skill.

All five are tools with no results attached.

**What this post adds:**
- before/after numbers;
- the self-inflicted cause (the 80-char cap silenced the skills);
- `/skill-doctor` undercounting;
- the "the metric lied, not the agent" finding.

**Verdict: KEEP+REWRITE, narrowed.** Two of its five checks are first-hand and novel: the description cap, and the broken honesty metric (0.75 → 1.0 on checkable claims). For a CTO, "before you conclude an agent is lying, check the instrument" is the shareable insight. Check 3 rests on a number that doesn't reproduce.
- **Rewrite** around the honesty-metric story plus skills that never fire.
- **Drop or re-derive** the 84% figure and the "0 of 12".
- **Add** `/services`.

Overlap: the word-count table repeats the rules post, and the cost link repeats `/work/agent-cost-per-commit`. Keep word counts in one post only.

#### Set-level notes
- No post links `/services`, which R7 requires. Three of four have fewer than 2 internal links to posts or case studies.
- Three descriptions run over 160 chars: 169, 229 and 221.
- No question-format H2s. FAQs exist in the frontmatter only.
- Cluster overlap: the rules post, the audit post and the 14 Nov fail-closed hooks post all draw on the same harness data. The reviewer post and the 28 Nov AI-reviewers post share the review story. A merge in each pair would free 2 slots for buyer topics.



Audit date: 2026-10-14. External sources fetched that day. Claude Code is at 2.1.299 today; nothing in 2.1.297–2.1.299 changes the hook, cost or `/code-review` behaviour these posts describe.

---

#### 1. `claude-code-fail-closed-hooks` (slot 2026-11-14)

**Target query + intent.** Primary: "claude code hooks fail open" / "claude code hooks onFailure" (no measured volume in keyword-research.md, which never seeded hook terms). Secondary spoke under the hub "claude code best practices" (1,900, KD 18). Intent: informational and technical. A CTO or eng lead searches "are claude code hooks a security boundary", "claude code guardrails fail closed" or "claude code hooks security" before letting agents run with hooks as the gate. seoTitle "Claude Code Hooks Fail Open: onFailure block, Tested" (53 chars) fits.

**blog-analyze: 78/100 (Acceptable).** Content 25/30 · SEO 18/25 · E-E-A-T 12/15 · Technical 12/15 · AI citation 11/15.
- Lost points: description is 224 chars (target 150–160); 2 internal links, none to `/services`; 0 of 6 H2s are questions; only 3 external sources.
- Strong points: answer-first opening; two real result tables; a reproducible lab script; the FAQ fits FAQPage schema.

**Claims checked**

| # | Claim | Source | Status |
|---|---|---|---|
| 1 | 2.1.295 (8 Oct 2026) added `onFailure: "block"` for command and HTTP hooks | [changelog](https://code.claude.com/docs/en/changelog), 2.1.295 entry dated 8 Oct 2026 | verified |
| 2 | Default is `"continue"`; needs 2.1.295+ | [hooks reference](https://code.claude.com/docs/en/hooks) | verified |
| 3 | Quote: "a policy hook with a wrong path or a crashing script lets everything through" | hooks reference, exact text | verified |
| 4 | Quote: exit 1 is "a non-blocking error, even though 1 is the conventional Unix failure code" | hooks reference, exact text | verified |
| 5 | No effect on Stop, SubagentStop, TaskCompleted, TeammateIdle or async hooks | hooks reference ("async or asyncRewake") | verified |
| 6 | Documented only for command and http hooks | hooks reference | verified |
| 7 | Default timeout is 600 s for a command hook | hooks reference (600 for command/http/mcp_tool; lower on some events, not PreToolUse) | verified |
| 8 | Output that starts with `{` and doesn't end with `}` is plain text; "plain-text stdout from a command hook isn't a failure" | hooks reference, exact text | verified |
| 9 | developersdigest ran six configurations on 2.1.295 on 9 Oct | [developersdigest](https://www.developersdigest.tech/blog/coding-agent-hooks-fail-open-vs-fail-closed-2026), 9 Oct 2026: six PreToolUse setups on v2.1.295 | verified |
| 10 | They didn't test truncated JSON, schema-invalid JSON or a real secret scanner | same page | verified |
| 11 | Test 1 table: 6 rows, default vs block, including truncated JSON running under `block` | own run log, 12 Oct 2026 | verified |
| 12 | Test 2 table: 4 rows | own run log | verified |
| 13 | Run on Claude Code 2.1.296 with Haiku | session metadata: version 2.1.296, model claude-haiku-5-5 | verified |
| 14 | "nine broken or misled hooks and one working gate through 20 headless sessions" | 10 cases × 2 modes = 20, plus 1 control run (21 sessions in total) | verified. Add "plus a control" or leave it as is |
| 15 | `--setting-sources local` excluded user settings | lab script | verified |
| 16 | The secret scan's regex expects `git` at the start of a segment; 2 of 8 commit shapes scanned, 6 skipped | 20 Sep audit table (8 shapes, 6 bypass), and the current hook source still has the same regex | verified |
| 17 | In-script handling checks `error`, a null status and a non-zero exit separately | hook source | verified |
| 18 | When the hook can't parse its own input, it allows, and the comment says it should fail closed for commits | hook source (stdin-parse catch → exit 0) | verified |
| 19 | 20 Sep: three read-only agents found five instances of one failure class (items 1–5 as listed) | 20 Sep security audit, findings C1–C5 | verified |
| 20 | Wrong-account push gate skipped 4 of 4 sampled remotes using SSH host aliases | audit C3 | verified |
| 21 | 22 Sep: `cd ~/.claude && git commit` skipped the scan because `~` wasn't expanded; fixed and verified the same day | harness commit, 22 Sep | verified |
| 22 | 22 Sep: the PR-creation gate moved from a regex to a command parser | harness commit, 22 Sep (`gh pr create` regex → `invokesCommand`) | verified |
| 23 | The five findings were still open on 12 Oct | hook source unchanged (same regex today, 14 Oct) | verified for C1. The other four are "re-read", per the post: not independently re-checked here |
| 24 | `base.js` has `invokesCommand()`, which the PR gate uses and the secret scan doesn't | hook sources | verified |
| 25 | 9 Aug 2026: `block-destructive.js` denied a commit whose message contained "git push origin main" | comment in the hook ("Verified 2026-08-09") and the 10 Aug harness commit | verified |
| 26 | The secret scan has three written exceptions (skip token, unresolved repo, unresolvable first push) | hook header | verified |
| 27 | On 12 Oct `block-destructive.js` had `block` and no `timeout` | not re-checked against the 12 Oct state. Today's settings have timeouts on several gates | unverifiable as of 12 Oct. Re-check, or keep the date qualifier |
| 28 | The lab took under an hour | lab files timestamped 17:51 → 18:09 on 12 Oct | verified |
| 29 | Every client gate gets these ten cases before handover | process statement | opinion/intent. Keep it only if it's true going forward |

**Top 5 for "claude code hooks fail open onFailure"**
1. developersdigest, "Do Your Agent Hooks Fail Open? Claude Code vs Codex vs Cursor vs Gemini CLI" (9 Oct 2026). Six configs on 2.1.295, plus a cross-tool comparison.
2. fyve.co.jp, "CC for Biz: claude-code-hooks-onfailure-block" (date not visible). An explainer for the new field.
3. classmethod, "Major Updates in Claude Code v2.1.294~v2.1.295: hooks onFailure: block" (9 Oct 2026). Release notes.
4. bestagent.dev, "Claude Code hooks: the four worth having, and the traps that bite" (2026). A hook selection guide.
5. agentpatterns.ai, "Hook Catalog for Claude Code Enforcement" (date not visible). A catalog of hook patterns.

**What only this post has.** It shows that truncated JSON passes even with `block` set. It runs a real secret scanner and shows a staged key reaching history through `bash -c` while `onFailure` sees nothing. The other results stop at the hook process; this post shows that `onFailure` can't see a gate that runs and answers wrong. It also has a lab loop the reader can copy.

**Verdict: KEEP+REWRITE.** The finding is first-hand and new, and it answers the question a CTO actually has: is my guardrail a guardrail? The CTA follows naturally, since "I test every gate before I hand it over" is the service. Changes for the rewrite:
1. Fix the bypass before go-live, or say plainly that it's still open on the publish date. Publishing a live, unfixed bypass of your own gate reads badly to a security-minded buyer. Best: fix it, then write "fixed on <date>, here is the regression test".
2. Cut the description to ≤160 chars and add a `/services` link.
3. Turn 2–3 H2s into questions.
4. Overlap: the 20 Sep audit section repeats ground the `auditing-my-claude-code-setup-with-an-agent` post (07 Nov) could cover. Keep the fail-open audit here and keep that post on skills and context size.

---

#### 2. `how-i-measure-claude-code-roi` (slot 2026-11-21)

**Target query + intent.** "how to measure claude code roi" / "claude code roi" (not in keyword-research.md; worth a cheap `get_keyword_metrics` check). Intent: commercial investigation. This is the closest of the three to the buyer: an eng lead or CTO asked by finance "what are we getting for this?". seoTitle "How to Measure Claude Code ROI: 5 Counting Traps" (49 chars) fits.

**blog-analyze: 80/100 (Strong, low end).** Content 23/30 · SEO 22/25 · E-E-A-T 12/15 · Technical 12/15 · AI citation 11/15.
- Lost points: the method is one person's ledger, not a team's, so depth for the stated reader is thin; average sentence is 20.6 words; 0 question H2s; the 6 internal links go to only 2 targets, none `/services`.
- Strong points: a 153-char description with a number; a clear method table; each trap pairs a failure with its fix; good primary-doc links.

**Claims checked**

| # | Claim | Source | Status |
|---|---|---|---|
| 1 | Transcripts are deleted after `cleanupPeriodDays`, 30 by default, and `/insights` reports follow the same schedule | [costs docs](https://code.claude.com/docs/en/costs) | verified |
| 2 | DORA's J-curve; quote "the verification tax imposed by reviewing AI-generated code" | [InfoQ, 11 May 2026](https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/), which links [dora.dev/ai/roi/report](https://dora.dev/ai/roi/report/) | verified (quote is InfoQ's summary of the report) |
| 3 | Until early October, 3 of 4 accounts kept 30 days and 1 kept 60; earliest transcript 6 Aug; August covered 1 of 4 accounts | ledger README (one seat kept 60 days, the others 30; days to 30 Aug pruned); transcript scan starts 6 Aug | verified |
| 4 | Set to 365 on three accounts; the fourth (employer) keeps 60 | the four config dirs' settings today: 365, 365, 365, 60 | verified |
| 5 | The four OTel env vars | [monitoring docs](https://code.claude.com/docs/en/monitoring-usage) quick start | verified |
| 6 | Metrics `claude_code.cost.usage`, `claude_code.commit.count`, `claude_code.active_time.total` | monitoring docs metrics table | verified |
| 7 | One transcript entry per content block, each repeating the full usage; 30-day re-scan $45,295 per entry vs $22,236 per response, ratio 2.04 | ledger README, cost-method cutover section | verified (own data, ledger replacement cost) |
| 8 | 5 Oct: $191 of $702 (27%) in sessions outside any repo | ledger README ($191.01 of $701.60) | verified |
| 9 | One GitHub owner's token saw only public repos, so the ledger recorded 0 merged PRs where GitHub had 102 in 30 days | ledger README | verified |
| 10 | GitHub search stops at 1,000 results | [GitHub REST search docs](https://docs.github.com/en/rest/search/search) (up to 1,000 results per search); ledger fix commit, 5 Oct | verified |
| 11 | `claude_code.pull_request.count` counts PRs created, not merged | monitoring docs: "Incremented when Claude Code creates a pull request or merge request through a shell command or an MCP tool" | verified |
| 12 | Every dollar figure is a list-price estimate unless `modelPricing` is set; that setting needs **Claude Code 2.1.242** or later | costs docs say 2.1.242. The GitHub CHANGELOG lists the `modelPricing` addition under **2.1.243** | **failed (minor)**: the primary sources disagree. Write "2.1.243 or later" (safe for both) or cite the docs page |
| 13 | Opus 5.5 cache reads $0.20/MTok and Opus 5 $0.50/MTok, so 2.5x | [pricing](https://platform.claude.com/docs/en/about-claude/pricing) | verified |
| 14 | 2.1.296, released 9 Oct 2026, corrected `/cost` to price Sonnet 5.5 cache reads at $0.10 instead of $0.20 | changelog 2.1.296 (9 Oct 2026); pricing page lists Sonnet 5.5 cache hits at $0.10 | verified |
| 15 | $49 per merged PR in September at Opus 5 list price | the cost case study, consistent with the ledger | verified (own data, replacement cost) |
| 16 | $100/h engineer cost | labelled illustrative | opinion/assumption (labelled) |
| 17 | Break-even of 30 minutes | $49 / $100 per hour = 29.4 min | verified (arithmetic) |
| 18 | "my agent PRs merged a median 44 minutes after opening" | GitHub timestamps for the March 30-PR run, n=30: median 44.1 min | verified, but **scope it** to "the 30 agent PRs of the March run". Unscoped, it reads as all agent PRs, and in the ledger window own repos show 27 min and are self-merged |
| 19 | "A cheap PR that waits 16 hours for review" | LinearB's 2026 figure (in the 2-3x post), but no link in this post | **unsourced here**. Link [LinearB](https://linearb.io/blog/8-million-prs-engineering-productivity) or say "the 16 hours LinearB measured" |
| 20 | "three months of them" in the cost case study | the case study spans July–October, but pre-11-Sep data isn't comparable (method change) | partly. Say "results, with the method change marked" |
| 21 | "I made that mistake once in public" (double count) | the cost case study's correction note | verified |

**Top 5 for "how to measure claude code roi"**
1. Faros AI, "How to measure Claude Code ROI: Developer productivity insights with Faros" (vendor, 2026). Cohort comparison: PR velocity, review time, cycle time.
2. Jellyfish, "Claude Code ROI: How to Measure Adoption & Prove Business Value" (vendor, 2026). A dashboard of merged PRs and attributed lines.
3. Exceeds AI, "How to Measure Claude Code ROI: A 5-Step Framework" (vendor, 2026). (Productivity + quality − risk) ÷ token spend, plus line survival.
4. Tribe AI, "A quickstart for measuring the return on your Claude Code investment" (2026). OTel cost ÷ commits and lines.
5. First AI Movers, "How to Measure Claude Code ROI for Your Engineering Team" (2026). A time-saved log for small teams against developer cost.

**What only this post has.** Every top result is a vendor framework that assumes the data is clean. This post shows, with dated numbers, five ways the data breaks: retention deletes it, entries double-count (2.04x), spend outside a repo goes missing (27% on one day), a failed read records 0 instead of 102, and the wrong price table can be off by up to 2.5x. None of the five vendors mention retention, the per-entry double count or `pull_request.count` meaning "created".

**Verdict: KEEP+REWRITE.** This has the highest buyer intent of the three, and the traps are a novel, first-hand finding. Changes for the rewrite:
1. Reframe it for a team lead: what to set on every seat (managed `cleanupPeriodDays`, OTel to a store you own), and how the five traps scale to 10 seats. Keep the solo ledger as the proof.
2. Fix claim 12 (version), scope claim 18, source claim 19.
3. Add a `/services` link: "I set this up for a team" is the Scoping Call hook.
4. Overlap: the cost case study (`/work/agent-cost-per-commit`) and `66-days-of-claude-code-by-the-numbers` both own "the numbers". This post must stay "the method and the traps", with no new cost figures beyond the one $49 break-even input.

---

#### 3. `ai-reviewers-on-the-bugs-i-missed` (slot 2026-11-28)

**Target query + intent.** "ai code review vs human review" (the seoTitle's term). It sits under "ai code review" (1,300, KD 37, CPC $56), but that is the homepage's primary term, so the post should target the long-tail comparison and link up to `/` rather than compete for the head term. Also: "can ai code review catch security bugs", "claude code review skill" (590, KD 0) for the `/code-review` angle. Intent: commercial investigation. A CTO deciding whether an AI reviewer can replace or cut human review of agent PRs.

**blog-analyze: 79/100 (Acceptable, high end).** Content 25/30 · SEO 18/25 · E-E-A-T 13/15 · Technical 12/15 · AI citation 11/15.
- Lost points: 1 internal link and no `/services`; description is 186 chars; average sentence is 21.9 words; 0 question H2s; the first table is dense for a phone.
- Strong points: the strongest original data in the set (a blind protocol, an 11-row outcome table, per-run tokens and time); the limits are stated honestly; it ends on a reproducible `CLAUDE.md` rule.

**Claims checked**

| # | Claim | Source | Status |
|---|---|---|---|
| 1 | 8 agent commits (#98, #109, #111, #112, #113, #117, #119, #121), each reviewed blind in a history-free repo with the diff staged and the commit message as the only prompt | experiment log, 12 Oct 2026, and per-PR diffs | verified |
| 2 | `/code-review` medium on v2.1.296, run by an Opus 5.5 subagent; panel: Sonnet 5.5, Opus 5.5, Sonnet 5.5 | experiment log | verified |
| 3 | 4 of 8 commits carry a Claude Sonnet 4 trailer and 4 carry none | git trailers on the 8 agent commits: 4 Sonnet 4, 4 none | verified |
| 4 | The repo's Feb `AUDIT.md` warns repo names in shell commands are "injection-ready if made dynamic" | AUDIT.md (16 Feb 2026), exact text | verified |
| 5 | Two reviewers on #98 cited this site's project file (Vercel, branch name), and those findings were counted as wrong | experiment log (#98: "gh not on Vercel (wrong)" from alpha and gamma) | verified |
| 6 | All 11 table rows (catches, ranks, B/W/N per reviewer) | experiment log tally plus the #98 addendum | verified, with one exception: row #117 "Me, March: missed (fix deleted)" **contradicts the canonical facts**, which record #117 as partly fixed in March (format validated, still `sh -c`). Use "partly fixed (still a shell string)" |
| 7 | "The panel flagged all 5 security bugs my review let through, `/code-review` 4" | 5 misses per the canonical re-audit (#98, #109, #117, XSS #111, XSS #121); `/code-review` left #117 out of its 10 | verified |
| 8 | The XSS sinks are at `log-viewer.tsx:535` and `memory/page.tsx:231` | experiment log, verified at the March HEAD | verified |
| 9 | `gh pr view --json commits` returns `oid` and `authors`, no `sha`, so the #109 tab crashes | log, plus the route still maps `commit.sha` at the current HEAD (after the fix PR) | verified. The crash is still unfixed today |
| 10 | Fixed all 5 security bugs on 12 Oct 2026; that fix did not fix the crash | fix PR merged 12 Oct 2026 16:23 UTC; the route still maps `sha` | verified |
| 11 | The panel asked for changes on all 8; the security reviewer alone would have approved #113 and #117 | log | verified |
| 12 | Projects became editable from the UI in the next PR, #118 | #118 "project CRUD forms (add/edit/delete)", merged 13 Mar | verified |
| 13 | `/code-review --max-findings all` needs v2.1.288+ | [code-review docs](https://code.claude.com/docs/en/code-review); CHANGELOG 2.1.288 | verified |
| 14 | `/code-review` follows the repo's `CLAUDE.md` | code-review docs ("The review follows your CLAUDE.md like any Claude Code session") | verified |
| 15 | `/code-review` reports 10 findings at medium effort | own runs: 10 on 7 commits, 9 on #98. The docs say only "the review's usual limit" | verified as observed. Phrase it as "returned 10 findings each time" |
| 16 | Findings 79 / 47 / 97 / 115 = 338; panel 259 | log: (70+9) / (39+8) / (87+10) / (101+14) | verified |
| 17 | Time 53–82 s, 20–38 s, 12–34 s, 16–27 s; tokens about 58k, 29–41k, 26–40k, 27–41k | log raw usage per run | verified |
| 18 | Managed Code Review costs $15–25 per review on average, takes about 20 min, its findings "don't approve or block your PR", and it's a Team/Enterprise research preview | code-review docs | verified |
| 19 | Semgrep's summary of an ICSE 2022 study: 3% and 21% for two seeded flaws, 61% at best with a checklist; caveat "two specific vulnerabilities in one study" | [Semgrep, 9 Oct 2026](https://semgrep.dev/blog/2026/end-is-nigh-for-code-review); [arXiv:2202.04586](https://arxiv.org/abs/2202.04586) | verified (61% is "with a security focus or checklist") |
| 20 | Addy Osmani cites a 146-PR experiment where 93.4% of locations were flagged by exactly one of four tools | [Addy Osmani, 15 Jun 2026](https://addyosmani.com/blog/agentic-code-review/) ("Of 617 distinct flagged locations, 93.4% were caught by exactly one of the four tools") | verified |
| 21 | All the reviewers are Claude models | log | verified |

**Top 5 for "ai code review vs human review"**
1. Stride, "AI Code Review: How Automated Review Catches What Manual Review Misses" (date not visible). Opinion and process.
2. Rainforest, "AI code review" (DevSecOps, date not visible). Warns that AI stays silent on real vulnerabilities and invites over-trust.
3. Addy Osmani, "Code Review in the Age of AI" (Substack, 2026). A practitioner essay on review as the bottleneck.
4. SoftwareSeni, "What AI code review catches and misses" (date not visible). A catches/misses framing with no experiment.
5. OffSeq radar, "An AI code scanner matched humans on every critical/high bug…" (2026). A secondary summary of a vendor benchmark; the original isn't confirmed.

**What only this post has.** A blind, same-diff head-to-head: AI reviewers against the human review that actually happened on those commits, with the outcome known from a later re-audit. The top results are opinion, or vendor benchmarks with no human baseline on the same code. The post's specific finding, that the AI made the same "the value comes from my own data, so it's low risk" call the human made, is new, and it maps straight to a rule a team can adopt.

**Verdict: KEEP+REWRITE.** This is the most novel finding in the set and the most direct path to the Scoping Call ("put a machine pass before the human, and keep a human who owns the merge" is the offer). Changes for the rewrite:
1. Fix row #117 to the canonical wording.
2. Add `/services` plus 2 internal links (the 30-PR case study is already there; add `what-agents-get-wrong` and the reviewer-panel post).
3. Cut the description to ≤160 chars.
4. Overlap risk is high. `catching-shell-injection-agents-wrote` (live) covers the same commits and its title says "3 Missed", which conflicts with the canonical 5 misses: flag it for that post's audit. `reviewer-agents-that-dont-trust-other-agents` (31 Oct) covers the same panel. Make this post the experiment, the shell-injection post the bug anatomy, and the 31 Oct post the paper trail, with each linking to the others.
5. Note: the "same model family" limit is honest and worth keeping. A cross-family re-run (for example a non-Claude reviewer) would make the post much stronger if there's time.

---


