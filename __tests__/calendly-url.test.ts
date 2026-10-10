/**
 * @jest-environment node
 */
import { CALENDLY_URL } from "@/data";

// The old "scoping-call" slug 404s on Calendly, which killed every booking CTA.
describe("CALENDLY_URL", () => {
  it("does not point at the dead /scoping-call slug", () => {
    expect(CALENDLY_URL).not.toMatch(/\/scoping-call$/);
  });
});
