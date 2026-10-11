import { proofStats } from "@/data";

const en = {
  ariaLabel: "Proof by the numbers",
  stats: proofStats,
  note: "Own project: a documented 30-PR run on my own repo.",
};
export type ProofBandCopy = typeof en;

// P2: three stats in the sans, one labelling line. The workflow ledger is on
// /about only.
const ProofBand = ({ copy = en }: { copy?: ProofBandCopy }) => {
  return (
    <section aria-label={copy.ariaLabel} className="px-5 sm:px-10">
      <div className="container-section">
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {copy.stats.map((stat) => (
            <div
              key={stat.figure}
              className="py-5 sm:py-6 sm:px-6 sm:first:pl-0"
            >
              <p className="flex items-baseline gap-3 sm:block">
                <span className="tabular-nums text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {stat.figure}
                </span>
                <span className="block text-sm text-white-200 sm:mt-2">
                  {stat.label}
                </span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-white-200/80">{copy.note}</p>
      </div>
    </section>
  );
};

export default ProofBand;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as proofBandCopy };
