import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
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
      className="px-5 sm:px-10 pt-24 pb-12 md:pb-16 scroll-mt-24"
    >
      <div className="container-prose text-center">
        <h2
          id="services-final-cta"
          className="text-3xl md:text-4xl font-bold tracking-tight text-balance"
        >
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-4 max-w-xl mx-auto text-pretty">
          {copy.body}
        </p>
        <div className="flex justify-center mt-8">
          <MagicButton
            title={copy.cta}
            href={CALENDLY_URL}
            otherClasses="md:mt-0"
            trackEvent={{
              event: "calendly_click",
              props: { source: copy.ctaSource },
            }}
          />
        </div>
        <p className="mt-5 text-sm">
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
