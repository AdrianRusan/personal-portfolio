import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import { roTermsPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(
  roTermsPage,
  { en: "/terms", ro: "/ro/termeni" },
  true,
);

export default function RoTermsPage() {
  return (
    <PageShell ro hideFooterCta hideEmailCapture>
      <JsonLd
        data={pageJsonLd({
          path: roTermsPage.path,
          name: roTermsPage.title,
          description: roTermsPage.description,
          crumbs: [{ name: "Termeni", path: roTermsPage.path }],
          inLanguage: "ro-RO",
          home: { name: "Acasă", path: "/ro" },
        })}
      />
      <ProsePage page={roTermsPage} updatedLabel="Ultima actualizare" />
    </PageShell>
  );
}
