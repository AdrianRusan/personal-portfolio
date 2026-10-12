import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import { ContactOptions } from "@/components/ContactOptions";
import { contactPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(contactPage, {
  en: "/contact",
  ro: "/ro/contact",
});

export default function ContactPage() {
  return (
    <PageShell hideFooterCta hideEmailCapture>
      <JsonLd
        data={pageJsonLd({
          path: contactPage.path,
          name: contactPage.title,
          description: contactPage.description,
          type: "ContactPage",
          crumbs: [{ name: "Contact", path: contactPage.path }],
        })}
      />
      <ProsePage page={contactPage}>
        <ContactOptions options={contactPage.options ?? []} />
      </ProsePage>
    </PageShell>
  );
}
