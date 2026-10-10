import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, WORK_DIR } from "@/lib/blog";
import MDXContent from "@/components/blog/MDXContent";
import { CalendlyLink } from "@/components/CalendlyLink";
import { PageShell } from "@/components/PageShell";

const workNavItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/#work" },
  { name: "Blog", link: "/blog" },
];

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Only published case studies are routable; drafts (published: false) 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = await getPosts(WORK_DIR);
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const study = await getPost(slug, WORK_DIR);
    return {
      title: study.frontmatter.title,
      description: study.frontmatter.description,
      openGraph: {
        title: study.frontmatter.title,
        description: study.frontmatter.description,
        type: "article",
        publishedTime: study.frontmatter.date,
        url: `https://www.adrian-rusan.com/work/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: study.frontmatter.title,
        description: study.frontmatter.description,
      },
      alternates: { canonical: `/work/${slug}` },
    };
  } catch {
    return { title: "Case Study Not Found" };
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  let study;
  try {
    study = await getPost(slug, WORK_DIR);
  } catch {
    notFound();
  }
  // Defense in depth: drafts never render, even if dynamicParams changes.
  if (!study.frontmatter.published) notFound();

  const studyUrl = `https://www.adrian-rusan.com/work/${slug}`;

  return (
    <PageShell navItems={workNavItems}>
      <div className="max-w-3xl mx-auto px-5 sm:px-10 pt-40 pb-20">
        <script
          type="application/ld+json"
          // Safe: JSON.stringify of our own frontmatter (Schema.org JSON-LD)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: study.frontmatter.title,
              description: study.frontmatter.description,
              datePublished: study.frontmatter.date,
              dateModified: study.frontmatter.date,
              author: {
                "@type": "Person",
                name: "Adrian Rusan",
                url: "https://www.adrian-rusan.com",
              },
              image: `${studyUrl}/opengraph-image`,
              mainEntityOfPage: { "@type": "WebPage", "@id": studyUrl },
            }),
          }}
        />
        <article>
          <header className="mb-10 pb-8 border-b border-black-300">
            <Link
              href="/#work"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100 hover:text-purple transition-colors"
            >
              Case study
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-3 mb-5">
              {study.frontmatter.title}
            </h1>
            <p className="text-white-200 text-lg leading-relaxed">
              {study.frontmatter.description}
            </p>
          </header>

          <div className="blog-prose">
            <MDXContent source={study.source} />
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-8">
            <p className="text-lg font-semibold">
              Want this level of review on your team&apos;s agent work?
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link
                href="/services"
                className="text-sm font-semibold text-purple hover:underline underline-offset-4"
              >
                See the offers and prices →
              </Link>
              <CalendlyLink
                source="work"
                className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
              >
                Book a call
              </CalendlyLink>
            </div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
