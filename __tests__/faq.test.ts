import { faqs, faqPageJsonLd, homeFaq, homeFaqs } from "@/data";
import { roCallFaq } from "@/data/ro-home";
import { roServicesFaq, roServicesPageFaq } from "@/data/ro-services";
import { faqJsonLd, servicesFaqCopy } from "@/components/services/ServicesFaq";

describe("FAQ", () => {
  // Brief R6: the objections a buyer raises before booking.
  it.each([
    ["data", /data/i],
    ["IP", /own/i],
    ["NDA", /NDA/],
    ["security", /security/i],
    ["timezone", /timezone/i],
    ["payment terms", /payment/i],
    ["agent failure", /agents get it wrong/i],
    // C16 (F12)
    ["stack", /stacks/i],
    ["LLM cost", /LLM and API usage/i],
    ["PR size", /one PR/i],
    ["invoicing", /invoices/i],
  ])("answers the %s objection", (_topic, pattern) => {
    expect(faqs.some((f) => pattern.test(f.question))).toBe(true);
  });

  it("has 14 questions in EN and RO, and the FAQPage carries all 14", () => {
    expect(faqs).toHaveLength(14);
    expect(roServicesFaq.items).toHaveLength(14);
    expect(faqPageJsonLd().mainEntity).toHaveLength(14);
  });

  // D5: usage included, EUR via the Romanian company, and no VAT-status claim.
  it("states the LLM-cost and invoicing facts without a reverse-charge claim", () => {
    const text = faqs.map((f) => f.answer).join(" ");
    expect(text).toContain(
      "LLM/API usage is included in the fixed price for sprints and reviewed PRs.",
    );
    expect(text).toContain("Invoiced in EUR by my Romanian company; USD on request.");
    expect(text).not.toMatch(/reverse.charge/i);
  });

  it("builds FAQPage JSON-LD from the visible FAQ, verbatim", () => {
    const ld = JSON.parse(JSON.stringify(faqPageJsonLd()));
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toEqual(
      faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    );
  });
});

// #54 R3: the homepage shows six questions, and /ro shows the same six.
describe("homepage FAQ", () => {
  it("has six questions, the call steps last", () => {
    expect(homeFaqs).toHaveLength(6);
    expect(homeFaqs.at(-1)?.question).toBe("What happens after I book a call?");
    expect(homeFaqs.slice(0, 5).every((f) => faqs.includes(f))).toBe(true);
  });

  it("picks the same questions on /ro", () => {
    const ro = homeFaq(roServicesFaq.items, roCallFaq);
    expect(ro).toHaveLength(6);
    expect(ro.slice(0, 5).map((f) => roServicesFaq.items.indexOf(f))).toEqual(
      homeFaqs.slice(0, 5).map((f) => faqs.indexOf(f)),
    );
  });
});

// R2-F10: /services and /ro/servicii show 8 merged questions that still cover
// every objection above, and their FAQPage carries exactly those 8.
describe("services FAQ", () => {
  const items = servicesFaqCopy.items;

  it("has 8 questions in EN and RO", () => {
    expect(items).toHaveLength(8);
    expect(roServicesPageFaq.items).toHaveLength(8);
  });

  it.each([
    /data/i,
    /own/i,
    /NDA/,
    /security/i,
    /timezone/i,
    /payment/i,
    /agents get it wrong/i,
    /stacks/i,
    /LLM and API usage/i,
    /one PR/i,
    /invoices/i,
  ])("still answers %s", (pattern) => {
    expect(items.some((f) => pattern.test(f.question))).toBe(true);
  });

  it("keeps the LLM-cost and invoicing facts", () => {
    const text = items.map((f) => f.answer).join(" ");
    expect(text).toContain(
      "LLM/API usage is included in the fixed price for sprints and reviewed PRs.",
    );
    expect(text).toContain("Invoiced in EUR by my Romanian company; USD on request.");
    expect(text).not.toMatch(/reverse.charge/i);
  });

  it("builds FAQPage JSON-LD from the visible items, verbatim", () => {
    for (const list of [items, roServicesPageFaq.items]) {
      const ld = JSON.parse(JSON.stringify(faqJsonLd(list)));
      expect(ld["@type"]).toBe("FAQPage");
      expect(ld.mainEntity).toEqual(
        list.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      );
    }
  });
});
