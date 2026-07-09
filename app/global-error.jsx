"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log error to both Sentry and console
    Sentry.captureException(error);
    console.error("Global error caught:", error);
  }, [error]);

  // App Router global-error must render its own <html>/<body>. next/error is a
  // Pages Router component and pulls next/head + pages/_error into this lazy
  // client chunk, which breaks RSC module resolution in dev — so render markup.
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong.</h2>
        <button type="button" onClick={() => window.location.reload()}>
          Try again
        </button>
      </body>
    </html>
  );
}
