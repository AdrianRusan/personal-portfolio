import Link from "next/link";
import { GridBackground } from "./ui/GridBackground";
import MagicButton from "./ui/MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow } from "react-icons/fa6";
import SpotlightBackground from "./ui/SpotlightBackground";
import { CalendlyLink } from "@/components/CalendlyLink";
import { TrackedLink } from "@/components/TrackedLink";
import { GUARANTEE, STRATEGY_CALL_URL } from "@/data";

const en = {
  eyebrow:
    "Adrian Rusan · Senior engineer, 10+ years · AI agents, human review",
  heading: "Ship the roadmap you can't hire for.",
  body: "I clear your backlog with Claude Code agents, then review every pull request myself, security first, before it reaches you.",
  promise: "Your roadmap ships — without a security incident on your name.",
  honestBefore: "2-3x, not 100x — and",
  honestLink: "here's what the agents get wrong",
  teardown: "Get a free teardown",
  call: "Or book a scoping call →",
  guarantee: GUARANTEE,
  adviceBefore: "Only need advice?",
  adviceLink: "Book a 1:1 AI session, €200.",
  adviceHref: STRATEGY_CALL_URL,
};
export type HeroCopy = typeof en;

const Hero = ({ copy = en }: { copy?: HeroCopy }) => {
  return (
    <section className="min-h-[100vh]" id="home" aria-labelledby="hero-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="min-h-[100vh] flex justify-center items-center relative z-10 py-28">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[62vw] flex justify-center items-center flex-col">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            {copy.eyebrow}
          </p>

          <TextGenerateEffect
            id="hero-heading"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words={copy.heading}
          />

          <p className="text-center tracking-wide mb-2 mt-2 text-sm md:text-lg lg:text-xl text-white-200 max-w-3xl">
            {copy.body}
          </p>

          <p className="text-center text-sm md:text-base text-blue-100 max-w-2xl">
            {copy.promise}
          </p>

          <p className="text-center font-mono text-xs md:text-sm text-purple mt-4 border-l-2 border-purple pl-3">
            {copy.honestBefore}{" "}
            <Link
              href="/blog/what-agents-get-wrong"
              className="underline-offset-2 hover:underline"
            >
              {copy.honestLink}
            </Link>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <MagicButton
              title={copy.teardown}
              icon={<FaLocationArrow />}
              position="right"
              href="/teardown"
              trackEvent={{
                event: "cta_click",
                props: { cta: "teardown", source: "hero" },
              }}
            />
            <CalendlyLink
              source="hero_secondary"
              newTab={false}
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors md:mt-10"
            >
              {copy.call}
            </CalendlyLink>
          </div>

          <p className="text-center text-xs text-white-200/70 mt-5 max-w-xl">
            {copy.guarantee}
          </p>

          <p className="text-center text-sm text-white-200 mt-4">
            {copy.adviceBefore}{" "}
            <TrackedLink
              href={copy.adviceHref}
              event="cta_click"
              props={{ cta: "strategy_call", source: "hero" }}
              className="font-medium text-blue-100 underline-offset-2 hover:underline hover:text-purple transition-colors"
            >
              {copy.adviceLink}
            </TrackedLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
