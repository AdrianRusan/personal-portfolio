import type { Metadata } from "next";
import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { Ladder, type LadderContent } from "@/components/services/Ladder";
import { ladderServiceJsonLd } from "@/data/ladder";
import { CALENDLY_URL } from "@/data";
import { formatPriceRo, roLadder, roTierNames, roTiers } from "@/data/ro";
import { roNavItems } from "../nav";
import { FaLocationArrow } from "react-icons/fa6";

const title = "Servicii AI, de la o sesiune de 110 € la un retainer lunar";
const description =
  "Sesiune de strategie AI, audit, workshop pentru echipă, automatizări, agent harness și sprinturi de livrare revizuite. Prețuri în EUR, fără TVA, pentru România.";

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
    url: "https://www.adrian-rusan.com/ro/servicii",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Adrian Rusan`,
    description,
    creator: "@adrian_rusan",
  },
  alternates: {
    canonical: "/ro/servicii",
    languages: {
      en: "/services",
      ro: "/ro/servicii",
      "x-default": "/services",
    },
  },
};

const roLadderContent: LadderContent = {
  offers: roLadder,
  tiers: roTiers,
  tierName: (tier) => roTierNames[tier as keyof typeof roTierNames],
  format: formatPriceRo,
  eyebrow: "Consultanță → Training → Implementare → Livrare",
  heading: "Patru moduri de a lucra împreună, toate cu prețul afișat",
  intro:
    "Începe cu o sesiune de 110 € sau mergi direct la un sprint. Ce plătești la un nivel se scade din prețul următorului. Toate prețurile sunt în EUR, fără TVA.",
  limited: "Disponibilitate limitată",
  capacity:
    "Stratul de verificare e un singur om senior și nu se poate paraleliza.",
  source: "ro_services_ladder",
};

export default function RoServicesPage() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        // Static data, JSON.stringify()-escaped — same pattern as /services.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ladderServiceJsonLd(roLadder, "Romania")),
        }}
      />
      <FloatingNav navItems={roNavItems} ctaLabel="Programează" />

      <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
            {title}
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
            Strategie, audituri, workshop-uri, automatizări și livrare de cod
            revizuit. Fiecare ofertă are prețul afișat de la început, iar
            fiecare PR trece printr-un review de securitate făcut de mine.
          </p>
          <div className="flex flex-col items-center gap-4 mt-6">
            <MagicButton
              title="Programează o discuție"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "ro_services_hero" },
              }}
            />
            <a
              href="#ladder"
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
            >
              Vezi nivelurile și prețurile ↓
            </a>
          </div>
        </div>
      </section>

      <Ladder content={roLadderContent} />

      <section className="px-5 sm:px-10 py-16">
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
            Spune-mi ce ai în backlog. Îți spun cât costă.
          </h2>
          <p className="text-white-200 mt-4 max-w-2xl mx-auto">
            O discuție de 30 de minute în care stabilim scope-ul și prețul, fără
            nicio obligație.
          </p>
          <div className="flex justify-center mt-8">
            <MagicButton
              title="Programează o discuție"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "ro_services_final_cta" },
              }}
            />
          </div>
          <Link
            href="/services"
            hrefLang="en"
            className="inline-block text-sm font-medium text-blue-100 hover:text-purple transition-colors mt-6"
          >
            Detaliile complete ale fiecărei oferte, în engleză →
          </Link>
        </div>
      </section>
    </main>
  );
}
