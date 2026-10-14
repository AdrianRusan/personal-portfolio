import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SERVICES_TITLE } from "@/data";
import { ladder } from "@/data/ladder";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  `${SERVICES_TITLE}: ${ladder.length} offers, every price published. Agents write the code, I review every PR.`;

export default function Image() {
  return renderOgCard({
    eyebrow: `${ladder.length} offers · Every price published`,
    title: SERVICES_TITLE,
    subtitle: "Agents write the code. I review every PR, security first, at a price fixed before work starts.",
    footerRight: "adrian-rusan.com/services",
  });
}
