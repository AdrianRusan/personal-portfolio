import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { ladder } from "@/data/ladder";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  `${ladder.length} offers, every price published: from a €200 strategy call to a reviewed-delivery retainer.`;

export default function Image() {
  return renderOgCard({
    eyebrow: `${ladder.length} offers · Every price published`,
    title: "Your backlog, shipped at agent speed",
    subtitle: "From a €200 strategy call to a reviewed-delivery retainer.",
    footerRight: "adrian-rusan.com/services",
  });
}
