'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://www.adrian-rusan.com/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 pt-8 mt-10 border-t border-black-300">
      <span className="text-sm text-white-200/60 mr-1">Share:</span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white-200 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 hover:text-[#0077b5] transition-all text-sm"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={15} />
        <span className="hidden sm:inline">LinkedIn</span>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white-200 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all text-sm"
        aria-label="Share on X (Twitter)"
      >
        <FaXTwitter size={15} />
        <span className="hidden sm:inline">X</span>
      </a>

      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white-200 hover:bg-purple/10 hover:border-purple/30 hover:text-purple transition-all text-sm"
        aria-label={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? (
          <Check size={15} className="text-green-400" />
        ) : (
          <Link2 size={15} />
        )}
        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
    </div>
  );
}
