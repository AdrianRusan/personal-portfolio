import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import Bio from "@/components/Bio";
import { roBio } from "@/data/ro-home";
import { roAboutPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(
  roAboutPage,
  { en: "/about", ro: "/ro/despre" },
  true,
);

export default function RoAboutPage() {
  return (
    <PageShell ro>
      <JsonLd
        data={pageJsonLd({
          path: roAboutPage.path,
          name: roAboutPage.title,
          description: roAboutPage.description,
          type: "AboutPage",
          crumbs: [{ name: "Despre", path: roAboutPage.path }],
          inLanguage: "ro-RO",
          home: { name: "Acasă", path: "/ro" },
        })}
      />
      <ProsePage page={roAboutPage}>
        <Bio className="mt-8" copy={roBio} />
      </ProsePage>
    </PageShell>
  );
}
