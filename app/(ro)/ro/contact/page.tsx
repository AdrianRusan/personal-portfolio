import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";

import { roContactPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(
  roContactPage,
  { en: "/contact", ro: "/ro/contact" },
  true,
);

export default function RoContactPage() {
  return (
    <PageShell ro>
      <JsonLd
        data={pageJsonLd({
          path: roContactPage.path,
          name: roContactPage.title,
          description: roContactPage.description,
          type: "ContactPage",
          crumbs: [{ name: "Contact", path: roContactPage.path }],
          inLanguage: "ro-RO",
          home: { name: "Acasă", path: "/ro" },
        })}
      />
      <ProsePage page={roContactPage} />
    </PageShell>
  );
}
