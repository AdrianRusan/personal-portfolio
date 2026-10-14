import type { Metadata } from "next";
import { BLOG_DESCRIPTION, BLOG_HEADING, BLOG_INTRO, BLOG_TITLE } from "@/data";
import { getPosts, getAllTags } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";
import { PageShell } from "@/components/PageShell";
import { JsonLd, itemListJsonLd, pageJsonLd } from "@/lib/page-schema";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  openGraph: {
    title: `${BLOG_TITLE} | Adrian Rusan`,
    description: BLOG_DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/blog",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BLOG_TITLE} | Adrian Rusan`,
    description: BLOG_DESCRIPTION,
    creator: "@adrian_rusan",
  },
  // Page-level alternates replace the layout's, so the RSS type is restated.
  // Every ?tag= view canonicalises here (A1-03).
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "https://www.adrian-rusan.com/feed.xml",
    },
  },
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const [posts, allTags] = await Promise.all([getPosts(), getAllTags()]);

  return (
    <PageShell>
      <div className="px-5 sm:px-10 lg:px-12 pt-28 md:pt-36 pb-20">
        <div className="container-wide">
          <JsonLd
            data={[
              pageJsonLd({
                path: "/blog",
                name: "Notes from shipping with Claude Code agents",
                description: BLOG_DESCRIPTION,
                crumbs: [{ name: "Blog", path: "/blog" }],
                type: "CollectionPage",
              }),
              itemListJsonLd(posts.map((p) => `/blog/${p.slug}`)),
            ]}
          />
          <div className="mb-12">
            <h1 className="display text-[40px] md:text-6xl xl:text-7xl text-white mb-6 text-balance">
            {BLOG_HEADING}
          </h1>
          <p className="text-white-200 text-lg max-w-xl">{BLOG_INTRO}</p>
          </div>

          <BlogListClient
            posts={posts}
            allTags={allTags}
            {...(tag ? { initialTag: tag } : {})}
          />
        </div>
      </div>
    </PageShell>
  );
}
