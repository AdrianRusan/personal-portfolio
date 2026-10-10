import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import ShipVerify from "@/components/ShipVerify";
import Offers from "@/components/Offers";
import CaseStudy from "@/components/CaseStudy";
import CaseStudyCards from "@/components/CaseStudyCards";
import WhoFor from "@/components/WhoFor";
import FinalCta from "@/components/FinalCta";
import EmailCapture from "@/components/EmailCapture";
import Bio from "@/components/Bio";
import Latest from "@/components/Latest";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { StartBand } from "@/components/StartBand";
import {
  TestimonialSkeleton,
  ExperienceSkeleton,
} from "@/components/ui/Skeleton";
import {
  roBio,
  roCaseStudy,
  roCaseStudyCards,
  roEmailCapture,
  roExperience,
  roFinalCta,
  roFooter,
  roHero,
  roLatest,
  roOffers,
  roProofBand,
  roShipVerify,
  roStartBand,
  roTestimonials,
  roWhoFor,
} from "@/data/ro-home";
import { roNavItems } from "./nav";

const title = "Livrare de software cu agenți AI, revizuită de un senior";
const description =
  "Agenții AI scriu codul, un inginer senior verifică fiecare PR pentru securitate. Sesiuni de strategie, audituri, workshop-uri și sprinturi, cu prețuri în EUR pentru România.";

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

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <section className="py-20" aria-label="Se încarcă recomandările">
      <TestimonialSkeleton />
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
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav
        navItems={roNavItems}
        ctaLabel="Programează"
        ctaSource="ro_floating_nav"
      />
      <Hero copy={roHero} />
      <ProofBand copy={roProofBand} />
      <div id="subscribe" className="max-w-7xl mx-auto px-5 sm:px-10 py-10">
        <EmailCapture copy={roEmailCapture} />
      </div>
      <ShipVerify copy={roShipVerify} />
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10">
        <Bio copy={roBio} />
      </div>
      <Offers copy={roOffers} />
      <CaseStudy copy={roCaseStudy} />
      <CaseStudyCards copy={roCaseStudyCards} />
      <StartBand copy={roStartBand} />
      <WhoFor copy={roWhoFor} />
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <section aria-label="Experiență">
          <Experience copy={roExperience} />
        </section>
        <section id="testimonials" aria-labelledby="testimonials-heading">
          <Testimonials copy={roTestimonials} />
        </section>
      </div>
      <Latest copy={roLatest} />
      <FinalCta copy={roFinalCta} />
      <Footer copy={roFooter} locale="ro" />
    </main>
  );
}
