/**
 * @jest-environment node
 */
import {
  BOOKING_URL,
  STRATEGY_CALL_BOOKING_URL,
  STRATEGY_CALL_CTA,
  STRATEGY_CALL_URL,
} from "@/data";
import {
  RO_STRATEGY_CALL_BOOKING_URL,
  RO_STRATEGY_CALL_CTA,
  RO_STRATEGY_CALL_URL,
} from "@/data/ro";
import { isBookingUrl } from "@/lib/booking";

// #151: every booking CTA is on Cal.com (free plan, three live events). The
// Calendly slug "new-meeting" stays live only until this ships.
describe("booking URLs", () => {
  it("point at the three live Cal.com events", () => {
    expect(BOOKING_URL).toBe("https://cal.com/adrian-rusan/scoping-call");
    expect(STRATEGY_CALL_BOOKING_URL).toBe(
      "https://cal.com/adrian-rusan/architecture-session",
    );
    expect(RO_STRATEGY_CALL_BOOKING_URL).toBe(
      "https://cal.com/adrian-rusan/sesiune-arhitectura",
    );
  });

  it("books the paid sessions directly, with no mailto fallback", () => {
    expect(STRATEGY_CALL_URL).toBe(STRATEGY_CALL_BOOKING_URL);
    expect(RO_STRATEGY_CALL_URL).toBe(RO_STRATEGY_CALL_BOOKING_URL);
    expect(STRATEGY_CALL_CTA).toBe("Book the €200 session");
    expect(RO_STRATEGY_CALL_CTA).toBe("Rezervă sesiunea de 110 €");
  });

  // Prefill and UTMs only reach links this matches, so a miss fails silently.
  it("recognises Cal.com links and nothing else", () => {
    expect(isBookingUrl(BOOKING_URL)).toBe(true);
    expect(isBookingUrl(`${STRATEGY_CALL_BOOKING_URL}?topic=x`)).toBe(true);
    expect(isBookingUrl("https://calendly.com/adrian-rusan/new-meeting")).toBe(
      false,
    );
    expect(isBookingUrl("https://cal.com.evil.example/x")).toBe(false);
    expect(isBookingUrl("mailto:a@b.c")).toBe(false);
    expect(isBookingUrl("/teardown")).toBe(false);
  });
});
