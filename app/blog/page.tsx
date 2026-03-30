import type { Metadata } from 'next';
import { getPosts, getAllTags } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles on React, Next.js, TypeScript, and modern web development by Adrian Rusan.',
  openGraph: {
    title: 'Blog | Adrian Rusan',
    description:
      'Technical articles on React, Next.js, TypeScript, and modern web development.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const [posts, allTags] = await Promise.all([getPosts(), getAllTags()]);

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Blog
        </h1>
        <p className="text-white-200 text-lg max-w-xl">
          Writing about React, Next.js, TypeScript, and lessons from 8 years of
          building for the web.
        </p>
      </div>

      <BlogListClient posts={posts} allTags={allTags} initialTag={tag} />
    </div>
  );
}
