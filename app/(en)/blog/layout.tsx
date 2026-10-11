import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

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


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <div className="pt-32 sm:pt-36">{children}</div>
    </PageShell>
  );
}
