// C32: the detail blocks of an offer section (terms, guarantees, what's not
// included) fold behind their heading, like the FAQ. Native <details> keeps it
// server-rendered and keyboard-accessible with no client JS. R2-F10: what is
// being sold (deliverables, guarantees) starts open.
export const Fold = ({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => (
  <details open={defaultOpen} className="group border-t border-ink/15 py-5">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
      <h3>{title}</h3>
      <span
        aria-hidden="true"
        className="text-accent transition-transform group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <div className="mt-4">{children}</div>
  </details>
);
