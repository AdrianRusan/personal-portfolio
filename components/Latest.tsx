import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import { YOUTUBE_CHANNEL_ID } from "@/data";
import { getPosts, formatDate } from "@/lib/blog";
import type { PostTitles } from "@/lib/blog-types";
import { getLatestVideos } from "@/lib/youtube";

// Server component: posts come from disk, videos from the channel RSS (cached 1 h).
const en = {
  headingBefore: "Latest from",
  youtube: "YouTube",
  blog: "the blog",
  and: " and ",
  intro: "How I run Claude Code agents and review what they ship.",
  watch: "Watch on YouTube",
  all: "All posts →",
  dateLocale: "en-US",
  featured: "Featured",
  minRead: "min read",
  // Per-slug title/description overrides; the links still go to the EN post.
  titles: {} as PostTitles,
};
export type LatestCopy = typeof en;

const Latest = async ({ copy = en }: { copy?: LatestCopy }) => {
  const [posts, videos] = await Promise.all([
    getPosts(),
    getLatestVideos(YOUTUBE_CHANNEL_ID),
  ]);
  const latestPosts = posts.slice(0, 3);
  if (latestPosts.length === 0 && videos.length === 0) return null;

  return (
    <section
      id="latest"
      aria-labelledby="latest-heading"
      className="max-w-7xl mx-auto px-5 sm:px-10 py-20"
    >
      <h2 id="latest-heading" className="heading">
        {copy.headingBefore}{" "}
        <span className="text-purple">
          {[
            videos.length > 0 && copy.youtube,
            latestPosts.length > 0 && copy.blog,
          ]
            .filter(Boolean)
            .join(copy.and)}
        </span>
      </h2>
      <p className="text-white-200 text-center mt-4">{copy.intro}</p>

      {videos.length > 0 && (
        <ul className="grid gap-6 md:grid-cols-3 mt-10">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl border border-black-300 bg-black-200 overflow-hidden transition-all duration-300 hover:border-purple/30 hover:-translate-y-0.5"
              >
                <Image
                  src={video.thumbnail}
                  alt=""
                  width={480}
                  height={360}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-white group-hover:text-purple transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white-200/70 mt-2">
                    {video.published &&
                      `${formatDate(video.published.slice(0, 10), copy.dateLocale)} · `}
                    {copy.watch}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {latestPosts.length > 0 && (
        <ul className="grid gap-6 md:grid-cols-3 mt-10">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <PostCard
                post={{
                  ...post,
                  frontmatter: { ...post.frontmatter, ...copy.titles[post.slug] },
                  readingTime: post.readingTime.replace("min read", copy.minRead),
                }}
                headingLevel="h3"
                dateLocale={copy.dateLocale}
                featuredLabel={copy.featured}
              />
            </li>
          ))}
        </ul>
      )}

      {latestPosts.length > 0 && (
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-purple hover:underline underline-offset-4"
          >
            {copy.all}
          </Link>
        </div>
      )}
    </section>
  );
};

export default Latest;
