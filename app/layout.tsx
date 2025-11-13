import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Adrian Rusan | Full-Stack & AI Engineer from Romania",
  description: "Portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience specializing in React, Next.js, TypeScript, AI integration, and intelligent automation solutions.",
  keywords: ["Adrian Rusan", "Full-Stack Engineer", "AI Engineer", "Automation Engineer", "React Developer", "Next.js", "TypeScript", "Web Developer", "Romania", "Software Engineer", "JavaScript", "Node.js", "AI Integration", "Intelligent Automation", "Web Scraping", "API Development", "Remote Developer Europe"],
  authors: [{ name: "Adrian Rusan", url: "https://www.adrian-rusan.com" }],
  creator: "Adrian Rusan",
  publisher: "Adrian Rusan",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Adrian Rusan | Full-Stack & AI Engineer',
    description: 'Portfolio of Adrian Rusan showcasing 8 years of experience in full-stack development, AI integration, automation, React, Next.js, and modern web technologies.',
    url: 'https://www.adrian-rusan.com',
    siteName: 'Adrian Rusan Portfolio',
    images: [{ 
      url: 'https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s',
      width: 1200,
      height: 630,
      alt: 'Adrian Rusan - Full-Stack Engineer Portfolio'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrian Rusan | Full-Stack & AI Engineer',
    description: 'Full-stack engineer from Romania with 8 years of experience in React, Next.js, AI integration, automation, and modern web development.',
    images: ['https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s'],
    creator: '@adrian_rusan',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.adrian-rusan.com',
  },
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
          "url": "https://www.adrian-rusan.com",
          "name": "Adrian Rusan | Full-Stack Engineer",
          "description": "Portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience in web development",
          "publisher": {
            "@id": "https://www.adrian-rusan.com/#person"
          },
          "inLanguage": "en-US"
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://www.adrian-rusan.com/#person",
          "name": "Adrian Rusan",
          "givenName": "Adrian",
          "familyName": "Rusan",
          "jobTitle": "Full-Stack & AI Engineer",
          "description": "Experienced Full-Stack & AI Engineer from Romania with 8 years of expertise in building scalable web applications, AI integration, automation solutions, using React, Next.js, Node.js, and TypeScript.",
          "url": "https://www.adrian-rusan.com",
          "image": {
            "@type": "ImageObject",
            "url": "https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s",
            "width": 400,
            "height": 400
          },
          "sameAs": [
            "https://github.com/adrian-rusan",
            "https://www.linkedin.com/in/adrian-rusan/"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Rusan Adrian-Ionuț PFA",
            "url": "https://www.adrian-rusan.com"
          },
          "knowsAbout": [
            "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
            "AI Integration", "Automation", "Web Scraping", "Puppeteer",
            "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "SQL",
            "REST API", "GraphQL", "Docker", "Git", "Agile Development",
            "Test-Driven Development", "Web Performance Optimization",
            "User Experience Design", "Responsive Web Design"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Full-Stack & AI Engineer",
            "description": "Develops full-stack web applications, AI integrations, and automation solutions",
            "skills": "React, Next.js, TypeScript, Node.js, AI Integration, Automation, Web Scraping, API Development"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RO",
            "addressLocality": "Romania"
          },
          "email": "rusan.adrian.ionut@gmail.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "professional",
            "email": "rusan.adrian.ionut@gmail.com"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.adrian-rusan.com/#webpage",
          "url": "https://www.adrian-rusan.com",
          "name": "Adrian Rusan - Full-Stack Engineer Portfolio",
          "isPartOf": {
            "@id": "https://www.adrian-rusan.com/#website"
          },
          "about": {
            "@id": "https://www.adrian-rusan.com/#person"
          },
          "description": "Professional portfolio showcasing Adrian Rusan's full-stack development projects, experience, and technical expertise",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.adrian-rusan.com"
              }
            ]
          },
          "mainEntity": {
            "@id": "https://www.adrian-rusan.com/#person"
          }
        }
      ]),
    }}
  />
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        {structuredData()}
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {process.env.NODE_ENV === 'production' && (
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
