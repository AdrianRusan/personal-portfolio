import Link from "next/link";
import { getPosts, WORK_DIR } from "@/lib/blog";
import { byCaseStudyOrder, caseStudyResults } from "@/data/work";
import type { PostTitles } from "@/lib/blog-types";
import { SectionHeading } from "./ui/SectionHeading";

// Renders nothing until at least one case study is published (R2/R10: no
// "coming soon" cards). P2: case studies only, one row of three; the benchmark
// post retold the first study. A1 F2 / A4 F1: each card's label is its own
// study's (the meta segment after the date), so client work never reads as
// "Own project". A4 F12: the /work figure leads, as on /work.
const en = {
  // RO translations of the card's EN strings (meta label, figure, figure
  // label), keyed by the EN text: an EN change falls back to EN, never to a
  // stale translation. EN shows everything as written.
  t: {} as Record<string, string>,
  heading: "Case studies",
  // Optional section-level note (RO: the studies are in English).
  lead: "",
  read: "Read it →",
  all: "See all case studies →",
  // Per-slug title/description overrides; the links still go to the EN pages.
  titles: {} as PostTitles,
};
export type CaseStudyCardsCopy = typeof en;

const CaseStudyCards = async ({ copy = en }: { copy?: CaseStudyCardsCopy }) => {
  const studies = byCaseStudyOrder(await getPosts(WORK_DIR)).slice(0, 3);
  if (studies.length === 0) return null;

  return (
    <section
      id="work"
      aria-labelledby="case-studies-heading"
      className="section border-t border-ink/15"
    >
      <div className="container-wide">
        <SectionHeading id="case-studies-heading" lead={copy.lead || undefined}>
          {copy.heading}
        </SectionHeading>
        <ul className="grid mt-10 md:grid-cols-3 border-t border-ink">
          {studies.map((study) => {
            const { title } = {
              ...study.frontmatter,
              ...copy.titles[study.slug],
            };
            const label = study.frontmatter.meta?.split(" · ")[1];
            const result = caseStudyResults[study.slug];
            const t = (s: string) => copy.t[s] ?? s;
            return (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col border-b border-ink/15 py-6 md:pr-8"
                >
                  {label && (
                    <span className="eyebrow">{t(label)}</span>
                  )}
                  {result && (
                    <p className="mt-3">
                      <span className="block type-stat text-ink">
                        {t(result.figure)}
                      </span>
                      <span className="mt-1 block text-sm text-body text-pretty">
                        {t(result.label)}
                      </span>
                    </p>
                  )}
                  {/* Figure, label and title, as on /work: no description line. */}
                  <h3 className="type-item leading-snug mt-4 flex-1 text-balance group-hover:underline decoration-accent underline-offset-4">
                    {title}
                  </h3>
                  <span className="text-sm font-medium text-accent mt-5">
                    {copy.read}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/work"
          className="inline-block text-sm font-medium text-accent hover:underline underline-offset-4 mt-6"
        >
          {copy.all}
        </Link>
      </div>
    </section>
  );
};

export default CaseStudyCards;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as caseStudyCardsCopy };
