import Link from "next/link";
import { SAMPLE_REPORT_URL, shipVerify } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";

const en = {
  heading: "Your backlog is growing and agent code needs review",
  body: "Agents can write most of a backlog. They also write injection bugs. On my own 30-PR run, with no tests and no CI, review was the only gate.",
  punch: "Agents without review ship bugs faster.",
  stepsHeading: "How it works: agents ship, I review",
  steps: shipVerify,
  // The page's one "2–3x, not 100x" (C-RULES).
  multiplierBefore: "2–3x, not 100x.",
  multiplierLink: "Here's what the agents get wrong →",
  sampleLink: "See a sample report →",
};
export type ShipVerifyCopy = typeof en;

const ShipVerify = ({ copy = en }: { copy?: ShipVerifyCopy }) => {
  return (
    <section id="ship-verify" className="px-5 sm:px-10 py-12 md:py-20">
      <div className="container-section">
        <SectionHeading
          lead={
            <>
              {copy.body}{" "}
              <strong className="font-semibold text-white">{copy.punch}</strong>
            </>
          }
        >
          {copy.heading}
        </SectionHeading>

        <h3 className="text-lg md:text-xl font-semibold tracking-tight mt-12 mb-5">
          {copy.stepsHeading}
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
          {copy.steps.map((step, i) => (
            <li key={step.tag} className="bg-black-100 p-6 md:p-8">
              <p className="eyebrow">
                <span className="num">{i + 1}</span> · {step.label}
              </p>
              <h4 className="text-lg font-semibold mt-2">{step.heading}</h4>
              <p className="text-sm text-white-200 leading-relaxed mt-2">
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
            </li>
          ))}
        </ol>
        <p className="text-sm text-white-200 mt-4">
          {copy.multiplierBefore}{" "}
          <Link
            href="/blog/what-agents-get-wrong"
            className="font-medium text-purple underline underline-offset-4 hover:text-white transition-colors whitespace-nowrap"
          >
            {copy.multiplierLink}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ShipVerify;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as shipVerifyCopy };
