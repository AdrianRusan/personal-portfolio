import {
  CREDIT_TERMS,
  formatPrice,
  ladder,
  tiers,
  type Tier,
} from "@/data/ladder";
import { CAPACITY } from "@/data";
import { LadderLink } from "./LadderLink";

const en = {
  offers: ladder,
  tiers,
  tierName: (tier: Tier): string => tier,
  format: formatPrice,
  eyebrow: "Advise → Train → Build → Ship",
  heading: "Four ways to work together, every one priced",
  intro: `Start with a €200 call or go straight to a sprint. ${CREDIT_TERMS} All prices are in EUR, excluding VAT.`,
  limited: "One at a time",
  // Visible caption under the ladder; also the "One at a time" badge tooltip.
  capacity: CAPACITY,
  source: "services_ladder",
};

export type LadderContent = typeof en;

export const Ladder = ({ content = en }: { content?: LadderContent }) => {
  return (
    <section id="ladder" className="px-5 sm:px-10 py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-purple">
          {content.eyebrow}
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          {content.heading}
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          {content.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
          {content.tiers.map(({ tier, tagline }) => (
            <div key={tier} className="flex flex-col gap-4">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-purple">
                  {content.tierName(tier)}
                </h3>
                <p className="text-sm text-white-200/80 mt-1">{tagline}</p>
              </div>
              {content.offers
                .filter((offer) => offer.tier === tier)
                .map((offer) => (
                  <div
                    key={offer.id}
                    className="flex flex-col rounded-xl border border-white/10 bg-black-200/40 p-5"
                  >
                    {offer.limited && (
                      <span
                        title={content.capacity}
                        className="self-start font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-blue-100 border border-blue-100/30 rounded-full px-2 py-0.5 mb-3"
                      >
                        {content.limited}
                      </span>
                    )}
                    <h4 className="text-base font-semibold text-white">
                      {offer.name}
                    </h4>
                    <p className="text-xl font-bold text-white mt-2">
                      {content.format(offer)}
                    </p>
                    <p className="font-mono text-[11px] text-white-200/75 mt-1">
                      {offer.duration}
                    </p>
                    {offer.assurance && (
                      <p className="text-xs text-white-200 mt-2">
                        {offer.assurance}
                      </p>
                    )}
                    <p className="text-sm text-white-200 leading-relaxed mt-3 flex-1">
                      {offer.summary}
                    </p>
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
          ))}
        </div>

        <p className="text-sm text-white-200/80 mt-10 max-w-3xl">
          {content.capacity}
        </p>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as ladderCopy };
