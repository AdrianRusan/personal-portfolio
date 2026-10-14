import type { ReactNode } from "react";

// #114 M: the one closing band (ClosingCta, ServicesFinalCta, workshop pages).
// A display heading, a lead, then the page's own ask as children.
export function ClosingBand({
  id,
  heading,
  body,
  children,
}: {
  // The heading id; the section is labelled by it.
  id: string;
  heading: ReactNode;
  body?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="gutter pt-20 pb-20 md:pt-28 scroll-mt-24 border-t border-ink/15 bg-chip/50"
    >
      <div className="container-wide">
        <h2
          id={id}
          className="type-title measure-title text-balance"
        >
          {heading}
        </h2>
        {body && (
          <p className="mt-6 max-w-xl text-lg text-body text-pretty">
            {body}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
