import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ProsePage as Page } from "@/data/pages";
import { absoluteUrl } from "@/lib/page-schema";
import { Quote } from "./Testimonials";

// Text pages (/privacy, /about, /contact). Section bodies are plain Markdown
// (format "md", so no JSX runs), the same strings agents get as Markdown.
export function ProsePage({
  page,
  updatedLabel = "Last updated",
  photo,
  children,
}: {
  page: Page;
  updatedLabel?: string;
  // A4 F8: the photo beside the H1 and lead (/about).
  photo?: ReactNode;
  // Rendered under the lead, e.g. the option blocks on /contact.
  children?: ReactNode;
}) {
  return (
    // #114 M: a left-aligned display title, then ruled two-column sections
    // (heading left, body right) in the wide frame.
    <article className="page-head pb-8">
      <div className="container-wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {photo}
          <div className="max-w-[46rem]">
            <h1 className="type-title text-balance">
              {page.title}
            </h1>
            <p className="type-lead text-white-200 mt-6 text-pretty">
              {page.lead}
            </p>
            {page.updated && (
              <p className="eyebrow mt-4">
                {updatedLabel} {page.updated}
              </p>
            )}
          </div>
        </div>
        {children}

        {page.sections.map((section) => (
          <section
            key={section.heading}
            className="mt-14 grid gap-4 border-t border-white/15 pt-6 lg:grid-cols-[4fr_7fr] lg:gap-16"
          >
            <h2 className="type-subsection text-balance">
              {section.heading}
            </h2>
            <div>
            <div className="measure-lg text-white-200 leading-relaxed [&_a]:text-purple [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3 [&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
              <MDXRemote
                source={section.body}
                options={{ mdxOptions: { format: "md" } }}
              />
            </div>
            {section.quote && (
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="eyebrow">{section.quote.label}</p>
                <Quote
                  testimonial={section.quote.testimonial}
                  className="mt-3 border-t-0 pt-0"
                />
              </div>
            )}
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
