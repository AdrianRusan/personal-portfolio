import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { roPostTitles } from "@/data/ro-home";
import { ladder, ladderServiceJsonLd } from "@/data/ladder";
import { roLadder, formatPriceRo } from "@/data/ro";

// Brief R7 (2026-10-10): /ro prices, EUR ex-VAT. 55% of global, rounded clean.
const R7: Record<string, string> = {
  "strategy-call": "110 €",
  audit: "de la 500 €",
  workshop: "1.100 € jumătate de zi / 1.900 € o zi întreagă",
  automation: "de la 1.650 €",
  harness: "de la 2.200 €",
  "reviewed-pr": "550 €",
  sprint: "de la 4.100 €",
  retainer: "de la 2.200 €/lună",
};

describe("roLadder", () => {
  it("mirrors the global ladder's offers, tiers and availability flags", () => {
    expect(
      roLadder.map(({ id, tier, limited, perMonth }) => ({
        id,
        tier,
        limited,
        perMonth,
      })),
    ).toEqual(
      ladder.map(({ id, tier, limited, perMonth }) => ({
        id,
        tier,
        limited,
        perMonth,
      })),
    );
  });

  it.each(Object.entries(R7))("%s shows the R7 price", (id, expected) => {
    expect(formatPriceRo(roLadder.find((o) => o.id === id)!)).toBe(expected);
  });

  it("prices every point at 55% of global, within 2% rounding", () => {
    roLadder.forEach((ro, i) => {
      const global = ladder[i]!;
      expect(ro.prices).toHaveLength(global.prices.length);
      ro.prices.forEach((p, j) => {
        const target = global.prices[j]!.amount * 0.55;
        expect(Math.abs(p.amount - target) / target).toBeLessThanOrEqual(0.02);
        expect(p.from).toBe(global.prices[j]!.from);
      });
    });
  });

  it("emits Service JSON-LD with RO prices, served in Romania", () => {
    const nodes = JSON.parse(
      JSON.stringify(ladderServiceJsonLd(roLadder, "Romania")),
    );
    expect(nodes).toHaveLength(8);
    expect(nodes[0].areaServed).toBe("Romania");
    expect(nodes[0].offers[0].price).toBe("110");
    expect(nodes[7].offers[0].priceSpecification.minPrice).toBe(2200);
  });
});

describe("roPostTitles", () => {
  // Every published post or case study can reach a /ro card, scheduled ones included.
  const published = ["content/blog", "content/work"].flatMap((dir) =>
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .filter((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data.published)
      .map((f) => f.replace(/\.mdx$/, "")),
  );

  it.each(published)("has a Romanian title for %s", (slug) => {
    expect(roPostTitles[slug]?.title).toBeTruthy();
    expect(roPostTitles[slug]?.description).toBeTruthy();
  });
});
