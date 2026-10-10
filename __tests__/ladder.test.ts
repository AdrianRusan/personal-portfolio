import { ladder, formatPrice } from "@/data/ladder";

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
