import { localeOf, switchLocalePath } from "@/lib/locale";

describe("switchLocalePath", () => {
  it.each([
    ["/", "/ro"],
    ["/services", "/ro/servicii"],
    ["/ro", "/"],
    ["/ro/servicii", "/services"],
    // No RO equivalent yet: EN-only pages switch to the RO homepage
    ["/blog/what-agents-get-wrong", "/ro"],
    ["/teardown", "/ro"],
  ])("%s → %s", (from, to) => {
    expect(switchLocalePath(from)).toBe(to);
  });
});

describe("localeOf", () => {
  it.each([
    ["/ro", "ro"],
    ["/ro/servicii", "ro"],
    ["/", "en"],
    ["/robots.txt", "en"],
    ["/services", "en"],
  ])("%s is %s", (path, locale) => {
    expect(localeOf(path)).toBe(locale);
  });
});
