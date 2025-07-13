import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Mail, Calendar, FileText } from 'lucide-react';

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Getting Started
        </h1>
        <p className="text-xl text-white-100">
          Ready to work with Adrian? Here&apos;s everything you need to know to get started on your project.
        </p>
      </div>

      {/* Quick Start Process */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Quick Start Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold mr-3">
                1
              </div>
              <Mail className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Initial Contact</h3>
            <p className="text-white-100 text-sm">
              Reach out via the contact form or email to discuss your project requirements and goals.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold mr-3">
                2
              </div>
              <Calendar className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Discovery Call</h3>
            <p className="text-white-100 text-sm">
              Schedule a 30-minute consultation to discuss your project in detail and explore solutions.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold mr-3">
                3
              </div>
              <FileText className="h-6 w-6 text-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Project Proposal</h3>
            <p className="text-white-100 text-sm">
              Receive a detailed proposal with timeline, deliverables, and project scope.
            </p>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Project Types
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-2">Web Development</h3>
            <p className="text-white-100 mb-4">
              Full-stack web applications, e-commerce sites, and custom web solutions using modern technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Next.js</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Node.js</span>
            </div>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-2">API Development</h3>
            <p className="text-white-100 mb-4">
              RESTful APIs, GraphQL endpoints, and backend services with proper authentication and documentation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">REST API</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">GraphQL</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">MongoDB</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">PostgreSQL</span>
            </div>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-2">Consultation & Code Review</h3>
            <p className="text-white-100 mb-4">
              Technical consultation, code audits, performance optimization, and architecture reviews.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Code Review</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Architecture</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Performance</span>
              <span className="px-3 py-1 bg-purple/20 text-purple rounded-full text-sm">Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* What to Prepare */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          What to Prepare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Project Requirements</h3>
            <ul className="space-y-2 text-white-100">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Clear project objectives and goals
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Target audience and user personas
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Desired features and functionality
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Design preferences or existing brand guidelines
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Technical Information</h3>
            <ul className="space-y-2 text-white-100">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Existing systems or integrations needed
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Performance and scalability requirements
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Budget range and timeline expectations
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Hosting and deployment preferences
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Expectations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Timeline Expectations
        </h2>
        <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-purple mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Small Projects</h3>
              <p className="text-white-100 text-sm">1-2 weeks</p>
              <p className="text-white-100 text-xs mt-1">Landing pages, simple websites</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-purple mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Medium Projects</h3>
              <p className="text-white-100 text-sm">3-6 weeks</p>
              <p className="text-white-100 text-xs mt-1">Web applications, APIs</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-purple mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Large Projects</h3>
              <p className="text-white-100 text-sm">2-3 months</p>
              <p className="text-white-100 text-xs mt-1">Complex systems, enterprise solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Ready to Get Started?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple hover:bg-purple/80 text-white font-medium transition-colors"
          >
            Contact Adrian
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link 
            href="https://calendly.com/adrian-rusan?hide_gdpr_banner=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            Book a Consultation
            <Calendar className="h-4 w-4 ml-2" />
          </Link>
          <Link 
            href="/docs/api-basics"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            View API Docs
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 