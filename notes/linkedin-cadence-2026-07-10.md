# LinkedIn Cadence — 2026-07-10

Initiative 1 (D1-3). The 5 real blog posts are gold rotting in a zero-traffic blog. Born-LinkedIn-first: post the hook + the real finding natively, link the full version on-site (the closer). 2–3×/week. Strongest hooks first — you're building an audience from cold, so open with the scroll-stoppers.

Post URL base: `https://www.adrian-rusan.com/blog/<slug>?utm_source=linkedin&utm_medium=post`

## Post skeleton (reuse every time)
1. **Hook** (line 1, no preamble) — a concrete, slightly uncomfortable claim.
2. **The real thing** — one specific finding/number/story, not a summary.
3. **Why it matters to an eng leader** — the buyer's outcome (a security incident with their name on it, a hire they can't make).
4. **Soft CTA** — "Full breakdown → {link}" or "Send me a repo, I'll show you yours." No hard sell.
Native text + 1 image/carousel beats a bare link (LinkedIn suppresses outbound links — put the link in the first comment if reach drops).

## 6-week schedule (2–3 posts/week)

| Wk | Post | Source | slug | Hook line |
|----|------|--------|------|-----------|
| 1 | A | Shell-injection war story | `catching-shell-injection-agents-wrote` | "My AI agents wrote 3 shell-injection bugs. Every test passed. Here's the diff." |
| 1 | B | 2-3x not 100x | `2-3x-not-100x` | "AI didn't make me 100x faster. The honest number is 2–3x — and I measured it." |
| 2 | C | What agents get wrong | `what-agents-get-wrong` | "6 ways AI coding agents fail that green CI will never catch. A field taxonomy." |
| 2 | D | 30 PRs in 2.5 days | `30-prs-in-2-5-days` | "30 reviewed PRs in 2.5 days. The bottleneck wasn't writing code — it was trusting it." |
| 3 | E | Claude Code changed how I ship | `claude-code-changed-how-i-ship-software` | "10 years of experience matters MORE in the agent era, not less. Here's why." |
| 3 | F | Net-new: one teardown finding | — | "I reviewed a stranger's AI-generated PR this week. What I found in 15 minutes:" (anonymized, from a real teardown) |
| 4 | A′ | Re-angle Shell-injection | same | Lead with the *fix*: "How to catch the injection bug your test suite is blind to." |
| 4 | G | Net-new: fail-open gates | from `what-agents-get-wrong` | "The scariest AI bug isn't wrong code — it's a security check that fails OPEN." |
| 5 | H | Net-new: the review-is-the-product take | — | "Everyone's selling AI code generation. The money is in reviewing it. Here's the math." |
| 5 | D′ | Re-angle 30 PRs | same | "Parallel git worktrees + one operator = a small team's throughput. The setup:" |
| 6 | I | Net-new: a real client teardown case | — | Once a paid €1k PR / audit lands — the first real third-party proof. Highest-value post. |
| 6 | J | Recap / offer-forward | — | "3 months of catching what agents ship. If you're merging AI code fast, send me a repo." → teardown CTA |

## Notes
- Weeks 1–3 are all-existing-content — zero new writing, just adaptation. No excuse to not start this week.
- Net-new posts (F, G, H, I, J) are born on LinkedIn; promote the good ones to `content/blog/` afterward (reverse of the usual flow).
- Post F/I require a delivered teardown / paid engagement — schedule them *after* the outreach in `outreach-list-2026-07-10.md` produces one.
- Engagement > frequency: reply to every comment in the first hour. A post that starts a conversation with one eng leader beats 500 passive impressions.
