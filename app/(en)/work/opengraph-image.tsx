import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
import { WORK_DESCRIPTION, WORK_TITLE } from "@/data/work";

export const alt = `${WORK_TITLE}, by Adrian Rusan.`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Case studies",
    title: WORK_TITLE,
    subtitle: WORK_DESCRIPTION,
    footerRight: "adrian-rusan.com/work",
  });
}
