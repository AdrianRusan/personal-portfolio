export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Router transition instrumentation (optional for advanced navigation tracking)
// export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

export async function onRequestError(err: unknown, request: any, context: any) {
  // Import Sentry only when needed
  const { captureRequestError } = await import('@sentry/nextjs');
  captureRequestError(err, request, context);
} 