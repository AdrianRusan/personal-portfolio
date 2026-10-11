import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProcessStep {
  tag: string;
  heading: string;
  body: string;
  // Optional trailing in-depth link, rendered after the body text.
  link?: { label: string; href: string };
  // Highlighted step (the review).
  verify?: boolean;
}

const en = {
  heading: "How a sprint works",
  // "No runaway bill" is said here and nowhere else on the page (R2-F11).
  intro:
    "Four steps. Scope and price are fixed on day 0, so there's no runaway bill.",
  steps: [
    {
      tag: "1 · Scope",
      heading: "Scope call (day 0)",
      body: "We agree the PRs, what done means for each, repo access and your conventions. Scope and price are fixed here. If it isn't a fit, you'll know on the call.",
    },
    {
      tag: "2 · Ship",
      heading: "Agents write the code (days 1–N)",
      body: "Each ticket goes to a Claude Code agent in its own git worktree, following your CLAUDE.md. Several run in parallel, which is where the 2–3x comes from.",
    },
    {
      tag: "3 · Review",
      heading: "I review every PR (continuous)",
      body: "Security first (injection, auth, secrets, access control), then correctness and scope. I assume the agent got it wrong until the code shows otherwise. More agents don't speed this step up, which is why I take one client at a time.",
      link: {
        label: "How the review works →",
        href: "/#ship-verify",
      },
      verify: true,
    },
    {
      tag: "4 · Handoff",
      heading: "Handoff (final day)",
      body: "You get the reviewed PRs on real branches in your repo, the security findings for the whole sprint, and a note on what the agents kept getting wrong. You merge.",
    },
  ] as ProcessStep[],
};

export type ProcessStepsCopy = typeof en;

export const ProcessSteps = ({ copy = en }: { copy?: ProcessStepsCopy }) => {
  return (
    <section id="process" className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24">
      <div className="container-section">
        <SectionHeading lead={copy.intro}>{copy.heading}</SectionHeading>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black-300 border border-white/10 rounded-xl overflow-hidden mt-10">
          {copy.steps.map((step) => (
            <li
              key={step.tag}
              className={`p-6 flex flex-col ${
                step.verify
                  ? "bg-black-200/60 border-t-2 md:border-t-0 md:border-l-2 border-purple"
                  : "bg-black-200/30"
              }`}
            >
              <span
                className={`text-xs font-medium ${
                  step.verify ? "text-purple" : "text-blue-100"
                }`}
              >
                {step.tag}
              </span>
              <h3 className="text-base font-semibold mt-2 mb-2">
                {step.heading}
              </h3>
              <p className="text-sm text-white-200 leading-relaxed flex-1">
                {step.body}
                {step.link && (
                  <>
                    {" "}
                    <Link
                      href={step.link.href}
                      className="text-purple underline underline-offset-4"
                    >
                      {step.link.label}
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as processStepsCopy };
