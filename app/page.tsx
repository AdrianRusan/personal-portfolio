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
import {
  ServicesFaq,
  servicesFaqCopy,
} from "@/components/services/ServicesFaq";
import Testimonials from "@/components/Testimonials";
import { homeFaqs, navItems } from "@/data";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ExperienceSkeleton } from "@/components/ui/Skeleton";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

// Only the alternates override the layout; canonical restated since this replaces it.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.adrian-rusan.com",
    languages: { en: "/", ro: "/ro", "x-default": "/" },
  },
};

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <section className="py-20" aria-label="Experience loading">
      <ExperienceSkeleton />
    </section>
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <footer
      className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800"
      aria-label="Footer loading"
    />
  ),
});

// #54 R3: eleven sections. The mid-page email capture, StartBand, the method
// demo, CallSteps and the standalone testimonial were cut or folded in.
export default function Home() {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav navItems={navItems} />
      <Hero />
      <ProofBand />
      <ShipVerify />
      <CaseStudyCards />
      <Offers />
      <WhoFor />
      <section
        aria-label="Track record"
        className="max-w-7xl mx-auto px-5 sm:px-10 py-10"
      >
        <Bio />
        <Testimonials />
        <Experience />
      </section>
      <Latest />
      <ServicesFaq
        copy={{ ...servicesFaqCopy, items: homeFaqs }}
      />
      <FinalCta />
      <Footer />
    </main>
  );
}
