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

      <section className="px-5 md:px-12 pt-36 md:pt-44 pb-12">
        <div className="container-wide text-center">
          <p className="eyebrow">{teardown.eyebrow}</p>
          <h1 className="text-3xl md:text-5xl font-[380] tracking-[-0.03em] text-balance max-w-3xl mx-auto mt-3">
            {teardown.heading}
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto text-pretty">
            {teardown.intro}
          </p>
          <p className="text-sm text-white-200/80 mt-4 max-w-2xl mx-auto text-pretty">
            {teardown.proof}
          </p>
        </div>
      </section>

      <section className="px-5 md:px-12 pb-16" aria-label="Request a teardown">
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
        className="px-5 md:px-12 pb-16"
        aria-label="How the teardown works"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
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
      </section>

      <section className="px-5 md:px-12 pb-20" aria-label="Why free">
        <div className="max-w-2xl mx-auto border-t border-white/15 pt-8">
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
          </div>
        </div>
      </section>

    </PageShell>
  );
}
