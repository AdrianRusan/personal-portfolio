import type { Metadata } from "next";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { DeliverySprint } from "@/components/services/DeliverySprint";
import { EntryOffer } from "@/components/services/EntryOffer";
import { TrustStrip } from "@/components/services/TrustStrip";
import { Retainer } from "@/components/services/Retainer";
import { HarnessSetup } from "@/components/services/HarnessSetup";
import { Scarcity } from "@/components/services/Scarcity";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesFinalCta } from "@/components/services/ServicesFinalCta";
import { Ladder } from "@/components/services/Ladder";
import { ladderServiceJsonLd } from "@/data/ladder";
import { faqPageJsonLd } from "@/data";

export const metadata: Metadata = {
  // Bare title — the root layout's title.template appends "| Adrian Rusan"
  title: "Services — AI Strategy, Workshops, Automation and Reviewed Delivery",
  description:
    "From a €200 AI strategy call to a monthly retainer: audits, team workshops, automations, harness setup and reviewed delivery sprints, each priced up front.",
  openGraph: {
    title:
      "Services — AI Strategy, Workshops, Automation and Reviewed Delivery | Adrian Rusan",
    description:
      "From a €200 AI strategy call to a monthly retainer: audits, team workshops, automations, harness setup and reviewed delivery sprints, each priced up front.",
    type: "website",
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
    // Static data, JSON.stringify()-escaped. Built from the same `faqs` the
    // visible FAQ renders, so the schema can't drift from the page.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
  />
);

const ServicesJsonLd = () => (
  <script
    type="application/ld+json"
    // Static data, JSON.stringify()-escaped — same pattern as the FAQ JSON-LD.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(ladderServiceJsonLd()) }}
  />
);

const servicesNavItems = [
  { name: "Home", link: "/" },
  { name: "Pricing", link: "#ladder" },
  { name: "How it works", link: "#process" },
  { name: "Work", link: "/#work" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/#contact" },
];

export default function ServicesPage() {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <ServicesFaqJsonLd />
      <ServicesJsonLd />
      <FloatingNav navItems={servicesNavItems} />
      <ServicesHero />
      <Ladder />
      <ProcessSteps />
      <DeliverySprint />
      <EntryOffer />
      <TrustStrip />
      <Retainer />
      <HarnessSetup />
      <Scarcity />
      <ServicesFaq />
      <ServicesFinalCta />
    </main>
  );
}
