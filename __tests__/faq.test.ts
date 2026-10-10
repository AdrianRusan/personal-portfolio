import { faqs, faqPageJsonLd } from "@/data";

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
