import { CALENDLY_URL, CONTACT_EMAIL, CREDIT_DAYS } from "@/data";
import { ladder, type LadderOffer, type Price, type Tier } from "@/data/ladder";

// Placeholder until Adi creates a paid 110 € Calendly event (brief R3/R7).
export const RO_STRATEGY_CALL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Sesiune de strategie AI (110 €)")}`;

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
    // Required: the EN assurance would otherwise leak through the spread below.
    assurance: string;
  }
> = {
  "strategy-call": {
    name: "Sesiune de strategie AI",
    summary:
      "60 de minute 1:1 pe întrebarea despre AI pe care o ai acum, plus un rezumat scris pe care îl păstrezi.",
    prices: [{ amount: 110 }],
    duration: "1 oră",
    assurance: `Treci la nivelul următor în ${CREDIT_DAYS} de zile și cei 110 € se scad din preț.`,
    ctas: [{ label: "Cere sesiunea de 110 €", href: RO_STRATEGY_CALL_URL }],
  },
  audit: {
    name: "Audit AI",
    summary:
      "Îți verific codul scris de AI, fluxul LLM sau costurile cu LLM-urile: breșe de securitate, costul pe PR cu merge, folosirea cache-ului și rulările de agenți irosite. Primești un raport ordonat după ce repari întâi.",
    prices: [{ amount: 500, from: true }],
    duration: "2–3 zile",
    assurance: `Prețul se stabilește înainte să încep. Treci mai sus în ${CREDIT_DAYS} de zile și se scade din nivelul următor.`,
    ctas: [{ label: "Programează un audit", href: CALENDLY_URL }],
  },
  workshop: {
    name: "Workshop pentru echipă",
    summary:
      "Claude Code, orchestrare, review gates și harness engineering, lucrate practic. Echipa ta pleacă cu primul ei fișier de reguli și cu un setup cu un worktree pentru fiecare agent, pornit pe repo-ul vostru. Maximum 10 persoane.",
    prices: [
      { amount: 1100, label: "jumătate de zi" },
      { amount: 1900, label: "o zi întreagă" },
    ],
    duration: "4–8 ore",
    assurance:
      "Preț fix pentru până la 10 persoane, cu agenda stabilită dinainte.",
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
      "Un workflow n8n sau un pipeline LLM, construit de la început cu evaluări și control al costurilor. Unde scrie pentru clienți, primește un filtru care îl oprește să inventeze cifre sau fapte.",
    prices: [{ amount: 1650, from: true }],
    duration: "1–3 săpt.",
    assurance:
      "Preț fix înainte să încep; evaluările dovedesc că funcționează înainte de predare.",
    ctas: [{ label: "Discută o automatizare", href: CALENDLY_URL }],
  },
  harness: {
    name: "Agent Fleet Setup",
    summary:
      "Harness-ul pe care îl folosesc eu: agenți în paralel în git worktrees, reguli de proiect și review gates legate în CI, instalate în repo-ul tău și predate echipei.",
    prices: [{ amount: 2200, from: true }],
    duration: "1 săpt.",
    assurance:
      "Echipa ta livrează un PR revizuit prin el, altfel sesiunile continuă gratuit.",
    ctas: [{ label: "Discută configurarea", href: CALENDLY_URL }],
  },
  "reviewed-pr": {
    name: "PR revizuit",
    summary:
      "Un tichet real din backlog-ul tău, livrat de un agent și verificat linie cu linie pentru securitate.",
    prices: [{ amount: 550 }],
    duration: "~48 h",
    assurance: RO_GUARANTEE,
    ctas: [{ label: "Începe cu un PR", href: CALENDLY_URL }],
  },
  sprint: {
    name: "Sprint de livrare",
    summary:
      "Un set fix de PR-uri gata de merge și verificate pentru securitate, la un preț stabilit înainte să începem.",
    prices: [{ amount: 4100, from: true }],
    duration: "1–2 săpt.",
    assurance:
      "Primul PR nu e gata de merge? Nu îl plătești. Vulnerabilitățile scăpate se repară gratuit.",
    ctas: [{ label: "Stabilește scope-ul", href: CALENDLY_URL }],
  },
  retainer: {
    name: "Retainer lunar",
    summary:
      "PR-uri revizuite în fiecare lună, într-un ritm constant, cu un loc de review rezervat pentru tine.",
    prices: [{ amount: 2200, from: true }],
    duration: "lunar",
    assurance: "Dacă luna 1 nu atinge ritmul stabilit, te poți opri acolo.",
    ctas: [{ label: "Discută un retainer", href: CALENDLY_URL }],
  },
};

// RO twin of sprintDurations (data/ladder.ts), same order.
export const roSprintDurations = ["~1 săpt.", "1–2 săpt.", "2–3 săpt."];

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
