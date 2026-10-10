import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";
import { ladder, type LadderOffer, type Price, type Tier } from "@/data/ladder";

// Placeholder until Adi creates a paid 110 € Calendly event (brief R3/R7).
export const RO_STRATEGY_CALL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sesiune de strategie AI (110 €)")}`;

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
      "Un răspuns direct sau o listă de reparații, în ordinea priorității",
  },
  { tier: "Train", tagline: "Echipa ta învață fluxul de lucru, pe cod real" },
  {
    tier: "Build",
    tagline: "O automatizare sau un harness, construit și predat",
  },
  { tier: "Ship", tagline: "Backlog-ul tău, livrat și revizuit" },
];

// Brief R7 (2026-10-10): 55% of the global ladder, rounded clean. EUR, ex-VAT.
const ro: Record<
  string,
  Pick<LadderOffer, "name" | "summary" | "duration" | "ctas"> & {
    prices: Price[];
  }
> = {
  "strategy-call": {
    name: "Sesiune de strategie AI",
    summary:
      "60 de minute 1:1 pe întrebarea despre AI pe care o ai acum, plus un rezumat scris pe care îl păstrezi.",
    prices: [{ amount: 110 }],
    duration: "1 oră",
    ctas: [{ label: "Cere sesiunea de 110 €", href: RO_STRATEGY_CALL_URL }],
  },
  audit: {
    name: "Audit AI",
    summary:
      "Analizez codul scris de AI sau fluxul tău LLM. Primești un raport ordonat după prioritate: ce repari întâi și de ce.",
    prices: [{ amount: 500, from: true }],
    duration: "2–3 zile",
    ctas: [{ label: "Programează un audit", href: CALENDLY_URL }],
  },
  workshop: {
    name: "Workshop pentru echipă",
    summary:
      "Claude Code, orchestrare, review gates și prompt/harness engineering, lucrate practic cu echipa ta. Maximum 10 persoane.",
    prices: [
      { amount: 1100, label: "jumătate de zi" },
      { amount: 1900, label: "o zi întreagă" },
    ],
    duration: "4–8 ore",
    ctas: [
      {
        label: "Întreabă de date libere",
        href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Workshop pentru echipă")}`,
      },
    ],
  },
  automation: {
    name: "Automatizare AI",
    summary:
      "Un workflow n8n sau un pipeline LLM, construit de la început cu evaluări și control al costurilor.",
    prices: [{ amount: 1650, from: true }],
    duration: "1–3 săpt.",
    ctas: [{ label: "Discută o automatizare", href: CALENDLY_URL }],
  },
  harness: {
    name: "Configurare agent harness",
    summary:
      "Harness-ul ship/verify pe care îl folosesc zilnic, instalat în repo-ul tău și predat echipei.",
    prices: [{ amount: 2200, from: true }],
    duration: "1 săpt.",
    ctas: [{ label: "Discută configurarea", href: CALENDLY_URL }],
  },
  "reviewed-pr": {
    name: "PR revizuit",
    summary:
      "Un tichet real din backlog-ul tău, livrat de un agent și verificat linie cu linie pentru securitate.",
    prices: [{ amount: 550 }],
    duration: "~48 h",
    ctas: [{ label: "Începe cu un PR", href: CALENDLY_URL }],
  },
  sprint: {
    name: "Sprint de livrare",
    summary:
      "Un set fix de PR-uri gata de merge și verificate pentru securitate, la un preț stabilit înainte să începem.",
    prices: [{ amount: 4100, from: true }],
    duration: "1–2 săpt.",
    ctas: [{ label: "Stabilește scope-ul", href: CALENDLY_URL }],
  },
  retainer: {
    name: "Retainer lunar",
    summary:
      "PR-uri revizuite în fiecare lună, într-un ritm constant, cu un loc de review rezervat pentru tine.",
    prices: [{ amount: 2200, from: true }],
    duration: "lunar",
    ctas: [{ label: "Discută un retainer", href: CALENDLY_URL }],
  },
};

// Same ids, tiers and availability flags as the global ladder; RO copy and prices.
export const roLadder: LadderOffer[] = ladder.map((offer) => ({
  ...offer,
  ...ro[offer.id],
}));

// Romanian convention: dot thousands separator, euro sign after the amount.
const euro = (amount: number) =>
  `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export const formatPriceRo = ({ prices, perMonth }: LadderOffer): string =>
  prices
    .map(
      (p) =>
        `${p.from ? "de la " : ""}${euro(p.amount)}${p.label ? ` ${p.label}` : ""}`,
    )
    .join(" / ") + (perMonth ? "/lună" : "");

// Lowest entry price per tier, for the /ro ladder summary.
export const roTierFrom = (tier: Tier): string =>
  `de la ${euro(
    Math.min(
      ...roLadder
        .filter((o) => o.tier === tier)
        .flatMap((o) => o.prices.map((p) => p.amount)),
    ),
  )}`;
