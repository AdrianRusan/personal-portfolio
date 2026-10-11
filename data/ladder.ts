import {
  CALENDLY_URL,
  CREDIT_DAYS,
  CREDIT_TERMS,
  GUARANTEE,
  STRATEGY_CALL_URL,
} from "@/data";
import {
  workshops,
  workshopServiceId,
  type WorkshopSlug,
} from "@/data/workshops";

export { CREDIT_TERMS };

export type Tier = "Advise" | "Train" | "Build" | "Ship";

export const tiers: { tier: Tier; tagline: string }[] = [
  { tier: "Advise", tagline: "A straight answer, or a ranked list of fixes" },
  { tier: "Train", tagline: "Your team learns the workflow hands-on" },
  {
    tier: "Build",
    tagline: "One automation or harness, built and handed over",
  },
  { tier: "Ship", tagline: "Your backlog, shipped and reviewed" },
];

export interface Price {
  amount: number;
  from?: boolean;
  label?: string;
}

export interface LadderOffer {
  id: string;
  tier: Tier;
  name: string;
  summary: string;
  prices: Price[];
  perMonth?: boolean;
  duration: string;
  // True only where capacity is genuinely capped — brief R6. No countdowns.
  limited?: boolean;
  // Risk reversal shown next to the price (brief R6). Optional so localized
  // ladders render without it until translated.
  assurance?: string;
  ctas: { label: string; href: string }[];
}

// Prices are the guide's ladder table (2026-10-10): EUR, ex-VAT, global.
export const ladder: LadderOffer[] = [
  {
    id: "strategy-call",
    tier: "Advise",
    name: "AI Strategy Call",
    summary:
      "60 minutes 1:1 on the AI question in front of you, plus a written summary you keep.",
    prices: [{ amount: 200 }],
    duration: "1 h",
    assurance: `Move up a tier within ${CREDIT_DAYS} days and the €200 counts toward it.`,
    ctas: [{ label: "Request the €200 call", href: STRATEGY_CALL_URL }],
  },
  {
    id: "audit",
    tier: "Advise",
    name: "AI Audit",
    summary:
      "Your AI-written code, LLM workflow or LLM spend, reviewed: security gaps, cost per merged PR, cache use and wasted agent runs, in a ranked report of what to fix first.",
    prices: [{ amount: 900, from: true }],
    duration: "2–3 days",
    assurance: `Price agreed before I start. Move up within ${CREDIT_DAYS} days and it counts toward the next tier.`,
    ctas: [{ label: "Scope an audit", href: CALENDLY_URL }],
  },
  {
    id: "workshop",
    tier: "Train",
    name: "Team workshop",
    summary:
      "Claude Code, orchestration, review gates and harness engineering, hands-on. Your team leaves with its first rules file and a worktree-per-agent setup running on your repo. Up to 10 people.",
    // One source for workshop prices: the workshop pages' own data.
    prices: [
      { amount: workshops["half-day"].price, label: "half-day" },
      { amount: workshops["full-day"].price, label: "full day" },
    ],
    duration: "4–8 h",
    assurance: "Fixed price for up to 10 people, agenda agreed in advance.",
    ctas: [
      { label: "Half-day agenda", href: "/workshops/half-day" },
      { label: "Full-day agenda", href: "/workshops/full-day" },
    ],
  },
  {
    id: "automation",
    tier: "Build",
    name: "AI Automation",
    summary:
      "One n8n workflow or LLM pipeline, built with evals and cost controls from the start. Where it writes for customers, it gets a gate that stops it inventing numbers or facts.",
    prices: [{ amount: 3000, from: true }],
    duration: "1–3 wk",
    assurance:
      "Fixed price before I start; evals prove it works before handoff.",
    ctas: [{ label: "Scope an automation", href: CALENDLY_URL }],
  },
  {
    id: "harness",
    tier: "Build",
    name: "Agent Fleet Setup",
    summary:
      "The harness I run: parallel agents in git worktrees, project rules and review gates wired into CI, installed in your repo and handed over to your team.",
    prices: [{ amount: 4000, from: true }],
    duration: "1 wk",
    assurance:
      "Your team ships a reviewed PR through it, or sessions continue free.",
    ctas: [{ label: "What's included", href: "#harness" }],
  },
  {
    id: "reviewed-pr",
    tier: "Ship",
    name: "Reviewed PR",
    summary:
      "One real ticket from your backlog, shipped by an agent and security-reviewed line by line.",
    prices: [{ amount: 1000 }],
    duration: "~48 h",
    assurance: GUARANTEE,
    ctas: [{ label: "What's included", href: "#entry-offer" }],
  },
  {
    id: "sprint",
    tier: "Ship",
    name: "Delivery Sprint",
    summary:
      "A fixed batch of merge-ready, security-reviewed PRs at a price agreed before we start.",
    prices: [{ amount: 7500, from: true }],
    duration: "1–2 wk · larger scopes 2–3 wk",
    limited: true,
    assurance:
      "First PR not merge-ready? You don't pay for it. Missed vulnerabilities get fixed free.",
    ctas: [{ label: "What's included", href: "#sprint" }],
  },
  {
    id: "retainer",
    tier: "Ship",
    name: "Retainer",
    summary:
      "A steady monthly flow of reviewed PRs, with a review slot reserved for you.",
    prices: [{ amount: 4000, from: true }],
    perMonth: true,
    duration: "monthly",
    limited: true,
    assurance: "If month 1 misses the pace we agreed, you can stop there.",
    ctas: [{ label: "What's included", href: "#retainer" }],
  },
];

// #54 R5: Delivery Sprint sizes (Pilot, Standard, Scale). The ladder line names
// both ranges: "1–2 wk" for the "from" price, "larger scopes 2–3 wk" for Scale.
export const sprintDurations = ["~1 wk", "1–2 wk", "2–3 wk"];

export const offerById = (offers: LadderOffer[], id: string) =>
  offers.find((o) => o.id === id)!;

export const formatPrice = ({ prices, perMonth }: LadderOffer): string =>
  prices
    .map(
      (p) =>
        `${p.from ? "from " : ""}€${p.amount.toLocaleString("en-US")}${
          p.label ? ` ${p.label}` : ""
        }`,
    )
    .join(" / ") + (perMonth ? "/month" : "");

// Matched against the known slugs, so a stray href can't mint a dangling @id.
const relatedWorkshops = ({ ctas }: LadderOffer) => {
  const slugs = Object.keys(workshops) as WorkshopSlug[];
  const ids = ctas
    .map((c) => slugs.find((slug) => c.href === `/workshops/${slug}`))
    .filter((slug): slug is WorkshopSlug => slug !== undefined)
    .map((slug) => ({ "@id": workshopServiceId(slug) }));
  return ids.length ? { isRelatedTo: ids } : {};
};

// One schema.org Service per ladder offer (brief R15). Prices are ex-VAT, so
// each Offer carries a priceSpecification saying so; "from" becomes minPrice.
export const ladderServiceJsonLd = (
  offers = ladder,
  areaServed = "Worldwide",
) =>
  offers.map((offer) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.name,
    description: offer.summary,
    serviceType: offer.tier,
    areaServed,
    provider: { "@id": "https://www.adrian-rusan.com/#person" },
    // Ladder entries that link to a workshop page point at that page's Service.
    ...relatedWorkshops(offer),
    offers: offer.prices.map((p) => ({
      "@type": "Offer",
      // A top-level price reads as exact, so "from" offers carry only minPrice.
      ...(p.from ? {} : { price: String(p.amount) }),
      priceCurrency: "EUR",
      ...(p.label ? { name: `${offer.name}, ${p.label}` } : {}),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        [p.from ? "minPrice" : "price"]: p.amount,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        ...(offer.perMonth ? { unitCode: "MON" } : {}),
      },
    })),
  }));
