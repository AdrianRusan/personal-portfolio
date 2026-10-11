import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, GUARANTEE, LEDGER_PROOF } from "@/data";

const en = {
  heading:
    "Your backlog, shipped at agent speed — every PR security-reviewed before you see it",
  intro:
    "This is fixed-scope, fixed-price delivery, not a timesheet. You agree the batch of pull requests and the number up front. An agent fleet writes the volume; I adversarially review every PR for security before it reaches you. Nothing reaches you that a senior engineer hasn't personally checked.",
  tagline: "2–3x, not 100x — and here's what the agents get wrong.",
  priced:
    "Every offer is priced up front, from a €200 call to a monthly retainer.",
  cta: "Book a scoping call",
  ctaSource: "services_hero",
  tiersLink: "Not ready to talk? See the four tiers, eight offers and prices ↓",
  guarantee: GUARANTEE,
  ledger: LEDGER_PROOF,
  proofItems: [
    "30 reviewed PRs · 9 agent batches · under 3 days",
    "3 shell-injection paths from request input, caught in review before merge",
    "10+ years in production",
  ],
  proofNote:
    "From a build I ran end-to-end on my own repo — the PRs, the review notes, and the findings are real, and I'll walk you through them on the call.",
};

export type ServicesHeroCopy = typeof en;

export const ServicesHero = ({ copy = en }: { copy?: ServicesHeroCopy }) => {
  return (
    <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          {copy.heading}
        </h1>
        <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
          {copy.intro}
        </p>
        <p className="text-center font-mono text-xs md:text-sm text-purple mt-5">
          {copy.tagline}
        </p>
        <p className="font-mono text-xs md:text-sm text-white-200/75 mt-3">
          {copy.priced}
        </p>

        <div className="flex flex-col items-center gap-4 mt-6">
          <MagicButton
            title={copy.cta}
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: copy.ctaSource },
            }}
          />
          <a
            href="#ladder"
            className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
          >
            {copy.tiersLink}
          </a>
          <p className="text-xs text-white-200/70 mt-1">{copy.guarantee}</p>
        </div>

        {/* Gaps, not "·" separators: a wrapped row would start with an orphan dot. */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-10 max-w-3xl mx-auto">
          {copy.proofItems.map((item) => (
            <span
              key={item}
              className="font-mono text-[11px] md:text-xs text-white-200/80"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-[11px] md:text-xs text-white-200/75 mt-3 max-w-2xl mx-auto">
          {copy.proofNote}
        </p>
        <p className="font-mono text-[11px] md:text-xs text-white-200/80 mt-3 max-w-2xl mx-auto">
          {copy.ledger}
        </p>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as servicesHeroCopy };
