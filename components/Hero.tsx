import type { ReactNode } from "react";
import PrimaryCta from "./ui/PrimaryCta";
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
  teardownHref: "/teardown",
  call: "Book a scoping call",
  guarantee: GUARANTEE,
};
export type HeroCopy = typeof en;

// P2: H1, one subhead, the two CTAs, the guarantee. A4 F2: the face sits by
// the name, so the one accountable human is above the fold. #114 M: the hero
// is two columns; `aside` is the swappable panel on the right (any content).
const Hero = ({
  copy = en,
  aside,
}: {
  copy?: HeroCopy;
  aside?: ReactNode;
}) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="page-head pb-16 md:pb-24"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11" decorative priority />
            <p className="eyebrow">{copy.eyebrow}</p>
          </div>
          <h1
            id="hero-heading"
            className="type-hero mt-6 text-balance"
          >
            {copy.heading}
          </h1>
          <p className="mt-6 measure-sm type-lead text-body text-pretty">
            {copy.body}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Booking is the one filled pill; the teardown is the quiet one. */}
            <PrimaryCta
              title={copy.call}
              href={CALENDLY_URL}
              otherClasses="md:min-w-0"
              trackEvent={{ event: "calendly_click", props: { source: "hero" } }}
            />
            <TrackedLink
              href={copy.teardownHref}
              event="cta_click"
              props={{ cta: "teardown", source: "hero" }}
              className={cn(ctaSecondary, "w-full sm:w-auto")}
            >
              {copy.teardown}
            </TrackedLink>
          </div>

          <p className="mt-5 max-w-xl text-sm text-body text-pretty">
            {copy.guarantee}
          </p>
        </div>
        {aside}
      </div>
    </section>
  );
};

export default Hero;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as heroCopy };
