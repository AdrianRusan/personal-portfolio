import Link from 'next/link';
import { ArrowRight, Code, Shield, Zap, Database, Globe, Key } from 'lucide-react';

export default function APIBasicsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">
          API Basics
        </h1>
        <p className="text-xl text-white-100">
          Technical documentation for developers working with Adrian&apos;s APIs and services.
        </p>
      </div>

      {/* API Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          API Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Globe className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">RESTful Architecture</h3>
            <p className="text-white-100 text-sm">
              Clean, predictable REST API design following industry best practices with proper HTTP methods and status codes.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Shield className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Secure Authentication</h3>
            <p className="text-white-100 text-sm">
              JWT-based authentication with refresh tokens and proper security headers for all API endpoints.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Zap className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
            <p className="text-white-100 text-sm">
              Optimized for speed with caching, pagination, and efficient database queries for fast response times.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <Database className="h-8 w-8 text-purple mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Scalable Database</h3>
            <p className="text-white-100 text-sm">
              Modern database design with proper indexing, relationships, and data validation for reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Common Endpoints */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Common API Endpoints
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Authentication</h3>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">POST</span>
            </div>
            <div className="bg-black-200 rounded-lg p-4 mb-4">
              <code className="text-white-100 text-sm">POST /api/auth/login</code>
            </div>
            <p className="text-white-100 text-sm mb-4">
              Authenticate users and receive JWT tokens for API access.
            </p>
            <div className="bg-black-200 rounded-lg p-4">
              <pre className="text-white-100 text-sm overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
              </pre>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">User Profile</h3>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">GET</span>
            </div>
            <div className="bg-black-200 rounded-lg p-4 mb-4">
              <code className="text-white-100 text-sm">GET /api/user/profile</code>
            </div>
            <p className="text-white-100 text-sm mb-4">
              Retrieve authenticated user profile information and preferences.
            </p>
            <div className="bg-black-200 rounded-lg p-4">
              <pre className="text-white-100 text-sm overflow-x-auto">
{`{
  "id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}`}
              </pre>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Data Collection</h3>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">GET</span>
            </div>
            <div className="bg-black-200 rounded-lg p-4 mb-4">
              <code className="text-white-100 text-sm">GET /api/data?page=1&limit=10</code>
            </div>
            <p className="text-white-100 text-sm mb-4">
              Retrieve paginated data collections with filtering and sorting options.
            </p>
            <div className="bg-black-200 rounded-lg p-4">
              <pre className="text-white-100 text-sm overflow-x-auto">
{`{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Authentication & Security
        </h2>
        <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Key className="h-6 w-6 text-purple mr-3" />
            <h3 className="text-lg font-semibold text-white">API Key Authentication</h3>
          </div>
          <p className="text-white-100 mb-4">
            All API requests require authentication via JWT tokens or API keys. Include the token in the Authorization header:
          </p>
          <div className="bg-black-200 rounded-lg p-4 mb-4">
            <code className="text-white-100 text-sm">Authorization: Bearer your-jwt-token</code>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-md font-semibold text-white mb-2">Security Features</h4>
              <ul className="space-y-1 text-white-100 text-sm">
                <li>• JWT token-based authentication</li>
                <li>• Rate limiting protection</li>
                <li>• CORS configuration</li>
                <li>• Input validation and sanitization</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-2">Best Practices</h4>
              <ul className="space-y-1 text-white-100 text-sm">
                <li>• Store tokens securely</li>
                <li>• Handle token expiration</li>
                <li>• Use HTTPS in production</li>
                <li>• Implement proper error handling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Response Formats */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Response Formats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-4">Success Response</h3>
            <div className="bg-black-200 rounded-lg p-4">
              <pre className="text-white-100 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example"
  },
  "message": "Request successful"
}`}
              </pre>
            </div>
          </div>
          <div className="p-6 rounded-lg border border-white/[0.2] bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white mb-4">Error Response</h3>
            <div className="bg-black-200 rounded-lg p-4">
              <pre className="text-white-100 text-sm overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Rate Limiting
        </h2>
        <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg p-6">
          <p className="text-white-100 mb-4">
            API requests are rate-limited to ensure fair usage and system stability. Rate limit information is included in response headers:
          </p>
          <div className="bg-black-200 rounded-lg p-4 mb-4">
            <pre className="text-white-100 text-sm overflow-x-auto">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200`}
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Standard</h4>
              <p className="text-white-100 text-sm">100 requests/hour</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Premium</h4>
              <p className="text-white-100 text-sm">1000 requests/hour</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Enterprise</h4>
              <p className="text-white-100 text-sm">Unlimited</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-white/[0.2] pb-2">
          Need More Information?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple hover:bg-purple/80 text-white font-medium transition-colors"
          >
            Contact for API Access
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link 
            href="/docs/getting-started"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            Getting Started Guide
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link 
            href="/docs/introduction"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/[0.2] text-white hover:bg-white/[0.1] font-medium transition-colors"
          >
            Learn More About Adrian
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 