# Topic research (#134, 2026-10-14)

**Verdict:** buyers argue about what happens after the code is written: review queues, security misses, cost per shipped change, and rules files agents ignore. The top 5 results for every target query are generic checklists or vendor frameworks; none publishes a counted run with its misses. The strongest topics are the ones where Adi has that run. Reviewing this takes about 10 minutes: section 1, then the shortlist.

Sources: Hacker News (Algolia API), WebSearch SERPs, primary survey and vendor pages (each with URL and date), `marketing-skills:content-strategy` scoring, the private content-research receipts, and a new first-hand data inventory (section 3). Reddit and LinkedIn could not be read by script, so neither is cited as demand.

## 1. Keyword metrics for the slate (OpenSEO, US, 2026-10-14, 17 credits)

| Query | Vol | KD | Intent | Fits |
|---|---|---|---|---|
| claude code usage | 4,400 | 25 | info | `66-days…` |
| claude code cost | 4,400 | 38 | info | ROI post |
| claude code hooks | 3,600 | 16 | nav | hooks post |
| claude code review | 2,900 | 12 | info, CPC $18.5 | AI-reviewers post |
| claude code subagents | 2,400 | 19 | info | subagents post |
| claude code best practices | 1,900 | 18 | commercial | `/blog` hub (unchanged) |
| ai code review | 1,300 | 37 | info, CPC $55.7 | `/` (unchanged) |
| claude code settings | 880 | 10 | nav | team-rollout post (secondary) |
| claude code enterprise | 720 | 35 | info | team-rollout post |
| claude code worktrees | 720 | 20 | nav | parallel post |
| claude md examples | 720 | 13 | info | rules post |
| ai code review tools | 590 | 29 | commercial, CPC $86.9 | AI-reviewers post (secondary) |
| claude code token usage | 260 | 21 | nav | `66-days…` (secondary) |
| claude code for teams | 170 | 28 | info, CPC $15.9 | team-rollout post |
| claude code parallel agents | 170 | 24 | info | parallel post (secondary) |
| vibe coding security | 110 | 16 | commercial, CPC $99.2 | founder post, shell post |
| claude code hooks examples | 70 | 15 | info | hooks post (secondary) |
| vibe coding | 110,000 | 56 | info | too broad; context only |

No measurable volume: how to review ai generated code, does ai make developers faster, ai code review bottleneck, ai code review vs human review, claude code roi, measure ai developer productivity, vibe coded app, fix vibe coded app. These stay as the words buyers type into an LLM, so posts use them in H2s and FAQs.

## 2. Discourse, external numbers and shortlist


### 2.1 What buyers argue about (evidence of demand)

Hacker News stories since 1 Jan 2025, points / comments as of 2026-10-14 (HN Algolia API):

| Theme | Stories (points / comments, date) |
|---|---|
| Review as the bottleneck; AI review tools | "There is an AI code review bubble" 351/249 (2026-01-26); "Stage – putting humans back in control of code review" 130/111 (2026-04-16); "If AI coding is lowering your code quality, you're not managing quality right" 129/169 (2026-09-20) |
| Does AI make devs faster? | METR "Measuring the impact of AI on experienced OS developer productivity" 775/485 (2025-07-10); "AI coding tools can reduce productivity" 279/274 (2025-07-10); "AI adoption and Solow's productivity paradox" 792/752 (2026-02-18) |
| Vibe coding vs engineering | "After two years of vibecoding, I'm back to writing by hand" 865/634 (2026-01-26); "Vibe coding and agentic engineering are getting closer than I'd like" (Simon Willison) 787/885 (2026-05-06); "The cult of vibe coding is dogfooding run amok" 616/512 (2026-04-06); "Vibe coding kills open source" 330/285 (2026-01-26) |
| CLAUDE.md / AGENTS.md | "Writing a good Claude.md" 748/290 (2025-11-30); "AGENTS.md outperforms skills in our agent evals" (Vercel) 524/196 (2026-01-29); "Universal Claude.md – cut Claude output tokens" 471/162 (2026-03-31); "Claude Code reads AGENTS.md only when telemetry is on [fixed]" 486/284 (2026-09-23); "Evaluating AGENTS.md: are they helpful for coding agents?" 232/161 (2026-02-16) |
| Hooks and guardrails | "Claude Code now supports hooks" 384/171 (2025-07-01); "A context-aware permission guard for Claude Code" 127/94 (2026-03-11); "Tell HN: Claude 4.7 is ignoring stop hooks" 109/90 (2026-04-24); "Bubblewrap: prevent agents from accessing your .env files" 187/140 (2026-01-15) |
| Parallel agents | "Embracing the parallel coding agent lifestyle" (Willison) 174/138 (2025-10-06); "Parallel agents in Zed" 279/164 (2026-04-22); "Parallel coding agents with tmux and Markdown specs" 189/131 (2026-03-02); "LLM codegen go brrr – parallelization with git worktrees and tmux" 156/73 (2025-05-28) |
| Cost and limits | "Claude Code weekly rate limits" 609/705 (2025-07-28); "No, it doesn't cost Anthropic $5k per Claude Code user" 480/351 (2026-03-09); "Claude Code users hitting usage limits 'way faster than expected'" 331/224 (2026-03-31); "RTK reports token savings, but our cost benchmarks disagree" 170/84 (2026-09-11) |
| Juniors vs agents | "AWS CEO says replacing junior devs with AI is 'one of the dumbest ideas'" 1,073/532 (2025-12-17) |

Recurring arguments in the comments (read on two threads, so treat as indicative). "AI code review bubble": AI reviewers have poor signal to noise, they lack context beyond the diff, and they work as a complement to human review, not a replacement. "Writing a good Claude.md": long files get ignored, and rules need hooks, linters or tests to enforce them. People disagree on whether any of this can be measured.

**Reddit: unverifiable in this run.** reddit.com returns 403 to scripts, the PullPush archive rate-limits agents, and WebSearch with `site:reddit.com` returned blogs instead of threads. The only Reddit-adjacent evidence was a mirrored post about management tracking daily AI usage, plus secondary articles about "tokenmaxxing". Don't cite Reddit demand without a manual check.

### 2.2 External numbers to cite (each verified at the primary source, or marked)

| # | Fact | Source, date | Status |
|---|---|---|---|
| E1 | 16 experienced OS developers, 246 issues: 19% **slower** with AI. They forecast a 24% speed-up and believed afterwards that they'd been 20% faster | [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), 2025-07-10 | verified (primary) |
| E2 | Follow-up: 57 devs, 800+ tasks. Returning devs −18% time (CI −38% to +9%), new devs −4% (CI −15% to +9%). METR calls the data "an unreliable signal" because devs refused to work without AI, and treats it as a likely lower bound on speed-up | [METR, "We are changing our developer productivity experiment design"](https://metr.org/blog/2026-02-24-uplift-update/), 2026-02-24 | verified (primary). Many blogs misreport this as "18% faster": a gap worth correcting in a post |
| E3 | DORA 2025: ~5,000 respondents, 90% use AI, 30% have little or no trust in its output, AI is "a mirror and a multiplier" | [Google blog on DORA 2025](https://blog.google/technology/developers/dora-report-2025/), 2025-09-23 | verified (primary summary) |
| E4 | Stack Overflow 2026 survey: 30,000+ respondents. Agents of choice: Claude Code 66%, Copilot 59%. 31% of daily users run AI 4+ h/day. Cost controls: 38% set usage limits, 28% review spending data. 93% need source attribution to trust AI output | [Stack Overflow blog](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), 2026-10-06 | verified (primary) |
| E5 | Stack Overflow pulse: 69% use a single agent; 68% prefer predictable single-agent setups; 60% block agents from unapproved system changes | [Stack Overflow, "Agents on a leash"](https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work), 2026-05-27 | secondary (via search snippet); fetch before citing |
| E6 | Stack Overflow 2025: trust in AI accuracy 33% vs 46% distrust; 66% name "almost right, but not quite" as the top frustration | Stack Overflow 2025 survey (via InfoWorld/ShiftMag) | secondary; check survey.stackoverflow.co/2025 before citing |
| E7 | LinearB 2026 benchmarks: 8.1M+ PRs. AI PR acceptance 32.7% vs 84.4% manual. AI PRs wait 4.6x longer before pickup, then get reviewed 2x faster | [LinearB](https://linearb.io/resources/engineering-benchmarks-report), 2026 edition, no date on page | verified (primary page), but the metric definitions aren't on the page |
| E8 | Faros "Acceleration Whiplash" (22,000 devs, 4,000 teams, telemetry): median review time 5x, bugs per PR +28%, incidents per PR 3x, PR size +51%, tasks +33.7%, deployments/week −11.7% | [Faros](https://faros.ai/research/ai-acceleration-whiplash), 2026 (no date on page; secondary sources say March) | verified (vendor page); no definitions. The "31% merged without review" figure is **not** on the page: drop it |
| E9 | Faros 2025: high-AI teams merged 98% more PRs and review time rose 91% | Faros AI Productivity Paradox, 2025 (widely quoted) | secondary; primary not reached |
| E10 | Veracode 2026: 100+ models, 56% security pass rate (55% the year before), ~100% syntax pass | [Veracode release](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/), 2026-07-28 | verified earlier for the site (data/index.ts, checked 2026-10-12) |
| E11 | Apiiro: 10,000+ new security findings a month by June 2025 (10x Dec 2024); privilege-escalation paths +322% | [Apiiro](https://apiiro.com/blog/4x-velocity-10x-vulnerabilities), Sep 2025 | secondary-level confidence (vendor blog, Fortune-50 repos, not replicated) |
| E12 | CodeRabbit: 470 OS PRs, AI-co-authored PRs average 10.83 issues vs 6.45 (1.7x) | [CodeRabbit](https://coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report), 2025-12-17 | vendor; the category figures conflict between sources |
| E13 | GitClear 2025: 211M changed lines; duplicated blocks up 8x in 2024; moved (refactored) lines −39.9% | GitClear AI Copilot Code Quality 2025 (via DevClass, 2025-02-20) | secondary |
| E14 | DX: self-reported 3.6 h/week saved (Q4 2025, 58,330 devs), 3.9 h (Q1 2026) | [DX Q4 report](https://getdx.com/report/ai-assisted-engineering-q4-impact-report/) | secondary; self-reported |
| E15 | Sonar State of Code: 1,100+ devs; 96% don't fully trust AI code to be correct, 48% always check it before committing, 38% say AI code takes more effort to review | [Sonar release](https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/), 2026-01-08 | secondary (vendor) |
| E16 | AGENTS.md study: context files generally didn't raise task success and added 20%+ inference cost. Agents follow the instructions, but repo overviews don't help | [arXiv 2602.11988](https://arxiv.org/abs/2602.11988), v1 2026-02-12, v3 2026-09-29 | verified (abstract) |
| E17 | c-CRAB benchmark: best single AI reviewer 32.1%, union of 4 tools 41.5%, against issues human reviewers raised | [arXiv 2603.23448](https://arxiv.org/pdf/2603.23448), 2026 | secondary (search summary) |
| E18 | "Tokenmaxxing": Jellyfish (7,548 engineers, Q1 2026) found ~2x throughput at 10x token cost; Waydev says acceptance drops 10–30% once churn is counted | [TechCrunch](https://techcrunch.com/2026/04/17/tokenmaxxing-is-making-developers-less-productive-than-they-think/), 2026-04-17 | verified as reported by TechCrunch; the underlying studies are vendors' |

### 2.3 Ranked shortlist

Scores follow content-strategy's 40/30/20/10 weights: customer impact, content–market fit (own data + path to an offer), search potential, effort (higher = cheaper). "Own data" means first-hand receipts as listed in the private claims sheet.

| Rank | Topic (working title) | Score | Type | Target query (vol / KD) | Current post | Leads to |
|---|---|---|---|---|---|---|
| 1 | How to review AI-generated code: 64 fixes on 30 agent PRs, and the 5 I missed | 9.0 | searchable + shareable | ai code review (1,300 / 37); how to review ai generated code (no vol) | `what-agents-get-wrong` (live) KEEP+REWRITE | Reviewed PR |
| 2 | Where the AI speed-up goes: PRs wait 4.6x longer for review | 8.6 | shareable | claude code workflows (1,900 / 28) | `2-3x-not-100x` (live) KEEP+REWRITE, re-angled to the review queue | Delivery Sprint / Retainer |
| 3 | AI reviewers vs my review, blind: they flagged all 5 misses, then approved one | 8.5 | shareable + searchable | claude code review skill (590 / 0) | `ai-reviewers-on-the-bugs-i-missed` KEEP+REWRITE | Reviewed PR, Fleet Setup |
| 4 | The security bugs agents write: shell injection from request input, caught and missed | 8.3 | searchable | ai code security (110 / 19) | `catching-shell-injection-agents-wrote` (live) KEEP+REWRITE | Teardown → AI Audit |
| 5 | Cost per merged PR, not tokens: how I measure Claude Code ROI | 8.2 | searchable + shareable | claude code best practices (1,900 / 18) as hub link; ROI terms n/m | `how-i-measure-claude-code-roi` KEEP+REWRITE | AI Audit |
| 6 | CLAUDE.md that agents follow: I cut mine from 10,667 to 3,382 words | 8.1 | searchable | claude md examples (720 / 13) | `the-rules-file-my-agents-follow` (live 10-17) KEEP+REWRITE in place | Workshop, Fleet Setup |
| 7 | Claude Code hooks fail open: testing my gates until they broke | 7.6 | searchable | claude code hooks (n/m) | `claude-code-fail-closed-hooks` KEEP+REWRITE | Fleet Setup |
| 8 | Parallel agents in git worktrees: what a worktree doesn't isolate | 7.4 | searchable | claude code parallel agents (170 / 24); git worktrees (140 / 19); claude code agents (4,400 / 45) | `how-i-run-claude-code-agents-in-parallel` KEEP+REWRITE | Fleet Setup |
| 9 | Rolling out Claude Code to a team: what to commit, what to enforce, what to measure | 7.2 | searchable | claude code training (720 / 30); claude code for teams (170 / 28) | NEW (could absorb `auditing-my-claude-code-setup…`) | Workshop, Fleet Setup |
| 10 | Your AI dashboard is counting tokens: the 4 numbers a CTO should track instead | 7.0 | shareable | n/m | NEW (or fold into #5) | AI Audit |
| 11 | Vibe-coded MVP: keep, fix or rebuild? What a senior reviewer blocks first | 6.9 | searchable (founder) | hire full stack developer (720 / 2); freelance full stack developer (90 / 3) | NEW | Teardown → Reviewed PR → Sprint |
| 12 | How to audit a Claude Code setup: 5 checks and what they found in mine | 6.7 | searchable | n/m | `auditing-my-claude-code-setup-with-an-agent` KEEP+REWRITE (or merge into #9) | AI Audit |
| 13 | 463 Claude Code sessions, counted (vs Stack Overflow 2026's heavy users) | 6.5 | shareable | n/m | `66-days-of-claude-code-by-the-numbers` (live) KEEP, light refresh | Workshop |
| 14 | Multi-agent code review needs a paper trail | 5.9 | shareable | n/m | `reviewer-agents-that-dont-trust-other-agents` KEEP+REWRITE or merge into #3 | Fleet Setup |

Calendar mix (content-strategy's 60/30/10): ranks 1, 4, 5, 6, 7, 8, 9, 11 and 12 are searchable (9). Ranks 2, 3, 10 and 13 are shareable (4). Rank 14 is the experiment, and it's also the first to cut if the slate needs 12.

### 2.4 Per topic: question, demand, SERP, gap, own data

**1. How to review AI-generated code**
- *Question:* "What do I actually check in an agent's PR?" (CTOs; seniors told to "review the AI").
- *Demand:* Sonar 38% say AI code takes more effort to review (E15). Stack Overflow 66% "almost right" (E6). The "AI code review bubble" thread, 351/249.
- *Top 5 SERP ("how to review AI generated code"):* Graphite guide (sells its own tool), Real Python, a Laracasts thread, ShiftAsia (unsourced stats), formation.dev. Also aicodereview.cc and verdent.ai. All give the same generic checklist: start from intent, check for invented packages, run the tests yourself, keep PRs small, own what you merge.
- *Gap:* none of them counts what review actually changed on a real batch of agent PRs, and none publishes its misses.
- *Own data:* the 30-PR run (31 opened, 30 merged, under three days, no tests, no CI). Review caught 3 shell-injection paths from request input before merge. A 12 Oct 2026 re-audit found 5 security misses, including stored XSS. The 64-fix taxonomy is in the current post. **Strongest receipt on the site.**

**2. Where the AI speed-up goes (review bottleneck)**
- *Question:* "We bought agents, so why isn't delivery faster?"
- *Demand:* Solow paradox thread 792/752. METR threads 775/485. LinearB 4.6x pickup wait (E7). Faros 5x review time with deployments down 11.7% (E8). DORA "amplifier" (E3).
- *Top 5 SERP ("AI code review bottleneck"):* Codacy, a Claude Code substack, Webstacks, The New Stack, MetaCTO, alexcloudstar. Vendor diagnosis is "automate the first pass", sold as their tool.
- *Gap:* no source shows what one human reviewer's queue looks like at agent volume, or prices the review step.
- *Own data:* THROUGHPUT, 632 merged PRs in 32 active days (11 Sep–13 Oct 2026) with one reviewer. The current post's DX 8% contrast and its 44-minute open-to-merge median. **Caveat:** per-PR review time on client work isn't measured, and own-repo open-to-merge measures a self-merge loop (dropped in claims.md D). The post has to say this, not imply a client SLA.
- *Also correct the myth:* METR 2026 did **not** find devs 18% faster (E2).

**3. AI reviewers vs a human, blind**
- *Question:* "Can CodeRabbit, Copilot review or a Claude panel replace my senior reviewer?"
- *Demand:* AI review bubble 351/249. c-CRAB 32–42% (E17). CodeRabbit's own 1.7x report (E12). "claude code review skill" 590 / KD 0, the easiest term in the file.
- *Top 5 SERP ("AI code review tools vs human"):* the c-CRAB arXiv paper, FeatBit (×2), the LinearB tools guide, the Tenki vendor benchmark (68.9%, judged by an LLM panel), kunalganglani. Benchmarks use curated bug sets, and vendors grade themselves.
- *Gap:* a blind test of AI reviewers on **commits a human already reviewed**, scored against the human's known misses.
- *Own data:* the blind test on 8 own-repo agent commits. The panel flagged all 5 bugs Adi missed, /code-review flagged 4, and both waved one through. 8 of 8 panels had at least one BLOCK and 22 of 24 runs requested changes (noise rate). Already in a scheduled post, so the rewrite should lead with the noise and the one shared miss.

**4. Security bugs agents write**
- *Question:* "Is agent code safe to merge?"
- *Demand:* Veracode 56% pass, flat for a year (E10). Apiiro +322% privilege escalation (E11). "AI generated code security" is a crowded vendor SERP.
- *Top 5 SERP:* the "Broken by default" arXiv preprint (formal verification), Infoshare talk, AppSecEngineer, DZone, Jit. Patterns are named but never traced to a merged PR.
- *Gap:* real diffs: input → sink → fix, plus the ones that got through.
- *Own data:* the 30-PR run's 3 catches and 5 misses. The site's review log (#112, #111, #119, #109 missed).

**5. Cost per merged PR (ROI)**
- *Question:* "What does an agent cost per shipped change, and is it worth it?"
- *Demand:* rate-limit threads 609/705 and 331/224. "$5k per user" 480/351. Stack Overflow 2026: 38% of orgs set usage limits, 28% review spending (E4). Jellyfish 2x throughput at 10x tokens (E18).
- *Top 5 SERP ("cost per merged PR"):* getunblocked.com (2026-06-12, a framework with an *illustrative* example, written by a vendor), Tessl, Insight APAC, a dev.to gate post, a GitAI product page ($14.20, unverified). For "how to measure AI coding ROI": The New Stack, Metizsoft, verdent, Pensero, Jellyfish, all frameworks with no ledger behind them.
- *Gap:* a public, method-honest series of a real person's cost per merged PR, including the method break and the number that went **up**.
- *Own data:* the engineering ledger, with the method and its traps (transcripts deleted after 30 days, the counting change on 11 Sep). The published cost case study gives $49 (Sep) and $69 (1–11 Oct) per merged PR at Opus 5 list rates, replacement cost and not an invoice. Don't compare across 11 Sep.

**6. CLAUDE.md that agents follow**
- *Question:* "Why does Claude ignore my CLAUDE.md, and how long should it be?"
- *Demand:* "Writing a good Claude.md" 748/290. Vercel AGENTS.md 524/196. AGENTS.md eval paper 232/161. 720 / KD 13.
- *Top 5 SERP ("CLAUDE.md examples"):* morphllm (~200-line advice), InventiveHQ, heyuan110, claudelog, jiangren, plus ayautomate roundups. Lots of templates and nothing measured.
- *Gap:* a before/after on one real rules file, tied to the arXiv finding that context files cost 20%+ more and don't raise success (E16). Plus which rules moved into hooks.
- *Own data:* RULES_WORDS 10,667 → 3,382 (−68%), 22 skills and 22 hooks (counted 2026-10-14), and the git history of the rules file. Post is live 10-17. Rewrite in place.

**7. Hooks that fail closed**
- *Question:* "Can hooks actually stop an agent doing something dangerous?"
- *Demand:* hooks launch 384/171. "Claude 4.7 is ignoring stop hooks" 109/90. Permission guard 127/94.
- *Top 5 SERP ("claude code hooks block dangerous commands"):* hexdocs (Elixir SDK), pasqualepillitteri, a hooks-mastery GitHub repo, morphllm, kjetilfuras. All are grep deny-lists, which are bypassable, and none tests failure modes.
- *Gap:* what happens when the hook itself crashes, times out or returns bad JSON.
- *Own data:* the 20-headless-session test in the current post (`onFailure: "block"` stopped crashes, timeouts and bad exit codes, missed truncated JSON). The gate list N8. Re-verify the test receipt before the rewrite.

**8. Parallel agents in worktrees**
- *Question:* "How do I run several agents without them colliding?"
- *Demand:* 4 HN stories at 156–279 points. Stack Overflow 2026: 69% still use one agent (E5).
- *Top 5 SERP:* mindstudio, morphllm, dev.to stacknotice, aident, aibuilderclub, all tutorials. One warns that ports, databases and services aren't isolated.
- *Gap:* the operating cost: what breaks at 5–18 concurrent sessions, and the review load that follows.
- *Own data:* WORKFLOW_NUMBERS (463 sessions, 66 days), THROUGHPUT, the own status board (438 commits, private repo: cite facts, don't link).

**9. Team rollout (NEW)**
- *Question:* "What do I standardise when 10–50 engineers start using Claude Code?"
- *Demand:* Sonar: 35% use personal accounts (E15). Stack Overflow: 60% block unapproved changes (E5). "claude code training" 720 / 30.
- *Top 5 SERP ("claude code for teams rollout guide"):* buildbetter, lorikeet, a training vendor, firstaimovers 90-day playbooks (×3, from a consultancy). Generic phases.
- *Gap:* a concrete commit list (settings.json, hooks, CLAUDE.md layering), with the enforce-vs-advise split taken from a harness that actually runs.
- *Own data:* the harness (22 skills, 22 hooks, fail-closed gates, per-context account isolation). **Honest limit:** Adi runs this across his own accounts. It isn't a measured team rollout, so frame it as "the harness I'd install", not "what a team saw".

**10. Token dashboards (NEW)**
- *Question:* "Management tracks our AI usage. What should we measure instead?"
- *Demand:* TechCrunch "tokenmaxxing" (E18), LeadDev and InfoWorld pieces. Stack Overflow 2026 cost-control numbers (E4). The Reddit signal can't be verified.
- *Gap:* a CTO-facing short list (merged PRs that survive, cost per merged PR, review wait, escaped defects) shown on a real ledger.
- *Own data:* the ledger columns and its traps. It overlaps #5, so merge them unless the slate needs a separate shareable piece.

**11. Vibe-coded MVP: keep, fix or rebuild (NEW, founder side)**
- *Question:* "My AI-built app works but I'm scared of it. Do I hire a senior or rewrite it?"
- *Demand:* "back to writing by hand" 865/634. Vibe-coding threads at 330–787. "hire full stack developer" 720 / **KD 2**, the cheapest commercial term in the file.
- *Top 5 SERP:* Business Insider, Ulam (×2, a services vendor), rohitraj (rule-of-thumb thresholds), SolGuruz. All opinion.
- *Gap:* "here's what I'd block first", shown on a real no-tests, no-CI agent run.
- *Own data:* the 30-PR run (no tests, no CI) is the closest honest analogue, plus the teardown sample. No founder client data can be published.

**12. Auditing a Claude Code setup**
- *Demand:* "Universal Claude.md – cut tokens" 471/162; the AGENTS.md telemetry bug 486/284.
- *Own data:* the self-audit in the current post. Thin search signal, so consider merging into #9.

**13. 463 sessions, counted**
- *Demand:* Stack Overflow 2026 says 31% of daily users run AI 4+ h/day. That's a good frame for "what a heavy user's logs look like".
- *Own data:* WORKFLOW_NUMBERS. Live post: keep the slug and refresh it with the E4 comparison.

**14. Multi-agent review paper trail**
- *Demand:* weak. Stack Overflow says 68% prefer single-agent setups (E5).
- *Own data:* 85 PRs in 3 own repos, 39 verdicts that can't be checked. The data is strong but the audience is narrow, so merge it into #3 as a section.

### 2.5 What nobody in the SERPs has (use as each post's information-gain line)
1. Misses published next to catches (30-PR run: 3 caught, 5 missed).
2. A blind AI-vs-human review on commits whose human misses are known.
3. Cost per **merged** PR over time, from a ledger that shows its own method break and a rising number.
4. One rules file measured before and after (−68% words), tied to the AGENTS.md eval.
5. Hook *failure-mode* tests rather than deny-list snippets.
6. One reviewer's real throughput (632 merged PRs, 32 active days).


## 3. First-hand data not yet used in any post


Ranked by how new it is to a CTO or engineering lead. "OWN" means my own repos or harness. "Aggregate" means totals that include client work, with no split by client, and needs Adi's OK before publishing.

### 3.1 My secret scanner failed open on the most common commit shape for 75 days
- **What it shows:** the commit-time secret scan could not resolve the repo when the command started with `cd ~/...`, because it never expanded the `~`. It then took its fail-open path. That ran from the day the hook shipped (9 Jul 2026) to the fix (22 Sep 2026): 75 days, 269 logged fail-open commits, and at least 35 days with one. Successful scans were not logged before the fix, so there is no pre-fix rate, only a count. After the fix (22 Sep to 14 Oct), 781 commit attempts reached the hook: 75% were scanned, 18% used the audited skip token, and 7% still could not resolve the repo and passed unscanned. So **1 in 4 commit attempts still reached git without a scan**.
- **Window:** 9 Jul to 14 Oct 2026. Hook logs from all four Claude Code config dirs. Test-suite bursts (3 or more log lines in the same second) are removed.
- **Confidence:** the 75 days and the mechanism are **verified** (the fix commit message plus the hook's history). The counts are a **verified count with an estimated denominator**: a commit attempt can log more than once, and push scans may share the "scanned" label.
- **Status:** OWN harness. The events include commits in client repos, but as counts only, so they're aggregate: OK to publish as totals with no repo names. **Never print the skip token's literal string** (portfolio #90 already removed it once).
- **Could anchor:** a rewrite of `claude-code-fail-closed-hooks` (11-14 slot). That post covers the exceptions in theory. This adds what they cost in practice. Or a standalone post: "My secret scanner failed open for 75 days. Here's how I found out."

### 3.2 Escape hatches become rubber stamps
- **What it shows:** the GitHub write gate asks agents to add a confirm token to any mutating `gh api` call or off-base PR. Agents added it **1,010 times on 40 days** (9 Jul to 14 Oct): 780 for `gh api` writes, 122 "not descended from master", 47 "unrelated history", and 38 for PR-base mismatches. Since 11 Sep: 459. Since 22 Sep, the secret scanner's skip token was on 18% of commit attempts (see #1). The commit-format hatch was used or rejected 183 times since 11 Sep.
- **Window:** 9 Jul to 14 Oct 2026, all accounts, test bursts removed.
- **Confidence:** the counts are **verified**. **Unverifiable:** whether each use was justified. The log stores no cwd or reason, so a "wrong" share can't be computed.
- **Status:** OWN harness. The events include client repos, so it's aggregate counts only.
- **Could anchor:** "Deny-with-escape gates: what agents do with the escape token". It pairs with #1. No existing post has usage numbers for escape tokens.

### 3.3 Reminders die, gates survive: six months of hooks
- **What it shows:** I wrote 37 hook scripts between 17 Apr and 22 Sep 2026 and deleted 14 of them. **11 of the 14 never blocked anything**: banners, reminders, mode trackers, and a memory layer that missed its own kill line. The other 3 were an auto-approver, a model-routing rewriter, and one deny gate that went with its database tool (2 calls all-time). 22 hooks are left. 15 of them can deny or ask, and 7 are formatters, trackers or session setup. **No deny gate was ever deleted while its tool was still in use.** Some gates also came long after their rule. Example: "voice before any outbound message" became a rule and a hook on the same day (22 Sep), after the commit noted the rule had "zero enforcement". "Never commit secrets" was a rule from 17 Apr, and its hook came on 9 Jul.
- **Window:** `~/.claude` git history, 17 Apr to 14 Oct 2026 (274 commits).
- **Confidence:** the add/delete list is **verified** (git). The block/no-block classification is an **estimate**, from each hook's deny/ask code paths and header comments.
- **Status:** OWN.
- **Could anchor:** "Reminders die, gates survive: 37 Claude Code hooks, 14 deleted". It can also be a section in `the-rules-file-my-agents-follow`, which covers deleted *rule files* but not hooks.

### 3.4 More subagent turns did not merge more PRs
- **What it shows:** subagent turns per merged PR went 60, 81, 130 and 168 in the weeks of 14 Sep, 21 Sep, 28 Sep and 5 Oct. Merged PRs per active day went 11, 26, 22 and 18 over the same weeks. Per day, subagent turns had **no correlation with merged PRs (r = 0.00, 33 days)**. Per repo-week (58 repo-weeks over $5), subagent turns correlate at 0.36, while $ and commits correlate at 0.78 and 0.79.
- **Window:** 11 Sep to 13 Oct 2026, same-method ledger.
- **Confidence:** **estimate.** PRs merge after the day the work happened, which weakens the daily r. Correlation is not cause. Subagent work includes research and review, which shouldn't make PRs anyway.
- **Status:** aggregate (client and own together). Needs Adi's OK.
- **Could anchor:** a post for leads who budget fan-out: "I tripled subagent turns per PR. Merged PRs went down." It extends `how-i-run-claude-code-agents-in-parallel` with outcome data that post doesn't have.

### 3.5 Cost per PR varies 19x between repo-weeks
- **What it shows:** the $52 average per merged PR hides a wide spread. Across the 33 repo-weeks with at least one merged PR, the median is **$30** per PR, p10 is **$6** and p90 is **$113**.
- **Window:** 11 Sep to 13 Oct 2026, same-method ledger.
- **Confidence:** **verified** arithmetic, small n (33). PRs that merge in a later week inflate some cells.
- **Status:** aggregate. Needs Adi's OK.
- **Could anchor:** a section in `how-i-measure-claude-code-roi` ("benchmark on the spread, not the mean"), or a short post: "Why your AI cost-per-PR average is useless".

### 3.7 About a fifth of agent spend happens outside any repo
- **What it shows:** in the window, 14.2% of spend ran in a company's sessions that resolved to no repo, and another 5.6% in cross-company orchestration sessions: **19.8% in total** (and 20.8% of active minutes). Of my own work, 28.7% of spend was outside a repo. The orchestration part was only recorded from 5 Oct, so 19.8% is a floor.
- **Window:** 11 Sep to 13 Oct 2026.
- **Confidence:** **estimate.** It depends on cwd-to-repo mapping. The ROI post already has the one-day version ($191 of $702 on 5 Oct). This is the window total.
- **Status:** aggregate. Needs Adi's OK.
- **Could anchor:** a section in the ROI post: "budget for agent work that never touches a repo: planning, research, triage".

### 3.8 With a 1M context, compaction is rare
- **What it shows:** 59 of 1,998 main sessions (3.0%) hit a compaction in 11 Sep to 13 Oct. 47 of those compacted once. Across all retained transcripts, 92 compaction events: 89 automatic and 3 manual. The median context before compaction was **524k tokens** (p10 220k, p90 969k). After, it was about **20.5k** (n = 36 with that field), and each one took a median of **58 s**.
- **Window:** sessions from 11 Sep to 13 Oct. Events from all retained transcripts (6 Aug onward).
- **Confidence:** **verified** counts (`compact_boundary` events and their metadata). The post-compaction size is only recorded on 36 events.
- **Status:** aggregate counts across all accounts.
- **Could anchor:** "How often do long agent sessions actually compact?" It's a short, data-first post with a reproducible `rg` command. No existing post touches it.

### 3.9 Subagents still run on the top tier, two months after the audit
- **What it shows:** in 11 Sep to 13 Oct, **84%** of subagent assistant messages ran on Opus (own 84.4%, client aggregate 84.2%), 15% on Sonnet and 0.1–0.3% on Haiku. Main sessions were 93–99% Opus. The July audit (in `auditing-my-claude-code-setup-with-an-agent`) found 81% of subagent *spawns* on the top tier. The routing hook built to fix that was deleted on 11 Sep.
- **Window:** 11 Sep to 13 Oct 2026, transcripts, deduped by message id.
- **Confidence:** **verified.** The unit differs from July (messages, not spawns), so say "still about four in five", not "rose from 81 to 84".
- **Status:** OWN plus aggregate.
- **Could anchor:** a dated follow-up paragraph in the setup-audit post (11-07 slot), or part of a cost post: "telling agents to use a cheaper model didn't work. Here's what did and didn't."

### 3.10 A free AI reviewer on 48 PRs left no actionable comment
- **What it shows:** on my waitlist tool, 48 PRs merged between 9 May and 2 Jul 2026 (42 mine, 6 dependabot). The free-tier AI reviewer posted a summary only on 25, skipped 16, and hit a rate or usage limit on 7. **0 PRs had "actionable comments posted".**
- **Window:** 9 May to 2 Jul 2026.
- **Confidence:** counts **verified**. Bucketing is by keyword (**estimate**). It reflects the free plan and bot-authored PRs, not the paid product, so don't generalise to a vendor.
- **Status:** OWN (the repo is public).
- **Could anchor:** a paragraph in `ai-reviewers-on-the-bugs-i-missed`. Don't build a vendor-comparison post on it: n is small and it's one plan tier.

(3.6, an own-vs-client cost comparison, stays in the private notes.)

### Considered and dropped
- **Claim tests' catch record:** the 30-PR claim test failed for real in exactly one session, the day it was written (two "tests passed" phrases). The other claim-test failures I found were test bugs. That's honest but thin, so mention it only inside an honesty-gate post as "guards catch most at birth".
- **Tool-call error rate** (3.3% of 179k calls; Bash 3–4%): this mixes test failures, hook denials and real errors, so it isn't a finding.
- **Follow-up "fix" PR share** (19 of 83 own PRs since 11 Sep) and **reverts** (0; now-board's "revert" commits are a feature name): proxies that don't prove defect escape.
- **Off-hours 25% and weekend 18% of active minutes:** hustle optics that prove nothing.
- **Cache-read share, ledger measurement bugs, the 81% July spawn figure, deleted rule files, config word counts:** already in `66-days`, `how-i-measure-claude-code-roi`, `auditing-my-claude-code-setup-with-an-agent` and `the-rules-file-my-agents-follow`.

