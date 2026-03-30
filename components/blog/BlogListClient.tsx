'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/lib/blog-types';
import PostCard from './PostCard';
import TagBadge from './TagBadge';

interface BlogListClientProps {
  posts: BlogPost[];
  allTags: string[];
  initialTag?: string;
}

export default function BlogListClient({
  posts,
  allTags,
  initialTag,
}: BlogListClientProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(initialTag ?? null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === '' ||
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(search.toLowerCase());

      const matchesTag =
        activeTag === null || post.frontmatter.tags?.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  const featuredPost = filtered.find((p) => p.frontmatter.featured);
  const regularPosts = filtered.filter((p) => !p.frontmatter.featured);

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white-200/40"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black-200 border border-black-300 text-white placeholder-white-200/40 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple/40 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white-200/40 hover:text-white-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border',
              activeTag === null
                ? 'bg-purple/20 text-purple border-purple/40'
                : 'bg-white/5 text-white-200 border-white/10 hover:bg-purple/10 hover:text-purple hover:border-purple/30',
            ].join(' ')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag === activeTag ? null : tag)}>
              <TagBadge tag={tag} active={tag === activeTag} />
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {(search || activeTag) && (
        <p className="text-sm text-white-200/50 mb-6">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
        </p>
      )}

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white-200/50">
          <p className="text-lg">No posts found.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveTag(null);
            }}
            className="mt-3 text-sm text-purple hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {featuredPost && (
              <motion.div
                key={featuredPost.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <PostCard post={featuredPost} featured />
              </motion.div>
            )}

            {regularPosts.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
