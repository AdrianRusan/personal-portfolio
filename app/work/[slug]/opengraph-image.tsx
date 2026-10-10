import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPost, WORK_DIR } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study by Adrian Rusan";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getPost(slug, WORK_DIR);
  return renderOgCard({
    eyebrow: "Case study",
    title: frontmatter.title,
    subtitle: frontmatter.description,
    footerRight: `adrian-rusan.com/work/${slug}`,
  });
}
