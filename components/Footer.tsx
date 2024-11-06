import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";
import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import SpotlightBackground from "./ui/SpotlightBackground";

const Footer = () => {
  return (
    <footer className="h-[100vh] " id="contact">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>
      
      <div className="h-full flex flex-col justify-between items-between relative z-10 pb-20 lg:pb-10">
        <div />
        <div className="flex flex-col gap-5 md:gap-0 items-center mb-10">
          <h2 className="heading lg:max-w-[45vw]">
            Ready to take <span className="text-purple">your</span> digital
            presence to the next level?
          </h2>
          <p className="text-white-200 md:mt-10 my-5 text-center">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
          <a href="mailto:rusan.adrian.ionut@gmail.com" target="_blank">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
        <div className="flex gap-5 md:gap-0 md:flex-row flex-col justify-around items-center z-10">
          <div className="flex items-center md:gap-3 gap-6">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © 2024 Adrian Rusan
            </p>
          </div>

          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((info) => (
              <Link href={info.link} aria-label={`Visit Adrian Rusan's ${info.alt} Profile`} key={info.id} className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
                <Image src={info.img} alt={`${info.alt} icon`} width={20} height={20} title={`${info.alt} icon`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;