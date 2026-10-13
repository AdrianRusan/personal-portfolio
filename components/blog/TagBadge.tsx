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
      ? 'bg-purple/10 text-blue-100 border border-purple/40'
      : 'bg-white/5 text-white-200 border border-white/10 hover:bg-purple/10 hover:text-blue-100 hover:border-purple/30',
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
