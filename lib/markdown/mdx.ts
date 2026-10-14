import type { BlogPostWithSource } from "@/lib/blog";
import { blocks } from "./format";

// The posts are Markdown apart from inline SVG figures; each becomes its
// aria-label and caption.
// ponytail: only <figure> blocks are handled. Strip other JSX here if a post
// starts using components.
const figure = (block: string) => {
  const label = block.match(/aria-label="([^"]*)"/)?.[1];
  const caption = block
    .match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1]
    ?.trim();
  return blocks(label && `*Figure: ${label}*`, caption);
};

// #133 I-09: a link to a post that isn't live yet becomes its text, as in
// the HTML (MDXContent), so agents never get a 404 link.
const gateLinks = (source: string, live: Set<string>) =>
  source.replace(
    /\[([^\]]+)\]\(\/blog\/([^/?#)\s]+)[^)]*\)/g,
    (link, text, slug) => (live.has(slug) ? link : text),
  );

export const mdxToMarkdown = (source: string, live: Set<string>) =>
  gateLinks(source, live)
    .replace(/<figure[\s\S]*?<\/figure>/g, figure)
    .trim();

export const postMarkdown = (
  { frontmatter: f, source, readingTime }: BlogPostWithSource,
  url: string,
  live: Set<string>,
) =>
  blocks(
    `# ${f.title}`,
    `> ${f.description}`,
    `Published ${f.date}${f.updated ? ` · updated ${f.updated}` : ""} · ${readingTime} · ${url}`,
    mdxToMarkdown(source, live),
    !!f.faq?.length &&
      blocks("## Questions", ...f.faq.map(({ q, a }) => `### ${q}\n\n${a}`)),
  );
