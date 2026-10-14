"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ctaPrimary } from "./button";

// The filled primary CTA. Grows with its label (min-w-60 on desktop) so long
// labels never clip.
const layout = "w-full md:w-auto md:min-w-60";

const PrimaryCta = ({
  title,
  handleClick,
  otherClasses,
  href,
  trackEvent,
}: {
  title: string;
  handleClick?: () => void;
  otherClasses?: string;
  href?: string;
  // Serializable so server components can request tracking without passing a
  // function across the server/client boundary.
  trackEvent?: { event: AnalyticsEvent; props?: EventProps };
}) => {
  const fireTrack = () => {
    if (trackEvent) track(trackEvent.event, trackEvent.props);
  };
  const className = cn(ctaPrimary, layout, otherClasses);

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        onClick={fireTrack}
        className={className}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        handleClick?.();
        fireTrack();
      }}
    >
      {title}
    </button>
  );
};

export default PrimaryCta;
