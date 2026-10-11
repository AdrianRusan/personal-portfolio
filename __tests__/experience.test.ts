import fs from "node:fs";
import path from "node:path";
import { FINTECH_EMPLOYER, workExperience } from "@/data";
import { roWorkExperience } from "@/data/ro-home";
import { aboutPage, roAboutPage } from "@/data/pages";

// The confidential receipt project's phrases (EN and RO), not the English word.
const RECEIPT_PROJECT =
  /receipt[- ]?(platform|project|scan|app|process|captur|extract|ocr|pars)|bonuri|bon fiscal|chitan|\bOCR\b/i;

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

  // Confidentiality (orchestrator, 2026-10-11): the receipt platform is Bono
  // client work and needs Bono's written OK, so no public page names it.
  it("never mentions the receipt project on a public surface", () => {
    const files = ["app", "components", "data", "content", "lib", "public"].flatMap((dir) =>
      (fs.readdirSync(dir, { recursive: true }) as string[])
        .filter((f) => /\.(tsx?|mdx?|txt|json|xml)$/.test(f))
        .map((f) => path.join(dir, f))
        .filter((f) => fs.statSync(f).isFile()),
    );
    const hits = files.filter((f) => RECEIPT_PROJECT.test(fs.readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });

  // "receipts" meaning proof (blog posts) is plain English, not the project.
  it("bans the project's phrases, not the word 'receipts'", () => {
    expect(RECEIPT_PROJECT.test("Here are the receipts: 30 reviewed PRs.")).toBe(false);
    for (const phrase of ["receipt scanning", "receipt-processing app", "bonuri fiscale", "chitanțe", "OCR pipeline"])
      expect(RECEIPT_PROJECT.test(phrase)).toBe(true);
  });
});
