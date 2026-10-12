import { CALENDLY_URL, CONTACT_EMAIL, CREDIT_DAYS } from "@/data";
import {
  ladder,
  perPrBand,
  sprintSizes,
  withOfferPrefill,
  type SprintSize,
  type LadderOffer,
  type Price,
  type Tier,
} from "@/data/ladder";

// Paid 110 € call (brief R3/R7). null until Adi creates the Calendly event;
// set it and the RO CTAs switch from email to booking, label too.
export const RO_STRATEGY_CALL_CALENDLY_URL: string | null = null;
export const RO_STRATEGY_CALL_URL =
  RO_STRATEGY_CALL_CALENDLY_URL ??
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sesiune de strategie AI (110 €)")}`;
export const RO_STRATEGY_CALL_CTA = RO_STRATEGY_CALL_CALENDLY_URL
  ? "Rezervă sesiunea de 110 €"
  : "Scrie-mi ca să rezervi sesiunea de 110 €";

export const RO_CAPACITY =
  "Review-ul îl face un singur om senior, așa că lucrez la un singur sprint sau retainer în același timp.";

export const RO_GUARANTEE =
  "Dacă primul PR revizuit nu e gata de merge după standardul tău, nu îl plătești.";

// RO twin of CREDIT_TERMS: same window, so both locales promise the same thing.
export const RO_CREDIT_TERMS = `Treci la nivelul următor în ${CREDIT_DAYS} de zile și ce ai plătit deja se scade din preț.`;

export const roTierNames: Record<Tier, string> = {
  Advise: "Consultanță",
  Train: "Training",
  Build: "Implementare",
  Ship: "Livrare",
};

export const roTiers: { tier: Tier; tagline: string }[] = [
  {
    tier: "Advise",
    tagline:
      "Un răspuns la o întrebare sau o listă de reparații, în ordinea priorității",
  },
  { tier: "Train", tagline: "Echipa ta învață fluxul de lucru, pe cod real" },
  {
    tier: "Build",
    tagline: "O automatizare sau un setup de agenți, construit și predat",
  },
  { tier: "Ship", tagline: "Backlog-ul tău, livrat și revizuit" },
];

// RO Delivery Sprint sizes: same PR counts as sprintSizes, RO prices.
export const roSprintSizes: SprintSize[] = [4100, 8000, 13200].map(
  (price, i) => ({ ...sprintSizes[i]!, price }),
);
const [roPerPrLo, roPerPrHi] = perPrBand(roSprintSizes);
const roPerPr = `${roPerPrLo}–${roPerPrHi} €`;

// Brief R7 (2026-10-10): 55% of the global ladder, rounded clean. EUR, ex-VAT.
const ro: Record<
  string,
  Pick<LadderOffer, "name" | "summary" | "duration" | "ctas"> & {
    prices: Price[];
    // Required: the EN assurance would otherwise leak through the spread below.
    assurance: string;
  }
> = {
  "strategy-call": {
    name: "Sesiune de strategie AI",
    summary:
      "O oră pe întrebarea ta despre AI, cu un rezumat scris.",
    prices: [{ amount: 110 }],
    duration: "1 oră",
    assurance: "Preț fix, plătit în avans.",
    ctas: [{ label: RO_STRATEGY_CALL_CTA, href: RO_STRATEGY_CALL_URL }],
  },
  audit: {
    name: "Audit AI",
    summary:
      "Îți verific codul scris de AI sau „vibe-coded”, fluxul LLM sau costurile cu tokenii: breșe de securitate, costul pe fiecare PR intrat în merge, folosirea cache-ului și rulările de agenți irosite. Primești un raport care îți spune ce repari întâi.",
    prices: [{ amount: 500, from: true }],
    duration: "2–3 zile",
    assurance: "Prețul se stabilește înainte să încep.",
    ctas: [
      { label: "Programează un audit", href: CALENDLY_URL },
      {
        label: "Sau începe cu un teardown gratuit (EN)",
        href: "/teardown",
      },
    ],
  },
  workshop: {
    name: "Workshop pentru echipă",
    summary:
      "Claude Code, agenți în paralel, un fișier de reguli și review gates, lucrate practic. Echipa ta pleacă cu primul ei fișier de reguli și cu un setup cu un worktree pentru fiecare agent, pornit pe repo-ul vostru. Maximum 10 persoane.",
    prices: [
      { amount: 1100, label: "jumătate de zi" },
      { amount: 1900, label: "o zi întreagă" },
    ],
    duration: "3,5 ore / 8 ore",
    assurance:
      "Preț fix pentru până la 10 persoane, cu agenda stabilită dinainte.",
    ctas: [
      {
        label: "Scrie-mi pentru date libere",
        href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Workshop pentru echipă")}`,
      },
    ],
  },
  automation: {
    name: "Automatizare AI",
    summary:
      "Un workflow n8n sau un pipeline LLM, construit de la început cu evaluări și control al costurilor. Dacă scrie texte pentru clienții tăi, primește un filtru care îl împiedică să inventeze cifre sau fapte.",
    prices: [{ amount: 1650, from: true }],
    duration: "1–3 săpt.",
    assurance:
      "Preț fix înainte să încep; evaluările dovedesc că funcționează înainte de predare.",
    ctas: [
      { label: "Discută o automatizare", href: CALENDLY_URL },
      {
        label: "Vezi filtrul de fapte construit de mine (EN)",
        href: "/work/honesty-gate",
      },
    ],
  },
  harness: {
    name: "Agent Fleet Setup",
    summary:
      "Harness-ul pe care îl folosesc eu (regulile, scripturile și verificările din CI care țin agenții pe drumul bun), cu agenți în paralel în git worktrees, instalat în repo-ul tău și predat echipei.",
    prices: [{ amount: 2200, from: true }],
    duration: "1 săpt.",
    assurance: "Preț fix pentru un repo, stabilit înainte să încep.",
    ctas: [{ label: "Discută configurarea", href: CALENDLY_URL }],
  },
  "reviewed-pr": {
    name: "PR revizuit",
    summary:
      "Un tichet real din backlog-ul tău, livrat de un agent și verificat linie cu linie pentru securitate.",
    prices: [{ amount: 550 }],
    duration: "~48 h",
    assurance: "Plătești după ce vezi PR-ul.",
    ctas: [{ label: "Începe cu un PR", href: CALENDLY_URL }],
  },
  sprint: {
    name: "Sprint de livrare",
    summary:
      `Un set fix de PR-uri gata de merge și verificate pentru securitate, la un preț stabilit înainte să începem: ${roPerPr} per PR, cu raportul de securitate inclus.`,
    prices: [{ amount: roSprintSizes[0]!.price, from: true }],
    duration: "1–2 săpt. · proiecte mai mari 2–3 săpt.",
    assurance: "Prețul se fixează la discuția de scope, înainte de orice lucru.",
    ctas: [{ label: "Discută un sprint", href: CALENDLY_URL }],
  },
  retainer: {
    name: "Retainer lunar",
    summary:
      "PR-uri revizuite în fiecare lună, într-un ritm constant, cu un loc de review rezervat pentru tine.",
    prices: [{ amount: 2200, from: true }],
    duration: "lunar",
    assurance: "Trei luni la început, apoi lună de lună.",
    ctas: [{ label: "Discută un retainer", href: CALENDLY_URL }],
  },
};

// RO twin of sprintDurations (data/ladder.ts), same order.
export const roSprintDurations = ["~1 săpt.", "1–2 săpt.", "2–3 săpt."];

// Romanian convention: dot thousands separator, euro sign after the amount.
export const euro = (amount: number) =>
  `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export const formatPriceRo = ({ prices, perMonth }: LadderOffer): string =>
  prices
    .map(
      (p) =>
        `${p.from ? "de la " : ""}${euro(p.amount)}${p.label ? ` ${p.label}` : ""}`,
    )
    .join(" / ") + (perMonth ? "/lună" : "");

// Same ids, tiers and availability flags as the global ladder; RO copy and
// prices. Defined after formatPriceRo: the prefill formats every price at load.
export const roLadder: LadderOffer[] = withOfferPrefill(
  ladder.map((offer) => ({ ...offer, ...ro[offer.id] })),
  formatPriceRo,
);
