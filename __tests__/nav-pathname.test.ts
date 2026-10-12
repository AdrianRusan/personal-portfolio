import { navPathname } from "@/lib/locale";

// A4 F15: on Vercel the prerendered EN home reports "/index".
describe("navPathname", () => {
  it("folds the prerendered /index back to its route", () => {
    expect(navPathname("/index")).toBe("/");
    expect(navPathname("/ro/index")).toBe("/ro");
  });

  it("leaves real paths alone", () => {
    for (const p of ["/", "/ro", "/services", "/blog/index-of-posts"])
      expect(navPathname(p)).toBe(p);
  });
});
