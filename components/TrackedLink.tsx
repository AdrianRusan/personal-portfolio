"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

// next/link (so internal links don't reload the page) that fires one analytics event on click, for non-booking CTAs
// inside server components (BookingLink owns calendly_click).
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
  <Link
    href={href}
    onClick={() => track(event, props)}
    {...(href.startsWith("http")
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {})}
    className={className}
  >
    {children}
  </Link>
);
