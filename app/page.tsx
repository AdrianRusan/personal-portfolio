import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { 
  ProjectSkeleton, 
  TestimonialSkeleton, 
  ExperienceSkeleton,
  GitHubShowcaseSkeleton 
} from "@/components/ui/Skeleton";
import { SectionReveal } from "@/components/ui/PageTransition";
import { getGitHubShowcaseData } from "@/lib/github-data";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";

// Dynamic imports with loading components for better performance
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-screen animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" />
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => (
    <section className="py-20" aria-label="Projects loading">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </section>
  )
});

// const Experience = dynamic(() => import("@/components/Experience"), {
//   loading: () => (
//     <section className="py-20" aria-label="Experience loading">
//       <ExperienceSkeleton />
//     </section>
//   )
// });

const Approach = dynamic(() => import("@/components/Approach"), {
  loading: () => <section className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" aria-label="Approach loading" />
});

// const Testimonials = dynamic(() => import("@/components/Testimonials"), {
//   loading: () => (
//     <section className="py-20" aria-label="Testimonials loading">
//       <TestimonialSkeleton />
//     </section>
//   )
// });

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800" aria-label="Footer loading" />
});

const GitHubShowcase = dynamic(() => import("@/components/GitHubShowcase"), {
  loading: () => <GitHubShowcaseSkeleton />
});

export default async function Home() {
  // Fetch GitHub data with ISR caching and fallback handling
  let githubData;
  try {
    githubData = await getGitHubShowcaseData();
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    // Provide fallback data if GitHub API fails
    githubData = {
      stats: null,
      featuredRepos: [],
      lastUpdated: new Date().toISOString()
    };
  }

  return (
    <main className="relative dark:bg-black-100 bg-white flex justify-center items-center flex-col overflow-hidden mx-auto px-5 sm:px-10">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
        />
        
        {/* Hero section - no animation needed as it's the first thing users see */}
        <Hero />
        
        {/* About section with reveal animation */}
        <SectionReveal delay={0.1}>
          <section id="about" aria-labelledby="about-heading" className="py-10 md:py-20">
            <About />
          </section>
        </SectionReveal>
        
        {/* Experience section with reveal animation */}
        <SectionReveal delay={0.2}>
          <section id="experience" aria-labelledby="experience-heading" className="py-10 md:py-20">
            <Experience />
            {/* <div id="projects" aria-labelledby="projects-heading" className="mt-10 md:mt-20">
              <Projects />
            </div> */}
          </section>
        </SectionReveal>
        
        {/* GitHub Showcase section with reveal animation */}
        <SectionReveal delay={0.1}>
          <section id="github" aria-labelledby="github-heading" className="py-10 md:py-20">
            <div className="text-center">
              <h2 id="github-heading" className="heading">
                GitHub <span className="text-purple">Activity</span>
              </h2>
              <p className="text-white-200 mt-4 mb-8">
                GitHub integration is being updated for enhanced performance. Please check back soon!
              </p>
              <Link
                href="https://github.com/AdrianRusan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-lg transition-colors"
              >
                <FaGithub className="text-xl" />
                <span>View GitHub Profile</span>
              </Link>
            </div>
          </section>
        </SectionReveal>
        
        {/* Portfolio enhancement notice */}
        <SectionReveal delay={0.2}>
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="heading mb-8">
                Portfolio <span className="text-purple">Enhancement</span> in Progress
              </h2>
              <p className="text-white-200 text-lg leading-relaxed mb-12 max-w-4xl mx-auto">
                I&apos;m currently upgrading my portfolio with advanced features including dynamic project showcases, 
                detailed case studies, client testimonials, and an enhanced contact system. These new sections will 
                provide deeper insights into my work and make it easier to connect.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-white font-semibold mb-2">Projects</h3>
                  <p className="text-white-200 text-sm">Featured projects with detailed case studies and live demos</p>
                </div>
                
                <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-white font-semibold mb-2">Experience</h3>
                  <p className="text-white-200 text-sm">Professional journey and technical expertise timeline</p>
                </div>
                
                <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-white font-semibold mb-2">Testimonials</h3>
                  <p className="text-white-200 text-sm">Client feedback and project success stories</p>
                </div>
                
                <div className="bg-black-200 rounded-lg p-6 border border-white/[0.1] hover:border-white/[0.2] transition-colors">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-white font-semibold mb-2">Contact</h3>
                  <p className="text-white-200 text-sm">Enhanced contact form with project requirements capture</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://www.linkedin.com/in/adrian-rusan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </Link>
                
                <Link
                  href="mailto:adrian.rusan@example.com"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 hover:border-white/40 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send Email</span>
                </Link>
              </div>
            </div>
          </section>
        </SectionReveal>
        
        {/* Approach section with reveal animation */}
        <SectionReveal delay={0.2}>
          <section id="approach" aria-labelledby="approach-heading" className="py-10 md:py-20">
            <Approach />
          </section>
        </SectionReveal>
        
        {/* Testimonials section with reveal animation */}
        <SectionReveal delay={0.1}>
          <section id="testimonials" aria-labelledby="testimonials-heading">
            <Testimonials />
          </section>
        </SectionReveal>
        
        {/* Contact section - Footer contains the contact form */}
        <SectionReveal delay={0.2}>
          <Footer />
        </SectionReveal>
      </div>
    </main>
  );
}
