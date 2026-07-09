import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";
import { PricingTable } from "./PricingTable";
import type { PricingColumn, PricingRow } from "./PricingTable";

const deliverables = [
  "A working Claude Code agent harness configured against your repo: CLAUDE.md project rules, the worktree and dispatch workflow, and CI wiring.",
  "The adversarial security review checklist I use — the artifact that caught 3 real shell-injection vulnerabilities that passed automated tests — adapted to your stack and handed over as yours to keep.",
  "A hands-on working session (or short series): I run a live batch against your backlog with your team watching, then your team runs the next batch with me reviewing.",
  "A written playbook: how to dispatch, what to review first, the failure modes to expect in your codebase, and where the human verify layer is non-negotiable.",
  "2 weeks of async follow-up support after handover as your team adopts it.",
];

const terms = [
  "This is setup and enablement, not ongoing delivery. Want delivery too? That's the sprint or the retainer.",
  "Requires your team present and participating — this is assistive by design, not done-for-you. Said plainly so expectations match.",
  "Doesn't include Claude Code licenses or third-party tool seats — you bring your own accounts.",
  "The harness is configured and handed over; I don't retain access unless you add a retainer.",
];

const columns: PricingColumn[] = [
  { name: "Install" },
  { name: "Install + Enablement", badge: "Recommended", featured: true },
  { name: "Fleet Rollout" },
];

const rows: PricingRow[] = [
  {
    label: "Scope",
    values: [
      "One repo: agent fleet config, CI security gates, review rubric + runbook. ~1 week.",
      "Everything in Install, plus 2–3 workshops, tuned review rubrics, methodology transfer, 30 days support. ~2 weeks.",
      "Multi-repo / org-wide standards, embedded pairing, security-gate policy across services, advisory handoff.",
    ],
  },
  {
    label: "Price",
    values: [
      "from €9,000",
      "from €18,000",
      "from €30,000 — scoped after assessment",
    ],
  },
];

export const HarnessSetup = () => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          Teach your team to fish
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          Set Up Your Agent Harness
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          I install and harden the exact ship/verify agent harness I run — in
          your repo, tuned to your stack and conventions — so your own team can
          ship at agent speed with the safety rails already in place.
        </p>

        <h3 className="text-lg font-semibold mt-10 mb-4">
          Exactly what&apos;s delivered
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

        <h3 className="text-lg font-semibold mt-10 mb-2">Guarantee</h3>
        <p className="text-sm text-white-200 leading-relaxed max-w-2xl">
          <span className="text-purple font-medium">
            Working-harness guarantee.
          </span>{" "}
          By the end of the engagement, your team has shipped at least one
          reviewed PR through the harness themselves — live, with me present. If
          they haven&apos;t, the enablement sessions continue at no extra charge
          until they have. The outcome is &quot;your team did it,&quot; not
          &quot;your team watched it done.&quot;
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
    </section>
  );
};
