import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  BlogPost,
  BlogPostWithSource,
  BlogFrontmatter,
  Heading,
} from "./blog-types";

export type { BlogPost, BlogPostWithSource, BlogFrontmatter, Heading };
export { formatDate } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
// Case studies reuse the blog loader; pass this as `dir`.
export const WORK_DIR = path.join(process.cwd(), "content/work");

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const [, hashes, rawText] = match;
    if (!hashes || !rawText) continue;

    const level = hashes.length;
    const text = rawText.trim().replace(/`[^`]*`/g, (m) => m.slice(1, -1));
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export async function getPosts(dir = BLOG_DIR): Promise<BlogPost[]> {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      const headings = extractHeadings(content);

      return {
        slug,
        frontmatter: data as BlogFrontmatter,
        readingTime: rt.text,
        headings,
        content,
      };
    })
    .filter((post) => {
      if (!post.frontmatter.published) return false;
      // Honesty gate (case studies only, so a blog post may quote the marker):
      // fail the build rather than publish unfinished copy.
      const { title, description } = post.frontmatter;
      if (
        dir !== BLOG_DIR &&
        /TODO\s*\(adi\)/i.test(`${title}\n${description}\n${post.content}`)
      ) {
        throw new Error(`Published ${post.slug} still contains TODO(adi)`);
      }
      return true;
    })
    .map(({ content: _content, ...post }) => post)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );

  return posts;
}

export async function getPost(
  slug: string,
  dir = BLOG_DIR,
): Promise<BlogPostWithSource> {
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  const headings = extractHeadings(content);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    source: content,
    readingTime: rt.text,
    headings,
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPosts();
  const tags = posts.flatMap((post) => post.frontmatter.tags ?? []);
  return [...new Set(tags)].sort();
}
