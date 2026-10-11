import { CalendlyLink } from "@/components/CalendlyLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaSecondary } from "@/components/ui/button";
import { Fold } from "./Fold";

const en = {
  heading: "Retainer",
  intro:
    "Reviewed PRs every month, at a pace we agree up front. Your review slot is held for you.",
  deliveredHeading: "What you get each month",
  deliverables: [
    "An agreed number of PRs, each one reviewed the same way as in a sprint.",
    "A running log of security findings, and a monthly note on what the agents got wrong in your codebase.",
    "Async access to me for delivery and review questions.",
    "First claim on my review time: retainer clients keep their slot ahead of one-off sprints.",
  ],
  startsAt: "From",
  price: "€4,000",
  perMonth: "/month",
  // D4: the minimum sits at the price, not only in the terms.
  minimum: "3-month minimum, from €12,000",
  pricingBody:
    "The monthly PR count and per-PR rate are set on the call, against your repo and pace. The per-PR rate lands about 20–30% below a one-off sprint.",
  cta: "Book a scoping call",
  guaranteesHeading: "Guarantees",
  guarantees: [
    {
      title: "First-month guarantee",
      body: "We agree the pace up front. If month 1 misses it, you can stop there and owe nothing more.",
    },
  ],
  // C32: the full security guarantee is printed once, in the sprint section.
  securityNote:
    "Every retainer PR also carries the sprint's security guarantee.",
  termsHeading: "Terms",
  terms: [
    "Monthly volume has a cap. Overflow moves to next month or a top-up sprint.",
    "24/7 on-call isn't included. It can be added as a separate line item.",
    "Three months to start, then month to month with 30 days' notice.",
  ],
};

export type RetainerCopy = typeof en;

// R2-F14: price and deliverables side by side, so neither leaves half a row empty.
export const Retainer = ({ copy = en }: { copy?: RetainerCopy }) => {
  return (
    <section
      id="retainer"
      className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24"
    >
      <div className="container-section">
        <SectionHeading lead={copy.intro}>{copy.heading}</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 border-t border-white/10 pt-8">
          <div>
            <h3 className="text-lg font-semibold">{copy.deliveredHeading}</h3>
            <ul className="flex flex-col gap-3 mt-4 list-disc pl-5 marker:text-purple">
              {copy.deliverables.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white-200 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8 self-start">
            <p className="text-sm text-white-200/80">{copy.startsAt}</p>
            <p className="num text-3xl md:text-4xl font-bold text-white mt-1">
              {copy.price}
              <span className="text-base font-normal text-white-200">
                {copy.perMonth}
              </span>
            </p>
            <p className="text-sm text-white mt-2">{copy.minimum}</p>
            <p className="text-sm text-white-200 mt-4 leading-relaxed text-pretty">
              {copy.pricingBody}
            </p>
            <div className="mt-6">
              <CalendlyLink
                source="retainer_top"
                ariaLabel={copy.cta}
                className={ctaSecondary}
              >
                {copy.cta}
              </CalendlyLink>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Fold title={copy.guaranteesHeading}>
            {copy.guarantees.map((g) => (
              <p
                key={g.title}
                className="text-sm text-white-200 leading-relaxed"
              >
                <span className="font-semibold text-white">{g.title}.</span>{" "}
                {g.body}
              </p>
            ))}
            <p className="text-sm text-white-200 mt-3 leading-relaxed">
              {copy.securityNote}
            </p>
          </Fold>

          <Fold title={copy.termsHeading}>
            <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-white-200/40">
              {copy.terms.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white-200/80 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Fold>
        </div>
      </div>
    </section>
  );
};
