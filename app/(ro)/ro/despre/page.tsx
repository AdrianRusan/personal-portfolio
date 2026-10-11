import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import { Avatar } from "@/components/Bio";
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
          name: "Despre Adrian Rusan",
          description: roAboutPage.description,
          type: "AboutPage",
          crumbs: [{ name: "Despre", path: roAboutPage.path }],
          inLanguage: "ro-RO",
          home: { name: "Acasă", path: "/ro" },
        })}
      />
      <ProsePage page={roAboutPage}>
        <Avatar className="mt-8 h-16 w-16 text-lg" />
      </ProsePage>
    </PageShell>
  );
}
