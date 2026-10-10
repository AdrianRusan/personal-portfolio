import type { Metadata } from "next";
import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { LadderLink } from "@/components/services/LadderLink";
import { CALENDLY_URL } from "@/data";
import {
  RO_STRATEGY_CALL_URL,
  roTierFrom,
  roTierNames,
  roTiers,
} from "@/data/ro";
import { roNavItems } from "./nav";
import { FaLocationArrow } from "react-icons/fa6";

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

// Same proof as the English /services hero (components/services/ServicesHero.tsx).
const proofItems = [
  "30 de PR-uri revizuite · 9 loturi de agenți · 2,5 zile",
  "3 vulnerabilități de tip shell injection prinse, deși testele treceau",
  "Peste 10 ani de cod în producție",
];

export default function RoHome() {
  return (
    <main className="relative overflow-hidden">
      <FloatingNav
        navItems={roNavItems}
        ctaLabel="Programează"
        ctaSource="ro_floating_nav"
      />

      <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
            Cod livrat în ritmul agenților AI, cu fiecare PR verificat de un
            inginer senior
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
            Agenții AI scriu volumul. Eu citesc fiecare pull request linie cu
            linie și îl verific pentru securitate înainte să ajungă la tine.
            Câștigul real e de 2–3 ori, nu de 100 de ori, și îți arăt exact ce
            greșesc agenții.
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <MagicButton
              title="Programează o discuție"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "ro_hero" },
              }}
            />
            <LadderLink
              href={RO_STRATEGY_CALL_URL}
              offer="strategy-call"
              source="ro_hero"
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
            >
              Ai nevoie doar de sfaturi? Rezervă o sesiune 1:1 de strategie AI,
              110 €.
            </LadderLink>
          </div>
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2 mt-10 font-mono text-[11px] md:text-xs text-white-200/80">
            {proofItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="niveluri" className="px-5 sm:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
            Patru niveluri, fiecare cu prețul afișat
          </h2>
          <p className="text-white-200 mt-4 max-w-3xl">
            Prețuri în EUR, fără TVA. Ce plătești la un nivel se scade din
            prețul următorului.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {roTiers.map(({ tier, tagline }) => (
              <div
                key={tier}
                className="rounded-xl border border-white/10 bg-black-200/40 p-5"
              >
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-purple">
                  {roTierNames[tier]}
                </h3>
                <p className="text-xl font-bold text-white mt-3">
                  {roTierFrom(tier)}
                </p>
                <p className="text-sm text-white-200 mt-2">{tagline}</p>
              </div>
            ))}
          </div>
          <Link
            href="/ro/servicii"
            className="inline-block text-sm font-medium text-purple hover:underline underline-offset-4 mt-8"
          >
            Vezi toate ofertele și prețurile →
          </Link>
        </div>
      </section>

      <section className="px-5 sm:px-10 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Cine face review-ul
          </h2>
          <p className="text-white-200 mt-4 leading-relaxed">
            Adrian Rusan, Founding Engineer la Bono Fintech din 2024. Am peste
            10 ani de cod în producție, la Ipsos, PGL Esports, GoSocial și Bono
            Fintech. Fiecare PR pe care îl primești a trecut pe la mine.
          </p>
          <p className="text-sm text-white-200/70 mt-6 border-l-2 border-purple pl-3">
            Fără statistici inventate și fără urgență falsă. Cifrele de aici vin
            din rulări documentate.
          </p>
        </div>
      </section>
    </main>
  );
}
