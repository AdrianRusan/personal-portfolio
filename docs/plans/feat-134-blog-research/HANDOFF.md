# HANDOFF: blog remake #134

**Verdict: ready to merge in order.** All 12 slate posts are written, fact-checked, blind-reviewed and voiced. Every PR passed the full ladder locally (tsc → lint → build → jest → e2e); GitHub shows only the GitGuardian and Vercel checks, because the repo has no CI workflow. Two dates are hard: merge PR 1–2 by **Fri 16 Oct** for the rules post, and fix the secret-scan parser by **Fri 13 Nov** for the hooks post. Reviewing takes about 45 minutes: 25 for the five post PRs, 20 for the RO card strings and the teasers.

## 1. Merge order and go-live deadlines

The PRs are stacked, so merge strictly in this order. Each one contains the ones above it.

| # | PR | What | Must be merged by | Why that date |
|---|---|---|---|---|
| 1 | #137 `feat/134-blog-research` | audit, topic research, slate (docs only) | Fri 16 Oct | the base of the stack |
| 2 | #138 `feat/134-blog-posts-1` | rules (17 Oct), shell-injection and review posts (live) | **Fri 16 Oct** | the rules post goes live Sat 17 Oct 00:00 UTC either way; unmerged, the old version goes live |
| 3 | #139 `feat/134-blog-posts-2` | 2-3x and usage posts (live) | as soon as possible | both are live today with the old numbers |
| 4 | #140 `feat/134-blog-posts-3` | worktrees (24 Oct), AI reviewers moved to 31 Oct, setup-audit cut | **Fri 23 Oct** | the worktrees post goes live 24 Oct |
| 5 | #141 `feat/134-blog-posts-4` | subagents (7 Nov), hooks (14 Nov) | **Fri 6 Nov** | the subagents slug has to exist before 7 Nov |
| 6 | #142 `feat/134-blog-posts-5` | cost (21 Nov), team rollout (28 Nov), vibe-coded app (5 Dec). Closes #134 | **Fri 20 Nov** | the cost post goes live 21 Nov |

All slots are Saturday 00:00 UTC, which is 03:00 EEST until 25 Oct and 02:00 EET after it (Friday evening in the US). That was already the pattern, and the slate kept it. "Merge by Fri" means by Friday evening your time; the post goes live a few hours later.

Base branches: when #137 merges, GitHub retargets #138 to `main`, and so on down the stack. If a retarget fails, edit the PR's base to `main` by hand before merging.

## 2. Before 14 Nov: your one code task (gate Q3)

The hooks post says "I've since moved the secret scan onto the same parser". That isn't true yet:

1. In `~/.claude/hooks/secret-scan.js`, replace the `isCommit` and `isPush` regexes (about line 137) with `invokesCommand()` from `base.js`, as the PR gate already does.
2. Add a test for the `bash -c`, `sudo`, `timeout`, `env` and `xargs` forms of `git commit`.
3. Optional, same file: the stdin-parse catch (about line 128) allows when it can't parse its input. The post names that as an open bug of yours, so fixing it is a bonus, not a requirement.

If this slips past 13 Nov, either change that sentence in `content/blog/claude-code-fail-closed-hooks.mdx` to "the fix is next" or move the post's date.

## 3. OpenSEO credits

**17 spent** (one `get_keyword_metrics` call on 30 keywords, 14 Oct). 163 left. No audits, trackers or schedules.

## 4. Cut posts and redirects

| Slug | What happened | Redirect |
|---|---|---|
| `auditing-my-claude-code-setup-with-an-agent` | cut; its checks moved into the team-rollout and subagents posts | none: never live (was 7 Nov) |
| `reviewer-agents-that-dont-trust-other-agents` | renamed to `claude-code-subagents-in-review` | none: never live (was 31 Oct) |

The 4 live slugs are unchanged. The existing #86 301s still point at `/blog/2-3x-not-100x` (200, one hop).

## 5. What to check (about 20 minutes)

1. **RO card strings** in `data/ro-home.ts` for the 11 retitled or new posts. These are cards only, not post translations. The `roPostTitles` test requires one per published post, and the repo rule says EN and RO change together.
2. **Two numbers that replaced published ones:** "79 fixes / 76 distinct" in `what-agents-get-wrong` (it used to say 64; the counting rule is published in the post). The case study `/work/30-reviewed-prs-3-vulnerabilities` still says 64, because case studies were out of scope. The post says so.
3. **Aggregates you approved at the gate (Q2):** cost per merged PR by week, 42% of spend on zero-PR repo-days, subagent turns per PR, the 1,010 gh-guard tokens, and the scanner counts. All are totals with no client named.
4. **The vibe-coded post** describes your dashboard's committed auth token (taco-console #128, which said to rotate it) and says the middleware still skips auth when the token is unset. Rotate the token if that hasn't happened yet. If you fix the middleware before 5 Dec, change that sentence in the post.

## 6. Spot check (brief §7.5)

Five claims picked across the posts, each traced to its receipt in the private `claims.md`:

1. 84% of subagent messages on Opus (subagents post): 54,992 of 65,363 in `tx_out.json`, summed by hand.
2. 36 hooks written, 14 deleted (rules post): `git -C ~/.claude log --diff-filter=A/D`, recounted.
3. 79 fixes / 76 distinct (review post): recounted by hand, then reproduced independently by the fact-check agent.
4. $65 per merged PR, week of 5 Oct (cost post): `ledger2.py`, re-run on 14 Oct.
5. Veracode about 44%, 28 Jul 2026 (shell and vibe posts): fetched on 14 Oct.

All five trace.

## 7. Post-merge steps

1. After each merge, check in the Vercel dashboard that production runs the last merge commit, and promote it if not (CONTEXT Known Issues).
2. On or after **24 Oct**: restore `[nine PRs](/work/nine-prs-one-afternoon)` in `content/blog/2-3x-not-100x.mdx` (R9, memory `relink-nine-prs-2026-10-24`).
3. After each Saturday go-live, open `/blog` once and check that the new post is listed and the previous one still loads.
4. Deferred, not done: the Markdown twin (`/api/markdown`) keeps links to not-yet-live posts as live links, which 404 for agents until the date. The HTML page shows them as plain text. The fix is in `lib/markdown/` (strip non-live `/blog/` links, as `MDXContent` does).
5. Deferred: `data/workshops.ts` `workshopHubLink` still points at the worktrees post. That works, since the post's CTA is the workshop, but a dedicated workshop post would fit better.

## 8. LinkedIn teaser drafts (NOT posted)

Written through `/adi-voice`, in English for LinkedIn. One per post, to go out on its go-live day. Each one is short-first, with one ask at the end.

**17 Oct · CLAUDE.md examples**
> My secret-scan hook printed its own override in every deny message. Agents used it in about 300 commands, and 297 of them came after a first block in the same session.
>
> I cut my agent rules from 10,667 words to 3,382 and moved the ones that mattered into hooks. What survived, and why the override has to go: [link]
>
> Do your gates have an override the agent can read?

**Shell-injection (live, refreshed)**
> Agents wrote 7 shell commands built from strings into 30 PRs on my own repo. I fixed 4 in review and missed 3. All 3 took a longer path: a wrapper function, a database row, a check deleted by a rebase.
>
> The diffs and the grep I run now: [link]

**How to review AI-generated code (live, refreshed)**
> I recounted every fix review made on 30 agent PRs: 79. Duplicated code came first (18) and security third (11). Security is also where review missed the most: 5 bugs, found by a re-audit.
>
> The counting rule is in the post, so you can redo it: [link]

**Where the AI speed-up goes (live, refreshed)**
> DX measured under 8% more PRs across 400 companies. Faros measured review time up 5x. My agent PRs merged a median 44 minutes after opening, because the reviewer was expecting them.
>
> If agent PRs wait hours on your team, who owns pickup time? [link]

**Claude Code usage (live, refreshed)**
> 66 days of my Claude Code logs: cache writes were 2.1% of the tokens and 42% of the list-price dollars. The reads are cheap. Rebuilding the cache isn't.
>
> Counts and method: [link]

**24 Oct · Claude Code worktrees**
> A git worktree isolates files. On my laptop five things stayed shared between parallel agents, and two of them caused incidents on the same day: a pattern kill took down another project's server, and two worktree creations raced on .git/config.lock.
>
> The list to settle before a team runs agents in parallel: [link]

**31 Oct · /code-review vs my review**
> I ran /code-review and a three-agent panel blind on 8 commits I'd already reviewed. They flagged all 5 security bugs I had missed. On one, they also made my exact mistake: "the value comes from my own data, so it's low risk".
>
> Results, cost per run, and the two CLAUDE.md lines that fix the ranking: [link]

**7 Nov · Claude Code subagents**
> My review subagents left verdicts on 85 PRs. 39 can't be checked now, because only the coding agent's one-line summary is left. And 84% of my subagent messages ran on Opus, probably because I never set a model on them.
>
> Two files that fix both: [link]

**14 Nov · Claude Code hooks fail open**
> My secret-scan hook let commits through unscanned for 75 days. It ran, exited 0 and logged an allowed exception every time, so onFailure: "block" had nothing to catch.
>
> What block does stop, what it can't see, and the lab I run on every gate: [link]

**21 Nov · Claude Code cost per merged PR**
> My cost per merged PR rose from $52 to $65 in four weeks, at list price. 42% of the spend was on repo-days that merged nothing that day.
>
> The method, and the five traps that broke my numbers first: [link]
>
> What does your team track for agent spend?

**28 Nov · Claude Code for teams**
> Four files decide most of a team's Claude Code rollout: shared settings with gates that fail closed, a short CLAUDE.md, reviewer subagents with a pinned model, and one weekly number.
>
> What I'd commit on day one, from the harness I run: [link]

**5 Dec · Vibe-coded app: keep, fix or rebuild?**
> My own agent-built app had 5 security bugs my review missed and an auth token committed to git. I fixed both in two PRs on the same day, because I could explain every part of it. Most founders can't, and that's the real question.
>
> Before you rebuild an AI-built app, run these five checks: [link]
