import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { hasPhoto } from './AuthorBox';
import type { BlogFrontmatter } from '@/lib/blog-types';
import { formatDate } from '@/lib/blog-types';
import TagBadge from './TagBadge';

interface PostHeaderProps {
  frontmatter: BlogFrontmatter;
  readingTime: string;
}

export default function PostHeader({ frontmatter, readingTime }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap gap-2 mb-4">
        {/* A4 F11: two tags keep the H1 near the top on phones; the rest are on the card. */}
        {frontmatter.tags?.slice(0, 2).map((tag) => (
          <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
        ))}
      </div>

      <h1 className="type-title-sm text-ink mb-6 text-balance">
        {frontmatter.title}
      </h1>

      <p className="text-body text-lg leading-relaxed mb-6 max-w-3xl">
        {frontmatter.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-body/70 pb-8 border-b border-rule">
        <div className="flex items-center gap-2">
          {hasPhoto ? (
            <Image
              src="/adrian.jpg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-accent/30"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-raised border border-rule flex items-center justify-center text-muted font-semibold text-xs"
            >
              AR
            </div>
          )}
          {/* R3-F35: the avatar names him on phones; keeps the meta row on one line. */}
          <span className="sr-only sm:not-sr-only text-muted">Adrian Rusan</span>
        </div>

        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDate(frontmatter.date)}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {readingTime}
        </span>
      </div>
    </header>
  );
}
