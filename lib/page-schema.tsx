// Per-page WebPage + BreadcrumbList JSON-LD (A1-05). The root layout carries
// only WebSite + Person, so every page says what it is, not "the homepage".
export const SITE_URL = "https://www.adrian-rusan.com";

export interface Crumb {
  name: string;
  // Site path ("/blog") or absolute URL.
  path: string;
}

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;

export function pageJsonLd({
  path,
  name,
  description,
  crumbs,
  type = "WebPage",
  inLanguage = "en-US",
}: {
  path: string;
  name: string;
  description?: string;
  // Trail after Home, ending with this page.
  crumbs: Crumb[];
  type?: "WebPage" | "CollectionPage";
  inLanguage?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    },
  };
}

// CollectionPage's list of entries (/blog, /work).
export const itemListJsonLd = (paths: string[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: paths.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(p),
  })),
});

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

// One <script> per JSON-LD payload. JSON.stringify escapes our own static data;
// "<" is escaped too so frontmatter text can never close the script tag.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
