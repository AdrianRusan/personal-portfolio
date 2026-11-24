import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { roTermsPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = roTermsPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "Adrian Rusan · PFA, România",
    title: roTermsPage.title,
    subtitle: "Gata de merge, plată, garanții și răspundere.",
    footerRight: `adrian-rusan.com${roTermsPage.path}`,
  });
}
