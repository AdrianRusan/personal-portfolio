import Link from "next/link";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { CALENDLY_URL } from "@/data";
import { ClosingBand } from "@/components/ClosingBand";

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
    <ClosingBand
      id="services-final-cta"
      heading={copy.heading}
      body={copy.body}
    >
      <div className="flex mt-8">
        <PrimaryCta
          title={copy.cta}
          href={CALENDLY_URL}
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
    </ClosingBand>
  );
};
