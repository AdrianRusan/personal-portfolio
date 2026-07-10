/**
 * @jest-environment node
 */
import { track } from "@/lib/analytics";

// Jest runs with NODE_ENV=test, so config.isProduction is false — track() takes
// the dev path: it runs the PII guard, then no-ops (no event is sent).
describe("track() — PII guard (dev path)", () => {
  it("throws when a prop key looks like PII", () => {
    expect(() => track("cta_click", { email: "founder@startup.io" })).toThrow(
      /PII/i,
    );
    expect(() => track("cta_click", { fullName: "Jane" })).toThrow(/PII/i);
    expect(() => track("email_submit", { phone: "123" })).toThrow(/PII/i);
  });

  it("does not throw for safe props", () => {
    expect(() => track("calendly_click", { source: "hero" })).not.toThrow();
    expect(() => track("teardown_request")).not.toThrow();
    expect(() =>
      track("cta_click", { position: 2, featured: true }),
    ).not.toThrow();
  });
});
