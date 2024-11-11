import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Adrian Rusan | Full-Stack Engineer from Romania",
  description: "Explore the portfolio of Adrian Rusan, a full-stack engineer with 8 years of experience in web development.",
  openGraph: {
    title: 'Adrian Rusan | Full-Stack Engineer',
    description: 'Portfolio of Adrian Rusan showcasing projects, skills, and experience in full-stack development.',
    url: 'https://www.adrian-rusan.com',
    images: [{ url: 'https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrian Rusan | Full-Stack Engineer Portfolio',
    description: 'Discover the projects and experience of Adrian Rusan, a full-stack engineer from Romania.',
    images: ['https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s'],
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
          name: "RUSAN ADRIAN-IONUT PFA",
        },
        description: "Full-stack engineer with 8 years of experience in web development",
      }),
    }}
  />
)

const About = dynamic(() => import("@/components/About"));
const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Approach = dynamic(() => import("@/components/Approach"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative dark:bg-black-100 bg-white flex justify-center items-center flex-col overflow-hidden mx-auto px-5 sm:px-10">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
        />
        <Hero />
        <About />
        <div id='experience'>
          <Experience />
        <Projects />
        </div>
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
