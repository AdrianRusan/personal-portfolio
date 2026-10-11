/**
 * @jest-environment node
 */
import { CALENDLY_URL } from "@/data";
import { ladder } from "@/data/ladder";
import { roLadder } from "@/data/ro";
import { roDeliverySprint } from "@/data/ro-services";
import {
  calendlyUrl,
  utmFrom,
  withAttribution,
  withTierPrefill,
} from "@/lib/calendly";

// C44: Calendly sees where each booking came from and which offer it was for.
describe("Calendly attribution", () => {
  it("reads only the utm_source/medium/campaign keys of a landing URL", () => {
    expect(
      utmFrom("?utm_source=youtube&utm_medium=video&utm_campaign=x&gclid=1"),
    ).toEqual({
      utm_source: "youtube",
      utm_medium: "video",
      utm_campaign: "x",
    });
    expect(utmFrom("")).toEqual({});
  });

  it("adds the landing UTMs and utm_content=<page> to a Calendly link", () => {
    const url = new URL(
      withAttribution(
        CALENDLY_URL,
        { utm_source: "linkedin", utm_medium: "profile" },
        "/services",
      ),
    );
    expect(url.searchParams.get("utm_source")).toBe("linkedin");
    expect(url.searchParams.get("utm_medium")).toBe("profile");
    expect(url.searchParams.get("utm_content")).toBe("/services");
  });

  it("keeps an existing a1 prefill and is idempotent on a second click", () => {
    const once = withAttribution(
      calendlyUrl(CALENDLY_URL, { a1: "AI Audit (from €900)" }),
      { utm_source: "x" },
      "/",
    );
    expect(withAttribution(once, { utm_source: "x" }, "/")).toBe(once);
    expect(new URL(once).searchParams.get("a1")).toBe("AI Audit (from €900)");
  });

  it("leaves non-Calendly links alone", () => {
    expect(withAttribution("mailto:a@b.c", { utm_source: "x" }, "/")).toBe(
      "mailto:a@b.c",
    );
    expect(withAttribution("/teardown", {}, "/")).toBe("/teardown");
  });

  it("prefills the offer name and price on every ladder booking link, EN and RO", () => {
    for (const offers of [ladder, roLadder]) {
      const booking = offers.flatMap((o) =>
        o.ctas
          .filter((c) => c.href.startsWith(CALENDLY_URL))
          .map((c) => ({ o, a1: new URL(c.href).searchParams.get("a1") })),
      );
      expect(booking.length).toBeGreaterThan(0);
      for (const { o, a1 } of booking) expect(a1).toContain(o.name);
    }
  });

  it("prefills each pricing tier with the price its Price row shows", () => {
    const [col] = withTierPrefill(CALENDLY_URL, [{ name: "Pilot Sprint" }], ["€7,500"]);
    expect(new URL(col!.ctaHref).searchParams.get("a1")).toBe("Pilot Sprint (€7,500)");
    const priceRow = roDeliverySprint.rows.find((r) => r.label === "Preț")!;
    roDeliverySprint.columns.forEach((c, i) => {
      const a1 = new URL(c.ctaHref!).searchParams.get("a1")!;
      expect(priceRow.values[i]).toContain(a1.match(/\((.*)\)/)![1]!);
    });
  });
});
