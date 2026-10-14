import type { BioCopy } from "@/components/Bio";
import type { ClosingCtaCopy } from "@/components/ClosingCta";
import type { HeroCopy } from "@/components/Hero";
import type { OffersCopy } from "@/components/Offers";
import type { ProofBandCopy } from "@/components/ProofBand";
import type { ShipVerifyCopy } from "@/components/ShipVerify";
import type { TestimonialsCopy } from "@/components/Testimonials";
import type { WhoForCopy } from "@/components/WhoFor";
import type { LadderContent } from "@/components/services/Ladder";
import type { ProcessStepsCopy } from "@/components/services/ProcessSteps";
import type { ServicesHeroCopy } from "@/components/services/ServicesHero";
import type { TrustStripCopy } from "@/components/services/TrustStrip";
import { CALENDLY_URL, type Testimonial } from "@/data";
import type { ProsePage } from "@/data/pages";
import { teardown } from "@/data/teardown";
import {
  euro,
  perEngineer,
  workshopLogistics,
  type Workshop,
} from "@/data/workshops";
import type { BlogPost } from "@/lib/blog";
import { blocks, list } from "./format";

// One generator per page type, fed the same copy objects the pages render, so
// EN and RO share a generator and the Markdown can't drift from the HTML.

type Faq = { heading: string; items: { question: string; answer: string }[] };

const faqMd = ({ heading, items }: Faq) =>
  blocks(
    `## ${heading}`,
    ...items.map(({ question, answer }) => `### ${question}\n\n${answer}`),
  );

// The home ladder as rows: tier, its offers, each offer's price (P2).
const offersMd = (c: OffersCopy) =>
  blocks(
    `## ${c.heading}`,
    `${c.intro}${c.credit}`,
    c.priceNote,
    ...c.tiers.map(({ tier, name, tagline }) =>
      blocks(
        `### ${name}: ${tagline}`,
        list(
          c.ladder
            .filter((o) => o.tier === tier)
            .map(
              (o) =>
                `**${o.name}** (${c.formatPrice(o)}, ${o.duration}). ${o.summary}`,
            ),
        ),
      ),
    ),
    `[${c.more.replace(/ →$/, "")}](${c.href})`,
    c.capacity,
  );

const quoteMd = ({ quote, name, role, company }: Testimonial) =>
  `> ${quote}\n>\n> ${[name, role, company].filter(Boolean).join(", ")}`;

export interface HomeCopy {
  hero: HeroCopy;
  proof: ProofBandCopy;
  shipVerify: ShipVerifyCopy;
  caseStudies: { heading: string; lead: string; all: string };
  testimonials: TestimonialsCopy;
  offers: OffersCopy;
  whoFor: WhoForCopy;
  bio: BioCopy;
  faq: Faq;
  closing: ClosingCtaCopy;
}

// Same sections and order as the home pages (P2).
export const homeMd = (c: HomeCopy) =>
  blocks(
    `# ${c.hero.heading}`,
    c.hero.body,
    `> ${c.hero.guarantee}`,
    `[${c.hero.call}](${CALENDLY_URL}) · [${c.hero.teardown}](${c.hero.teardownHref})`,
    `## ${c.proof.ariaLabel}`,
    list(c.proof.stats.map((s) => `**${s.figure}** ${s.label}`)),
    c.proof.note,
    `## ${c.shipVerify.heading}`,
    `${c.shipVerify.body} ${c.shipVerify.punch}`,
    `### ${c.shipVerify.stepsHeading}`,
    list(
      c.shipVerify.steps.map((s) => `**${s.label}: ${s.heading}.** ${s.body}`),
    ),
    `[${c.shipVerify.multiplierLink.replace(/ →$/, "")}](/blog/what-agents-get-wrong)`,
    `## ${c.caseStudies.heading}`,
    c.caseStudies.lead,
    `[${c.caseStudies.all.replace(/ →$/, "")}](/work)`,
    `## ${c.testimonials.heading}`,
    ...c.testimonials.items.map(quoteMd),
    offersMd(c.offers),
    `## ${c.whoFor.heading}`,
    `### ${c.whoFor.forHeading}`,
    list(c.whoFor.forList),
    `### ${c.whoFor.notForHeading}`,
    list(c.whoFor.notForList),
    `## ${c.bio.heading}`,
    c.bio.body,
    faqMd(c.faq),
    `## ${c.closing.heading}`,
    c.closing.body,
    `[${c.closing.button}](${CALENDLY_URL}) · [${c.closing.teardown.replace(/ →$/, "")}](${c.closing.teardownHref})`,
  );

export interface ServicesCopy {
  hero: ServicesHeroCopy;
  trust: TrustStripCopy;
  ladder: LadderContent;
  process: ProcessStepsCopy;
  faq: Faq;
  // #76: the Reviewed PR/Sprint quote, then the Retainer quote.
  quotes: Testimonial[];
}

export const servicesMd = ({
  hero,
  trust,
  ladder,
  process,
  faq,
  quotes,
}: ServicesCopy) =>
  blocks(
    `# ${hero.heading}`,
    hero.intro,
    `> ${hero.guarantee}`,
    `[${hero.cta}](${CALENDLY_URL})`,
    `${trust.label} ${trust.employers.join(", ")}.`,
    `${trust.proof}. [${trust.study.cta.replace(/ →$/, "")}](${trust.study.href})`,
    `## ${ladder.heading}`,
    ladder.note ? `${ladder.intro} ${ladder.note}` : ladder.intro,
    ...ladder.tiers.map(({ tier, tagline }) =>
      blocks(
        `### ${ladder.tierName(tier)}: ${tagline}`,
        list(
          ladder.offers
            .filter((o) => o.tier === tier)
            .map(
              (o) =>
                `**${o.name}** (${ladder.format(o)}, ${o.duration}). ${o.summary}${o.tier !== "Ship" && o.assurance ? ` ${o.assurance}` : ""}`,
            ),
        ),
      ),
    ),
    ladder.capacity,
    ...quotes.map(quoteMd),
    `## ${process.heading}`,
    process.intro,
    ...process.steps.map((s) => `### ${s.heading}\n\n${s.body}`),
    faqMd(faq),
  );

export const proseMd = (page: ProsePage) =>
  blocks(
    `# ${page.title}`,
    page.lead,
    page.updated && `Last updated ${page.updated}`,
    ...(page.options ?? []).map(
      (o) => `## ${o.heading}\n\n${o.body} [${o.cta}](${o.href})`,
    ),
    ...page.sections.map((s) =>
      blocks(
        `## ${s.heading}`,
        s.body,
        s.quote && `${s.quote.label}:\n\n${quoteMd(s.quote.testimonial)}`,
      ),
    ),
  );

export const teardownMd = () =>
  blocks(
    `# ${teardown.heading}`,
    teardown.eyebrow,
    teardown.intro,
    teardown.proof,
    "## How it works",
    teardown.steps.map((s, i) => `${i + 1}. ${s}`).join("\n"),
    list(teardown.trustNotes),
    "Request a teardown with the form on [the teardown page](/teardown) (email plus a repo or PR link).",
    `## ${teardown.whyHeading}`,
    teardown.why,
    `[Prefer to talk? Book a scoping call](${CALENDLY_URL})`,
  );

export const workshopMd = (w: Workshop) =>
  blocks(
    `# ${w.title}`,
    w.headline,
    w.intro,
    `**${euro(w.price)}** ex-VAT, ${w.length}, up to ${w.maxPeople} people (${perEngineer(w)}).`,
    "## Agenda",
    ...w.agenda.map((part) =>
      blocks(
        `### ${part.label}${part.duration ? ` (${part.duration})` : ""}`,
        list(
          part.blocks.map(
            (b) => `${b.time ? `${b.time} ` : ""}**${b.title}.** ${b.body}`,
          ),
        ),
      ),
    ),
    "## What your team leaves with",
    w.managerOutcome,
    list(w.outcomes),
    "## Logistics",
    list(workshopLogistics),
    `[${w.cta.label}](${w.cta.href})`,
  );

export const postListMd = (
  title: string,
  intro: string,
  base: string,
  posts: BlogPost[],
) =>
  blocks(
    `# ${title}`,
    intro,
    list(
      posts.map(
        (p) =>
          `[${p.frontmatter.title}](${base}/${p.slug}) (${p.frontmatter.date}): ${p.frontmatter.description}`,
      ),
    ),
  );
