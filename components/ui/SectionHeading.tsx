import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The one section heading (P1, #114 M): left-aligned, big and light, an
// optional mono eyebrow and lead. Section headings are never centred (#114 M).
export function SectionHeading({
  id,
  eyebrow,
  lead,
  className,
  children,
}: {
  // Pass the section's aria-labelledby target.
  id?: string;
  eyebrow?: ReactNode;
  lead?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        id={id}
        className="type-section text-balance"
      >
        {children}
      </h2>
      {lead && (
        <p className="mt-4 text-body leading-relaxed text-pretty">{lead}</p>
      )}
    </div>
  );
}
