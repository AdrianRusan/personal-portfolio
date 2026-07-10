import MagicButton from "@/components/ui/MagicButton";
import { CalendlyLink } from "@/components/CalendlyLink";
import { FaLocationArrow } from "react-icons/fa6";

// The primary conversion module: two low-commitment ways in, ordered by
// friction. Free async teardown is the default path (converts cold traffic
// that isn't ready for a call); the scoping call is the warm path. The €1k
// Reviewed PR is surfaced as the middle rung for anyone between the two.
export const StartBand = () => {
  return (
    <section
      id="start"
      aria-label="Ways to start"
      className="px-5 sm:px-10 py-16"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance max-w-3xl">
          Ship the roadmap you can&apos;t hire for — reviewed before it reaches
          you.
        </h2>
        <p className="text-white-200 mt-4 leading-relaxed max-w-2xl">
          Two ways in, both without a commitment. See the work on your own code
          first, or scope a sprint directly.
        </p>

        <div className="grid gap-5 md:grid-cols-2 mt-10">
          {/* Primary — free async, lowest friction */}
          <div className="rounded-2xl border border-purple bg-black-200/60 p-6 md:p-8 flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
              Start free · no call
            </span>
            <h3 className="text-xl font-semibold tracking-tight mt-3">
              Free code teardown
            </h3>
            <p className="text-sm text-white-200 leading-relaxed mt-3 flex-1">
              Send a repo or a recent PR. Get a 15-minute Loom of the security
              bugs your AI coding tools wrote that pass tests and merge anyway.
              No pitch.
            </p>
            <div className="mt-6">
              <MagicButton
                title="Get my free teardown"
                icon={<FaLocationArrow />}
                position="right"
                href="/teardown"
                trackEvent={{
                  event: "cta_click",
                  props: { cta: "teardown", source: "startband" },
                }}
              />
            </div>
          </div>

          {/* Secondary — warm path */}
          <div className="rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-8 flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white-200/70">
              Ready to scope
            </span>
            <h3 className="text-xl font-semibold tracking-tight mt-3">
              Book a scoping call
            </h3>
            <p className="text-sm text-white-200 leading-relaxed mt-3 flex-1">
              Know you want your backlog shipped this way? Book 30 minutes and
              we&apos;ll fix the scope and the price before anything starts.
            </p>
            <div className="mt-6">
              <CalendlyLink
                source="startband_secondary"
                newTab={false}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-purple transition-colors"
              >
                Book a call
                <FaLocationArrow className="text-xs" aria-hidden="true" />
              </CalendlyLink>
            </div>
          </div>
        </div>

        <p className="text-sm text-white-200/80 mt-6 leading-relaxed">
          Somewhere in between?{" "}
          <a
            href="/services#entry-offer"
            className="text-blue-100 hover:text-purple transition-colors font-medium"
          >
            Start with one Reviewed PR — €1,000, ~48h, credited toward a sprint
            →
          </a>
        </p>
      </div>
    </section>
  );
};
