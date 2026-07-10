"use client";

import { track } from "@/lib/analytics";
import { CALENDLY_URL } from "@/data";

// Plain-anchor Calendly link that fires calendly_click{source} on click. Use
// for the non-MagicButton CTAs; the styling comes from the caller's className
// or children, so it drops into any existing anchor site.
export const CalendlyLink = ({
  source,
  className,
  children,
  newTab = true,
  ariaLabel,
}: {
  source: string;
  className?: string;
  children: React.ReactNode;
  newTab?: boolean;
  ariaLabel?: string;
}) => (
  <a
    href={CALENDLY_URL}
    onClick={() => track("calendly_click", { source })}
    aria-label={ariaLabel}
    {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={className}
  >
    {children}
  </a>
);
