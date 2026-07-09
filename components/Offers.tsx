import { offers } from "@/data";

const Offers = () => {
  return (
    <section id="offers" className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center">
          Three ways to work together.
        </h2>
        <p className="text-white-200 text-center mt-3 max-w-2xl mx-auto">
          Agents ship the volume, a senior engineer reviews every PR — packaged
          three ways. Every engagement is fixed-scope and priced before we
          start.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 items-start">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={
                offer.featured
                  ? "relative flex flex-col rounded-xl p-6 bg-black-200/40 border border-purple shadow-[inset_0_0_0_1px_#CBACF9] md:scale-[1.03] md:py-8"
                  : "relative flex flex-col rounded-xl p-5 bg-black-200/20 border border-white/10 opacity-80"
              }
            >
              {offer.badge && (
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-purple mb-3">
                  {offer.badge}
                </span>
              )}
              <h3
                className={
                  offer.featured
                    ? "text-lg font-semibold mb-3 tracking-tight"
                    : "text-base font-semibold mb-2 tracking-tight text-white-200"
                }
              >
                {offer.title}
              </h3>
              <p
                className={
                  offer.featured
                    ? "text-sm text-white-200 leading-relaxed flex-1"
                    : "text-sm text-white-200/80 leading-relaxed flex-1"
                }
              >
                {offer.body}
              </p>
              {offer.featured && (
                <p className="text-xs text-white-200/70 mt-4">
                  Sprints from €7,500 — most €12–18k, fixed on the call.
                </p>
              )}
              <a
                href="/services"
                className={
                  offer.featured
                    ? "text-sm font-medium text-purple hover:underline underline-offset-4 mt-5"
                    : "text-sm font-medium text-purple/80 hover:underline underline-offset-4 mt-4"
                }
              >
                Learn more →
              </a>
            </div>
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
