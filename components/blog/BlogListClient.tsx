'use client';

import { useState, useMemo, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/lib/blog-types';
import PostCard from './PostCard';
import TagBadge from './TagBadge';
import { filterTags } from '@/lib/tags';

// R3-F24: a search box only earns its space once there are enough posts.
const SEARCH_MIN_POSTS = 15;

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
  const searchRef = useRef<HTMLInputElement>(null);
  const [activeTag, setActiveTagState] = useState<string | null>(
    initialTag && allTags.includes(initialTag) ? initialTag : null,
  );
  // #143 I-60: keep ?tag= in the URL so a filter survives reload and sharing.
  // history.replaceState updates Next's router without refetching the page.
  const setActiveTag = (tag: string | null) => {
    setActiveTagState(tag);
    window.history.replaceState(
      null,
      '',
      tag ? `/blog?tag=${encodeURIComponent(tag)}` : '/blog',
    );
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === '' ||
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTag =
        activeTag === null || post.frontmatter.tags?.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  const tags = filterTags(allTags, initialTag);
  const showSearch = posts.length >= SEARCH_MIN_POSTS;

  const featuredPost = filtered.find((p) => p.frontmatter.featured);
  const regularPosts = filtered.filter((p) => !p.frontmatter.featured);

  return (
    <div>
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-body/40"
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search posts..."
              aria-label="Search posts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-raised border border-rule text-ink placeholder-body/75 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            />
            {search && (
              <button
                // The button unmounts once search is empty; keep focus in the box.
                onClick={() => {
                  setSearch('');
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 hover:text-body transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tags. On phones the row scrolls; the right-edge fade says so. */}
      {tags.length > 0 && (
        <div className="flex flex-nowrap sm:flex-wrap gap-2 mb-8 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 max-sm:[mask-image:linear-gradient(to_right,black_85%,transparent)]">
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={[
              'shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border',
              activeTag === null
                ? 'bg-accent/10 text-accent-ink border-accent/40'
                : 'bg-white/5 text-body border-ink/10 hover:bg-accent/10 hover:text-accent-ink hover:border-accent/30',
            ].join(' ')}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className="shrink-0"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              aria-pressed={tag === activeTag}
            >
              <TagBadge tag={tag} active={tag === activeTag} />
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {(search || activeTag) && (
        <p className="text-sm text-body/75 mb-6">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
        </p>
      )}

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-body/75">
          <p className="text-lg">No posts found.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveTag(null);
            }}
            className="mt-3 text-sm text-accent hover:underline"
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
              <div className="grid gap-x-10 md:grid-cols-2">
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
