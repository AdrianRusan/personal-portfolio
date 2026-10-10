import { proofStats } from "@/data";
import { getPosts, WORK_DIR } from "@/lib/blog";
import { cn } from "@/lib/utils";

const en = {
  ariaLabel: "Proof by the numbers",
  stats: proofStats,
  shortNote: "From a documented benchmark run on my own repo. ",
  longNote:
    "These are from a benchmark I ran end-to-end on my own repo — the PRs, the review notes, and the caught vulnerabilities are all real and documented, not a paying-client engagement (those case studies are in progress). ",
  teardownBefore: "Want the same review on your code?",
  teardownLink: "Send me a repo for a free teardown →",
  honesty:
    "No invented stats, no fake urgency. The numbers here come from documented runs.",
};
export type ProofBandCopy = typeof en;

const ProofBand = async ({ copy = en }: { copy?: ProofBandCopy }) => {
  // The long disclaimer shrinks to one clause once a case study is live.
  const hasCaseStudy = (await getPosts(WORK_DIR)).length > 0;
  return (
    <section aria-label={copy.ariaLabel} className="px-5 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-xl overflow-hidden bg-black-200/40">
        {copy.stats.map((stat, i) => (
          <div
            key={stat.figure}
            className={cn(
              "p-6 md:p-8 border-white/10",
              i !== 0 && "border-t",
              // 2x2 on md: drop the top border on row 1, add a divider on column 2
              i === 1 && "md:border-t-0",
              i % 2 === 1 && "md:border-l",
              // single row on lg
              "lg:border-t-0",
              i !== 0 && "lg:border-l",
            )}
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
        {hasCaseStudy ? copy.shortNote : copy.longNote}
        {copy.teardownBefore}{" "}
        <a
          href="/teardown"
          className="text-blue-100 hover:text-purple transition-colors font-medium"
        >
          {copy.teardownLink}
        </a>
      </p>
      <p className="max-w-7xl mx-auto text-center text-xs font-medium text-white-200 mt-2">
        {copy.honesty}
      </p>
    </section>
  );
};

export default ProofBand;
