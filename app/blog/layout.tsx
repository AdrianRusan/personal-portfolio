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

const blogNavItems = [
  { name: 'Home', link: '/' },
  { name: 'Blog', link: '/blog' },
  { name: 'Services', link: '/services' },
  { name: 'Work', link: '/work' },
  { name: 'RSS', link: '/feed.xml' },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell navItems={blogNavItems}>
      <div className="pt-32 sm:pt-36">{children}</div>
    </PageShell>
  );
}
