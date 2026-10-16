import { ladderEvent } from "@/components/services/LadderLink";

// jsdom resolves the ESM build of @vercel/analytics; the event choice is all
// this suite checks.
jest.mock("@vercel/analytics", () => ({ track: jest.fn() }));

describe("ladderEvent (#43 follow-up)", () => {
  const props = { cta: "audit", source: "services_ladder", offer: "audit" };

  it("sends a cta key on booking links, like every other CTA", () => {
    expect(
      ladderEvent(
        "https://cal.com/adrian-rusan/scoping-call",
        "audit",
        "services_ladder",
      ),
    ).toEqual(["calendly_click", props]);
  });

  it("tracks mailto links as cta_click", () => {
    expect(ladderEvent("mailto:x@y.z", "audit", "services_ladder")).toEqual([
      "cta_click",
      props,
    ]);
  });

  it("leaves in-page anchors untracked (scrolling, not a money action)", () => {
    expect(ladderEvent("#harness", "harness", "services_ladder")).toBeNull();
  });

  it("uses the hero's cta key for the strategy call", () => {
    expect(
      ladderEvent("mailto:x@y.z", "strategy-call", "services_ladder")?.[1].cta,
    ).toBe("strategy_call");
  });
});
