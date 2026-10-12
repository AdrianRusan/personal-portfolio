import PrimaryCta from "@/components/ui/PrimaryCta";
import { CALENDLY_URL, GUARANTEE } from "@/data";
import { keepRangesWhole } from "@/lib/utils";

// R2-F7: H1, one subhead, one ask with a price link and the guarantee. A4 F16:
// the proof line moved into TrustStrip, which now sits right under the hero.
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

export const ServicesHero = ({ copy = en }: { copy?: ServicesHeroCopy }) => {
  return (
    <section className="px-5 sm:px-10 pt-36 md:pt-44 pb-8 md:pb-10">
      <div className="container-section text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          {keepRangesWhole(copy.heading)}
        </h1>
        <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto text-pretty">
          {copy.intro}
        </p>

        <div className="flex flex-col items-center gap-4 mt-8">
          <PrimaryCta
            title={copy.cta}
            href={CALENDLY_URL}
            otherClasses="md:mt-0"
            trackEvent={{
              event: "calendly_click",
              props: { source: copy.ctaSource },
            }}
          />
          <a
            href="#ladder"
            className="inline-flex min-h-11 items-center text-sm font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
          >
            {copy.tiersLink}
          </a>
          <p className="text-sm text-white-200/80 max-w-xl text-pretty">
            {copy.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as servicesHeroCopy };
