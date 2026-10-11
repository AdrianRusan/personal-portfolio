import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ComponentPropsWithoutRef } from "react";
import { getPosts } from "@/lib/blog";
import { MDXLink, mdxComponents } from "./PostBody";

type MDXRemoteOptions = NonNullable<Parameters<typeof MDXRemote>[0]["options"]>;
type MDXOptions = NonNullable<MDXRemoteOptions["mdxOptions"]>;

const rehypePlugins: MDXOptions["rehypePlugins"] = [
  rehypeSlug,
  // Append a hover/focus-only "#" so headings never look like links.
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        className: [
          "ml-2 !no-underline !text-purple/60 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity",
        ],
        ariaHidden: true,
        tabIndex: -1,
      },
      content: { type: "text", value: "#" },
    },
  ],
  [rehypePrettyCode, { theme: "github-dark-high-contrast", keepBackground: true }],
];

interface MDXContentProps {
  source: string;
}

export default async function MDXContent({ source }: MDXContentProps) {
  // A link to a post that is not live yet (#54 R4) renders as plain text and
  // becomes a link once that post's date passes.
  const live = new Set((await getPosts()).map((p) => p.slug));
  const components = {
    ...mdxComponents,
    a: (props: ComponentPropsWithoutRef<"a">) => {
      const slug = props.href?.match(/^\/blog\/([^/?#]+)/)?.[1];
      return slug && !live.has(slug) ? (
        <span>{props.children}</span>
      ) : (
        <MDXLink {...props} />
      );
    },
  };
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { rehypePlugins } }}
    />
  );
}
