import type { Metadata } from "next";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { DeliverySprint } from "@/components/services/DeliverySprint";
import { EntryOffer } from "@/components/services/EntryOffer";
import { TrustStrip } from "@/components/services/TrustStrip";
import { Retainer } from "@/components/services/Retainer";
import { HarnessSetup } from "@/components/services/HarnessSetup";
import { ServicesFaq, faqJsonLd } from "@/components/services/ServicesFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";
import { Ladder } from "@/components/services/Ladder";
import { ladderServiceJsonLd } from "@/data/ladder";
import { roLadder } from "@/data/ro";
import { roClosingCta, roFooter } from "@/data/ro-home";
import { ClosingCta } from "@/components/ClosingCta";
import {
  roDeliverySprint,
  roEntryOffer,
  roHarnessSetup,
  roProcessSteps,
  roRetainer,
  roServicesPageFaq,
  roServicesFinalCta,
  roServicesHero,
  roServicesLadder,
  roTrustStrip,
} from "@/data/ro-services";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

const title = "Servicii AI și prețuri, de la 110 €";
const description =
  "Sesiune de strategie AI, audit, workshop, automatizări, Agent Fleet Setup și sprinturi de livrare revizuite. Prețuri în EUR, fără TVA.";

export const metadata: Metadata = {
  // Bare title — the root layout's title.template appends "| Adrian Rusan"
  title,
  description,
  // Page-level openGraph/twitter replace the layout's, so restate the shared fields
  openGraph: {
    title: `${title} | Adrian Rusan`,
    description,
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://www.adrian-rusan.com/ro/servicii",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Adrian Rusan`,
    description,
    creator: "@adrian_rusan",
  },
  alternates: {
    canonical: "/ro/servicii",
    languages: {
      en: "/services",
      ro: "/ro/servicii",
      "x-default": "/services",
    },
  },
};

// Same sections, order and layout as /services, with Romanian copy.
export default function RoServicesPage() {
  return (
    <div className="relative dark:bg-black-100 bg-white overflow-x-clip">
      <JsonLd
        data={[
          faqJsonLd(roServicesPageFaq.items),
          ...ladderServiceJsonLd(roLadder, "Romania"),
          pageJsonLd({
            path: "/ro/servicii",
            name: title,
            description,
            crumbs: [{ name: "Servicii", path: "/ro/servicii" }],
            inLanguage: "ro-RO",
            home: { name: "Acasă", path: "/ro" },
          }),
        ]}
      />
      <FloatingNav />
      <main id="main">
        <ServicesHero copy={roServicesHero} />
        <Ladder content={roServicesLadder} />
        <ProcessSteps copy={roProcessSteps} />
        <DeliverySprint copy={roDeliverySprint} />
        <EntryOffer copy={roEntryOffer} />
        <TrustStrip copy={roTrustStrip} />
        <Retainer copy={roRetainer} />
        <HarnessSetup copy={roHarnessSetup} />
        <ServicesFaq copy={roServicesPageFaq} />
        <ServicesFinalCta copy={roServicesFinalCta} />
      </main>
      <ClosingCta hideCta copy={roClosingCta} />
      <Footer copy={roFooter} />
    </div>
  );
}
