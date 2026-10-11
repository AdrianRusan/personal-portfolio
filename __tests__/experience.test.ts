import { workExperience } from "@/data";

// #54 R5: the employer entry has its own neutral card, never another company's image.
describe("work experience", () => {
  it("gives every company a distinct thumbnail", () => {
    const thumbs = workExperience.map((j) => j.thumbnail);
    expect(new Set(thumbs).size).toBe(thumbs.length);
  });

});
