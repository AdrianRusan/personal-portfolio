import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import TeardownForm from "@/components/TeardownForm";
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

      {/* #114 M: a left-aligned display hero; the form follows in the same column. */}
      <section className="page-head pb-12">
        <div className="container-wide">
          <p className="eyebrow">{teardown.eyebrow}</p>
          <h1 className="type-title text-balance measure-title mt-5">
            {teardown.heading}
          </h1>
          <p className="type-lead text-white-200 mt-6 measure text-pretty">
            {teardown.intro}
          </p>
          <p className="text-sm text-white-200 mt-4 measure text-pretty">
            {teardown.proof}
          </p>
        </div>
      </section>

      <section
        className="gutter pb-16"
        aria-label="Request a teardown"
      >
        <div className="container-wide">
          <div className="max-w-2xl">
            <TeardownForm />
            <ul className="flex flex-col gap-2 mt-5 text-xs text-white-200/80 leading-relaxed">
              {trustNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="gutter pb-16"
        aria-label="How the teardown works"
      >
        <div className="container-wide">
          <div className="max-w-2xl">
            <h2 className="type-subsection">How it works</h2>
            <ol className="flex flex-col gap-3 mt-4 list-decimal pl-5 marker:text-purple">
              {steps.map((item) => (
                <li
                  key={item}
                  className="text-sm md:text-base text-white-200 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="gutter pb-20" aria-label="Why free">
        <div className="container-wide">
          <div className="max-w-2xl border-t border-white/15 pt-8">
            <h2 className="type-subsection">
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
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
