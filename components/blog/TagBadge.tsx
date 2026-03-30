import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  href?: string;
}

export default function TagBadge({ tag, active = false, href }: TagBadgeProps) {
  const classes = [
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
    active
      ? 'bg-purple/20 text-purple border border-purple/40'
      : 'bg-white/5 text-white-200 border border-white/10 hover:bg-purple/10 hover:text-purple hover:border-purple/30',
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {tag}
      </Link>
    );
  }

  return <span className={classes}>{tag}</span>;
}
