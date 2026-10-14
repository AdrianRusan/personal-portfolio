import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, WORK_DIR } from "@/lib/blog";
import MDXContent from "@/components/blog/MDXContent";
import PostCta from "@/components/blog/PostCta";
import { getPostCta } from "@/lib/blog-cta";
import { pageTitle } from "@/lib/blog-types";
import { JsonLd, SITE_URL, ogImageUrl, pageJsonLd } from "@/lib/page-schema";
import { PageShell } from "@/components/PageShell";


interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Like the blog (#54 R4): a study dated after the build renders on demand once
// its date passes; until then getPost() throws and the page 404s, as do drafts.
export const dynamicParams = true;
export const revalidate = 3600;

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
      title: pageTitle(seoTitle ?? title),
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
    // R3-F06: the offer card is the page's one ask; the shell keeps the checklist.
    <PageShell hideFooterCta>
      <div className="page-head pb-20">
      <div className="container-prose">
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
              image: ogImageUrl("/(en)/work/[slug]", { slug }, "cover"),
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
            <Link href="/work" className="eyebrow hover:underline">
              Case study
            </Link>
            <h1 className="type-title-sm mt-4 mb-6 text-balance">
              {study.frontmatter.title}
            </h1>
            <p className="text-white-200 text-lg leading-relaxed">
              {study.frontmatter.description}
            </p>
            {study.frontmatter.meta && (
              <p className="text-sm text-white-200/80 mt-5">
                {study.frontmatter.meta}
              </p>
            )}
          </header>

          {study.frontmatter.forYou && (
            <p className="text-white text-lg leading-relaxed mb-8 border-l-2 border-purple pl-4">
              {study.frontmatter.forYou}
            </p>
          )}

          <div className="blog-prose">
            <MDXContent source={study.source} />
          </div>

          {/* F14: each study sells its own offer (frontmatter `cta`). */}
          <div className="mt-12">
            <PostCta cta={getPostCta(study.frontmatter)} source="work_end" />
          </div>
        </article>
      </div>
      </div>
    </PageShell>
  );
}
