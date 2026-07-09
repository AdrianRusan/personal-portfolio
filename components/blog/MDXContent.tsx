import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "./PostBody";

type MDXRemoteOptions = NonNullable<Parameters<typeof MDXRemote>[0]["options"]>;
type MDXOptions = NonNullable<MDXRemoteOptions["mdxOptions"]>;

const rehypePlugins: MDXOptions["rehypePlugins"] = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
  [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: true }],
];

interface MDXContentProps {
  source: string;
}

export default async function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{ mdxOptions: { rehypePlugins } }}
    />
  );
}
