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
  RO_HOME_DESCRIPTION,
  RO_HOME_TITLE,
  roOffers,
  roProofBand,
  roShipVerify,
  roTestimonialsSection,
  roWhoFor,
} from "@/data/ro-home";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";
// PROTOTYPE (branch prototype/ro-non-tech): ?variant=A|B|C swaps the page body.
import { Suspense } from "react";
import { PrototypeSwitcher } from "@/components/prototype/PrototypeSwitcher";
import { VariantA, VariantB, VariantC } from "@/components/prototype/RoNonTechVariants";

const PROTOTYPE_VARIANTS = [
  { key: "0", name: "pagina de azi" },
  { key: "A", name: "trei uși" },
  { key: "B", name: "ce vă mănâncă timpul" },
  { key: "C", name: "patru pași" },
];

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

const title = RO_HOME_TITLE;
const description = RO_HOME_DESCRIPTION;

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
export default async function RoHome({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const Prototype = variant === "A" ? VariantA : variant === "B" ? VariantB : variant === "C" ? VariantC : null;
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
      {Prototype ? <Prototype /> : <>
      <Hero copy={roHero} aside={<ProofBand copy={roProofBand} />} />
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
      </>}
      <Suspense>
        <PrototypeSwitcher variants={PROTOTYPE_VARIANTS} />
      </Suspense>
    </PageShell>
  );
}
