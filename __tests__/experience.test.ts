import { FINTECH_EMPLOYER, workExperience } from "@/data";
import { roWorkExperience } from "@/data/ro-home";
import { aboutPage, roAboutPage } from "@/data/pages";

describe("work experience", () => {
  // C30 (U12): one title spelling and en-dash periods.
  it("spells full-stack one way and uses en-dash periods", () => {
    for (const job of workExperience) {
      expect(job.title).not.toMatch(/Full[ -]Stack/);
      expect(job.period).toMatch(/^[A-Z]?[a-z]* ?\d{4} – (Present|[A-Z][a-z]{2} \d{4})$/);
    }
  });

  // P2 (A2, memory bono-contract-nda): the PFA is the umbrella and Bono a
  // client under it, at LinkedIn level, with no product detail or numbers.
  it("lists Bono only as a client line under the PFA", () => {
    const [pfa, ...rest] = workExperience;
    expect(pfa?.company).toBe("Rusan Adrian-Ionuț PFA");
    expect(pfa?.client).toMatch(new RegExp(`^Client: ${FINTECH_EMPLOYER}, founding engineer \\(contract\\)`));
    expect(rest.some((j) => JSON.stringify(j).includes(FINTECH_EMPLOYER))).toBe(false);
    for (const text of [aboutPage, roAboutPage, workExperience, roWorkExperience].map((x) => JSON.stringify(x))) {
      expect(text).not.toMatch(/company-formation|înființare|80%/);
    }
  });
});
