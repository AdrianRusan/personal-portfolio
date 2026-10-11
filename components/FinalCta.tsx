import { ClosingCta, closingCtaCopy, type ClosingCtaCopy } from "./ClosingCta";
import { CREDIT_DAYS } from "@/data";
import { formatPrice, ladder, offerById } from "@/data/ladder";

const reviewedPr = offerById(ladder, "reviewed-pr");

// The home pages' closing ask: the shared ClosingCta with the home heading and
// the "Somewhere in between?" line.
const en = {
  heading:
    "Bring me a backlog. I'll ship it at agent speed and review every PR for security before it reaches you.",
  body: "You triage and merge. I'm accountable for what lands.",
  button: "Book a scoping call",
  // Folded in from the old StartBand (#54 R3): the middle rung between the
  // free teardown and a sprint.
  betweenBefore: "Somewhere in between?",
  betweenLink: `Start with one Reviewed PR: ${formatPrice(reviewedPr)}, ${reviewedPr.duration}. Book a sprint within ${CREDIT_DAYS} days and it counts toward it →`,
  betweenHref: "/services#entry-offer",
};
export type FinalCtaCopy = typeof en;

const FinalCta = ({
  copy = en,
  closing = closingCtaCopy,
}: {
  copy?: FinalCtaCopy;
  // The locale's shared closing copy (email line, teardown link, checklist).
  closing?: ClosingCtaCopy;
}) => (
  <ClosingCta
    source="final_cta"
    copy={{ ...closing, heading: copy.heading, body: copy.body, button: copy.button }}
    secondary={
      <>
        {copy.betweenBefore}{" "}
        <a
          href={copy.betweenHref}
          className="text-blue-100 hover:text-purple transition-colors font-medium"
        >
          {copy.betweenLink}
        </a>
      </>
    }
  />
);

export default FinalCta;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as finalCtaCopy };
