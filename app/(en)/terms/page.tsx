import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProsePage } from "@/components/ProsePage";
import { termsPage } from "@/data/pages";

export const metadata: Metadata = {
  title: termsPage.title,
  description: termsPage.description,
  alternates: {
    canonical: "/terms",
    languages: { en: "/terms", ro: "/ro/termeni", "x-default": "/terms" },
  },
};

export default function TermsPage() {
  return (
    // Like /privacy: no sales block or checklist under a legal page.
    <PageShell hideFooterCta hideEmailCapture>
      <ProsePage page={termsPage} />
    </PageShell>
  );
}
