import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { termsPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = termsPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "Adrian Rusan · PFA, Romania",
    title: termsPage.title,
    subtitle: "Merge-ready, payment, guarantees and liability.",
    footerRight: `adrian-rusan.com${termsPage.path}`,
  });
}
