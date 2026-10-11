import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { notFound } from "next/navigation";
import { getPosts, WORK_DIR } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Card alt = the study title (A1-22); URL /work/<slug>/opengraph-image/cover.
// Drafts yield no entry, so their image 404s.
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const study = (await getPosts(WORK_DIR)).find((s) => s.slug === params.slug);
  return study
    ? [{ id: "cover", alt: study.frontmatter.title, size, contentType }]
    : [];
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
