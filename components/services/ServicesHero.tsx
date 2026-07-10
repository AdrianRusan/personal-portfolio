import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, GUARANTEE } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const proofItems = [
  "30 reviewed PRs · 9 agent batches · 2.5 days",
  "3 shell-injection vulnerabilities caught that passed the tests",
  "10+ years in production",
];

export const ServicesHero = () => {
  return (
    <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          Your backlog, shipped at agent speed — every PR security-reviewed
          before you see it
        </h1>
        <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
          This is fixed-scope, fixed-price delivery, not a timesheet. You agree
          the batch of pull requests and the number up front. An agent fleet
          writes the volume; I adversarially review every PR for security before
          it reaches you. Nothing reaches you that a senior engineer hasn&apos;t
          personally checked.
        </p>
        <p className="inline-block text-center font-mono text-xs md:text-sm text-purple mt-5 border-l-2 border-purple pl-3">
          2-3x, not 100x — and here&apos;s what the agents get wrong.
        </p>
        <p className="font-mono text-xs md:text-sm text-white-200/60 mt-3">
          Delivery Sprints start at €7,500 — most land €12–18k, fixed on the
          scope call.
        </p>

        <div className="flex flex-col items-center gap-4 mt-6">
          <MagicButton
            title="Book a scoping call"
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "services_hero" },
            }}
          />
          <a
            href="#process"
            className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
          >
            Not ready to talk? See exactly how the pipeline works ↓
          </a>
          <p className="text-xs text-white-200/70 mt-1">{GUARANTEE}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mt-10 max-w-3xl mx-auto">
          {proofItems.map((item, index) => (
            <span
              key={item}
              className="flex items-center gap-3 font-mono text-[11px] md:text-xs text-white-200/80"
            >
              {index !== 0 && (
                <span className="text-white-200/40" aria-hidden="true">
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </div>
        <p className="text-[11px] md:text-xs text-white-200/50 mt-3 max-w-2xl mx-auto">
          From a build I ran end-to-end on my own repo — the PRs, the review
          notes, and the findings are real, and I&apos;ll walk you through them
          on the call.
        </p>
      </div>
    </section>
  );
};
