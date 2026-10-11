import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";

import { contactPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(contactPage, {
  en: "/contact",
  ro: "/ro/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={pageJsonLd({
          path: contactPage.path,
          name: contactPage.title,
          description: contactPage.description,
          type: "ContactPage",
          crumbs: [{ name: "Contact", path: contactPage.path }],
        })}
      />
      <ProsePage page={contactPage} />
    </PageShell>
  );
}
