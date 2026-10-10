import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Field notes on agent-accelerated delivery, by Adrian Rusan.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Blog · Field notes",
    title: "Field notes on agent-accelerated delivery",
    subtitle:
      "How I ship production software with a Claude Code agent fleet, and the senior review layer that catches what the agents miss.",
    footerRight: "adrian-rusan.com/blog",
  });
}
