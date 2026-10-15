import { LEGAL_ENTITY, VAT_LINE, legalEntityLine, faqs } from "@/data";
import { RO_VAT_LINE } from "@/data/ro";
import { contactPage, roContactPage, privacyPage } from "@/data/pages";
import { roServicesFaq } from "@/data/ro-services";
import { servicesFaqCopy } from "@/components/services/ServicesFaq";
import { organizationJsonLd } from "@/lib/person-schema";

// #149: Law 365/2002 art. 5, the provider identity from the PFA's registration
// certificate, shown in the footer, on /contact and in the JSON-LD.
describe("LEGAL_ENTITY", () => {
  it("holds the certificate's identity and no phone", () => {
    expect(LEGAL_ENTITY).toEqual({
      name: "RUSAN ADRIAN-IONUȚ PERSOANĂ FIZICĂ AUTORIZATĂ",
      cui: "49119790",
      registry: "F40/8516/2023",
      seat: "B-dul Bucureștii Noi 136, parter, ap. 5, Sector 1, București",
      email: "rusan.adrian.ionut@gmail.com",
    });
    expect(JSON.stringify(LEGAL_ENTITY)).not.toMatch(/phone|tel|\+40/i);
  });

  it("renders one line with name, CUI, registry number, seat and email", () => {
    expect(legalEntityLine).toBe(
      "RUSAN ADRIAN-IONUȚ PERSOANĂ FIZICĂ AUTORIZATĂ · CUI 49119790 · Reg. Com. F40/8516/2023 · B-dul Bucureștii Noi 136, parter, ap. 5, Sector 1, București · rusan.adrian.ionut@gmail.com",
    );
  });

  it("is on /contact and /ro/contact", () => {
    for (const page of [contactPage, roContactPage]) {
      const text = page.sections.map((s) => s.body).join("\n");
      expect(text).toContain(legalEntityLine);
    }
  });

  it("puts taxID and the registry number on the Organization JSON-LD", () => {
    const org = JSON.parse(JSON.stringify(organizationJsonLd));
    expect(org.legalName).toBe(LEGAL_ENTITY.name);
    expect(org.taxID).toBe("49119790");
    expect(org.identifier).toEqual({
      "@type": "PropertyValue",
      propertyID: "Reg. Com.",
      value: "F40/8516/2023",
    });
  });

  it("names the PFA and its CUI as data controller, Stripe as a processor", () => {
    const text = privacyPage.sections.map((s) => s.body).join("\n");
    expect(text).toContain(`${LEGAL_ENTITY.name} (CUI ${LEGAL_ENTITY.cui})`);
    expect(text).toMatch(/\*\*Stripe\*\*/);
  });
});

// #149 R2: one VAT sentence wherever prices are explained, EN and RO.
describe("VAT line", () => {
  it("is the agreed sentence", () => {
    expect(VAT_LINE).toBe("Prices exclude VAT; VAT is added where it applies.");
    expect(RO_VAT_LINE).toBe(
      "Prețurile nu includ TVA; TVA-ul se adaugă acolo unde se aplică.",
    );
  });

  it("replaces 'excluding VAT' in the payment-terms answers", () => {
    const en = [...faqs, ...servicesFaqCopy.items]
      .map((f) => f.answer)
      .join(" ");
    const ro = roServicesFaq.items.map((f) => f.answer).join(" ");
    expect(en).toContain(VAT_LINE);
    expect(en).not.toMatch(/excluding VAT/);
    expect(ro).toContain(RO_VAT_LINE);
    expect(ro).not.toMatch(/fără TVA/);
  });
});
