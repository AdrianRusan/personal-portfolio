"use client";

import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

// Plain anchor that fires one analytics event on click, for non-Calendly CTAs
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
  <a href={href} onClick={() => track(event, props)} className={className}>
    {children}
  </a>
);
