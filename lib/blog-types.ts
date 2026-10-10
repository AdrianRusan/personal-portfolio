// End-of-post offer a post sells; see lib/blog-cta.ts. Defaults to teardown.
export type BlogCta = 'teardown' | 'audit' | 'workshop' | 'harness';

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

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}
