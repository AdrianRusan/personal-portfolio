import Link from "next/link";
import {
  CREDIT_TERMS,
  formatPrice,
  ladder,
  tiers,
  type LadderOffer,
} from "@/data/ladder";
import { CAPACITY } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";

const en = {
  heading: "Offers and prices",
  intro: "Every offer has a fixed price before we talk. ",
  credit: CREDIT_TERMS,
  // RO only (A7): who the RO prices are for.
  priceNote: "",
  tiers: tiers.map((t) => ({ ...t, name: t.tier as string })),
  ladder,
  formatPrice,
  href: "/services#ladder",
  more: "See every offer and what's included →",
  capacity: CAPACITY,
};
export type OffersCopy = typeof en;

// P2: the home page shows the ladder as four rows (tier → offers → from-price);
// the full cards live on /services.
const Offers = ({ copy = en }: { copy?: OffersCopy }) => {
  const fromPrice = (offers: LadderOffer[]) => {
    const min = Math.min(
      ...offers.flatMap((o) => o.prices.map((p) => p.amount)),
    );
    return copy.formatPrice({
      ...offers[0]!,
      prices: [{ amount: min, from: true }],
      perMonth: false,
    });
  };

  return (
    <section id="offers" className="px-5 sm:px-10 py-12 md:py-20">
      <div className="container-section">
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

        <ul className="mt-8 border-t border-white/10">
          {copy.tiers.map(({ tier, name, tagline }) => {
            const offers = copy.ladder.filter((o) => o.tier === tier);
            return (
              <li
                key={tier}
                className="grid gap-1 md:grid-cols-[12rem_1fr_auto] md:gap-6 md:items-baseline border-b border-white/10 py-4 md:py-5"
              >
                <div>
                  <h3 className="font-semibold text-white">{name}</h3>
                  <p className="text-sm text-white-200/80">{tagline}</p>
                </div>
                <p className="text-sm text-white-200 text-pretty">
                  {offers.map((o) => o.name).join(" · ")}
                </p>
                <p className="tabular-nums text-sm font-semibold text-white md:text-right whitespace-nowrap">
                  {fromPrice(offers)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <Link
            href={copy.href}
            className="text-sm font-semibold text-purple hover:underline underline-offset-4"
          >
            {copy.more}
          </Link>
          <p className="text-sm text-white-200/80">{copy.capacity}</p>
        </div>
      </div>
    </section>
  );
};

export default Offers;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as offersCopy };
