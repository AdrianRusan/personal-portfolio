import type { Metadata } from "next";
import { getPosts, getAllTags } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on shipping production software with a Claude Code agent fleet, and the senior review layer that catches what the agents miss. From 10+ years in production.",
  openGraph: {
    title: "Blog | Adrian Rusan",
    description:
      "How I ship production software with a Claude Code agent fleet, and the senior review layer that catches what the agents miss.",
    type: "website",
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
