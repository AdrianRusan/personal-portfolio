import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProsePage } from "@/components/ProsePage";
import { privacyPage } from "@/data/pages";

export const metadata: Metadata = {
  title: privacyPage.title,
  description: privacyPage.description,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    // R3-F27: no sales block under a legal page; the checklist stays.
    <PageShell hideFooterCta>
      <ProsePage page={privacyPage} />
    </PageShell>
  );
}
