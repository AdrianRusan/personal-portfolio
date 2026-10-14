import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { teardown } from "@/data/teardown";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${teardown.title}.`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Free · async · no call",
    title: teardown.metaTitle,
    subtitle:
      "Send a repo or a recent PR. Get a 15-minute Loom of the security bugs your AI coding tools wrote that pass tests and merge anyway.",
    footerRight: "adrian-rusan.com/teardown",
  });
}
