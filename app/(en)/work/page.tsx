import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getPosts, WORK_DIR } from "@/lib/blog";
import {
  WORK_DESCRIPTION,
  WORK_TITLE,
  byCaseStudyOrder,
  caseStudyResults,
} from "@/data/work";
import { JsonLd, itemListJsonLd, pageJsonLd } from "@/lib/page-schema";

// A date-gated study joins the index within an hour of its date (as /blog does).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: WORK_TITLE,
  description: WORK_DESCRIPTION,
  openGraph: {
    title: `${WORK_TITLE} | Adrian Rusan`,
    description: WORK_DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/work",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${WORK_TITLE} | Adrian Rusan`,
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
      <div className="px-5 sm:px-10 lg:px-12 pt-28 md:pt-36 pb-20">
        <div className="container-wide">
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
            <h1 className="display text-[40px] md:text-6xl xl:text-7xl text-white mb-6">
              Case studies
            </h1>
            <p className="text-white-200 text-lg max-w-[38em]">{WORK_DESCRIPTION}</p>
          </div>

          <ul className="flex flex-col border-t border-white">
            {studies.map((study) => {
              const result = caseStudyResults[study.slug];
              return (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group flex flex-col md:flex-row gap-5 md:gap-10 border-b border-white/15 py-8"
                  >
                    {result && (
                      <div className="md:w-56 flex-none">
                        <p className="text-4xl md:text-5xl type-light tabular-nums text-white">
                          {result.figure}
                        </p>
                        <p className="text-[13px] leading-relaxed text-white-200 mt-2">
                          {result.label}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <h2 className="text-2xl md:text-3xl type-light text-balance text-white group-hover:underline group-focus-visible:underline decoration-purple underline-offset-4">
                        {study.frontmatter.title}
                      </h2>
                      {study.frontmatter.meta && (
                        <p className="text-[13px] text-white-200/80 mt-2">
                          {study.frontmatter.meta}
                        </p>
                      )}
                      <p className="text-white-200 mt-3 leading-relaxed flex-1 max-w-[42em]">
                        {study.frontmatter.description}
                      </p>
                      <span className="text-sm font-medium text-purple mt-4">
                        Read the case study →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
