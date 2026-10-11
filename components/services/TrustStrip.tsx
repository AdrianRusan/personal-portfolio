import Link from "next/link";
import { FINTECH_EMPLOYER, SAMPLE_REPORT_URL } from "@/data";

// R2-F9: the proof a buyer can check (the 30-PR case study and a sample
// report) in place of a peer quote. Client quotes go here once they exist (A4).
const en = {
  ariaLabel: "Track record",
  label: "10+ years shipping production software with",
  // Newest first.
  employers: [FINTECH_EMPLOYER, "GoSocial", "PGL Esports", "Ipsos"],
  study: {
    tag: "Own project",
    title: "30 reviewed PRs, 3 shell-injection paths caught",
    body: "My own admin dashboard: agents opened 31 PRs in under three days and 30 reached review. With no tests and no CI, review was the only gate. It caught 3 injection paths before merge and missed one, which the write-up covers.",
    href: "/work/30-reviewed-prs-3-vulnerabilities",
    cta: "Read the case study →",
  },
  sampleLink: "See a sample security report →",
};

export type TrustStripCopy = typeof en;

export const TrustStrip = ({ copy = en }: { copy?: TrustStripCopy }) => {
  return (
    <section
      aria-label={copy.ariaLabel}
      className="px-5 sm:px-10 py-12 md:py-16"
    >
      <div className="container-section">
        <article className="rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8">
          <p className="text-xs font-medium text-blue-100">{copy.study.tag}</p>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-balance">
            {copy.study.title}
          </h2>
          <p className="text-sm md:text-base text-white-200 leading-relaxed mt-3 text-pretty">
            {copy.study.body}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm font-medium">
            <Link
              href={copy.study.href}
              className="text-purple underline underline-offset-4 hover:text-white transition-colors"
            >
              {copy.study.cta}
            </Link>
            {SAMPLE_REPORT_URL && (
              <a
                href={SAMPLE_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple underline underline-offset-4 hover:text-white transition-colors"
              >
                {copy.sampleLink}
              </a>
            )}
          </div>
        </article>

        <p className="text-sm text-white-200/80 mt-10">{copy.label}</p>
        {/* Gaps, not "·" separators: a wrapped row would start with an orphan dot. */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-3">
          {copy.employers.map((name) => (
            <span
              key={name}
              className="text-base font-semibold text-white-200 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
