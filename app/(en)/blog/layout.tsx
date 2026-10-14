import type { Metadata } from 'next';
import { BLOG_DESCRIPTION } from '@/data';

export const metadata: Metadata = {
  title: {
    template: '%s | Adrian Rusan',
    default: 'Blog | Adrian Rusan',
  },
  description: BLOG_DESCRIPTION,
  alternates: {
    types: {
      'application/rss+xml': 'https://www.adrian-rusan.com/feed.xml',
    },
  },
};


// Each page renders its own PageShell: the index keeps the closing ask, posts
// end in their PostCta instead (R3-F06).
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
