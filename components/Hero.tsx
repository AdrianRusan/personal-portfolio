import MagicButton from "./ui/MagicButton";
import { Avatar } from "./Bio";
import { ctaSecondary } from "./ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { CALENDLY_URL, GUARANTEE } from "@/data";
import { cn } from "@/lib/utils";

const en = {
  // The hero sub carries the page's one "2–3x, not 100x" (C-RULES).
  eyebrow: "Adrian Rusan · Senior full-stack engineer, 10+\u00a0years",
  heading: "I ship your backlog with AI agents and review every PR myself.",
  body: "Security first: injection, auth, secrets and access control, checked line by line before a PR reaches you. Expect 2–3x the throughput, not 100x.",
  teardown: "Get a free teardown",
  call: "Book a scoping call",
  guarantee: GUARANTEE,
};
export type HeroCopy = typeof en;

// P2: H1, one subhead, the two CTAs, the guarantee. The background is the
// page's own (PageShell), so the hero has no effects of its own. A4 F2: the
// face sits by the name, so the one accountable human is above the fold.
const Hero = ({ copy = en }: { copy?: HeroCopy }) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="px-5 sm:px-10 pt-36 pb-12 md:pt-44 md:pb-20"
    >
      <div className="container-section flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12" decorative priority />
          <p className="eyebrow text-left">{copy.eyebrow}</p>
        </div>
        <h1
          id="hero-heading"
          className="mt-4 max-w-4xl text-[40px] leading-[1.1] md:text-6xl font-bold tracking-tight text-balance"
        >
          {copy.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-xl text-white-200 leading-relaxed text-pretty">
          {copy.body}
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col md:max-w-none md:w-auto md:flex-row items-center gap-3 md:gap-4">
          {/* Booking is the one filled button; the teardown is the outline one. */}
          <MagicButton
            title={copy.call}
            href={CALENDLY_URL}
            otherClasses="md:mt-0"
            trackEvent={{ event: "calendly_click", props: { source: "hero" } }}
          />
          <TrackedLink
            href="/teardown"
            event="cta_click"
            props={{ cta: "teardown", source: "hero" }}
            className={cn(ctaSecondary, "w-full md:w-auto md:min-w-60")}
          >
            {copy.teardown}
          </TrackedLink>
        </div>

        <p className="mt-5 max-w-xl text-sm text-white-200 text-pretty">
          {copy.guarantee}
        </p>
      </div>
    </section>
  );
};

export default Hero;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as heroCopy };
