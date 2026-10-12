import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import PrimaryCta from "@/components/ui/PrimaryCta";
import {
  workshops,
  workshopJsonLd,
  workshopHubLink,
  workshopLogistics,
  euro,
  perEngineer,
  type WorkshopSlug,
} from "@/data/workshops";
import { CONTACT_EMAIL, WORKFLOW_NUMBERS } from "@/data";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";
import { getPosts } from "@/lib/blog";

interface WorkshopPageProps {
  params: Promise<{ slug: WorkshopSlug }>;
}

// Only the two known workshops render; any other slug 404s.
export const dynamicParams = false;
// Hourly, so the hub link appears once its post goes live (#54 R4).
export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(workshops).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const w = workshops[(await params).slug];
  return {
    // Absolute: with the "| Adrian Rusan" suffix the title runs past 60 (A1-09).
    title: { absolute: w.title },
    description: w.description,
    // Page-level openGraph/twitter replace the layout's, so restate the shared fields
    openGraph: {
      title: `${w.title} | Adrian Rusan`,
      description: w.description,
      type: "website",
      locale: "en_US",
      url: `https://www.adrian-rusan.com/workshops/${w.slug}`,
      siteName: "Adrian Rusan",
    },
    twitter: {
      card: "summary_large_image",
      title: `${w.title} | Adrian Rusan`,
      description: w.description,
      creator: "@adrian_rusan",
    },
    alternates: { canonical: `/workshops/${w.slug}` },
  };
}


export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const w = workshops[(await params).slug];
  const other =
    w.slug === "full-day" ? workshops["half-day"] : workshops["full-day"];
  // The hub post is scheduled; link it only once it's live (checked at build).
  const hubLive = (await getPosts()).some(
    (p) => `/blog/${p.slug}` === workshopHubLink.href,
  );

  return (
    // R2-F5: the workshop card is this page's one ask.
    <PageShell hideFooterCta hideEmailCapture>
      <JsonLd
        data={[
          workshopJsonLd(w),
          pageJsonLd({
            path: `/workshops/${w.slug}`,
            name: w.title,
            description: w.description,
            crumbs: [
              { name: "Services", path: "/services" },
              { name: w.title, path: `/workshops/${w.slug}` },
            ],
          }),
        ]}
      />

      <section className="px-5 sm:px-10 pt-36 md:pt-44 pb-12 md:pb-16">
        <div className="container-section text-center">
          <p className="eyebrow">
            Team workshop · {w.length} · up to {w.maxPeople} people
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto mt-3">
            {w.headline}
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto text-pretty">
            {w.intro}
          </p>
          <p className="text-sm text-white-200/80 mt-5">
            {euro(w.price)} for the {w.length} · {perEngineer(w)} · EUR, ex-VAT
          </p>
          <div className="flex justify-center mt-6">
            <PrimaryCta
              title={w.cta.label}
              href={w.cta.href}
              otherClasses="md:mt-0"
              trackEvent={{
                event: "cta_click",
                props: { cta: "workshop", source: `workshop_${w.slug}_hero` },
              }}
            />
          </div>
        </div>
      </section>

      <section
        id="agenda"
        className="px-5 sm:px-10 py-12 md:py-16 scroll-mt-24"
        aria-label="Agenda"
      >
        <div className="container-prose">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Agenda
          </h2>
          <div className="flex flex-col gap-10 mt-8">
            {w.agenda.map((part) => (
              <div key={part.label}>
                <h3 className="text-sm font-semibold text-purple">
                  {part.label}
                  {part.duration && ` · ${part.duration}`}
                </h3>
                <ul className="flex flex-col gap-5 mt-4">
                  {part.blocks.map((block) => (
                    <li
                      key={block.title}
                      className="rounded-2xl border border-white/10 bg-black-200/40 p-5 md:p-6"
                    >
                      {block.time && (
                        <p className="num text-xs text-purple mb-1">
                          {block.time}
                        </p>
                      )}
                      <p className="font-semibold">{block.title}</p>
                      <p className="text-sm text-white-200 mt-2 leading-relaxed">
                        {block.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-10 py-12 md:py-16" aria-label="What you leave with">
        <div className="container-prose">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            What your team leaves with
          </h2>
          <p className="text-white mt-4 font-medium leading-relaxed">
            {w.managerOutcome}
          </p>
          <ul className="flex flex-col gap-3 mt-6 list-disc pl-5 marker:text-purple">
            {w.outcomes.map((item) => (
              <li
                key={item}
                className="text-sm md:text-base text-white-200 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-white-200/80 mt-6 leading-relaxed">
            Taught from {WORKFLOW_NUMBERS.days} days of running agents daily on
            real repos.
            {hubLive && (
              <>
                {" "}
                <Link
                  href={workshopHubLink.href}
                  className="text-purple underline underline-offset-4 hover:text-white"
                >
                  {workshopHubLink.label}
                </Link>
              </>
            )}
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-10 py-12 md:py-16" aria-label="Logistics">
        <div className="container-prose">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Logistics
          </h2>
          <ul className="flex flex-col gap-3 mt-6 list-disc pl-5 marker:text-purple">
            {workshopLogistics.map((item) => (
              <li
                key={item}
                className="text-sm md:text-base text-white-200 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-10 pt-12 pb-20" aria-label="Book the workshop">
        <div className="container-prose rounded-2xl border border-white/10 bg-black-200/60 p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
            Tell me your team size and a few dates that work
          </h2>
          <p className="text-white-200 mt-4 text-pretty">
            {euro(w.price)} for up to {w.maxPeople} people, EUR, ex-VAT. I reply
            with the open dates and what to install beforehand.
          </p>
          <div className="flex justify-center mt-6">
            <PrimaryCta
              title={w.cta.label}
              href={w.cta.href}
              otherClasses="md:mt-0"
              trackEvent={{
                event: "cta_click",
                props: { cta: "workshop", source: `workshop_${w.slug}_final` },
              }}
            />
          </div>
          {w.secondaryCta ? (
            <a
              href={w.secondaryCta.href}
              className="inline-block mt-4 text-sm text-white-200 underline underline-offset-4 hover:text-purple"
            >
              {w.secondaryCta.label}
            </a>
          ) : (
            // R2-F22: the address in plain sight for webmail users.
            <p className="mt-4 text-sm text-white-200">
              or write to{" "}
              <a
                href={w.cta.href}
                className="font-medium underline underline-offset-4 hover:text-purple"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8 text-sm font-medium">
            <Link
              href={`/workshops/${other.slug}`}
              className="text-blue-100 hover:text-purple transition-colors"
            >
              Or see the {other.length} version ({euro(other.price)}) →
            </Link>
            <Link
              href="/services"
              className="text-blue-100 hover:text-purple transition-colors"
            >
              All services and prices →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
