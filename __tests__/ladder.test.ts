import {
  ladder,
  formatPrice,
  ladderServiceJsonLd,
  CREDIT_TERMS,
  sprintDurations,
} from "@/data/ladder";
import { roLadder, roSprintDurations } from "@/data/ro";
import { workshops, workshopJsonLd } from "@/data/workshops";
import { STRATEGY_CALL_URL } from "@/data";

// The guide's ladder table (2026-10-10), verbatim. EUR, ex-VAT, global.
const GUIDE: Record<string, { tier: string; price: string; duration: string }> =
  {
    "strategy-call": { tier: "Advise", price: "€200", duration: "1 h" },
    audit: { tier: "Advise", price: "from €900", duration: "2–3 days" },
    workshop: {
      tier: "Train",
      price: "€2,000 half-day / €3,500 full-day",
      duration: "4–8 h",
    },
    automation: { tier: "Build", price: "from €3,000", duration: "1–3 wk" },
    harness: { tier: "Build", price: "from €4,000", duration: "1 wk" },
    "reviewed-pr": { tier: "Ship", price: "€1,000", duration: "~48 h" },
    // #54: the guide's "1–2 wk" plus the Scale size, so the ladder and the
    // sprint table agree.
    sprint: {
      tier: "Ship",
      price: "from €7,500",
      duration: "1–2 wk · larger scopes 2–3 wk",
    },
    retainer: { tier: "Ship", price: "from €4,000/month", duration: "monthly" },
  };

describe("ladder", () => {
  it("links the workshop tier to both workshop pages", () => {
    const offer = ladder.find((o) => o.id === "workshop")!;
    // Same order as the prices: half-day, then full day.
    expect(offer.ctas.map((c) => c.href)).toEqual([
      "/workshops/half-day",
      "/workshops/full-day",
    ]);
  });

  // C01: a "Book" label must never open an email client.
  it("never labels a mailto link 'Book', EN or RO", () => {
    for (const offer of [...ladder, ...roLadder]) {
      for (const cta of offer.ctas) {
        if (cta.href.startsWith("mailto:")) {
          expect(cta.label).not.toMatch(/^(book|rezervă)/i);
        }
      }
    }
  });

  it("sends the €200 call to the one STRATEGY_CALL_URL in data/index.ts", () => {
    const offer = ladder.find((o) => o.id === "strategy-call")!;
    expect(offer.ctas.map((c) => c.href)).toEqual([STRATEGY_CALL_URL]);
  });

  it("holds exactly the guide's eight offers, in ladder order", () => {
    expect(ladder.map((o) => o.id)).toEqual(Object.keys(GUIDE));
  });

  it.each(Object.entries(GUIDE))(
    "%s matches the guide's tier, price and duration",
    (id, expected) => {
      const offer = ladder.find((o) => o.id === id)!;
      expect({
        tier: offer.tier,
        price: formatPrice(offer),
        duration: offer.duration,
      }).toEqual(expected);
    },
  );

  it("puts a risk-reversal line next to every price (brief R6)", () => {
    for (const offer of ladder) expect(offer.assurance).toMatch(/\w{3}/);
  });

  it("states the credit window once, in the shared terms", () => {
    expect(CREDIT_TERMS).toMatch(/within 30 days/);
  });

  it("marks only Delivery Sprint and Retainer as limited availability", () => {
    expect(ladder.filter((o) => o.limited).map((o) => o.id)).toEqual([
      "sprint",
      "retainer",
    ]);
  });
});

describe("ladderServiceJsonLd", () => {
  const nodes = JSON.parse(JSON.stringify(ladderServiceJsonLd()));

  it("emits one Service per ladder offer, provided by #person", () => {
    expect(nodes).toHaveLength(ladder.length);
    for (const node of nodes) {
      expect(node["@context"]).toBe("https://schema.org");
      expect(node["@type"]).toBe("Service");
      expect(typeof node.name).toBe("string");
      expect(node.provider).toEqual({
        "@id": "https://www.adrian-rusan.com/#person",
      });
    }
  });

  it("gives every Service an EUR price, one Offer per price point", () => {
    for (const node of nodes) {
      for (const offer of node.offers) {
        expect(offer["@type"]).toBe("Offer");
        expect(offer.priceCurrency).toBe("EUR");
        const spec = offer.priceSpecification;
        // An exact price, or a minimum for "from" offers — never both.
        expect(spec.valueAddedTaxIncluded).toBe(false);
        expect(Number.isFinite(spec.price ?? spec.minPrice)).toBe(true);
        expect(offer.price === undefined).toBe(spec.price === undefined);
      }
    }
    const workshop = nodes.find(
      (n: { name: string }) => n.name === "Team workshop",
    );
    expect(workshop.offers.map((o: { price: string }) => o.price)).toEqual([
      "2000",
      "3500",
    ]);
  });

  it("marks 'from' prices as a minimum, ex-VAT, monthly for the retainer", () => {
    const retainer = nodes.find((n: { name: string }) => n.name === "Retainer");
    expect(retainer.offers[0].price).toBeUndefined();
    expect(retainer.offers[0].priceSpecification).toEqual({
      "@type": "UnitPriceSpecification",
      minPrice: 4000,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
      unitCode: "MON",
    });
  });

  it("takes workshop prices from data/workshops.ts and links its Services", () => {
    const offer = ladder.find((o) => o.id === "workshop")!;
    expect(offer.prices.map((p) => p.amount)).toEqual([
      workshops["half-day"].price,
      workshops["full-day"].price,
    ]);
    const node = ladderServiceJsonLd().find((s) => s.name === offer.name)!;
    expect(node.isRelatedTo).toEqual(
      (["half-day", "full-day"] as const).map((slug) => ({
        "@id": workshopJsonLd(workshops[slug])["@id"],
      })),
    );
  });
});

// #54 R5: the copy says "four tiers, eight offers" (Offers, ServicesHero and
// their RO twins). Change those strings if this fails.
describe("ladder size", () => {
  it("has four tiers and eight offers", () => {
    expect(new Set(ladder.map((o) => o.tier)).size).toBe(4);
    expect(ladder).toHaveLength(8);
  });
});

describe("sprint durations", () => {
  it("the ladder line names the Standard and Scale ranges, EN and RO", () => {
    const en = ladder.find((o) => o.id === "sprint")!.duration;
    const ro = roLadder.find((o) => o.id === "sprint")!.duration;
    expect(en).toContain(sprintDurations[1]);
    expect(en).toContain(sprintDurations[2]);
    expect(ro).toContain(roSprintDurations[1]);
    expect(ro).toContain(roSprintDurations[2]);
  });
});
