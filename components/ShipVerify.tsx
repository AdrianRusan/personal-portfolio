import { SAMPLE_REPORT_URL, shipVerify } from "@/data";

const en = {
  heading:
    "You have the backlog. You don't have the headcount. And you've seen what unsupervised agents ship.",
  body: "You're months behind on a roadmap you can't hire your way out of fast enough. The AI-agent pitch is tempting — everyone's promising 10x, 100x, a team-in-a-box. But you've read the code agents write. You know it goes green on tests and still carries a confident vulnerability into your payment flow. And you're the name on the incident report if it does.",
  punch:
    "Speed without review isn't velocity. It's a liability with a shorter fuse.",
  stepsHeading:
    "The whole thing is two steps. Most vendors only sell you the first.",
  steps: shipVerify,
  footnote:
    "Speed you can buy anywhere now. The verify layer is the part that's rare — and the part that's accountable.",
  sampleLink: "See a sample report →",
};
export type ShipVerifyCopy = typeof en;

const ShipVerify = ({ copy = en }: { copy?: ShipVerifyCopy }) => {
  return (
    <section id="ship-verify" className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        {/* The problem */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
            {copy.heading}
          </h2>
          <p className="text-white-200 mt-5 leading-relaxed">
            {copy.body}
          </p>
          <p className="text-white mt-4 font-medium">
            {copy.punch}
          </p>
        </div>

        {/* The two-step */}
        <h3 className="text-xl md:text-2xl font-bold mt-16 mb-6 text-balance">
          {copy.stepsHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black-300 border border-white/10 rounded-xl overflow-hidden">
          {copy.steps.map((step) => (
            <div
              key={step.tag}
              className={`p-6 md:p-8 ${step.tag === "VERIFY" ? "bg-black-200/60 border-l-2 border-purple" : "bg-black-200/30"}`}
            >
              <span
                className={`font-mono text-xs font-bold tracking-[0.14em] ${step.tag === "VERIFY" ? "text-purple" : "text-blue-100"}`}
              >
                {step.label}
              </span>
              <h4 className="text-lg font-semibold mt-2 mb-2">
                {step.heading}
              </h4>
              <p className="text-sm text-white-200 leading-relaxed">
                {step.body}
              </p>
              {/* C64: show what the verify step produces (ADI-6). */}
              {step.tag === "VERIFY" && SAMPLE_REPORT_URL && (
                <a
                  href={SAMPLE_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-purple underline underline-offset-4 hover:text-white transition-colors"
                >
                  {copy.sampleLink}
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-white-200/80 mt-4">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
};

export default ShipVerify;
