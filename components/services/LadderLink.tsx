"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

// Booking links fire calendly_click; mailto fallbacks and in-page anchors fire
// cta_click. Props carry `cta` like every other CTA, plus the ladder offer.
export const ladderEvent = (
  href: string,
  offer: string,
  source: string,
): [AnalyticsEvent, EventProps] => [
  href.includes("calendly.com") ? "calendly_click" : "cta_click",
  { cta: offer, source, offer },
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
      onClick={() => track(...ladderEvent(href, offer, source))}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
};
