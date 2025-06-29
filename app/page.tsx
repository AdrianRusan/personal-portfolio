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
    <div className="py-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </div>
  )
});

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <div className="py-20">
      <ExperienceSkeleton />
    </div>
  )
});

const Approach = dynamic(() => import("@/components/Approach"), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" />
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <div className="py-20">
      <TestimonialSkeleton />
    </div>
  )
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800" />
});

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
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
