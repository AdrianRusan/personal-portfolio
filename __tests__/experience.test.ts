import { workExperience } from "@/data";

// #54 R5: the employer entry has its own neutral card, never another company's image.
describe("work experience", () => {
  it("never reuses a thumbnail, and has no clipart left (C30)", () => {
    const thumbs = workExperience.flatMap((j) =>
      j.thumbnail ? [j.thumbnail] : [],
    );
    expect(new Set(thumbs).size).toBe(thumbs.length);
    expect(thumbs.some((t) => t.includes("utfs.io"))).toBe(false);
  });

  // C30 (U12): one title spelling and en-dash periods.
  it("spells full-stack one way and uses en-dash periods", () => {
    for (const job of workExperience) {
      expect(job.title).not.toMatch(/Full[ -]Stack/);
      expect(job.period).toMatch(/^[A-Z]?[a-z]* ?\d{4} – (Present|[A-Z][a-z]{2} \d{4})$/);
    }
  });

});
