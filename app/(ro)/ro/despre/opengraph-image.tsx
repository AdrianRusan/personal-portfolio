import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { roAboutPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = roAboutPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "Peste 10 ani în producție · București",
    title: roAboutPage.title,
    subtitle: "Agenții livrează backlog-ul. Eu verific fiecare PR.",
    footerRight: `adrian-rusan.com${roAboutPage.path}`,
  });
}
