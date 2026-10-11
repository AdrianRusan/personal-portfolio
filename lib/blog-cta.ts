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
    eyebrow: "AI Audit · from €900",
    heading: "Get your AI-written code audited",
    body: "I review your AI-written code or LLM workflow and send a ranked report of what to fix first, in 2–3 days.",
    label: "See what the audit covers",
    href: "/services#ladder",
  },
  // The same audit, pitched for the cost study (R3-F10).
  "cost-audit": {
    cta: "cost-audit",
    eyebrow: "AI Audit · from €900",
    heading: "Find where your agent tokens go",
    body: "I measure cost per commit and per merged PR on your setup and send a ranked list of fixes, in 2–3 days.",
    label: "See what the audit covers",
    href: "/services#ladder",
  },
  workshop: {
    cta: "workshop",
    eyebrow: "Team workshop · from €2,000",
    heading: "Teach your team this workflow",
    body: "A hands-on workshop for up to 10 people on Claude Code, agent orchestration, review gates and harness engineering.",
    label: "See the full-day agenda",
    href: "/workshops/full-day",
    secondary: {
      label: "or the half-day version",
      href: "/workshops/half-day",
    },
  },
  automation: {
    cta: "automation",
    eyebrow: "AI Automation · from €3,000",
    heading: "Add a fact gate to your pipeline",
    body: "I add a gate to your LLM pipeline that blocks any number, rating or claim without a source. A gate that can't run blocks the publish too.",
    label: "See the AI Automation offer",
    href: "/services#ladder",
  },
  "reviewed-pr": {
    cta: "reviewed-pr",
    eyebrow: "Reviewed PR · €1,000",
    heading: "Start with one Reviewed PR",
    body: "One real ticket from your backlog, shipped by an agent and reviewed line by line. If it isn't merge-ready to your standard, you don't pay.",
    label: "See what the Reviewed PR includes",
    href: "/services#entry-offer",
  },
  harness: {
    cta: "harness",
    eyebrow: "Agent Fleet Setup · from €4,000",
    heading: "Want this setup in your repo?",
    body: "I install the agent harness I run in your repo: project rules, the worktree and dispatch workflow, and review gates your team keeps.",
    label: "See what the setup includes",
    href: "/services#harness",
  },
};

const TEARDOWN_TAGS = ["security", "code-review"];

// hasOwn so a stray value like "constructor" can't resolve to a prototype key.
// Security/review posts also offer the free teardown when they sell something
// else (A1-10), unless the CTA already has a second link.
export const getPostCta = ({ cta, tags }: BlogFrontmatter): BlogCtaCopy => {
  const copy =
    cta && Object.hasOwn(BLOG_CTAS, cta) ? BLOG_CTAS[cta] : BLOG_CTAS.teardown;
  const reviewPost = (tags ?? []).some((t) => TEARDOWN_TAGS.includes(t));
  return reviewPost && copy.cta !== "teardown" && !copy.secondary
    ? {
        ...copy,
        secondary: {
          label: "or get a free code teardown first",
          href: "/teardown",
        },
      }
    : copy;
};
