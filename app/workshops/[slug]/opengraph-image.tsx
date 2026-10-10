import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { workshops, type WorkshopSlug } from "@/data/workshops";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Claude Code team workshop: parallel agents, worktrees and review gates.";

export function generateStaticParams() {
  return Object.keys(workshops).map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: WorkshopSlug }>;
}) {
  const w = workshops[(await params).slug];
  return renderOgCard({
    eyebrow: `Team workshop · ${w.length} · up to ${w.maxPeople} people`,
    title: w.title,
    subtitle: w.description,
    footerRight: `adrian-rusan.com/workshops/${w.slug}`,
  });
}
