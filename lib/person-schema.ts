import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  FINTECH_EMPLOYER,
  YOUTUBE_URL,
} from "@/data";

// Person JSON-LD, rendered site-wide by app/root-shell.tsx. Lives here (not in the
// layout) so a jest test can check its shape — layouts may only export Next fields.
const JOB_TITLE = "Senior full-stack engineer";

// City level only (#64 R3): no street, no postal code, no phone.
const address = {
  "@type": "PostalAddress",
  addressLocality: "Timișoara",
  addressCountry: "RO",
};

const contactPoint = {
  "@type": "ContactPoint",
  contactType: "sales",
  email: CONTACT_EMAIL,
  url: CALENDLY_URL,
  availableLanguage: ["en", "ro"],
};

// The PFA that invoices the work. Rendered site-wide next to the Person.
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.adrian-rusan.com/#organization",
  name: "Rusan Adrian-Ionuț PFA",
  url: "https://www.adrian-rusan.com",
  founder: { "@id": "https://www.adrian-rusan.com/#person" },
  address,
  contactPoint,
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.adrian-rusan.com/#person",
  name: "Adrian Rusan",
  givenName: "Adrian",
  familyName: "Rusan",
  jobTitle: JOB_TITLE,
  description:
    "Adrian Rusan runs an AI agent fleet that ships backlog work while personally security-reviewing every pull request before delivery, offering fixed-scope delivery sprints for startup & scale-up founders and CTOs.",
  url: "https://www.adrian-rusan.com",
  image: {
    "@type": "ImageObject",
    url: "https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s",
    width: 400,
    height: 400,
  },
  sameAs: [
    "https://github.com/AdrianRusan",
    "https://www.linkedin.com/in/adrian-rusan/",
    "https://x.com/adrian_rusan",
    ...(YOUTUBE_URL ? [YOUTUBE_URL] : []),
  ],
  worksFor: [
    { "@type": "Organization", name: FINTECH_EMPLOYER },
    {
      "@type": "Organization",
      "@id": organizationJsonLd["@id"],
      name: organizationJsonLd.name,
      url: organizationJsonLd.url,
    },
  ],
  // What the site sells and writes about (A1-08), not a CV keyword list.
  knowsAbout: [
    "Claude Code",
    "AI coding agents",
    "Code review",
    "Application security",
    "Git worktrees",
    "LLM cost optimization",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: JOB_TITLE,
    description:
      "Ships backlog work with AI coding agents and security-reviews every pull request before delivery.",
    skills:
      "Claude Code, AI coding agents, code review, application security, TypeScript, Next.js, React, Node.js",
  },
  address,
  email: CONTACT_EMAIL,
  contactPoint,
};
