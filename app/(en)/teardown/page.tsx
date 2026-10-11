import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import TeardownForm from "@/components/TeardownForm";
import { LEDGER_PROOF } from "@/data";
import { teardown } from "@/data/teardown";
import { CalendlyLink } from "@/components/CalendlyLink";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

const { title: TITLE, description: DESCRIPTION } = teardown;

export const metadata: Metadata = {
  title: "Free AI Code Teardown — 15-min Loom, no call",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/teardown",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@adrian_rusan",
  },
  alternates: {
    canonical: "/teardown",
  },
};


const { trustNotes, steps } = teardown;

export default function TeardownPage() {
  return (
    <PageShell hideEmailCapture hideFooterCta>
      <JsonLd
        data={pageJsonLd({
          path: "/teardown",
          name: TITLE,
          description: DESCRIPTION,
          crumbs: [{ name: "Free teardown", path: "/teardown" }],
        })}
      />

      <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
            {teardown.eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto mt-4">
            {teardown.heading}
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
            {teardown.intro}
          </p>
          <p className="font-mono text-[11px] md:text-xs text-white-200/80 mt-4 max-w-2xl mx-auto">
            {LEDGER_PROOF}
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-16" aria-label="Request a teardown">
        <div className="max-w-2xl mx-auto">
          <TeardownForm />
          <ul className="flex flex-col gap-2 mt-5 text-xs text-white-200/80 leading-relaxed">
            {trustNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="px-5 sm:px-10 pb-16"
        aria-label="How the teardown works"
      >
        <div className="max-w-3xl mx-auto">
          <ul className="flex flex-col gap-4">
            {steps.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 text-sm md:text-base text-white-200 leading-relaxed"
              >
                <span
                  className="flex-none font-mono text-purple"
                  aria-hidden="true"
                >
                  {index + 1}.
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-20" aria-label="Why free">
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-tight">
            {teardown.whyHeading}
          </h2>
          <p className="text-sm text-white-200 mt-3 leading-relaxed">
            {teardown.why}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
            {/* A link, not a button: the form above is this page's one primary CTA. */}
            <CalendlyLink
              source="teardown_book"
              newTab={false}
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
            >
              Prefer to talk? Book a scoping call →
            </CalendlyLink>
            <a
              href="/services"
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
            >
              Or see the full delivery offer →
            </a>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
