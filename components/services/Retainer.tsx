import { CalendlyLink } from "@/components/CalendlyLink";
import { Fold } from "./Fold";

const en = {
  eyebrow: "Ongoing capacity",
  heading: "Retainer",
  intro:
    "Senior AI-native delivery, every month: a committed flow of security-reviewed PRs for teams who've stopped asking whether agents are fast and now want them running continuously and safely.",
  deliveredHeading: "What's delivered, monthly",
  deliverables: [
    "A committed monthly PR throughput band, all adversarially reviewed — the same ship/verify pipeline as the sprint, on a continuous cadence.",
    'A rolling security findings log and a monthly "what the agents got wrong in your codebase" report.',
    "Standing async access to me for delivery and review questions.",
    "Priority booking over one-off sprints — retainer clients hold a permanent verify slot.",
  ],
  pricingHeading: "Pricing",
  startsAt: "Starts at",
  price: "€4,000",
  perMonth: "/month",
  // D4: the minimum sits at the price, not only in the terms.
  minimum: "3-month minimum, from €12,000",
  pricingBody:
    "A permanently reserved senior-review slot and a committed monthly band of reviewed PRs, on the same ship/verify pipeline as the sprint. The exact band and per-PR rate are scoped on the call, against your repo and cadence — a 3-month initial commitment.",
  pricingRate:
    "The per-PR rate lands roughly 20–30% below the one-off Sprint rate — that's what the monthly commitment buys you. The exact band is scoped on the call.",
  cta: "Book a scoping call",
  bandNote:
    "Your monthly band is locked on day 0, no runaway bill — overflow rolls forward instead of surprise invoicing.",
  guaranteesHeading: "The guarantees",
  // C32: the security guarantee is printed once, in the sprint section.
  securityNote: "The sprint's security guarantee applies to every retainer PR too.",
  securityLink: "Read it ↑",
  guarantees: [
    {
      title: "Proof-month guarantee",
      body: "We agree the pace of reviewed PRs up front. If month 1 misses it, you can stop there, with nothing more owed. You see the retainer working before the full three months.",
    },
  ],
  termsHeading: "Terms",
  terms: [
    "Throughput is a band, not unlimited. Overflow rolls to the next month or a top-up sprint. The exact band is scoped on the call.",
    "Not 24/7 on-call incident response — that can be added as a named line item, priced separately.",
    "Three months to start. If month 1 misses the pace we agreed, you can stop there. After the three months it's month to month: give me 30 days' notice when you want to stop.",
  ],
};

export type RetainerCopy = typeof en;

export const Retainer = ({ copy = en }: { copy?: RetainerCopy }) => {
  return (
    <section id="retainer" className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          {copy.eyebrow}
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          {copy.intro}
        </p>

        <Fold title={copy.deliveredHeading}>
          <ul className="flex flex-col gap-3">
            {copy.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-white-200 leading-relaxed"
              >
                <span className="text-purple flex-none">+</span>
                {item}
              </li>
            ))}
          </ul>
        </Fold>

        <h3 className="text-lg font-semibold mt-10 mb-4">
          {copy.pricingHeading}
        </h3>
        <div className="rounded-xl border border-white/10 bg-black-200/30 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-blue-100 mb-2">
            {copy.startsAt}
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {copy.price}
            <span className="text-base font-normal text-white-200">
              {copy.perMonth}
            </span>
          </p>
          <p className="font-mono text-xs md:text-sm text-white mt-2">
            {copy.minimum}
          </p>
          <p className="text-sm text-white-200 mt-4 leading-relaxed max-w-2xl">
            {copy.pricingBody}
          </p>
          <p className="text-sm text-white-200/80 mt-3 leading-relaxed max-w-2xl">
            {copy.pricingRate}
          </p>
          <div className="mt-6">
            <CalendlyLink source="retainer_top" ariaLabel={copy.cta}>
              <span className="inline-flex items-center rounded-lg border border-purple/40 px-4 py-2 text-xs font-medium text-purple hover:bg-purple/10 transition-colors">
                {copy.cta}
              </span>
            </CalendlyLink>
          </div>
        </div>
        <p className="text-xs text-white-200/70 mt-4 italic">{copy.bandNote}</p>

        <Fold title={copy.guaranteesHeading}>
          {copy.guarantees.map((g) => (
            <div
              key={g.title}
              className="rounded-xl border border-white/10 bg-black-200/30 p-5"
            >
              <p className="font-mono text-xs text-purple mb-2">{g.title}</p>
              <p className="text-sm text-white-200 leading-relaxed">{g.body}</p>
            </div>
          ))}
          <p className="text-sm text-white-200 mt-4">
            {copy.securityNote}{" "}
            <a
              href="#sprint"
              className="text-purple underline underline-offset-4 hover:text-white"
            >
              {copy.securityLink}
            </a>
          </p>
        </Fold>

        <Fold title={copy.termsHeading}>
          <ul className="flex flex-col gap-3">
            {copy.terms.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-white-200/80 leading-relaxed"
              >
                <span className="text-white-200/40 flex-none">−</span>
                {item}
              </li>
            ))}
          </ul>
        </Fold>

      </div>
    </section>
  );
};
