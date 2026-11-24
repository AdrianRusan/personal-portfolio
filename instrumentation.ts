import type { captureRequestError as captureRequestErrorFn } from '@sentry/nextjs';

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

type RequestErrorArgs = Parameters<typeof captureRequestErrorFn>;

export async function onRequestError(
  err: unknown,
  request: RequestErrorArgs[1],
  context: RequestErrorArgs[2],
) {
  // Import Sentry only when needed
  const { captureRequestError } = await import('@sentry/nextjs');
  captureRequestError(err, request, context);
} 