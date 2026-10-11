import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, CONTACT_EMAIL, GUARANTEE } from "@/data";
import { ladder, offerById } from "@/data/ladder";

const en = {
  guarantee: GUARANTEE,
  eyebrow: "Not ready for a full sprint?",
  heading: "The Reviewed PR — €1,000",
  intro:
    "The lowest-risk way to see the method work on your own code, before you commit to a sprint.",
  steps: [
    "You send one real ticket from your backlog — a bug, a small feature, whatever's actually queued.",
    "An agent ships it. I security-review the diff line by line, the same adversarial pass every sprint PR gets.",
    "You get the merge-ready PR, on your repo, plus a one-page review report showing exactly what the review caught.",
    `Delivered in ${offerById(ladder, "reviewed-pr").duration}.`,
  ],
  cta: "Start with one PR",
  emailSubject: "Reviewed PR (€1,000)",
  emailBody: "Repo or ticket link:\n\nWhat needs shipping:\n",
  emailLink: "Prefer email? Send the ticket, skip the call →",
};

export type EntryOfferCopy = typeof en;

export const EntryOffer = ({ copy = en }: { copy?: EntryOfferCopy }) => {
  return (
    <section id="entry-offer" className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          {copy.eyebrow}
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          {copy.intro}
        </p>

        <ul className="flex flex-col gap-3 mt-8">
          {copy.steps.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-white-200 leading-relaxed"
            >
              <span className="text-purple flex-none">+</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <MagicButton
            title={copy.cta}
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "entry_offer" },
            }}
          />
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              copy.emailSubject,
            )}&body=${encodeURIComponent(copy.emailBody)}`}
            className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
          >
            {copy.emailLink}
          </a>
        </div>
        <p className="text-xs text-white-200/70 mt-4">{copy.guarantee}</p>
      </div>
    </section>
  );
};
