import Link from "next/link";
import { CREDIT_TERMS, formatPrice, ladder, tiers } from "@/data/ladder";
import { CAPACITY } from "@/data";

const en = {
  heading: "From a €200 call to a monthly retainer",
  intro:
    "Four tiers, eight offers: Advise, Train, Build, Ship. Every offer has a price before we talk. ",
  credit: CREDIT_TERMS,
  tiers: tiers.map((t) => ({ ...t, name: t.tier as string })),
  ladder,
  formatPrice,
  href: "/services#ladder",
  more: "See what's included →",
  capacity: CAPACITY,
};
export type OffersCopy = typeof en;

const Offers = ({ copy = en }: { copy?: OffersCopy }) => {
  return (
    <section id="offers" className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center">
          {copy.heading}
        </h2>
        <p className="text-white-200 text-center mt-3 max-w-2xl mx-auto">
          {copy.intro}
          {copy.credit}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {copy.tiers.map(({ tier, name, tagline }) => (
            <Link
              key={tier}
              href={copy.href}
              className="flex flex-col rounded-xl p-5 bg-black-200/30 border border-white/10 hover:border-purple transition-colors"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-purple">
                {name}
              </h3>
              <p className="text-sm text-white-200/80 mt-1">{tagline}</p>
              <ul className="flex flex-col gap-3 mt-5 flex-1">
                {copy.ladder
                  .filter((offer) => offer.tier === tier)
                  .map((offer) => (
                    <li key={offer.id}>
                      <span className="block text-sm font-semibold text-white">
                        {offer.name}
                      </span>
                      <span className="block text-sm text-white-200">
                        {copy.formatPrice(offer)}
                      </span>
                      {offer.assurance && (
                        <span className="block text-xs text-white-200 mt-1">
                          {offer.assurance}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
              <span className="text-sm font-medium text-purple mt-5">
                {copy.more}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-white-200/80 mt-8 max-w-2xl mx-auto">
          {copy.capacity}
        </p>
      </div>
    </section>
  );
};

export default Offers;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as offersCopy };
