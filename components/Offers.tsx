import Link from "next/link";
import {
  CREDIT_TERMS,
  formatPrice,
  ladder,
  tiers,
  type LadderOffer,
} from "@/data/ladder";
import { CAPACITY, VAT_LINE } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";

const en = {
  heading: "Offers and prices",
  intro: "Every offer has a published starting price, and the final price is fixed before work starts. ",
  credit: CREDIT_TERMS,
  // #149 R2: the VAT line next to the prices (RO adds who its prices are for).
  priceNote: VAT_LINE,
  tiers: tiers.map((t) => ({ ...t, name: t.tier as string })),
  ladder,
  formatPrice,
  href: "/services#ladder",
  more: "See every offer and what's included →",
  capacity: CAPACITY,
};
export type OffersCopy = typeof en;

// P2: the home page shows the ladder as one ruled column per tier (#114 M:
// tier → from-price → tagline → offers); the full cards live on /services.
const Offers = ({ copy = en }: { copy?: OffersCopy }) => {
  // The tier's cheapest price, keeping that offer's unit (e.g. /month).
  const fromPrice = (offers: LadderOffer[]) => {
    const low = (o: LadderOffer) => Math.min(...o.prices.map((p) => p.amount));
    const cheapest = offers.reduce((a, b) => (low(b) < low(a) ? b : a));
    return copy.formatPrice({
      ...cheapest,
      prices: [{ amount: low(cheapest), from: true }],
    });
  };

  return (
    <section id="offers" className="section border-t border-ink/15">
      <div className="container-wide">
        <SectionHeading
          lead={
            <>
              {copy.intro}
              {copy.credit}
              {copy.priceNote && (
                <span className="block mt-2 text-sm">{copy.priceNote}</span>
              )}
            </>
          }
        >
          {copy.heading}
        </SectionHeading>

        <ul className="mt-10 grid border-t border-ink md:grid-cols-2 xl:grid-cols-4">
          {copy.tiers.map(({ tier, name, tagline }) => {
            const offers = copy.ladder.filter((o) => o.tier === tier);
            if (offers.length === 0) return null;
            return (
              <li
                key={tier}
                className="flex flex-col gap-2 border-b border-ink/15 py-6 md:pr-8"
              >
                <h3 className="eyebrow">{name}</h3>
                <p className="tabular-nums text-3xl type-light text-ink text-balance">
                  {fromPrice(offers)}
                </p>
                <p className="text-body text-pretty">{tagline}</p>
                <p className="text-sm text-body/80 text-pretty">
                  {offers.map((o) => o.name).join(" · ")}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <Link
            href={copy.href}
            className="text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            {copy.more}
          </Link>
          <p className="text-sm text-body/80">{copy.capacity}</p>
        </div>
      </div>
    </section>
  );
};

export default Offers;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as offersCopy };
