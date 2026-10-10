import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case studies from documented runs, by Adrian Rusan.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Case studies",
    title: "Case studies from documented runs",
    subtitle:
      "What broke, what I built, the number it moved, and what it taught me about shipping with AI agents.",
    footerRight: "adrian-rusan.com/work",
  });
}
