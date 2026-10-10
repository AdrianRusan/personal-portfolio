import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const en = {
  heading: "Tell me the backlog. I'll tell you the number.",
  body: 'A 30-minute call to shape the scope and fix the price. No obligation, and no "100x" — just the honest version of what an agent fleet plus a senior reviewer can ship for you.',
  proof:
    "30 reviewed PRs in 2.5 days. 3 shell-injection bugs caught that the tests passed. That's the job.",
  cta: "Book a scoping call",
  ctaSource: "services_final_cta",
  workLink: "See the 30-PR sprint in full →",
  workHref: "/#work",
};

export type ServicesFinalCtaCopy = typeof en;

export const ServicesFinalCta = ({
  copy = en,
}: {
  copy?: ServicesFinalCtaCopy;
}) => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-10 md:p-16 text-center">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-4 max-w-2xl mx-auto">{copy.body}</p>
        <p className="font-mono text-sm text-purple mt-6">{copy.proof}</p>
        <div className="flex justify-center mt-8">
          <MagicButton
            title={copy.cta}
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: copy.ctaSource },
            }}
          />
        </div>
        <Link
          href={copy.workHref}
          className="inline-block text-sm font-medium text-blue-100 hover:text-purple transition-colors mt-6"
        >
          {copy.workLink}
        </Link>
      </div>
    </section>
  );
};
