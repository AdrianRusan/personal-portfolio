import { reviewLog } from "@/data";

const en = {
  ariaLabel: "Review log",
  stats: reviewLog,
  note: "From my own repos, not client work. The 30-PR case study lists every catch and all 5 misses.",
};
export type ProofBandCopy = typeof en;

// P2: rows and one labelling line (#125: a review log). #114 M: rendered as the hero's
// panel (Hero `aside`), a framed list that takes any number of rows.
const ProofBand = ({ copy = en }: { copy?: ProofBandCopy }) => {
  return (
    <section aria-label={copy.ariaLabel} className="hero-panel">
      <p className="border-b border-white/15 px-4 py-3 font-mono text-xs text-white-100">
        {copy.ariaLabel}
      </p>
      <ul>
        {copy.stats.map((stat) => (
          <li
            key={stat.figure}
            className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-white/15 px-4 py-4"
          >
            <span className="tabular-nums text-4xl type-light text-white">
              {stat.figure}
            </span>
            <span className="text-[15px] text-white-200 text-pretty">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="bg-black-100/60 px-4 py-4 text-sm text-white-200">
        {copy.note}
      </p>
    </section>
  );
};

export default ProofBand;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as proofBandCopy };
