import Link from "next/link";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { CALENDLY_URL } from "@/data";

// The page's one closing ask (PageShell's shared one is off on /services).
// A1 F3: the button plus the teardown fallback; the email is in the footer.
const en = {
  heading: "Tell me the backlog. I'll tell you the number.",
  body: "A 30-minute call. You'll leave with a scope and a fixed price.",
  cta: "Book a scoping call",
  ctaSource: "services_final_cta",
  teardown: "Or send a repo for a free 15-minute teardown →",
};

export type ServicesFinalCtaCopy = typeof en;

export const ServicesFinalCta = ({
  copy = en,
}: {
  copy?: ServicesFinalCtaCopy;
}) => {
  return (
    <section
      aria-labelledby="services-final-cta"
      className="px-5 sm:px-10 lg:px-12 pt-20 pb-20 md:pt-28 scroll-mt-24 border-t border-white/15 bg-chip/50"
    >
      {/* #114 M: the same closing band as ClosingCta. */}
      <div className="container-wide">
        <h2
          id="services-final-cta"
          className="display max-w-[14em] text-4xl md:text-6xl xl:text-7xl text-balance"
        >
          {copy.heading}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white-200 text-pretty">
          {copy.body}
        </p>
        <div className="flex mt-8">
          <PrimaryCta
            title={copy.cta}
            href={CALENDLY_URL}
            otherClasses="md:mt-0"
            trackEvent={{
              event: "calendly_click",
              props: { source: copy.ctaSource },
            }}
          />
        </div>
        <p className="mt-5">
          <Link
            href="/teardown"
            className="inline-flex min-h-11 items-center font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
          >
            {copy.teardown}
          </Link>
        </p>
      </div>
    </section>
  );
};
