import type { Metadata } from "next";
import { BLOG_DESCRIPTION } from "@/data";
import { getPosts, getAllTags } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";
import { JsonLd, itemListJsonLd, pageJsonLd } from "@/lib/page-schema";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  openGraph: {
    title: "Blog | Adrian Rusan",
    description: BLOG_DESCRIPTION,
    type: "website",
    url: "https://www.adrian-rusan.com/blog",
    siteName: "Adrian Rusan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Adrian Rusan",
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
    <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
      <JsonLd
        data={[
          pageJsonLd({
            path: "/blog",
            name: "Field notes on agent-accelerated delivery",
            description: BLOG_DESCRIPTION,
            crumbs: [{ name: "Blog", path: "/blog" }],
            type: "CollectionPage",
          }),
          itemListJsonLd(posts.map((p) => `/blog/${p.slug}`)),
        ]}
      />
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Field notes on agent-accelerated delivery
        </h1>
        <p className="text-white-200 text-lg max-w-xl">
          How I ship production software with a Claude Code agent fleet — and
          the senior review layer that catches what the agents miss. From 10+
          years in production.
        </p>
      </div>

      <BlogListClient
        posts={posts}
        allTags={allTags}
        {...(tag ? { initialTag: tag } : {})}
      />
    </div>
  );
}
