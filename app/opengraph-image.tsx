import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Adrian Rusan — Agent-Accelerated Delivery, Reviewed. A senior engineer security-reviews every PR.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Agent speed · Every PR senior-reviewed",
    title: "Agent-Accelerated Delivery, Reviewed",
    subtitle:
      "An AI agent fleet ships your backlog. A senior engineer security-reviews every pull request before you see it.",
    footerRight: "adrian-rusan.com",
  });
}
