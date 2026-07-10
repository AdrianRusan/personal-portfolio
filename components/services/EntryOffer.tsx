import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const steps = [
  "You send one real ticket from your backlog — a bug, a small feature, whatever's actually queued.",
  "An agent ships it. I security-review the diff line by line, the same adversarial pass every sprint PR gets.",
  "You get the merge-ready PR, on your repo, plus a one-page review report showing exactly what the review caught.",
  "Delivered in ~48 hours.",
];

export const EntryOffer = () => {
  return (
    <section id="entry-offer" className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          Not ready for a full sprint?
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          The Reviewed PR — €1,000
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          The lowest-risk way to see the method work on your own code, before
          you commit to a sprint.
        </p>

        <ul className="flex flex-col gap-3 mt-8">
          {steps.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-white-200 leading-relaxed"
            >
              <span className="text-purple flex-none">+</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-purple bg-black-200/60 p-5 md:p-6 mt-8 max-w-2xl">
          <p className="text-sm text-white font-medium leading-relaxed">
            Fully credited toward any Delivery Sprint you book within 30 days.
          </p>
          <p className="text-sm text-white-200/80 mt-2 leading-relaxed">
            If you move to a Pilot, Standard, or Scale Sprint within a month,
            the €1,000 comes straight off the price — this is a free look at the
            work, not a separate purchase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <MagicButton
            title="Start with one PR"
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
          />
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "Reviewed PR (€1,000)",
            )}&body=${encodeURIComponent(
              "Repo or ticket link:\n\nWhat needs shipping:\n",
            )}`}
            className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
          >
            Prefer email? Send the ticket, skip the call →
          </a>
        </div>
      </div>
    </section>
  );
};
