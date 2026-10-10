import type { BlogCta, BlogFrontmatter } from "./blog-types";

export interface BlogCtaCopy {
  cta: BlogCta;
  eyebrow: string;
  heading: string;
  body: string;
  label: string;
  href: string;
  secondary?: { label: string; href: string };
}

// End-of-post offer, picked per post via frontmatter `cta`. Prices come from
// the 2026-10-10 offer ladder; each paid offer links to the page that sells it.
export const BLOG_CTAS: Record<BlogCta, BlogCtaCopy> = {
  teardown: {
    cta: "teardown",
    eyebrow: "Free",
    heading: "Want this check run on your code?",
    body: "Send a repo or a recent PR. I'll send back a 15-minute Loom of the security bugs your AI coding tools wrote that pass tests and merge anyway.",
    label: "Get my free teardown",
    href: "/teardown",
  },
  audit: {
    cta: "audit",
    eyebrow: "AI Audit · from €900 · 2–3 days",
    heading: "Get your AI-written code audited",
    body: "I review your AI-written code or LLM workflow and send a ranked report of what to fix first.",
    label: "See the audit on the ladder",
    href: "/services#ladder",
  },
  workshop: {
    cta: "workshop",
    eyebrow: "Team workshop · €2,000 half-day · €3,500 full day",
    heading: "Teach your team this workflow",
    body: "A hands-on workshop for up to 10 people on Claude Code, agent orchestration, review gates and harness engineering.",
    label: "See the full-day agenda",
    href: "/workshops/full-day",
    secondary: { label: "or the half-day version", href: "/workshops/half-day" },
  },
  harness: {
    cta: "harness",
    eyebrow: "Agent Harness Setup · from €4,000 · 1 week",
    heading: "Want this setup in your repo?",
    body: "I install the agent harness I run in your repo: project rules, the worktree and dispatch workflow, and review gates your team keeps.",
    label: "See what the setup includes",
    href: "/services#harness",
  },
};

// hasOwn so a stray value like "constructor" can't resolve to a prototype key.
export const getPostCta = ({ cta }: BlogFrontmatter): BlogCtaCopy =>
  cta && Object.hasOwn(BLOG_CTAS, cta) ? BLOG_CTAS[cta] : BLOG_CTAS.teardown;
