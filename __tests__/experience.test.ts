import { FINTECH_EMPLOYER, workExperience } from "@/data";

// #54 R5: the employer entry has its own neutral card, never another company's image.
describe("work experience", () => {
  it("gives every company a distinct thumbnail", () => {
    const thumbs = workExperience.map((j) => j.thumbnail);
    expect(new Set(thumbs).size).toBe(thumbs.length);
  });

  it("describes the employer with no product, technology or number", () => {
    const job = workExperience.find((j) => j.company === FINTECH_EMPLOYER);
    expect(job?.desc).toBe(
      "Founding engineer at Bono Fintech, 2024–present: full-stack product engineering, end to end.",
    );
  });
});
