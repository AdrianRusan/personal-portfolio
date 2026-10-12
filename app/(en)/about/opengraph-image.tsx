import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { aboutPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = aboutPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "10+ years in production · Timișoara",
    title: aboutPage.title,
    subtitle: "Agents ship the backlog. I review every PR.",
    footerRight: `adrian-rusan.com${aboutPage.path}`,
  });
}
