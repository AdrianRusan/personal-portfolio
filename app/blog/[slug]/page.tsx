import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog";
import { CalendlyLink } from "@/components/CalendlyLink";
import PostHeader from "@/components/blog/PostHeader";
import MDXContent from "@/components/blog/MDXContent";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import EmailCapture from "@/components/EmailCapture";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        tags: post.frontmatter.tags,
        url: `https://www.adrian-rusan.com/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.frontmatter.title,
        description: post.frontmatter.description,
      },
    };
  } catch {
    return { title: "Post Not Found" };
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

  const postUrl = `https://www.adrian-rusan.com/blog/${slug}`;

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
      <script
        type="application/ld+json"
        // Security Note: dangerouslySetInnerHTML is safe here as we're using JSON.stringify()
        // with static data for structured data markup (Schema.org JSON-LD)
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.date,
            author: {
              "@type": "Person",
              name: "Adrian Rusan",
              url: "https://www.adrian-rusan.com",
            },
            image: `${postUrl}/opengraph-image`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": postUrl,
            },
            keywords: post.frontmatter.tags?.join(", "),
          }),
        }}
      />
      <article>
        <PostHeader
          frontmatter={post.frontmatter}
          readingTime={post.readingTime}
        />

        <div className="flex gap-12 items-start">
          <div className="flex-1 min-w-0 blog-prose">
            <MDXContent source={post.source} />
            <ShareButtons title={post.frontmatter.title} slug={slug} />

            <div className="mt-10 space-y-6">
              <EmailCapture />

              <p className="text-sm text-white-200 text-center">
                Have a backlog you&apos;d want reviewed this way?{" "}
                <CalendlyLink
                  source="blog"
                  className="text-purple hover:text-purple/80 underline underline-offset-2 decoration-purple/40 transition-colors"
                >
                  Book a scoping call →
                </CalendlyLink>
              </p>
            </div>
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
