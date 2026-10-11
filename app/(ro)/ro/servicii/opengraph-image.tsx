import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Servicii AI cu prețuri afișate, de la o sesiune de 110 € la un retainer lunar.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Prețuri în EUR, fără TVA",
    title: "De la o sesiune de 110 € la un retainer lunar",
    subtitle:
      "Strategie, audit, workshop-uri, automatizări și sprinturi de livrare, cu fiecare PR revizuit de un inginer senior.",
    footerRight: "adrian-rusan.com/ro/servicii",
  });
}
