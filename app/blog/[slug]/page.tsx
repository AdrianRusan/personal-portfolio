import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/blog';
import PostHeader from '@/components/blog/PostHeader';
import MDXContent from '@/components/blog/MDXContent';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: 'article',
        publishedTime: post.frontmatter.date,
        tags: post.frontmatter.tags,
        url: `https://www.adrian-rusan.com/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.frontmatter.title,
        description: post.frontmatter.description,
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
      <article>
        <PostHeader
          frontmatter={post.frontmatter}
          readingTime={post.readingTime}
        />

        <div className="flex gap-12 items-start">
          <div className="flex-1 min-w-0 blog-prose">
            <MDXContent source={post.source} />
            <ShareButtons title={post.frontmatter.title} slug={slug} />
          </div>

          {post.headings.length > 0 && (
            <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24">
              <TableOfContents headings={post.headings} />
            </aside>
          )}
        </div>
      </article>
    </div>
  );
}
