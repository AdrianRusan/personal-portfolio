import {
  FaGithub,
  FaLinkedin,
  FaLocationArrow,
  FaXTwitter,
} from "react-icons/fa6";

import { socialMedia, CALENDLY_URL, CONTACT_EMAIL } from "@/data";
import MagicButton from "./ui/MagicButton";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import EmailCapture, { type EmailCaptureCopy } from "./EmailCapture";
import { LocaleSwitch } from "@/components/LocaleSwitch";

// Keyed by socialMedia[].id in data/index.ts (1 GitHub, 2 X, 3 LinkedIn).
const socialIcons: Record<number, typeof FaGithub> = {
  1: FaGithub,
  2: FaXTwitter,
  3: FaLinkedin,
};

// One generic CTA on every page (D9). PageShell's hideFooterCta/hideEmailCapture
// turn it off where a page has its own (e.g. /teardown hides both).
const en = {
  heading: "Want this on your codebase? Book a 30-minute scoping call.",
  body: "Tell me what you want built or shipped. You'll leave knowing which offer fits, what it covers and what it costs. No obligation.",
  button: "Book a scoping call",
  emailAria: "Send email to Adrian Rusan",
  email: "or email me",
  teardown: "Or send a repo for a free 15-minute teardown →",
  privacy: "Privacy",
  rss: "RSS",
  socialAria: "Social media links",
  // Per-id link labels (socialMedia in data/index.ts); EN falls back to its alt.
  socialLabels: {} as Record<number, string>,
  emailCapture: undefined as EmailCaptureCopy | undefined,
};
export type FooterCopy = typeof en;

const Footer = ({
  copy = en,
  hideCta = false,
  hideEmailCapture = false,
}: {
  copy?: FooterCopy;
  hideCta?: boolean;
  hideEmailCapture?: boolean;
}) => {
  return (
    <footer
      className="relative overflow-hidden"
      id="contact"
      {...(hideCta ? {} : { "aria-labelledby": "contact-heading" })}
    >
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="flex flex-col justify-between items-between relative z-10 pb-20 lg:pb-10">
        <div />
        <section className="flex flex-col gap-5 md:gap-0 items-center mb-10 px-5">
          {!hideCta && (
            <>
              <h2 id="contact-heading" className="heading lg:max-w-[45vw]">
                {copy.heading}
              </h2>
              <p className="text-white-200 md:mt-10 my-5 text-center">
                {copy.body}
              </p>
              <MagicButton
                title={copy.button}
                icon={<FaLocationArrow />}
                position="right"
                href={CALENDLY_URL}
                trackEvent={{
                  event: "calendly_click",
                  props: { source: "footer" },
                }}
              />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={copy.emailAria}
                className="text-xs text-white-200/75 hover:text-white-200 transition-colors mt-4"
              >
                {copy.email}
              </a>
              <Link
                href="/teardown"
                className="text-sm font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors mt-4"
              >
                {copy.teardown}
              </Link>
            </>
          )}
          {!hideEmailCapture && (
            <EmailCapture
              variant="footer"
              className="mt-8 w-full p-4 md:p-5"
              copy={copy.emailCapture}
            />
          )}
        </section>
        <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:gap-x-3 px-5">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © {new Date().getFullYear()} Adrian Rusan
            </p>
            <LocaleSwitch className="text-sm text-white-200 hover:text-purple transition-colors" />
            <Link
              href="/privacy"
              className="text-sm text-white-200 hover:text-purple transition-colors"
            >
              {copy.privacy}
            </Link>
            <a
              href="/feed.xml"
              className="text-sm text-white-200 hover:text-purple transition-colors"
            >
              {copy.rss}
            </a>
          </div>

          <nav
            className="flex items-center md:gap-3 gap-6"
            aria-label={copy.socialAria}
          >
            {socialMedia.map((info) => {
              const Icon = socialIcons[info.id];
              return (
                <Link
                  href={info.url}
                  aria-label={copy.socialLabels[info.id] ?? info.alt}
                  key={info.id}
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icon && <Icon size={20} aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
