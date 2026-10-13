import { CALENDLY_URL, SAMPLE_REPORT_URL } from "@/data";
import { sprintDurations, sprintSizes } from "@/data/ladder";
import { withTierPrefill } from "@/lib/calendly";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Fold } from "./Fold";
import { PricingTable } from "./PricingTable";
import type { PricingColumn, PricingRow } from "./PricingTable";

const eur = (n: number) => `€${n.toLocaleString("en-US")}`;
const prs = (i: number) => sprintSizes[i]!.prs.join("–");
const standard = sprintSizes[1]!;

// C44: one price list feeds the Price row and each tier's Calendly prefill.
// R2-F3: Scale is a floor, so it reads "from".
const prices = [
  eur(sprintSizes[0]!.price),
  eur(standard.price),
  `from ${eur(sprintSizes[2]!.price)}`,
];

// R2-F2: Pilot first at every width, and it holds the filled button.
const columns: PricingColumn[] = withTierPrefill(
  CALENDLY_URL,
  [
    { name: "Pilot Sprint", badge: "First sprint", featured: true },
    { name: "Standard Sprint", badge: "Best per-PR price" },
    { name: "Scale Sprint" },
  ],
  prices,
);

const rows: PricingRow[] = [
  {
    label: "Best for",
    values: [
      "A first engagement, to see how we work together",
      "A steady backlog, cleared in one or two weeks",
      "A larger surface, with more PRs and deeper review",
    ],
  },
  {
    label: "Roughly",
    values: [
      `A focused feature slice (~${prs(0)} PRs)`,
      `A reviewed contractor-month (~${prs(1)} PRs)`,
      `A major surface, in depth (~${prs(2)}+ PRs)`,
    ],
  },
  {
    label: "Timeline",
    values: sprintDurations,
  },
  {
    label: "Price",
    values: prices,
  },
];

const en = {
  eyebrow: "Main offer",
  heading: "Delivery Sprint",
  intro:
    "A fixed batch of production-ready pull requests. AI agents write them, and I review each one line by line, security first. You agree the price before we start.",
  deliveredHeading: "What you get",
  deliverables: [
    {
      lead: "A fixed number of merge-ready PRs",
      rest: "on real branches in your repo, reviewed and ready for your team to merge.",
    },
    {
      lead: "A review note per PR:",
      rest: "what the agent wrote, what the review caught and changed, and any risk left.",
    },
    {
      lead: "The security report, yours to keep:",
      rest: "every vulnerability class checked, and everything found and fixed.",
    },
    {
      lead: "A list of what the agents got wrong",
      rest: "in your codebase, so your team knows where to look from now on.",
    },
  ],
  sampleLink: "See a sample security report →",
  pricingHeading: "Sprint prices",
  rowHeader: "Feature",
  // A1 F5: the contractor-month anchor had no source, so the price stands alone.
  pricingRest: `A Standard Sprint is ${eur(standard.price)} for ${prs(1)} PRs, each one security-reviewed, plus the security report.`,
  columns,
  rows,
  cta: "Book a scoping call",
  pricingNote:
    "The exact price is fixed on the scope call, before any work starts.",
  notHeading: "What this is not",
  notList: [
    "Open-ended work. The PR count and scope are fixed on day 0, and new scope is a new sprint.",
    "A staff-augmentation seat. You buy reviewed PRs, and nobody joins your standups.",
    "Greenfield architecture. Designing a new system from scratch is a separate conversation.",
    "Auto-merge to production. The final merge and deploy stay with your team, so your change control stays intact.",
    "Ongoing maintenance. On-call and upkeep after handoff belong to the retainer.",
  ],
  guaranteesHeading: "Guarantees",
  guarantees: [
    {
      title: "Security",
      body: "Every PR gets a documented security review before you see it. If an in-scope vulnerability later turns up in a PR I marked reviewed, I fix it free and re-review the batch around it.",
    },
    {
      title: "First PR",
      body: "If the first PR isn't one you'd merge, you don't pay for it. Your risk is highest before I've shipped anything.",
    },
  ],
  paymentHeading: "Payment",
  payment:
    "50% to book the slot, 50% on handoff. A Pilot Sprint can be paid in full up front. Running sprints back to back? See the retainer below.",
};

export type DeliverySprintCopy = typeof en;

export const DeliverySprint = ({
  copy = en,
}: {
  copy?: DeliverySprintCopy;
}) => {
  return (
    <section id="sprint" className="px-5 md:px-12 py-12 md:py-16 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading eyebrow={copy.eyebrow} lead={copy.intro}>
          {copy.heading}
        </SectionHeading>

        <div className="mt-8">
          <Fold title={copy.deliveredHeading} defaultOpen>
            <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-purple">
              {copy.deliverables.map((item) => (
                <li
                  key={item.lead}
                  className="text-sm text-white-200 leading-relaxed"
                >
                  <span className="text-white font-medium">{item.lead}</span>{" "}
                  {item.rest}
                </li>
              ))}
            </ul>
            {SAMPLE_REPORT_URL && (
              <a
                href={SAMPLE_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm font-medium text-purple underline underline-offset-4 hover:text-white transition-colors"
              >
                {copy.sampleLink}
              </a>
            )}
          </Fold>
        </div>

        <div className="border-t border-white/15 pt-8 pb-4">
          <h3 className="text-lg font-semibold mb-3">{copy.pricingHeading}</h3>
          <p className="text-white-200 mb-6 leading-relaxed max-w-3xl text-pretty">
            {copy.pricingRest}
          </p>
          <PricingTable
            columns={copy.columns}
            rows={copy.rows}
            ctaHref={CALENDLY_URL}
            ctaLabel={copy.cta}
            rowHeader={copy.rowHeader}
            trackSource="deliverysprint_pricing"
          />
          <p className="text-xs text-white-200/75 mt-4">{copy.pricingNote}</p>
        </div>

        {/* The one guarantees block on /services (C32): Retainer points here. */}
        <Fold title={copy.guaranteesHeading}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {copy.guarantees.map((g) => (
              <div key={g.title}>
                <dt className="text-sm font-semibold text-white">{g.title}</dt>
                <dd className="text-sm text-white-200 leading-relaxed mt-1">
                  {g.body}
                </dd>
              </div>
            ))}
          </dl>
        </Fold>

        <Fold title={copy.notHeading}>
          <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-white-200/40">
            {copy.notList.map((item) => (
              <li
                key={item}
                className="text-sm text-white-200/80 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </Fold>

        <Fold title={copy.paymentHeading}>
          <p className="text-sm text-white-200 leading-relaxed max-w-2xl">
            {copy.payment}
          </p>
        </Fold>
      </div>
    </section>
  );
};
