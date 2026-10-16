import Link from "next/link";
import PrimaryCta from "./ui/PrimaryCta";
import EmailCapture from "./EmailCapture";
import { ClosingBand } from "./ClosingBand";
import { BOOKING_URL } from "@/data";

// The one closing ask (P1). PageShell renders it on every page; pages with
// their own closing block pass hideFooterCta. U+2011 keeps "30‑minute" whole.
// A1 F3 / D6: one button plus the teardown fallback. The email address lives
// in the footer and on /contact; the checklist capture only on the blog.
const en = {
  heading: "Have a backlog? Book a 30‑minute scoping call.",
  body: "Tell me what you want built or shipped. You get the scope and a fixed price in writing within one working day.",
  button: "Book a scoping call",
  teardown: "Or send a repo for a free 15-minute teardown →",
  teardownHref: "/teardown",
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
  if (hideCta)
    return (
      <section className="gutter py-20 border-t border-ink/15">
        <div className="container-wide">
          <EmailCapture variant="footer" />
        </div>
      </section>
    );
  return (
    <ClosingBand
      id="closing-cta-heading"
      heading={copy.heading}
      body={copy.body}
    >
      <div className="mt-8 flex">
        <PrimaryCta
          title={copy.button}
          href={BOOKING_URL}
          trackEvent={{ event: "calendly_click", props: { source } }}
        />
      </div>
      <p className="mt-5">
        <Link
          href={copy.teardownHref}
          className="inline-flex min-h-11 items-center text-pretty font-medium text-body underline underline-offset-4 hover:text-accent transition-colors"
        >
          {copy.teardown}
        </Link>
      </p>
      {!hideEmailCapture && <EmailCapture variant="footer" className="mt-16 border-t border-ink/15 pt-8" />}
    </ClosingBand>
  );
}

export { en as closingCtaCopy };
