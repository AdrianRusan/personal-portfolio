/**
 * @jest-environment node
 */
import { BOOKING_URL } from "@/data";
import { ladder } from "@/data/ladder";
import { roLadder } from "@/data/ro";
import { roDeliverySprint } from "@/data/ro-services";
import {
  bookingUrl,
  isBookingUrl,
  utmFrom,
  withAttribution,
  withTierPrefill,
} from "@/lib/booking";

// C44 / #151: Cal.com sees where each booking came from and which offer it was
// for (the Scoping Call's `topic` field).
describe("booking attribution", () => {
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

  it("adds the landing UTMs and utm_content=<page> to a Cal.com link", () => {
    const url = new URL(
      withAttribution(
        BOOKING_URL,
        { utm_source: "linkedin", utm_medium: "profile" },
        "/services",
      ),
    );
    expect(url.searchParams.get("utm_source")).toBe("linkedin");
    expect(url.searchParams.get("utm_medium")).toBe("profile");
    expect(url.searchParams.get("utm_content")).toBe("/services");
  });

  it("keeps an existing topic prefill and is idempotent on a second click", () => {
    const once = withAttribution(
      bookingUrl(BOOKING_URL, { topic: "AI Code Audit (from €1,500)" }),
      { utm_source: "x" },
      "/",
    );
    expect(withAttribution(once, { utm_source: "x" }, "/")).toBe(once);
    expect(new URL(once).searchParams.get("topic")).toBe("AI Code Audit (from €1,500)");
  });

  it("leaves non-booking links alone", () => {
    expect(
      withAttribution("https://calendly.com/x", { utm_source: "x" }, "/"),
    ).toBe("https://calendly.com/x");
    expect(withAttribution("mailto:a@b.c", { utm_source: "x" }, "/")).toBe(
      "mailto:a@b.c",
    );
    expect(withAttribution("/teardown", {}, "/")).toBe("/teardown");
  });

  it("prefills the offer name and price on every ladder Scoping Call link, EN and RO", () => {
    for (const offers of [ladder, roLadder]) {
      const booking = offers.flatMap((o) =>
        o.ctas
          .filter((c) => c.href.startsWith(BOOKING_URL))
          .map((c) => ({ o, url: new URL(c.href) })),
      );
      expect(booking.length).toBeGreaterThan(0);
      for (const { o, url } of booking) {
        expect(url.searchParams.get("topic")).toContain(o.name);
        expect(url.searchParams.has("a1")).toBe(false);
      }
    }
  });

  // The paid events ask "what do you want built"; an offer name isn't an answer.
  it("leaves the paid-session links unprefilled", () => {
    for (const offers of [ladder, roLadder]) {
      const [cta] = offers.find((o) => o.id === "strategy-call")!.ctas;
      expect(isBookingUrl(cta!.href)).toBe(true);
      expect(new URL(cta!.href).search).toBe("");
    }
  });

  it("prefills each pricing tier with the price its Price row shows", () => {
    const [col] = withTierPrefill(BOOKING_URL, [{ name: "Pilot Sprint" }], ["€7,500"]);
    expect(new URL(col!.ctaHref).searchParams.get("topic")).toBe("Pilot Sprint (€7,500)");
    const priceRow = roDeliverySprint.rows.find((r) => r.label === "Preț")!;
    roDeliverySprint.columns.forEach((c, i) => {
      const topic = new URL(c.ctaHref!).searchParams.get("topic")!;
      expect(priceRow.values[i]).toContain(topic.match(/\((.*)\)/)![1]!);
    });
  });
});
