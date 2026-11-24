import { MetadataRoute } from "next";
import { getPosts, WORK_DIR } from "@/lib/blog";
import { workshops } from "@/data/workshops";

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

// Module scope: set once per deploy, not on every hourly regeneration, so the
// static pages' lastmod doesn't churn.
const lastModified = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.adrian-rusan.com";
  // hreflang pairs, listed on both sides (brief R7)
  const home = { en: baseUrl, ro: `${baseUrl}/ro`, "x-default": baseUrl };
  const services = {
    en: `${baseUrl}/services`,
    ro: `${baseUrl}/ro/servicii`,
    "x-default": `${baseUrl}/services`,
  };

  const pair = (en: string, ro: string) => ({
    en: `${baseUrl}${en}`,
    ro: `${baseUrl}${ro}`,
    "x-default": `${baseUrl}${en}`,
  });
  const trustPages: MetadataRoute.Sitemap = [
    ["/about", "/ro/despre"],
    ["/contact", "/ro/contact"],
    ["/terms", "/ro/termeni"],
  ].flatMap(([en, ro]) =>
    [en!, ro!].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: pair(en!, ro!) },
    })),
  );

  const posts = await getPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const studies = await getPosts(WORK_DIR);
  const workEntries: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(study.frontmatter.updated ?? study.frontmatter.date),
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
    ...trustPages,
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
    // The index 404s with no studies, so it is listed only when it has some.
    ...(studies.length
      ? [
          {
            url: `${baseUrl}/work`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...workEntries,
    ...blogEntries,
  ];
}
