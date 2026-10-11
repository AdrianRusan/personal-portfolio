import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Notes from shipping with Claude Code agents, by Adrian Rusan.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Blog",
    title: "Notes from shipping with Claude Code agents",
    subtitle:
      "How I ship production software with a Claude Code agent fleet, and the senior review layer that catches what the agents miss.",
    footerRight: "adrian-rusan.com/blog",
  });
}
