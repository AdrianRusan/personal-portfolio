/**
 * @jest-environment node
 */
// The service components pull in lib/analytics, which imports an ESM package.
jest.mock("@vercel/analytics", () => ({ track: jest.fn() }));

import sitemap from "@/app/sitemap";
import { GET as llmsTxt } from "@/app/llms.txt/route";
import { CREDIT_TERMS, VAT_LINE, faqs, legalEntityLine } from "@/data";
import { RO_CREDIT_TERMS, RO_VAT_LINE } from "@/data/ro";
import { termsPage, roTermsPage } from "@/data/pages";
import {
  roDeliverySprint,
  roHarnessSetup,
  roRetainer,
  roServicesFaq,
  roServicesPageFaq,
} from "@/data/ro-services";
import { deliverySprintCopy } from "@/components/services/DeliverySprint";
import { harnessSetupCopy } from "@/components/services/HarnessSetup";
import { retainerCopy } from "@/components/services/Retainer";
import { servicesFaqCopy } from "@/components/services/ServicesFaq";
import { markdownFor } from "@/lib/markdown";
import { switchLocalePath } from "@/lib/locale";

const text = (p: typeof termsPage) =>
  [p.lead, ...p.sections.map((s) => `${s.heading}\n${s.body}`)].join("\n");

// #152 R6: the terms page, drafted for a lawyer's review before merge.
describe("/terms and /ro/termeni", () => {
  it.each([
    ["EN", termsPage, legalEntityLine, VAT_LINE, CREDIT_TERMS],
    ["RO", roTermsPage, legalEntityLine, RO_VAT_LINE, RO_CREDIT_TERMS],
  ] as const)(
    "%s covers identity, VAT, credit, advance, retainer exit and liability",
    (_l, page, id, vat, credit) => {
      const t = text(page);
      expect(t).toContain(id);
      expect(t).toContain(vat);
      expect(t).toContain(credit);
      expect(t).toMatch(/50%/);
      expect(t).toMatch(/30 (days'|de zile)/);
      expect(t).toMatch(/1355/);
      expect(t).toMatch(/merge-ready|gata de merge/);
    },
  );

  it("is in the sitemap, llms.txt, the Markdown twin and the locale switch", async () => {
    const urls = (await sitemap()).map((e) => new URL(e.url).pathname);
    expect(urls).toEqual(expect.arrayContaining(["/terms", "/ro/termeni"]));
    const llms = await (await llmsTxt()).text();
    expect(llms).toContain("https://www.adrian-rusan.com/terms");
    expect(llms).toContain("https://www.adrian-rusan.com/ro/termeni");
    expect(await markdownFor("/terms")).toContain(legalEntityLine);
    expect(await markdownFor("/ro/termeni")).toContain(legalEntityLine);
    expect(await markdownFor("/ro/termeni")).toContain("Ultima actualizare 15 octombrie 2026");
    expect(switchLocalePath("/terms")).toBe("/ro/termeni");
    expect(switchLocalePath("/ro/termeni")).toBe("/terms");
  });
});

describe("guarantee windows", () => {
  it("limits the security guarantee to 90 days of handoff, EN and RO", () => {
    const en = [
      ...deliverySprintCopy.guarantees.map((g) => g.body),
      retainerCopy.securityNote,
      ...[...faqs, ...servicesFaqCopy.items]
        .filter((f) => /security/i.test(f.question))
        .map((f) => f.answer),
    ];
    const ro = [
      ...roDeliverySprint.guarantees.slice(0, 1).map((g) => g.body),
      roRetainer.securityNote,
      ...[...roServicesFaq.items, ...roServicesPageFaq.items]
        .filter((f) => /securitate/i.test(f.question))
        .map((f) => f.answer),
    ];
    expect(en.filter((s) => /within 90 days of handoff/.test(s))).toHaveLength(
      4,
    );
    expect(ro.filter((s) => /90 de zile de la predare/.test(s))).toHaveLength(
      4,
    );
  });

  it("links the sprint's security guarantee to the terms", () => {
    expect(deliverySprintCopy.guarantees[0]!.link?.href).toBe("/terms");
    expect(roDeliverySprint.guarantees[0]!.link?.href).toBe("/ro/termeni");
  });

  it("caps the free harness sessions at 30 days of handoff, with no session count", () => {
    expect(harnessSetupCopy.guaranteeBody).toMatch(
      /within 30 days of handoff\.$/,
    );
    expect(roHarnessSetup.guaranteeBody).toMatch(/30 de zile de la predare\.$/);
  });
});
