import Link from "next/link";
import { SAMPLE_REPORT_URL, shipVerify } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";

const en = {
  heading: "Your backlog is growing and agent code needs review",
  body: "Agents can write most of a backlog. They also write injection bugs. On my own 30-PR run, with no tests and no CI, review was the only gate.",
  punch: "Agents without review ship bugs faster.",
  stepsHeading: "How it works: agents ship, I review",
  steps: shipVerify,
  multiplierLink: "Here's what the agents get wrong →",
  sampleLink: "See a sample report →",
};
export type ShipVerifyCopy = typeof en;

const ShipVerify = ({ copy = en }: { copy?: ShipVerifyCopy }) => {
  return (
    <section id="ship-verify" className="section border-t border-ink/15">
      <div className="container-wide">
        <SectionHeading
          lead={
            <>
              {copy.body}{" "}
              <strong className="font-semibold text-ink">{copy.punch}</strong>
            </>
          }
        >
          {copy.heading}
        </SectionHeading>

        <h3 className="eyebrow mt-14 mb-4">
          {copy.stepsHeading}
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-2 border-t border-ink">
          {copy.steps.map((step, i) => (
            <li key={step.tag} className="border-b border-ink/15 py-6 md:py-8 md:pr-12">
              <p className="eyebrow">
                <span className="num">{i + 1}</span> · {step.label}
              </p>
              <h4 className="type-subsection mt-3">{step.heading}</h4>
              <p className="text-body leading-relaxed mt-3 measure">
                {step.body}
              </p>
              {/* C64: show what the verify step produces (ADI-6). */}
              {step.tag === "VERIFY" && SAMPLE_REPORT_URL && (
                <a
                  href={SAMPLE_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-accent underline underline-offset-4 hover:text-ink transition-colors"
                >
                  {copy.sampleLink}
                </a>
              )}
            </li>
          ))}
        </ol>
        <p className="text-sm text-body mt-4">
          <Link
            href="/blog/what-agents-get-wrong"
            className="font-medium text-accent underline underline-offset-4 hover:text-ink transition-colors whitespace-nowrap"
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
