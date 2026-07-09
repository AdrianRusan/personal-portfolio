import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Agent-Accelerated Delivery Sprints — fixed-scope, fixed-price, every PR security-reviewed.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Delivery Sprints · Fixed scope, fixed price",
    title: "Your backlog, shipped at agent speed",
    subtitle:
      "Every PR security-reviewed by a senior engineer before you see it. Fixed-scope delivery sprints for startup founders and CTOs.",
    footerRight: "adrian-rusan.com/services",
  });
}
