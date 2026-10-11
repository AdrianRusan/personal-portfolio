import { RootShell, siteMetadata } from "../root-shell";

export const metadata = siteMetadata;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
