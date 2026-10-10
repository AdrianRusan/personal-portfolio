/**
 * @jest-environment jsdom
 */
const mockTrack = jest.fn();
jest.mock("@vercel/analytics", () => ({ track: mockTrack }));

// Same section components render on / and /ro, so every event carries the
// page locale to keep the RO funnel separable from the EN one.
describe("track() — locale tag (production path)", () => {
  const env = process.env;
  beforeEach(() => {
    process.env = { ...env, NODE_ENV: "production" };
    mockTrack.mockClear();
  });
  afterAll(() => {
    process.env = env;
  });

  it.each([
    ["/ro/servicii", "ro"],
    ["/services", "en"],
  ])("on %s tags locale=%s", (path, locale) => {
    window.history.pushState({}, "", path);
    jest.isolateModules(() => {
      const { track } = require("../lib/analytics");
      track("calendly_click", { source: "hero" });
    });
    expect(mockTrack).toHaveBeenCalledWith("calendly_click", {
      source: "hero",
      locale,
    });
  });
});
