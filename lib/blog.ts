import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostWithSource, BlogFrontmatter, Heading } from './blog-types';

export type { BlogPost, BlogPostWithSource, BlogFrontmatter, Heading };
export { formatDate } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/`[^`]*`/g, (m) => m.slice(1, -1));
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      const headings = extractHeadings(content);

      return {
        slug,
        frontmatter: data as BlogFrontmatter,
        readingTime: rt.text,
        headings,
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export async function getPost(slug: string): Promise<BlogPostWithSource> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
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
