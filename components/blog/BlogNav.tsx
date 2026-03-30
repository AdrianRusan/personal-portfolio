import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';

interface BlogNavProps {
  showBackToPost?: boolean;
  postTitle?: string;
}

export default function BlogNav({ showBackToPost, postTitle }: BlogNavProps) {
  return (
    <nav className="sticky top-0 z-40 w-full floating-nav px-6 py-3 mb-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-white-200 hover:text-white transition-colors text-sm"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <span className="text-white/20 hidden sm:inline">|</span>

          <Link
            href="/blog"
            className="text-sm font-medium text-white hover:text-purple transition-colors"
          >
            Blog
          </Link>

          {showBackToPost && postTitle && (
            <>
              <span className="text-white/20">/</span>
              <span className="text-sm text-white-200 truncate max-w-[200px] sm:max-w-xs">
                {postTitle}
              </span>
            </>
          )}
        </div>

        <Link
          href="/feed.xml"
          className="flex items-center gap-1.5 text-white-200 hover:text-orange-400 transition-colors text-sm"
          aria-label="RSS Feed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Rss size={15} />
          <span className="hidden sm:inline text-xs">RSS</span>
        </Link>
      </div>
    </nav>
  );
}
