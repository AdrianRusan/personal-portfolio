import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia, CALENDLY_URL } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import EmailCapture, { type EmailCaptureCopy } from "./EmailCapture";
import type { Locale } from "@/lib/locale";

const en = {
  headingBefore: "Not sure ",
  headingAccent: "which tier",
  headingAfter: " fits? Book a 30-minute scoping call.",
  body: "Tell me what you want built or shipped. You'll leave knowing which offer fits, what it covers and what it costs. No obligation.",
  button: "Book a scoping call",
  emailAria: "Send email to Adrian Rusan",
  email: "or email me",
  socialAria: "Social media links",
  emailCapture: undefined as EmailCaptureCopy | undefined,
};
export type FooterCopy = typeof en;

// The language switch always points at the other locale's homepage.
const switchLink = {
  en: { href: "/ro", lang: "ro", label: "Română" },
  ro: { href: "/", lang: "en", label: "English" },
};

const Footer = ({
  copy = en,
  locale = "en",
}: {
  copy?: FooterCopy;
  locale?: Locale;
}) => {
  const other = switchLink[locale];
  return (
    <footer className="" id="contact" aria-labelledby="contact-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="flex flex-col justify-between items-between relative z-10 pb-20 lg:pb-10">
        <div />
        <section className="flex flex-col gap-5 md:gap-0 items-center mb-10">
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
            href="mailto:rusan.adrian.ionut@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.emailAria}
            className="text-xs text-white-200/60 hover:text-white-200 transition-colors mt-4"
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
            <Link
              href={other.href}
              hrefLang={other.lang}
              lang={other.lang}
              className="text-sm text-white-200 hover:text-purple transition-colors"
            >
              {other.label}
            </Link>
          </div>

          <nav
            className="flex items-center md:gap-3 gap-6"
            aria-label={copy.socialAria}
          >
            {socialMedia.map((info) => (
              <Link
                href={info.url}
                aria-label={info.alt}
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={info.img}
                  alt={`${info.alt} icon`}
                  width={20}
                  height={20}
                  title={`${info.alt} icon`}
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
