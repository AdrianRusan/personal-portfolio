import { RootShell, siteMetadata } from "../root-shell";

export const metadata = siteMetadata;

// D1 (A1-04): /ro* is its own root layout, so the document itself is
// <html lang="ro">, matching the hreflang="ro" annotations.
export default function RoLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ro">{children}</RootShell>;
}
