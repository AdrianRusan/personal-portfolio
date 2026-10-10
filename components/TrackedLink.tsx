"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

// next/link (so internal links don't reload the page) that fires one analytics event on click, for non-Calendly CTAs
// inside server components (CalendlyLink owns calendly_click).
export const TrackedLink = ({
  href,
  event,
  props,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  props?: EventProps;
  className?: string;
  children: React.ReactNode;
}) => (
  <Link href={href} onClick={() => track(event, props)} className={className}>
    {children}
  </Link>
);
