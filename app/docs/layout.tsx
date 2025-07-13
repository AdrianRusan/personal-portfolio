import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Code, Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation | Adrian Rusan',
  description: 'Technical documentation and guides for working with Adrian Rusan',
};

const navigationItems = [
  { name: 'Introduction', href: '/docs/introduction', icon: BookOpen },
  { name: 'Getting Started', href: '/docs/getting-started', icon: Rocket },
  { name: 'API Basics', href: '/docs/api-basics', icon: Code },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.2] py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-white hover:text-purple transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Portfolio</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-white">Documentation</h1>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar Navigation */}
          <nav className="w-64 py-8 pr-8">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white-100 hover:bg-white/[0.1] hover:text-purple transition-all duration-200 group"
                  >
                    <Icon className="h-4 w-4 group-hover:text-purple" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 py-8 pl-8 border-l border-white/[0.2]">
            <div className="max-w-4xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 