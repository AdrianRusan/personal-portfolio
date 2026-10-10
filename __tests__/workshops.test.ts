import { workshops, workshopJsonLd } from "@/data/workshops";

const full = workshops["full-day"];
const half = workshops["half-day"];

describe("workshops data", () => {
  it("uses the guide's prices and group cap", () => {
    expect(full.price).toBe(3500);
    expect(half.price).toBe(2000);
    expect(full.maxPeople).toBe(10);
    expect(half.maxPeople).toBe(10);
  });

  it("full day is morning orchestration + afternoon review gates", () => {
    expect(full.agenda.map((p) => p.label)).toEqual(["Morning", "Afternoon"]);
  });

  it("half day is the full-day morning plus a one-hour review-gates block", () => {
    expect(half.agenda[0]).toBe(full.agenda[0]);
    expect(half.agenda).toHaveLength(2);
    expect(half.agenda[1]?.duration).toBe("1 hour");
  });

  it("meta description states the same price as the Offer", () => {
    expect(full.description).toContain("€3,500 ex-VAT");
    expect(half.description).toContain("€2,000 ex-VAT");
  });

  it("CTA is an email ask, never the scoping-call link", () => {
    for (const w of [full, half]) {
      expect(w.cta.href.startsWith("mailto:")).toBe(true);
      expect(w.cta.href).not.toContain("scoping-call");
    }
  });
});

describe("workshopJsonLd", () => {
  it("emits a parseable Service with a EUR price and the #person provider", () => {
    const ld = JSON.parse(JSON.stringify(workshopJsonLd(full)));
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Service");
    expect(ld.url).toBe("https://www.adrian-rusan.com/workshops/full-day");
    expect(ld.provider["@id"]).toBe("https://www.adrian-rusan.com/#person");
    expect(ld.offers).toMatchObject({
      "@type": "Offer",
      price: 3500,
      priceCurrency: "EUR",
    });
  });
});
