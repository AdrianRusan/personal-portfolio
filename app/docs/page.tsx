import Link from 'next/link';
import { BookOpen, Code, Rocket, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Documentation
        </h1>
        <p className="text-xl text-white-100 max-w-2xl mx-auto">
          Everything you need to know about working with Adrian Rusan - from project collaboration to technical implementation guides.
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Link 
          href="/docs/introduction"
          className="group p-6 rounded-lg border border-white/[0.2] hover:border-purple/50 transition-all duration-300 hover:bg-white/[0.05]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-6 w-6 text-purple" />
            <h3 className="text-xl font-semibold text-white">Introduction</h3>
          </div>
          <p className="text-white-100 mb-4">
            Learn about Adrian&apos;s background, expertise, and approach to software development.
          </p>
          <div className="flex items-center text-purple group-hover:translate-x-1 transition-transform">
            <span className="text-sm">Get started</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>

        <Link 
          href="/docs/getting-started"
          className="group p-6 rounded-lg border border-white/[0.2] hover:border-purple/50 transition-all duration-300 hover:bg-white/[0.05]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Rocket className="h-6 w-6 text-purple" />
            <h3 className="text-xl font-semibold text-white">Getting Started</h3>
          </div>
          <p className="text-white-100 mb-4">
            Quick start guide for new clients and collaborators looking to work with Adrian.
          </p>
          <div className="flex items-center text-purple group-hover:translate-x-1 transition-transform">
            <span className="text-sm">Start here</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>

        <Link 
          href="/docs/api-basics"
          className="group p-6 rounded-lg border border-white/[0.2] hover:border-purple/50 transition-all duration-300 hover:bg-white/[0.05]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Code className="h-6 w-6 text-purple" />
            <h3 className="text-xl font-semibold text-white">API Basics</h3>
          </div>
          <p className="text-white-100 mb-4">
            Technical documentation for developers working with Adrian&apos;s APIs and services.
          </p>
          <div className="flex items-center text-purple group-hover:translate-x-1 transition-transform">
            <span className="text-sm">Learn more</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </Link>
      </div>

      {/* Additional Information */}
      <div className="mt-16 p-8 rounded-lg bg-white/[0.05] border border-white/[0.1]">
        <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
        <p className="text-white-100 mb-6">
          If you can&apos;t find what you&apos;re looking for in this documentation, feel free to reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple hover:bg-purple/80 text-white font-medium transition-colors"
          >
            Contact Adrian
          </Link>
          <Link 
            href="https://calendly.com/adrian-rusan?hide_gdpr_banner=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </div>
  );
} 