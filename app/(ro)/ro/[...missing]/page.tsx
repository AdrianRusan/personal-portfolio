import { notFound } from "next/navigation";

// #143 I-23: Next renders only the root 404 for unmatched URLs, so /ro/*
// routes here and throws to app/(ro)/ro/not-found.tsx (RO layout, RO copy).
export default function RoMissing() {
  notFound();
}
