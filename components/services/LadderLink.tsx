"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

// In-page anchors stay untracked; booking links fire calendly_click, mailto
// fallbacks fire cta_click — the same funnel events as every other CTA.
export const LadderLink = ({
  href,
  offer,
  className,
  children,
}: {
  href: string;
  offer: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const isAnchor = href.startsWith("#");
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={() => {
        if (isAnchor) return;
        track(href.includes("calendly.com") ? "calendly_click" : "cta_click", {
          source: "services_ladder",
          offer,
        });
      }}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
};
