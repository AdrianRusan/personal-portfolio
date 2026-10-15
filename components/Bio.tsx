import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FINTECH_EMPLOYER, HARNESS_PROOF, YOUTUBE_URL } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";

// A real face strengthens the "one accountable human reviews your code" pitch.
// Checked at build time: drop public/adrian.jpg in and the initials disappear.
const hasPhoto = fs.existsSync(
  path.join(process.cwd(), "public", "adrian.jpg"),
);

// The photo, or a neutral monogram until public/adrian.jpg exists (A1).
// `decorative` where the name is already next to the photo (the hero).
export const Avatar = ({
  className,
  decorative = false,
  priority = false,
}: {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) =>
  hasPhoto ? (
    <Image
      src="/adrian.jpg"
      alt={decorative ? "" : "Adrian Rusan"}
      priority={priority}
      width={96}
      height={96}
      className={cn("h-20 w-20 shrink-0 rounded-full object-cover", className)}
    />
  ) : (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-raised text-xl font-semibold tracking-tight text-body",
        className,
      )}
    >
      AR
    </div>
  );

const en = {
  heading: "Who reviews your code",
  body: `I'm Adrian Rusan, a senior full-stack engineer with 10+ years in production. I work through my own Romanian-registered business (PFA), most recently as founding engineer for ${FINTECH_EMPLOYER}. Before that, live graphics for PGL Major streams with 2M+ concurrent viewers, 300+ survey projects at Ipsos for global brands, and ad dashboards at GoSocial. The agents run on my own harness: ${HARNESS_PROOF}. I still read every PR myself.`,
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
  return (
    <section
      aria-labelledby="bio-heading"
      className="section border-t border-ink/15"
    >
      <div className="container-wide grid gap-8 lg:grid-cols-[4fr_7fr] lg:gap-16">
        {/* A4 F2: the photo moved up to the hero. */}
        <SectionHeading id="bio-heading">{copy.heading}</SectionHeading>
        <div>
          <p className="text-lg md:text-xl text-body leading-relaxed text-pretty">
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
                className="inline-flex h-11 w-11 items-center justify-center text-body hover:text-accent transition-colors"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as bioCopy };
