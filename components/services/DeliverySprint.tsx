import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";
import { PricingTable } from "./PricingTable";
import type { PricingColumn, PricingRow } from "./PricingTable";

const deliverables = [
  {
    lead: "A fixed number of merge-ready PRs,",
    rest: "on real branches in your repo, reviewed and green — ready for your team's final merge.",
  },
  {
    lead: "A per-PR review note:",
    rest: "what the agent produced, what the review caught and changed, and the residual risk, if any.",
  },
  {
    lead: "A security findings log for the whole sprint",
    rest: "— every vulnerability class checked, everything caught and fixed, stated plainly. This is the artifact the sprint is selling.",
  },
  {
    lead: "A sprint wrap doc:",
    rest: "what shipped, what's left, and what the agents consistently got wrong in your codebase — a useful map for your team going forward.",
  },
];

const notList = [
  "Not open-ended. The PR count and scope are fixed on day 0. New scope is a new sprint, not a moving target.",
  "Not a staff-augmentation seat. You're buying reviewed outcomes, not a body for standups.",
  "Not greenfield architecture from zero. Designing a new system from scratch is a separate conversation.",
  "Not an auto-merge to production. I deliver reviewed, green, merge-ready PRs. The final merge and deploy decision stays with your team — deliberately, so your change control stays intact.",
  "Not ongoing maintenance. On-call and upkeep after handoff live in the retainer.",
];

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
      "~5–6 reviewed PRs",
      "~10–15 reviewed PRs",
      "~16–20+ reviewed PRs",
    ],
  },
  {
    label: "Timeline",
    values: ["~3–5 days", "~1–2 weeks", "~2–3 weeks"],
  },
  {
    label: "Price",
    values: ["€7,500", "€14,500", "€24,000 — fixed on the scope call"],
  },
];

export const DeliverySprint = () => {
  return (
    <section id="sprint" className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl border border-purple shadow-[inset_0_0_0_1px_#CBACF9] bg-black-200/40 p-6 md:p-10">
          <span className="absolute -top-3 left-6 md:left-10 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-purple bg-black-100 px-3 py-1 rounded-full border border-purple">
            Most teams start here
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-purple mt-4 block">
            Primary offer
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
            Agent-Accelerated Delivery Sprint
          </h2>
          <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
            A fixed batch of production-ready, security-reviewed pull requests —
            shipped by an agent fleet, verified line by line by a senior
            engineer — delivered in days, at a price you agree before we start.
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-4">
            Exactly what&apos;s delivered
          </h3>
          <ul className="flex flex-col gap-3">
            {deliverables.map((item) => (
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

          <h3 className="text-lg font-semibold mt-10 mb-4">Pricing</h3>
          <PricingTable
            columns={columns}
            rows={rows}
            ctaHref={CALENDLY_URL}
            ctaLabel="Book a scoping call"
          />
          <p className="text-xs text-white-200/70 mt-4 italic">
            Every sprint is priced on the reviewed outcome, not hours logged —
            locked on day 0, no runaway bill. The exact number is fixed on the
            scope call, before any work starts.
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-2">What this is NOT</h3>
          <p className="text-sm text-white-200/70 mb-4">
            Being clear up front saves us both a bad-fit call.
          </p>
          <ul className="flex flex-col gap-3">
            {notList.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-white-200/80 leading-relaxed"
              >
                <span className="text-white-200/40 flex-none">−</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-10 mb-4">The guarantees</h3>
          <p className="text-sm text-white-200/70 mb-4">
            Two, both concrete and checkable. No &quot;double your revenue or
            your money back&quot; theatre.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/10 bg-black-200/30 p-5">
              <p className="font-mono text-xs text-purple mb-2">
                1. Security guarantee
              </p>
              <p className="text-sm text-white-200 leading-relaxed">
                Every delivered PR passes a documented adversarial security
                review before you see it. If a vulnerability that was in scope
                of that review is later found in a PR I marked reviewed, I fix
                it free and re-review the surrounding batch at no charge.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black-200/30 p-5">
              <p className="font-mono text-xs text-purple mb-2">
                2. First-PR proof guarantee
              </p>
              <p className="text-sm text-white-200 leading-relaxed">
                The first reviewed PR lands within 48 hours of repo access. If
                it doesn&apos;t, that sprint is 25% off — no argument. Your risk
                is highest before I&apos;ve shipped anything, so the guarantee
                sits right there.
              </p>
            </div>
          </div>
          <p className="text-xs text-white-200/60 mt-4 max-w-2xl">
            There is deliberately no blanket &quot;money back if unhappy&quot;
            guarantee. It invites scope disputes and it&apos;s not how a senior
            operator works. These two put my skin in the game where it actually
            matters: speed and security.
          </p>

          <h3 className="text-lg font-semibold mt-10 mb-2">Payment</h3>
          <p className="text-sm text-white-200 leading-relaxed max-w-2xl">
            50% to book the slot, 50% on handoff. A Pilot Sprint can be paid
            100% up front given the small ticket. Running multiple sprints?
            That&apos;s the retainer, below.
          </p>

          <div className="mt-8">
            <MagicButton
              title="Book a scoping call"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
