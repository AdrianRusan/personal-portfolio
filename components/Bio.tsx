import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { YOUTUBE_URL } from "@/data";
import { cn } from "@/lib/utils";

// A real face strengthens the "one accountable human reviews your code" pitch.
// Checked at build time: drop public/adrian.jpg in and the initials disappear.
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "adrian.jpg"));

const Bio = ({ className }: { className?: string }) => {
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
          Who actually reviews your code
        </h3>
        <p className="text-sm text-white-200 leading-relaxed mt-2">
          I&apos;m Adrian Rusan, a software engineer with 10+ years shipping
          production software — most recently as Founding Engineer at Bono
          Fintech (2024–present), and before that at GoSocial, PGL Esports and
          Ipsos. On every engagement here, I&apos;m the senior human who
          reviews each PR the agent fleet ships before it reaches you.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link
            href="https://github.com/AdrianRusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adrian Rusan on GitHub"
            className="text-white-200 hover:text-purple transition-colors"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adrian-rusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adrian Rusan on LinkedIn"
            className="text-white-200 hover:text-purple transition-colors"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href="https://x.com/adrian_rusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adrian Rusan on X"
            className="text-white-200 hover:text-purple transition-colors"
          >
            <FaXTwitter size={20} />
          </Link>
          {YOUTUBE_URL && (
            <Link
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adrian Rusan on YouTube"
              className="text-white-200 hover:text-purple transition-colors"
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
