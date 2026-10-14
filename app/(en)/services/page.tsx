import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { DeliverySprint } from "@/components/services/DeliverySprint";
import { EntryOffer } from "@/components/services/EntryOffer";
import { TrustStrip } from "@/components/services/TrustStrip";
import { Retainer } from "@/components/services/Retainer";
import { HarnessSetup } from "@/components/services/HarnessSetup";
import {
  ServicesFaq,
  faqJsonLd,
  servicesFaqCopy,
} from "@/components/services/ServicesFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";
import { Ladder } from "@/components/services/Ladder";
import { QuoteBand } from "@/components/Testimonials";
import { SERVICES_DESCRIPTION, SERVICES_TITLE, testimonials } from "@/data";
import { ladderServiceJsonLd } from "@/data/ladder";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

const TITLE = SERVICES_TITLE;
const DESCRIPTION = SERVICES_DESCRIPTION;

export const metadata: Metadata = {
  // Bare title — the root layout's title.template appends "| Adrian Rusan"
  title: TITLE,
  description: DESCRIPTION,
  // Page-level openGraph/twitter replace the layout's, so restate the shared fields
  openGraph: {
    title: `${TITLE} | Adrian Rusan`,
    description: DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/services",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Adrian Rusan`,
    description: DESCRIPTION,
    creator: "@adrian_rusan",
  },
  alternates: {
    canonical: "/services",
    languages: {
      en: "/services",
      ro: "/ro/servicii",
      "x-default": "/services",
    },
  },
};

const ServicesFaqJsonLd = () => (
  <script
    type="application/ld+json"
    // Static data, JSON.stringify()-escaped. Built from the same items the
    // visible FAQ renders, so the schema can't drift from the page.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqJsonLd(servicesFaqCopy.items)),
    }}
  />
);

const ServicesJsonLd = () => (
  <script
    type="application/ld+json"
    // Static data, JSON.stringify()-escaped — same pattern as the FAQ JSON-LD.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(ladderServiceJsonLd()) }}
  />
);


export default function ServicesPage() {
  return (
    <PageShell hideFooterCta hideEmailCapture>
      <ServicesFaqJsonLd />
      <ServicesJsonLd />
      <JsonLd
        data={pageJsonLd({
          path: "/services",
          name: TITLE,
          description: DESCRIPTION,
          crumbs: [{ name: "Services", path: "/services" }],
        })}
      />
      <ServicesHero aside={<TrustStrip />} />
      <Ladder />
      <ProcessSteps />
      <DeliverySprint />
      <QuoteBand testimonial={testimonials.doros} />
      <EntryOffer />
      <Retainer />
      <QuoteBand testimonial={testimonials.iojiban} />
      <HarnessSetup />
      <ServicesFaq />
      <ServicesFinalCta />
    </PageShell>
  );
}
