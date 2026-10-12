import { perEngineer, workshops, workshopJsonLd } from "@/data/workshops";

const full = workshops["full-day"];
const half = workshops["half-day"];

describe("workshops data", () => {
  it("uses the guide's prices and group cap", () => {
    expect(full.price).toBe(5000);
    expect(half.price).toBe(3000);
    expect(full.maxPeople).toBe(10);
    expect(half.maxPeople).toBe(10);
  });

  it("full day is morning orchestration + afternoon review gates", () => {
    // R2-F29: topic and length, not time of day.
    expect(full.agenda.map((p) => p.label)).toEqual(["Setup", "Review gates"]);
    expect(half.agenda.map((p) => [p.label, p.duration])).toEqual([
      ["Setup", "2.5 hours"],
      ["Review gates", "1 hour"],
    ]);
  });

  it("half day is the full-day morning plus a one-hour review-gates block", () => {
    expect(half.agenda[0]?.blocks.map((b) => b.title)).toEqual(
      full.agenda[0]?.blocks.map((b) => b.title),
    );
    expect(half.agenda).toHaveLength(2);
    expect(half.agenda[1]?.duration).toBe("1 hour");
  });

  it("meta description states the same price as the Offer", () => {
    expect(full.description).toContain("€5,000 ex-VAT");
    expect(half.description).toContain("€3,000 ex-VAT");
  });

  // C43 / D6
  it("puts a clock time on every block, inside 09:00–12:30 and 09:00–17:00", () => {
    const times = (w: typeof full) =>
      w.agenda.flatMap((p) => p.blocks.map((b) => b.time));
    expect(times(half).every(Boolean)).toBe(true);
    expect(times(full).every(Boolean)).toBe(true);
    expect(times(half)[0]).toMatch(/^09:00/);
    expect(times(half).at(-1)).toMatch(/12:30$/);
    expect(times(full).at(-1)).toMatch(/17:00$/);
  });

  it("states the per-engineer price at the group cap", () => {
    expect(perEngineer(half)).toBe("€300 per engineer at 10 people");
    expect(perEngineer(full)).toBe("€500 per engineer at 10 people");
  });

  it("keeps meta descriptions within 155 characters, price included", () => {
    for (const w of [full, half]) {
      expect(w.description.length).toBeLessThanOrEqual(155);
      expect(w.description.slice(0, 60)).toContain("Claude Code workshop");
    }
  });

  it("CTA is an email ask, never the scoping-call link", () => {
    for (const w of [full, half]) {
      expect(w.cta.href.startsWith("mailto:")).toBe(true);
      expect(w.cta.label).not.toMatch(/^book/i);
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
      price: 5000,
      priceCurrency: "EUR",
    });
  });
});
