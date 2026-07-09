import Link from "next/link";
import { CALENDLY_URL } from "@/data";

const CaseStudy = () => {
  return (
    <section id="work" className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-8 md:p-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          Case study
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
          30 reviewed PRs in 2.5 days — and the 3 vulnerabilities that almost
          shipped.
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          Nine agent batches ran a backlog through the harness in parallel. The
          agents produced 30 PRs. The tests passed. The adversarial review
          caught 3 shell-injection vulnerabilities before any of them merged.
          This is what the honest 2-3x actually looks like — including what the
          agents got wrong.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link
            href="/blog/30-prs-in-2-5-days"
            className="text-sm font-semibold text-purple hover:underline underline-offset-4"
          >
            Read the anatomy of nine agent batches →
          </Link>
          <span className="text-white-200/40">·</span>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
          >
            Run this on your backlog
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
