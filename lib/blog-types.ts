// End-of-post offer a post sells; see lib/blog-cta.ts. Defaults to teardown.
export type BlogCta =
  | 'teardown'
  | 'audit'
  | 'workshop'
  | 'harness'
  | 'automation'
  | 'reviewed-pr';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  image?: string;
  language?: string;
  cta?: BlogCta;
  // Whole <title> (≤60 chars, no site suffix) when the H1 runs long (A1-09).
  seoTitle?: string;
  // Last substantive edit; feeds dateModified and the sitemap lastmod (A1-11).
  updated?: string;
  // Rendered as the post's FAQ section and its FAQPage JSON-LD (A1-12).
  faq?: { q: string; a: string }[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;
  headings: Heading[];
}

export interface BlogPostWithSource extends BlogPost {
  source: string;
}

// A1-09: keep <title> ≤60. The ' | Adrian Rusan' suffix (15 chars) is added
// only when it still fits.
export const pageTitle = (t: string) => (t.length > 45 ? { absolute: t } : t);

export function formatDate(dateString: string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

// Localized card copy keyed by slug (the /ro homepage).
export type PostTitles = Record<string, { title: string; description: string }>;
