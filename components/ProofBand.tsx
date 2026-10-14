import { proofStats } from "@/data";

const en = {
  ariaLabel: "Proof by the numbers",
  stats: proofStats,
  note: "The 30 and the 3 come from one documented run on my own admin dashboard, March 2026. The case study lists everything review caught and everything it missed.",
};
export type ProofBandCopy = typeof en;

// P2: three stats and one labelling line. #114 M: rendered as the hero's
// panel (Hero `aside`), a framed list that takes any number of rows.
const ProofBand = ({ copy = en }: { copy?: ProofBandCopy }) => {
  return (
    <section aria-label={copy.ariaLabel} className="hero-panel">
      <p className="border-b border-ink/15 px-4 py-3 font-mono text-xs text-muted">
        {copy.ariaLabel}
      </p>
      <ul>
        {copy.stats.map((stat) => (
          <li
            key={stat.figure}
            className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-ink/15 px-4 py-4"
          >
            <span className="tabular-nums text-4xl type-light text-ink">
              {stat.figure}
            </span>
            <span className="text-sm text-body text-pretty">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="bg-page/60 px-4 py-4 text-sm text-body">
        {copy.note}
      </p>
    </section>
  );
};

export default ProofBand;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as proofBandCopy };
