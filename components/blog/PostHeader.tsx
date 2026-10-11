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
        {frontmatter.tags?.map((tag) => (
          <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
        ))}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
        {frontmatter.title}
      </h1>

      <p className="text-white-200 text-lg leading-relaxed mb-6 max-w-3xl">
        {frontmatter.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white-200/70 pb-8 border-b border-black-300">
        <div className="flex items-center gap-2">
          {hasPhoto ? (
            <Image
              src="/adrian.jpg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-purple/30"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-black-200 border border-black-300 flex items-center justify-center text-white-100 font-semibold text-xs"
            >
              AR
            </div>
          )}
          {/* R3-F35: the avatar names him on phones; keeps the meta row on one line. */}
          <span className="sr-only sm:not-sr-only text-white-100">Adrian Rusan</span>
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
