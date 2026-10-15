import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProsePage } from "@/components/ProsePage";
import { roTermsPage } from "@/data/pages";

export const metadata: Metadata = {
  title: roTermsPage.title,
  description: roTermsPage.description,
  alternates: {
    canonical: "/ro/termeni",
    languages: { en: "/terms", ro: "/ro/termeni", "x-default": "/terms" },
  },
};

export default function RoTermsPage() {
  return (
    <PageShell ro hideFooterCta hideEmailCapture>
      <ProsePage page={roTermsPage} updatedLabel="Ultima actualizare" />
    </PageShell>
  );
}
