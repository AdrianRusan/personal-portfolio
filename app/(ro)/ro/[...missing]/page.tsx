import type { Metadata } from "next";
import { notFound } from "next/navigation";

// #143 I-23: Next renders only the root 404 for unmatched URLs, so /ro/*
// routes here and throws to app/(ro)/ro/not-found.tsx (RO layout, RO copy).
// #147: not-found.tsx metadata is ignored, so the 404 title lives here.
export const metadata: Metadata = {
  title: { absolute: "Pagina nu există | Adrian Rusan" },
  description: "Pagina căutată nu există.",
};

export default function RoMissing() {
  notFound();
}
