import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const deliverables = [
  "A committed monthly PR throughput band, all adversarially reviewed — the same ship/verify pipeline as the sprint, on a continuous cadence.",
  'A rolling security findings log and a monthly "what the agents got wrong in your codebase" report.',
  "Standing async access to me for delivery and review questions.",
  "Priority booking over one-off sprints — retainer clients hold a permanent verify slot.",
];

const terms = [
  "Throughput is a band, not unlimited. Overflow rolls to the next month or a top-up sprint. The exact band is scoped on the call.",
  "Not 24/7 on-call incident response — that can be added as a named line item, priced separately.",
  "Month-to-month after an initial 3-month commitment. Cancel anytime after that with 30 days' notice. Long enough to prove it works, short enough to be honest. No lock-in beyond the proof period.",
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
        <div className="rounded-xl border border-white/10 bg-black-200/30 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-blue-100 mb-2">
            Starts at
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white">
            €9,000
            <span className="text-base font-normal text-white-200">/mo</span>
          </p>
          <p className="text-sm text-white-200 mt-4 leading-relaxed max-w-2xl">
            A permanently reserved senior-review slot and a committed monthly
            band of reviewed PRs, on the same ship/verify pipeline as the
            sprint. The exact band and per-PR rate are scoped on the call,
            against your repo and cadence — a 3-month initial commitment.
          </p>
          <p className="text-sm text-white-200/80 mt-3 leading-relaxed max-w-2xl">
            The per-PR rate lands roughly 20–30% below the one-off Sprint rate —
            that&apos;s what the monthly commitment buys you. No published rate
            card; specifics are scoped on the call.
          </p>
          <div className="mt-6">
            <Link
              href={CALENDLY_URL}
              aria-label="Book a scoping call"
              {...(CALENDLY_URL.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="inline-flex items-center rounded-lg border border-purple/40 px-4 py-2 text-xs font-medium text-purple hover:bg-purple/10 transition-colors">
                Book a scoping call
              </span>
            </Link>
          </div>
        </div>
        <p className="text-xs text-white-200/70 mt-4 italic">
          Your monthly band is locked on day 0, no runaway bill — overflow rolls
          forward instead of surprise invoicing.
        </p>

        <h3 className="text-lg font-semibold mt-10 mb-4">The guarantees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-white/10 bg-black-200/30 p-5">
            <p className="font-mono text-xs text-purple mb-2">
              1. Security guarantee
            </p>
            <p className="text-sm text-white-200 leading-relaxed">
              Every delivered PR passes a documented adversarial security review
              before you see it. If a vulnerability that was in scope of that
              review is later found in a PR I marked reviewed, I fix it free and
              re-review the surrounding batch at no charge.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black-200/30 p-5">
            <p className="font-mono text-xs text-purple mb-2">
              2. Proof-month guarantee
            </p>
            <p className="text-sm text-white-200 leading-relaxed">
              Month 1 is the trial: we agree the reviewed-PR cadence up front,
              and if it isn&apos;t hit, you cancel at the end of month 1 with no
              further commitment. You confirm the retainer is working before
              you&apos;re locked into the full 3 months.
            </p>
          </div>
        </div>

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
