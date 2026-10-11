import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, WORK_DIR } from "@/lib/blog";
import MDXContent from "@/components/blog/MDXContent";
import PostCta from "@/components/blog/PostCta";
import { getPostCta } from "@/lib/blog-cta";
import { JsonLd, SITE_URL, pageJsonLd } from "@/lib/page-schema";
import { PageShell } from "@/components/PageShell";

const workNavItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/work" },
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
    const { title, seoTitle, description, date, updated } = study.frontmatter;
    return {
      title: seoTitle ?? title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        ...(updated ? { modifiedTime: updated } : {}),
        url: `https://www.adrian-rusan.com/work/${slug}`,
        siteName: "Adrian Rusan",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@adrian_rusan",
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

  const studyUrl = `${SITE_URL}/work/${slug}`;

  return (
    <PageShell navItems={workNavItems}>
      <div className="max-w-3xl mx-auto px-5 sm:px-10 pt-40 pb-20">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: study.frontmatter.title,
              description: study.frontmatter.description,
              url: studyUrl,
              datePublished: study.frontmatter.date,
              dateModified: study.frontmatter.updated ?? study.frontmatter.date,
              inLanguage: "en",
              author: { "@id": `${SITE_URL}/#person` },
              publisher: { "@id": `${SITE_URL}/#person` },
              image: `${studyUrl}/opengraph-image`,
              mainEntityOfPage: { "@id": `${studyUrl}#webpage` },
            },
            pageJsonLd({
              path: `/work/${slug}`,
              name: study.frontmatter.title,
              description: study.frontmatter.description,
              crumbs: [
                { name: "Work", path: "/work" },
                { name: study.frontmatter.title, path: `/work/${slug}` },
              ],
            }),
          ]}
        />
        <article>
          <header className="mb-10 pb-8 border-b border-black-300">
            <Link
              href="/work"
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

          {/* F14: each study sells its own offer (frontmatter `cta`). */}
          <div className="mt-12">
            <PostCta cta={getPostCta(study.frontmatter)} source="work_end" />
          </div>
        </article>
      </div>
    </PageShell>
  );
}
