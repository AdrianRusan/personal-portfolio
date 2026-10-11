import { faqs, faqPageJsonLd, homeFaq, homeFaqs } from "@/data";
import { roCallFaq } from "@/data/ro-home";
import { roServicesFaq } from "@/data/ro-services";

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
  ])("answers the %s objection", (_topic, pattern) => {
    expect(faqs.some((f) => pattern.test(f.question))).toBe(true);
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
