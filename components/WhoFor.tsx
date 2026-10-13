import { whoFor } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";

const en = {
  heading: "Who this is for",
  forHeading: "A good fit if",
  notForHeading: "Not a fit if",
  ...whoFor,
};
export type WhoForCopy = typeof en;

// P2: two plain lists, no cards (cards are for parallel choices only).
const WhoFor = ({ copy = en }: { copy?: WhoForCopy }) => {
  const lists = [
    { heading: copy.forHeading, items: copy.forList, mark: "+", muted: false },
    {
      heading: copy.notForHeading,
      items: copy.notForList,
      mark: "−",
      muted: true,
    },
  ];
  return (
    <section
      aria-labelledby="who-for-heading"
      className="px-5 md:px-12 py-16 md:py-28 border-t border-white/15"
    >
      <div className="container-wide">
        <SectionHeading id="who-for-heading">{copy.heading}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-10">
          {lists.map(({ heading, items, mark, muted }) => (
            <div key={heading} className="border-t border-white pt-5">
              <h3 className="text-xl md:text-2xl font-[380] tracking-[-0.02em] text-white">{heading}</h3>
              <ul className="flex flex-col gap-3 mt-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`flex gap-3 border-b border-white/15 pb-3 leading-relaxed ${muted ? "text-white-200/80" : "text-white-200"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex-none ${muted ? "text-white-200/60" : "text-purple"}`}
                    >
                      {mark}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoFor;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as whoForCopy };
