import type {
  ReactElement,
  ComponentProps,
  ComponentPropsWithoutRef,
} from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import CodeBlock from "./CodeBlock";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImgProps = ComponentPropsWithoutRef<"img">;
type PreProps = ComponentPropsWithoutRef<"pre">;

export function MDXLink({ href, children, ...props }: AnchorProps) {
  if (!href) return <span {...props}>{children}</span>;

  const isExternal = href.startsWith("http") || href.startsWith("//");

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
      {...(props as Omit<ComponentProps<typeof Link>, "href">)}
    >
      {children}
    </Link>
  );
}

function MDXPre({ children, className, ...rest }: PreProps) {
  return (
    <CodeBlock className={className ?? ""} {...rest}>
      {children}
    </CodeBlock>
  );
}

function MDXImage({ src, alt, ...props }: ImgProps) {
  if (!src) return null;

  return (
    <span className="block my-8 rounded-xl overflow-hidden border border-white/5">
      <Image
        src={src as string}
        alt={alt ?? ""}
        width={800}
        height={450}
        className="w-full h-auto"
        {...(props as object)}
      />
    </span>
  );
}

export const mdxComponents: MDXComponents = {
  pre: MDXPre,
  a: MDXLink,
  img: MDXImage,
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-3xl type-light text-white mt-14 mb-4 scroll-mt-24 group"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-2xl type-light text-white mt-10 mb-3 scroll-mt-24 group"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="text-lg font-medium text-white mt-6 mb-2 scroll-mt-24 group"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="text-white-200 leading-[1.7] mb-5 text-[17px]" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-outside pl-6 text-white-200 space-y-2 mb-5"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal list-outside pl-6 text-white-200 space-y-2 mb-5"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-purple pl-5 my-8 text-xl leading-snug text-white"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Inline code only: rehype-pretty-code marks block code with data-theme, and
  // the pill styling would tint the block and pad its first line (A4 F10).
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) =>
    "data-theme" in props ? (
      <code {...props}>{children}</code>
    ) : (
      <code
        className="bg-purple/10 dark:bg-white/10 text-blue-100 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
  table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm text-white-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-black-300 py-2 pr-4 text-left font-semibold text-white"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-black-300/60 py-2 pr-4 align-top" {...props}>
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-black-300" />,
  strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
};

interface PostBodyProps {
  content: ReactElement;
}

export default function PostBody({ content }: PostBodyProps) {
  return <div className="max-w-none blog-prose">{content}</div>;
}
