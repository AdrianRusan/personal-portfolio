import Link from "next/link";
import { formatPrice, ladder, offerById } from "@/data/ladder";

const reviewedPr = offerById(ladder, "reviewed-pr");

// The home pages' secondary line in the closing ask: the middle rung between
// the free teardown and a sprint (was FinalCta, P2).
const en = {
  before: "Somewhere in between?",
  link: `Start with one Reviewed PR: ${formatPrice(reviewedPr)}, ${reviewedPr.duration}`,
  href: "/services#entry-offer",
};
export type BetweenLineCopy = typeof en;

export const BetweenLine = ({ copy = en }: { copy?: BetweenLineCopy }) => (
  <>
    {copy.before}{" "}
    <Link
      href={copy.href}
      className="font-medium text-purple underline underline-offset-4 hover:text-white transition-colors"
    >
      {copy.link}&nbsp;→
    </Link>
  </>
);

export { en as betweenLineCopy };
