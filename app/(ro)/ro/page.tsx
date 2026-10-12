import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import ShipVerify from "@/components/ShipVerify";
import Offers from "@/components/Offers";
import CaseStudyCards from "@/components/CaseStudyCards";
import WhoFor from "@/components/WhoFor";
import Bio from "@/components/Bio";
import Testimonials from "@/components/Testimonials";
import { PageShell } from "@/components/PageShell";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { homeFaq } from "@/data";
import { roServicesFaq } from "@/data/ro-services";
import {
  roBio,
  roCallFaq,
  roCaseStudyCards,
  roFaqHeading,
  roHero,
  roOffers,
  roProofBand,
  roShipVerify,
  roTestimonialsSection,
  roWhoFor,
} from "@/data/ro-home";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

const title = "Livrare cu agenți AI, revizuită de un senior";
const description =
  "Agenții AI scriu codul, un inginer senior verifică fiecare PR pentru securitate. Strategie, audituri, workshop-uri și sprinturi, cu prețuri în EUR.";

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
    url: "https://www.adrian-rusan.com/ro",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Adrian Rusan`,
    description,
    creator: "@adrian_rusan",
  },
  alternates: {
    canonical: "/ro",
    languages: { en: "/", ro: "/ro", "x-default": "/" },
  },
};

// Same sections, order and shell as app/(en)/page.tsx; only the copy differs.
export default function RoHome() {
  return (
    <PageShell
      ro
      hideEmailCapture
      closingSource="final_cta"
    >
      <JsonLd
        data={pageJsonLd({
          path: "/ro",
          name: title,
          description,
          crumbs: [],
          inLanguage: "ro-RO",
          home: { name: "Acasă", path: "/ro" },
        })}
      />
      <Hero copy={roHero} />
      <ProofBand copy={roProofBand} />
      <ShipVerify copy={roShipVerify} />
      <CaseStudyCards copy={roCaseStudyCards} />
      <Testimonials copy={roTestimonialsSection} />
      <Offers copy={roOffers} />
      <WhoFor copy={roWhoFor} />
      <Bio copy={roBio} />
      <ServicesFaq
        copy={{
          heading: roFaqHeading,
          items: homeFaq(roServicesFaq.items, roCallFaq),
        }}
      />
    </PageShell>
  );
}
