import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

// R3 AI-tell 5: plain links, not a third stack of cards after the offer box.
export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-xl font-semibold tracking-tight text-white mb-4"
      >
        Related posts
      </h2>
      <ul className="divide-y divide-black-300 border-y border-black-300">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-4"
            >
              <span className="font-medium text-white group-hover:text-purple transition-colors">
                {post.frontmatter.title}
              </span>
              <span className="shrink-0 text-sm text-white-200/80">
                {formatDate(post.frontmatter.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
