import type { ReactElement, ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ImgProps = ComponentPropsWithoutRef<'img'>;

function MDXLink({ href, children, ...props }: AnchorProps) {
  if (!href) return <span {...props}>{children}</span>;

  const isExternal = href.startsWith('http') || href.startsWith('//');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple hover:text-purple/80 underline underline-offset-2 decoration-purple/40 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-purple hover:text-purple/80 underline underline-offset-2 decoration-purple/40 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

function MDXImage({ src, alt, ...props }: ImgProps) {
  if (!src) return null;

  return (
    <span className="block my-8 rounded-xl overflow-hidden border border-white/5">
      <Image
        src={src as string}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="w-full h-auto"
        {...(props as object)}
      />
    </span>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
  a: MDXLink,
  img: MDXImage,
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-20 group"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-20 group"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-lg font-semibold text-white mt-6 mb-2 scroll-mt-20"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-white-200 leading-relaxed mb-5 text-base" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc list-outside pl-6 text-white-200 space-y-2 mb-5"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal list-outside pl-6 text-white-200 space-y-2 mb-5"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-purple/60 pl-4 my-6 text-white-200/80 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="bg-white/10 text-purple px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  hr: () => <hr className="my-10 border-black-300" />,
  strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
};

interface PostBodyProps {
  content: ReactElement;
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="max-w-none blog-prose">
      {content}
    </div>
  );
}
