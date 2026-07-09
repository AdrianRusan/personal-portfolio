import type { Metadata } from "next";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { DeliverySprint } from "@/components/services/DeliverySprint";
import { TrustStrip } from "@/components/services/TrustStrip";
import { Retainer } from "@/components/services/Retainer";
import { HarnessSetup } from "@/components/services/HarnessSetup";
import { Scarcity } from "@/components/services/Scarcity";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";

export const metadata: Metadata = {
  title:
    "Services — Agent-Accelerated Delivery Sprints, Reviewed | Adrian Rusan",
  description:
    "Fixed-scope, fixed-price sprints: an agent fleet ships the volume, a senior engineer security-reviews every PR before you see it. 30 reviewed PRs in 2.5 days.",
  openGraph: {
    title:
      "Services — Agent-Accelerated Delivery Sprints, Reviewed | Adrian Rusan",
    description:
      "Fixed-scope, fixed-price sprints: an agent fleet ships the volume, a senior engineer security-reviews every PR before you see it. 30 reviewed PRs in 2.5 days.",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

const servicesNavItems = [
  { name: "Home", link: "/" },
  { name: "How it works", link: "#process" },
  { name: "Work", link: "/#work" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/#contact" },
];

export default function ServicesPage() {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav navItems={servicesNavItems} />
      <ServicesHero />
      <ProcessSteps />
      <DeliverySprint />
      <TrustStrip />
      <Retainer />
      <HarnessSetup />
      <Scarcity />
      <ServicesFaq />
      <ServicesFinalCta />
    </main>
  );
}
