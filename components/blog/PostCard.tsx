import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-types';
import { formatDate } from '@/lib/blog-types';
import TagBadge from './TagBadge';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        className={[
          'h-full flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300',
          'bg-black-200 border-black-300',
          'hover:border-purple/30 hover:shadow-lg hover:shadow-purple/5 hover:-translate-y-0.5',
          featured ? 'md:flex-row md:items-start md:gap-6' : '',
        ].join(' ')}
      >
        <div className="flex flex-col gap-3 flex-1">
          {frontmatter.featured && (
            <span className="inline-flex items-center self-start px-2 py-0.5 rounded-full text-xs font-medium bg-purple/20 text-purple border border-purple/30">
              Featured
            </span>
          )}

          <h2
            className={[
              'font-semibold text-white group-hover:text-purple transition-colors',
              featured ? 'text-xl md:text-2xl' : 'text-lg',
            ].join(' ')}
          >
            {frontmatter.title}
          </h2>

          <p className="text-white-200 text-sm leading-relaxed line-clamp-3">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {frontmatter.tags?.slice(0, 4).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-white-200/70 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {readingTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
