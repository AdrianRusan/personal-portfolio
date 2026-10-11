import type { BlogPost } from "@/lib/blog-types";
import PostCard from "./PostCard";

// Card titles are h3 so other posts' titles don't pad this post's outline.
export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-xl font-semibold tracking-tight text-white mb-6"
      >
        Related posts
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
