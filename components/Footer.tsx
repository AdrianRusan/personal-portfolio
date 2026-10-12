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

const link = "hover:text-purple transition-colors";

const Footer = ({ copy = en }: { copy?: FooterCopy }) => {
  return (
    <footer className="border-t border-white/10 px-5 sm:px-10 py-10">
      <div className="container-section flex flex-col items-center gap-4 text-sm text-white-200">
        <p>Copyright © {new Date().getFullYear()} Adrian Rusan</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
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
        <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
          {CONTACT_EMAIL}
        </a>
        <nav className="flex items-center gap-2" aria-label={copy.socialAria}>
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
    </footer>
  );
};

export default Footer;
