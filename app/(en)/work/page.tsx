import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getPosts, WORK_DIR } from "@/lib/blog";
import {
  WORK_DESCRIPTION,
  byCaseStudyOrder,
  caseStudyResults,
} from "@/data/work";
import { JsonLd, itemListJsonLd, pageJsonLd } from "@/lib/page-schema";

// A date-gated study joins the index within an hour of its date (as /blog does).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Case studies",
  description: WORK_DESCRIPTION,
  openGraph: {
    title: "Case studies | Adrian Rusan",
    description: WORK_DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/work",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case studies | Adrian Rusan",
    description: WORK_DESCRIPTION,
    creator: "@adrian_rusan",
  },
  alternates: { canonical: "/work" },
};


// Same shell as every other page. Lists every published study from the work loader.
export default async function WorkIndexPage() {
  const studies = byCaseStudyOrder(await getPosts(WORK_DIR));
  // No empty index: R10 allows no "coming soon" pages.
  if (studies.length === 0) notFound();

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-5 sm:px-10 pt-32 sm:pt-40 pb-20">
        <JsonLd
          data={[
            pageJsonLd({
              path: "/work",
              name: "Case studies",
              description: WORK_DESCRIPTION,
              crumbs: [{ name: "Work", path: "/work" }],
              type: "CollectionPage",
            }),
            itemListJsonLd(studies.map((s) => `/work/${s.slug}`)),
          ]}
        />
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Case studies
          </h1>
          <p className="text-white-200 text-lg max-w-xl">{WORK_DESCRIPTION}</p>
        </div>

        <ul className="flex flex-col gap-5">
          {studies.map((study) => {
            const result = caseStudyResults[study.slug];
            return (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="flex flex-col md:flex-row gap-5 rounded-2xl border border-white/10 bg-black-200/40 p-6 hover:border-purple/40 transition-colors"
                >
                  {result && (
                    <div className="md:w-48 flex-none">
                      <p className="text-3xl font-bold tracking-tight text-purple">
                        {result.figure}
                      </p>
                      <p className="text-[13px] leading-relaxed text-white-200 mt-2">
                        {result.label}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg md:text-xl font-semibold text-balance text-white">
                      {study.frontmatter.title}
                    </h2>
                    {study.frontmatter.meta && (
                      <p className="text-[13px] text-white-200/80 mt-2">
                        {study.frontmatter.meta}
                      </p>
                    )}
                    <p className="text-sm text-white-200 mt-3 leading-relaxed flex-1">
                      {study.frontmatter.description}
                    </p>
                    <span className="text-sm font-semibold text-purple mt-4">
                      Read the case study →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
