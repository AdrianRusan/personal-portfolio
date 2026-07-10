import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("supports conditional/array inputs", () => {
    expect(cn("a", ["b", "c"], { d: true, e: false })).toBe("a b c d");
  });

  it("dedupes conflicting Tailwind utilities (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-white-200", "text-purple")).toBe("text-purple");
  });
});
