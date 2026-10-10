import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section
      {...(posts.length > 0 ? { "aria-labelledby": "related-heading" } : {})}
      className="mt-16"
    >
      {posts.length > 0 && (
        <>
          <h2
            id="related-heading"
            className="text-xl font-semibold tracking-tight text-white mb-6"
          >
            Related posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
      <p className="text-sm text-white-200 mt-8">
        Want this done on your codebase?{" "}
        <Link
          href="/services"
          className="text-purple hover:text-purple/80 underline underline-offset-2 decoration-purple/40 transition-colors"
        >
          See services and prices →
        </Link>
      </p>
    </section>
  );
}
