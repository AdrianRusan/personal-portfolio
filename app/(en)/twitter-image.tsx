import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Adrian Rusan: I ship your backlog with AI agents and review every PR myself, security first.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Senior full-stack engineer · 10+ years",
    title: "I ship your backlog with AI agents and review every PR myself",
    subtitle:
      "Security first: injection, auth, secrets and access control, checked line by line before a PR reaches you.",
    footerRight: "adrian-rusan.com",
  });
}
