import { whoFor } from "@/data";

const en = {
  ariaLabel: "Who this is for",
  heading: "Built for a specific buyer. Wrong for a few others.",
  forHeading: "This is for you if",
  notForHeading: "This isn't for you if",
  ...whoFor,
};
export type WhoForCopy = typeof en;

const WhoFor = ({ copy = en }: { copy?: WhoForCopy }) => {
  return (
    <section aria-label={copy.ariaLabel} className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {copy.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-green-400 mb-4">
              {copy.forHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {copy.forList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-white-200 leading-relaxed"
                >
                  <span className="text-green-400 flex-none">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black-200/30 p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-white-200/75 mb-4">
              {copy.notForHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {copy.notForList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-white-200/70 leading-relaxed"
                >
                  <span className="text-white-200/40 flex-none">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoFor;
