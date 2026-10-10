import { TrackedLink } from "@/components/TrackedLink";
import { callSteps, STRATEGY_CALL_URL } from "@/data";
import { formatPrice, ladder } from "@/data/ladder";

const strategyCall = ladder.find((o) => o.id === "strategy-call")!;

// Lowers the cost of the booking click: shows exactly what the call is and
// what comes after it. No button here; the CTA section that follows owns it.
export const CallSteps = ({ source }: { source: string }) => {
  return (
    <section
      id="call"
      aria-labelledby="call-heading"
      className="px-5 sm:px-10 py-16 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-purple">
          What happens when you book
        </span>
        <h2
          id="call-heading"
          className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance"
        >
          How a call works
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mt-10">
          {callSteps.map((step, index) => (
            <li key={step.heading} className="p-6 bg-black-200/30">
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-blue-100">
                {index + 1}
              </span>
              <h3 className="text-base font-semibold mt-2 mb-2">
                {step.heading}
              </h3>
              <p className="text-sm text-white-200 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-white-200/80 mt-6">
          Only need advice?{" "}
          <TrackedLink
            href={STRATEGY_CALL_URL}
            event="cta_click"
            props={{ cta: "strategy_call", source }}
            className="font-medium text-blue-100 underline-offset-2 hover:underline hover:text-purple transition-colors"
          >
            The {strategyCall.name}: {strategyCall.duration}, 1:1, with a
            written summary, {formatPrice(strategyCall)}.
          </TrackedLink>
        </p>
      </div>
    </section>
  );
};
