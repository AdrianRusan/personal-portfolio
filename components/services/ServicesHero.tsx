import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import { CALENDLY_URL, GUARANTEE } from "@/data";
import { keepRangesWhole } from "@/lib/utils";
import { sprintSizes } from "@/data/ladder";

const CASE_STUDY = "/work/30-reviewed-prs-3-vulnerabilities";

// R2-F7: H1, one subhead, one ask with a price link, the guarantee and one proof line.
const en = {
  heading:
    "Ship your backlog 2–3x faster. I security-review every PR before you see it.",
  intro:
    "You pick the tickets and I fix the price before we start. AI agents write the code. I review each PR line by line, security first, then send it to you.",
  cta: "Book a scoping call",
  ctaSource: "services_hero",
  tiersLink: `First sprint from €${sprintSizes[0]!.price.toLocaleString("en-US")}. See all prices ↓`,
  guarantee: GUARANTEE,
  proof:
    "30 reviewed PRs in under 3 days · 3 shell-injection paths caught before merge",
  proofLink: { label: "See what the agents got wrong →", href: CASE_STUDY },
};

export type ServicesHeroCopy = typeof en;

export const ServicesHero = ({ copy = en }: { copy?: ServicesHeroCopy }) => {
  return (
    <section className="px-5 sm:px-10 pt-36 pb-12 md:pb-16">
      <div className="container-section text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
          {keepRangesWhole(copy.heading)}
        </h1>
        <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto text-pretty">
          {copy.intro}
        </p>

        <div className="flex flex-col items-center gap-4 mt-8">
          <MagicButton
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
            className="text-sm font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
          >
            {copy.tiersLink}
          </a>
          <p className="text-sm text-white-200/80 mt-2 max-w-xl text-pretty">
            {copy.guarantee}
          </p>
        </div>

        <p className="text-sm text-white-200/80 mt-10 max-w-2xl mx-auto text-pretty">
          {copy.proof}.{" "}
          <Link
            href={copy.proofLink.href}
            className="font-medium text-purple underline underline-offset-4 whitespace-nowrap hover:text-white transition-colors"
          >
            {copy.proofLink.label}
          </Link>
        </p>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as servicesHeroCopy };
