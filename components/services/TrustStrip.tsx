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
    "30 reviewed PRs in under 3 days · 3 shell-injection paths caught before merge · every miss listed in the case study",
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
    // #114 M: the services hero panel (ServicesHero `aside`).
    <aside
      aria-label={copy.ariaLabel}
      className="overflow-hidden rounded-xl border border-white/15 bg-black-200 shadow-[0_40px_80px_-48px_rgba(31,30,26,0.45)] dark:shadow-[0_40px_80px_-48px_rgba(0,0,0,0.7)]"
    >
      <p className="border-b border-white/15 px-4 py-3 font-mono text-xs text-white-100">{copy.label}</p>
      <ul className="border-b border-white/15">
        {copy.employers.map((name) => (
          <li
            key={name}
            className="border-b border-white/15 px-4 py-3 text-xl font-[380] tracking-[-0.02em] text-white last:border-b-0"
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="bg-black-100/60 px-4 py-4">
        <p className="text-sm text-white-200 text-pretty">{copy.proof}</p>
        <div className="flex flex-wrap gap-x-6 text-sm">
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
    </aside>
  );
};

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as trustStripCopy };
