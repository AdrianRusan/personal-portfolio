// C32: the detail blocks of an offer section (terms, guarantees, what's not
// included) fold behind their heading, like the FAQ. Native <details> keeps it
// server-rendered and keyboard-accessible with no client JS.
export const Fold = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <details className="group mt-6 rounded-xl border border-white/10 bg-black-200/30 p-5">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
      <h3>{title}</h3>
      <span
        aria-hidden="true"
        className="text-purple transition-transform group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <div className="mt-4">{children}</div>
  </details>
);
