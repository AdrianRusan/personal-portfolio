import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// Real photo once Adi adds public/adrian.jpg; initials until then (checked at
// build time, so no broken image ever ships).
export const hasPhoto = fs.existsSync(path.join(process.cwd(), "public/adrian.jpg"));

export default function AuthorBox() {
  return (
    <aside
      aria-label="About the author"
      className="flex gap-5 items-center rounded-xl border border-white/10 bg-black-200/40 p-5 mt-10"
    >
      {hasPhoto ? (
        <Image
          src="/adrian.jpg"
          alt="Adrian Rusan"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover border border-purple/40"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-black-300 bg-black-200 text-lg font-semibold tracking-tight text-white-100"
        >
          AR
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-white">
          <Link href="/" className="hover:text-purple transition-colors">
            Adrian Rusan
          </Link>
        </p>
        <p className="text-sm text-white-200 leading-relaxed mt-1">
          Full-stack engineer, 10+ years in production. I ship with a Claude
          Code agent fleet and review every PR myself before it merges.
        </p>
        <div className="flex items-center gap-1 mt-1 -ml-3">
          <Link
            href="https://github.com/AdrianRusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adrian Rusan on GitHub"
            className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adrian-rusan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adrian Rusan on LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
          >
            <FaLinkedin size={18} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
