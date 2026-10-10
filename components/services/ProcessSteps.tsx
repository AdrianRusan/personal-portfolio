import Link from "next/link";

interface ProcessStep {
  tag: string;
  heading: string;
  body: string;
  // Optional trailing in-depth link, rendered after the body text.
  link?: { label: string; href: string };
  caption?: string;
  // Highlighted step (the verify layer).
  verify?: boolean;
}

const en = {
  heading: "How the work actually runs",
  intro:
    "Four steps. The scope and price are locked on day 0, so there's no runaway bill — and no PR reaches you without a senior review behind it.",
  steps: [
    {
      tag: "1 · SCOPE",
      heading: "Scope call (day 0)",
      body: "We agree the PR batch, the definition of done for each item, repo access, and your conventions. Fixed scope and fixed price are locked here. This is also the sales conversation — if it's not a fit, you'll know on the call.",
    },
    {
      tag: "2 · SHIP",
      heading: "The agent fleet (days 1–N)",
      body: "Tickets get dispatched to parallel Claude Code agents running in isolated git worktrees, driven by your CLAUDE.md conventions. This is where the volume comes from, and where the 2-3x lives.",
      caption: "~2-3x throughput",
    },
    {
      tag: "3 · VERIFY",
      heading: "Senior adversarial review (continuous)",
      body: "Every agent PR goes through my review layer before it's offered to you. Security first — injection, auth, secrets, access control — then correctness and scope. I assume the agent got it wrong until it's proven right. This is the part that doesn't scale with more agents, and it's the whole reason this service exists.",
      link: {
        label: "Read how the review layer works in depth →",
        href: "/#ship-verify",
      },
      caption: "does not parallelize — one senior human",
      verify: true,
    },
    {
      tag: "4 · HANDOFF",
      heading: "Handoff (final day)",
      body: "You get the reviewed PRs on real branches in your repo, a security findings log for the whole sprint, and a wrap doc covering what shipped and what the agents consistently got wrong in your codebase. You triage and merge.",
    },
  ] as ProcessStep[],
  contract: "Nothing reaches you unreviewed. That's the contract.",
};

export type ProcessStepsCopy = typeof en;

export const ProcessSteps = ({ copy = en }: { copy?: ProcessStepsCopy }) => {
  return (
    <section id="process" className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-4 max-w-2xl leading-relaxed">
          {copy.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-black-300 border border-white/10 rounded-xl overflow-hidden mt-10">
          {copy.steps.map((step) => (
            <div
              key={step.tag}
              className={`p-6 flex flex-col ${
                step.verify
                  ? "bg-black-200/60 border-t-2 md:border-t-0 md:border-l-2 border-purple"
                  : "bg-black-200/30"
              }`}
            >
              <span
                className={`font-mono text-[11px] font-bold tracking-[0.1em] ${
                  step.verify ? "text-purple" : "text-blue-100"
                }`}
              >
                {step.tag}
              </span>
              <h3 className="text-base font-semibold mt-2 mb-2">
                {step.heading}
              </h3>
              <p className="text-sm text-white-200 leading-relaxed flex-1">
                {step.link ? (
                  <>
                    {step.body}{" "}
                    <Link
                      href={step.link.href}
                      className="text-purple hover:underline underline-offset-4"
                    >
                      {step.link.label}
                    </Link>
                  </>
                ) : (
                  step.body
                )}
              </p>
              {step.caption && (
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white-200/75 mt-4">
                  {step.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-white font-medium mt-8 border border-white/10 rounded-xl py-4 bg-black-200/40">
          {copy.contract}
        </p>
      </div>
    </section>
  );
};
