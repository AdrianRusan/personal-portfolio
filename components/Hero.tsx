import { GridBackground } from "./ui/GridBackground";
import MagicButton from "./ui/MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow } from "react-icons/fa6";
import SpotlightBackground from "./ui/SpotlightBackground";
import { TrackedLink } from "@/components/TrackedLink";
import Link from "next/link";
import { CALENDLY_URL, GUARANTEE } from "@/data";

const en = {
  eyebrow:
    "Adrian Rusan · Senior engineer, 10+ years · AI agents, human review",
  heading: "Ship the roadmap you can't hire for.",
  body: "I clear your backlog with Claude Code agents, then review every pull request myself, security first, before it reaches you.",
  promise: "Your roadmap ships — without a security incident on your name.",
  honestBefore: "2–3x, not 100x — and",
  honestLink: "here's what the agents get wrong",
  teardown: "Get a free teardown",
  call: "Book a scoping call",
  guarantee: GUARANTEE,
};
// Two CTAs only (C46): the €200 call lives on the offers ladder. The advice*
// keys are no longer rendered; data/ro-home.ts still sets them until W4 drops them.
export type HeroCopy = typeof en & {
  adviceBefore?: string;
  adviceLink?: string;
  adviceHref?: string;
};

const Hero = ({ copy = en }: { copy?: HeroCopy }) => {
  return (
    <section className="min-h-[100vh]" id="home" aria-labelledby="hero-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className="min-h-[100vh] flex justify-center items-center relative z-10 py-28">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[62vw] flex justify-center items-center flex-col">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100">
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

          <p className="text-center font-mono text-xs md:text-sm text-purple mt-4">
            {copy.honestBefore}{" "}
            <Link
              href="/blog/what-agents-get-wrong"
              className="underline underline-offset-2"
            >
              {copy.honestLink}
            </Link>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            {/* Booking is the one filled button; the teardown is the outline one. */}
            <MagicButton
              title={copy.call}
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: "hero" },
              }}
            />
            <TrackedLink
              href="/teardown"
              event="cta_click"
              props={{ cta: "teardown", source: "hero" }}
              className="inline-flex h-12 w-full md:w-60 md:mt-10 items-center justify-center rounded-lg border border-purple px-7 text-sm font-semibold text-purple transition-colors hover:bg-purple/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100"
            >
              {copy.teardown}
            </TrackedLink>
          </div>

          <p className="text-center text-xs text-white-200/70 mt-5 max-w-xl">
            {copy.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
