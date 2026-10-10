/**
 * @jest-environment node
 */
import { CALENDLY_URL } from "@/data";

// The old "scoping-call" slug 404s on Calendly, which killed every booking CTA.
describe("CALENDLY_URL", () => {
  it("does not point at the dead /scoping-call slug", () => {
    expect(CALENDLY_URL).not.toMatch(/\/scoping-call$/);
  });

  it("points at the active Scoping Call event", () => {
    expect(CALENDLY_URL).toBe("https://calendly.com/adrian-rusan/new-meeting");
  });
});
