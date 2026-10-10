import { MetadataRoute } from "next";
import { getPosts, WORK_DIR } from "@/lib/blog";
import { workshops } from "@/data/workshops";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.adrian-rusan.com";
  const lastModified = new Date();
  // hreflang pairs, listed on both sides (brief R7)
  const home = { en: baseUrl, ro: `${baseUrl}/ro`, "x-default": baseUrl };
  const services = {
    en: `${baseUrl}/services`,
    ro: `${baseUrl}/ro/servicii`,
    "x-default": `${baseUrl}/services`,
  };

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
      alternates: { languages: home },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: services },
    },
    {
      url: `${baseUrl}/ro`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: home },
    },
    {
      url: `${baseUrl}/ro/servicii`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: services },
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
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...workEntries,
    ...blogEntries,
  ];
}
