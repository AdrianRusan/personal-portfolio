import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "8 offers, every price published: from a €200 strategy call to a reviewed-delivery retainer.";

export default function Image() {
  return renderOgCard({
    eyebrow: "8 offers · Every price published",
    title: "Your backlog, shipped at agent speed",
    subtitle: "From a €200 strategy call to a reviewed-delivery retainer.",
    footerRight: "adrian-rusan.com/services",
  });
}
