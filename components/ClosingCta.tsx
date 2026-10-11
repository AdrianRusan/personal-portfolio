import Link from "next/link";
import type { ReactNode } from "react";
import MagicButton from "./ui/MagicButton";
import EmailCapture, { type EmailCaptureCopy } from "./EmailCapture";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";

// The one closing ask (P1). PageShell renders it on every page; pages with
// their own closing block pass hideFooterCta. U+2011 keeps "30‑minute" whole.
const en = {
  heading: "Have a backlog? Book a 30‑minute scoping call.",
  body: "Tell me what you want built or shipped. You'll leave knowing which offer fits and what it costs.",
  button: "Book a scoping call",
  emailBefore: "or email",
  teardown: "Or send a repo for a free 15-minute teardown →",
  emailCapture: undefined as EmailCaptureCopy | undefined,
};
export type ClosingCtaCopy = typeof en;

export function ClosingCta({
  copy = en,
  secondary,
  source = "footer",
  hideCta = false,
  hideEmailCapture = false,
}: {
  copy?: ClosingCtaCopy;
  // One extra line under the links, e.g. the home page's "Somewhere in between?".
  secondary?: ReactNode;
  source?: string;
  hideCta?: boolean;
  hideEmailCapture?: boolean;
}) {
  if (hideCta && hideEmailCapture) return null;
  return (
    <section
      className="px-5 sm:px-10 pt-24 pb-20"
      {...(hideCta
        ? { "aria-label": copy.emailCapture?.heading ?? "Checklist" }
        : { "aria-labelledby": "closing-cta-heading" })}
    >
      {!hideCta && (
        <div className="container-prose text-center">
          <h2
            id="closing-cta-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-balance"
          >
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white-200 text-pretty">{copy.body}</p>
          <div className="mt-8 flex justify-center">
            <MagicButton
              title={copy.button}
              href={CALENDLY_URL}
              otherClasses="md:mt-0"
              trackEvent={{ event: "calendly_click", props: { source } }}
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
          <p className="mt-3 text-sm">
            <Link
              href="/teardown"
              className="font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
            >
              {copy.teardown}
            </Link>
          </p>
          {secondary && (
            <p className="mt-6 text-sm text-white-200 text-pretty">
              {secondary}
            </p>
          )}
        </div>
      )}
      {!hideEmailCapture && (
        <EmailCapture
          variant="footer"
          className={hideCta ? "mx-auto" : "mx-auto mt-16"}
          copy={copy.emailCapture}
        />
      )}
    </section>
  );
}

export { en as closingCtaCopy };
