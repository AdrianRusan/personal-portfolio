import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import { Avatar } from "@/components/Bio";
import { aboutPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(aboutPage, {
  en: "/about",
  ro: "/ro/despre",
});

export default function AboutPage() {
  return (
    <PageShell hideEmailCapture>
      <JsonLd
        data={pageJsonLd({
          path: aboutPage.path,
          name: "About Adrian Rusan",
          description: aboutPage.description,
          type: "AboutPage",
          crumbs: [{ name: "About", path: aboutPage.path }],
        })}
      />
      <ProsePage page={aboutPage} photo={<Avatar className="h-24 w-24" />} />
    </PageShell>
  );
}
