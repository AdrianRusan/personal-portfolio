import Link from 'next/link';
import { ArrowRight, Code, Globe, Users } from 'lucide-react';

export default function IntroductionPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Introduction
        </h1>
        <p className="text-xl text-white-100">
          Welcome to Adrian Rusan&apos;s technical documentation. Learn about his background, expertise, and approach to software development.
        </p>
      </div>

      {/* About Adrian */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          About Adrian Rusan
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-white-100 leading-relaxed">
            Adrian Rusan is a full-stack engineer with 8+ years of experience in web development, 
            specializing in modern JavaScript frameworks and technologies. Based in Romania, he has 
            worked with clients worldwide, delivering high-quality software solutions that drive business growth.
          </p>
          <p className="text-white-100 leading-relaxed">
            His expertise spans the entire web development stack, from frontend user interfaces to 
            backend APIs and database design. Adrian is passionate about creating efficient, scalable, 
            and maintainable code that solves real-world problems.
          </p>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Core Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Code className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Frontend Development</h3>
            <p className="text-white-100 text-sm">
              React, Next.js, TypeScript, Tailwind CSS, and modern frontend frameworks
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Globe className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Backend Development</h3>
            <p className="text-white-100 text-sm">
              Node.js, REST APIs, GraphQL, database design, and server architecture
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Users className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Team Collaboration</h3>
            <p className="text-white-100 text-sm">
              Agile methodologies, code reviews, mentoring, and cross-functional teamwork
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Frontend Technologies</h3>
            <ul className="space-y-2 text-white-100">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                React.js & Next.js
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                TypeScript & JavaScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                Tailwind CSS & Styled Components
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                Framer Motion & Animations
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Backend Technologies</h3>
            <ul className="space-y-2 text-white-100">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                Node.js & Express
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                REST APIs & GraphQL
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                MongoDB & SQL Databases
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple rounded-full mr-3"></span>
                AWS & Vercel Deployment
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Development Philosophy
        </h2>
        <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Quality First</h3>
              <p className="text-white-100">
                Every line of code is written with maintainability, performance, and scalability in mind. 
                Comprehensive testing and code reviews ensure robust solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Client-Centric Approach</h3>
              <p className="text-white-100">
                Understanding business requirements and translating them into technical solutions 
                that deliver real value to end users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Continuous Learning</h3>
              <p className="text-white-100">
                Staying current with the latest technologies and best practices to deliver 
                cutting-edge solutions that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Next Steps
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/docs/getting-started"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple hover:bg-purple/80 text-white font-medium transition-colors"
          >
            Getting Started Guide
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link 
            href="/docs/api-basics"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            API Documentation
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 