import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ProsePage as Page } from "@/data/pages";
import { absoluteUrl } from "@/lib/page-schema";

// Text pages (/privacy, /about, /contact). Section bodies are plain Markdown
// (format "md", so no JSX runs), the same strings agents get as Markdown.
export function ProsePage({
  page,
  updatedLabel = "Last updated",
  children,
}: {
  page: Page;
  updatedLabel?: string;
  // Rendered under the lead, e.g. the Bio card on /about.
  children?: ReactNode;
}) {
  return (
    <article className="px-5 sm:px-10 pt-28 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {page.title}
        </h1>
        <p className="text-white-200 mt-5 leading-relaxed">{page.lead}</p>
        {page.updated && (
          <p className="font-mono text-xs text-white-200/75 mt-3">
            {updatedLabel} {page.updated}
          </p>
        )}
        {children}

        {page.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="mt-3 text-white-200 leading-relaxed [&_a]:text-purple [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3 [&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
              <MDXRemote
                source={section.body}
                options={{ mdxOptions: { format: "md" } }}
              />
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

// Shared metadata for the EN/RO about and contact pairs (hreflang both ways).
export const proseMetadata = (
  page: Page,
  languages: { en: string; ro: string },
  ro = false,
): Metadata => ({
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.path,
    languages: { ...languages, "x-default": languages.en },
  },
  openGraph: {
    title: `${page.title} | Adrian Rusan`,
    description: page.description,
    type: "website",
    url: absoluteUrl(page.path),
    siteName: "Adrian Rusan",
    locale: ro ? "ro_RO" : "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${page.title} | Adrian Rusan`,
    description: page.description,
    creator: "@adrian_rusan",
  },
});
