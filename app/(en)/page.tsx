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
import { HOME_FAQ_HEADING, homeFaqs } from "@/data";
import type { Metadata } from "next";
import { JsonLd, SITE_URL, faqJsonLd, pageJsonLd } from "@/lib/page-schema";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

// Home canonical + hreflang pair; the root layout sets no canonical (A1-16).
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.adrian-rusan.com",
    languages: { en: "/", ro: "/ro", "x-default": "/" },
  },
};

// Home-only entities (A1-05): moved out of the root layout so other pages
// stop claiming to be the homepage.
const homeJsonLd = [
  {
    ...pageJsonLd({
      path: "/",
      name: "Adrian Rusan | Agent-Accelerated Delivery, Reviewed",
      description:
        "Fixed-scope delivery sprints where Claude Code agents ship the backlog and a senior engineer security-reviews every pull request.",
      crumbs: [],
    }),
    mainEntity: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Agent-Accelerated Delivery Sprint",
    description:
      "A fixed-scope software delivery sprint where Claude Code agents ship backlog work and a senior engineer security-reviews every pull request before it reaches the client.",
    provider: { "@id": `${SITE_URL}/#person` },
    serviceType: "Software delivery sprint",
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: "Startup and scale-up founders and CTOs",
    },
  },
  // Same items the visible FAQ renders (A1-12).
  faqJsonLd(
    homeFaqs.map(({ question, answer }) => ({ q: question, a: answer })),
  ),
];

// P2: eight sections, then the shared closing ask. Experience moved to /about;
// #76: client quotes follow the case studies; FinalCta became PageShell's ClosingCta.
// A1 F11 / A4 F5: no blog cards before the ask; the nav already links the blog.
export default function Home() {
  return (
    <PageShell hideEmailCapture closingSource="final_cta">
      <JsonLd data={homeJsonLd} />
      <Hero />
      <ProofBand />
      <ShipVerify />
      <CaseStudyCards />
      <Testimonials />
      <Offers />
      <WhoFor />
      <Bio />
      <ServicesFaq copy={{ heading: HOME_FAQ_HEADING, items: homeFaqs }} />
    </PageShell>
  );
}
