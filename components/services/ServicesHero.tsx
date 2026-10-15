import type { ReactNode } from "react";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { BOOKING_URL, GUARANTEE } from "@/data";
import { keepRangesWhole } from "@/lib/utils";

// R2-F7: H1, one subhead, one ask with a price link and the guarantee. A4 F16:
// the proof line moved into TrustStrip, now the hero's right-hand panel.
const en = {
  heading:
    "Ship your backlog 2–3x faster. I security-review every PR before you see it.",
  intro:
    "You pick the tickets and I fix the price before we start. AI agents write the code. I review each PR line by line, security first, then send it to you.",
  cta: "Book a scoping call",
  ctaSource: "services_hero",
  tiersLink: "See all prices ↓",
  guarantee: GUARANTEE,
};

export type ServicesHeroCopy = typeof en;

// #114 M: two columns like the home hero; `aside` is the panel on the right.
export const ServicesHero = ({
  copy = en,
  aside,
}: {
  copy?: ServicesHeroCopy;
  aside?: ReactNode;
}) => {
  return (
    <section className="page-head pb-16 md:pb-24">
      <div className="container-wide grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:items-start">
        <div>
          <h1 className="type-title text-balance">
            {keepRangesWhole(copy.heading)}
          </h1>
          <p className="type-lead text-body mt-6 measure-sm text-pretty">
            {copy.intro}
          </p>

          <div className="flex flex-col items-start gap-4 mt-8">
            <PrimaryCta
              title={copy.cta}
              href={BOOKING_URL}
              trackEvent={{
                event: "calendly_click",
                props: { source: copy.ctaSource },
              }}
            />
            <a
              href="#ladder"
              className="inline-flex min-h-11 items-center text-sm font-medium text-body underline underline-offset-4 hover:text-accent transition-colors"
            >
              {copy.tiersLink}
            </a>
            <p className="text-sm text-body max-w-xl text-pretty">
              {copy.guarantee}
            </p>
          </div>
        </div>
        {aside}
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as servicesHeroCopy };
