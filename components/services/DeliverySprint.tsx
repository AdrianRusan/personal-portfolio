import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { sprintDurations } from "@/data/ladder";
import { FaLocationArrow } from "react-icons/fa6";
import { PricingTable } from "./PricingTable";
import type { PricingColumn, PricingRow } from "./PricingTable";

const columns: PricingColumn[] = [
  { name: "Pilot Sprint" },
  { name: "Standard Sprint", badge: "Recommended", featured: true },
  { name: "Scale Sprint" },
];

const rows: PricingRow[] = [
  {
    label: "Best for",
    values: [
      "A low-risk first engagement — testing the working relationship",
      "A senior contractor-month of output, reviewed, in two weeks",
      "A larger surface, more PRs, more review depth",
    ],
  },
  {
    label: "Roughly",
    values: [
      "A focused feature slice (~5–6 PRs)",
      "A reviewed contractor-month (~10–15 PRs)",
      "A major surface, in depth (~16–20+ PRs)",
    ],
  },
  {
    label: "Timeline",
    values: sprintDurations,
  },
  {
    label: "Price",
    values: ["€7,500", "€14,500", "€24,000 — fixed on the scope call"],
  },
];

const en = {
  badge: "Most teams start here",
  eyebrow: "Primary offer",
  heading: "Agent-Accelerated Delivery Sprint",
  intro:
    "A fixed batch of production-ready, security-reviewed pull requests — shipped by an agent fleet, verified line by line by a senior engineer — delivered in 1–2 weeks, at a price you agree before we start.",
  deliveredHeading: "Exactly what's delivered",
  deliverables: [
    {
      lead: "A fixed number of merge-ready PRs,",
      rest: "on real branches in your repo, reviewed and green — ready for your team's final merge.",
    },
    {
      lead: "A per-PR review note:",
      rest: "what the agent produced, what the review caught and changed, and the residual risk, if any.",
    },
    {
      lead: "The Sprint Security Report (yours to keep)",
      rest: "— every vulnerability class checked, everything caught and fixed, stated plainly. This is the artifact the sprint is selling.",
    },
    {
      lead: "The Agent Failure Map (yours to keep) —",
      rest: "what shipped, what's left, and what the agents consistently got wrong in your codebase — a useful map for your team going forward.",
    },
  ],
  pricingHeading: "Pricing",
  pricingLead:
    "A senior contractor costs ~€10–14k/month and takes weeks to onboard.",
  pricingRest:
    "Standard ships a reviewed contractor-month — in two weeks. €14,500, fixed.",
  columns,
  rows,
  cta: "Book a scoping call",
  pricingNote:
    "Every sprint is priced on the reviewed outcome, not hours logged — locked on day 0, no runaway bill. The exact number is fixed on the scope call, before any work starts.",
  notHeading: "What this is NOT",
  notIntro: "Being clear up front saves us both a bad-fit call.",
  notList: [
    "Not open-ended. The PR count and scope are fixed on day 0. New scope is a new sprint, not a moving target.",
    "Not a staff-augmentation seat. You're buying reviewed outcomes, not a body for standups.",
    "Not greenfield architecture from zero. Designing a new system from scratch is a separate conversation.",
    "Not an auto-merge to production. I deliver reviewed, green, merge-ready PRs. The final merge and deploy decision stays with your team — deliberately, so your change control stays intact.",
    "Not ongoing maintenance. On-call and upkeep after handoff live in the retainer.",
  ],
  guaranteesHeading: "The guarantees",
  guaranteesIntro:
    'Two, both concrete and checkable. No "double your revenue or your money back" theatre.',
  guarantees: [
    {
      title: "1. Security guarantee",
      body: "Every delivered PR passes a documented adversarial security review before you see it. If a vulnerability that was in scope of that review is later found in a PR I marked reviewed, I fix it free and re-review the surrounding batch at no charge.",
    },
    {
      title: "2. First-PR quality guarantee",
      body: "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it. Your risk is highest before I've shipped anything, so the guarantee sits right there.",
    },
  ],
  guaranteesNote:
    'There is deliberately no blanket "money back if unhappy" guarantee. It invites scope disputes and it\'s not how a senior operator works. These two put my skin in the game where it actually matters: quality and security.',
  paymentHeading: "Payment",
  payment:
    "50% to book the slot, 50% on handoff. A Pilot Sprint can be paid in full up front. Running multiple sprints? That's the retainer, below.",
};

export type DeliverySprintCopy = typeof en;

export const DeliverySprint = ({
  copy = en,
}: {
  copy?: DeliverySprintCopy;
}) => {
  return (
    <section id="sprint" className="px-5 sm:px-10 py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl border border-purple shadow-[inset_0_0_0_1px_#CBACF9] bg-black-200/40 p-6 md:p-10">
          <span className="absolute -top-3 left-6 md:left-10 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-purple bg-black-100 px-3 py-1 rounded-full border border-purple">
            {copy.badge}
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-purple mt-4 block">
            {copy.eyebrow}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
            {copy.heading}
          </h2>
          <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
            {copy.intro}
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-4">
            {copy.deliveredHeading}
          </h3>
          <ul className="flex flex-col gap-3">
            {copy.deliverables.map((item) => (
              <li
                key={item.lead}
                className="flex gap-3 text-sm text-white-200 leading-relaxed"
              >
                <span className="text-purple flex-none">+</span>
                <span>
                  <span className="text-white font-medium">{item.lead}</span>{" "}
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-10 mb-4">
            {copy.pricingHeading}
          </h3>
          <p className="text-white-200 mb-6 leading-relaxed max-w-3xl text-base md:text-lg">
            <span className="text-white font-semibold">{copy.pricingLead}</span>{" "}
            {copy.pricingRest}
          </p>
          <PricingTable
            columns={copy.columns}
            rows={copy.rows}
            ctaHref={CALENDLY_URL}
            ctaLabel={copy.cta}
            trackSource="deliverysprint_pricing"
          />
          <p className="text-xs text-white-200/70 mt-4 italic">
            {copy.pricingNote}
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-2">
            {copy.notHeading}
          </h3>
          <p className="text-sm text-white-200/70 mb-4">{copy.notIntro}</p>
          <ul className="flex flex-col gap-3">
            {copy.notList.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-white-200/80 leading-relaxed"
              >
                <span className="text-white-200/40 flex-none">−</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-10 mb-4">
            {copy.guaranteesHeading}
          </h3>
          <p className="text-sm text-white-200/70 mb-4">
            {copy.guaranteesIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-xl border border-white/10 bg-black-200/30 p-5"
              >
                <p className="font-mono text-xs text-purple mb-2">{g.title}</p>
                <p className="text-sm text-white-200 leading-relaxed">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white-200/75 mt-4 max-w-2xl">
            {copy.guaranteesNote}
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-2">
            {copy.paymentHeading}
          </h3>
          <p className="text-sm text-white-200 leading-relaxed max-w-2xl">
            {copy.payment}
          </p>

          <div className="mt-8">
            <MagicButton
              title={copy.cta}
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "deliverysprint_bottom" },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
