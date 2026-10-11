import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts, getRelatedPosts } from "@/lib/blog";
import { getPostCta } from "@/lib/blog-cta";
import PostHeader from "@/components/blog/PostHeader";
import MDXContent from "@/components/blog/MDXContent";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import AuthorBox from "@/components/blog/AuthorBox";
import PostCta from "@/components/blog/PostCta";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { pageTitle } from "@/lib/blog-types";
import { JsonLd, SITE_URL, faqJsonLd, pageJsonLd } from "@/lib/page-schema";

// Visible FAQ, from the same frontmatter array as the FAQPage JSON-LD (A1-12).
function PostFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq">
      <h2 id="faq">FAQ</h2>
      {items.map(({ q, a }) => (
        <div key={q}>
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}
    </section>
  );
}

// #54 R4: a post dated after the build renders on demand once its date passes;
// until then getPost() throws and the page 404s. Re-rendered hourly.
export const dynamicParams = true;
export const revalidate = 3600;

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
    const { title, seoTitle, description, date, updated, tags } =
      post.frontmatter;
    return {
      title: pageTitle(seoTitle ?? title),
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: date,
        ...(updated ? { modifiedTime: updated } : {}),
        tags,
        url: `https://www.adrian-rusan.com/blog/${slug}`,
        siteName: "Adrian Rusan",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@adrian_rusan",
      },
      // A1-03: the blog layout's alternates set no canonical; restate RSS.
      alternates: {
        canonical: `/blog/${slug}`,
        types: {
          "application/rss+xml": "https://www.adrian-rusan.com/feed.xml",
        },
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

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const faq = post.frontmatter.faq ?? [];
  const related = getRelatedPosts(post, await getPosts());

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            url: postUrl,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.updated ?? post.frontmatter.date,
            inLanguage: "en",
            author: { "@id": `${SITE_URL}/#person` },
            publisher: { "@id": `${SITE_URL}/#person` },
            image: `${postUrl}/opengraph-image/cover`,
            mainEntityOfPage: { "@id": `${postUrl}#webpage` },
            keywords: post.frontmatter.tags?.join(", "),
          },
          pageJsonLd({
            path: `/blog/${slug}`,
            name: post.frontmatter.title,
            description: post.frontmatter.description,
            crumbs: [
              { name: "Blog", path: "/blog" },
              { name: post.frontmatter.title, path: `/blog/${slug}` },
            ],
          }),
          ...(faq.length ? [faqJsonLd(faq)] : []),
        ]}
      />
      <article>
        <PostHeader
          frontmatter={post.frontmatter}
          readingTime={post.readingTime}
        />

        <div className="flex gap-12 items-start">
          <div className="flex-1 min-w-0 blog-prose">
            <MDXContent source={post.source} />
            {faq.length > 0 && <PostFaq items={faq} />}
            <ShareButtons title={post.frontmatter.title} slug={slug} />
            <AuthorBox />

            {/* U16: one offer box, no stacked "book a call" lines. */}
            <div className="mt-10">
              <PostCta cta={getPostCta(post.frontmatter)} />
            </div>

            <RelatedPosts posts={related} />
          </div>

          {post.headings.length > 0 && (
            <div className="hidden lg:block w-56 flex-shrink-0 sticky top-24">
              <TableOfContents headings={post.headings} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
