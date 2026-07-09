# Blog Cadence + Topic Plan

Date: 2026-07-09
Owner: Adrian Rusan (solo consultant)
Site goal this feeds: lead-gen → Calendly scoping call (`/#contact`, `CALENDLY_URL` in `data/index.ts`)

## The problem right now

Five published posts, four of them dated the same day (2026-07-08), all built around the
same launch story: 30 PRs in 2.5 days, a measured 2-3x multiplier, three shell-injection bugs
an agent wrote and a human caught. That's a strong origin story once. Repeated across four
posts in one day, it reads as a single anecdote copy-pasted into different headlines rather
than a body of work — which undercuts the "living authority" signal the blog is supposed to
send to a founder or CTO doing due diligence before a scoping call. A prospect who reads two
of these back to back will notice.

The fix isn't more launch-day volume. It's a cadence that produces new, decision-relevant
posts on a schedule a solo consultant can actually sustain, plus a cleanup pass so the archive
doesn't read as one story retold four ways.

## 1. Cadence: one post every 1-2 weeks

**Recommendation: publish every 10-14 days, no faster.**

Rationale:

- **Solo constraint is real.** This is one person also running client sprints and doing the
  senior review work the whole positioning depends on. A weekly cadence looks good on a
  content calendar and dies in week 3 when a paying sprint takes priority — and a stalled
  cadence is more damaging to the "living authority" signal than a slower, honest one,
  because visitors can see the `date` field on every post via the MDX frontmatter.
- **Quality is the actual differentiator here.** The site's whole pitch is "an agent fleet
  ships volume, a senior engineer reviews everything before it ships." A blog that ships
  volume without the same review discipline (rushed posts, thin takes, recycled stats)
  quietly contradicts the pitch it's supporting.
- **10-14 days is long enough to have something new to say.** Each post below should come
  out of an actual sprint, review finding, or client conversation from the two weeks prior —
  not be invented to fill a slot. That's also what keeps the archive evergreen instead of
  repetitive: real material varies naturally, a content calendar forces artificial variety.
- **Two posts a month is enough for SEO compounding.** Programmatic/AI-search visibility
  (the site already has `blog-geo`, `blog-schema`, `blog-seo-check` skills in `.agents/skills/`)
  rewards consistency and topical depth over raw frequency. 24-26 posts/year at this cadence
  is a real archive within 12 months without burning out the one person who has to write,
  fact-check, and ship them.
- **Batch writing, staggered publishing.** If a sprint produces three good post ideas in one
  week (as the 2026-07-08 batch did), draft all three but stagger publish dates 10-14 days
  apart instead of shipping them same-day. This is a publishing-calendar fix, not a writing
  one — no new tooling needed, just spread the `date` frontmatter field out.

## 2. Evergreen post ideas (10)

Each serves a real decision the ICP (startup founder or CTO evaluating AI-assisted delivery)
is trying to make, not a keyword. Each includes a one-line angle and how it ties back to the
scoping-call CTA (see full policy in §3).

1. **"How to Security-Review AI-Generated PRs (A Practical Checklist)"**
   Angle: the concrete, repeatable checklist a founder's own team can run today — fail-open
   security gates, prompt-injection surfaces, secrets handling, silent error swallowing —
   distilled from real review sessions, not a generic "AI safety" listicle.
   CTA tie-in: readers doing this in-house will hit the limits of doing it without a
   dedicated reviewer; naturally sets up "or have someone run this on every PR for you."

2. **"When Agent-Speed Delivery Is the Wrong Call"**
   Angle: the honest counter-positioning post — the specific project shapes (deep legacy
   migrations, undocumented tribal-knowledge domains, teams with no CI) where agent-assisted
   delivery is a bad fit, argued from the reviewer's seat, not the seller's.
   CTA tie-in: builds trust precisely by NOT selling in every paragraph; ends with "if your
   project doesn't fit that list, that's what the scoping call is for — to find out before
   either of us commits."

3. **"What a Fixed-Scope Sprint Actually Includes (Not the Sales-Page Version)"**
   Angle: walks through what happens hour-by-hour and PR-by-PR in a real sprint — scoping,
   agent dispatch, review pass, findings log, handoff — using the actual `/services` process
   steps as the skeleton, demystifying what "reviewed" means operationally.
   CTA tie-in: direct — this is pre-sales education for someone already considering the
   `/services` page; ends on booking the scoping call as the next concrete step.

4. **"The Failure Modes of Agent Code, and How to Catch Each One"**
   Angle: a living taxonomy post (companion/successor to the existing field-taxonomy piece)
   updated as new failure categories are observed in review — positioned as a running
   document, dated and versioned, not a one-off list.
   CTA tie-in: soft — "these are the categories that show up in every sprint's findings
   log"; invites a scoping call to see a findings log against the reader's own codebase.

5. **"Reading a Findings Log: What 'Every PR Reviewed' Actually Looks Like"**
   Angle: an anonymized walkthrough of a real (or realistic composite) sprint findings log —
   what gets flagged, what gets fixed before merge, what gets escalated to the client.
   CTA tie-in: strongest of the set — this is the artifact every sprint client receives;
   directly previews the deliverable, natural close is "see one of these against your repo."

6. **"CI Passing Is Not the Same as Correct: Why Green Tests Miss Agent Bugs"**
   Angle: the specific gap between automated test coverage and adversarial human review —
   using patterns like fail-open gates and happy-path-only test generation as evidence, not
   the same 3-bug anecdote from the shell-injection post.
   CTA tie-in: sets up the value of adversarial review as a category, then the sprint as the
   instance of that category the reader can buy.

7. **"How to Brief an AI Coding Agent Like You'd Brief a Junior Engineer"**
   Angle: practical prompt/spec patterns for founders and CTOs who are running agents
   themselves (Cursor, Claude Code, Copilot) without a dedicated review layer yet —
   genuinely useful even to someone who never books a call.
   CTA tie-in: positions the author as someone who has done this professionally at scale;
   closing note that this is exactly the skill a reviewed sprint outsources.

8. **"Estimating an AI-Accelerated Sprint: What Actually Compresses and What Doesn't"**
   Angle: which parts of a project genuinely compress under agent-accelerated delivery
   (CRUD, boilerplate, test scaffolding, migrations with clear specs) versus which don't
   (ambiguous requirements, novel architecture decisions, stakeholder alignment) — an honest
   estimating framework, not a speed claim.
   CTA tie-in: directly useful for someone building a business case internally to bring to
   a scoping call; positions the call as where this estimate gets made for their backlog.

9. **"The Retainer vs. Sprint Decision: When You Need Ongoing Reviewed Delivery"**
   Angle: for prospects past their first sprint — how to decide between a one-off Pilot
   Sprint and an ongoing retainer, using the actual tradeoffs (predictability vs. flexibility,
   sunk coordination cost) rather than a generic "retainers are better" pitch.
   CTA tie-in: bottom-of-funnel, aimed at repeat/expansion — natural CTA is booking a call to
   discuss retainer scope once a first sprint has landed.

10. **"What I Look for in a Codebase Before I'll Run Agents Against It"**
    Angle: the pre-flight checklist (test coverage baseline, CI presence, secrets hygiene,
    documented domain quirks) used before accepting a sprint — gives the reader a real
    self-assessment tool and signals the process has a quality gate on the intake side too.
    CTA tie-in: "if your repo passes most of this, it's a strong fit for a sprint — the
    scoping call is where we confirm the rest."

Two optional additions if cadence allows (11-12), lower priority — hold in the backlog rather
than force them into the first two-month run:

11. **"Reviewing Your Own Team's AI-Generated Code: A Starter Rubric"** — for CTOs not
    ready to outsource review, a lightweight internal rubric; CTA is "or skip building this
    and have it run for you."
12. **"Post-Mortem: A Sprint That Didn't Go as Planned"** — an honest account of a sprint
    that ran into scope friction and how it was handled, in service of the risk-reversal
    positioning already on `/services` (48-hour guarantee, fixed scope). Only publish this
    once a real instance exists — do not fabricate a case study.

## 3. CTA policy across the archive

- Every post keeps exactly one CTA, near the end, matching the existing pattern (`[Book a
  scoping call →](/#contact)` or equivalent phrasing already used in the current posts) —
  don't add banner CTAs mid-article or multiple asks per post.
- Vary the CTA's framing to match the post's place in the funnel (see tie-ins above):
  top-of-funnel posts (1, 6, 7) earn trust and end with a soft, single-line CTA; mid-funnel
  posts (2, 4, 8) frame the call as "let's find out if this fits your case"; bottom-of-funnel
  posts (3, 5, 9, 10) can be more direct since the reader is already evaluating the offer.
- Never let the CTA be the first hard sell in the piece — every idea above is written to be
  genuinely useful on its own, matching the existing posts' style of earning the CTA through
  content rather than opening with it.

## 4. De-duplicate the recycled stat set

The "30 PRs in 2.5 days" / "2-3x, not 100x" / "three shell-injection bugs caught" trio
currently appears, in some combination, across `2-3x-not-100x.mdx`, `30-prs-in-2-5-days.mdx`,
`catching-shell-injection-agents-wrote.mdx`, and is referenced again in
`what-agents-get-wrong.mdx`. All four are dated 2026-07-08. Read together, the archive reads
as one retold anecdote rather than four independent pieces of evidence.

Recommended cleanup (flagging for the post owner — these are edits to existing published
files and are out of scope for this note/package):

- **Keep the stat set anchored to its two "home" posts** — `30-prs-in-2-5-days.mdx` (the
  mechanics) and `2-3x-not-100x.mdx` (the honest multiplier) are the natural canonical
  sources. Link to them by name instead of restating the numbers elsewhere.
- **Trim the restatement in `what-agents-get-wrong.mdx` and
  `catching-shell-injection-agents-wrote.mdx`** to a single linked reference (e.g. "see
  [30 PRs in 2.5 days](/blog/30-prs-in-2-5-days) for the full breakdown") rather than
  re-quoting the numbers inline.
- **Stagger the four launch-day posts' visible dates going forward is not possible for
  already-published posts without misleading readers** — instead, treat 2026-07-08 as the
  one-time launch batch it was, and make every post from here on (the 10 ideas above) land on
  its own date under the 10-14 day cadence in §1. The fix for "reads as a launch dump" is
  future cadence discipline, not backdating history.
- Per the HONEST-CLAIM RULE already in force on this project: none of the specific figures
  (30 PRs, 2-3x, three bugs) should be restated as a general/permanent claim about every
  sprint — they are the measured result of one dated batch, and should stay scoped to the
  posts that did the measuring.

## Summary

- Cadence: one post every 10-14 days, sourced from real sprint/review work, not a content
  calendar filled in advance.
- 10 evergreen ideas above (plus 2 backlog ideas) cover the ICP's actual pre-purchase
  questions: how to review AI code, when not to use this model of delivery, what the sprint
  concretely includes, and what a findings log looks like.
- Every post keeps one CTA, framed to its funnel position, matching the existing style.
- Existing four-post launch-day stat set should be trimmed to two canonical homes and linked
  from elsewhere, so new readers see a body of work rather than one number retold four times.
