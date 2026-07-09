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

export const metadata: Metadata = {
  title:
    "Services — Agent-Accelerated Delivery Sprints, Reviewed | Adrian Rusan",
  description:
    "Fixed-scope, fixed-price sprints: an agent fleet ships the volume, a senior engineer security-reviews every PR before you see it.",
  openGraph: {
    title:
      "Services — Agent-Accelerated Delivery Sprints, Reviewed | Adrian Rusan",
    description:
      "Fixed-scope, fixed-price sprints: an agent fleet ships the volume, a senior engineer security-reviews every PR before you see it.",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

const servicesFaqStructuredData = [
  {
    question: "How is the quality any good if AI agents wrote it?",
    answer:
      "Because agent output is the draft, not the deliverable. Every PR goes through a line-by-line senior review that assumes the agent got it wrong until it's proven right — the same review a strong senior gives a junior's PR, at agent speed. The review layer is where agent mistakes get caught, and every sprint ships you a log of exactly what got caught in your codebase.",
  },
  {
    question:
      "I'm specifically worried about security. Unsupervised agents ship vulnerabilities.",
    answer:
      'Correct — they do. That\'s the reason this service exists instead of a cheaper "just run the agents" option. The adversarial review checks for exactly this class of issue before any PR reaches you, and you get a written findings log for the whole sprint. The security guarantee is in writing: an in-scope vulnerability found in a PR I marked reviewed gets fixed free.',
  },
  {
    question: "Why not just hire an agency, or more engineers?",
    answer:
      "An agency sells you a team's hours and marks them up; more headcount takes months to hire and ramp. This sells you reviewed outcomes in days, from one senior operator running an agent fleet — no coordination overhead, no ramp, no junior work billed at senior rates. And the real gap: an agency using agents rarely has a senior adversarial verify layer sitting on top. That layer is the whole point here, not an add-on.",
  },
  {
    question: "Who owns the code, and how is confidentiality handled?",
    answer:
      "You own everything — your repo, your branches, your IP, from the first commit. Work happens in your repository under your access controls. I sign your NDA or DPA before repo access; access is revoked at handoff unless you're on a retainer. No client code is used to train anything or reused anywhere else. For fintech clients, the security review covers secrets handling and access control as standard.",
  },
  {
    question: "What if it doesn't work out, or you're too slow?",
    answer:
      "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it — your risk is highest before I've shipped anything, so the guarantee sits right there. Beyond that, scope is fixed on day 0, so there's no runaway bill.",
  },
  {
    question: "Can you just work as a normal contractor by the day?",
    answer:
      "That's available as a retainer, starting at €9,000/mo, but it's not the recommended way in. The sprint sells you a reviewed outcome for a price you agree up front, which is a better deal for you than buying time and hoping. The retainer carries the same security guarantee, plus a proof-month: month 1 is a trial, and you can cancel at the end of it if we haven't hit the agreed reviewed-PR cadence. Start with a Pilot Sprint if you want to test the working relationship at low risk first.",
  },
];

const ServicesFaqJsonLd = () => (
  <script
    type="application/ld+json"
    // Security Note: dangerouslySetInnerHTML is safe here as we're using JSON.stringify()
    // with static data for structured data markup (Schema.org JSON-LD)
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: servicesFaqStructuredData.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }),
    }}
  />
);

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
      <ServicesFaqJsonLd />
      <FloatingNav navItems={servicesNavItems} />
      <ServicesHero />
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
