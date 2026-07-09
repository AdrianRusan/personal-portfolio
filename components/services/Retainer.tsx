import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";
import { PricingTable } from "./PricingTable";
import type { PricingColumn, PricingRow } from "./PricingTable";

const deliverables = [
  "A committed monthly PR throughput band, all adversarially reviewed — the same ship/verify pipeline as the sprint, on a continuous cadence.",
  'A rolling security findings log and a monthly "what the agents got wrong in your codebase" report.',
  "Standing async access to me for delivery and review questions.",
  "Priority booking over one-off sprints — retainer clients hold a permanent verify slot.",
];

const terms = [
  "Throughput is a band, not unlimited. Overflow rolls to the next month or a top-up sprint.",
  "Not 24/7 on-call incident response — that can be added as a named line item, priced separately.",
  "Month-to-month after an initial 3-month commitment. Cancel anytime after that with 30 days' notice. Long enough to prove it works, short enough to be honest. No lock-in beyond the proof period.",
];

const columns: PricingColumn[] = [
  { name: "Steady" },
  { name: "Core", badge: "Recommended", featured: true },
  { name: "Embedded" },
];

const rows: PricingRow[] = [
  {
    label: "Roughly",
    values: [
      "~6–8 reviewed PRs/mo",
      "~12–15 reviewed PRs/mo",
      "~20+ reviewed PRs/mo, dedicated",
    ],
  },
  {
    label: "Price",
    values: ["from €7,000/mo", "from €12,000/mo", "from €22,000/mo — 1 slot"],
  },
];

export const Retainer = () => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          Ongoing capacity
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          AI-Native Delivery Retainer
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          Senior AI-native delivery, every month: a committed flow of
          security-reviewed PRs for teams who&apos;ve stopped asking whether
          agents are fast and now want them running continuously and safely.
        </p>

        <h3 className="text-lg font-semibold mt-10 mb-4">
          What&apos;s delivered, monthly
        </h3>
        <ul className="flex flex-col gap-3">
          {deliverables.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-white-200 leading-relaxed"
            >
              <span className="text-purple flex-none">+</span>
              {item}
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

        <h3 className="text-lg font-semibold mt-10 mb-4">Terms</h3>
        <ul className="flex flex-col gap-3">
          {terms.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-white-200/80 leading-relaxed"
            >
              <span className="text-white-200/40 flex-none">−</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <MagicButton
            title="Book a scoping call"
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
          />
        </div>
      </div>
    </section>
  );
};
