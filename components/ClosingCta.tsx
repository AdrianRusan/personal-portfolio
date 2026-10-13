import Link from "next/link";
import PrimaryCta from "./ui/PrimaryCta";
import EmailCapture from "./EmailCapture";
import { CALENDLY_URL } from "@/data";

// The one closing ask (P1). PageShell renders it on every page; pages with
// their own closing block pass hideFooterCta. U+2011 keeps "30‑minute" whole.
// A1 F3 / D6: one button plus the teardown fallback. The email address lives
// in the footer and on /contact; the checklist capture only on the blog.
const en = {
  heading: "Have a backlog? Book a 30‑minute scoping call.",
  body: "Tell me what you want built or shipped. You'll leave knowing which offer fits and what it costs.",
  button: "Book a scoping call",
  teardown: "Or send a repo for a free 15-minute teardown →",
};
export type ClosingCtaCopy = typeof en;

export function ClosingCta({
  copy = en,
  source = "footer",
  hideCta = false,
  hideEmailCapture = false,
}: {
  copy?: ClosingCtaCopy;
  source?: string;
  hideCta?: boolean;
  hideEmailCapture?: boolean;
}) {
  if (hideCta && hideEmailCapture) return null;
  return (
    <section
      className="px-5 sm:px-10 lg:px-12 pt-20 pb-20 md:pt-28 border-t border-white/15 bg-chip/50"
      {...(hideCta ? {} : { "aria-labelledby": "closing-cta-heading" })}
    >
      {!hideCta && (
        <div className="container-wide">
          <h2
            id="closing-cta-heading"
            className="display max-w-[14em] text-4xl md:text-6xl xl:text-7xl text-balance"
          >
            {copy.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white-200 text-pretty">{copy.body}</p>
          <div className="mt-8 flex">
            <PrimaryCta
              title={copy.button}
              href={CALENDLY_URL}
              otherClasses="md:mt-0"
              trackEvent={{ event: "calendly_click", props: { source } }}
            />
          </div>
          <p className="mt-5">
            <Link
              href="/teardown"
              className="font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
            >
              {copy.teardown}
            </Link>
          </p>
        </div>
      )}
      {!hideEmailCapture && (
        <div className="container-wide">
          <EmailCapture variant="footer" className={hideCta ? "" : "mt-16"} />
        </div>
      )}
    </section>
  );
}

export { en as closingCtaCopy };
