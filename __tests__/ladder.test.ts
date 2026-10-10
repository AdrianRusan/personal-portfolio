import { ladder, formatPrice, ladderServiceJsonLd } from "@/data/ladder";

// The guide's ladder table (2026-10-10), verbatim. EUR, ex-VAT, global.
const GUIDE: Record<string, { tier: string; price: string; duration: string }> =
  {
    "strategy-call": { tier: "Advise", price: "€200", duration: "1 h" },
    audit: { tier: "Advise", price: "from €900", duration: "2–3 days" },
    workshop: {
      tier: "Train",
      price: "€2,000 half-day / €3,500 full day",
      duration: "4–8 h",
    },
    automation: { tier: "Build", price: "from €3,000", duration: "1–3 wk" },
    harness: { tier: "Build", price: "from €4,000", duration: "1 wk" },
    "reviewed-pr": { tier: "Ship", price: "€1,000", duration: "~48 h" },
    sprint: { tier: "Ship", price: "from €7,500", duration: "1–2 wk" },
    retainer: { tier: "Ship", price: "from €4,000/month", duration: "monthly" },
  };

describe("ladder", () => {
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
        expect(offer.price).toMatch(/^\d+$/);
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
    expect(retainer.offers[0].priceSpecification).toEqual({
      "@type": "UnitPriceSpecification",
      minPrice: 4000,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
      unitText: "MONTH",
    });
  });
});
