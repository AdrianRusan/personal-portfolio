/** @jest-environment node */
import { earlierTestimonial, testimonials } from "@/data";
import { roTestimonials } from "@/data/ro-home";
import { markdownFor } from "@/lib/markdown";

// #76: approved word for word; RO pages carry the RO text.
const EN = {
  tufeanu: "Meticulous, smart and proactive. A true craftsman. Rock solid work.",
  stroe:
    "Adrian was reliable at every step. He ran two product builds in parallel, kept us informed every time, and told us up front when an estimate was too optimistic. He takes problems over and drives them forward without anyone having to push.",
  doros:
    "A careful analysis. He caught the contradictions in the handoff before any code was written, and his corrections were genuinely useful.",
  iojiban:
    "Whatever I flagged, he handled right away. Tasks disappeared as fast as I could add them.",
};
const RO = {
  tufeanu: "Meticulos, smart și proactiv. Un mare meseriaș. Treabă beton.",
  stroe:
    "Adrian a fost de încredere la fiecare pas. A dus două proiecte de produs în paralel, ne-a ținut la curent de fiecare dată și ne-a spus din timp când o estimare era prea optimistă. Preia problemele și le duce mai departe fără să fie nevoie să-l împingă cineva.",
  doros:
    "O analiză atentă. A prins contradicțiile din handoff înainte să se scrie cod, iar corecțiile lui au fost chiar utile.",
  iojiban:
    "Orice semnalam, rezolva imediat. Task-urile dispăreau la fel de repede cum le adăugam.",
};

describe("testimonials", () => {
  it("keeps the approved texts and attributions", () => {
    for (const [key, quote] of Object.entries(EN))
      expect(testimonials[key as keyof typeof EN].quote).toBe(quote);
    for (const [key, quote] of Object.entries(RO))
      expect(roTestimonials[key as keyof typeof RO].quote).toBe(quote);
    expect(Object.values(testimonials).map((t) => `${t.name}, ${t.role}, ${t.company}`)).toEqual([
      "Bogdan Tufeanu, CEO, DentStore",
      "Alexandra Stroe, Co-founder & COO, Bono Fintech",
      "Paul Doros, Lead Developer, partner agency",
      "Teodora Iojiban, Project Manager, Bono Fintech",
    ]);
    expect(roTestimonials.doros.company).toBe("agenție parteneră");
  });

  it.each([
    ["/", "## What people I've worked with say", [EN.tufeanu, EN.stroe]],
    ["/ro", "## Ce spun oamenii cu care am lucrat", [RO.tufeanu, RO.stroe]],
    ["/services", null, [EN.doros, EN.iojiban]],
    ["/ro/servicii", null, [RO.doros, RO.iojiban]],
  ])("renders %s Markdown with its quotes", async (route, heading, quotes) => {
    const md = (await markdownFor(route))!;
    if (heading) expect(md).toContain(heading);
    for (const q of quotes) expect(md).toContain(`> ${q}`);
  });

  it("keeps Tim Claes on /about and /ro/despre only", async () => {
    for (const route of ["/", "/ro", "/services", "/ro/servicii"])
      expect(await markdownFor(route)).not.toContain("Tim Claes");
    for (const [route, label] of [
      ["/about", "Earlier client work"],
      ["/ro/despre", "Proiect anterior pentru un client"],
    ] as const) {
      const md = (await markdownFor(route))!;
      expect(md).toContain(`${label}:`);
      expect(md).toContain(`> ${earlierTestimonial.quote}`);
      expect(md).toContain("> Tim Claes, Freelance mobile & web engineer");
    }
  });
});
