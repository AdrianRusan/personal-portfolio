import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { notFound } from "next/navigation";
import { getPosts, WORK_DIR } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study by Adrian Rusan";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Drafts must not leak through the image route (dynamicParams misses it).
  const study = (await getPosts(WORK_DIR)).find((s) => s.slug === slug);
  if (!study) notFound();
  const { frontmatter } = study;
  return renderOgCard({
    eyebrow: "Case study",
    title: frontmatter.title,
    subtitle: frontmatter.description,
    footerRight: `adrian-rusan.com/work/${slug}`,
  });
}
