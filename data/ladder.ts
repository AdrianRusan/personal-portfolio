import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";

// Placeholder until Adi creates the paid €200 Calendly event (brief R3).
// ponytail: WP1 adds the same constant to data/index.ts — import it from there once both merge.
export const STRATEGY_CALL_URL = `mailto:${CONTACT_EMAIL}?subject=AI%20Strategy%20Call%20(%E2%82%AC200)`;

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
  cta: { label: string; href: string };
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
    cta: { label: "Request the €200 call", href: STRATEGY_CALL_URL },
  },
  {
    id: "audit",
    tier: "Advise",
    name: "AI Audit",
    summary:
      "A review of your AI-written code or LLM workflow, delivered as a ranked report: what to fix first, and why.",
    prices: [{ amount: 900, from: true }],
    duration: "2–3 days",
    cta: { label: "Scope an audit", href: CALENDLY_URL },
  },
  {
    id: "workshop",
    tier: "Train",
    name: "Team workshop",
    summary:
      "Claude Code, orchestration, review gates and prompt/harness engineering, hands-on with your team. Up to 10 people.",
    prices: [
      { amount: 2000, label: "half-day" },
      { amount: 3500, label: "full day" },
    ],
    duration: "4–8 h",
    cta: {
      label: "Ask about dates",
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Team workshop")}`,
    },
  },
  {
    id: "automation",
    tier: "Build",
    name: "AI Automation",
    summary:
      "One n8n workflow or LLM pipeline, built with evals and cost controls from the start.",
    prices: [{ amount: 3000, from: true }],
    duration: "1–3 wk",
    cta: { label: "Scope an automation", href: CALENDLY_URL },
  },
  {
    id: "harness",
    tier: "Build",
    name: "Agent Harness Setup",
    summary:
      "The ship/verify agent harness I run, installed in your repo and handed over to your team.",
    prices: [{ amount: 4000, from: true }],
    duration: "1 wk",
    cta: { label: "What's included", href: "#harness" },
  },
  {
    id: "reviewed-pr",
    tier: "Ship",
    name: "Reviewed PR",
    summary:
      "One real ticket from your backlog, shipped by an agent and security-reviewed line by line.",
    prices: [{ amount: 1000 }],
    duration: "~48 h",
    cta: { label: "What's included", href: "#entry-offer" },
  },
  {
    id: "sprint",
    tier: "Ship",
    name: "Delivery Sprint",
    summary:
      "A fixed batch of merge-ready, security-reviewed PRs at a price agreed before we start.",
    prices: [{ amount: 7500, from: true }],
    duration: "1–2 wk",
    limited: true,
    cta: { label: "What's included", href: "#sprint" },
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
    cta: { label: "What's included", href: "#retainer" },
  },
];

export const formatPrice = ({ prices, perMonth }: LadderOffer): string =>
  prices
    .map(
      (p) =>
        `${p.from ? "from " : ""}€${p.amount.toLocaleString("en-US")}${
          p.label ? ` ${p.label}` : ""
        }`,
    )
    .join(" / ") + (perMonth ? "/month" : "");

// One schema.org Service per ladder offer (brief R15). Prices are ex-VAT, so
// each Offer carries a priceSpecification saying so; "from" becomes minPrice.
export const ladderServiceJsonLd = () =>
  ladder.map((offer) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.name,
    description: offer.summary,
    serviceType: offer.tier,
    areaServed: "Worldwide",
    provider: { "@id": "https://www.adrian-rusan.com/#person" },
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
