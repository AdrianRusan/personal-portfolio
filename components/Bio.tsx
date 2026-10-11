import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FINTECH_EMPLOYER, YOUTUBE_URL } from "@/data";
import { cn } from "@/lib/utils";

// A real face strengthens the "one accountable human reviews your code" pitch.
// Checked at build time: drop public/adrian.jpg in and the initials disappear.
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "adrian.jpg"));

const en = {
  heading: "Who actually reviews your code",
  body: `I'm Adrian Rusan, a software engineer with 10+ years shipping production software — most recently as Founding Engineer at ${FINTECH_EMPLOYER} (2024–present), and before that at GoSocial, PGL Esports and Ipsos. On every engagement here, I'm the senior human who reviews each PR the agent fleet ships before it reaches you.`,
  onGithub: "Adrian Rusan on GitHub",
  onLinkedin: "Adrian Rusan on LinkedIn",
  onX: "Adrian Rusan on X",
  onYoutube: "Adrian Rusan on YouTube",
};
export type BioCopy = typeof en;

const Bio = ({
  className,
  copy = en,
}: {
  className?: string;
  copy?: BioCopy;
}) => {
  return (
    <section
      aria-labelledby="bio-heading"
      className={cn(
        "flex flex-col sm:flex-row gap-6 items-start rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src="/adrian.jpg"
          alt="Adrian Rusan"
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 rounded-full border border-purple/40 object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-purple/40 bg-purple/15 text-2xl font-bold tracking-tight text-purple"
        >
          AR
        </div>
      )}
      <div>
        <h3 id="bio-heading" className="text-lg font-semibold tracking-tight">
          {copy.heading}
        </h3>
        <p className="text-sm text-white-200 leading-relaxed mt-2">
          {copy.body}
        </p>
        <div className="flex items-center gap-1 mt-3 -ml-3">
          <Link
            href="https://github.com/AdrianRusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.onGithub}
            className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adrian-rusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.onLinkedin}
            className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href="https://x.com/adrian_rusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.onX}
            className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
          >
            <FaXTwitter size={20} />
          </Link>
          {YOUTUBE_URL && (
            <Link
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.onYoutube}
              className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
            >
              <FaYoutube size={20} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bio;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as bioCopy };
