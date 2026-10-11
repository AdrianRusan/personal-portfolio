import { PageShell } from "@/components/PageShell";
import { ProsePage, proseMetadata } from "@/components/ProsePage";
import Bio from "@/components/Bio";
import { aboutPage } from "@/data/pages";
import { JsonLd, pageJsonLd } from "@/lib/page-schema";

export const metadata = proseMetadata(aboutPage, {
  en: "/about",
  ro: "/ro/despre",
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={pageJsonLd({
          path: aboutPage.path,
          name: aboutPage.title,
          description: aboutPage.description,
          type: "AboutPage",
          crumbs: [{ name: "About", path: aboutPage.path }],
        })}
      />
      <ProsePage page={aboutPage}>
        <Bio className="mt-8" />
      </ProsePage>
    </PageShell>
  );
}
