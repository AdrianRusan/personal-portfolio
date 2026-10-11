import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import MagicButton from "@/components/ui/MagicButton";
import {
  workshops,
  workshopJsonLd,
  euro,
  type WorkshopSlug,
} from "@/data/workshops";
import { WORKFLOW_NUMBERS } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";
import { getPosts } from "@/lib/blog";

interface WorkshopPageProps {
  params: Promise<{ slug: WorkshopSlug }>;
}

// Only the two known workshops render; any other slug 404s.
export const dynamicParams = false;
// Hourly, so the hub link appears once its post goes live (#54 R4).
export const revalidate = 3600;

const PARALLEL_HUB = "how-i-run-claude-code-agents-in-parallel";

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

const navItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Agenda", link: "#agenda" },
  { name: "Blog", link: "/blog" },
];

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const w = workshops[(await params).slug];
  const other =
    w.slug === "full-day" ? workshops["half-day"] : workshops["full-day"];
  const hubLive = (await getPosts()).some((p) => p.slug === PARALLEL_HUB);

  return (
    <PageShell navItems={navItems}>
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

      <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
            Team workshop · {w.length} · up to {w.maxPeople} people
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto mt-4">
            {w.headline}
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
            {w.intro}
          </p>
          <p className="font-mono text-xs md:text-sm text-white-200/75 mt-5">
            {euro(w.price)} for the {w.length} · EUR, ex-VAT
          </p>
          <div className="flex justify-center">
            <MagicButton
              title={w.cta.label}
              icon={<FaLocationArrow />}
              position="right"
              href={w.cta.href}
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
        className="px-5 sm:px-10 pb-16 scroll-mt-24"
        aria-label="Agenda"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Agenda
          </h2>
          <div className="flex flex-col gap-10 mt-8">
            {w.agenda.map((part) => (
              <div key={part.label}>
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-purple">
                  {part.label}
                  {part.duration && ` · ${part.duration}`}
                </h3>
                <ul className="flex flex-col gap-5 mt-4">
                  {part.blocks.map((block) => (
                    <li
                      key={block.title}
                      className="rounded-2xl border border-white/10 bg-black-200/40 p-5 md:p-6"
                    >
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

      <section className="px-5 sm:px-10 pb-16" aria-label="What you leave with">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            What your team leaves with
          </h2>
          <ul className="flex flex-col gap-3 mt-6">
            {w.outcomes.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm md:text-base text-white-200 leading-relaxed"
              >
                <span className="flex-none text-purple" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-white-200/80 mt-6 leading-relaxed">
            Taught from my own runs: {WORKFLOW_NUMBERS.sessions} sessions and{" "}
            {WORKFLOW_NUMBERS.hours} hours over {WORKFLOW_NUMBERS.days} days,
            counted from my own session logs.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-20" aria-label="Book the workshop">
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
            Tell me your team size and a few dates that work
          </h2>
          <p className="text-white-200 mt-4">
            {euro(w.price)} for up to {w.maxPeople} people, EUR, ex-VAT. I reply
            with the open dates and what to install beforehand.
          </p>
          <div className="flex justify-center">
            <MagicButton
              title={w.cta.label}
              icon={<FaLocationArrow />}
              position="right"
              href={w.cta.href}
              trackEvent={{
                event: "cta_click",
                props: { cta: "workshop", source: `workshop_${w.slug}_final` },
              }}
            />
          </div>
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
            {/* A1-24: the how-i-run post is the hub for this term; linked once it is live. */}
            {hubLive && (
              <Link
                href={`/blog/${PARALLEL_HUB}`}
                className="text-blue-100 hover:text-purple transition-colors"
              >
                How I run Claude Code parallel agents →
              </Link>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
