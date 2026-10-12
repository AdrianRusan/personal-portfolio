import Link from "next/link";
import { FINTECH_EMPLOYER, SAMPLE_REPORT_URL } from "@/data";

// A4 F4 / A1 F10: right under the hero, the names a buyer knows and one
// proof line a buyer can check (the 30-PR case study and a sample report).
const en = {
  ariaLabel: "Track record",
  label: "10+ years shipping production software with",
  // Newest first.
  employers: [FINTECH_EMPLOYER, "GoSocial", "PGL Esports", "Ipsos"],
  proof:
    "30 reviewed PRs in under 3 days · 3 shell-injection paths caught before merge, 1 missed",
  study: {
    href: "/work/30-reviewed-prs-3-vulnerabilities",
    cta: "Read the case study →",
  },
  sampleLink: "See a sample security report →",
};

export type TrustStripCopy = typeof en;

export const TrustStrip = ({ copy = en }: { copy?: TrustStripCopy }) => {
  const link =
    "inline-flex min-h-11 items-center font-medium text-purple underline underline-offset-4 hover:text-white transition-colors";
  return (
    <section aria-label={copy.ariaLabel} className="px-5 sm:px-10 pb-4 md:pb-6">
      <div className="container-section border-y border-white/10 py-6 text-center">
        <p className="text-sm text-white-200/80">{copy.label}</p>
        {/* Gaps, not "·" separators: a wrapped row would start with an orphan dot. */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 mt-3">
          {copy.employers.map((name) => (
            <span
              key={name}
              className="text-base font-semibold text-white-200 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="text-sm text-white-200 mt-5 text-pretty">{copy.proof}</p>
        <div className="flex flex-wrap justify-center gap-x-6 text-sm">
          <Link href={copy.study.href} className={link}>
            {copy.study.cta}
          </Link>
          {SAMPLE_REPORT_URL && (
            <a
              href={SAMPLE_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {copy.sampleLink}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as trustStripCopy };
