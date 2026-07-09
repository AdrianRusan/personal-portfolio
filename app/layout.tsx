import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adrian-rusan.com"),
  title: {
    default: "Adrian Rusan | Agent-Accelerated Delivery, Reviewed",
    template: "%s | Adrian Rusan",
  },
  description:
    "An AI agent fleet ships your backlog; a senior engineer security-reviews every pull request before you see it. Fixed-scope delivery sprints for startup & scale-up founders and CTOs.",
  keywords: [
    "Adrian Rusan",
    "AI agent delivery",
    "Claude Code agents",
    "AI code security review",
    "agent-accelerated development",
    "senior code review",
    "software delivery sprint",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Adrian Rusan", url: "https://www.adrian-rusan.com" }],
  creator: "Adrian Rusan",
  publisher: "Adrian Rusan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Adrian Rusan | Agent-Accelerated Delivery, Reviewed",
    description:
      "An AI agent fleet ships your backlog; a senior engineer security-reviews every pull request before you see it. Fixed-scope delivery sprints for startup & scale-up founders and CTOs.",
    url: "https://www.adrian-rusan.com",
    siteName: "Adrian Rusan Portfolio",
    images: [
      {
        url: "https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s",
        width: 1200,
        height: 630,
        alt: "Adrian Rusan - Agent-Accelerated Delivery, Reviewed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Rusan | Agent-Accelerated Delivery, Reviewed",
    description:
      "An AI agent fleet ships your backlog; a senior engineer security-reviews every pull request before you see it. Fixed-scope delivery sprints for startup & scale-up founders and CTOs.",
    images: [
      "https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s",
    ],
    creator: "@adrian_rusan",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.adrian-rusan.com",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const structuredData = () => (
  <script
    type="application/ld+json"
    // Security Note: dangerouslySetInnerHTML is safe here as we're using JSON.stringify()
    // with static data for structured data markup (Schema.org JSON-LD)
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.adrian-rusan.com/#website",
          url: "https://www.adrian-rusan.com",
          name: "Adrian Rusan | Agent-Accelerated Delivery, Reviewed",
          description:
            "An AI agent fleet ships your backlog; a senior engineer security-reviews every pull request before you see it.",
          publisher: {
            "@id": "https://www.adrian-rusan.com/#person",
          },
          inLanguage: "en-US",
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://www.adrian-rusan.com/#person",
          name: "Adrian Rusan",
          givenName: "Adrian",
          familyName: "Rusan",
          jobTitle: "Agent-Accelerated Delivery Engineer",
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
          ],
          worksFor: {
            "@type": "Organization",
            name: "Rusan Adrian-Ionuț PFA",
            url: "https://www.adrian-rusan.com",
          },
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
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.adrian-rusan.com/#webpage",
          url: "https://www.adrian-rusan.com",
          name: "Adrian Rusan - Agent-Accelerated Delivery, Reviewed",
          isPartOf: {
            "@id": "https://www.adrian-rusan.com/#website",
          },
          about: {
            "@id": "https://www.adrian-rusan.com/#person",
          },
          description:
            "Fixed-scope delivery sprints where an AI agent fleet ships the backlog and a senior engineer security-reviews every pull request",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.adrian-rusan.com",
              },
            ],
          },
          mainEntity: {
            "@id": "https://www.adrian-rusan.com/#person",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://www.adrian-rusan.com/#service",
          name: "Agent-Accelerated Delivery Sprint",
          description:
            "A fixed-scope software delivery sprint where an AI agent fleet ships backlog work and a senior engineer security-reviews every pull request before it reaches the client.",
          provider: {
            "@id": "https://www.adrian-rusan.com/#person",
          },
          serviceType: "Software delivery sprint",
          areaServed: "Worldwide",
          audience: {
            "@type": "Audience",
            audienceType: "Startup and scale-up founders and CTOs",
          },
        },
      ]),
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {structuredData()}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
