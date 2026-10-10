import type { Metadata } from "next";
import Link from "next/link";
import BlogNav from "@/components/blog/BlogNav";
import { getPosts, WORK_DIR } from "@/lib/blog";
import { caseStudyResults } from "@/data/work";

const DESCRIPTION =
  "Case studies from documented runs: what broke, what I built, the number it moved, and what it taught me about shipping with AI agents.";

export const metadata: Metadata = {
  title: "Case studies",
  description: DESCRIPTION,
  openGraph: {
    title: "Case studies | Adrian Rusan",
    description: DESCRIPTION,
    type: "website",
  },
  alternates: { canonical: "/work" },
};

// Same shell as /blog (BlogNav + page background), so the index reads as part
// of the content section. Lists every published study from the work loader.
export default async function WorkIndexPage() {
  const studies = await getPosts(WORK_DIR);

  return (
    <div className="min-h-screen dark:bg-black-100 bg-white">
      <BlogNav />
      <main className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Case studies
          </h1>
          <p className="text-white-200 text-lg max-w-xl">{DESCRIPTION}</p>
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
                      <p className="font-mono text-[11px] leading-relaxed text-white-200 mt-2">
                        {result.label}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg md:text-xl font-semibold text-balance text-white">
                      {study.frontmatter.title}
                    </h2>
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
      </main>
    </div>
  );
}
