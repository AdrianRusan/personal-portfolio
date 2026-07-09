import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import MagicButton from "./ui/MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow } from "react-icons/fa6";
import SpotlightBackground from "./ui/SpotlightBackground";
import { CALENDLY_URL } from "@/data";

const Hero = () => {
  return (
    <section className="min-h-[100vh]" id="home" aria-labelledby="hero-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="min-h-[100vh] flex justify-center items-center relative z-10 py-28">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[62vw] flex justify-center items-center flex-col">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Agent speed · Every PR senior-reviewed
          </p>

          <TextGenerateEffect
            id="hero-heading"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Agent-speed delivery you can actually merge."
          />

          <p className="text-center tracking-wide mb-2 mt-2 text-sm md:text-lg lg:text-xl text-white-200 max-w-3xl">
            I run fleets of Claude Code agents to clear your backlog fast — then
            I adversarially review every pull request myself, because I&apos;ve
            caught the shell-injection bugs the agents wrote that the tests
            passed clean.
          </p>

          <p className="text-center text-sm md:text-base text-blue-100 max-w-2xl">
            Your roadmap ships — without a security incident on your name.
          </p>

          <p className="text-center font-mono text-xs md:text-sm text-purple mt-4 border-l-2 border-purple pl-3">
            2-3x, not 100x — and{" "}
            <Link
              href="/blog/what-agents-get-wrong"
              className="underline-offset-2 hover:underline"
            >
              here&apos;s what the agents get wrong
            </Link>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <MagicButton
              title="Book a scoping call"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
            />
            <a
              href="/services"
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors md:mt-10"
            >
              See how the sprint works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
