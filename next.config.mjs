import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/a/23x7w9tiht/**',
      },
      {
        protocol: 'https',
        hostname: '23x7w9tiht.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
      {
        // YouTube thumbnails for the homepage Latest block (components/Latest.tsx)
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Next 15 streams metadata into <body> on dynamic pages (/blog reads searchParams)
  // for non-bot user agents; block on it for every agent so the description is in <head>.
  htmlLimitedBots: /.*/,
  serverExternalPackages: ['next-mdx-remote', 'shiki'],
  // lib/blog.ts reads content/ at request time (ISR); its fs calls opt out of
  // tracing, so ship the MDX files explicitly instead of the whole project.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*.mdx'],
  },
  experimental: {
    inlineCss: true,
    // D1: with per-group root layouts, unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // D7: cut posts 301 to the page that now holds their content.
  async redirects() {
    return [
      // A4 F20: no workshops index; the offers live on the services ladder.
      { source: '/workshops', destination: '/services#ladder', statusCode: 301 },
      {
        source: '/blog/30-prs-in-2-5-days/:path*',
        destination: '/work/30-reviewed-prs-3-vulnerabilities',
        statusCode: 301,
      },
      {
        source: '/blog/claude-code-changed-how-i-ship-software/:path*',
        destination: '/blog/2-3x-not-100x',
        statusCode: 301,
      },
      // #99 K1: the review-timing data now lives in the 2-3x post.
      {
        source: '/blog/review-bottleneck-measured-on-my-prs/:path*',
        destination: '/blog/2-3x-not-100x',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            // Report-only first (audit 2026-11-24): browsers log violations
            // to the console and block nothing. Next's inline bootstrap
            // scripts need 'unsafe-inline' until a nonce is wired in.
            // Enforce only after a clean week on every page.
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://utfs.io https://*.ufs.sh https://i.ytimg.com",
              "font-src 'self'",
              "connect-src 'self' https://*.ingest.sentry.io https://*.ingest.de.sentry.io",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; ')
          }
        ]
      },
      {
        // #64 R1: page routes answer HTML or Markdown by Accept (proxy.ts),
        // so caches must key on it. Same scope and value as HTML_VARY there.
        source: '/:path((?!api/|_next/|.*\\.[a-z0-9]+$).*)',
        headers: [
          {
            key: 'Vary',
            value:
              'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: "adrianrusan",
  project: "personal-portfolio",
  
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  
  // Hides source maps from generated client bundles
  hideSourceMaps: true,
  
  automaticVercelMonitors: true,

  // Client error capture only (instrumentation-client.ts): strip tracing and Replay code from the bundle.
  bundleSizeOptimizations: {
    excludeTracing: true,
    excludeReplayShadowDom: true,
    excludeReplayIframe: true,
    excludeReplayWorker: true,
    excludeDebugStatements: true,
  },
});
