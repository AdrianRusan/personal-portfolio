import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Livrare de software cu agenți AI, cu fiecare PR verificat de un inginer senior.";

export default function Image() {
  return renderOgCard({
    eyebrow: "Consultanță · Training · Implementare · Livrare",
    title: "Cod livrat în ritmul agenților AI",
    subtitle:
      "Fiecare PR verificat pentru securitate de un inginer senior înainte să ajungă la tine. De la 110 €.",
    footerRight: "adrian-rusan.com/ro",
  });
}
