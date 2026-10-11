"use client";

import Link from "next/link";
import { Button } from "./button";
import { track, type AnalyticsEvent, type EventProps } from "@/lib/analytics";

const magicClasses =
  "relative w-full inline-flex h-12 overflow-hidden rounded-lg p-0 bg-transparent hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100 md:w-60 md:mt-10";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  href,
  trackEvent,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
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

  const inner = (
    <>
      {/* Solid purple: the booking CTA is the strongest button on the page. */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-purple px-7 text-sm font-semibold text-black-100 transition-colors hover:bg-purple/85 gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </>
  );

  // When an href is given, render a single anchor (via Radix Slot) so we never
  // nest a <button> inside an <a> — that is invalid HTML and trips hydration.
  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Button asChild className={magicClasses}>
        <Link
          href={href}
          onClick={fireTrack}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={magicClasses}
      onClick={() => {
        handleClick?.();
        fireTrack();
      }}
    >
      {inner}
    </Button>
  );
};

export default MagicButton;
