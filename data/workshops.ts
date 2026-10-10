import { CONTACT_EMAIL } from "@/data";

// Team workshop pages (brief R8). Prices are the guide's ladder table
// (2026-10-10): EUR, ex-VAT. Every number here traces to the guide.

export type WorkshopSlug = "full-day" | "half-day";

export interface AgendaBlock {
  title: string;
  body: string;
}

export interface AgendaPart {
  label: string;
  duration?: string;
  blocks: AgendaBlock[];
}

export interface Workshop {
  slug: WorkshopSlug;
  name: string;
  length: string;
  price: number;
  maxPeople: number;
  title: string;
  description: string;
  headline: string;
  intro: string;
  agenda: AgendaPart[];
  outcomes: string[];
  cta: { label: string; href: string };
}

const SITE_URL = "https://www.adrian-rusan.com";

const ask = (length: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Team workshop (${length})`)}`;

const morning: AgendaPart = {
  label: "Morning",
  blocks: [
    {
      title: "One worktree per agent",
      body: "Each agent gets its own git worktree and branch, so parallel sessions never edit the same checkout. Your team sets this up on a repo they work in every day.",
    },
    {
      title: "The rules file your agents follow",
      body: "Writing a CLAUDE.md that holds your commands, conventions and no-go areas, so every session starts from the same instructions instead of a fresh guess.",
    },
    {
      title: "Orchestrating a multi-session run",
      body: "Splitting a feature into work packages, briefing each agent so it can finish without coming back to ask, and keeping usage limits in check when many sessions are open.",
    },
  ],
};

const reviewGates: AgendaBlock = {
  title: "Review gates",
  body: "Reviewer agents that check correctness, security and completeness and don't trust the agent that wrote the code. Then the senior human pass at the end, using the same PR review checklist I use.",
};

const honestyRule: AgendaBlock = {
  title: "The honesty rule",
  body: "A gate that stops an agent from inventing numbers, facts or urgency in anything a customer will read. Agents fill gaps with plausible fiction, and this is where it gets caught.",
};

const fullDay: Workshop = {
  slug: "full-day",
  name: "Team workshop: full day",
  length: "full day",
  price: 3500,
  maxPeople: 10,
  title: "Full-day Claude Code workshop for engineering teams",
  description:
    "A full-day, hands-on Claude Code workshop for up to 10 engineers: parallel agents in git worktrees in the morning, review gates and the honesty rule in the afternoon. €3,500 ex-VAT.",
  headline:
    "Teach your team to run Claude Code agents in parallel, then review what they ship",
  intro:
    "The morning gets your engineers running several agents side by side on your own repo. The afternoon is the part most teams skip: the gates that catch what those agents get wrong before it reaches a customer. The honest target is 2–3x, not 100x.",
  agenda: [
    morning,
    {
      label: "Afternoon",
      blocks: [
        reviewGates,
        honestyRule,
        {
          title: "Live example: an agent-built SaaS",
          body: "A walk through a real multi-session agent org that built a SaaS platform: how the work was split, how the agents were briefed, and where the review gates caught what the implementing agents got wrong.",
        },
      ],
    },
  ],
  outcomes: [
    "Worktree-per-agent setup running on your own repo",
    "A first rules file for your codebase",
    "Review gates wired into your PR flow, plus the PR review checklist",
  ],
  cta: { label: "Ask about dates", href: ask("full day") },
};

const halfDay: Workshop = {
  slug: "half-day",
  name: "Team workshop: half day",
  length: "half day",
  price: 2000,
  maxPeople: 10,
  title: "Half-day Claude Code workshop for engineering teams",
  description:
    "A half-day, hands-on Claude Code workshop for up to 10 engineers: parallel agents in git worktrees, a rules file, and a condensed hour on review gates. €2,000 ex-VAT.",
  headline:
    "Get your team running Claude Code agents in parallel in half a day",
  intro:
    "Your engineers set up parallel agents on your own repo, write the rules file those agents follow, and finish with one hour on reviewing what the agents produce. The honest target is 2–3x, not 100x.",
  agenda: [
    morning,
    {
      label: "Review gates, condensed",
      duration: "1 hour",
      blocks: [reviewGates, honestyRule],
    },
  ],
  outcomes: [
    "Worktree-per-agent setup running on your own repo",
    "A first rules file for your codebase",
    "The PR review checklist, ready to wire into your PR flow",
  ],
  cta: { label: "Ask about dates", href: ask("half day") },
};

export const workshops: Record<WorkshopSlug, Workshop> = {
  "full-day": fullDay,
  "half-day": halfDay,
};

export const workshopJsonLd = (w: Workshop) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: w.name,
  serviceType: "Team workshop",
  description: w.description,
  url: `${SITE_URL}/workshops/${w.slug}`,
  provider: { "@id": `${SITE_URL}/#person` },
  offers: {
    "@type": "Offer",
    price: w.price,
    priceCurrency: "EUR",
  },
});
