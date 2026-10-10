import Link from "next/link";
import { CREDIT_TERMS, formatPrice, ladder, tiers } from "@/data/ladder";

const Offers = () => {
  return (
    <section id="offers" className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center">
          From a €200 call to a monthly retainer
        </h2>
        <p className="text-white-200 text-center mt-3 max-w-2xl mx-auto">
          Four tiers: Advise, Train, Build, Ship. Every offer has a price before
          we talk. {CREDIT_TERMS}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {tiers.map(({ tier, tagline }) => (
            <Link
              key={tier}
              href="/services#ladder"
              className="flex flex-col rounded-xl p-5 bg-black-200/30 border border-white/10 hover:border-purple transition-colors"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-purple">
                {tier}
              </h3>
              <p className="text-sm text-white-200/80 mt-1">{tagline}</p>
              <ul className="flex flex-col gap-3 mt-5 flex-1">
                {ladder
                  .filter((offer) => offer.tier === tier)
                  .map((offer) => (
                    <li key={offer.id}>
                      <span className="block text-sm font-semibold text-white">
                        {offer.name}
                      </span>
                      <span className="block text-sm text-white-200">
                        {formatPrice(offer)}
                      </span>
                      {offer.assurance && (
                        <span className="block text-xs text-blue-100 mt-1">
                          {offer.assurance}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
              <span className="text-sm font-medium text-purple mt-5">
                See what&apos;s included →
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-white-200/80 mt-8 max-w-2xl mx-auto">
          The verify layer is one senior human and doesn&apos;t parallelize — so
          only a few engagements run at once.
        </p>
      </div>
    </section>
  );
};

export default Offers;
