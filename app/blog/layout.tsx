import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: {
    template: '%s | Adrian Rusan Blog',
    default: 'Blog | Adrian Rusan',
  },
  description:
    'Technical articles on React, Next.js, TypeScript, and modern web development by Adrian Rusan.',
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
  { name: 'Work', link: '/#work' },
  { name: 'RSS', link: '/feed.xml' },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell navItems={blogNavItems}>
      <div className="pt-32 sm:pt-36">{children}</div>
    </PageShell>
  );
}
