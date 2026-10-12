import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { roContactPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = roContactPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "Timișoara, România · remote",
    title: roContactPage.title,
    subtitle: "Programează o discuție, scrie-mi sau trimite un repo.",
    footerRight: `adrian-rusan.com${roContactPage.path}`,
  });
}
