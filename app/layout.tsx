import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adrian Rusan | Full-Stack Engineer from Romania",
  description: "Explore the portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience in web development.",
  openGraph: {
    title: 'Adrian Rusan | Full-Stack Engineer',
    description: 'Portfolio of Adrian Rusan showcasing projects, skills, and experience in full-stack development.',
    url: 'https://www.adrian-rusan.com',
    images: [{ url: 'https://utfs.io/f/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrian Rusan | Full-Stack Engineer Portfolio',
    description: 'Discover the projects and experience of Adrian Rusan, a full-stack engineer from Romania.',
    images: ['https://utfs.io/f/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.adrian-rusan.com',
  },
};

const structuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Adrian Rusan",
        jobTitle: "Full-Stack Engineer",
        url: "https://www.adrian-rusan.com",
        sameAs: [
          "https://github.com/adrian-rusan",
          "https://www.linkedin.com/in/adrian-rusan/",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Self-Employed", // or name of your recent company
        },
        description: "Full-stack engineer with 8 years of experience in web development",
      }),
    }}
  />
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
