import {
  CREDIT_TERMS,
  formatPrice,
  ladder,
  tiers,
  type Tier,
} from "@/data/ladder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LadderLink } from "./LadderLink";

const en = {
  offers: ladder,
  tiers,
  tierName: (tier: Tier): string => tier,
  format: formatPrice,
  heading: "Prices",
  // The credit rule is stated here and nowhere else on the page (R2-F11).
  intro: `Start with a €200 call or go straight to a sprint. ${CREDIT_TERMS} All prices are in EUR, excluding VAT.`,
  // RO adds the "firms based in Romania" qualifier (A7).
  note: undefined as string | undefined,
  limited: "One at a time",
  // R2-F27: replaces the Scarcity section. Also the "One at a time" tooltip.
  capacity:
    "I review every PR myself, so I run one sprint or retainer at a time. If I'm booked, I'll tell you the next start date.",
  source: "services_ladder",
};

export type LadderContent = typeof en;

// R2-F12: one full-width row per tier, so no column ends early.
export const Ladder = ({ content = en }: { content?: LadderContent }) => {
  return (
    <section id="ladder" className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24">
      <div className="container-section">
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
            <div
              key={tier}
              className="grid grid-cols-1 lg:grid-cols-[11rem_1fr] gap-4 lg:gap-8 border-t border-white/10 py-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {content.tierName(tier)}
                </h3>
                <p className="text-sm text-white-200/80 mt-1 text-pretty">
                  {tagline}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {content.offers
                  .filter((offer) => offer.tier === tier)
                  .map((offer) => (
                    <div
                      key={offer.id}
                      className="flex flex-col rounded-xl border border-white/10 bg-black-200/40 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-semibold text-white">
                          {offer.name}
                        </h4>
                        {offer.limited && (
                          <span
                            title={content.capacity}
                            className="text-xs font-medium text-blue-100 border border-blue-100/30 rounded-full px-2 py-0.5"
                          >
                            {content.limited}
                          </span>
                        )}
                      </div>
                      <p className="num text-lg font-bold text-white mt-2">
                        {content.format(offer)}
                      </p>
                      <p className="text-xs text-white-200/75 mt-1">
                        {offer.duration}
                      </p>
                      <p className="text-sm text-white-200 leading-relaxed mt-3 flex-1">
                        {offer.summary}
                      </p>
                      {offer.assurance && (
                        <p className="text-xs text-white-200/80 mt-3">
                          {offer.assurance}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                        {offer.ctas.map((cta) => (
                          <LadderLink
                            key={cta.href}
                            href={cta.href}
                            offer={offer.id}
                            source={content.source}
                            className="text-sm font-medium text-purple hover:underline underline-offset-4"
                          >
                            {cta.label} {cta.href.startsWith("#") ? "↓" : "→"}
                          </LadderLink>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-white-200/80 border-t border-white/10 pt-6 max-w-3xl text-pretty">
          {content.capacity}
        </p>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as ladderCopy };
