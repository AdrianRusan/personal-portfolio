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
      <div className="page-head pb-20">
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
            <h1 className="type-title text-ink mb-6">
              Case studies
            </h1>
            <p className="text-body text-lg measure">{WORK_DESCRIPTION}</p>
          </div>

          <ul className="flex flex-col border-t border-ink">
            {studies.map((study) => {
              const result = caseStudyResults[study.slug];
              return (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group flex flex-col md:flex-row gap-5 md:gap-10 border-b border-ink/15 py-8"
                  >
                    {result && (
                      <div className="md:w-56 flex-none">
                        <p className="type-stat text-ink">
                          {result.figure}
                        </p>
                        <p className="text-sm leading-relaxed text-body mt-2">
                          {result.label}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <h2 className="type-subsection text-balance text-ink group-hover:underline group-focus-visible:underline decoration-accent underline-offset-4">
                        {study.frontmatter.title}
                      </h2>
                      {study.frontmatter.meta && (
                        <p className="text-sm text-body/80 mt-2">
                          {study.frontmatter.meta}
                        </p>
                      )}
                      <p className="text-body mt-3 leading-relaxed flex-1 measure-lg">
                        {study.frontmatter.description}
                      </p>
                      <span className="text-sm font-medium text-accent mt-4">
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
