"use client";

import Error from "next/error";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log error to both Sentry and console
    Sentry.captureException(error);
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  );
}