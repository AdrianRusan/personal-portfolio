import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { CALENDLY_URL, CREDIT_DAYS } from "@/data";
import { formatPrice, ladder, offerById } from "@/data/ladder";

const reviewedPr = offerById(ladder, "reviewed-pr");

const en = {
  eyebrow: "2-3x, not 100x — and here's what the agents get wrong.",
  heading:
    "Bring me a backlog. I'll ship it at agent speed and review every PR for security before it reaches you.",
  body: "You triage and merge. I'm accountable for what lands.",
  button: "Book a scoping call",
  // Folded in from the old StartBand (#54 R3): the middle rung between the
  // free teardown and a sprint.
  betweenBefore: "Somewhere in between?",
  betweenLink: `Start with one Reviewed PR — ${formatPrice(reviewedPr)}, ${reviewedPr.duration}. Book a sprint within ${CREDIT_DAYS} days and it counts toward it →`,
  betweenHref: "/services#entry-offer",
  capacity:
    "The review layer is one senior human, so I run one sprint or retainer at a time.",
};
export type FinalCtaCopy = typeof en;

const FinalCta = ({ copy = en }: { copy?: FinalCtaCopy }) => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-10 md:p-16 text-center">
        <p className="font-mono text-sm text-purple">{copy.eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-4 text-balance max-w-3xl mx-auto">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-4">{copy.body}</p>
        <div className="flex justify-center mt-8">
          <MagicButton
            title={copy.button}
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "final_cta" },
            }}
          />
        </div>
        <p className="text-sm text-white-200/80 mt-6">
          {copy.betweenBefore}{" "}
          <a
            href={copy.betweenHref}
            className="text-blue-100 hover:text-purple transition-colors font-medium"
          >
            {copy.betweenLink}
          </a>
        </p>
        <p className="text-xs text-white-200/75 mt-4 max-w-xl mx-auto">
          {copy.capacity}
        </p>
      </div>
    </section>
  );
};

export default FinalCta;
