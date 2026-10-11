import { FINTECH_EMPLOYER, YOUTUBE_URL } from "@/data";

// Person JSON-LD, rendered site-wide by app/layout.tsx. Lives here (not in the
// layout) so a jest test can check its shape — layouts may only export Next fields.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.adrian-rusan.com/#person",
  name: "Adrian Rusan",
  givenName: "Adrian",
  familyName: "Rusan",
  jobTitle: ["Founding Engineer", "Agent-Accelerated Delivery Engineer"],
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
      name: "Rusan Adrian-Ionuț PFA",
      url: "https://www.adrian-rusan.com",
    },
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "MongoDB",
    "SQL",
    "REST API",
    "GraphQL",
    "Docker",
    "Git",
    "Agile Development",
    "Test-Driven Development",
    "Web Performance Optimization",
    "User Experience Design",
    "Responsive Web Design",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Engineer",
    description:
      "Develops both frontend and backend solutions for web applications",
    skills:
      "React, Next.js, TypeScript, Node.js, Database Management, API Development",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "RO",
    addressLocality: "Romania",
  },
  email: "rusan.adrian.ionut@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "professional",
    email: "rusan.adrian.ionut@gmail.com",
  },
};
