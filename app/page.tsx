import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import ShipVerify from "@/components/ShipVerify";
import Offers from "@/components/Offers";
import CaseStudy from "@/components/CaseStudy";
import WhoFor from "@/components/WhoFor";
import FinalCta from "@/components/FinalCta";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";
import {
  TestimonialSkeleton,
  ExperienceSkeleton,
} from "@/components/ui/Skeleton";

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <section className="py-20" aria-label="Experience loading">
      <ExperienceSkeleton />
    </section>
  ),
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <section className="py-20" aria-label="Testimonials loading">
      <TestimonialSkeleton />
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

export default function Home() {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav navItems={navItems} />
      <Hero />
      <ProofBand />
      <ShipVerify />
      <Offers />
      <CaseStudy />
      <WhoFor />
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <section aria-label="Track record">
          <Experience />
        </section>
        <section id="testimonials" aria-labelledby="testimonials-heading">
          <Testimonials />
        </section>
      </div>
      <FinalCta />
      <Footer />
    </main>
  );
}
