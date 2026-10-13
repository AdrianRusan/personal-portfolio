import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-types';
import { formatDate } from '@/lib/blog-types';
import TagBadge from './TagBadge';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
  // /ro renders the same cards with Romanian labels and dates.
  dateLocale?: string;
  featuredLabel?: string;
}

export default function PostCard({
  post,
  featured = false,
  headingLevel: Heading = 'h2',
  dateLocale,
  featuredLabel = 'Featured',
}: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        className={[
          // #114 M: a ruled entry, no card box.
          'h-full flex flex-col gap-4 border-t border-white/15 pt-6 pb-8',
          featured ? 'md:flex-row md:items-start md:gap-6' : '',
        ].join(' ')}
      >
        <div className="flex flex-col gap-3 flex-1">
          {frontmatter.featured && (
            <span className="inline-flex items-center self-start px-2 py-0.5 rounded-full text-xs font-medium bg-purple/10 text-blue-100 border border-purple/30">
              {featuredLabel}
            </span>
          )}

          <Heading
            className={[
              'type-light text-white text-balance group-hover:underline decoration-purple underline-offset-4',
              featured ? 'text-3xl md:text-4xl' : 'text-2xl',
            ].join(' ')}
          >
            {frontmatter.title}
          </Heading>

          <p className="text-white-200 leading-relaxed line-clamp-3 max-w-[40em]">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {frontmatter.tags?.slice(0, 2).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-white-200/70 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(frontmatter.date, dateLocale)}
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
