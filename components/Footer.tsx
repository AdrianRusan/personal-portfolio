import { socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="min-h-screen py-20" id="contact" aria-labelledby="contact-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="h-full flex flex-col justify-between items-between relative z-10 pb-20 lg:pb-10">
        <div />
        <section className="flex flex-col gap-8 items-center mb-10 px-4">
          <h2 id="contact-heading" className="heading lg:max-w-[45vw]">
            Ready to take <span className="text-purple">your</span> digital
            presence to the next level?
          </h2>
          <p className="text-white-200 my-5 text-center max-w-2xl">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
          <ContactForm />
        </section>
        <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10">
          <div className="flex items-center md:gap-3 gap-6">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © {new Date().getFullYear()} Adrian Rusan
            </p>
          </div>

          <nav className="flex items-center md:gap-3 gap-6" aria-label="Social media links">
            {socialMedia.map((info) => (
              <Link 
                href={info.url} 
                aria-label={info.alt}
                key={info.id} 
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={info.img} alt={`${info.alt} icon`} width={20} height={20} title={`${info.alt} icon`} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;