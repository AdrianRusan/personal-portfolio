import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { CONTACT_EMAIL, socialMedia } from "@/data";
import { LocaleSwitch } from "@/components/LocaleSwitch";

// Keyed by socialMedia[].id in data/index.ts (1 GitHub, 2 X, 3 LinkedIn).
const socialIcons: Record<number, typeof FaGithub> = {
  1: FaGithub,
  2: FaXTwitter,
  3: FaLinkedin,
};

// A plain footer (P1): no ask in here. The closing ask is ClosingCta. A4 F6:
// the email address lives here, so it is on every page without a second ask.
const en = {
  about: "About",
  aboutHref: "/about",
  contact: "Contact",
  contactHref: "/contact",
  privacy: "Privacy",
  rss: "RSS",
  socialAria: "Social media links",
  // Per-id link labels (socialMedia in data/index.ts); EN falls back to its alt.
  socialLabels: {} as Record<number, string>,
};
export type FooterCopy = typeof en;

const link = "hover:text-accent transition-colors";

const Footer = ({ copy = en }: { copy?: FooterCopy }) => {
  return (
    // #114 M: one ruled row on desktop (name, links, contact), stacked on phones.
    <footer className="border-t border-ink/15 gutter py-10">
      <div className="container-wide flex flex-col gap-5 text-sm text-body lg:flex-row lg:items-center lg:justify-between">
        <p className="font-mono text-xs text-muted">
          Copyright © {new Date().getFullYear()} Adrian Rusan
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <LocaleSwitch className={link} />
          <Link href={copy.aboutHref} className={link}>
            {copy.about}
          </Link>
          <Link href={copy.contactHref} className={link}>
            {copy.contact}
          </Link>
          <Link href="/privacy" className={link}>
            {copy.privacy}
          </Link>
          <a href="/feed.xml" className={link}>
            {copy.rss}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
          {CONTACT_EMAIL}
        </a>
        <nav className="-ml-2 flex items-center gap-1" aria-label={copy.socialAria}>
          {socialMedia.map((info) => {
            const Icon = socialIcons[info.id];
            return (
              <Link
                href={info.url}
                aria-label={copy.socialLabels[info.id] ?? info.alt}
                key={info.id}
                className={`p-2 ${link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icon && <Icon size={18} aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
