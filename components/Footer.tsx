import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="min-h-screen relative" id="contact" aria-labelledby="contact-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>
      
      <div className="flex flex-col justify-center items-center relative z-10 py-20 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        {/* Contact Form Section */}
        <section className="w-full max-w-7xl mx-auto mb-20 md:mb-32">
          <ContactForm />
        </section>
        
        {/* Footer Links */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10 pt-10 border-t border-white/10">
            <div className="flex items-center md:gap-3 gap-6">
              <p className="md:text-base text-sm md:font-normal font-light">
                Copyright © 2024 Adrian Rusan
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
      </div>
    </footer>
  );
};

export default Footer;