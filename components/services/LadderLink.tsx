"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

// Booking links fire calendly_click, mailto fallbacks and page links fire
// cta_click; in-page anchors are scrolling, not money actions, so they return
// null. `cta` is the snake_case offer id, the same key the hero sends.
export const ladderEvent = (
  href: string,
  offer: string,
  source: string,
): [AnalyticsEvent, EventProps] | null =>
  href.startsWith("#")
    ? null
    : [
        href.includes("calendly.com") ? "calendly_click" : "cta_click",
        { cta: offer.replace(/-/g, "_"), source, offer },
      ];

export const LadderLink = ({
  href,
  offer,
  source = "services_ladder",
  className,
  children,
}: {
  href: string;
  offer: string;
  source?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={() => {
        const event = ladderEvent(href, offer, source);
        if (event) track(...event);
      }}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
};
