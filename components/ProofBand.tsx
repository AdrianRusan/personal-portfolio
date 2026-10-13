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
    <aside
      aria-label={copy.ariaLabel}
      className="overflow-hidden rounded-xl border border-white/15 bg-black-200 shadow-[0_40px_80px_-48px_rgba(31,30,26,0.45)] dark:shadow-[0_40px_80px_-48px_rgba(0,0,0,0.7)]"
    >
      <p className="border-b border-white/15 px-4 py-3 font-mono text-xs text-white-100">
        {copy.ariaLabel}
      </p>
      <ul>
        {copy.stats.map((stat) => (
          <li
            key={stat.figure}
            className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-white/15 px-4 py-4"
          >
            <span className="tabular-nums text-4xl font-[380] tracking-[-0.04em] text-white">
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
    </aside>
  );
};

export default ProofBand;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as proofBandCopy };
