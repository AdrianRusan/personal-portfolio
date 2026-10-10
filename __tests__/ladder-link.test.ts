import { ladderEvent } from "@/components/services/LadderLink";

// jsdom resolves the ESM build of @vercel/analytics; the event choice is all
// this suite checks.
jest.mock("@vercel/analytics", () => ({ track: jest.fn() }));

describe("ladderEvent (#43 follow-up)", () => {
  const props = { cta: "audit", source: "services_ladder", offer: "audit" };

  it("sends a cta key on booking links, like every other CTA", () => {
    expect(
      ladderEvent(
        "https://calendly.com/adrian-rusan/new-meeting",
        "audit",
        "services_ladder",
      ),
    ).toEqual(["calendly_click", props]);
  });

  it("tracks mailto and in-page anchors as cta_click", () => {
    expect(ladderEvent("mailto:x@y.z", "audit", "services_ladder")).toEqual([
      "cta_click",
      props,
    ]);
    expect(ladderEvent("#harness", "audit", "services_ladder")).toEqual([
      "cta_click",
      props,
    ]);
  });
});
