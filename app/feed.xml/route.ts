import { CONTACT_EMAIL } from '@/data';
import { getPosts } from '@/lib/blog';
import { SITE_URL as BASE_URL } from '@/lib/page-schema';

// #54 R4: re-render hourly so a dated post appears without a deploy.
export const revalidate = 3600;

// "]]>" would end a CDATA section early; split it across two sections.
function cdata(str: string): string {
  return `<![CDATA[${str.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const categories = post.frontmatter.tags
        ?.map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('\n      ') ?? '';

      return `
    <item>
      <title>${cdata(post.frontmatter.title)}</title>
      <description>${cdata(post.frontmatter.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <dc:creator>Adrian Rusan</dc:creator>
      ${categories}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Adrian Rusan Blog</title>
    <description>What my Claude Code agents get wrong, what review catches, and the numbers from my own logs.</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>${CONTACT_EMAIL} (Adrian Rusan)</managingEditor>
    <webMaster>${CONTACT_EMAIL} (Adrian Rusan)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${BASE_URL}/favicon-32x32.png</url>
      <title>Adrian Rusan Blog</title>
      <link>${BASE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
