import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia, CALENDLY_URL } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import EmailCapture from "./EmailCapture";

const Footer = () => {
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
            Still weighing it? Book a{" "}
            <span className="text-purple">30-minute</span> scoping call.
          </h2>
          <p className="text-white-200 md:mt-10 my-5 text-center">
            You&apos;ll leave with a fixed scope and a fixed price — no
            obligation.
          </p>
          <MagicButton
            title="Book a scoping call"
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
            aria-label="Send email to Adrian Rusan"
            className="text-xs text-white-200/60 hover:text-white-200 transition-colors mt-4"
          >
            or email me
          </a>
          <EmailCapture variant="footer" className="mt-8 w-full p-4 md:p-5" />
        </section>
        <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10">
          <div className="flex items-center md:gap-3 gap-6">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © {new Date().getFullYear()} Adrian Rusan
            </p>
          </div>

          <nav
            className="flex items-center md:gap-3 gap-6"
            aria-label="Social media links"
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
