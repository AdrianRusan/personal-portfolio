import type { Metadata } from 'next';
import BlogNav from '@/components/blog/BlogNav';

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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-black-100 bg-white">
      <BlogNav />
      <main>{children}</main>
    </div>
  );
}
