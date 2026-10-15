import {
  CALENDLY_URL,
  CREDIT_TERMS,
  STRATEGY_CALL_CTA,
  STRATEGY_CALL_URL,
} from "@/data";
import { calendlyUrl, isCalendly } from "@/lib/calendly";
import {
  workshops,
  workshopServiceId,
  type WorkshopSlug,
} from "@/data/workshops";

export { CREDIT_TERMS };

// #150 R4: CAEN 6210 wording. The keys are the EN labels and the JSON-LD serviceType.
export type Tier = "Plan" | "Set up" | "Build" | "Ship";

export const tiers: { tier: Tier; tagline: string }[] = [
  { tier: "Plan", tagline: "A written build plan, or ranked findings with the top fix shipped" },
  { tier: "Set up", tagline: "Your team learns the workflow hands-on" },
  {
    tier: "Build",
    tagline: "One automation or agent setup, built and handed over",
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

// Delivery Sprint sizes (Pilot, Standard, Scale): price and PR count. One
// source for the pricing table, the per-PR band and the Calendly prefill.
export interface SprintSize {
  price: number;
  prs: [number, number];
}
export const sprintSizes: SprintSize[] = [
  { price: 7500, prs: [5, 6] },
  { price: 14500, prs: [10, 15] },
  { price: 24000, prs: [16, 20] },
];

// R2-F1: the per-PR claim is computed, never typed: the cheapest and dearest
// PR across all sizes, rounded outward to 50 so the band always contains both.
export const perPrBand = (sizes: SprintSize[]): [number, number] => {
  const per = sizes.flatMap(({ price, prs }) => prs.map((n) => price / n));
  return [
    Math.floor(Math.min(...per) / 50) * 50,
    Math.ceil(Math.max(...per) / 50) * 50,
  ];
};

const perPrLabel = (sizes: SprintSize[]) => {
  const [lo, hi] = perPrBand(sizes);
  return `€${lo.toLocaleString("en-US")}–${hi.toLocaleString("en-US")} per PR`;
};

// Prices are the guide's ladder table (2026-10-10): EUR, ex-VAT, global.
const offers: LadderOffer[] = [
  {
    id: "strategy-call",
    tier: "Plan",
    name: "Architecture Session",
    // A1 F4: listed on /services only. #150: matches the live Cal.com event text.
    summary:
      "One hour on what you want built. Within one working day you get a written build plan: architecture, tooling, cost estimate. If we start the build within 30 days, the €200 counts toward it.",
    prices: [{ amount: 200 }],
    duration: "1 h",
    assurance: "Fixed price, paid up front.",
    ctas: [{ label: STRATEGY_CALL_CTA, href: STRATEGY_CALL_URL }],
  },
  {
    id: "audit",
    tier: "Plan",
    name: "AI Code Audit",
    summary:
      "Your AI-written or vibe-coded code, LLM workflow or token spend, reviewed: security gaps, cost per merged PR, cache use and wasted agent runs. You get the findings ranked by what to fix first, plus one PR that fixes the top finding, scoped on the findings call.",
    // D3 (Adi, 2026-10-12): €900 → €1,500. RO is 55% of EN: 850 € (data/ro.ts).
    prices: [{ amount: 1500, from: true }],
    duration: "2–3 days",
    assurance: "Price agreed before I start.",
    ctas: [
      { label: "Scope an audit", href: CALENDLY_URL },
      { label: "Or start with a free teardown", href: "/teardown" },
    ],
  },
  {
    id: "workshop",
    tier: "Set up",
    name: "Team workshop",
    summary:
      "Claude Code, parallel agents, a rules file and review gates, hands-on. Your team leaves with its first rules file and a worktree-per-agent setup running on your repo. Up to 10 people.",
    // One source for workshop prices: the workshop pages' own data.
    prices: [
      { amount: workshops["half-day"].price, label: "half-day" },
      { amount: workshops["full-day"].price, label: "full-day" },
    ],
    duration: "3.5 h / 8 h",
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
    ctas: [
      { label: "Scope an automation", href: CALENDLY_URL },
      { label: "See the fact gate I built", href: "/work/honesty-gate" },
    ],
  },
  {
    id: "harness",
    tier: "Build",
    name: "Agent Fleet Setup",
    summary:
      "The harness I run (the rules, scripts and CI checks that keep agents on track), with parallel agents in git worktrees, installed in your repo and handed over to your team.",
    prices: [{ amount: 4000, from: true }],
    duration: "1 wk",
    assurance: "Price fixed for one repo before I start.",
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
    // The guarantee itself is printed once per page, in the hero (C-RULES).
    assurance: "Paid after you've seen the PR.",
    ctas: [{ label: "What's included", href: "#entry-offer" }],
  },
  {
    id: "sprint",
    tier: "Ship",
    name: "Delivery Sprint",
    summary:
      `A fixed batch of merge-ready, security-reviewed PRs at a price agreed before we start: ${perPrLabel(sprintSizes)}, security report included.`,
    prices: [{ amount: sprintSizes[0]!.price, from: true }],
    duration: "1–2 wk · larger scopes 2–3 wk",
    limited: true,
    assurance: "Price fixed on the scope call, before work starts.",
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
    assurance: "Three months to start, then month to month.",
    ctas: [{ label: "What's included", href: "#retainer" }],
  },
];

// #54 R5: Delivery Sprint sizes (Pilot, Standard, Scale). The ladder line names
// both ranges: "1–2 wk" for the "from" price, "larger scopes 2–3 wk" for Scale.
export const sprintDurations = ["~1 wk", "1–2 wk", "2–3 wk"];

// C44: booking links pre-fill Calendly's first answer with the offer, so the
// call starts from what the visitor clicked (Calendly's a1 parameter).
export const withOfferPrefill = (
  list: LadderOffer[],
  format: (offer: LadderOffer) => string,
) =>
  list.map((offer) => ({
    ...offer,
    ctas: offer.ctas.map((cta) =>
      isCalendly(cta.href)
        ? {
            ...cta,
            href: calendlyUrl(cta.href, {
              a1: `${offer.name} (${format(offer)})`,
            }),
          }
        : cta,
    ),
  }));

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

export const ladder = withOfferPrefill(offers, formatPrice);

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
