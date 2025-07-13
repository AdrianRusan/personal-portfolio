import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import { PageTransition } from "@/components/ui/PageTransition";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Adrian Rusan | Full-Stack Engineer from Romania",
  description: "Explore the portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience in web development, specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["Adrian Rusan", "Full-Stack Engineer", "React Developer", "Next.js", "TypeScript", "Web Developer", "Romania", "Software Engineer", "JavaScript", "Node.js"],
  authors: [{ name: "Adrian Rusan", url: "https://www.adrian-rusan.com" }],
  creator: "Adrian Rusan",
  publisher: "Adrian Rusan",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Adrian Rusan | Full-Stack Engineer',
    description: 'Portfolio of Adrian Rusan showcasing projects, skills, and experience in full-stack development with React, Next.js, and modern web technologies.',
    url: 'https://www.adrian-rusan.com',
    siteName: 'Adrian Rusan Portfolio',
    images: [{ 
      url: '/favicon.ico', // Placeholder image
      width: 1200,
      height: 630,
      alt: 'Adrian Rusan - Full-Stack Engineer Portfolio'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrian Rusan | Full-Stack Engineer Portfolio',
    description: 'Discover the projects and experience of Adrian Rusan, a full-stack engineer from Romania specializing in React, Next.js, and modern web development.',
    images: ['/favicon.ico'], // Placeholder image
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
  verification: {
    google: 'your-google-verification-code',
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
          "jobTitle": "Full-Stack Engineer",
          "description": "Experienced Full-Stack Engineer from Romania with 8 years of expertise in building scalable and performant web applications using technologies like React, Next.js, Node.js, and TypeScript.",
          "url": "https://www.adrian-rusan.com",
          "image": {
            "@type": "ImageObject",
            "url": "/favicon.ico",
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
            "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "SQL", 
            "REST API", "GraphQL", "Docker", "Git", "Agile Development",
            "Test-Driven Development", "Web Performance Optimization",
            "User Experience Design", "Responsive Web Design"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Full-Stack Engineer",
            "description": "Develops both frontend and backend solutions for web applications",
            "skills": "React, Next.js, TypeScript, Node.js, Database Management, API Development"
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

        {structuredData()}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0A0A0A',
                color: '#FFFFFF',
                border: '1px solid #333',
              },
              success: {
                style: {
                  background: '#0A0A0A',
                  color: '#10B981',
                  border: '1px solid #10B981',
                },
              },
              error: {
                style: {
                  background: '#0A0A0A',
                  color: '#EF4444',
                  border: '1px solid #EF4444',
                },
              },
            }}
          />
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
