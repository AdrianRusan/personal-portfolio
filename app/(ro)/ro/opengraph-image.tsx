import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { roHero, RO_HOME_DESCRIPTION } from "@/data/ro-home";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = RO_HOME_DESCRIPTION;

export default function Image() {
  return renderOgCard({
    eyebrow: "Inginer full-stack senior · peste 10 ani",
    title: roHero.heading,
    subtitle:
      "Fiecare PR verificat pentru securitate de un inginer senior înainte să ajungă la tine. Preț fix.",
    footerRight: "adrian-rusan.com/ro",
  });
}
