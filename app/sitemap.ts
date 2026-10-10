import { MetadataRoute } from "next";
import { getPosts, WORK_DIR } from "@/lib/blog";

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

  const studies = await getPosts(WORK_DIR);
  const workEntries: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(study.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
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
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...workEntries,
    ...blogEntries,
  ];
}
