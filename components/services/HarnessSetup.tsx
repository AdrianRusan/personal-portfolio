import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const en = {
  eyebrow: "Teach your team to fish",
  heading: "Agent Fleet Setup: the harness I run, in your repo",
  intro:
    "I install and harden the exact ship/verify agent harness I run — in your repo, tuned to your stack and conventions — so your own team can ship at agent speed with the safety rails already in place.",
  deliveredHeading: "Exactly what's delivered",
  deliverables: [
    "A working Claude Code agent harness configured against your repo: CLAUDE.md project rules, the worktree and dispatch workflow, and CI wiring.",
    "The adversarial security review checklist I use — the artifact that caught 3 real shell-injection vulnerabilities that passed automated tests — adapted to your stack and handed over as yours to keep.",
    "A hands-on working session (or short series): I run a live batch against your backlog with your team watching, then your team runs the next batch with me reviewing.",
    "A written playbook: how to dispatch, what to review first, the failure modes to expect in your codebase, and where the human verify layer is non-negotiable.",
    "2 weeks of async follow-up support after handover as your team adopts it.",
  ],
  pricingHeading: "Pricing",
  pricingEyebrow: "Agent Fleet Setup",
  price: "Starts at €4,000",
  pricingBody:
    "One repo: agent fleet config, CI security gates, review rubric, handover playbook, and follow-up support. Scope grows with multi-repo rollout, extra workshops, and embedded pairing — scoped and fixed on the call, before any work starts.",
  cta: "Book a scoping call",
  lockedNote:
    "Locked on day 0, no runaway bill — the price is fixed on the scope call, before any work starts.",
  termsHeading: "Terms",
  terms: [
    "This is setup and enablement, not ongoing delivery. Want delivery too? That's the sprint or the retainer.",
    "Requires your team present and participating — this is assistive by design, not done-for-you. Said plainly so expectations match.",
    "Doesn't include Claude Code licenses or third-party tool seats — you bring your own accounts.",
    "The harness is configured and handed over; I don't retain access unless you add a retainer.",
  ],
  guaranteeHeading: "Guarantee",
  guaranteeLead: "Working-harness guarantee.",
  guaranteeBody:
    'By the end of the engagement, your team has shipped at least one reviewed PR through the harness themselves — live, with me present. If they haven\'t, the enablement sessions continue at no extra charge until they have. The outcome is "your team did it," not "your team watched it done."',
};

export type HarnessSetupCopy = typeof en;

export const HarnessSetup = ({ copy = en }: { copy?: HarnessSetupCopy }) => {
  return (
    <section id="harness" className="px-5 sm:px-10 py-20 scroll-mt-24">
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

        <h3 className="text-lg font-semibold mt-10 mb-4">
          {copy.deliveredHeading}
        </h3>
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

        <h3 className="text-lg font-semibold mt-10 mb-4">
          {copy.pricingHeading}
        </h3>
        <div className="rounded-xl border border-white/10 bg-black-200/60 p-6 md:p-8 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
            {copy.pricingEyebrow}
          </span>
          <p className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
            {copy.price}
          </p>
          <p className="text-sm text-white-200/80 mt-3 leading-relaxed">
            {copy.pricingBody}
          </p>
          <div className="mt-6">
            <MagicButton
              title={copy.cta}
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "harness_top" },
              }}
            />
          </div>
        </div>
        <p className="text-xs text-white-200/70 mt-4 italic">
          {copy.lockedNote}
        </p>

        <h3 className="text-lg font-semibold mt-10 mb-4">
          {copy.termsHeading}
        </h3>
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

        <h3 className="text-lg font-semibold mt-10 mb-2">
          {copy.guaranteeHeading}
        </h3>
        <p className="text-sm text-white-200 leading-relaxed max-w-2xl">
          <span className="text-purple font-medium">{copy.guaranteeLead}</span>{" "}
          {copy.guaranteeBody}
        </p>

        <div className="mt-8">
          <MagicButton
            title={copy.cta}
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "harness_bottom" },
            }}
          />
        </div>
      </div>
    </section>
  );
};
