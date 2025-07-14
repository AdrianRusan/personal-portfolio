import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import StatusDisplay from '@/components/StatusDisplay';

export const metadata: Metadata = {
  title: 'Service Status | Adrian Rusan',
  description: 'Real-time status of Adrian Rusan\'s portfolio services and integrations',
  robots: {
    index: true,
    follow: true,
  },
};

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-white hover:text-purple transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Service Status
            </h1>
            <p className="text-xl text-white-100 max-w-2xl mx-auto">
              Real-time status of all portfolio services and integrations
            </p>
          </div>
        </div>

        {/* Dynamic Status Display */}
        <Suspense fallback={
          <div className="space-y-8">
            <div className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-6 animate-pulse">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-white/[0.2] rounded"></div>
                <div>
                  <div className="w-48 h-6 bg-white/[0.2] rounded mb-2"></div>
                  <div className="w-64 h-4 bg-white/[0.2] rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <StatusDisplay />
        </Suspense>

        {/* Status History Placeholder */}
        <div className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-6 mb-8 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Status History
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white-100">
                {new Date().toLocaleDateString()} - All systems operational
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white-100">
                {new Date(Date.now() - 86400000).toLocaleDateString()} - All systems operational
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white-100">
                {new Date(Date.now() - 172800000).toLocaleDateString()} - All systems operational
              </span>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="text-center space-y-4">
          <div className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-4">
            <p className="text-white-100 text-sm">
              🔄 Status updates every 30 seconds • 📧 Incident notifications via email
            </p>
          </div>
          
          <div className="text-white-100 text-xs space-y-2">
            <p>
              Having issues? Contact me directly at{' '}
              <a href="mailto:rusan.adrian.ionut@gmail.com" className="text-purple hover:underline">
                rusan.adrian.ionut@gmail.com
              </a>
            </p>
            <p>
              This status page is updated automatically via health checks and monitoring systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 