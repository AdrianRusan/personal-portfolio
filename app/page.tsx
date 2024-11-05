import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";

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
