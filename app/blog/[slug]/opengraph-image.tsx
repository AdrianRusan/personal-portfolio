import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Blog post cover';

interface OGImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: OGImageProps) {
  const { slug } = await params;

  let title = 'Adrian Rusan Blog';
  let description = 'Technical articles on web development';
  let tags: string[] = [];

  try {
    const post = await getPost(slug);
    title = post.frontmatter.title;
    description = post.frontmatter.description;
    tags = post.frontmatter.tags?.slice(0, 3) ?? [];
  } catch {
    // fallback to defaults
  }

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
          background: 'linear-gradient(135deg, #000319 0%, #0d0d2b 50%, #000319 100%)',
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
            height: '4px',
            background: 'linear-gradient(90deg, #CBACF9, #818cf8, #CBACF9)',
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
                    background: 'rgba(203, 172, 249, 0.15)',
                    border: '1px solid rgba(203, 172, 249, 0.3)',
                    color: '#CBACF9',
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
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '22px',
              color: '#BEC1DD',
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
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(203, 172, 249, 0.2)',
                border: '2px solid rgba(203, 172, 249, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBACF9',
                fontWeight: 700,
                fontSize: '16px',
              }}
            >
              AR
            </div>
            <span style={{ color: '#BEC1DD', fontSize: '18px', fontWeight: 600 }}>
              Adrian Rusan
            </span>
          </div>
          <span style={{ color: '#BEC1DD', fontSize: '16px', opacity: 0.6 }}>
            adrian-rusan.com/blog
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
