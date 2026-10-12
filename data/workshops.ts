import { CONTACT_EMAIL } from "@/data";

// Team workshop pages (brief R8). Prices are the guide's ladder table
// (2026-10-10): EUR, ex-VAT. Every number here traces to the guide.

export type WorkshopSlug = "full-day" | "half-day";

export interface AgendaBlock {
  title: string;
  body: string;
  // Clock time, e.g. "09:00–10:00" (C43).
  time?: string;
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
  // The one line for the engineering manager who buys it (C43).
  managerOutcome: string;
  outcomes: string[];
  cta: { label: string; href: string };
  // The email ask, shown under the primary CTA once it books on Calendly.
  secondaryCta?: { label: string; href: string };
}

// 20-min "Workshop dates" Calendly event (ADI-3). null until Adi creates it;
// set it and both workshop pages book on Calendly, email as the fallback.
export const WORKSHOP_DATES_URL: string | null = null;

// D6, the same for both formats.
export const workshopLogistics = [
  "Remote via Zoom by default",
  "On-site in Romania or the EU, with travel at cost",
  "Taught in English or Romanian",
  "Before the day: a Claude Code seat per engineer and access to the repo you'll work on",
];

// The hub post for "Claude Code parallel agents" (C58).
export const workshopHubLink = {
  label: "How I run Claude Code parallel agents →",
  href: "/blog/how-i-run-claude-code-agents-in-parallel",
};

const SITE_URL = "https://www.adrian-rusan.com";

const ask = (length: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Team workshop (${length})`)}`;

// Same three blocks in both formats; the full day gives each more time.
// R2-F29: parts are named by topic and length, not time of day.
const setup = (
  duration: string,
  times: [string, string, string],
): AgendaPart => ({
  label: "Setup",
  duration,
  blocks: [
    {
      time: times[0],
      title: "One worktree per agent",
      body: "Each agent gets its own git worktree and branch, so parallel sessions never edit the same checkout. Your team sets this up on a repo they work in every day.",
    },
    {
      time: times[1],
      title: "The rules file your agents follow",
      body: "Writing a CLAUDE.md that holds your commands, conventions and no-go areas, so every session starts from the same instructions instead of a fresh guess.",
    },
    {
      time: times[2],
      title: "Orchestrating a multi-session run",
      body: "Splitting a feature into work packages, briefing each agent so it can finish without coming back to ask, and keeping usage limits in check when many sessions are open.",
    },
  ],
});

const reviewGates: AgendaBlock = {
  title: "Review gates",
  body: "Reviewer agents that check correctness, security and completeness and don't trust the agent that wrote the code. Then the senior human pass at the end, using the same PR review checklist I use.",
};

const honestyRule: AgendaBlock = {
  title: "The honesty rule",
  body: "A gate that stops an agent from inventing numbers, facts or urgency in anything a customer will read. Agents fill gaps with plausible fiction, and this is where it gets caught.",
};

// Times per D6: half-day 09:00–12:30, full day 09:00–17:00 (lunch 12:30–13:30).
const fullDay: Workshop = {
  slug: "full-day",
  name: "Team workshop: full day",
  length: "full day",
  // D3 (Adi, 2026-10-12): €3,500 → €5,000. RO is 55% of EN: 2.750 € (data/ro.ts).
  price: 5000,
  maxPeople: 10,
  title: "Full-day Claude Code workshop for engineering teams",
  description:
    "Claude Code workshop on agentic engineering for teams, full day: parallel agents in git worktrees, then review gates. Up to 10 engineers.",
  headline:
    "Teach your team to run Claude Code agents in parallel, then review what they ship",
  intro:
    "The morning gets your engineers running several agents side by side on your own repo. The afternoon is the part most teams skip: the gates that catch what those agents get wrong before it reaches a customer.",
  agenda: [
    setup("3.5 hours", ["09:00–10:00", "10:15–11:15", "11:15–12:30"]),
    {
      label: "Review gates",
      duration: "3.5 hours",
      blocks: [
        { ...reviewGates, time: "13:30–14:45" },
        { ...honestyRule, time: "15:00–16:00" },
        {
          time: "16:00–17:00",
          title: "Live example: an agent-built SaaS",
          // A6: the client is named nowhere.
          body: "A walk through a client's agent-built SaaS (under NDA): how the work was split across agent sessions, how the agents were briefed, and where the review gates caught what the implementing agents got wrong.",
        },
      ],
    },
  ],
  managerOutcome:
    "By 17:00, every engineer has run agents in parallel on your repo and taken their output through review gates you keep.",
  outcomes: [
    "Worktree-per-agent setup running on your own repo",
    "A first rules file for your codebase",
    "Review gates wired into your PR flow, plus the PR review checklist",
  ],
  cta: { label: "Email me for dates", href: ask("full day") },
};

const halfDay: Workshop = {
  slug: "half-day",
  name: "Team workshop: half day",
  length: "half day",
  // D3 (Adi, 2026-10-12): €2,000 → €3,000. RO is 55% of EN: 1.650 € (data/ro.ts).
  price: 3000,
  maxPeople: 10,
  title: "Half-day Claude Code workshop for engineering teams",
  description:
    "Claude Code workshop on agentic engineering for teams, half-day: parallel agents in git worktrees, a rules file, an hour on review gates.",
  headline:
    "Get your team running Claude Code agents in parallel in half a day",
  intro:
    "Your engineers set up parallel agents on your own repo, write the rules file those agents follow, and finish with one hour on reviewing what the agents produce.",
  agenda: [
    setup("2.5 hours", ["09:00–09:45", "09:45–10:30", "10:45–11:30"]),
    {
      label: "Review gates",
      duration: "1 hour",
      blocks: [
        { ...reviewGates, time: "11:30–12:00" },
        { ...honestyRule, time: "12:00–12:30" },
      ],
    },
  ],
  managerOutcome:
    "By 12:30, every engineer has agents running in parallel on your repo and a first rules file to build on.",
  outcomes: [
    "Worktree-per-agent setup running on your own repo",
    "A first rules file for your codebase",
    "The PR review checklist, ready to wire into your PR flow",
  ],
  cta: { label: "Email me for dates", href: ask("half day") },
};

export const euro = (n: number) => `€${n.toLocaleString("en-US")}`;

// "€300 per engineer at 10 people": the group price split at the cap.
export const perEngineer = (w: Workshop) =>
  `${euro(Math.round(w.price / w.maxPeople))} per engineer at ${w.maxPeople} people`;

// Price is appended here, from the numeric field, so meta/OG/JSON-LD copy can't
// drift from Offer.price. The CTA books on Calendly once WORKSHOP_DATES_URL is set.
const withPrice = (w: Workshop): Workshop => ({
  ...w,
  description: `${w.description} ${euro(w.price)} ex-VAT.`,
  ...(WORKSHOP_DATES_URL
    ? {
        cta: { label: "Pick a date", href: WORKSHOP_DATES_URL },
        secondaryCta: { label: "Or email me", href: w.cta.href },
      }
    : {}),
});

export const workshops: Record<WorkshopSlug, Workshop> = {
  "full-day": withPrice(fullDay),
  "half-day": withPrice(halfDay),
};

export const workshopServiceId = (slug: WorkshopSlug) =>
  `${SITE_URL}/workshops/${slug}#service`;

export const workshopJsonLd = (w: Workshop) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": workshopServiceId(w.slug),
  name: w.name,
  serviceType: "Team workshop",
  description: w.description,
  url: `${SITE_URL}/workshops/${w.slug}`,
  provider: { "@id": `${SITE_URL}/#person` },
  offers: {
    "@type": "Offer",
    price: w.price,
    priceCurrency: "EUR",
    url: `${SITE_URL}/workshops/${w.slug}`,
  },
});
