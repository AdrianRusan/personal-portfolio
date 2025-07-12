import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { 
  ProjectSkeleton, 
  TestimonialSkeleton, 
  ExperienceSkeleton 
} from "@/components/ui/Skeleton";

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

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <section className="py-20" aria-label="Experience loading">
      <ExperienceSkeleton />
    </section>
  )
});

const Approach = dynamic(() => import("@/components/Approach"), {
  loading: () => <section className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" aria-label="Approach loading" />
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <section className="py-20" aria-label="Testimonials loading">
      <TestimonialSkeleton />
    </section>
  )
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800" aria-label="Footer loading" />
});

export default function Home() {
  return (
    <main className="relative dark:bg-black-100 bg-white flex justify-center items-center flex-col overflow-hidden mx-auto px-5 sm:px-10">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
        />
        <Hero />
        
        <section id="about" aria-labelledby="about-heading" className="py-10 md:py-20">
          <About />
        </section>
        
        <section id="experience" aria-labelledby="experience-heading" className="py-10 md:py-20">
          <Experience />
          <div id="projects" aria-labelledby="projects-heading" className="mt-10 md:mt-20">
            <Projects />
          </div>
        </section>
        
        <section id="approach" aria-labelledby="approach-heading" className="py-10 md:py-20">
          <Approach />
        </section>
        
        {/* Testimonials section with proper spacing */}
        <section id="testimonials" aria-labelledby="testimonials-heading">
          <Testimonials />
        </section>
        
        {/* Contact section - Footer contains the contact form */}
        <Footer />
      </div>
    </main>
  );
}
