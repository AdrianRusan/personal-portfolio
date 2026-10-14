'use client';

import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const code = preRef.current.querySelector('code')?.textContent ?? '';
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        className={[
          className ?? '',
          'rounded-xl overflow-x-auto text-sm leading-relaxed',
          // A4 F10: room for the copy button, so it never sits on wrapped code.
          'pr-12',
          // R3-F16: wrap on phones so the line that matters is never cut off.
          'max-sm:whitespace-pre-wrap max-sm:break-words',
          'border border-ink/5 bg-[#1e1e2e]',
        ].join(' ')}
        {...props}
      >
        {children}
      </pre>

      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-all duration-200"
        aria-label={copied ? 'Copied!' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check size={13} className="text-green-400" />
        ) : (
          <Copy size={13} className="text-neutral-50/60 hover:text-neutral-50" />
        )}
      </button>
    </div>
  );
}
