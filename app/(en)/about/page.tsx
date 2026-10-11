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
    <PageShell>
      <JsonLd
        data={pageJsonLd({
          path: aboutPage.path,
          name: "About Adrian Rusan",
          description: aboutPage.description,
          type: "AboutPage",
          crumbs: [{ name: "About", path: aboutPage.path }],
        })}
      />
      <ProsePage page={aboutPage}>
        <Avatar className="mt-8 h-16 w-16 text-lg" />
      </ProsePage>
    </PageShell>
  );
}
