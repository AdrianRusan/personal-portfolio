import {
  CREDIT_TERMS,
  formatPrice,
  ladder,
  offerById,
  tiers,
  type Tier,
} from "@/data/ladder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { keepRangesWhole } from "@/lib/utils";
import { LadderLink } from "./LadderLink";

const en = {
  offers: ladder,
  tiers,
  tierName: (tier: Tier): string => tier,
  format: formatPrice,
  heading: "Prices",
  // The credit rule is stated here and nowhere else on the page (R2-F11).
  intro: `Start with one Reviewed PR at ${formatPrice(offerById(ladder, "reviewed-pr"))}, or go straight to a sprint. ${CREDIT_TERMS} All prices are in EUR, excluding VAT.`,
  // RO adds the "firms based in Romania" qualifier (A7).
  note: undefined as string | undefined,
  limited: "One at a time",
  // R2-F27: replaces the Scarcity section. Also the "One at a time" tooltip.
  capacity:
    "I review every PR myself, so I run one sprint or retainer at a time. If I'm booked, I'll tell you the next start date.",
  source: "services_ladder",
};

export type LadderContent = typeof en;

// A4 F3: one compact row per offer (name, price, one sentence, links), grouped
// by tier, in place of the card grid that left empty columns. A1 F10: Ship
// rows drop the assurance line, because their detail blocks below repeat it.
export const Ladder = ({ content = en }: { content?: LadderContent }) => {
  return (
    <section id="ladder" className="px-5 md:px-12 py-12 md:py-16 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading
          lead={
            <>
              {content.intro}
              {content.note && <> {content.note}</>}
            </>
          }
        >
          {content.heading}
        </SectionHeading>

        <div className="mt-10 flex flex-col">
          {content.tiers.map(({ tier, tagline }) => (
            <div key={tier} className="border-t border-white/15 pt-6 pb-2">
              <h3 className="text-lg font-semibold text-white">
                {content.tierName(tier)}
                <span className="ml-3 text-sm font-normal text-white-200/80">
                  {tagline}
                </span>
              </h3>
              <ul className="mt-2">
                {content.offers
                  .filter((offer) => offer.tier === tier)
                  .map((offer) => (
                    <li
                      key={offer.id}
                      className="grid gap-x-8 gap-y-1 border-t border-white/5 py-4 first:border-t-0 md:grid-cols-[13rem_1fr_auto]"
                    >
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {offer.name}
                        </h4>
                        <p className="text-xs text-white-200/75 mt-0.5">
                          {offer.duration}
                          {offer.limited && (
                            <span title={content.capacity}>
                              {" "}
                              · {content.limited}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="md:order-none order-last">
                        <p className="text-sm text-white-200 leading-relaxed text-pretty">
                          {keepRangesWhole(offer.summary)}
                          {offer.tier !== "Ship" && offer.assurance && (
                            <> {offer.assurance}</>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-x-4 mt-1">
                          {offer.ctas.map((cta) => (
                            <LadderLink
                              key={cta.href}
                              href={cta.href}
                              offer={offer.id}
                              source={content.source}
                              className="inline-flex min-h-11 items-center text-sm font-medium text-purple hover:underline underline-offset-4"
                            >
                              {cta.label} {cta.href.startsWith("#") ? "↓" : "→"}
                            </LadderLink>
                          ))}
                        </div>
                      </div>
                      <p className="tabular-nums text-base font-[380] text-white md:text-right whitespace-nowrap">
                        {content.format(offer)}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/15 pt-6">
          <p className="text-sm text-white-200/80 max-w-3xl text-pretty">
            {content.capacity}
          </p>
        </div>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as ladderCopy };
