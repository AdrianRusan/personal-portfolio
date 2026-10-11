import type { BioCopy } from "@/components/Bio";
import type { BetweenLineCopy } from "@/components/BetweenLine";
import type { ClosingCtaCopy } from "@/components/ClosingCta";
import type { HeroCopy } from "@/components/Hero";
import type { OffersCopy } from "@/components/Offers";
import type { ProofBandCopy } from "@/components/ProofBand";
import type { ShipVerifyCopy } from "@/components/ShipVerify";
import type { WhoForCopy } from "@/components/WhoFor";
import type { LadderContent } from "@/components/services/Ladder";
import type { ProcessStepsCopy } from "@/components/services/ProcessSteps";
import type { ServicesHeroCopy } from "@/components/services/ServicesHero";
import { CALENDLY_URL, testimonials } from "@/data";
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

export interface HomeCopy {
  hero: HeroCopy;
  proof: ProofBandCopy;
  shipVerify: ShipVerifyCopy;
  caseStudies: { heading: string; lead: string; all: string };
  offers: OffersCopy;
  whoFor: WhoForCopy;
  bio: BioCopy;
  faq: Faq;
  closing: ClosingCtaCopy;
  between: BetweenLineCopy;
}

// Same sections and order as the home pages (P2).
export const homeMd = (c: HomeCopy) => {
  const quote = testimonials[0];
  return blocks(
    `# ${c.hero.heading}`,
    c.hero.body,
    `> ${c.hero.guarantee}`,
    `[${c.hero.call}](${CALENDLY_URL}) · [${c.hero.teardown}](/teardown)`,
    `## ${c.proof.ariaLabel}`,
    list(c.proof.stats.map((s) => `**${s.figure}** ${s.label}`)),
    c.proof.note,
    `## ${c.shipVerify.heading}`,
    `${c.shipVerify.body} ${c.shipVerify.punch}`,
    `### ${c.shipVerify.stepsHeading}`,
    list(
      c.shipVerify.steps.map((s) => `**${s.label}: ${s.heading}.** ${s.body}`),
    ),
    `${c.shipVerify.multiplierBefore} [${c.shipVerify.multiplierLink.replace(/ →$/, "")}](/blog/what-agents-get-wrong)`,
    `## ${c.caseStudies.heading}`,
    c.caseStudies.lead,
    `[${c.caseStudies.all.replace(/ →$/, "")}](/work)`,
    offersMd(c.offers),
    `## ${c.whoFor.heading}`,
    `### ${c.whoFor.forHeading}`,
    list(c.whoFor.forList),
    `### ${c.whoFor.notForHeading}`,
    list(c.whoFor.notForList),
    `## ${c.bio.heading}`,
    c.bio.body,
    quote &&
      `${c.bio.earlier}:\n\n> ${quote.quote}\n>\n> ${quote.name}, ${quote.title}`,
    faqMd(c.faq),
    `## ${c.closing.heading}`,
    c.closing.body,
    `[${c.closing.button}](${CALENDLY_URL})`,
    `${c.between.before} [${c.between.link}](${c.between.href})`,
  );
};

export interface ServicesCopy {
  hero: ServicesHeroCopy;
  ladder: LadderContent;
  process: ProcessStepsCopy;
  faq: Faq;
}

export const servicesMd = ({ hero, ladder, process, faq }: ServicesCopy) =>
  blocks(
    `# ${hero.heading}`,
    hero.intro,
    `> ${hero.guarantee}`,
    `[${hero.cta}](${CALENDLY_URL})`,
    `${hero.proof}. [${hero.proofLink.label}](${hero.proofLink.href})`,
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
                `**${o.name}** (${ladder.format(o)}, ${o.duration}). ${o.summary}${o.assurance ? ` ${o.assurance}` : ""}`,
            ),
        ),
      ),
    ),
    ladder.capacity,
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
    ...page.sections.map((s) => `## ${s.heading}\n\n${s.body}`),
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
