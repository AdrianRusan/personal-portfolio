import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import ShipVerify from "@/components/ShipVerify";
import Offers from "@/components/Offers";
import CaseStudyCards from "@/components/CaseStudyCards";
import WhoFor from "@/components/WhoFor";
import FinalCta from "@/components/FinalCta";
import Bio from "@/components/Bio";
import Latest from "@/components/Latest";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Testimonials from "@/components/Testimonials";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ExperienceSkeleton } from "@/components/ui/Skeleton";
import { homeFaq } from "@/data";
import { roServicesFaq } from "@/data/ro-services";
import {
  roBio,
  roCallFaq,
  roCaseStudyCards,
  roExperience,
  roClosingCta,
  roFinalCta,
  roFooter,
  roHero,
  roLatest,
  roOffers,
  roProofBand,
  roShipVerify,
  roTestimonials,
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

// Same sections, order and shell as app/page.tsx; only the copy differs.
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <section className="py-20" aria-label="Se încarcă experiența">
      <ExperienceSkeleton />
    </section>
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <footer
      className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800"
      aria-label="Se încarcă subsolul"
    />
  ),
});

export default function RoHome() {
  return (
    <div className="relative dark:bg-black-100 bg-white overflow-hidden">
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
      <FloatingNav />
      <main id="main">
        <Hero copy={roHero} />
        <ProofBand copy={roProofBand} />
        <ShipVerify copy={roShipVerify} />
        <CaseStudyCards copy={roCaseStudyCards} />
        <Offers copy={roOffers} />
        <WhoFor copy={roWhoFor} />
        <section
          aria-label="Experiență"
          className="max-w-7xl mx-auto px-5 sm:px-10 py-10"
        >
          <Bio copy={roBio} />
          <Testimonials copy={roTestimonials} />
          <Experience copy={roExperience} />
        </section>
        <Latest copy={roLatest} />
        <ServicesFaq
          copy={{
            ...roServicesFaq,
            items: homeFaq(roServicesFaq.items, roCallFaq),
          }}
        />
        <FinalCta copy={roFinalCta} closing={roClosingCta} />
      </main>
      <Footer copy={roFooter} />
    </div>
  );
}
