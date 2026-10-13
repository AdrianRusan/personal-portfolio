import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// #54 R4: a pre-date 404 must not outlive the post's go-live.
export const revalidate = 3600;

// One card per post, with the post title as its alt text (A1-22). Its URL is
// therefore /blog/<slug>/opengraph-image/cover. A missing post yields no entry,
// so the image 404s like the page.
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPost(params.slug);
    return [{ id: 'cover', alt: post.frontmatter.title, size, contentType }];
  } catch {
    return [];
  }
}

interface OGImageProps {
  params: { slug: string };
}

export default async function OGImage({ params }: OGImageProps) {
  const { slug } = params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    // Missing or draft post: no card, same 404 as the page.
    notFound();
  }
  const { title, description } = post.frontmatter;
  const tags = post.frontmatter.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: '#F4F3EE', // #114 M: warm paper, ink, one orange-red accent
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#C4340E',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center' }}>
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(196, 52, 14, 0.1)',
                    border: '1px solid rgba(196, 52, 14, 0.3)',
                    color: '#B23210',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? '40px' : '52px',
              fontWeight: 500,
              color: '#1F1E1A',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '22px',
              color: '#33312B',
              lineHeight: 1.5,
              maxWidth: '820px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(31,30,26,0.14)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#C4340E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F4F3EE',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              AR
            </div>
            <span style={{ color: '#1F1E1A', fontSize: '18px', fontWeight: 600 }}>
              Adrian Rusan
            </span>
          </div>
          <span style={{ color: '#5C5A50', fontSize: '16px' }}>
            adrian-rusan.com/blog
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
