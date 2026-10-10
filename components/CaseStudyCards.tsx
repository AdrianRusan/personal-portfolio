import Link from "next/link";
import { getPosts, WORK_DIR } from "@/lib/blog";

// The method-demo post doubles as the benchmark card next to the case studies.
const BENCHMARK_SLUG = "30-prs-in-2-5-days";

// Renders nothing until at least one case study is published (R2/R10:
// no "coming soon" cards, and the benchmark alone would repeat the demo above).
const CaseStudyCards = async () => {
  const studies = await getPosts(WORK_DIR);
  if (studies.length === 0) return null;

  const benchmark = (await getPosts()).find((p) => p.slug === BENCHMARK_SLUG);
  const cards = [
    ...studies.map((s) => ({
      href: `/work/${s.slug}`,
      label: "Case study",
      title: s.frontmatter.title,
      body: s.frontmatter.description,
    })),
    ...(benchmark
      ? [
          {
            href: `/blog/${benchmark.slug}`,
            label: "Benchmark · my own repo",
            title: benchmark.frontmatter.title,
            body: benchmark.frontmatter.description,
          },
        ]
      : []),
  ];

  return (
    <section aria-labelledby="case-studies-heading" className="px-5 sm:px-10 pb-20">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          Case studies
        </span>
        <h2
          id="case-studies-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight mt-3"
        >
          Proof from documented runs
        </h2>
        <ul
          className={`grid gap-5 mt-8 ${cards.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        >
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-black-200/40 p-6 hover:border-purple/40 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
                  {card.label}
                </span>
                <h3 className="text-lg font-semibold mt-3 text-balance">
                  {card.title}
                </h3>
                <p className="text-sm text-white-200 mt-3 leading-relaxed flex-1">
                  {card.body}
                </p>
                <span className="text-sm font-semibold text-purple mt-5">
                  Read it →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/work"
          className="inline-block text-sm font-semibold text-purple hover:underline underline-offset-4 mt-6"
        >
          See all case studies →
        </Link>
      </div>
    </section>
  );
};

export default CaseStudyCards;
