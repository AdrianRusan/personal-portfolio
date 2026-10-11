import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia, CALENDLY_URL, CONTACT_EMAIL } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import EmailCapture, { type EmailCaptureCopy } from "./EmailCapture";
import { LocaleSwitch } from "@/components/LocaleSwitch";

const en = {
  headingBefore: "Not sure ",
  headingAccent: "which tier",
  headingAfter: " fits? Book a 30-minute scoping call.",
  body: "Tell me what you want built or shipped. You'll leave knowing which offer fits, what it covers and what it costs. No obligation.",
  button: "Book a scoping call",
  emailAria: "Send email to Adrian Rusan",
  email: "or email me",
  socialAria: "Social media links",
  // Per-id link labels (socialMedia in data/index.ts); EN falls back to its alt.
  socialLabels: {} as Record<number, string>,
  emailCapture: undefined as EmailCaptureCopy | undefined,
};
export type FooterCopy = typeof en;

const Footer = ({ copy = en }: { copy?: FooterCopy }) => {
  return (
    <footer className="" id="contact" aria-labelledby="contact-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="flex flex-col justify-between items-between relative z-10 pb-20 lg:pb-10">
        <div />
        <section className="flex flex-col gap-5 md:gap-0 items-center mb-10 px-5">
          <h2 id="contact-heading" className="heading lg:max-w-[45vw]">
            {copy.headingBefore}
            <span className="text-purple">{copy.headingAccent}</span>
            {copy.headingAfter}
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
          <EmailCapture
            variant="footer"
            className="mt-8 w-full p-4 md:p-5"
            copy={copy.emailCapture}
          />
        </section>
        <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10">
          <div className="flex items-center md:gap-3 gap-6">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © {new Date().getFullYear()} Adrian Rusan
            </p>
            <LocaleSwitch className="text-sm text-white-200 hover:text-purple transition-colors" />
          </div>

          <nav
            className="flex items-center md:gap-3 gap-6"
            aria-label={copy.socialAria}
          >
            {socialMedia.map((info) => (
              <Link
                href={info.url}
                aria-label={copy.socialLabels[info.id] ?? info.alt}
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={info.img}
                  alt=""
                  width={20}
                  height={20}
                  title={copy.socialLabels[info.id] ?? info.alt}
                  className="invert dark:invert-0"
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
