import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/a/23x7w9tiht/**',
      },
    ],
    minimumCacheTTL: 60,
  },
};

const sentryWebpackPluginOptions = {
  org: 'rusan-adrian-ionut-pfa',
  project: 'personal-portfolio',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withBundleAnalyzer(bundleAnalyzerConfig)(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions)
);
