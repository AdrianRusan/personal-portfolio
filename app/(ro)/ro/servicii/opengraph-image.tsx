import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { RO_SERVICES_DESCRIPTION, RO_SERVICES_TITLE } from "@/data/ro-services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = RO_SERVICES_DESCRIPTION;

export default function Image() {
  return renderOgCard({
    eyebrow: "Prețuri în EUR, fără TVA",
    title: RO_SERVICES_TITLE,
    subtitle:
      "Sesiuni de arhitectură, audit de cod, workshop-uri, automatizări și sprinturi de livrare, cu fiecare PR revizuit de un inginer senior.",
    footerRight: "adrian-rusan.com/ro/servicii",
  });
}
