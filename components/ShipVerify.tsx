import { shipVerify } from "@/data";

const ShipVerify = () => {
  return (
    <section id="ship-verify" className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        {/* The problem */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
            You have the backlog. You don&apos;t have the headcount. And
            you&apos;ve seen what unsupervised agents ship.
          </h2>
          <p className="text-white-200 mt-5 leading-relaxed">
            You&apos;re months behind on a roadmap you can&apos;t hire your way
            out of fast enough. The AI-agent pitch is tempting — everyone&apos;s
            promising 10x, 100x, a team-in-a-box. But you&apos;ve read the code
            agents write. You know it goes green on tests and still carries a
            confident vulnerability into your payment flow. And you&apos;re the
            name on the incident report if it does.
          </p>
          <p className="text-white mt-4 font-medium">
            Speed without review isn&apos;t velocity. It&apos;s a liability with
            a shorter fuse.
          </p>
        </div>

        {/* The two-step */}
        <h3 className="text-xl md:text-2xl font-bold mt-16 mb-6 text-balance">
          The whole thing is two steps. Most vendors only sell you the first.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {shipVerify.map((step) => (
            <div
              key={step.tag}
              className={`p-6 md:p-8 ${step.tag === "VERIFY" ? "bg-black-200/60 border-l-2 border-purple" : "bg-black-200/30"}`}
            >
              <span
                className={`font-mono text-xs font-bold tracking-[0.14em] ${step.tag === "VERIFY" ? "text-purple" : "text-blue-100"}`}
              >
                {step.tag}
              </span>
              <h4 className="text-lg font-semibold mt-2 mb-2">
                {step.heading}
              </h4>
              <p className="text-sm text-white-200 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-white-200/80 mt-4">
          Speed you can buy anywhere now. The verify layer is the part
          that&apos;s rare — and the part that&apos;s accountable.
        </p>
      </div>
    </section>
  );
};

export default ShipVerify;
