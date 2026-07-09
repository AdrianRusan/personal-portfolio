import { proofStats } from "@/data";

const ProofBand = () => {
  return (
    <section aria-label="Proof by the numbers" className="px-5 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-xl overflow-hidden bg-black-200/40">
        {proofStats.map((stat, i) => (
          <div
            key={stat.figure}
            className={`p-6 md:p-8 ${i !== 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""}`}
          >
            <div className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums">
              {stat.figure}
            </div>
            <p className="font-mono text-[11px] md:text-xs leading-relaxed text-white-200 mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="max-w-7xl mx-auto text-center text-xs text-white-200/70 mt-4">
        Every number here is from a run I did myself — the repo, the PRs, and
        the review notes are real, and I&apos;ll walk you through them on a
        call.
      </p>
    </section>
  );
};

export default ProofBand;
