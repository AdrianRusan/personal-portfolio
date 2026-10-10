import { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { workshops } from "@/data/workshops";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.adrian-rusan.com";
  const lastModified = new Date();

  const posts = await getPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teardown`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...Object.keys(workshops).map((slug) => ({
      url: `${baseUrl}/workshops/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
