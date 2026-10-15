import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import { termsPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(termsPage, {
  en: "/terms",
  ro: "/ro/termeni",
});

export default function TermsPage() {
  return (
    // Like /privacy: no sales block or checklist under a legal page.
    <PageShell hideFooterCta hideEmailCapture>
      <JsonLd
        data={pageJsonLd({
          path: termsPage.path,
          name: termsPage.title,
          description: termsPage.description,
          crumbs: [{ name: termsPage.title, path: termsPage.path }],
        })}
      />
      <ProsePage page={termsPage} />
    </PageShell>
  );
}
