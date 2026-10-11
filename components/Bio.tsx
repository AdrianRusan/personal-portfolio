import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FINTECH_EMPLOYER, YOUTUBE_URL, testimonials } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";

// A real face strengthens the "one accountable human reviews your code" pitch.
// Checked at build time: drop public/adrian.jpg in and the initials disappear.
const hasPhoto = fs.existsSync(
  path.join(process.cwd(), "public", "adrian.jpg"),
);

// The photo, or a neutral monogram until public/adrian.jpg exists (A1).
export const Avatar = ({ className }: { className?: string }) =>
  hasPhoto ? (
    <Image
      src="/adrian.jpg"
      alt="Adrian Rusan"
      width={96}
      height={96}
      className={cn("h-20 w-20 shrink-0 rounded-full object-cover", className)}
    />
  ) : (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black-200 text-xl font-semibold tracking-tight text-white-200",
        className,
      )}
    >
      AR
    </div>
  );

const en = {
  heading: "Who reviews your code",
  body: `I'm Adrian Rusan, a software engineer with 10+ years shipping production software. I work independently through my own company, most recently on contract as founding engineer for ${FINTECH_EMPLOYER}. Before that: GoSocial, PGL Esports and Ipsos. On every engagement here, I review each PR the agents write.`,
  // P2: the one client quote, folded in with a one-line source (O9, R1-F23).
  earlier: "Earlier client work, before the agent pipeline",
  onGithub: "Adrian Rusan on GitHub",
  onLinkedin: "Adrian Rusan on LinkedIn",
  onX: "Adrian Rusan on X",
  onYoutube: "Adrian Rusan on YouTube",
};
export type BioCopy = typeof en;

type SocialLabel = "onGithub" | "onLinkedin" | "onX" | "onYoutube";
const social: { href: string; label: SocialLabel; Icon: typeof FaGithub }[] = [
  { href: "https://github.com/AdrianRusan", label: "onGithub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/adrian-rusan", label: "onLinkedin", Icon: FaLinkedin },
  { href: "https://x.com/adrian_rusan", label: "onX", Icon: FaXTwitter },
  ...(YOUTUBE_URL
    ? [{ href: YOUTUBE_URL, label: "onYoutube" as const, Icon: FaYoutube }]
    : []),
];

const Bio = ({ copy = en }: { copy?: BioCopy }) => {
  const quote = testimonials[0];
  return (
    <section
      aria-labelledby="bio-heading"
      className="px-5 sm:px-10 py-12 md:py-20"
    >
      <div className="container-section grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
        <Avatar />
        <div className="max-w-3xl">
          <SectionHeading id="bio-heading">{copy.heading}</SectionHeading>
          <p className="mt-4 text-white-200 leading-relaxed text-pretty">
            {copy.body}
          </p>
          <div className="flex items-center gap-1 mt-3 -ml-3">
            {social.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy[label]}
                className="inline-flex h-11 w-11 items-center justify-center text-white-200 hover:text-purple transition-colors"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
          {quote && (
            <figure className="mt-6 border-l-2 border-white/15 pl-5">
              <figcaption className="text-sm text-white-200/80">
                {copy.earlier}:
              </figcaption>
              <blockquote className="mt-2 text-sm text-white-200 leading-relaxed text-pretty">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <p className="mt-2 text-sm">
                <span className="font-semibold text-white">{quote.name}</span>
                <span className="text-white-200/80">, {quote.title}</span>
              </p>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bio;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as bioCopy };
