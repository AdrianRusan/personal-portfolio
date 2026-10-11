import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { contactPage } from "@/data/pages";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = contactPage.description;

export default function Image() {
  return renderOgCard({
    eyebrow: "Bucharest, Romania · remote",
    title: contactPage.title,
    subtitle: "Book a call, email, or send a repo for a free teardown.",
    footerRight: `adrian-rusan.com${contactPage.path}`,
  });
}
