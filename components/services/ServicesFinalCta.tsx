import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";

// The page's one closing ask (PageShell's shared one is off on /services).
const en = {
  heading: "Tell me the backlog. I'll tell you the number.",
  body: "A 30-minute call. You'll leave with a scope and a fixed price.",
  cta: "Book a scoping call",
  ctaSource: "services_final_cta",
  emailBefore: "or email",
};

export type ServicesFinalCtaCopy = typeof en;

export const ServicesFinalCta = ({
  copy = en,
}: {
  copy?: ServicesFinalCtaCopy;
}) => {
  return (
    // id="contact": the /services sub-nav's "Contact" anchor.
    <section
      id="contact"
      aria-labelledby="services-final-cta"
      className="px-5 sm:px-10 pt-24 pb-12 md:pb-20 scroll-mt-24"
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
        <p className="mt-5 text-sm text-white-200">
          {copy.emailBefore}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium underline underline-offset-4 hover:text-purple transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
};
