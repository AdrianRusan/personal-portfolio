import { personJsonLd } from "@/lib/person-schema";

// Round-trip through JSON exactly as layout.tsx serializes it into the page.
const person = JSON.parse(JSON.stringify(personJsonLd));

describe("Person JSON-LD", () => {
  it("is a Person with the stable site @id", () => {
    expect(person["@context"]).toBe("https://schema.org");
    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe("https://www.adrian-rusan.com/#person");
    expect(person.name).toBe("Adrian Rusan");
  });

  it("names the current role and employer", () => {
    expect(person.jobTitle).toContain("Founding Engineer");
    const employers = [person.worksFor].flat();
    expect(employers).toContainEqual(
      expect.objectContaining({
        "@type": "Organization",
        name: "Bono Fintech",
      }),
    );
  });

  it("links GitHub, LinkedIn and X (not twitter.com) with no empty entries", () => {
    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        "https://github.com/AdrianRusan",
        "https://www.linkedin.com/in/adrian-rusan/",
        "https://x.com/adrian_rusan",
      ]),
    );
    for (const url of person.sameAs) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toContain("twitter.com");
    }
  });
});
