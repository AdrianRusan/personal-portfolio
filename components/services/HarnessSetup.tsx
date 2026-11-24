import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { HARNESS_GUARANTEE_DAYS } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaSecondary } from "@/components/ui/button";
import { getPosts } from "@/lib/blog";
import { Fold } from "./Fold";

const RULES_POST = "the-rules-file-my-agents-follow";

const en = {
  heading: "Agent Fleet Setup: my agent setup, in your repo",
  intro:
    "I install the harness I run in your repo, tuned to your stack and conventions, so your own team can run agents with the review gates already in place.",
  deliveredHeading: "What you get",
  deliverables: [
    "A working Claude Code setup on your repo: project rules in CLAUDE.md, one worktree per agent, and CI wiring.",
    "The gates I run on my own work: a PR can't be opened until typecheck, lint, build and tests pass, and a commit with a secret in it is refused.",
    "My security review checklist, the one that caught 3 shell-injection paths on my own 30-PR run, adapted to your stack.",
    "A hands-on session: I run a live batch on your backlog with your team, then your team runs the next one while I review.",
    "A written playbook: how to hand out tickets, what to review first, and where a human check is required.",
    "2 weeks of async support after handover.",
  ],
  rulesLink: "See the rules file my agents follow →",
  startsAt: "From",
  price: "€4,000",
  pricingBody:
    "One repo: agent setup, CI security gates, review checklist, playbook and support. More repos, extra workshops or pairing raise the scope, and we fix the price on the call before any work starts.",
  cta: "Book a scoping call",
  termsHeading: "Terms",
  terms: [
    "Setup and handover only. For ongoing delivery, see the sprint or the retainer.",
    "Your team takes part in the sessions, because the goal is that they can run it without me.",
    "Claude Code licences and other tool seats are yours to bring.",
    "I don't keep access after handover unless you add a retainer.",
  ],
  guaranteeHeading: "Guarantee",
  guaranteeLead: "Working setup.",
  guaranteeBody:
    `By the end, your team has shipped at least one reviewed PR through the setup themselves, with me present. If they haven't, the sessions continue free until they have, within ${HARNESS_GUARANTEE_DAYS} days of handoff.`,
};

export type HarnessSetupCopy = typeof en;
export { en as harnessSetupCopy };

export const HarnessSetup = async ({
  copy = en,
}: {
  copy?: HarnessSetupCopy;
}) => {
  // The post is scheduled; link it only once it's live (checked at build).
  const rulesLive = (await getPosts()).some((p) => p.slug === RULES_POST);
  return (
    <section
      id="harness"
      className="section-compact"
    >
      <div className="container-wide">
        <SectionHeading lead={copy.intro}>{copy.heading}</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 border-t border-ink/15 pt-8">
          <div>
            <h3 className="type-label">{copy.deliveredHeading}</h3>
            <ul className="flex flex-col gap-3 mt-4 list-disc pl-5 marker:text-accent">
              {copy.deliverables.map((item) => (
                <li
                  key={item}
                  className="text-sm text-body leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
            {rulesLive && (
              <Link
                href={`/blog/${RULES_POST}`}
                className="inline-block mt-4 text-sm font-medium text-accent underline underline-offset-4 hover:text-ink transition-colors"
              >
                {copy.rulesLink}
              </Link>
            )}
          </div>
          <div className="rounded-xl border border-ink/15 bg-raised p-6 md:p-8 self-start">
            <p className="text-sm text-body/80">{copy.startsAt}</p>
            <p className="tabular-nums text-3xl md:text-4xl type-light text-ink mt-1">
              {copy.price}
            </p>
            <p className="text-sm text-body mt-4 leading-relaxed text-pretty">
              {copy.pricingBody}
            </p>
            <p className="text-sm text-body mt-4 leading-relaxed text-pretty">
              <span className="font-semibold text-ink">
                {copy.guaranteeHeading}: {copy.guaranteeLead}
              </span>{" "}
              {copy.guaranteeBody}
            </p>
            <div className="mt-6">
              <BookingLink source="harness_top" className={ctaSecondary}>
                {copy.cta}
              </BookingLink>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Fold title={copy.termsHeading}>
            <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-body/40">
              {copy.terms.map((item) => (
                <li
                  key={item}
                  className="text-sm text-body/80 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Fold>
        </div>
      </div>
    </section>
  );
};
