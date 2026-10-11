import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Adrian Rusan',
    default: 'Blog | Adrian Rusan',
  },
  description:
    'Field notes on shipping production software with Claude Code agents and senior review.',
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
