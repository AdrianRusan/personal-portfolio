import { BOOKING_URL } from "@/data";
import { ladder, offerById } from "@/data/ladder";
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

// A2 F7: every paid offer's second link books the free call in one click.
const SCOPING_CALL = {
  label: "or book a free 30-minute scoping call",
  href: BOOKING_URL,
};

// "AI Code Audit · from €1,500": name and lowest price from the ladder, so a price
// change in data/ladder.ts or data/workshops.ts reaches every post.
export const offerEyebrow = (id: string) => {
  const { name, prices } = offerById(ladder, id);
  const low = prices.reduce((a, b) => (b.amount < a.amount ? b : a));
  const from = low.from || prices.length > 1 ? "from " : "";
  return `${name} · ${from}€${low.amount.toLocaleString("en-US")}`;
};

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
    eyebrow: offerEyebrow("audit"),
    heading: "Get your AI-written code audited",
    body: "I review your AI-written code or LLM workflow, rank the findings by what to fix first, and send one PR that fixes the top one.",
    label: "See what the audit covers",
    href: "/services#ladder",
    secondary: SCOPING_CALL,
  },
  // The same audit, pitched for the cost study (R3-F10).
  "cost-audit": {
    cta: "cost-audit",
    eyebrow: offerEyebrow("audit"),
    heading: "Find where your agent tokens go",
    body: "I measure cost per commit and per merged PR on your setup, rank the fixes, and ship the top one as a PR.",
    label: "See what the audit covers",
    href: "/services#ladder",
    secondary: SCOPING_CALL,
  },
  workshop: {
    cta: "workshop",
    eyebrow: offerEyebrow("workshop"),
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
    eyebrow: offerEyebrow("automation"),
    heading: "Add a fact gate to your pipeline",
    body: "I add a gate to your LLM pipeline that blocks any number, rating or claim without a source. A gate that can't run blocks the publish too.",
    label: "See the AI Automation offer",
    href: "/services#ladder",
    secondary: SCOPING_CALL,
  },
  "reviewed-pr": {
    cta: "reviewed-pr",
    eyebrow: offerEyebrow("reviewed-pr"),
    heading: "Start with one Reviewed PR",
    body: "One real ticket from your backlog, shipped by an agent and reviewed line by line. If it isn't merge-ready to your standard, you don't pay.",
    label: "See what the Reviewed PR includes",
    href: "/services#entry-offer",
    secondary: SCOPING_CALL,
  },
  harness: {
    cta: "harness",
    eyebrow: offerEyebrow("harness"),
    heading: "Want this setup in your repo?",
    body: "I install the agent harness I run in your repo: project rules, the worktree and dispatch workflow, and review gates your team keeps.",
    label: "See what the setup includes",
    href: "/services#harness",
    secondary: SCOPING_CALL,
  },
};

// hasOwn so a stray value like "constructor" can't resolve to a prototype key.
export const getPostCta = ({ cta }: BlogFrontmatter): BlogCtaCopy =>
  cta && Object.hasOwn(BLOG_CTAS, cta) ? BLOG_CTAS[cta] : BLOG_CTAS.teardown;
