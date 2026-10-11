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
    <PageShell>
      <ProsePage page={privacyPage} />
    </PageShell>
  );
}
