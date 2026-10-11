// This file configures the initialization of Sentry on the browser side.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Error capture only. Replay and tracing were about half of every page's JS
// and delayed first paint; Vercel Speed Insights already reports real-user vitals.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    debug: false,
  });
}

// A no-op without tracing, but the Sentry build warns ("ACTION REQUIRED") if it's missing.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
