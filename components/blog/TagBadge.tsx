import Link from 'next/link';
import { tagLabel } from '@/lib/tags';

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  href?: string;
}

export default function TagBadge({ tag, active = false, href }: TagBadgeProps) {
  const classes = [
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
    active
      ? 'bg-accent/10 text-accent-ink border border-accent/40'
      : 'bg-white/5 text-body border border-ink/10 hover:bg-accent/10 hover:text-accent-ink hover:border-accent/30',
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {tagLabel(tag)}
      </Link>
    );
  }

  return <span className={classes}>{tagLabel(tag)}</span>;
}
